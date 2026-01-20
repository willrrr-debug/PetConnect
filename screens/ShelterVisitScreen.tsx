import React from 'react';
import { useNavigate } from 'react-router-dom';

const ShelterVisitScreen: React.FC = () => {
    const navigate = useNavigate();

    const shelters = [
        {
            id: 1,
            name: '南山区流浪猫救助站',
            address: '深圳市南山区学府路 123 号',
            distance: '2.5 km',
            phone: '0755-88881234',
            image: 'https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?w=800&auto=format&fit=crop'
        },
        {
            id: 2,
            name: '宝安区爱心犬舍',
            address: '深圳市宝安区前进一路 45 号',
            distance: '12.8 km',
            phone: '0755-66665432',
            image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&auto=format&fit=crop'
        },
        {
            id: 3,
            name: '福田区萌宠庇护所',
            address: '深圳市福田区滨河大道 67 号',
            distance: '8.2 km',
            phone: '0755-22223333',
            image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&auto=format&fit=crop'
        }
    ];

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen pb-10 flex justify-center">
            <div className="relative w-full max-w-[430px] flex flex-col bg-background-light dark:bg-background-dark shadow-2xl">
                {/* Header */}
                <div className="flex items-center p-4 sticky top-0 z-10 backdrop-blur-md bg-transparent">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center justify-center size-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                    >
                        <span className="material-symbols-outlined">arrow_back</span>
                    </button>
                    <h2 className="flex-1 text-center text-lg font-bold mr-10">救助站探访</h2>
                </div>

                <div className="flex flex-col gap-4 px-4 pt-2">
                    {shelters.map(shelter => (
                        <div
                            key={shelter.id}
                            className="group flex flex-col rounded-2xl bg-surface-light dark:bg-surface-dark shadow-sm border border-transparent dark:border-white/5 overflow-hidden transition-all hover:shadow-md"
                        >
                            <div className="h-40 w-full relative">
                                <img src={shelter.image} alt={shelter.name} className="w-full h-full object-cover" />
                                <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md text-white px-2 py-1 rounded-lg text-xs font-bold">
                                    {shelter.distance}
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-bold text-text-main dark:text-white mb-1">{shelter.name}</h3>
                                <div className="flex items-start gap-2 text-text-secondary dark:text-gray-400 mb-4">
                                    <span className="material-symbols-outlined text-[18px] shrink-0">location_on</span>
                                    <p className="text-sm font-medium">{shelter.address}</p>
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => window.location.href = `tel:${shelter.phone}`}
                                        className="flex-1 py-3 rounded-xl bg-primary/10 text-primary font-bold text-sm flex items-center justify-center gap-2 hover:bg-primary/20 transition-all"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">call</span>
                                        电话咨询
                                    </button>
                                    <button
                                        onClick={() => alert('预约功能开放中')}
                                        className="flex-1 py-3 rounded-xl bg-primary text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-primary/20 hover:bg-primary/90 transition-all"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                                        立即预约
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ShelterVisitScreen;
