import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import PetCard from '../components/PetCard';
import { mockPets } from '../data';
import type { PetType } from '../types';

/** 筛选条件 */
interface FilterState {
    keyword: string;
    type: PetType | 'all';
    gender: 'all' | 'male' | 'female';
    ageRange: 'all' | 'baby' | 'young' | 'adult';
}

/**
 * 搜索筛选页面
 * 按条件筛选宠物
 */
const SearchScreen: React.FC = () => {
    const navigate = useNavigate();

    const [filters, setFilters] = useState<FilterState>({
        keyword: '',
        type: 'all',
        gender: 'all',
        ageRange: 'all',
    });

    const [showFilters, setShowFilters] = useState(false);

    // 筛选宠物列表
    const filteredPets = useMemo(() => {
        return mockPets.filter((pet) => {
            // 关键词筛选
            if (filters.keyword) {
                const keyword = filters.keyword.toLowerCase();
                const matchName = pet.name.toLowerCase().includes(keyword);
                const matchBreed = pet.breed.toLowerCase().includes(keyword);
                if (!matchName && !matchBreed) return false;
            }

            // 类型筛选
            if (filters.type !== 'all' && pet.type !== filters.type) return false;

            // 性别筛选
            if (filters.gender !== 'all' && pet.gender !== filters.gender) return false;

            return true;
        });
    }, [filters]);

    // 快捷筛选按钮
    const quickFilters = [
        { label: '全部', value: 'all' as const, icon: 'pets' },
        { label: '狗狗', value: 'dog' as const, icon: 'sound_detection_dog_barking' },
        { label: '猫咪', value: 'cat' as const, icon: 'cruelty_free' },
    ];

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark pb-24">
            {/* 头部搜索栏 */}
            <header className="sticky top-0 z-20 bg-surface-light dark:bg-surface-dark px-4 py-3 border-b border-gray-100 dark:border-gray-800 shadow-sm">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center justify-center size-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors shrink-0"
                    >
                        <span className="material-symbols-outlined text-text-main dark:text-white">arrow_back</span>
                    </button>

                    <div className="flex-1 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="material-symbols-outlined text-gray-400">search</span>
                        </div>
                        <input
                            type="text"
                            value={filters.keyword}
                            onChange={(e) => setFilters((prev) => ({ ...prev, keyword: e.target.value }))}
                            placeholder="搜索品种、名字..."
                            className="w-full pl-10 pr-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl border-none text-text-main dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary/30 focus:outline-none"
                            autoFocus
                        />
                        {filters.keyword && (
                            <button
                                onClick={() => setFilters((prev) => ({ ...prev, keyword: '' }))}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                            >
                                <span className="material-symbols-outlined text-[20px]">close</span>
                            </button>
                        )}
                    </div>

                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={`flex items-center justify-center size-10 rounded-full transition-colors shrink-0 ${showFilters
                                ? 'bg-primary text-white'
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                            }`}
                    >
                        <span className="material-symbols-outlined">tune</span>
                    </button>
                </div>

                {/* 快捷筛选 */}
                <div className="flex gap-2 mt-3 overflow-x-auto no-scrollbar pb-1">
                    {quickFilters.map((filter) => (
                        <button
                            key={filter.value}
                            onClick={() => setFilters((prev) => ({ ...prev, type: filter.value }))}
                            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium shrink-0 transition-all ${filters.type === filter.value
                                    ? 'bg-primary text-white shadow-md'
                                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
                                }`}
                        >
                            <span className="material-symbols-outlined text-[18px]">{filter.icon}</span>
                            {filter.label}
                        </button>
                    ))}
                </div>
            </header>

            {/* 筛选面板 */}
            {showFilters && (
                <div className="bg-white dark:bg-surface-dark px-4 py-4 border-b border-gray-100 dark:border-gray-800 animate-fade-in">
                    <div className="space-y-4">
                        {/* 性别筛选 */}
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">性别</p>
                            <div className="flex gap-2">
                                {[
                                    { label: '不限', value: 'all' as const },
                                    { label: '公', value: 'male' as const, icon: 'male' },
                                    { label: '母', value: 'female' as const, icon: 'female' },
                                ].map((option) => (
                                    <button
                                        key={option.value}
                                        onClick={() => setFilters((prev) => ({ ...prev, gender: option.value }))}
                                        className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${filters.gender === option.value
                                                ? 'bg-primary/10 text-primary border border-primary/30'
                                                : 'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-transparent'
                                            }`}
                                    >
                                        {option.icon && (
                                            <span className="material-symbols-outlined text-[16px]">{option.icon}</span>
                                        )}
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* 重置按钮 */}
                        <button
                            onClick={() =>
                                setFilters({ keyword: '', type: 'all', gender: 'all', ageRange: 'all' })
                            }
                            className="text-sm text-primary font-medium hover:underline"
                        >
                            重置筛选
                        </button>
                    </div>
                </div>
            )}

            {/* 搜索结果 */}
            <main className="px-4 py-4">
                <div className="flex items-center justify-between mb-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        找到 <span className="font-bold text-text-main dark:text-white">{filteredPets.length}</span> 只宠物
                    </p>
                </div>

                {filteredPets.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4">
                        {filteredPets.map((pet) => (
                            <PetCard key={pet.id} pet={pet} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-16">
                        <span className="material-symbols-outlined text-6xl text-gray-300 dark:text-gray-600 mb-4">
                            search_off
                        </span>
                        <p className="text-gray-500 dark:text-gray-400 text-center">
                            没有找到符合条件的宠物
                            <br />
                            试试调整筛选条件
                        </p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default SearchScreen;
