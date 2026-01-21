import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Pet } from '../types';

export interface PetCardProps {
    /** 宠物数据 */
    pet: Pet;
    /** 卡片变体 */
    variant?: 'default' | 'compact' | 'horizontal';
    /** 是否显示收藏按钮 */
    showFavorite?: boolean;
    /** 是否已收藏 */
    isFavorited?: boolean;
    /** 收藏点击事件 */
    onFavorite?: (petId: string) => void;
}

/**
 * 宠物卡片组件
 * 用于展示宠物信息，支持多种布局变体
 */
const PetCard: React.FC<PetCardProps> = ({
    pet,
    variant = 'default',
    showFavorite = true,
    isFavorited = false,
    onFavorite,
}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/pet/${pet.id}`);
    };

    const handleFavorite = (e: React.MouseEvent) => {
        e.stopPropagation();
        onFavorite?.(pet.id);
    };

    // 紧凑版卡片（用于横向滚动列表）
    if (variant === 'compact') {
        return (
            <div
                onClick={handleClick}
                className="relative h-44 w-32 flex-shrink-0 overflow-hidden rounded-3xl bg-gray-200 shadow-md group cursor-pointer"
            >
                <img
                    alt={pet.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    src={pet.imageUrl}
                />
                {showFavorite && (
                    <div className="absolute top-3 right-3">
                        <button
                            onClick={handleFavorite}
                            className={`flex h-6 w-6 items-center justify-center rounded-full backdrop-blur-md transition-colors ${isFavorited
                                ? 'bg-white text-red-500'
                                : 'bg-white/30 text-white hover:bg-white hover:text-red-500'
                                }`}
                        >
                            <span className={`material-symbols-outlined text-[14px] ${isFavorited ? 'filled' : ''}`}>
                                favorite
                            </span>
                        </button>
                    </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 pt-8">
                    <h4 className="text-xs font-bold text-white">{pet.name}</h4>
                    <p className="text-[10px] text-gray-200">
                        {pet.breed} · {pet.age}
                    </p>
                </div>
            </div>
        );
    }

    // 默认版卡片（网格布局）
    return (
        <div
            onClick={handleClick}
            className="group flex flex-col rounded-3xl bg-white dark:bg-card-dark p-3 shadow-soft transition-all hover:-translate-y-1 hover:shadow-lg cursor-pointer"
        >
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-gray-100">
                <img
                    alt={pet.name}
                    className="h-full w-full object-cover"
                    src={pet.imageUrl}
                />
                {showFavorite && (
                    <button
                        onClick={handleFavorite}
                        className={`absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-sm transition-colors ${isFavorited
                            ? 'bg-white text-red-500'
                            : 'bg-white/60 text-text-muted hover:bg-white hover:text-red-500'
                            }`}
                    >
                        <span className={`material-symbols-outlined text-[18px] ${isFavorited ? 'filled' : ''}`}>
                            favorite
                        </span>
                    </button>
                )}
                {pet.distance && (
                    <div className="absolute bottom-2 left-2 rounded-lg bg-white/80 backdrop-blur-sm px-2 py-1 text-xs font-bold text-text-main">
                        {pet.distance}
                    </div>
                )}
            </div>
            <div className="mt-3 px-1">
                <div className="flex justify-between items-start">
                    <h4 className="text-lg font-bold text-text-main dark:text-white">{pet.name}</h4>
                    <div
                        className={`flex items-center rounded-md px-1.5 py-0.5 ${pet.gender === 'male'
                            ? 'bg-primary/10 dark:bg-primary/20'
                            : 'bg-pink-50 dark:bg-pink-900/30'
                            }`}
                    >
                        <span
                            className={`material-symbols-outlined text-[14px] font-bold ${pet.gender === 'male' ? 'text-primary' : 'text-pink-500'
                                }`}
                        >
                            {pet.gender === 'male' ? 'male' : 'female'}
                        </span>
                    </div>
                </div>
                <p className="text-sm font-medium text-text-muted">{pet.breed}</p>
                <p className="mt-1 text-xs font-semibold text-text-muted/70">{pet.age}</p>
            </div>
        </div>
    );
};

export default PetCard;
