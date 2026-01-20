import React from 'react';
import { useNavigate } from 'react-router-dom';

const SettingsScreen: React.FC = () => {
    const navigate = useNavigate();

    const settingsGroups = [
        {
            title: '账号设置',
            items: [
                { icon: 'person', label: '账号与安全', value: '' },
                { icon: 'notifications', label: '消息通知', value: '开启' },
                { icon: 'lock', label: '隐私设置', value: '' },
            ]
        },
        {
            title: '通用设置',
            items: [
                { icon: 'contrast', label: '显示模式', value: '跟随系统' },
                { icon: 'language', label: '多语言', value: '简体中文' },
                { icon: 'database', label: '清除缓存', value: '1.2 GB' },
            ]
        },
        {
            title: '关于',
            items: [
                { icon: 'info', label: '关于 PetConnect', value: 'v2.4.0' },
                { icon: 'description', label: '用户协议', value: '' },
                { icon: 'shield_with_heart', label: '隐私政策', value: '' },
            ]
        }
    ];

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen pb-10 flex justify-center">
            <div className="relative w-full max-w-[430px] flex flex-col bg-background-light dark:bg-background-dark shadow-2xl">
                {/* Header */}
                <div className="flex items-center p-4 sticky top-0 z-10 backdrop-blur-md bg-transparent">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center justify-center size-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                    >
                        <span className="material-symbols-outlined">arrow_back</span>
                    </button>
                    <h2 className="flex-1 text-center text-lg font-bold mr-10">设置</h2>
                </div>

                <div className="flex flex-col gap-6 px-4 pt-4">
                    {settingsGroups.map((group, idx) => (
                        <div key={idx} className="flex flex-col gap-2">
                            <h3 className="text-text-secondary dark:text-gray-500 text-xs font-semibold uppercase tracking-wider ml-2">
                                {group.title}
                            </h3>
                            <div className="flex flex-col rounded-2xl bg-surface-light dark:bg-surface-dark shadow-sm border border-transparent dark:border-white/5 overflow-hidden">
                                {group.items.map((item, itemIdx) => (
                                    <React.Fragment key={itemIdx}>
                                        <button
                                            onClick={() => item.icon === 'help_center' ? navigate('/help') : null}
                                            className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group"
                                        >
                                            <div className="flex items-center justify-center rounded-xl bg-gray-50 dark:bg-white/5 text-gray-400 group-hover:text-primary transition-colors shrink-0 size-10">
                                                <span className="material-symbols-outlined">{item.icon}</span>
                                            </div>
                                            <div className="flex-1 flex justify-between items-center text-left">
                                                <p className="text-text-main dark:text-white text-base font-medium">{item.label}</p>
                                                <p className="text-text-secondary dark:text-gray-500 text-sm">{item.value}</p>
                                            </div>
                                            <span className="material-symbols-outlined text-gray-300 dark:text-gray-600">chevron_right</span>
                                        </button>
                                        {itemIdx < group.items.length - 1 && (
                                            <div className="h-px w-full bg-gray-100 dark:bg-white/5 ml-14"></div>
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    ))}

                    <button
                        onClick={() => {
                            if (window.confirm('确定要退出登录吗？')) {
                                navigate('/login');
                            }
                        }}
                        className="w-full mt-4 py-4 rounded-2xl text-red-500 font-bold bg-surface-light dark:bg-surface-dark border border-red-100 dark:border-red-900/30 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all shadow-sm flex items-center justify-center gap-2"
                    >
                        <span className="material-symbols-outlined">logout</span>
                        退出当前账号
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SettingsScreen;
