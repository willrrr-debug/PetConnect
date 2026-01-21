import React from 'react';
import { useNavigate } from 'react-router-dom';

const MessageCenterScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-background-light dark:bg-background-dark font-noto text-text-main-light dark:text-text-main-dark antialiased transition-colors duration-200 min-h-screen">
      <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden pb-6">
        <header className="sticky top-0 z-20 flex flex-col bg-surface-light dark:bg-surface-dark px-4 pb-2 pt-4 shadow-sm transition-colors duration-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center justify-center rounded-full p-2 -ml-2 text-text-main-light dark:text-text-main-dark hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <span className="material-symbols-outlined">arrow_back_ios_new</span>
              </button>
              <h1 className="text-[28px] font-bold leading-tight tracking-tight text-text-main-light dark:text-text-main-dark">消息中心</h1>
            </div>
            <div className="flex-1" />
          </div>
          <div className="w-full">
            <label className="flex flex-col h-12 w-full">
              <div className="flex w-full flex-1 items-center rounded-xl bg-[#f0f3f4] dark:bg-[#232e34] px-4 transition-colors">
                <span className="material-symbols-outlined text-text-sub-light dark:text-text-sub-dark">search</span>
                <input className="flex w-full flex-1 resize-none bg-transparent px-3 text-base font-normal leading-normal text-text-main-light dark:text-text-main-dark placeholder:text-text-sub-light dark:placeholder:text-text-sub-dark focus:outline-0 focus:ring-0 border-none h-full font-noto" placeholder="搜索救助站或宠物..." type="text" />
              </div>
            </label>
          </div>
        </header>

        <main className="flex flex-col gap-1 p-4 mt-2">
          {/* Message 1 */}
          <div
            onClick={() => navigate('/chat/conv-1')}
            className="group flex items-center gap-4 rounded-2xl bg-surface-light dark:bg-surface-dark p-3 pr-4 shadow-sm hover:bg-gray-50 dark:hover:bg-[#1e2a30] transition-colors cursor-pointer"
          >
            <div className="relative shrink-0">
              <div className="bg-center bg-no-repeat bg-cover rounded-full h-14 w-14 border-2 border-transparent group-hover:border-primary/20 transition-colors" style={{ backgroundImage: "url('https://images.weserv.nl/?url=images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=200&h=200&fit=crop')" }}></div>
              <div className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full bg-[#10b981] border-2 border-white dark:border-[#19252b]"></div>
            </div>
            <div className="flex flex-1 flex-col justify-center min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <p className="text-text-main-light dark:text-text-main-dark text-base font-bold leading-normal truncate font-noto">快乐爪爪救助站</p>
                <p className="text-primary text-xs font-semibold whitespace-nowrap ml-2 font-noto">上午 10:30</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-text-main-light dark:text-text-main-dark text-sm font-medium leading-normal truncate pr-2 font-noto">你好！是的，如果你感兴趣的话，Max 还可以领养！</p>
                <div className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 shadow-sm shadow-primary/30">
                  <span className="text-[10px] font-bold text-white font-noto">2</span>
                </div>
              </div>
            </div>
          </div>

          {/* Message 2 */}
          <div className="group flex items-center gap-4 rounded-2xl bg-surface-light dark:bg-surface-dark p-3 pr-4 shadow-sm hover:bg-gray-50 dark:hover:bg-[#1e2a30] transition-colors cursor-pointer">
            <div className="relative shrink-0">
              <div className="bg-center bg-no-repeat bg-cover rounded-full h-14 w-14" style={{ backgroundImage: "url('https://images.weserv.nl/?url=images.unsplash.com/photo-1543466835-00a7907e9de1?w=200&h=200&fit=crop')" }}></div>
            </div>
            <div className="flex flex-1 flex-col justify-center min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <p className="text-text-main-light dark:text-text-main-dark text-base font-medium leading-normal truncate font-noto">Sarah（前主人）</p>
                <p className="text-text-sub-light dark:text-text-sub-dark text-xs font-normal whitespace-nowrap ml-2 font-noto">昨天</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-text-sub-light dark:text-text-sub-dark text-sm font-normal leading-normal truncate pr-2 font-noto">请告诉我你是否需要他的兽医记录。</p>
              </div>
            </div>
          </div>

          {/* Message 3 */}
          <div className="group flex items-center gap-4 rounded-2xl bg-surface-light dark:bg-surface-dark p-3 pr-4 shadow-sm hover:bg-gray-50 dark:hover:bg-[#1e2a30] transition-colors cursor-pointer">
            <div className="relative shrink-0">
              <div className="bg-center bg-no-repeat bg-cover rounded-full h-14 w-14" style={{ backgroundImage: "url('https://images.weserv.nl/?url=images.unsplash.com/photo-1583337130417-3346a1be7dee?w=200&h=200&fit=crop')" }}></div>
              <div className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full bg-[#10b981] border-2 border-white dark:border-[#19252b]"></div>
            </div>
            <div className="flex flex-1 flex-col justify-center min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <p className="text-text-main-light dark:text-text-main-dark text-base font-bold leading-normal truncate font-noto">Smith 医生（兽医）</p>
                <p className="text-primary text-xs font-semibold whitespace-nowrap ml-2 font-noto">上午 9:15</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-text-main-light dark:text-text-main-dark text-sm font-medium leading-normal truncate pr-2 font-noto">疫苗接种时间表已附上。</p>
                <div className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 shadow-sm shadow-primary/30">
                  <span className="text-[10px] font-bold text-white font-noto">1</span>
                </div>
              </div>
            </div>
          </div>

          {/* Message 4 */}
          <div className="group flex items-center gap-4 rounded-2xl bg-surface-light dark:bg-surface-dark p-3 pr-4 shadow-sm hover:bg-gray-50 dark:hover:bg-[#1e2a30] transition-colors cursor-pointer">
            <div className="relative shrink-0">
              <div className="bg-center bg-no-repeat bg-cover rounded-full h-14 w-14" style={{ backgroundImage: "url('https://images.weserv.nl/?url=images.unsplash.com/photo-1591193520707-39446d7e6d24?w=200&h=200&fit=crop')" }}></div>
            </div>
            <div className="flex flex-1 flex-col justify-center min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <p className="text-text-main-light dark:text-text-main-dark text-base font-medium leading-normal truncate font-noto">城市动物管理中心</p>
                <p className="text-text-sub-light dark:text-text-sub-dark text-xs font-normal whitespace-nowrap ml-2 font-noto">周一</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-text-sub-light dark:text-text-sub-dark text-sm font-normal leading-normal truncate pr-2 font-noto">已收到您的申请。我们会尽快审核。</p>
              </div>
            </div>
          </div>

          {/* Message 5 */}
          <div className="group flex items-center gap-4 rounded-2xl bg-surface-light dark:bg-surface-dark p-3 pr-4 shadow-sm hover:bg-gray-50 dark:hover:bg-[#1e2a30] transition-colors cursor-pointer">
            <div className="relative shrink-0">
              <div className="bg-center bg-no-repeat bg-cover rounded-full h-14 w-14" style={{ backgroundImage: "url('https://images.weserv.nl/?url=images.unsplash.com/photo-1594149929911-78975a43d4f5?w=200&h=200&fit=crop')" }}></div>
            </div>
            <div className="flex flex-1 flex-col justify-center min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <p className="text-text-main-light dark:text-text-main-dark text-base font-medium leading-normal truncate font-noto">比格犬救援中心</p>
                <p className="text-text-sub-light dark:text-text-sub-dark text-xs font-normal whitespace-nowrap ml-2 font-noto">上周</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-text-sub-light dark:text-text-sub-dark text-sm font-normal leading-normal truncate pr-2 font-noto">感谢您对寄养情况的更新。</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MessageCenterScreen;