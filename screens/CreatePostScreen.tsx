import React from 'react';
import { useNavigate } from 'react-router-dom';

const CreatePostScreen: React.FC = () => {
    const navigate = useNavigate();

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
                    onClick={() => navigate('/forum')}
                    className="bg-primary hover:bg-[#0f8ecb] text-white text-[14px] font-bold px-4 py-1.5 rounded-full shadow-sm shadow-primary/20 active:scale-95 transition-all"
                >
                    发布
                </button>
            </header>

            <main className="flex-1 p-4 space-y-4">
                <div className="bg-white dark:bg-surface-dark rounded-2xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                    <div className="flex items-center justify-between mb-3">
                        <label className="font-bold text-gray-900 dark:text-white text-sm">上传照片</label>
                        <span className="text-xs text-gray-400">已选 1/9</span>
                    </div>
                    <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
                        <div className="relative size-24 shrink-0 rounded-xl overflow-hidden group border border-gray-100 dark:border-gray-700">
                            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDNgVh4DJGy5DBClF4Ko4pufTG4XNUn05LjLauMrm98gcAJmjpGVMXR9msmyEG0TICn_4U7Gy-j_Jal0wNDgH-QYkICKC7N57GlcC1h4eU7yB_7F38RQPAGmW5E3LD7deIBIhZI53RY9e8RwJgQwtedtbuyEe3iGu0VwSEYSsUsZqkFwHCAHLmcUFsIaBiPcgFwHT8vFg1B9qi03G0KfJBzgoSwunMUIrz-WTUHyK-bRx9RBiNOAxSjPZHGeg1v7NboIMVJ4Zia_s" alt="Uploaded pet" className="w-full h-full object-cover" />
                            <button className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-0.5 backdrop-blur-sm active:scale-90 transition-transform">
                                <span className="material-symbols-outlined text-[14px] block">close</span>
                            </button>
                        </div>
                        <button className="size-24 shrink-0 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex flex-col items-center justify-center text-gray-400 gap-1 active:bg-gray-100 dark:active:bg-gray-800 transition-colors">
                            <span className="material-symbols-outlined text-[28px]">add</span>
                            <span className="text-xs font-medium">添加照片</span>
                        </button>
                    </div>
                </div>

                <div className="bg-white dark:bg-surface-dark rounded-2xl px-4 py-2 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                    <div className="py-1">
                        <input type="text" placeholder="请输入求助标题" className="w-full bg-transparent border-0 border-b border-gray-100 dark:border-gray-800 px-0 py-3.5 text-lg font-bold placeholder-gray-400 text-gray-900 dark:text-white focus:ring-0 focus:border-primary transition-colors font-display" />
                    </div>
                    <div className="py-2">
                        <textarea placeholder="请描述宠物的详细情况，如品种、年龄、健康状况、走失地点等信息..." className="w-full bg-transparent border-0 px-0 text-[15px] leading-relaxed placeholder-gray-400 text-gray-900 dark:text-white focus:ring-0 min-h-[140px] resize-none font-display"></textarea>
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
                            <span className="text-sm font-medium">选择位置</span>
                            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                        </div>
                    </button>
                    <div className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-3.5 shrink-0">
                            <div className="size-9 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-green-500">
                                <span className="material-symbols-outlined text-[20px] filled">perm_phone_msg</span>
                            </div>
                            <span className="font-bold text-sm text-gray-900 dark:text-white">联系方式</span>
                        </div>
                        <input type="text" placeholder="手机号 / 微信号" className="flex-1 bg-transparent border-none text-right text-gray-900 dark:text-white placeholder-gray-400 focus:ring-0 p-0 ml-4 text-sm font-medium font-display" />
                    </div>
                </div>

                <div className="px-2 mt-2">
                    <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed text-center font-display">
                        发布即表示您同意我们的<span className="text-primary font-medium">《流浪动物救助公约》</span>。
                        <br />请确保信息真实有效，共同维护温暖的社区环境。
                    </p>
                </div>
            </main>
        </div>
    );
};

export default CreatePostScreen;