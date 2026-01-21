import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../services/supabase';
import { Database } from '../services/database.types';
import { useApp } from '../context/AppContext';

type Pet = Database['public']['Tables']['pets']['Row'];
type Shelter = Database['public']['Tables']['shelters']['Row'];

const PetDetailScreen: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { user } = useApp();
  const [pet, setPet] = useState<Pet | null>(null);
  const [shelter, setShelter] = useState<Shelter | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeletePet = async () => {
    if (!pet || !id) return;
    if (!window.confirm('确定要撤回这条入库申请吗？')) return;

    setIsDeleting(true);
    const { error } = await supabase
      .from('pets')
      .delete()
      .eq('id', id);

    if (!error) {
      alert('入库申请已撤回');
      navigate('/home');
    } else {
      alert('撤回失败: ' + error.message);
    }
    setIsDeleting(false);
  };

  useEffect(() => {
    const fetchPetDetails = async () => {
      if (!id) return;
      setLoading(true);

      const { data: petData } = await supabase
        .from('pets')
        .select('*')
        .eq('id', id)
        .single();

      if (petData) {
        const typedPet = petData as Pet;
        setPet(typedPet);
        if (typedPet.shelter_id) {
          const { data: shelterData } = await supabase
            .from('shelters')
            .select('*')
            .eq('id', typedPet.shelter_id)
            .single();
          setShelter(shelterData as Shelter);
        }
      }
      setLoading(false);
    };

    fetchPetDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!pet) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
        <p className="text-gray-500">无法找到宠物信息</p>
      </div>
    );
  }

  const handleChat = () => {
    if (pet.shelter_id) {
      navigate(`/chat/${pet.shelter_id}`);
    }
  };

  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark font-display">
      {/* 滚动内容区域 */}
      <div className="flex-1 overflow-y-auto no-scrollbar relative">
        {/* 顶部图片轮播 (当前简化为单图) */}
        <div className="relative w-full h-[45vh] bg-gray-200 dark:bg-gray-800">
          <img src={pet.image_url} alt={pet.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/10"></div>

          <div className="absolute top-0 left-0 w-full p-4 pt-8 flex justify-between items-center z-50">
            <button
              onClick={() => navigate(-1)}
              className="size-10 rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <div className="flex gap-3">
              {user?.id === pet?.user_id && (
                <button
                  onClick={handleDeletePet}
                  disabled={isDeleting}
                  className="size-10 rounded-full bg-red-500/20 backdrop-blur-md border border-red-500/20 flex items-center justify-center text-white hover:bg-red-500/40 transition-colors disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-[20px]">delete</span>
                </button>
              )}
              <button className="size-10 rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                <span className="material-symbols-outlined">ios_share</span>
              </button>
            </div>
          </div>
        </div>

        <div className="relative -mt-8 flex-1 bg-white dark:bg-background-dark rounded-t-3xl px-6 pt-8 shadow-[0_-8px_30px_rgba(0,0,0,0.04)] z-20 pb-10">
          <div className="w-12 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-6"></div>

          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-extrabold text-[#111618] dark:text-white tracking-tight">{pet.name}</h1>
              <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 mt-2">
                <span className="material-symbols-outlined text-[18px] text-primary">location_on</span>
                <span className="text-sm font-medium">{pet.breed} • {pet.distance || '离你很近'}</span>
              </div>
            </div>
            <button className="group size-12 rounded-full bg-gray-50 dark:bg-surface-dark border border-gray-100 dark:border-gray-800 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all">
              <span className="material-symbols-outlined group-hover:filled text-[26px]">favorite</span>
            </button>
          </div>

          <div className="flex justify-between gap-4 mb-8">
            <div className="flex-1 bg-background-light dark:bg-surface-dark p-3.5 rounded-2xl flex flex-col items-center justify-center gap-1 text-center">
              <span className="text-[#111618] dark:text-white font-bold text-lg">{pet.age}</span>
              <span className="text-gray-400 dark:text-gray-500 text-xs font-semibold">年龄</span>
            </div>
            <div className="flex-1 bg-background-light dark:bg-surface-dark p-3.5 rounded-2xl flex flex-col items-center justify-center gap-1 text-center">
              <div className="flex items-center gap-1 text-[#111618] dark:text-white font-bold text-lg">
                <span>{pet.gender === 'male' ? '公' : '母'}</span>
                <span className={`material-symbols-outlined text-[18px] font-bold ${pet.gender === 'male' ? 'text-primary' : 'text-pink-500'}`}>
                  {pet.gender === 'male' ? 'male' : 'female'}
                </span>
              </div>
              <span className="text-gray-400 dark:text-gray-500 text-xs font-semibold">性别</span>
            </div>
            <div className="flex-1 bg-background-light dark:bg-surface-dark p-3.5 rounded-2xl flex flex-col items-center justify-center gap-1 text-center">
              <span className="text-[#111618] dark:text-white font-bold text-lg">{pet.weight || '--'}</span>
              <span className="text-gray-400 dark:text-gray-500 text-xs font-semibold">体重</span>
            </div>
          </div>

          {shelter && (
            <div className="flex items-center gap-3 p-3 bg-white dark:bg-surface-dark rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm mb-8">
              <div
                className="size-12 rounded-full bg-cover bg-center shadow-inner"
                style={{ backgroundImage: `url('${shelter.avatar_url || 'https://via.placeholder.com/48'}')` }}
              ></div>
              <div className="flex-1">
                <p className="text-sm font-bold text-[#111618] dark:text-white">{shelter.name}</p>
                <div className="flex items-center gap-1">
                  {shelter.verified && <span className="material-symbols-outlined text-[14px] text-green-500 filled">verified</span>}
                  <p className="text-xs text-gray-500 font-medium">认证救助站</p>
                </div>
              </div>
              <button
                onClick={handleChat}
                className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">chat</span>
              </button>
            </div>
          )}

          <div className="mb-8">
            <h3 className="text-lg font-bold text-[#111618] dark:text-white mb-3">我的故事</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-[15px]">
              {pet.description || '暂无详细描述'}
            </p>
          </div>

          {pet.health_tags && (pet.health_tags as any[]).length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-bold text-[#111618] dark:text-white mb-4">健康与行为</h3>
              <div className="flex flex-wrap gap-2.5">
                {(pet.health_tags as any[]).map((tag, idx) => (
                  <span key={idx} className={`pl-2 pr-3 py-1.5 rounded-lg border text-sm font-semibold flex items-center gap-1.5
                                      ${tag.color === 'green' ? 'bg-green-50 border-green-100 text-green-700' :
                      tag.color === 'purple' ? 'bg-purple-50 border-purple-100 text-purple-700' :
                        'bg-orange-50 border-orange-100 text-orange-700'}`}>
                    <span className="material-symbols-outlined text-[18px]">{tag.icon}</span>
                    {tag.label}
                  </span>
                ))}
              </div>
            </div>
          )}

          {pet.requirements && pet.requirements.length > 0 && (
            <div className="mb-4">
              <h3 className="text-lg font-bold text-[#111618] dark:text-white mb-4">领养要求</h3>
              <ul className="space-y-3.5">
                {pet.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="mt-0.5 size-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-primary text-[14px] font-bold">check</span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* 固定底部操作栏 */}
      <div className="shrink-0 bg-white/80 dark:bg-background-dark/90 backdrop-blur-lg border-t border-gray-100 dark:border-gray-800 p-4 pb-12 z-50">
        <div className="flex gap-3 max-w-md mx-auto">
          <button
            onClick={() => navigate('/applications', { state: { petId: pet.id } })}
            className="flex-1 bg-primary hover:bg-primary/90 active:scale-[0.98] transition-all text-white font-bold text-lg rounded-2xl shadow-lg shadow-primary/25 flex items-center justify-center gap-2 h-14"
          >
            <span className="material-symbols-outlined">pets</span>
            申请领养
          </button>
          <button
            onClick={handleChat}
            className="h-14 w-14 bg-gray-50 dark:bg-surface-dark rounded-2xl flex items-center justify-center text-text-main dark:text-white transition-colors border border-gray-100 dark:border-gray-800"
          >
            <span className="material-symbols-outlined text-[24px]">chat</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PetDetailScreen;