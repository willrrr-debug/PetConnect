/**
 * 消息相关类型定义
 */

/** 消息类型 */
export type MessageType = 'text' | 'image' | 'system';

/** 聊天会话 */
export interface Conversation {
    id: string;
    participantId: string;
    participant: ConversationParticipant;
    lastMessage: string;
    lastMessageTime: string;
    unreadCount: number;
    online: boolean;
}

/** 会话参与者 */
export interface ConversationParticipant {
    id: string;
    name: string;
    avatar: string;
    type: 'user' | 'shelter' | 'vet';
}

/** 单条消息 */
export interface Message {
    id: string;
    conversationId: string;
    senderId: string;
    type: MessageType;
    content: string;
    timestamp: string;
    read: boolean;
}
