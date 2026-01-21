import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from '../hooks/useLocation';
import { useApp } from '../context/AppContext';
import { supabase } from '../services/supabase';
import type { Pet } from '../types/pet';

const HomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const { city, loading } = useLocation('上海');
  const { toggleFavorite, isFavorited } = useApp();
  const [pets, setPets] = useState<Pet[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  // 获取宠物数据
  useEffect(() => {
    const fetchPets = async () => {
      setDataLoading(true);
      const { data, error } = await supabase
        .from('pets')
        .select('*')
        .order('created_at', { ascending: false });

      if (data) {
        // 转换数据库字段 Snake Case -> Camel Case
        const mappedPets: Pet[] = data.map((item: any) => ({
          id: item.id,
          name: item.name,
          type: item.type,
          breed: item.breed,
          age: item.age,
          gender: item.gender,
          weight: item.weight,
          imageUrl: item.image_url, // 核心修复：映射 URL
          images: item.images,
          distance: item.distance,
          description: item.description,
          healthTags: item.health_tags,
          requirements: item.requirements,
          restrictions: item.restrictions,
          shelterId: item.shelter_id,
          createdAt: item.created_at,
        }));
        setPets(mappedPets);
      } else if (error) {
        console.error('Error fetching pets:', error);
      }
      setDataLoading(false);
    };

    fetchPets();
  }, []);

  const handleToggleFavorite = (e: React.MouseEvent, petId: string) => {
    e.stopPropagation();
    toggleFavorite(petId);
  };

  // 区分精选（顶部滑动）和普通列表（网格）
  // 暂时取前3个为精选，剩下的为列表
  const featuredPets = pets.slice(0, 3);
  const gridPets = pets.slice(3);

  return (
    <div className="relative min-h-screen bg-[#FFF9F5] font-sans pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-6 pt-4 pb-3 bg-[#FFF9F5]/95 backdrop-blur-md">
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

      {/* 如果没有数据，且不加载中 */}
      {!dataLoading && pets.length === 0 && (
        <div className="px-6 py-4 text-center">
          <p className="text-[#A08E81]">暂无宠物数据</p>
        </div>
      )}

      {/* Latest Pets Section - Card Swipe Style */}
      {featuredPets.length > 0 && (
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

          <div className="relative px-6 h-[420px]">
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="flex overflow-x-scroll snap-x snap-mandatory w-full h-full no-scrollbar pb-4 gap-4">
                {featuredPets.map((pet) => (
                  <div key={pet.id} className="snap-center shrink-0 w-full h-full flex items-center justify-center">
                    <div
                      onClick={() => navigate(`/pet/${pet.id}`)}
                      className="relative w-full max-w-sm h-full overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all cursor-pointer group bg-white"
                    >
                      <img
                        alt={pet.name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        src={pet.imageUrl}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=500&q=60';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>

                      <div className="absolute top-4 right-4 z-10">
                        <button
                          onClick={(e) => handleToggleFavorite(e, pet.id)}
                          className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm hover:bg-white hover:scale-110 transition-all shadow-lg"
                        >
                          <span className={`text-2xl material-symbols-outlined ${isFavorited(pet.id) ? 'text-red-500 filled' : 'text-gray-400'}`}>
                            favorite
                          </span>
                        </button>
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                        <div className="flex items-end justify-between">
                          <div>
                            <h2 className="text-4xl font-black text-white mb-2">{pet.name}</h2>
                            <div className="flex items-center gap-3 text-white/90 text-base mb-2">
                              <span className="font-semibold">{pet.breed}</span>
                              {pet.age && <span>·</span>}
                              {pet.age && <span className="font-semibold">{pet.age}</span>}
                            </div>
                            <div className="flex items-center gap-2 text-white/80 text-sm">
                              <span>📍</span>
                              <span>距离您 {pet.distance || '未知'}</span>
                            </div>
                          </div>
                          <button className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#FFB8A3] to-[#FF9671] text-white shadow-xl hover:scale-105 transition-transform">
                            <span className="text-2xl">→</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Swipe prompt - Only show if likely more than 1 item */}
            {featuredPets.length > 1 && (
              <div className="absolute top-4 left-0 right-0 flex justify-center pointer-events-none z-20">
                <div className="bg-black/30 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                  <p className="text-white text-xs font-medium">左右滑动查看更多</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Adopt Me Section (Grid) */}
      <div className="mt-2 flex flex-col gap-4 px-6 pb-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-[#4A3728]">领养我吧</h3>
        </div>

        {gridPets.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {gridPets.map((pet) => (
              <div
                key={pet.id}
                onClick={() => navigate(`/pet/${pet.id}`)}
                className="group flex flex-col rounded-3xl bg-white border border-[#FFB8A3]/10 p-3 shadow-lg hover:-translate-y-2 hover:shadow-2xl transition-all cursor-pointer"
              >
                <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-gray-100">
                  <img
                    alt={pet.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    src={pet.imageUrl}
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=500&q=60';
                    }}
                  />
                  <button
                    onClick={(e) => handleToggleFavorite(e, pet.id)}
                    className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-all shadow-sm"
                  >
                    <span className={`text-[18px] material-symbols-outlined ${isFavorited(pet.id) ? 'text-red-500 filled' : 'text-gray-400'}`}>
                      favorite
                    </span>
                  </button>
                  {pet.distance && (
                    <div className="absolute bottom-2 left-2 rounded-xl bg-gradient-to-r from-[#FFB8A3]/90 to-[#FF9671]/90 backdrop-blur-sm px-2.5 py-1 text-xs font-bold text-white shadow-lg">
                      📍 {pet.distance}
                    </div>
                  )}
                </div>
                <div className="mt-3 px-1">
                  <div className="flex justify-between items-start">
                    <h4 className="text-base font-bold text-[#4A3728] truncate pr-1">{pet.name}</h4>
                    <div className={`flex items-center rounded-lg px-2 py-1 ${pet.gender === 'male'
                      ? 'bg-blue-50 text-blue-500'
                      : 'bg-pink-50 text-pink-500'
                      }`}>
                      <span className="text-xs font-bold">{pet.gender === 'male' ? '♂' : '♀'}</span>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-[#8B7355] mt-0.5 truncate">{pet.breed}</p>
                  <p className="text-xs font-semibold text-[#A08E81] mt-1">{pet.age}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // 如果没有 grid 数据（意味着总数据 < 3 或者没有更多），且不在加载中，且总数大于0（否则显示上面的空状态）
          !dataLoading && pets.length > 0 && pets.length <= 3 && (
            <div className="text-center py-8 text-gray-400 text-sm">
              没有更多宠物了，去看看上面的精选吧！
            </div>
          )
        )}

        {dataLoading && (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-400"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeScreen;