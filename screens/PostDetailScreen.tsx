import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { mockPosts } from '../data/posts';
import { Post } from '../types/post';

const PostDetailScreen: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<Post | null>(null);

    useEffect(() => {
        // 实际开发中这里应该从 API 获取数据
        const foundPost = mockPosts.find(p => p.id === id);
        if (foundPost) {
            setPost(foundPost);
        }
    }, [id]);

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
                <p className="text-text-muted">加载中...</p>
            </div>
        );
    }

    const handleContact = () => {
        // 导航到聊天页面，带上用户ID
        navigate(`/chat/${post.authorId}`);
    };

    return (
        <div className="relative w-full min-h-screen flex flex-col pb-[120px] bg-background-light dark:bg-background-dark font-display">
            {/* 顶部导航 */}
            <div className="fixed top-0 left-0 w-full p-4 pt-8 flex justify-between items-center z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
                <button
                    onClick={() => navigate(-1)}
                    className="size-10 rounded-full flex items-center justify-center text-text-main dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <h1 className="text-lg font-bold truncate max-w-[200px]">帖子详情</h1>
                <div className="flex gap-2">
                    <button className="size-10 rounded-full flex items-center justify-center text-text-main dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                        <span className="material-symbols-outlined">share</span>
                    </button>
                    <button className="size-10 rounded-full flex items-center justify-center text-text-main dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                        <span className="material-symbols-outlined">more_horiz</span>
                    </button>
                </div>
            </div>

            <div className="pt-[88px]">
                {/* 用户信息 */}
                <div className="px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gray-200 bg-cover bg-center border border-gray-100 dark:border-gray-800" style={{ backgroundImage: `url('${post.author.avatar}')` }}></div>
                        <div>
                            <p className="text-base font-bold text-[#181411] dark:text-white leading-tight">
                                {post.author.name}
                                {post.author.verified && <span className="material-symbols-outlined text-primary text-[16px] align-middle ml-1" title="Verified">verified</span>}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{post.createdAt}</p>
                        </div>
                    </div>
                </div>

                {/* 帖子图片 */}
                {post.images && post.images.length > 0 && (
                    <div className="w-full aspect-[4/3] bg-gray-100 dark:bg-gray-800">
                        <img src={post.images[0]} alt={post.title} className="w-full h-full object-cover" />
                    </div>
                )}

                {/* 帖子内容 */}
                <div className="px-6 py-6">
                    {post.urgency === 'urgent' && (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-500 text-white rounded-lg text-xs font-bold mb-4 shadow-sm">
                            <span className="material-symbols-outlined text-[14px]">warning</span>
                            紧急求助
                        </div>
                    )}

                    <h2 className="text-2xl font-bold text-[#181411] dark:text-white leading-tight mb-4">
                        {post.title}
                    </h2>

                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-6 bg-gray-50 dark:bg-surface-dark px-3 py-2 rounded-xl">
                        <span className="material-symbols-outlined text-[20px] text-primary">location_on</span>
                        <span className="text-sm font-medium">{post.location.city}, {post.location.district}</span>
                    </div>

                    <div className="prose dark:prose-invert max-w-none">
                        <p className="text-[#4a403a] dark:text-[#d1c6be] text-lg leading-relaxed whitespace-pre-wrap">
                            {post.content}
                        </p>
                    </div>

                    {/* 更多图片 */}
                    {post.images && post.images.length > 1 && (
                        <div className="mt-8 grid grid-cols-2 gap-2">
                            {post.images.slice(1).map((img, idx) => (
                                <img key={idx} src={img} alt="" className="w-full aspect-square object-cover rounded-2xl" />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* 底部悬浮操作栏 */}
            <div className="fixed bottom-0 left-0 w-full bg-white/90 dark:bg-background-dark/95 backdrop-blur-xl border-t border-gray-100 dark:border-gray-800 p-4 pb-8 z-50">
                <div className="max-w-md mx-auto flex gap-4">
                    <button className="h-14 w-14 flex items-center justify-center rounded-2xl bg-gray-50 dark:bg-surface-dark border border-gray-100 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:text-red-500 transition-colors">
                        <span className="material-symbols-outlined text-[28px]">favorite</span>
                    </button>
                    <button
                        onClick={handleContact}
                        className="flex-1 h-14 bg-primary hover:bg-primary/90 active:scale-[0.98] transition-all text-white font-bold text-lg rounded-2xl shadow-lg shadow-primary/30 flex items-center justify-center gap-2"
                    >
                        <span className="material-symbols-outlined text-[24px]">chat_bubble</span>
                        联系发布者
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PostDetailScreen;
