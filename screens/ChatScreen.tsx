import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Avatar from '../components/Avatar';
import { mockConversations } from '../data';
import type { Message } from '../types';

/**
 * 聊天详情页
 * 与救助站/用户的私聊界面
 */
const ChatScreen: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // 查找会话信息
    const conversation = mockConversations.find((c) => c.id === id);

    // 模拟消息数据
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            conversationId: id || '',
            senderId: conversation?.participantId || '',
            type: 'text',
            content: '你好！欢迎咨询我们的领养服务 🐾',
            timestamp: '09:30',
            read: true,
        },
        {
            id: '2',
            conversationId: id || '',
            senderId: 'user-1',
            type: 'text',
            content: '你好，我想了解一下 Max 的情况',
            timestamp: '09:32',
            read: true,
        },
        {
            id: '3',
            conversationId: id || '',
            senderId: conversation?.participantId || '',
            type: 'text',
            content: 'Max 是一只非常活泼的金毛，今年2岁。他性格温顺，非常适合有小孩的家庭。',
            timestamp: '09:35',
            read: true,
        },
        {
            id: '4',
            conversationId: id || '',
            senderId: conversation?.participantId || '',
            type: 'text',
            content: conversation?.lastMessage || '',
            timestamp: '10:30',
            read: true,
        },
    ]);

    const [inputValue, setInputValue] = useState('');

    // 滚动到最新消息
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // 发送消息
    const handleSend = () => {
        if (!inputValue.trim()) return;

        const newMessage: Message = {
            id: Date.now().toString(),
            conversationId: id || '',
            senderId: 'user-1',
            type: 'text',
            content: inputValue,
            timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
            read: false,
        };

        setMessages((prev) => [...prev, newMessage]);
        setInputValue('');
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    if (!conversation) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
                <p className="text-gray-500">会话不存在</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-screen bg-background-light dark:bg-background-dark">
            {/* 头部 */}
            <header className="sticky top-0 z-20 flex items-center gap-3 bg-surface-light dark:bg-surface-dark px-4 py-3 border-b border-gray-100 dark:border-gray-800 shadow-sm">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center justify-center size-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                    <span className="material-symbols-outlined text-text-main dark:text-white">arrow_back</span>
                </button>

                <div className="flex items-center gap-3 flex-1">
                    <Avatar
                        src={conversation.participant.avatar}
                        alt={conversation.participant.name}
                        size="lg"
                        online={conversation.online}
                    />
                    <div className="flex-1 min-w-0">
                        <h1 className="text-base font-bold text-text-main dark:text-white truncate">
                            {conversation.participant.name}
                        </h1>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            {conversation.online ? '在线' : '离线'}
                        </p>
                    </div>
                </div>

                <button className="flex items-center justify-center size-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <span className="material-symbols-outlined text-text-main dark:text-white">more_vert</span>
                </button>
            </header>

            {/* 消息列表 */}
            <main className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                {messages.map((message) => {
                    const isOwn = message.senderId === 'user-1';

                    return (
                        <div
                            key={message.id}
                            className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${isOwn
                                        ? 'bg-primary text-white rounded-br-sm'
                                        : 'bg-white dark:bg-surface-dark text-text-main dark:text-white rounded-bl-sm shadow-sm'
                                    }`}
                            >
                                <p className="text-[15px] leading-relaxed">{message.content}</p>
                                <p
                                    className={`text-[10px] mt-1 ${isOwn ? 'text-white/70' : 'text-gray-400 dark:text-gray-500'
                                        }`}
                                >
                                    {message.timestamp}
                                </p>
                            </div>
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </main>

            {/* 输入区域 */}
            <footer className="sticky bottom-0 bg-surface-light dark:bg-surface-dark border-t border-gray-100 dark:border-gray-800 p-4 pb-8">
                <div className="flex items-end gap-3">
                    <button className="flex items-center justify-center size-10 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors shrink-0">
                        <span className="material-symbols-outlined">add</span>
                    </button>

                    <div className="flex-1 relative">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="输入消息..."
                            className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-2xl border-none text-text-main dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary/30 focus:outline-none"
                        />
                    </div>

                    <button
                        onClick={handleSend}
                        disabled={!inputValue.trim()}
                        className={`flex items-center justify-center size-10 rounded-full shrink-0 transition-all ${inputValue.trim()
                                ? 'bg-primary text-white shadow-lg shadow-primary/30 active:scale-95'
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-400'
                            }`}
                    >
                        <span className="material-symbols-outlined">send</span>
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default ChatScreen;
