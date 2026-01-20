import React from 'react';
import { useNavigate } from 'react-router-dom';
import PetCard from '../components/PetCard';
import { useApp } from '../context';
import { mockPets } from '../data';

/**
 * 我的收藏页面
 * 展示用户收藏的宠物列表
 */
const FavoritesScreen: React.FC = () => {
    const navigate = useNavigate();
    const { favorites, toggleFavorite, isFavorited } = useApp();

    // 获取收藏的宠物列表
    const favoritePets = mockPets.filter((pet) => favorites.includes(pet.id));

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
                    <h1 className="text-xl font-bold text-text-main dark:text-white">我的收藏</h1>
                </div>
            </header>

            <main className="px-4 py-4">
                {/* 统计信息 */}
                <div className="flex items-center justify-between mb-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        共收藏 <span className="font-bold text-primary">{favoritePets.length}</span> 只宠物
                    </p>
                </div>

                {/* 收藏列表 */}
                {favoritePets.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4">
                        {favoritePets.map((pet) => (
                            <PetCard
                                key={pet.id}
                                pet={pet}
                                isFavorited={isFavorited(pet.id)}
                                onFavorite={toggleFavorite}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                            <span className="material-symbols-outlined text-5xl text-gray-300 dark:text-gray-600">
                                favorite
                            </span>
                        </div>
                        <h3 className="text-lg font-bold text-text-main dark:text-white mb-2">
                            还没有收藏
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-[200px]">
                            浏览宠物列表，点击爱心收藏喜欢的毛孩子
                        </p>
                        <button
                            onClick={() => navigate('/home')}
                            className="mt-6 px-6 py-3 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/25 active:scale-95 transition-transform"
                        >
                            去看看
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
};

export default FavoritesScreen;
