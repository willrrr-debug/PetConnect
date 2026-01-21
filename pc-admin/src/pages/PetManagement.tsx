import React, { useEffect, useState } from 'react';
import { supabase, supabaseAdmin } from '../api/supabase';
import { uploadToR2 } from '../services/r2';
import { PawPrint, Plus, Edit2, Trash2, Search, Filter, Camera, X } from 'lucide-react';

interface Pet {
    id: string;
    name: string;
    type: string;
    breed: string;
    age: string;
    gender: string;
    image_url: string;
    status: string;
    description: string;
    health_tags?: any[];
    requirements?: string[];
}

const COMMON_BREEDS = {
    dog: ['金毛', '柴犬', '拉布拉多', '柯基', '比熊', '泰迪', '哈士奇', '边境牧羊犬', '萨摩耶', '中华田园犬'],
    cat: ['暹罗猫', '英国短毛猫', '布偶猫', '波斯猫', '缅因猫', '橘猫', '狸花猫', '波斯猫', '美短'],
    other: ['兔子', '小仓鼠', '龙猫']
};

const COMMON_AGES = ['3个月', '6个月', '12个月', '1岁', '1.5岁', '2岁', '3岁', '4岁', '5岁', '8岁+'];

const HEALTH_OPTIONS = [
    { id: '1', label: '已绝育', icon: 'check_circle', color: 'green' },
    { id: '2', label: '已驱虫', icon: 'verified', color: 'purple' },
    { id: '3', label: '已疫苗', icon: 'vaccines', color: 'orange' },
];

const REQ_OPTIONS = ['有固定住所', '封闭阳台', '有养宠经验', '同意定期回访', '全家同意', '不离不弃'];

