import { useNavigate } from 'react-router-dom';
import { useLocation } from '../hooks/useLocation';
import { useApp } from '../context/AppContext';

const HomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const { city, loading } = useLocation('上海');
  const { toggleFavorite, isFavorited } = useApp();

  const handleToggleFavorite = (e: React.MouseEvent, petId: string) => {
    e.stopPropagation();
    toggleFavorite(petId);
  };

  return (
    <div className="relative min-h-screen bg-[#FFF9F5] font-sans pb-24">
      {/* Header */}
      <header className="sticky top-0 z-20 flex items-center justify-between px-6 pt-4 pb-3 bg-[#FFF9F5]/95 backdrop-blur-md">
        <div className="flex flex-col">
          <span className="text-[#A08E81] text-[11px] font-medium tracking-wide">当前位置</span>
          <div className="flex items-center gap-1.5 cursor-pointer">
            <span className="text-[#FFB8A3] text-lg">📍</span>
            <h2 className="text-lg font-bold tracking-tight text-[#4A3728]">
              {loading ? '定位中...' : city}
            </h2>
            <span className="text-[#A08E81] text-sm">▼</span>
          </div>
        </div>
        <button
          onClick={() => navigate('/profile')}
          className="w-11 h-11 rounded-full border-2 border-white shadow-md overflow-hidden hover:scale-105 transition-transform"
        >
          <img
            alt="User Profile"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBp10mn4GWYx15zN5FrUQWQ7eJZjwqfQFDu4bw4AM4W0h9S6hCIH-U5G2fztS_Q57q3JyVRuQld7HO-iGp0X7BYamB2Hovxg0Rn_z4U1dYmuPEpW9qPXWBkEvhSc4U-6-jTzgWVex0hnum3tvQ1o_31c_TMKGmfiUh4J9-ktSGyG9LnO_P5E_Kla26u5i5aZl2mEpZgd0KpgX_LCOpXktebwkNa7ev6DEvgmMRsTJr0OfZ5GcpvdxsJ_3kJ_mJB0a56jTH55DayptI"
          />
        </button>
      </header>

      {/* Search Bar */}
      <div className="px-6 py-3">
        <div
          onClick={() => navigate('/search')}
          className="flex items-center rounded-2xl bg-white/80 backdrop-blur-sm border border-[#FFB8A3]/20 px-4 py-3.5 shadow-md hover:shadow-lg transition-all cursor-pointer"
        >
          <span className="text-[#A08E81] text-xl mr-3">🔍</span>
          <div className="flex-1 text-base font-medium text-[#C4B5A0]">搜索品种、名字...</div>
          <button className="flex items-center justify-center rounded-xl bg-gradient-to-br from-[#FFB8A3]/10 to-[#FF9671]/10 p-2.5">
            <span className="text-[#FFB8A3] text-lg">⚙️</span>
          </button>
        </div>
      </div>

      {/* Application Banner */}
      <div className="px-6 pb-4 pt-1">
        <button
          onClick={() => navigate('/add-pet')}
          className="flex w-full items-center justify-between rounded-3xl bg-gradient-to-r from-[#FFB8A3] to-[#FF9671] p-4 shadow-xl shadow-[#FFB8A3]/30 active:scale-[0.98] transition-all group"
        >
          <div className="flex items-center gap-3 text-white">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md text-2xl">
              ➕
            </div>
            <div className="flex flex-col items-start">
              <span className="text-base font-bold">入库申请</span>
              <span className="text-[11px] font-medium opacity-90">帮助流浪动物寻找温暖家园</span>
            </div>
          </div>
          <span className="text-white text-xl group-hover:translate-x-1 transition-transform">→</span>
        </button>
      </div>

      {/* Latest Pets Section - Card Swipe Style */}
      <div className="mt-2 mb-8 flex flex-col gap-3">
        <div className="flex items-center justify-between px-6">
          <h3 className="text-xl font-bold text-[#4A3728]">最新入库</h3>
          <button
            onClick={() => navigate('/pets')}
            className="text-sm font-bold text-[#FFB8A3] hover:text-[#FF9671] transition-colors"
          >
            查看全部
          </button>
        </div>

        {/* Swipeable Card Container */}
        <div className="relative px-6 h-[420px]">
          {/* Card Stack */}
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Snap Scroll Container */}
            <div className="flex overflow-x-scroll snap-x snap-mandatory w-full h-full no-scrollbar">
              {/* Card 1 - Golden Retriever */}
              <div className="snap-center shrink-0 w-full h-full flex items-center justify-center">
                <div
                  onClick={() => navigate('/pet/1')}
                  className="relative w-full max-w-sm h-full overflow-hidden rounded-3xl shadow-2xl cursor-pointer group"
                >
                  <img
                    alt="Golden Retriever"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDiPoSXxeAmwXX64LAmWPvtmvbsfYt9pj4A7VCK0PHqER2A6IYXJzEJL-RJIrohMNZzbv9Xsh8Y_d4XQKJ2WSwIOR7aYAgDdi2l94womrJXF6mjO5ohxKeOaffDenloX1VwOmsb4O28pNhmWSrhkqrwiYsrubq51rPF_NU0QuR37JCYVtUZxbacrm1qzqC55XdLkU8063LgiDL4YUxYMiEwxEBUxvaQnNIW4mnO4rhW5xe-dJn7wEOtmYv9VnzDG9h7RjEln6fEd4o"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>

                  {/* Like Button */}
                  <div className="absolute top-4 right-4 z-10">
                    <button
                      onClick={(e) => handleToggleFavorite(e, '1')}
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm hover:bg-white hover:scale-110 transition-all shadow-lg"
                    >
                      <span className={`text-2xl material-symbols-outlined ${isFavorited('1') ? 'text-red-500 filled' : 'text-gray-400'}`}>
                        favorite
                      </span>
                    </button>
                  </div>

                  {/* Pet Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                    <div className="flex items-end justify-between">
                      <div>
                        <h2 className="text-4xl font-black text-white mb-2">巴弟</h2>
                        <div className="flex items-center gap-3 text-white/90 text-base mb-2">
                          <span className="font-semibold">金毛猎犬</span>
                          <span>·</span>
                          <span className="font-semibold">2岁</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/80 text-sm">
                          <span>📍</span>
                          <span>距离您 1.2 km</span>
                        </div>
                      </div>
                      <button className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#FFB8A3] to-[#FF9671] text-white shadow-xl hover:scale-105 transition-transform">
                        <span className="text-2xl">→</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2 - Cat */}
              <div className="snap-center shrink-0 w-full h-full flex items-center justify-center">
                <div
                  onClick={() => navigate('/pet/2')}
                  className="relative w-full max-w-sm h-full overflow-hidden rounded-3xl shadow-2xl cursor-pointer group"
                >
                  <img
                    alt="Cat"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuClKKZ73rFT8yg9ktxhuLkoRWh5Yx8bJFEDXC_J25ykpKp2QhVzolTg1iSo8gznQ33e4-INvZm0mQuDgpq5KqrzAw28eieJrseZaed2y4zBdzYeK0ttDfftC-FbD1qN_YSuaJdoRnTjXC6L9b30yxHjebYnx7_i2YHtvMy27EULFjyK7Nr7UECBGZyYZnga4HZFyKvPoYgMc0_Cw2sIx9nELPogJJBi6aBKiZkCEUqvTACvFQFAT3QAW2OwSutv98zHumQRMnRtBXk"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>

                  <div className="absolute top-4 right-4 z-10">
                    <button
                      onClick={(e) => handleToggleFavorite(e, '2')}
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm hover:bg-white hover:scale-110 transition-all shadow-lg"
                    >
                      <span className={`text-2xl material-symbols-outlined ${isFavorited('2') ? 'text-red-500 filled' : 'text-gray-400'}`}>
                        favorite
                      </span>
                    </button>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                    <div className="flex items-end justify-between">
                      <div>
                        <h2 className="text-4xl font-black text-white mb-2">米斯蒂</h2>
                        <div className="flex items-center gap-3 text-white/90 text-base mb-2">
                          <span className="font-semibold">虎斑猫</span>
                          <span>·</span>
                          <span className="font-semibold">8个月</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/80 text-sm">
                          <span>📍</span>
                          <span>距离您 0.8 km</span>
                        </div>
                      </div>
                      <button className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#FFB8A3] to-[#FF9671] text-white shadow-xl hover:scale-105 transition-transform">
                        <span className="text-2xl">→</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3 - Puppy */}
              <div className="snap-center shrink-0 w-full h-full flex items-center justify-center">
                <div
                  onClick={() => navigate('/pet/3')}
                  className="relative w-full max-w-sm h-full overflow-hidden rounded-3xl shadow-2xl cursor-pointer group"
                >
                  <img
                    alt="Puppy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6wkG4U1EoItUWIiHx3_Rf1uyQ7SKDjNu0qrAZjtNXNB48j3uLomQu_7w6m18z9UNve26gaFroDrWk6JPUw0c7UPOUEm4R94xUbeGtjoJoUMpHStL7eUX-Xq0LmeE3B2zSEsBEQSBEw-5bzdP7rw4MSp8WDzNTLFuT6J234t9-vWykzsG1xX90rLOQnaasJanYkb1lyLdE5kkHegy_78innrReH_MCLOKXtsYn6vAt_wEO_wQWef-IDyUPpKO1kdqDbHWuFDUDI1Q"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>

                  <div className="absolute top-4 right-4 z-10">
                    <button
                      onClick={(e) => handleToggleFavorite(e, '3')}
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm hover:bg-white hover:scale-110 transition-all shadow-lg"
                    >
                      <span className={`text-2xl material-symbols-outlined ${isFavorited('3') ? 'text-red-500 filled' : 'text-gray-400'}`}>
                        favorite
                      </span>
                    </button>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                    <div className="flex items-end justify-between">
                      <div>
                        <h2 className="text-4xl font-black text-white mb-2">黛西</h2>
                        <div className="flex items-center gap-3 text-white/90 text-base mb-2">
                          <span className="font-semibold">寻回犬</span>
                          <span>·</span>
                          <span className="font-semibold">4个月</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/80 text-sm">
                          <span>📍</span>
                          <span>距离您 2.1 km</span>
                        </div>
                      </div>
                      <button className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#FFB8A3] to-[#FF9671] text-white shadow-xl hover:scale-105 transition-transform">
                        <span className="text-2xl">→</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Swipe Indicators */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
            <div className="w-2 h-2 rounded-full bg-white/80 shadow-lg"></div>
            <div className="w-2 h-2 rounded-full bg-white/40"></div>
            <div className="w-2 h-2 rounded-full bg-white/40"></div>
          </div>

          {/* Swipe Hint Text */}
          <div className="absolute top-4 left-0 right-0 flex justify-center z-20">
            <div className="bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full">
              <p className="text-white text-xs font-medium">左右滑动查看更多</p>
            </div>
          </div>
        </div>
      </div>

      {/* Adopt Me Section */}
      <div className="mt-2 flex flex-col gap-4 px-6 pb-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-[#4A3728]">领养我吧</h3>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Pet Card 1 */}
          <div className="group flex flex-col rounded-3xl bg-white/80 backdrop-blur-sm border border-[#FFB8A3]/10 p-3 shadow-lg hover:-translate-y-2 hover:shadow-2xl transition-all cursor-pointer">
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl">
              <img
                alt="Beagle"
                className="h-full w-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcTGe7DgGuf0M-EXwYaBjE-bKuZg53PVv4k82kSVPGyDG_rLS5DNezvFh5dtKXF1CbGewdoAQyLlKrb8Pd3q1BTqNrd634I67-1krfxex1i0FYl4YROkBtbJPzAJuNi1idIBMAV00JNDczEDapYjJolWcuwXR81D662tmv3GweRkbxApazU_Gwe7nmkAdk0y2LjAkQmXwJ2y_pw2OBTarfrqhFL7QXZIr-W1yUvzYLjNU9LIC16cjt4ynY3GGzupKJtYLZ9-HThzc"
              />
              <button
                onClick={(e) => handleToggleFavorite(e, '4')}
                className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-all shadow-sm"
              >
                <span className={`text-[18px] material-symbols-outlined ${isFavorited('4') ? 'text-red-500 filled' : 'text-gray-400'}`}>
                  favorite
                </span>
              </button>
              <div className="absolute bottom-2 left-2 rounded-xl bg-gradient-to-r from-[#FFB8A3]/90 to-[#FF9671]/90 backdrop-blur-sm px-2.5 py-1 text-xs font-bold text-white shadow-lg">
                📍 1.2km
              </div>
            </div>
            <div className="mt-3 px-1">
              <div className="flex justify-between items-start">
                <h4 className="text-base font-bold text-[#4A3728]">麦克斯</h4>
                <div className="flex items-center rounded-lg bg-gradient-to-br from-[#FFB8A3]/20 to-[#FF9671]/30 px-2 py-1">
                  <span className="text-xs text-[#FF9671] font-bold">♂</span>
                </div>
              </div>
              <p className="text-sm font-medium text-[#8B7355] mt-0.5">比格犬</p>
              <p className="text-xs font-semibold text-[#A08E81] mt-1">3岁</p>
            </div>
          </div>

          {/* Pet Card 2 */}
          <div className="group flex flex-col rounded-3xl bg-white/80 backdrop-blur-sm border border-[#FFB8A3]/10 p-3 shadow-lg hover:-translate-y-2 hover:shadow-2xl transition-all cursor-pointer">
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl">
              <img
                alt="Siamese cat"
                className="h-full w-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7W_vs2Xe_HI4vs0hTdtKRbEnVm0gPK2cP2sO3n8V0z17uVTpwq3LPNfUngsgKKaM33XBZOiAxC8TlIgg1VWwvtXnUGLTnj_P3jRgG1j6YXLzsNx5-0_y4Ra8GqTJrhlfFzzV5rByq31xoJ-pf27eNPLvFxE5J3xe4CYsZ0CsraJA5Q7OJFWpMIADW5dDBU7VnlAr--BAZK7C0Iy6YD6sogAk4J-Nljbiug3x4WvWROJAqowckLKUsJyMRE162ig7jEiN22GBkwA8"
              />
              <button
                onClick={(e) => handleToggleFavorite(e, '5')}
                className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-all shadow-sm"
              >
                <span className={`text-[18px] material-symbols-outlined ${isFavorited('5') ? 'text-red-500 filled' : 'text-gray-400'}`}>
                  favorite
                </span>
              </button>
              <div className="absolute bottom-2 left-2 rounded-xl bg-gradient-to-r from-[#FFB8A3]/90 to-[#FF9671]/90 backdrop-blur-sm px-2.5 py-1 text-xs font-bold text-white shadow-lg">
                📍 2.5km
              </div>
            </div>
            <div className="mt-3 px-1">
              <div className="flex justify-between items-start">
                <h4 className="text-base font-bold text-[#4A3728]">露娜</h4>
                <div className="flex items-center rounded-lg bg-gradient-to-br from-pink-50 to-pink-100 px-2 py-1">
                  <span className="text-xs text-pink-600 font-bold">♀</span>
                </div>
              </div>
              <p className="text-sm font-medium text-[#8B7355] mt-0.5">暹罗猫</p>
              <p className="text-xs font-semibold text-[#A08E81] mt-1">1岁</p>
            </div>
          </div>

          {/* More cards can be added similarly */}
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;