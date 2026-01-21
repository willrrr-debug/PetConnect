import { supabase } from './supabase';
import { Database } from './database.types';

type MessageRow = Database['public']['Tables']['messages']['Row'];
type MessageInsert = Database['public']['Tables']['messages']['Insert'];
type ConversationRow = Database['public']['Tables']['conversations']['Row'];

/**
 * 聊天服务
 */
export const chatService = {
    /**
     * 获取或创建两个用户之间的对话
     */
    async getOrCreateConversation(user1Id: string, user2Id: string) {
        // 先尝试查找已存在的对话
        const { data: existing, error: searchError } = await supabase
            .from('conversations')
            .select('*')
            .or(`and(participant1_id.eq.${user1Id},participant2_id.eq.${user2Id}),and(participant1_id.eq.${user2Id},participant2_id.eq.${user1Id})`)
            .single();

        if (existing) return { data: existing, error: null };

        // 如果不存在则创建
        const { data: created, error: createError } = await supabase
            .from('conversations')
            .insert({
                participant1_id: user1Id,
                participant2_id: user2Id,
            })
            .select()
            .single();

        return { data: created, error: createError };
    },

    /**
     * 获取对话的消息列表
     */
    async getMessages(conversationId: string) {
        const { data, error } = await supabase
            .from('messages')
            .select('*')
            .eq('conversation_id', conversationId)
            .order('created_at', { ascending: true });

        return { data, error };
    },

    /**
     * 发送消息
     */
    async sendMessage(message: Omit<MessageInsert, 'id' | 'created_at'>) {
        const { data, error } = await supabase
            .from('messages')
            .insert(message)
            .select()
            .single();

        if (!error && data) {
            // 更新对话的最后一条消息
            await supabase
                .from('conversations')
                .update({
                    last_message: data.content,
                    last_message_at: data.created_at,
                })
                .eq('id', message.conversation_id);
        }

        return { data, error };
    },

    /**
     * 订阅新消息
     */
    subscribeToMessages(conversationId: string, callback: (message: MessageRow) => void) {
        return supabase
            .channel(`messages:${conversationId}`)
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'messages',
                    filter: `conversation_id=eq.${conversationId}`,
                },
                (payload) => {
                    callback(payload.new as MessageRow);
                }
            )
            .subscribe();
    },
};
