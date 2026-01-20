import React from 'react';
import { useNavigate } from 'react-router-dom';

const ForumScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen relative overflow-x-hidden text-[#181411] dark:text-[#f5f2f0] pb-24 font-display">
      <header className="sticky top-0 z-30 bg-surface-light/95 dark:bg-surface-dark/95 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 px-4 py-3 flex items-center justify-between transition-colors duration-300">
        <h1 className="text-xl font-bold tracking-tight text-[#181411] dark:text-white">领养求助论坛</h1>
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <span className="material-symbols-outlined text-[24px]">notifications</span>
          </button>
          <div 
             onClick={() => navigate('/profile')}
             className="h-9 w-9 rounded-full bg-cover bg-center border border-gray-200 dark:border-gray-700 cursor-pointer" 
             style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBAfAaLUBsy6zu7MNsoJ8zkPBvxBmo-hRjzgGbMvql6avncO1plx6k3n3utbZHjov022VvFkRfCfWN8_fmQh6lMiBFJHWElrcKvKvfXdQsjPkl_22IisWgy6agFLkmPC7KhrJRBKVUSAHoAqAyhmgdYKmus0z1hMtWShGBdg2gU6uRFGG5ODpj3EdeKXLfQ3BcRFD2DwUwZXMD-DPEcFGGrIyIGBttIpBILJlfWeoyMOiL9RsYagGUh26MmyJ1RwQt1aVZZzFf3K7A')"}}
          >
          </div>
        </div>
      </header>

      <main className="flex flex-col w-full max-w-md mx-auto">
        <div className="px-4 py-3 bg-background-light dark:bg-background-dark">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-[#8a7260] dark:text-[#a08d80]">search</span>
            </div>
            <input className="block w-full pl-10 pr-3 py-3 border-none rounded-xl leading-5 bg-white dark:bg-surface-dark text-gray-900 dark:text-white placeholder-[#8a7260] focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white dark:focus:bg-surface-dark shadow-sm sm:text-sm transition-all" placeholder="搜索关键词... (品种, 地点)" type="text" />
          </div>
        </div>

        <div className="px-4 pb-2 flex gap-3 overflow-x-auto no-scrollbar snap-x">
           <button className="snap-start shrink-0 flex items-center justify-center gap-1.5 h-9 px-4 rounded-full bg-[#181411] dark:bg-white text-white dark:text-[#181411] shadow-md transition-transform active:scale-95">
             <span className="text-sm font-medium">全部</span>
           </button>
           <button className="snap-start shrink-0 flex items-center justify-center gap-1.5 h-9 px-4 rounded-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 text-[#181411] dark:text-gray-200 shadow-sm transition-transform active:scale-95">
             <span className="material-symbols-outlined text-[18px]">pets</span>
             <span className="text-sm font-medium">猫</span>
           </button>
           <button className="snap-start shrink-0 flex items-center justify-center gap-1.5 h-9 px-4 rounded-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 text-[#181411] dark:text-gray-200 shadow-sm transition-transform active:scale-95">
             <span className="material-symbols-outlined text-[18px]">cruelty_free</span>
             <span className="text-sm font-medium">狗</span>
           </button>
           <button className="snap-start shrink-0 flex items-center justify-center gap-1.5 h-9 px-4 rounded-full bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 text-red-600 dark:text-red-400 shadow-sm transition-transform active:scale-95">
             <span className="material-symbols-outlined text-[18px] filled">emergency</span>
             <span className="text-sm font-medium">紧急</span>
           </button>
           <button className="snap-start shrink-0 flex items-center justify-center gap-1.5 h-9 px-4 rounded-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 text-[#181411] dark:text-gray-200 shadow-sm transition-transform active:scale-95">
             <span className="material-symbols-outlined text-[18px]">near_me</span>
             <span className="text-sm font-medium">附近</span>
           </button>
        </div>

        <div className="flex flex-col gap-4 p-4">
          {/* Post 1 */}
          <article className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
             <div className="px-4 py-3 flex items-center justify-between">
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-gray-200 bg-cover bg-center" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBuTQm6GAkVfJmtgOCn2l0NEb2BdyTsEHOyM58L1TJ4pgkfTkq-0BxvGQoswNrKqR8IC1z6vSH5WWS6rZOP_hCEPWevHThs6VxBoV8ywFyjdxJ8gQGZqh9F-69DTov9FJBn93VjW-pnw3_U0TyGcsnrbLnNWZfAbUlEJ6sTEXaUnnggsxxoVT9b3b61eLbNXnjtQCwK-J02dZ664oGcXB5kC-d4ZlOQXriInqZd1W8VnGs2oEOjYx7N0zKSFlOtblH1veDiW8W0j3E')"}}></div>
                 <div>
                   <p className="text-sm font-bold text-[#181411] dark:text-white leading-tight">张晓明 <span className="material-symbols-outlined text-blue-500 text-[14px] align-middle ml-0.5" title="Verified">verified</span></p>
                   <p className="text-xs text-gray-500 dark:text-gray-400">2小时前</p>
                 </div>
               </div>
               <button className="text-gray-400 dark:text-gray-500 hover:text-gray-600">
                 <span className="material-symbols-outlined">more_horiz</span>
               </button>
             </div>
             <div className="relative w-full aspect-[4/3] bg-gray-100 dark:bg-gray-800">
                <div className="absolute top-3 left-3 bg-red-500/90 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded-lg shadow-sm flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">warning</span> 紧急
                </div>
                <div className="w-full h-full bg-cover bg-center" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBRlYbAw2_ehMSsH7qtvMOl_Vi87Lxs_jrL2K5M9MfH9_rpFIPoOfOrrIjMeXvrQFbq_zCRoPExCWpq-uBseIaZxhCTdHdyaMvZKDuL8uB_IUCuccLAV89gHOVrQ3zrFXDqyHNYGRDnMz1bPMkhRs3NbxQK1O9jj8HYtvECjbumbVLbXNp2aIPYJG9sd5yxQezvs38_B7BwUJG2czO4NEnxqIuBx_qOPLfLKhrlWhSi04GzyEs1g0jo39T08Yp0XzbEabGub9zgv4g')"}}></div>
             </div>
             <div className="px-4 py-3">
               <h3 className="text-lg font-bold text-[#181411] dark:text-white leading-tight mb-2">紧急求助：在大悦城附近发现流浪小猫</h3>
               <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 mb-3">
                 <span className="material-symbols-outlined text-[18px] text-primary">location_on</span>
                 <span className="text-sm">北京市, 朝阳区</span>
               </div>
               <p className="text-[#4a403a] dark:text-[#d1c6be] text-sm leading-relaxed mb-4 line-clamp-2">
                 小猫看起来很虚弱，左腿似乎受伤了，但我家里有大狗无法暂时收养。急需好心人或者救助机构接手...
               </p>
               <div className="flex items-center gap-3">
                 <button className="flex-1 h-11 bg-primary hover:bg-primary/90 text-white rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-colors shadow-[0_4px_10px_rgba(244,123,37,0.3)]">
                    <span className="material-symbols-outlined text-[20px]">chat_bubble</span>
                    联系方式
                 </button>
                 <button className="h-11 w-11 flex items-center justify-center rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <span className="material-symbols-outlined">favorite</span>
                 </button>
                 <button className="h-11 w-11 flex items-center justify-center rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <span className="material-symbols-outlined">share</span>
                 </button>
               </div>
             </div>
          </article>

          {/* Post 2 */}
          <article className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
             <div className="px-4 py-3 flex items-center justify-between">
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-gray-200 bg-cover bg-center" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAE2GbrFxGu6gp8BftJAxmflTWNvv8Ue_yzYZTIDLj7WJxfqpeDbQPCPWzvqYeiHY6o0nzMOmxW8nZqmZZLDhpOwizQjXYDFG6Qg15EzlS-RL8KdCP7KT_AkMYA0JYgrMDWjDUQrFxCmoQ1LKdtUyRdSQ9IeBiTWUdgWYpUZqElcQNpqAukpqFq3ieH8Cefkwj7TOsXEPxht4S4I699jFTWRfz_KbzLR1KJe2fcG8wC_Nuuw8hPAYbEUVXPkuxND4jW02vjFw23REY')"}}></div>
                 <div>
                   <p className="text-sm font-bold text-[#181411] dark:text-white leading-tight">Sarah Lee</p>
                   <p className="text-xs text-gray-500 dark:text-gray-400">5小时前</p>
                 </div>
               </div>
               <button className="text-gray-400 dark:text-gray-500 hover:text-gray-600">
                 <span className="material-symbols-outlined">more_horiz</span>
               </button>
             </div>
             <div className="relative w-full aspect-[4/3] bg-gray-100 dark:bg-gray-800">
                <div className="absolute top-3 left-3 bg-green-600/90 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded-lg shadow-sm flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">volunteer_activism</span> 找领养
                </div>
                <div className="w-full h-full bg-cover bg-center" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCMrtLO_liWeXzv0MR8zvYqVD-7fkKMF3v17CcylTSJesM-DBcOQ1oCYOVss5MODp2J5zKXBvdo28o195YQRF64-em3OzwyDJUZN8qDL7Itik_KYLPD4ibhsGgZdvXbFxFvKS3TJxuC4vIdd556d1FUTiRObG2PzHNbMwQfJdFZvCqTNYjh4TnrrYe9z-lQRw1bs7XDRp9QHoXQBrLFUFRvMrZRcdQoVTNst_pB9sOCNPp9AzE3elFdubeIBR7FelbY-G4qJQW0h-M')"}}></div>
             </div>
             <div className="px-4 py-3">
               <h3 className="text-lg font-bold text-[#181411] dark:text-white leading-tight mb-2">寻找领养：两岁金毛寻找新家</h3>
               <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 mb-3">
                 <span className="material-symbols-outlined text-[18px] text-primary">location_on</span>
                 <span className="text-sm">上海市, 静安区</span>
               </div>
               <p className="text-[#4a403a] dark:text-[#d1c6be] text-sm leading-relaxed mb-4 line-clamp-2">
                 因为工作调动无法继续照顾，性格非常温顺，已绝育，希望能找到一个爱它的家庭。疫苗齐全...
               </p>
               <div className="flex items-center gap-3">
                 <button className="flex-1 h-11 bg-primary hover:bg-primary/90 text-white rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-colors shadow-[0_4px_10px_rgba(244,123,37,0.3)]">
                    <span className="material-symbols-outlined text-[20px]">chat_bubble</span>
                    联系方式
                 </button>
                 <button className="h-11 w-11 flex items-center justify-center rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <span className="material-symbols-outlined">favorite</span>
                 </button>
                 <button className="h-11 w-11 flex items-center justify-center rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <span className="material-symbols-outlined">share</span>
                 </button>
               </div>
             </div>
          </article>

          {/* Post 3 */}
          <article className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
             <div className="px-4 py-3 flex items-center justify-between">
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-gray-200 bg-cover bg-center" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDlWgsFjluU9JuUda5azhwmlHWPSe7ARJDSeJ2_F1WbcguWL_Y1JJNyFKCj9ljZ7uwW1IwmMBYnK1Rgud0ZxyWSPP69j-_G63Jh6Yp_z3l3RE5W0QTLknJeHpTgNQNH4rebnPqBznRLtJG2OIBPwSZgG178yv5kQw6f0mwoumcUCVdvxkFZJAXvHoJhF3hB7JhuNrAONgeXailP6WatOurLY1HPlIVrYs-Ng63hO0QlaEZ9jw1gCK77JSccvonm0sJTW9bHycds4DU')"}}></div>
                 <div>
                   <p className="text-sm font-bold text-[#181411] dark:text-white leading-tight">王伟</p>
                   <p className="text-xs text-gray-500 dark:text-gray-400">1天前</p>
                 </div>
               </div>
               <button className="text-gray-400 dark:text-gray-500 hover:text-gray-600">
                 <span className="material-symbols-outlined">more_horiz</span>
               </button>
             </div>
             <div className="px-4 py-2">
               <h3 className="text-lg font-bold text-[#181411] dark:text-white leading-tight mb-2">寻狗启示：棕色泰迪走失</h3>
               <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 mb-3">
                 <span className="material-symbols-outlined text-[18px] text-primary">location_on</span>
                 <span className="text-sm">成都市, 锦江区</span>
               </div>
               <p className="text-[#4a403a] dark:text-[#d1c6be] text-sm leading-relaxed line-clamp-2 mb-3">
                 狗狗名字叫豆豆，在春熙路附近走失，如果看到请联系我！必有重谢！
               </p>
             </div>
             <div className="grid grid-cols-2 gap-1 px-4 mb-3">
                <div className="w-full aspect-square rounded-lg bg-cover bg-center" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB1N_NuCIPUyJF--mQohdr5MeTf8ypsMChMgrdm3SNbrcIPHn9Tw5IuBI-mroOKTZvE3PDPznN4wOc2lbiO4-kMushGOc1NUtqa5WwLcNmhlPIaFMfEN4soGKUtStGE7-pyeJnuCNq0HF6mC0fohttwUk2u6HyugNjV9hrNU3YU6RMXs-QgnBMMPHPEWdlEGqIWcrYIfwSnh_Fk9j0SnHi8kFtRmWom-lA1MorGpPJnRMLhej-p0HqAPyfpC61BFcrQTo3cxPjq4U8')"}}></div>
                <div className="w-full aspect-square rounded-lg bg-cover bg-center" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCXuhY0fpT5kSmoTtyt5JuAqtF0q3T8d821wuqO5b5UClY9fZd6tHa0IWCOUlqqjSBd6Ahmi5MsIYtJ8niePP2zQ5QVLtDXGI_s0gFRJI320t3jsgAmfAICPo1MBwW3oLXSeILjeHnI6H0sS7suRXAzOJNNOMpyG10xy4crXZHRvMkYjxogxB_rEmdp_Ik4Mm-arosCtYRUOWm4KO7zaWoTgdLKaNWyyO6AFpQiihPX26Nhl76NFjkdK7_JfWzJWN_vSFQ7FJWvmYs')"}}></div>
             </div>
             <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <div className="text-xs text-gray-500">24 人关注</div>
                <button className="h-9 px-4 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-colors">
                    联系方式
                </button>
             </div>
          </article>
          
          <div className="h-8 flex items-center justify-center text-gray-400 text-sm">
             没有更多内容了
          </div>
        </div>
      </main>
      
      <button 
        onClick={() => navigate('/create-post')}
        className="fixed bottom-24 right-5 z-40 h-14 bg-[#181411] dark:bg-primary text-white rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.2)] flex items-center pr-6 pl-4 gap-2 transition-transform hover:scale-105 active:scale-95 group"
      >
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
          <span className="material-symbols-outlined text-[20px]">add</span>
        </div>
        <span className="font-bold tracking-wide">发帖求助</span>
      </button>
    </div>
  );
};

export default ForumScreen;