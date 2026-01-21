import React, { useEffect, useState } from 'react';
import { supabase } from '../api/supabase';
import { PawPrint, FileCheck, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const StatCard: React.FC<{ title: string; value: string | number; icon: React.ElementType; color: string }> = ({ title, value, icon: Icon, color }) => (
    <div className="flex items-center gap-5 hover:shadow-lg transition-all border border-gray-200/60 shadow-sm bg-white dark:bg-card-dark p-6 rounded-[2rem]">
        <div className={`p-4 rounded-[1.5rem] ${color} bg-opacity-10 flex-shrink-0`}>
            <Icon className={color.replace('bg-', 'text-')} size={24} />
        </div>
        <div className="min-w-0 flex-1">
            <p className="text-[10px] font-black text-text-muted uppercase tracking-widest">{title}</p>
            <h3 className="text-2xl font-black text-text-main dark:text-white mt-0.5">{value}</h3>
        </div>
    </div>
);

const Dashboard: React.FC = () => {
    const [stats, setStats] = useState({ pets: 0, applications: 0, users: 0 });
    const [recentPets, setRecentPets] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const [
                    { count: petCount, data: petsData },
                    { count: appCount },
                    { count: userCount }
                ] = await Promise.all([
                    supabase.from('pets').select('*', { count: 'exact' }).order('created_at', { ascending: false }).limit(4),
                    supabase.from('applications').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
                    supabase.from('profiles').select('*', { count: 'exact', head: true }),
                ]);

                setStats({
                    pets: petCount || 0,
                    applications: appCount || 0,
                    users: userCount || 0
                });
                setRecentPets(petsData || []);
            } catch (err) {
                console.error('Fetch error:', err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
            <header className="flex flex-col gap-1 px-4">
                <h2 className="text-3xl font-black text-text-main dark:text-white tracking-tight">控制面板</h2>
                <p className="text-text-muted font-medium text-sm">欢迎回来，这是今天的平台简报</p>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
                <StatCard title="总宠物入库" value={stats.pets} icon={PawPrint} color="bg-primary" />
                <StatCard title="待处理申请" value={stats.applications} icon={FileCheck} color="bg-secondary" />
                <StatCard title="活跃用户" value={stats.users} icon={Users} color="bg-accent" />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 px-4">
                {/* Recent Pets Section */}
                <section className="card !p-0 border border-gray-200/80 shadow-soft overflow-hidden rounded-[2.5rem]">
                    <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50/30">
                        <h3 className="text-lg font-black flex items-center gap-2 text-text-main">
                            <PawPrint size={20} className="text-primary" />
                            最近入库
                        </h3>
                        <Link to="/pets" className="text-xs font-bold text-primary hover:bg-primary/5 px-3 py-1.5 rounded-xl border border-primary/20 transition-colors">
                            管理全部
                        </Link>
                    </div>

                    <div className="p-4 space-y-3">
                        {loading ? (
                            <div className="py-20 flex flex-col items-center justify-center text-text-muted gap-3">
                                <div className="w-10 h-10 border-[3px] border-primary/20 border-t-primary rounded-full animate-spin"></div>
                                <span className="text-xs font-bold tracking-widest uppercase opacity-60">加载中...</span>
                            </div>
                        ) : recentPets.length === 0 ? (
                            <div className="py-20 text-center text-text-muted italic bg-background-light/50 dark:bg-background-dark/50 rounded-[2rem] border border-dashed border-gray-200">
                                暂无入库记录
                            </div>
                        ) : (
                            recentPets.map(pet => (
                                <div key={pet.id} className="group flex items-center gap-4 p-3.5 rounded-[2.25rem] bg-white dark:bg-card-dark border border-gray-100 hover:border-primary/30 hover:shadow-md transition-all">
                                    <div className="relative w-16 h-16 rounded-[1.5rem] overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200">
                                        <img
                                            src={pet.image_url}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            alt=""
                                            onError={(e: any) => {
                                                e.target.src = 'https://api.dicebear.com/7.x/bottts/svg?seed=' + pet.id;
                                            }}
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-black text-base text-text-main truncate">{pet.name}</h4>
                                        <p className="text-xs text-text-muted font-bold mt-1 inline-flex items-center gap-2">
                                            <span className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-md">{pet.breed}</span>
                                            <span className="opacity-40">•</span>
                                            <span>{pet.age}</span>
                                        </p>
                                    </div>
                                    <div className={`text-[10px] font-black px-2.5 py-1.5 rounded-xl uppercase tracking-wider shadow-sm ${pet.status === 'available' ? 'bg-green-500 text-white' : 'bg-orange-500 text-white'
                                        }`}>
                                        {pet.status === 'available' ? '在架' : '已领养'}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </section>

                {/* Action Center Section */}
                <div className="space-y-8">
                    <section className="card !p-0 border border-gray-200/80 shadow-soft overflow-hidden rounded-[2.5rem]">
                        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50/30">
                            <h3 className="text-lg font-black flex items-center gap-2 text-text-main">
                                <FileCheck size={20} className="text-green-500" />
                                待办事项
                            </h3>
                            <span className="bg-green-50 text-green-600 text-[10px] font-black px-2.5 py-1 rounded-xl border border-green-100">
                                {stats.applications} 条申请
                            </span>
                        </div>

                        <div className="p-6 space-y-4">
                            <div className="group flex items-start gap-4 p-5 rounded-[2.5rem] bg-green-50/40 dark:bg-green-900/10 border border-green-100 hover:border-green-200 transition-all cursor-pointer">
                                <div className="mt-1 h-2.5 w-2.5 rounded-full bg-green-500 shrink-0 shadow-[0_0_12px_rgba(34,197,94,0.6)] animate-pulse"></div>
                                <div className="flex-1">
                                    <p className="text-sm font-black text-text-main">审核新的领养申请</p>
                                    <p className="text-xs text-text-muted mt-1.5 leading-relaxed font-medium">目前有 <span className="text-green-600 font-black">{stats.applications}</span> 位新的潜在领养人正在等待您的审核。</p>
                                    <div className="mt-4 flex gap-2">
                                        <button className="text-[10px] font-black bg-green-500 text-white px-4 py-2 rounded-2xl hover:bg-green-600 transition-colors uppercase tracking-widest">立即处理</button>
                                        <button className="text-[10px] font-black bg-white text-text-muted px-4 py-2 rounded-2xl border border-gray-200 hover:bg-gray-50 transition-colors">忽略</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="card !p-0 border border-green-200 shadow-sm overflow-hidden bg-gradient-to-br from-green-50/50 to-transparent rounded-[2.5rem]">
                        <div className="p-8 h-full flex flex-col items-start gap-4">
                            <div className="flex flex-col gap-2">
                                <div className="inline-flex items-center gap-2 bg-green-100 text-green-600 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border border-green-200">
                                    <span className="relative flex h-1.5 w-1.5">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                                    </span>
                                    管理技巧
                                </div>
                                <h4 className="text-xl font-black text-text-main">自动化管理流程</h4>
                                <p className="text-sm text-text-muted leading-relaxed font-medium max-w-sm">
                                    在这里，审批通过不仅是同意申请。系统会为您<b>自动发消息</b>给申请人，并<b>自动将宠物下线</b>，确保信息实时准确。
                                </p>
                            </div>
                            <button className="mt-4 flex items-center gap-2 text-sm font-black text-green-600 hover:gap-3 transition-all">
                                阅读管理手册 <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                            </button>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
