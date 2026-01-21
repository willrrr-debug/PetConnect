import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Avatar from '../components/Avatar';
import { useApp } from '../context/AppContext';
import { chatService } from '../services/chat';
import { supabase } from '../services/supabase';
import { mockProfiles, mockCurrentUser } from '../data/users';

interface Message {
    id: string;
    conversation_id: string;
    sender_id: string | null;
    content: string;
    type: 'text' | 'image' | 'system';
    created_at: string;
}

interface Participant {
    id: string;
    name: string;
    avatar_url: string | null;
}

/**
 * 聊天详情页 (增强型：支持 UUID 和 Mock ID 混合)
 */
const ChatScreen: React.FC = () => {
    const navigate = useNavigate();
    const { id: recipientIdOrConversationId } = useParams<{ id: string }>();
    const { profile, isMockMode } = useApp();
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // 如果没登录，在 Mock 模式下使用默认用户
    const currentUser = profile || (isMockMode ? { id: mockCurrentUser.id, name: mockCurrentUser.name } : null);

    const [conversation, setConversation] = useState<any>(null);
    const [recipient, setRecipient] = useState<Participant | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initChat = async () => {
            if (!recipientIdOrConversationId) return;

            setLoading(true);
            try {
                // 1. 优先尝试从 Mock 数据中寻找对方 (支持 user-1 这种 ID)
                const mockTarget = mockProfiles.find(p => p.id === recipientIdOrConversationId);

                if (mockTarget) {
                    setRecipient({
                        id: mockTarget.id,
                        name: mockTarget.name,
                        avatar_url: mockTarget.avatar
                    });

                    // 如果 ID 是标准的 UUID，尝试同步到 Supabase
                    if (recipientIdOrConversationId.length > 30 && currentUser?.id) {
                        const { data } = await chatService.getOrCreateConversation(currentUser.id, mockTarget.id);
                        setConversation(data);
                        if (data) loadMessages(data.id);
                    }
                } else {
                    // 2. 尝试从 Supabase 实时查找
                    const isUUID = recipientIdOrConversationId.length > 30;

                    if (isUUID) {
                        const { data: profileData } = await supabase
                            .from('profiles')
                            .select('id, name, avatar_url')
                            .eq('id', recipientIdOrConversationId)
                            .single();

                        if (profileData) {
                            setRecipient(profileData);
                            if (currentUser?.id) {
                                const { data: convData } = await chatService.getOrCreateConversation(currentUser.id, profileData.id);
                                setConversation(convData);
                                if (convData) loadMessages(convData.id);
                            }
                        } else {
                            // 尝试作为对话 ID 处理
                            const { data: convData } = await supabase
                                .from('conversations')
                                .select('*')
                                .eq('id', recipientIdOrConversationId)
                                .single();

                            if (convData) {
                                setConversation(convData);
                                const otherId = convData.participant1_id === currentUser?.id
                                    ? convData.participant2_id
                                    : convData.participant1_id;

                                const { data: otherProfile } = await supabase
                                    .from('profiles')
                                    .select('id, name, avatar_url')
                                    .eq('id', otherId)
                                    .single();

                                setRecipient(otherProfile);
                                loadMessages(convData.id);
                            }
                        }
                    }
                }
            } catch (err) {
                console.error('Chat init fail:', err);
            } finally {
                setLoading(false);
            }
        };

        initChat();
    }, [currentUser?.id, recipientIdOrConversationId]);

    const loadMessages = async (convId: string) => {
        try {
            const { data } = await chatService.getMessages(convId);
            if (data) setMessages(data as Message[]);
        } catch (e) { }
    };

    // 订阅消息
    useEffect(() => {
        if (!conversation?.id) return;
        const subscription = chatService.subscribeToMessages(conversation.id, (newMsg) => {
            setMessages(prev => (prev.some(m => m.id === newMsg.id) ? prev : [...prev, newMsg as Message]));
        });
        return () => { subscription.unsubscribe(); };
    }, [conversation?.id]);

    const handleSend = async () => {
        if (!inputValue.trim() || !currentUser) return;
        const text = inputValue;
        setInputValue('');

        if (conversation?.id) {
            await chatService.sendMessage({
                conversation_id: conversation.id,
                sender_id: currentUser.id,
                content: text,
                type: 'text',
                read: false,
            });
        } else {
            // 本地预览模式：仅前端更新
            const fakeMsg: Message = {
                id: Date.now().toString(),
                conversation_id: 'local',
                sender_id: currentUser.id,
                content: text,
                type: 'text',
                created_at: new Date().toISOString()
            };
            setMessages(prev => [...prev, fakeMsg]);
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-white dark:bg-background-dark"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>;

    if (!recipient) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6 text-center">
            <span className="material-symbols-outlined text-6xl text-gray-200 mb-4">person_off</span>
            <h3 className="text-lg font-bold">无法找到对方信息</h3>
            <p className="text-gray-500 mt-2">该用户可能已注销或ID无效 ({recipientIdOrConversationId})</p>
            <button onClick={() => navigate(-1)} className="mt-6 px-6 py-2 bg-primary text-white rounded-full">返回</button>
        </div>
    );

    return (
        <div className="flex flex-col h-screen bg-background-light dark:bg-background-dark overflow-hidden">
            <header className="flex items-center gap-3 bg-white dark:bg-surface-dark px-4 py-3 border-b border-gray-100 dark:border-gray-800 shadow-sm z-10">
                <button onClick={() => navigate(-1)} className="size-10 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800"><span className="material-symbols-outlined">arrow_back</span></button>
                <div className="flex items-center gap-3 flex-1 overflow-hidden">
                    <div className="relative shrink-0">
                        <div className="w-10 h-10 rounded-full bg-cover bg-center border" style={{ backgroundImage: `url('${recipient.avatar_url || 'https://via.placeholder.com/40'}')` }}></div>
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                        <h1 className="text-base font-bold truncate">{recipient.name}</h1>
                        <p className="text-[10px] text-green-500 font-medium">在线</p>
                    </div>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
                {messages.length === 0 && <div className="flex flex-col items-center justify-center py-10 opacity-30"><span className="material-symbols-outlined text-4xl mb-2">waving_hand</span><p>打个招呼吧</p></div>}
                {messages.map((m) => {
                    const isOwn = m.sender_id === currentUser?.id;
                    return (
                        <div key={m.id} className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${isOwn ? 'bg-primary text-white rounded-br-none shadow-md' : 'bg-white dark:bg-surface-dark text-[#1a1a1a] dark:text-white rounded-bl-none shadow-sm border border-gray-100 dark:border-gray-800'}`}>
                                <p className="text-[15px] leading-relaxed break-words">{m.content}</p>
                                <span className={`text-[9px] block text-right mt-1 opacity-60`}>{new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </main>

            <footer className="bg-white dark:bg-surface-dark border-t p-4 pb-8">
                <div className="flex items-end gap-2 max-w-md mx-auto">
                    <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-2xl px-4 py-2">
                        <textarea
                            rows={1}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
                            placeholder="输入消息..."
                            className="w-full bg-transparent border-none focus:ring-0 text-[15px] py-1 resize-none"
                        />
                    </div>
                    <button onClick={handleSend} disabled={!inputValue.trim()} className={`size-11 rounded-full flex items-center justify-center transition-all ${inputValue.trim() ? 'bg-primary text-white shadow-lg' : 'bg-gray-200 text-gray-400'}`}>
                        <span className="material-symbols-outlined">send</span>
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default ChatScreen;
