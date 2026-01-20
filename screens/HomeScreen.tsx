import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from '../hooks/useLocation';

const HomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const { city, loading } = useLocation('上海');

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden pb-24 font-display">
      <header className="flex items-center justify-between px-5 pt-4 pb-2 sticky top-0 z-10 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm">
        <div className="flex flex-col">
          <span className="text-text-muted dark:text-slate-400 text-[11px] font-medium tracking-wide">当前位置</span>
          <div className="flex items-center gap-1 cursor-pointer">
            <span className="text-primary material-symbols-outlined filled text-[18px]">location_on</span>
            <h2 className="text-lg font-bold tracking-tight text-text-main dark:text-white">
              {loading ? '定位中...' : city}
            </h2>
            <span className="text-text-muted material-symbols-outlined text-[18px]">expand_more</span>
          </div>
        </div>
        <button
          onClick={() => navigate('/profile')}
          className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-white dark:border-gray-700 shadow-sm"
        >
          <img alt="User Profile" className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBp10mn4GWYx15zN5FrUQWQ7eJZjwqfQFDu4bw4AM4W0h9S6hCIH-U5G2fztS_Q57q3JyVRuQld7HO-iGp0X7BYamB2Hovxg0Rn_z4U1dYmuPEpW9qPXWBkEvhSc4U-6-jTzgWVex0hnum3tvQ1o_31c_TMKGmfiUh4J9-ktSGyG9LnO_P5E_Kla26u5i5aZl2mEpZgd0KpgX_LCOpXktebwkNa7ev6DEvgmMRsTJr0OfZ5GcpvdxsJ_3kJ_mJB0a56jTH55DayptI" />
        </button>
      </header>

      <div className="px-5 py-2 relative z-0">
        <div
          onClick={() => navigate('/search')}
          className="flex w-full items-center rounded-xl bg-white dark:bg-card-dark px-3 py-2.5 shadow-soft border border-transparent focus-within:border-primary/50 transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-text-muted text-[24px]">search</span>
          <div className="flex-1 px-3 text-base font-medium text-text-muted">搜索品种、名字...</div>
          <button className="flex items-center justify-center rounded-xl bg-primary/10 p-2">
            <span className="material-symbols-outlined text-primary text-[20px]">tune</span>
          </button>
        </div>
      </div>
      <div className="px-5 pb-4 pt-1">
        <button
          onClick={() => navigate('/add-pet')}
          className="flex w-full items-center justify-between rounded-2xl bg-gradient-to-r from-primary to-accent p-3 shadow-md shadow-primary/20 transition-transform active:scale-98"
        >
          <div className="flex items-center gap-3 text-white">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md">
              <span className="material-symbols-outlined text-[24px]">add_circle</span>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-base font-bold leading-tight">入库申请</span>
              <span className="text-[10px] font-medium opacity-80">帮助流浪动物寻找温暖家园</span>
            </div>
          </div>
          <span className="material-symbols-outlined text-white text-[20px]">chevron_right</span>
        </button>
      </div>

      <div className="mt-1 flex flex-col gap-2">
        <div className="flex items-center justify-between px-5">
          <h3 className="text-lg font-bold text-text-main dark:text-white">最新入库 🐾</h3>
          <button
            onClick={() => navigate('/pets')}
            className="text-sm font-bold text-primary hover:text-primary/80"
          >
            查看全部
          </button>
        </div>
        <div className="flex overflow-x-auto no-scrollbar px-5 gap-3 pb-3 pt-1">
          {/* Pet Item 1 */}
          <div
            onClick={() => navigate('/pet/1')}
            className="relative h-44 w-32 flex-shrink-0 overflow-hidden rounded-3xl bg-gray-200 shadow-md group cursor-pointer"
          >
            <img alt="Golden Retriever" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDiPoSXxeAmwXX64LAmWPvtmvbsfYt9pj4A7VCK0PHqER2A6IYXJzEJL-RJIrohMNZzbv9Xsh8Y_d4XQKJ2WSwIOR7aYAgDdi2l94womrJXF6mjO5ohxKeOaffDenloX1VwOmsb4O28pNhmWSrhkqrwiYsrubq51rPF_NU0QuR37JCYVtUZxbacrm1qzqC55XdLkU8063LgiDL4YUxYMiEwxEBUxvaQnNIW4mnO4rhW5xe-dJn7wEOtmYv9VnzDG9h7RjEln6fEd4o" />
            <div className="absolute top-3 right-3">
              <button className="flex h-6 w-6 items-center justify-center rounded-full bg-white/30 backdrop-blur-md text-white hover:bg-white hover:text-red-500 transition-colors">
                <span className="material-symbols-outlined text-[14px]">favorite</span>
              </button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 pt-8">
              <h4 className="text-xs font-bold text-white">巴弟</h4>
              <p className="text-[10px] text-gray-200">金毛 · 2岁</p>
            </div>
          </div>

          {/* Pet Item 2 */}
          <div className="relative h-44 w-32 flex-shrink-0 overflow-hidden rounded-3xl bg-gray-200 shadow-md group cursor-pointer">
            <img alt="Cat" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuClKKZ73rFT8yg9ktxhuLkoRWh5Yx8bJFEDXC_J25ykpKp2QhVzolTg1iSo8gznQ33e4-INvZm0mQuDgpq5KqrzAw28eieJrseZaed2y4zBdzYeK0ttDfftC-FbD1qN_YSuaJdoRnTjXK6L9b30yxHjebYnx7_i2YHtvMy27EULFjyK7Nr7UECBGZyYZnga4HZFyKvPoYgMc0_Cw2sIx9nELPogJJBi6aBKiZkCEUqvTACvFQFAT3QAW2OwSutv98zHumQRMnRtBXk" />
            <div className="absolute top-3 right-3">
              <button className="flex h-6 w-6 items-center justify-center rounded-full bg-white/30 backdrop-blur-md text-white hover:bg-white hover:text-red-500 transition-colors">
                <span className="material-symbols-outlined text-[14px]">favorite</span>
              </button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 pt-8">
              <h4 className="text-xs font-bold text-white">米斯蒂</h4>
              <p className="text-[10px] text-gray-200">虎斑 · 8月</p>
            </div>
          </div>

          <div className="relative h-44 w-32 flex-shrink-0 overflow-hidden rounded-3xl bg-gray-200 shadow-md group cursor-pointer">
            <img alt="Puppy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6wkG4U1EoItUWIiHx3_Rf1uyQ7SKDjNu0qrAZjtNXNB48j3uLomQu_7w6m18z9UNve26gaFroDrWk6JPUw0c7UPOUEm4R94xUbeGtjoJoUMpHStL7eUX-Xq0LmeE3B2zSEsBEQSBEw-5bzdP7rw4MSp8WDzNTLFuT6J234t9-vWykzsG1xX90rLOQnaasJanYkb1lyLdE5kkHegy_78innrReH_MCLOKXtsYn6vAt_wEO_wQWef-IDyUPpKO1kdqDbHWuFDUDI1Q" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 pt-8">
              <h4 className="text-xs font-bold text-white">黛西</h4>
              <p className="text-[10px] text-gray-200">寻回犬 · 4月</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-1 flex flex-col gap-3 px-5 pb-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-text-main dark:text-white">领养我吧 ❤️</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="group flex flex-col rounded-3xl bg-white dark:bg-card-dark p-3 shadow-soft transition-all hover:-translate-y-1 hover:shadow-lg cursor-pointer">
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-gray-100">
              <img alt="Beagle" className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcTGe7DgGuf0M-EXwYaBjE-bKuZg53PVv4k82kSVPGyDG_rLS5DNezvFh5dtKXF1CbGewdoAQyLlKrb8Pd3q1BTqNrd634I67-1krfxex1i0FYl4YROkBtbJPzAJuNi1idIBMAV00JNDczEDapYjJolWcuwXR81D662tmv3GweRkbxApazU_Gwe7nmkAdk0y2LjAkQmXwJ2y_pw2OBTarfrqhFL7QXZIr-W1yUvzYLjNU9LIC16cjt4ynY3GGzupKJtYLZ9-HThzc" />
              <button className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/60 backdrop-blur-sm text-text-muted transition-colors hover:bg-white hover:text-red-500">
                <span className="material-symbols-outlined filled text-[18px]">favorite</span>
              </button>
              <div className="absolute bottom-2 left-2 rounded-lg bg-white/80 backdrop-blur-sm px-2 py-1 text-xs font-bold text-text-main">
                1.2 km
              </div>
            </div>
            <div className="mt-3 px-1">
              <div className="flex justify-between items-start">
                <h4 className="text-lg font-bold text-text-main dark:text-white">麦克斯</h4>
                <div className="flex items-center rounded-md bg-blue-50 dark:bg-blue-900/30 px-1.5 py-0.5">
                  <span className="material-symbols-outlined text-[14px] text-primary font-bold">male</span>
                </div>
              </div>
              <p className="text-sm font-medium text-text-muted">比格犬</p>
              <p className="mt-1 text-xs font-semibold text-text-muted/70">3岁</p>
            </div>
          </div>

          <div className="group flex flex-col rounded-3xl bg-white dark:bg-card-dark p-3 shadow-soft transition-all hover:-translate-y-1 hover:shadow-lg cursor-pointer">
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-gray-100">
              <img alt="Siamese cat" className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7W_vs2Xe_HI4vs0hTdtKRbEnVm0gPK2cP2sO3n8V0z17uVTpwq3LPNfUngsgKKaM33XBZOiAxC8TlIgg1VWwvtXnUGLTnj_P3jRgG1j6YXLzsNx5-0_y4Ra8GqTJrhlfFzzV5rByq31xoJ-pf27eNPLvFxE5J3xe4CYsZ0CsraJA5Q7OJFWpMIADW5dDBU7VnlAr--BAZK7C0Iy6YD6sogAk4J-Nljbiug3x4WvWROJAqowckLKUsJyMRE162ig7jEiN22GBkwA8" />
              <button className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/60 backdrop-blur-sm text-text-muted transition-colors hover:bg-white hover:text-red-500">
                <span className="material-symbols-outlined text-[18px]">favorite</span>
              </button>
              <div className="absolute bottom-2 left-2 rounded-lg bg-white/80 backdrop-blur-sm px-2 py-1 text-xs font-bold text-text-main">
                2.5 km
              </div>
            </div>
            <div className="mt-3 px-1">
              <div className="flex justify-between items-start">
                <h4 className="text-lg font-bold text-text-main dark:text-white">露娜</h4>
                <div className="flex items-center rounded-md bg-pink-50 dark:bg-pink-900/30 px-1.5 py-0.5">
                  <span className="material-symbols-outlined text-[14px] text-pink-500 font-bold">female</span>
                </div>
              </div>
              <p className="text-sm font-medium text-text-muted">暹罗猫</p>
              <p className="mt-1 text-xs font-semibold text-text-muted/70">1岁</p>
            </div>
          </div>

          <div className="group flex flex-col rounded-3xl bg-white dark:bg-card-dark p-3 shadow-soft transition-all hover:-translate-y-1 hover:shadow-lg cursor-pointer">
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-gray-100">
              <img alt="British Shorthair" className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXtsLTHGz1r4YKI-YqhW7a1kGhYcRn73R9GMpsAjTB1rOEGplw33ZhGsnBvu5r57Skk1sEkZu3P6pSX2dZc0lkGxBinSFHZOgBZR2gPtUBEVYrsgCdHNpeB5iCrDwgjZR6PL7GTRM-jLKKwgfXr41-E1u4G9j2d9huqf3furWM7QbXgmqk8pB369y4JbBMhdff_Eeu4GJuIauJi9Pmli5puM8zU0vNaeGqsmc7T-o9vz7aR0_6rV6luTAAh_2Ym8mRnYS1s_fxxC4" />
              <div className="absolute bottom-2 left-2 rounded-lg bg-white/80 backdrop-blur-sm px-2 py-1 text-xs font-bold text-text-main">
                0.8 km
              </div>
            </div>
            <div className="mt-3 px-1">
              <div className="flex justify-between items-start">
                <h4 className="text-lg font-bold text-text-main dark:text-white">贝拉</h4>
                <div className="flex items-center rounded-md bg-pink-50 dark:bg-pink-900/30 px-1.5 py-0.5">
                  <span className="material-symbols-outlined text-[14px] text-pink-500 font-bold">female</span>
                </div>
              </div>
              <p className="text-sm font-medium text-text-muted">英国短毛猫</p>
              <p className="mt-1 text-xs font-semibold text-text-muted/70">6个月</p>
            </div>
          </div>

          <div className="group flex flex-col rounded-3xl bg-white dark:bg-card-dark p-3 shadow-soft transition-all hover:-translate-y-1 hover:shadow-lg cursor-pointer">
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-gray-100">
              <img alt="French Bulldog" className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBl3toi0-lNTgAwXFR93fb-CIjYhxhMeJJ2TgAwZ1K5jnZ4adCOQULcLV19rrojSU_EaKkjB73RhDVqIDzKV53Y0pSWgg20lNQz17-6Ci5Hl-USeIBr2Ma7pxMDG9qjZNCK_qw1YyBHxbQwfv2L870WDGBIyzW5U1IEvqNZcTkotjHlKYGV7SJzXy9ppNAc1QgK4zpV0A-1AWncAEZEHvhxP2wo1p-GhDsNbYwTTKfJmBYvYsycYu8HaJ53U5_0k8k8nlYbpU753DI" />
              <div className="absolute bottom-2 left-2 rounded-lg bg-white/80 backdrop-blur-sm px-2 py-1 text-xs font-bold text-text-main">
                4.2 km
              </div>
            </div>
            <div className="mt-3 px-1">
              <div className="flex justify-between items-start">
                <h4 className="text-lg font-bold text-text-main dark:text-white">洛基</h4>
                <div className="flex items-center rounded-md bg-blue-50 dark:bg-blue-900/30 px-1.5 py-0.5">
                  <span className="material-symbols-outlined text-[14px] text-primary font-bold">male</span>
                </div>
              </div>
              <p className="text-sm font-medium text-text-muted">斗牛犬</p>
              <p className="mt-1 text-xs font-semibold text-text-muted/70">2岁</p>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default HomeScreen;