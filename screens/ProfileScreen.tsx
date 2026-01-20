import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-background-light dark:bg-background-dark font-sans text-text-main dark:text-white transition-colors duration-200 min-h-screen pb-20">
      <div className="relative flex h-full min-h-screen w-full max-w-md mx-auto flex-col bg-background-light dark:bg-background-dark shadow-2xl overflow-x-hidden">
        <div className="flex items-center bg-transparent p-4 pb-2 justify-between sticky top-0 z-10 backdrop-blur-sm">
          <div className="flex-1"></div>
          <h2 className="text-text-main dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] text-center">个人资料</h2>
          <div className="flex-1 flex justify-end">
            <button className="text-text-main dark:text-white flex items-center justify-center size-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
              <span className="material-symbols-outlined">notifications</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center px-6 pt-6 pb-8">
          <div
            onClick={() => navigate('/edit-profile')}
            className="relative mb-4 group cursor-pointer"
          >
            <div
              className="bg-center bg-no-repeat bg-cover rounded-full h-32 w-32 shadow-lg ring-4 ring-white dark:ring-surface-dark transition-transform group-hover:scale-105 duration-300"
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB5vLJ1OukI1OOSo8_LttlcZX5TjojtbZORPDBx6pG4xwoDQd3RbyxS972wzKw8epwV5tpPst1PmTkAwpSkx_C3FhzDMYecJ67W_MCs9krFjOkrfJHvfsh0OqmyhY-_gMB2F0Z73z2uihz0dJhwXYDJcHdxqxdYR-S2vuvtAGVBpK3GJlgXM90WI3G-Gc1lugWPwh8IRYrW1lVyoIkffQFUICC-gw_Jj9BfUpurP9aSKNmKmtYoCazxup-k2kgrzSyIeG4mV6Dnbf0')" }}
            >
            </div>
            <div className="absolute bottom-1 right-1 bg-primary text-white p-2 rounded-full shadow-md flex items-center justify-center border-2 border-white dark:border-surface-dark">
              <span className="material-symbols-outlined text-sm">edit</span>
            </div>
          </div>
          <h1 className="text-text-main dark:text-white text-2xl font-bold leading-tight tracking-tight text-center mb-1">Sarah Jenkins</h1>
          <div className="flex items-center gap-1.5 bg-primary/10 dark:bg-primary/20 px-3 py-1 rounded-full mt-1">
            <span className="material-symbols-outlined text-primary text-lg filled">verified</span>
            <p className="text-primary text-sm font-semibold leading-normal">已认证领养人</p>
          </div>
        </div>

        <div className="px-4 mb-6">
          <div className="flex gap-3 w-full">
            <div className="flex-1 flex flex-col gap-1 items-center justify-center rounded-2xl p-4 bg-surface-light dark:bg-surface-dark shadow-sm border border-transparent dark:border-white/5 transition-all hover:shadow-md">
              <p className="text-primary text-3xl font-bold leading-tight">1</p>
              <p className="text-text-secondary dark:text-gray-400 text-xs font-medium uppercase tracking-wider">领养次数</p>
            </div>
            <div
              onClick={() => navigate('/favorites')}
              className="flex-1 flex flex-col gap-1 items-center justify-center rounded-2xl p-4 bg-surface-light dark:bg-surface-dark shadow-sm border border-transparent dark:border-white/5 transition-all hover:shadow-md cursor-pointer"
            >
              <p className="text-primary text-3xl font-bold leading-tight">14</p>
              <p className="text-text-secondary dark:text-gray-400 text-xs font-medium uppercase tracking-wider">收藏</p>
            </div>
            <div className="flex-1 flex flex-col gap-1 items-center justify-center rounded-2xl p-4 bg-surface-light dark:bg-surface-dark shadow-sm border border-transparent dark:border-white/5 transition-all hover:shadow-md">
              <p className="text-primary text-3xl font-bold leading-tight">5</p>
              <p className="text-text-secondary dark:text-gray-400 text-xs font-medium uppercase tracking-wider">关注</p>
            </div>
          </div>
        </div>

        <div className="px-4 mb-6">
          <div
            onClick={() => navigate('/messages')}
            className="flex items-center gap-4 p-4 rounded-2xl bg-surface-light dark:bg-surface-dark shadow-[0_4px_16px_rgba(0,0,0,0.06)] dark:shadow-none border border-transparent dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 transition-all group relative overflow-hidden cursor-pointer"
          >
            <div className="absolute left-0 top-4 bottom-4 w-1 bg-indigo-500 rounded-r-full"></div>
            <div className="flex items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-500 shrink-0 size-12 group-hover:scale-110 transition-transform relative">
              <span className="material-symbols-outlined">chat</span>
              <span className="absolute top-2.5 right-2.5 size-2.5 bg-red-500 border-2 border-indigo-50 dark:border-indigo-900 rounded-full"></span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-text-main dark:text-white text-lg font-bold leading-tight">消息中心</h3>
                <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm">3</span>
              </div>
              <p className="text-text-secondary dark:text-gray-400 text-xs mt-0.5 font-medium">查看最新的领养通知与私信</p>
            </div>
            <div className="text-gray-400 dark:text-gray-600 group-hover:text-primary transition-colors">
              <span className="material-symbols-outlined">chevron_right</span>
            </div>
          </div>
        </div>

        <div className="px-4 flex flex-col gap-3">
          <h3 className="text-text-secondary dark:text-gray-500 text-sm font-semibold uppercase tracking-wider ml-2 mb-1">账户</h3>
          <div className="flex flex-col rounded-2xl bg-surface-light dark:bg-surface-dark shadow-sm overflow-hidden border border-transparent dark:border-white/5">
            <div
              onClick={() => navigate('/my-applications')}
              className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group cursor-pointer"
            >
              <div className="flex items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-900/30 text-primary shrink-0 size-10 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined">description</span>
              </div>
              <div className="flex-1">
                <p className="text-text-main dark:text-white text-base font-medium leading-normal">我的申请</p>
              </div>
              <div className="text-gray-400 dark:text-gray-600 group-hover:text-primary transition-colors">
                <span className="material-symbols-outlined">chevron_right</span>
              </div>
            </div>
            <div className="h-px w-full bg-gray-100 dark:bg-white/5 ml-16"></div>
            <div
              onClick={() => navigate('/shelters')}
              className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group cursor-pointer"
            >
              <div className="flex items-center justify-center rounded-xl bg-orange-50 dark:bg-orange-900/30 text-orange-500 shrink-0 size-10 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined">calendar_month</span>
              </div>
              <div className="flex-1">
                <p className="text-text-main dark:text-white text-base font-medium leading-normal">救助站探访</p>
              </div>
              <div className="text-gray-400 dark:text-gray-600 group-hover:text-primary transition-colors">
                <span className="material-symbols-outlined">chevron_right</span>
              </div>
            </div>
          </div>

          <div className="h-2"></div>

          <h3 className="text-text-secondary dark:text-gray-500 text-sm font-semibold uppercase tracking-wider ml-2 mb-1">通用</h3>
          <div className="flex flex-col rounded-2xl bg-surface-light dark:bg-surface-dark shadow-sm overflow-hidden border border-transparent dark:border-white/5">
            <div
              onClick={() => navigate('/settings')}
              className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group cursor-pointer"
            >
              <div className="flex items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 shrink-0 size-10 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined">settings</span>
              </div>
              <div className="flex-1">
                <p className="text-text-main dark:text-white text-base font-medium leading-normal">设置</p>
              </div>
              <div className="text-gray-400 dark:text-gray-600 group-hover:text-primary transition-colors">
                <span className="material-symbols-outlined">chevron_right</span>
              </div>
            </div>
            <div className="h-px w-full bg-gray-100 dark:bg-white/5 ml-16"></div>
            <div
              onClick={() => navigate('/help')}
              className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group cursor-pointer"
            >
              <div className="flex items-center justify-center rounded-xl bg-teal-50 dark:bg-teal-900/30 text-teal-500 shrink-0 size-10 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined">help_center</span>
              </div>
              <div className="flex-1">
                <p className="text-text-main dark:text-white text-base font-medium leading-normal">帮助中心</p>
              </div>
              <div className="text-gray-400 dark:text-gray-600 group-hover:text-primary transition-colors">
                <span className="material-symbols-outlined">chevron_right</span>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 mt-8 mb-6">
          <button
            onClick={() => navigate('/login')}
            className="w-full py-3.5 rounded-xl border border-red-100 dark:border-red-900/30 bg-surface-light dark:bg-surface-dark text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 active:scale-[0.98] transition-all font-semibold text-base flex items-center justify-center gap-2 shadow-sm"
          >
            <span className="material-symbols-outlined">logout</span>
            退出登录
          </button>
          <p className="text-center text-xs text-text-secondary dark:text-gray-600 mt-4">版本 2.4.0</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;