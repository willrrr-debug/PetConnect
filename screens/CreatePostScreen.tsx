import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { postService } from '../services/posts';

const CreatePostScreen: React.FC = () => {
    const navigate = useNavigate();
    const { user, profile, isMockMode } = useApp();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [images, setImages] = useState<string[]>([]);
    const [location, setLocation] = useState('上海, 静安区');
    const [contact, setContact] = useState('');
    const [isEmergency, setIsEmergency] = useState(false);
    const [isPublishing, setIsPublishing] = useState(false);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            Array.from(files).forEach((file: File) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const img = new Image();
                    img.src = reader.result as string;
                    img.onload = () => {
                        // 创建 Canvas 进行压缩
                        const canvas = document.createElement('canvas');
                        let width = img.width;
                        let height = img.height;

                        // 限制最大宽度为 1024px
                        const MAX_WIDTH = 1024;
                        if (width > MAX_WIDTH) {
                            height = Math.round((height * MAX_WIDTH) / width);
                            width = MAX_WIDTH;
                        }

                        canvas.width = width;
                        canvas.height = height;
                        const ctx = canvas.getContext('2d');
                        ctx?.drawImage(img, 0, 0, width, height);

                        // 导出压缩后的 Base64 (质量 0.7)
                        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
                        setImages(prev => [...prev, compressedBase64].slice(0, 9));
                    };
                };
                reader.readAsDataURL(file);
            });
        }
    };

    const removeImage = (index: number) => {
        setImages(prev => prev.filter((_, i) => i !== index));
    };

    const handlePublish = async () => {
        if (!title.trim() || !content.trim()) {
            alert('请填写标题和内容');
            return;
        }

        if (isMockMode) {
            alert('演示模式：发布成功！');
            navigate('/forum');
            return;
        }

        if (!user) {
            alert('请先登录');
            navigate('/login');
            return;
        }

        setIsPublishing(true);
        try {
            const { error } = await postService.createPost({
                user_id: user.id,
                title,
                content,
                image_url: images[0] || null,
                images: images,
                location: location,
                contact: contact,
                category: isEmergency ? 'emergency' : 'all',
                is_emergency: isEmergency
            });

            if (error) {
                alert('发布失败: ' + error.message);
            } else {
                alert('发布成功！');
                navigate('/forum');
            }
        } catch (err: any) {
            alert('发生错误: ' + err.message);
        } finally {
            setIsPublishing(false);
        }
    };

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-[#111618] dark:text-white overflow-x-hidden antialiased min-h-screen flex flex-col">
            <header className="sticky top-0 z-50 bg-white/80 dark:bg-surface-dark/90 backdrop-blur-lg border-b border-gray-100 dark:border-gray-800 px-4 h-[52px] flex items-center justify-between">
                <button
                    onClick={() => navigate(-1)}
                    className="text-gray-600 dark:text-gray-300 text-[16px] font-medium active:opacity-60 transition-opacity"
                >
                    取消
                </button>
                <h1 className="text-[17px] font-bold text-[#111618] dark:text-white">发布求助</h1>
                <button
                    onClick={handlePublish}
                    disabled={isPublishing}
                    className={`bg-primary hover:bg-[#0f8ecb] text-white text-[14px] font-bold px-4 py-1.5 rounded-full shadow-sm shadow-primary/20 active:scale-95 transition-all ${isPublishing ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {isPublishing ? '发布中...' : '发布'}
                </button>
            </header>

            <main className="flex-1 p-4 space-y-4">
                <div className="bg-white dark:bg-surface-dark rounded-2xl p-4 shadow-[0_2px_8_rgba(0,0,0,0.02)]">
                    <div className="flex items-center justify-between mb-3">
                        <label className="font-bold text-gray-900 dark:text-white text-sm">上传照片</label>
                        <span className="text-xs text-gray-400">已选 {images.length}/9</span>
                    </div>
                    <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
                        {images.map((img, index) => (
                            <div key={index} className="relative size-24 shrink-0 rounded-xl overflow-hidden group border border-gray-100 dark:border-gray-700">
                                <img src={img} alt={`Upload ${index}`} className="w-full h-full object-cover" />
                                <button
                                    onClick={() => removeImage(index)}
                                    className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-0.5 backdrop-blur-sm active:scale-90 transition-transform"
                                >
                                    <span className="material-symbols-outlined text-[14px] block">close</span>
                                </button>
                            </div>
                        ))}
                        {images.length < 9 && (
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="size-24 shrink-0 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex flex-col items-center justify-center text-gray-400 gap-1 active:bg-gray-100 dark:active:bg-gray-800 transition-colors"
                            >
                                <span className="material-symbols-outlined text-[28px]">add</span>
                                <span className="text-xs font-medium">添加照片</span>
                            </button>
                        )}
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageUpload}
                            accept="image/*"
                            multiple
                            className="hidden"
                        />
                    </div>
                </div>

                <div className="bg-white dark:bg-surface-dark rounded-2xl px-4 py-2 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                    <div className="py-1">
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="请输入求助标题"
                            className="w-full bg-transparent border-0 border-b border-gray-100 dark:border-gray-800 px-0 py-3.5 text-lg font-bold placeholder-gray-400 text-gray-900 dark:text-white focus:ring-0 focus:border-primary transition-colors font-display"
                        />
                    </div>
                    <div className="py-2">
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="请描述宠物的详细情况，如品种、年龄、健康状况、走失地点等信息..."
                            className="w-full bg-transparent border-0 px-0 text-[15px] leading-relaxed placeholder-gray-400 text-gray-900 dark:text-white focus:ring-0 min-h-[140px] resize-none font-display"
                        ></textarea>
                    </div>
                </div>

                <div className="bg-white dark:bg-surface-dark rounded-2xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.02)] divide-y divide-gray-50 dark:divide-gray-800">
                    <button className="w-full flex items-center justify-between p-4 active:bg-gray-50 dark:active:bg-gray-800 transition-colors group">
                        <div className="flex items-center gap-3.5">
                            <div className="size-9 rounded-full bg-[#FFB8A3]/20 dark:bg-[#FFB8A3]/10 flex items-center justify-center text-primary group-active:scale-95 transition-transform">
                                <span className="material-symbols-outlined text-[20px] filled">location_on</span>
                            </div>
                            <span className="font-bold text-sm text-gray-900 dark:text-white">所在位置</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-400 dark:text-gray-500">
                            <span className="text-sm font-medium">{location}</span>
                            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                        </div>
                    </button>

                    <div className="flex items-center justify-between p-4 px-10">
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="emergency-check"
                                checked={isEmergency}
                                onChange={(e) => setIsEmergency(e.target.checked)}
                                className="w-5 h-5 rounded border-gray-300 text-red-500 focus:ring-red-500"
                            />
                            <label htmlFor="emergency-check" className="text-sm font-bold text-red-500 flex items-center gap-1">
                                <span className="material-symbols-outlined text-sm">warning</span>
                                标记为紧急求助
                            </label>
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-3.5 shrink-0">
                            <div className="size-9 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-green-500">
                                <span className="material-symbols-outlined text-[20px] filled">perm_phone_msg</span>
                            </div>
                            <span className="font-bold text-sm text-gray-900 dark:text-white">联系方式</span>
                        </div>
                        <input
                            type="text"
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                            placeholder="手机号 / 微信号"
                            className="flex-1 bg-transparent border-none text-right text-gray-900 dark:text-white placeholder-gray-400 focus:ring-0 p-0 ml-4 text-sm font-medium font-display"
                        />
                    </div>
                </div>

                <div className="px-2 mt-2">
                    <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed text-center font-display">
                        发布即表示您同意我们的<span className="text-primary font-medium">《流浪动物救助公约》</span>。
                        <br />请确保信息真实有效，共同维护温暖社区环境。
                    </p>
                </div>
            </main>
        </div>
    );
};

export default CreatePostScreen;