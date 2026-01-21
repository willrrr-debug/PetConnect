import React, { useState } from 'react';
import { User, Shield, Bell, Cloud, Globe, Lock, Save } from 'lucide-react';

const Settings: React.FC = () => {
    const [activeTab, setActiveTab] = useState('account');

    const tabs = [
        { id: 'account', label: '个人账户', icon: User },
        { id: 'security', label: '安全设置', icon: Lock },
        { id: 'notifications', label: '通知管理', icon: Bell },
        { id: 'platform', label: '平台参数', icon: Shield },
        { id: 'storage', label: '存储配置', icon: Cloud },
    ];

    return (
        <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in duration-500 pb-20">
            <div className="px-4">
                <h2 className="text-3xl font-black text-text-main dark:text-white tracking-tight">系统设置</h2>
                <p className="text-text-muted mt-1 font-medium">配置您的个人偏好与平台核心参数</p>
            </div>

            <div className="flex flex-col md:flex-row gap-10 px-4">
                {/* Sidebar Tabs */}
                <div className="w-full md:w-64 space-y-2">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-sm transition-all ${activeTab === tab.id
                                ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                : 'text-text-muted hover:bg-white hover:text-text-main'
                                }`}
                        >
                            <tab.icon size={20} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="flex-1 bg-white dark:bg-card-dark rounded-[2.5rem] border border-gray-100 shadow-soft p-10">
                    {activeTab === 'account' && (
                        <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
                            <div className="flex items-center gap-6">
                                <div className="relative group">
                                    <div className="w-24 h-24 rounded-[2rem] bg-gray-100 border-4 border-white shadow-xl overflow-hidden flex items-center justify-center">
                                        <User size={40} className="text-gray-300" />
                                    </div>
                                    <button className="absolute -bottom-2 -right-2 w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                                        <Globe size={18} />
                                    </button>
                                </div>
                                <div>
                                    <h4 className="text-xl font-black text-text-main">超级管理员</h4>
                                    <p className="text-sm text-text-muted font-bold mt-1 uppercase tracking-widest">Administrator</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase text-text-muted">显示名称</label>
                                    <input className="w-full bg-gray-50 rounded-2xl px-5 py-4 font-bold border border-transparent focus:border-primary outline-none transition-all" defaultValue="Admin" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase text-text-muted">邮箱地址</label>
                                    <input className="w-full bg-gray-50 rounded-2xl px-5 py-4 font-bold border border-transparent focus:border-primary outline-none transition-all" defaultValue="admin@petconnect.com" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase text-text-muted">职责描述</label>
                                <textarea rows={3} className="w-full bg-gray-50 rounded-2xl px-5 py-4 font-bold border border-transparent focus:border-primary outline-none transition-all resize-none" defaultValue="负责平台全量数据的审计与宠物录入审批。" />
                            </div>
                        </div>
                    )}

                    {activeTab === 'storage' && (
                        <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
                            <div className="p-6 rounded-[2rem] bg-orange-50 border border-orange-100 flex items-start gap-4">
                                <Cloud className="text-orange-500 mt-1" size={24} />
                                <div>
                                    <h5 className="font-black text-orange-900">Cloudflare R2 已连接</h5>
                                    <p className="text-sm text-orange-700 font-medium mt-1">目前所有宠物照片都已同步存储在 Cloudflare R2 边缘存储中，提供极速的全球访问体验。</p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-center justify-between p-4 rounded-2xl border border-gray-100">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center"><Globe size={20} className="text-text-muted" /></div>
                                        <div>
                                            <p className="font-black text-sm">存储桶名称 (Bucket)</p>
                                            <p className="text-xs text-text-muted font-bold">petconnect-images</p>
                                        </div>
                                    </div>
                                    <span className="px-3 py-1 bg-green-500 text-white text-[10px] font-black rounded-lg uppercase tracking-widest">Active</span>
                                </div>

                                <div className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 font-medium text-sm text-text-muted italic">
                                    其他配置信息已在环境变量中加密存储。
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'notifications' && (
                        <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
                            <div className="space-y-4">
                                <h4 className="text-sm font-black text-text-main flex items-center gap-2">
                                    <Bell size={18} className="text-primary" />
                                    邮件提醒服务
                                </h4>
                                <div className="space-y-3">
                                    {[
                                        { label: '有新的领养申请时通知我', checked: true },
                                        { label: '有新的用户注册时通知我', checked: false },
                                        { label: '系统周报摘要', checked: true },
                                    ].map((item, i) => (
                                        <label key={i} className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 border border-transparent hover:border-gray-200 transition-all cursor-pointer">
                                            <span className="font-bold text-sm">{item.label}</span>
                                            <div className={`w-12 h-6 rounded-full transition-all relative ${item.checked ? 'bg-green-500' : 'bg-gray-200'}`}>
                                                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${item.checked ? 'left-7' : 'left-1'}`}></div>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <div className="space-y-8 animate-in slide-in-from-right-4 duration-300 text-center py-20">
                            <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Lock className="text-orange-300" size={32} />
                            </div>
                            <h4 className="text-xl font-black text-text-main">高级安全选项</h4>
                            <p className="text-text-muted mt-2 max-w-xs mx-auto text-sm font-medium leading-relaxed">
                                为了您的账户安全，修改密码或开启双重认证需要进行额外的身份核验。
                            </p>
                            <button className="mt-8 px-8 py-4 bg-orange-500 text-white font-black rounded-2xl shadow-lg shadow-orange-500/20 hover:scale-105 active:scale-95 transition-all">
                                进入安全中心
                            </button>
                        </div>
                    )}

                    {activeTab === 'platform' && (
                        <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="p-6 rounded-[2rem] border-2 border-primary/20 bg-primary/5 space-y-3">
                                    <h5 className="font-black text-primary">维护模式</h5>
                                    <p className="text-xs text-text-muted font-medium">开启后，小程序端将进入维护状态，停止所有公开访问。</p>
                                    <button className="w-full py-3 bg-white text-primary font-black rounded-xl border border-primary/20 hover:bg-primary hover:text-white transition-all">立即开启</button>
                                </div>
                                <div className="p-6 rounded-[2rem] border-2 border-gray-100 bg-gray-50 space-y-3">
                                    <h5 className="font-black text-text-main">数据审计</h5>
                                    <p className="text-xs text-text-muted font-medium">自动清理超过 30 天的系统冗余日志，保持数据库性能。</p>
                                    <button className="w-full py-3 bg-white text-text-muted font-black rounded-xl border border-gray-200 hover:bg-gray-100 transition-all">立即清理</button>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="mt-12 pt-8 border-t border-gray-100 flex justify-end">
                        <button className="flex items-center gap-2 bg-text-main text-white px-8 py-4 rounded-2xl font-black shadow-xl hover:scale-105 active:scale-95 transition-all">
                            <Save size={18} />
                            保存配置更改
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
