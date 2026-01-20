import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PetCard from '../components/PetCard';
import { getPets } from '../services/pets';
import type { Pet } from '../types';
import type { Database } from '../services/database.types';

type DBPet = Database['public']['Tables']['pets']['Row'];

const PetListScreen: React.FC = () => {
    const navigate = useNavigate();
    const [pets, setPets] = useState<Pet[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeType, setActiveType] = useState<'all' | 'dog' | 'cat'>('all');

    const fetchPets = async (type: 'all' | 'dog' | 'cat') => {
        setLoading(true);
        const { data, error } = await getPets({ type: type === 'all' ? undefined : type });
        if (!error && data) {
            // Map DB pet to UI pet type
            const mappedPets: Pet[] = data.map((p: DBPet) => ({
                id: p.id,
                name: p.name,
                type: p.type as any,
                breed: p.breed,
                age: p.age,
                gender: p.gender as any,
                imageUrl: p.image_url,
                distance: '1.2 km', // Mock distance
            }));
            setPets(mappedPets);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchPets(activeType);
    }, [activeType]);

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen pb-24 font-display">
            <header className="sticky top-0 z-10 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm px-6 pt-6 pb-2">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-white dark:hover:bg-card-dark transition-colors">
                        <span className="material-symbols-outlined text-[24px]">arrow_back</span>
                    </button>
                    <h1 className="text-2xl font-bold text-text-main dark:text-white">发现新伙伴</h1>
                </div>

                <div className="mt-6 flex gap-3">
                    <button
                        onClick={() => setActiveType('all')}
                        className={`px-6 py-2 rounded-2xl font-bold transition-all ${activeType === 'all'
                            ? 'bg-primary text-white shadow-lg shadow-primary/30'
                            : 'bg-white dark:bg-card-dark text-text-muted dark:text-gray-400 hover:bg-gray-50'
                            }`}
                    >
                        全部
                    </button>
                    <button
                        onClick={() => setActiveType('dog')}
                        className={`px-6 py-2 rounded-2xl font-bold transition-all ${activeType === 'dog'
                            ? 'bg-primary text-white shadow-lg shadow-primary/30'
                            : 'bg-white dark:bg-card-dark text-text-muted dark:text-gray-400 hover:bg-gray-50'
                            }`}
                    >
                        狗狗
                    </button>
                    <button
                        onClick={() => setActiveType('cat')}
                        className={`px-6 py-2 rounded-2xl font-bold transition-all ${activeType === 'cat'
                            ? 'bg-primary text-white shadow-lg shadow-primary/30'
                            : 'bg-white dark:bg-card-dark text-text-muted dark:text-gray-400 hover:bg-gray-50'
                            }`}
                    >
                        猫咪
                    </button>
                </div>
            </header>

            <main className="px-6 py-4">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-text-muted font-medium">寻找中...</p>
                    </div>
                ) : pets.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4">
                        {pets.map(pet => (
                            <PetCard key={pet.id} pet={pet} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <span className="material-symbols-outlined text-[64px] text-gray-200 mb-4">pets</span>
                        <p className="text-lg font-bold text-text-main dark:text-white">暂无相关宠物</p>
                        <p className="text-text-muted mt-1">去看看其他的伙伴吧</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default PetListScreen;
