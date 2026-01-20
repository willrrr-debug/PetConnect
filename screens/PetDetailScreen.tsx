import React from 'react';
import { useNavigate } from 'react-router-dom';

const PetDetailScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full min-h-screen flex flex-col pb-[100px] bg-background-light dark:bg-background-dark font-display">
      <div className="relative w-full h-[45vh] bg-gray-200 dark:bg-gray-800">
        <div className="flex overflow-x-auto snap-x snap-mandatory w-full h-full no-scrollbar">
          <div className="snap-center shrink-0 w-full h-full relative">
            <div className="w-full h-full bg-cover bg-center" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDDNgVh4DJGy5DBClF4Ko4pufTG4XNUn05LjLauMrm98gcAJmjpGVMXR9msmyEG0TICn_4U7Gy-j_Jal0wNDgH-QYkICKC7N57GlcC1h4eU7yB_7F38RQPAGmW5E3LD7deIBIhZI53RY9e8RwJgQwtedtbuyEe3iGu0VwSEYSsUsZqkFwHCAHLmcUFsIaBiPcgFwHT8vFg1B9qi03G0KfJBzgoSwunMUIrz-WTUHyK-bRx9RBiNOAxSjPZHGeg1v7NboIMVJ4Zia_s')"}}></div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/10"></div>
          </div>
          <div className="snap-center shrink-0 w-full h-full relative">
             <div className="w-full h-full bg-cover bg-center" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCuDOtM54eLmay-g12dbu3kb9bbFbZ2AXKuj02WdhAHIS0_dkBYK7UtyKkIZjM6O1m-RHjaMIOZBU-sySdHkl4IXP597-gpdESjhGttqBaZHi6TZV10sf5Yt0L4UDhc5DT4qlq8uVwAVYPZcSDdfyXHMWZ1nNVrjZIVHOK7VjmUtF5oAkcaJlPi5Q30gxxheGoYaJxMroDw3kjVnWF5UrKtEo1smIZgiIGvWi31iysURDNeJzyLdUocIt9wwdhxMlbuEqqsKee0Mns')"}}></div>
             <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/10"></div>
          </div>
          <div className="snap-center shrink-0 w-full h-full relative">
             <div className="w-full h-full bg-cover bg-center" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDG0WE_gwVQX5Pb_v5ICXS7qXsaxuGpBnR2EiAz2DAusFsOTeWR47eBFi5_o4xw1O9w6NISW6ye6O8q2n5BHNer1pgXmcFQMSxmrChOX3r39amp17kcsEwHRDv17ofYA9P4eM7OzTxQQNy5L1wOsF2KPHgoI5lnH8m9jzfLg4Lg2EBzOMt0eBnFuWL5cOVXGowaFsKUZEZ5Fp9n2hjbwbvhyhTdg4fTn7xduTTbxA_Bb0wBJ-Rdc71U9fuvxctJapokbNjrrGA7MIU')"}}></div>
             <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/10"></div>
          </div>
        </div>
        
        <div className="absolute top-0 left-0 w-full p-4 pt-8 flex justify-between items-center z-50 pointer-events-none">
          <button 
            type="button"
            onClick={() => navigate('/home')}
            className="size-10 rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors pointer-events-auto cursor-pointer"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div className="flex gap-3 pointer-events-auto">
             <button className="size-10 rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors cursor-pointer">
              <span className="material-symbols-outlined">ios_share</span>
            </button>
             <button className="size-10 rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors cursor-pointer">
              <span className="material-symbols-outlined">more_vert</span>
            </button>
          </div>
        </div>

        <div className="absolute bottom-10 left-0 w-full flex justify-center gap-2 z-10 pointer-events-none">
          <div className="w-2 h-2 rounded-full bg-white shadow-sm"></div>
          <div className="w-2 h-2 rounded-full bg-white/50 shadow-sm"></div>
          <div className="w-2 h-2 rounded-full bg-white/50 shadow-sm"></div>
        </div>
      </div>

      <div className="relative -mt-8 flex-1 bg-white dark:bg-background-dark rounded-t-3xl px-6 pt-8 shadow-[0_-8px_30px_rgba(0,0,0,0.04)] z-20">
        <div className="w-12 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-6"></div>
        
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-[#111618] dark:text-white tracking-tight">巴弟</h1>
            <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 mt-2">
              <span className="material-symbols-outlined text-[18px] text-primary">location_on</span>
              <span className="text-sm font-medium">金毛猎犬 • 2英里外</span>
            </div>
          </div>
          <button className="group size-12 rounded-full bg-gray-50 dark:bg-surface-dark border border-gray-100 dark:border-gray-800 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all shadow-sm">
            <span className="material-symbols-outlined group-hover:filled text-[26px]">favorite</span>
          </button>
        </div>

        <div className="flex justify-between gap-4 mb-8">
          <div className="flex-1 bg-background-light dark:bg-surface-dark p-3.5 rounded-2xl flex flex-col items-center justify-center gap-1">
            <span className="text-[#111618] dark:text-white font-bold text-lg">2岁</span>
            <span className="text-gray-400 dark:text-gray-500 text-xs uppercase tracking-wide font-semibold">年龄</span>
          </div>
          <div className="flex-1 bg-background-light dark:bg-surface-dark p-3.5 rounded-2xl flex flex-col items-center justify-center gap-1 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-8 h-8 bg-blue-500/5 rounded-bl-full"></div>
            <div className="flex items-center gap-1 text-[#111618] dark:text-white font-bold text-lg">
              <span>公</span>
              <span className="material-symbols-outlined text-primary text-[18px] font-bold">male</span>
            </div>
            <span className="text-gray-400 dark:text-gray-500 text-xs uppercase tracking-wide font-semibold">性别</span>
          </div>
           <div className="flex-1 bg-background-light dark:bg-surface-dark p-3.5 rounded-2xl flex flex-col items-center justify-center gap-1">
            <span className="text-[#111618] dark:text-white font-bold text-lg">65磅</span>
            <span className="text-gray-400 dark:text-gray-500 text-xs uppercase tracking-wide font-semibold">体重</span>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-white dark:bg-surface-dark rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm mb-8">
          <div className="size-12 rounded-full bg-cover bg-center shadow-inner" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAiSZdcIx37MuXzrl8JtMk87Z_29AiywcYVWqjcHXsJSBqzuT-TOR9VKRWm5gbRdtvBLCCetC_7lr4SOj9Lc-KODx_Z-7pGTOhmVHiRp6DdGtBJybzNuAcj-2zALaZzsr9fLN4jUF0sPCE1G1XZ64kw7NAHsJaHIsI650WdycpSGCuKq_E0qAOLiEZNSydMySKJE3Bq-vUeIZiJF0tsJO5b1LDB1UYXsRtQySWDSQ5nW3esRnsLaQyE65p-jWV31NLc4iYho2T6-AA')"}}></div>
          <div className="flex-1">
            <p className="text-sm font-bold text-[#111618] dark:text-white">爪友救助站</p>
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-green-500 filled">verified</span>
              <p className="text-xs text-gray-500 font-medium">认证救助站</p>
            </div>
          </div>
          <button className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
            <span className="material-symbols-outlined text-[20px]">chat</span>
          </button>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-bold text-[#111618] dark:text-white mb-3">我的故事</h3>
          <div className="relative">
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-[15px]">
                巴弟是个快乐的小家伙，喜欢长距离散步和肚皮按摩。他被发现流浪，但在我们的寄养团队中适应得很好。他已经学会了“坐下”，而且非常讨人喜欢！他有一颗金子般的心，正在寻找一个能让他成为焦点的永远的家。
            </p>
            <div className="mt-2 flex items-center gap-1 text-primary font-semibold text-sm cursor-pointer hover:underline">
              <span>阅读全文</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-bold text-[#111618] dark:text-white mb-4">健康与行为</h3>
          <div className="flex flex-wrap gap-2.5">
             <span className="pl-2 pr-3 py-1.5 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900/30 text-green-700 dark:text-green-400 text-sm font-semibold flex items-center gap-1.5">
               <span className="material-symbols-outlined text-[18px]">vaccines</span> 已接种疫苗
             </span>
             <span className="pl-2 pr-3 py-1.5 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-900/30 text-purple-700 dark:text-purple-400 text-sm font-semibold flex items-center gap-1.5">
               <span className="material-symbols-outlined text-[18px]">medical_services</span> 已绝育
             </span>
             <span className="pl-2 pr-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30 text-blue-700 dark:text-blue-400 text-sm font-semibold flex items-center gap-1.5">
               <span className="material-symbols-outlined text-[18px]">pets</span> 性格友好
             </span>
             <span className="pl-2 pr-3 py-1.5 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-900/30 text-yellow-700 dark:text-yellow-400 text-sm font-semibold flex items-center gap-1.5">
               <span className="material-symbols-outlined text-[18px]">home</span> 已训练
             </span>
          </div>
        </div>

        <div className="mb-4">
           <h3 className="text-lg font-bold text-[#111618] dark:text-white mb-4">领养要求</h3>
           <ul className="space-y-3.5">
             <li className="flex items-start gap-3">
               <div className="mt-0.5 size-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                 <span className="material-symbols-outlined text-primary text-[14px] font-bold">check</span>
               </div>
               <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">需要积极的生活方式（每日跑步）</span>
             </li>
             <li className="flex items-start gap-3">
                <div className="mt-0.5 size-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                 <span className="material-symbols-outlined text-primary text-[14px] font-bold">check</span>
               </div>
               <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">与其他狗狗相处融洽</span>
             </li>
             <li className="flex items-start gap-3">
                <div className="mt-0.5 size-5 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center shrink-0">
                 <span className="material-symbols-outlined text-red-600 dark:text-red-400 text-[14px] font-bold">close</span>
               </div>
               <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">家庭中不能有猫</span>
             </li>
           </ul>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-white/80 dark:bg-background-dark/90 backdrop-blur-lg border-t border-gray-100 dark:border-gray-800 p-4 pb-8 z-50">
        <div className="flex gap-3 max-w-md mx-auto">
          <button 
            onClick={() => navigate('/applications')}
            className="flex-1 bg-primary hover:bg-[#0f8ecb] active:scale-[0.98] transition-all text-white font-bold text-lg rounded-2xl shadow-lg shadow-primary/25 flex items-center justify-center gap-2 h-14"
          >
             <span className="material-symbols-outlined">pets</span>
             领养我
          </button>
        </div>
      </div>
    </div>
  );
};

export default PetDetailScreen;