const PetManagement: React.FC = () => {
    const [pets, setPets] = useState<Pet[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPet, setEditingPet] = useState<any | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchPets();
    }, []);

    async function fetchPets() {
        setLoading(true);
        const { data, error } = await supabase
            .from('pets')
            .select('*')
            .order('created_at', { ascending: false });

        if (!error && data) {
            setPets(data);
        }
        setLoading(false);
    }

    const openModal = (pet?: Pet) => {
        setEditingPet(pet || {
            name: '',
            type: 'dog',
            breed: '',
            age: '1岁',
            gender: 'male',
            image_url: '',
            status: 'available',
            description: '',
            health_tags: [],
            requirements: []
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingPet(null);
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        try {
            const url = await uploadToR2(file);
            setEditingPet({ ...editingPet, image_url: url });
        } catch (error) {
            alert('上传失败');
        }
        setIsUploading(false);
    };

    const toggleHealthTag = (tag: any) => {
        const current = editingPet.health_tags || [];
        const exists = current.find((t: any) => t.id === tag.id);
        if (exists) {
            setEditingPet({ ...editingPet, health_tags: current.filter((t: any) => t.id !== tag.id) });
        } else {
            setEditingPet({ ...editingPet, health_tags: [...current, tag] });
        }
    };

    const toggleRequirement = (req: string) => {
        const current = editingPet.requirements || [];
        if (current.includes(req)) {
            setEditingPet({ ...editingPet, requirements: current.filter((r: string) => r !== req) });
        } else {
            setEditingPet({ ...editingPet, requirements: [...current, req] });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingPet) return;

        setLoading(true);
        const { id, ...data } = editingPet;

        let error;
        if (id) {
            ({ error } = await supabaseAdmin.from('pets').update(data).eq('id', id));
        } else {
            ({ error } = await supabaseAdmin.from('pets').insert({
                ...data,
                shelter_id: '11111111-1111-1111-1111-111111111111', // 默认救助站
                distance: '0.1km' // 默认距离
            }));
        }

        if (error) {
            alert('保存失败: ' + error.message);
        } else {
            closeModal();
            fetchPets();
        }
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('确定删除该宠物吗？')) return;
        const { error } = await supabaseAdmin.from('pets').delete().eq('id', id);
        if (error) alert('删除失败');
        else fetchPets();
    };

    const filteredPets = pets.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.breed.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in duration-500">
            <div className="flex items-center justify-between px-4">
                <div>
                    <h2 className="text-3xl font-black text-text-main dark:text-white tracking-tight">宠物档案库</h2>
                    <p className="text-text-muted mt-1 font-medium">管理和更新待领养小伙伴的信息</p>
                </div>
                <button onClick={() => openModal()} className="group btn-primary px-6 py-3.5 rounded-2xl flex items-center gap-2 shadow-lg hover:shadow-primary/30 transition-all">
                    <Plus size={20} />
                    <span className="font-bold">新增小伙伴</span>
                </button>
            </div>

            <div className="flex flex-col md:flex-row gap-4 px-4">
                <div className="flex-1 relative group">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors" size={20} />
                    <input
                        type="text"
                        placeholder="搜索名称或品种..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full bg-white dark:bg-card-dark rounded-2xl pl-14 pr-4 py-4 shadow-sm border border-gray-200 focus:border-primary outline-none transition-all"
                    />
                </div>
                <div className="flex gap-2">
                    <button className="px-6 py-4 bg-white dark:bg-card-dark rounded-2xl border border-gray-200 font-bold text-sm hover:bg-gray-50 flex items-center gap-2">
                        <Filter size={18} />
                        <span>按类别</span>
                    </button>
                </div>
            </div>

            <div className="space-y-4 px-4 pb-20">
                {loading && !isModalOpen ? (
                    <div className="py-40 flex flex-col items-center justify-center gap-4">
                        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                        <p className="text-text-muted font-bold tracking-widest uppercase text-xs">正在调取档案...</p>
                    </div>
                ) : filteredPets.map(pet => (
                    <div key={pet.id} className="group bg-white dark:bg-card-dark rounded-[2rem] p-4 border border-gray-100 shadow-soft hover:shadow-lg hover:border-primary/20 transition-all flex items-center gap-6">
                        {/* Small Thumbnail */}
                        <div className="relative w-20 h-20 rounded-[1.5rem] overflow-hidden bg-gray-50 flex-shrink-0 border border-gray-100">
                            <img src={pet.image_url} alt={pet.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            <div className={`absolute top-1 right-1 w-3 h-3 rounded-full border-2 border-white shadow-sm ${pet.status === 'available' ? 'bg-green-500' : 'bg-secondary'}`}></div>
                        </div>

                        {/* Pet Identity */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3">
                                <h4 className="font-black text-lg text-text-main dark:text-white truncate">{pet.name}</h4>
                                <span className="text-[10px] font-black text-primary bg-primary/5 px-2 py-1 rounded-lg border border-primary/10 uppercase">{pet.breed}</span>
                            </div>
                            <div className="flex items-center gap-4 mt-1.5 text-xs text-text-muted font-black">
                                <span className="flex items-center gap-1.5 bg-gray-50 dark:bg-gray-800/50 px-2.5 py-1 rounded-xl">
                                    {pet.type === 'dog' ? '🐶' : pet.type === 'cat' ? '🐱' : '🐾'}
                                    {pet.type === 'dog' ? '狗狗' : '猫咪'}
                                </span>
                                <span>{pet.gender === 'male' ? '♂️' : '♀️'} • {pet.age}</span>
                            </div>
                        </div>

                        {/* Status & Stats (Optional placeholder for more info) */}
                        <div className="hidden lg:flex items-center gap-10 px-6">
                            <div className="text-center">
                                <p className="text-[10px] font-black text-text-muted uppercase tracking-widest">状态</p>
                                <p className={`text-xs font-black mt-1 ${pet.status === 'available' ? 'text-green-500' : 'text-secondary'}`}>
                                    {pet.status === 'available' ? '待领养' : '已领养'}
                                </p>
                            </div>
                        </div>

                        {/* Actions Panel */}
                        <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800/50 rounded-2xl opacity-40 group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={() => openModal(pet)}
                                className="h-10 px-4 rounded-xl bg-white dark:bg-card-dark text-primary border border-gray-100 dark:border-gray-800 shadow-sm flex items-center gap-2 text-xs font-black hover:scale-105 active:scale-95 transition-all"
                            >
                                <Edit2 size={14} />
                                <span>编辑</span>
                            </button>
                            <button
                                onClick={() => handleDelete(pet.id)}
                                className="h-10 w-10 rounded-xl bg-white dark:bg-card-dark text-red-500 border border-gray-100 dark:border-gray-800 shadow-sm flex items-center justify-center hover:bg-red-50 hover:border-red-100 transition-all"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modern Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 drop-shadow-2xl">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-md transition-all animate-in fade-in" onClick={closeModal}></div>
                    <form onSubmit={handleSubmit} className="relative w-full max-w-4xl bg-white dark:bg-card-dark rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-300">
                        {/* Modal Header */}
                        <div className="px-10 py-8 bg-white/50 dark:bg-card-dark/50 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800 flex items-center justify-between flex-shrink-0">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                    <PawPrint size={24} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black">{editingPet?.id ? '编辑小伙伴档案' : '录入新的小伙伴'}</h3>
                                    <p className="text-xs font-bold text-text-muted mt-1 uppercase tracking-widest">让更多人发现它的可爱之处</p>
                                </div>
                            </div>
                            <button type="button" onClick={closeModal} className="h-10 w-10 flex items-center justify-center rounded-xl hover:bg-gray-100 text-text-muted transition-colors"><X size={24} /></button>
                        </div>

                        {/* Scrollable Form Body */}
                        <div className="flex-1 overflow-y-auto p-10 space-y-10 no-scrollbar">

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                {/* Image Section */}
                                <div className="space-y-4">
                                    <label className="text-sm font-black text-text-main flex items-center gap-2">
                                        <Camera size={18} className="text-primary" />
                                        形象展示 (建议 4:3)
                                    </label>
                                    <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden bg-gray-50 border-2 border-dashed border-gray-200 group flex items-center justify-center">
                                        {editingPet?.image_url ? (
                                            <>
                                                <img src={editingPet.image_url} className="w-full h-full object-cover" alt="preview" />
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                    <label className="cursor-pointer bg-white text-text-main font-black px-6 py-3 rounded-2xl shadow-xl hover:scale-105 transition-transform flex items-center gap-2">
                                                        <Edit2 size={18} /> 替换图片
                                                        <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                                                    </label>
                                                </div>
                                            </>
                                        ) : (
                                            <label className="cursor-pointer flex flex-col items-center gap-4 p-8 text-center text-text-muted hover:text-primary transition-colors">
                                                <div className="w-16 h-16 rounded-3xl bg-primary/5 flex items-center justify-center text-primary/40 group-hover:text-primary group-hover:bg-primary/10 transition-all">
                                                    {isUploading ? <div className="w-8 h-8 border-4 border-t-primary rounded-full animate-spin"></div> : <Plus size={40} />}
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="font-bold text-sm">点击或拖拽上传照片</p>
                                                    <p className="text-[10px] font-medium opacity-60">支持 JPG, PNG, WEBP</p>
                                                </div>
                                                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={isUploading} />
                                            </label>
                                        )}
                                    </div>
                                    <input
                                        className="w-full text-xs font-bold text-text-muted bg-gray-50 px-4 py-2.5 rounded-xl border border-gray-100 outline-none focus:border-primary/30 transition-all"
                                        value={editingPet?.image_url}
                                        onChange={e => setEditingPet({ ...editingPet, image_url: e.target.value })}
                                        placeholder="或直接输入图片 URL 链接..."
                                    />
                                </div>

                                {/* Info Section */}
                                <div className="space-y-8">
                                    <div className="space-y-3">
                                        <label className="text-sm font-black text-text-main">名字叫什么？</label>
                                        <input required className="w-full bg-white dark:bg-card-dark rounded-2xl px-5 py-4 text-base font-bold shadow-sm border border-gray-200 outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all" value={editingPet?.name} onChange={e => setEditingPet({ ...editingPet, name: e.target.value })} placeholder="例: 巴弟" />
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-sm font-black text-text-main">是什么种类？</label>
                                        <div className="flex gap-4">
                                            {['dog', 'cat', 'other'].map(type => (
                                                <button key={type} type="button" onClick={() => setEditingPet({ ...editingPet, type, breed: '' })} className={`flex-1 py-4 rounded-2xl border-2 font-black text-sm transition-all flex flex-col items-center gap-2 ${editingPet?.type === type ? 'border-primary bg-primary/5 text-primary' : 'border-gray-100 bg-gray-50 text-text-muted grayscale'
                                                    }`}>
                                                    <span className="text-2xl">{type === 'dog' ? '🐶' : type === 'cat' ? '🐱' : '🐾'}</span>
                                                    {type === 'dog' ? '狗狗' : type === 'cat' ? '猫咪' : '其他'}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-sm font-black text-text-main">是什么品种？</label>
                                        <div className="flex flex-wrap gap-2">
                                            {COMMON_BREEDS[editingPet?.type as keyof typeof COMMON_BREEDS]?.map(breed => (
                                                <button key={breed} type="button" onClick={() => setEditingPet({ ...editingPet, breed })} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${editingPet?.breed === breed ? 'bg-primary text-white border-primary shadow-md' : 'bg-white border-gray-200 text-text-main hover:border-primary/50'
                                                    }`}>{breed}</button>
                                            ))}
                                            <input
                                                className="flex-1 min-w-[120px] bg-white rounded-xl px-4 py-2 text-xs font-bold border border-gray-200 outline-none focus:border-primary transition-all"
                                                value={editingPet?.breed}
                                                onChange={e => setEditingPet({ ...editingPet, breed: e.target.value })}
                                                placeholder="手动输入品种..."
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Age & Gender Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-4">
                                    <label className="text-sm font-black text-text-main">多大了？</label>
                                    <div className="flex flex-wrap gap-2">
                                        {COMMON_AGES.map(age => (
                                            <button key={age} type="button" onClick={() => setEditingPet({ ...editingPet, age })} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${editingPet?.age === age ? 'bg-primary text-white border-primary shadow-md' : 'bg-white border-gray-200 text-text-main hover:border-primary/50'
                                                }`}>{age}</button>
                                        ))}
                                        <input
                                            className="flex-1 min-w-[100px] bg-white rounded-xl px-4 py-2 text-xs font-bold border border-gray-200 outline-none focus:border-primary transition-all"
                                            value={editingPet?.age}
                                            onChange={e => setEditingPet({ ...editingPet, age: e.target.value })}
                                            placeholder="自定义年龄..."
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="text-sm font-black text-text-main">它的性别是？</label>
                                    <div className="flex gap-4">
                                        {['male', 'female'].map(gender => (
                                            <button key={gender} type="button" onClick={() => setEditingPet({ ...editingPet, gender })} className={`flex-1 py-4 rounded-2xl border-2 font-white font-black text-sm transition-all flex items-center justify-center gap-3 ${editingPet?.gender === gender ? 'border-primary bg-primary/5 text-primary' : 'border-gray-100 bg-gray-50 text-text-muted hover:bg-white'
                                                }`}>
                                                <span className="text-xl">{gender === 'male' ? '♂️' : '♀️'}</span>
                                                {gender === 'male' ? '男生' : '女生'}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-10">
                                {/* Health Tags */}
                                <div className="space-y-4">
                                    <label className="text-sm font-black text-text-main flex items-center justify-between">
                                        <span>健康状况标签</span>
                                        <span className="text-[10px] font-bold text-text-muted uppercase">请勾选已有的记录</span>
                                    </label>
                                    <div className="flex flex-wrap gap-3">
                                        {HEALTH_OPTIONS.map(opt => {
                                            const isSelected = editingPet?.health_tags?.find((t: any) => t.id === opt.id);
                                            return (
                                                <button
                                                    key={opt.id}
                                                    type="button"
                                                    onClick={() => toggleHealthTag(opt)}
                                                    className={`px-6 py-4 rounded-[1.5rem] font-bold text-sm border-2 transition-all flex items-center gap-2 ${isSelected
                                                        ? `border-${opt.color}-500 bg-${opt.color}-500 text-white shadow-lg`
                                                        : 'border-gray-100 bg-gray-50 text-text-muted hover:border-gray-200'
                                                        }`}
                                                >
                                                    <span className={`material-symbols-outlined text-[20px] ${isSelected ? 'filled' : ''}`}>
                                                        {opt.icon}
                                                    </span>
                                                    {opt.label}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Requirements */}
                                <div className="space-y-4">
                                    <label className="text-sm font-black text-text-main">领养要求 (可多选)</label>
                                    <div className="flex flex-wrap gap-2">
                                        {REQ_OPTIONS.map(req => (
                                            <button key={req} type="button" onClick={() => toggleRequirement(req)} className={`px-4 py-2.5 rounded-2xl font-bold text-xs transition-all border-2 ${editingPet?.requirements?.includes(req)
                                                ? 'border-accent bg-accent text-white shadow-md'
                                                : 'border-gray-100 bg-gray-50 text-text-muted hover:border-accent/40'
                                                }`}>{req}</button>
                                        ))}
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="space-y-4">
                                    <label className="text-sm font-black text-text-main">详细背景/故事</label>
                                    <textarea rows={5} className="w-full bg-white dark:bg-card-dark rounded-3xl p-6 text-base font-medium shadow-sm border border-gray-200 outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all resize-none" value={editingPet?.description} onChange={e => setEditingPet({ ...editingPet, description: e.target.value })} placeholder="分享一下关于它的小故事..." />
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="px-10 py-8 bg-gray-50/80 dark:bg-gray-800/80 backdrop-blur-md flex justify-end gap-x-4 border-t border-gray-100 dark:border-gray-800 flex-shrink-0">
                            <button type="button" onClick={closeModal} className="px-8 py-4 rounded-2xl font-black text-text-main hover:bg-white transition-all">取消</button>
                            <button type="submit" disabled={loading} className="group btn-primary px-10 py-4 rounded-2xl font-black shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50">
                                {loading ? '正在同步数据...' : (editingPet?.id ? '更新档案' : '录入完成')}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default PetManagement;
