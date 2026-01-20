import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { ApplicationStatus } from '../types';

/** 申请项数据 */
interface ApplicationItem {
    id: string;
    petName: string;
    petBreed: string;
    petImage: string;
    status: ApplicationStatus;
    submittedAt: string;
    updatedAt: string;
}

/** 模拟申请数据 */
const mockApplications: ApplicationItem[] = [
    {
        id: 'app-1',
        petName: '巴弟',
        petBreed: '金毛',
        petImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDiPoSXxeAmwXX64LAmWPvtmvbsfYt9pj4A7VCK0PHqER2A6IYXJzEJL-RJIrohMNZzbv9Xsh8Y_d4XQKJ2WSwIOR7aYAgDdi2l94womrJXF6mjO5ohxKeOaffDenloX1VwOmsb4O28pNhmWSrhkqrwiYsrubq51rPF_NU0QuR37JCYVtUZxbacrm1qzqC55XdLkU8063LgiDL4YUxYMiEwxEBUxvaQnNIW4mnO4rhW5xe-dJn7wEOtmYv9VnzDG9h7RjEln6fEd4o',
        status: 'reviewing',
        submittedAt: '2026-01-18',
        updatedAt: '2026-01-19',
    },
    {
        id: 'app-2',
        petName: '露娜',
        petBreed: '暹罗猫',
        petImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7W_vs2Xe_HI4vs0hTdtKRbEnVm0gPK2cP2sO3n8V0z17uVTpwq3LPNfUngsgKKaM33XBZOiAxC8TlIgg1VWwvtXnUGLTnj_P3jRgG1j6YXLzsNx5-0_y4Ra8GqTJrhlfFzzV5rByq31xoJ-pf27eNPLvFxE5J3xe4CYsZ0CsraJA5Q7OJFWpMIADW5dDBU7VnlAr--BAZK7C0Iy6YD6sogAk4J-Nljbiug3x4WvWROJAqowckLKUsJyMRE162ig7jEiN22GBkwA8',
        status: 'approved',
        submittedAt: '2026-01-10',
        updatedAt: '2026-01-15',
    },
];

/** 状态配置 */
const statusConfig: Record<ApplicationStatus, { label: string; color: string; icon: string }> = {
    pending: { label: '待提交', color: 'text-gray-500 bg-gray-100 dark:bg-gray-800', icon: 'schedule' },
    reviewing: { label: '审核中', color: 'text-orange-500 bg-orange-50 dark:bg-orange-900/20', icon: 'hourglass_empty' },
    approved: { label: '已通过', color: 'text-green-500 bg-green-50 dark:bg-green-900/20', icon: 'check_circle' },
    rejected: { label: '未通过', color: 'text-red-500 bg-red-50 dark:bg-red-900/20', icon: 'cancel' },
};

/**
 * 我的申请页面
 * 展示用户的领养申请列表和状态
 */
const MyApplicationsScreen: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark pb-24">
            {/* 头部 */}
            <header className="sticky top-0 z-20 bg-surface-light dark:bg-surface-dark px-4 py-3 border-b border-gray-100 dark:border-gray-800 shadow-sm">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center justify-center size-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        <span className="material-symbols-outlined text-text-main dark:text-white">arrow_back</span>
                    </button>
                    <h1 className="text-xl font-bold text-text-main dark:text-white">我的申请</h1>
                </div>
            </header>

            <main className="px-4 py-4 space-y-4">
                {mockApplications.map((app) => {
                    const config = statusConfig[app.status];

                    return (
                        <div
                            key={app.id}
                            className="bg-white dark:bg-surface-dark rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-800"
                        >
                            <div className="flex gap-4">
                                {/* 宠物图片 */}
                                <div
                                    className="w-20 h-20 rounded-xl bg-cover bg-center shrink-0"
                                    style={{ backgroundImage: `url('${app.petImage}')` }}
                                />

                                {/* 申请信息 */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between mb-1">
                                        <h3 className="text-base font-bold text-text-main dark:text-white truncate">
                                            {app.petName}
                                        </h3>
                                        <span
                                            className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold shrink-0 ${config.color}`}
                                        >
                                            <span className="material-symbols-outlined text-[14px]">{config.icon}</span>
                                            {config.label}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{app.petBreed}</p>
                                    <div className="flex items-center gap-4 text-xs text-gray-400">
                                        <span>提交：{app.submittedAt}</span>
                                        <span>更新：{app.updatedAt}</span>
                                    </div>
                                </div>
                            </div>

                            {/* 操作按钮 */}
                            <div className="flex gap-3 mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                                <button
                                    onClick={() => navigate('/messages')}
                                    className="flex-1 h-10 flex items-center justify-center gap-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-text-main dark:text-white font-medium text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <span className="material-symbols-outlined text-[18px]">chat</span>
                                    联系救助站
                                </button>
                                <button
                                    onClick={() => navigate(`/pet/${app.id}`)}
                                    className="flex-1 h-10 flex items-center justify-center gap-2 rounded-xl bg-primary/10 text-primary font-medium text-sm hover:bg-primary/20 transition-colors"
                                >
                                    <span className="material-symbols-outlined text-[18px]">visibility</span>
                                    查看详情
                                </button>
                            </div>
                        </div>
                    );
                })}

                {mockApplications.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                            <span className="material-symbols-outlined text-5xl text-gray-300 dark:text-gray-600">
                                description
                            </span>
                        </div>
                        <h3 className="text-lg font-bold text-text-main dark:text-white mb-2">
                            暂无申请记录
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                            去浏览宠物，找到心仪的毛孩子提交领养申请吧
                        </p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default MyApplicationsScreen;
