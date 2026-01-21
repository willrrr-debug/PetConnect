import React, { useEffect, useState } from 'react';
import { supabase, supabaseAdmin } from '../api/supabase';
import { CheckCircle, XCircle, User, Calendar } from 'lucide-react';

interface Application {
    id: string;
    pet_id: string;
    user_id: string;
    status: string;
    created_at: string;
    pet: {
        name: string;
        image_url: string;
        breed: string;
        type: string;
    };
    user: {
        name: string;
        avatar_url?: string;
    };
}

const AdoptionApproval: React.FC = () => {
    const [applications, setApplications] = useState<Application[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchApplications();
    }, []);

    async function fetchApplications() {
        setLoading(true);
        const { data, error } = await supabase
            .from('applications')
            .select(`
        *,
        pet:pets(name, image_url, breed, type),
        user:profiles(name, avatar_url)
      `)
            .order('created_at', { ascending: false });

        if (!error && data) {
            setApplications(data as any);
        }
        setLoading(false);
    }

    async function handleApprove(app: Application) {
        if (!window.confirm(`确定批准 ${app.user.name} 领养 ${app.pet.name} 吗？`)) return;

        try {
            const { error: appError } = await supabaseAdmin
                .from('applications')
                .update({ status: 'approved' })
                .eq('id', app.id);

            if (appError) throw appError;

            const { error: petError } = await supabaseAdmin
                .from('pets')
                .update({ status: 'adopted' })
                .eq('id', app.pet_id);

            if (petError) throw petError;

            await supabaseAdmin
                .from('messages')
                .insert({
                    conversation_id: app.id,
                    sender_id: null,
                    content: `恭喜！您的领养申请已通过，宠物 "${app.pet.name}" 正期待与您见面。`,
                    type: 'system'
                });

            fetchApplications();
        } catch (error: any) {
            alert('审批失败: ' + error.message);
        }
    }

    async function handleReject(app: Application) {
        if (!window.confirm(`确定拒绝该申请吗？`)) return;

        const { error } = await supabaseAdmin
            .from('applications')
            .update({ status: 'rejected' })
            .eq('id', app.id);

        if (error) alert('操作失败');
        else fetchApplications();
    }

    return (
        <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in duration-500 pb-20">
            <div className="px-4">
                <h2 className="text-3xl font-black text-text-main dark:text-white tracking-tight">领养审批中心</h2>
                <p className="text-text-muted mt-1 font-medium">审核每一份爱心申请，为毛孩子找到最温暖的家</p>
            </div>

            <div className="grid grid-cols-1 gap-6 px-4">
                {loading ? (
                    <div className="py-40 flex flex-col items-center justify-center gap-4">
                        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                        <p className="text-text-muted font-bold tracking-widest uppercase text-xs">正在获取申请列表...</p>
                    </div>
                ) : applications.length === 0 ? (
                    <div className="bg-white dark:bg-card-dark rounded-[2rem] p-20 text-center border border-dashed border-gray-200">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Calendar className="text-gray-300" size={32} />
                        </div>
                        <h4 className="text-xl font-black text-text-main dark:text-white">暂无待处理申请</h4>
                        <p className="text-text-muted mt-2">新申请出现时我们会第一时间通知您</p>
                    </div>
                ) : applications.map((app) => (
                    <div key={app.id} className="group bg-white dark:bg-card-dark rounded-[2.5rem] p-2 border border-gray-100 shadow-soft hover:shadow-xl transition-all duration-300">
                        <div className="flex flex-col md:flex-row items-stretch gap-6">
                            {/* Pet Info Side */}
                            <div className="relative w-full md:w-64 h-48 md:h-auto overflow-hidden rounded-[2rem] flex-shrink-0">
                                <img src={app.pet.image_url} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                <div className="absolute bottom-4 left-4">
                                    <h5 className="text-white font-black text-lg">{app.pet.name}</h5>
                                    <p className="text-white/80 text-[10px] font-bold uppercase tracking-wider">{app.pet.breed}</p>
                                </div>
                            </div>

                            {/* Main Content */}
                            <div className="flex-1 py-6 px-4 flex flex-col justify-between">
                                <div className="space-y-4">
                                    <div className="flex flex-wrap items-center justify-between gap-4">
                                        <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800/50 px-4 py-2 rounded-2xl">
                                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                                <User size={16} />
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-text-muted font-black uppercase tracking-tight">申请人</p>
                                                <p className="font-black text-sm">{app.user.name}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800/50 px-4 py-2 rounded-2xl">
                                            <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500">
                                                <Calendar size={16} />
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-text-muted font-black uppercase tracking-tight">申请时间</p>
                                                <p className="font-black text-sm">{new Date(app.created_at).toLocaleDateString()}</p>
                                            </div>
                                        </div>

                                        <div className={`px-4 py-2 rounded-2xl font-black text-xs uppercase tracking-widest ${app.status === 'pending' ? 'bg-orange-50 text-orange-500 border border-orange-200' :
                                            app.status === 'approved' ? 'bg-green-50 text-green-600 border border-green-200' :
                                                'bg-red-50 text-red-500 border border-red-200'
                                            }`}>
                                            {app.status === 'pending' ? '• 等待审核' : app.status === 'approved' ? '✓ 领养成功' : '✕ 已拒绝'}
                                        </div>
                                    </div>

                                    <div className="bg-gray-50/50 dark:bg-gray-800/20 p-4 rounded-2xl border border-gray-100/50">
                                        <p className="text-xs text-text-muted font-medium leading-relaxed italic">
                                            " 申请人已经通过平台身份认证，正在等待关于该领养申请的最终决定。该过程涉及详细的背景调查和家访评估。 "
                                        </p>
                                    </div>
                                </div>

                                {app.status === 'pending' && (
                                    <div className="flex items-center gap-3 mt-8">
                                        <button
                                            onClick={() => handleApprove(app)}
                                            className="flex-1 bg-green-500 hover:bg-green-600 text-white font-black py-4 rounded-2xl shadow-lg shadow-green-500/20 transition-all flex items-center justify-center gap-2"
                                        >
                                            <CheckCircle size={20} />
                                            批准领养
                                        </button>
                                        <button
                                            onClick={() => handleReject(app)}
                                            className="flex-1 bg-white hover:bg-red-50 text-red-500 border border-red-100 font-black py-4 rounded-2xl transition-all flex items-center justify-center gap-2"
                                        >
                                            <XCircle size={20} />
                                            拒绝申请
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdoptionApproval;
