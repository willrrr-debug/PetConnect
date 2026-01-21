import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPet } from '../services/pets';
import { useApp } from '../context/AppContext';

const AddPetScreen: React.FC = () => {
    const navigate = useNavigate();
    const { user, isMockMode } = useApp();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [submitting, setSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const [name, setName] = useState('');
    const [type, setType] = useState('dog');
    const [breed, setBreed] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('male');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState<string[]>([]);
    const [location, setLocation] = useState('');
    const [contact, setContact] = useState('');

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            Array.from(files).forEach((file: File) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const img = new Image();
                    img.src = reader.result as string;
                    img.onload = () => {
                        const canvas = document.createElement('canvas');
                        let width = img.width;
                        let height = img.height;
                        const MAX_WIDTH = 1024;
                        if (width > MAX_WIDTH) {
                            height = Math.round((height * MAX_WIDTH) / width);
                            width = MAX_WIDTH;
                        }
                        canvas.width = width;
                        canvas.height = height;
                        const ctx = canvas.getContext('2d');
                        ctx?.drawImage(img, 0, 0, width, height);
                        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
                        setImages(prev => [...prev, compressedBase64].slice(0, 9));
                    };
                };
                reader.readAsDataURL(file);
            });
        }
    };

    const removeImage = (index: number) => {
        setImages(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async () => {
        if (!user) {
            alert('请先登录后再提交申请');
            navigate('/login');
            return;
        }

        if (!name.trim() || images.length === 0) {
            alert('请填写宠物名称并上传照片');
            return;
        }

        if (isMockMode) {
            setShowSuccess(true);
            setTimeout(() => navigate('/home'), 2000);
            return;
        }

        setSubmitting(true);
        try {
            const { error } = await createPet({
                name,
                type: type as any,
                breed,
                age,
                gender: gender as any,
                description,
                image_url: images[0],
                images: images,
                status: 'pending' as any,
                user_id: user.id
            } as any);

            if (!error) {
                setShowSuccess(true);
                setTimeout(() => {
                    navigate('/home');
                }, 2500);
            } else {
                console.error('Submit error:', error);
                alert('提交失败: ' + (typeof error === 'string' ? error : '权限不足或网络错误'));
            }
        } catch (err: any) {
            alert('发生错误: ' + err.message);
        } finally {
            setSubmitting(false);
        }
    };

    if (showSuccess) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center bg-background-light dark:bg-background-dark p-6 text-center h-screen">
                <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6 animate-bounce">
                    <span className="material-symbols-outlined text-[48px] text-green-500">check_circle</span>
                </div>
                <h2 className="text-2xl font-bold text-text-main dark:text-white mb-2">申请已提交</h2>
                <p className="text-text-muted mb-8">管理员正在审核您的入库申请，审核结果将通过系统消息告知您。</p>
            </div>
        );
    }

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-[#111618] dark:text-white overflow-x-hidden antialiased min-h-screen flex flex-col pb-24">
            <header className="sticky top-0 z-50 bg-white/80 dark:bg-surface-dark/90 backdrop-blur-lg border-b border-gray-100 dark:border-gray-800 px-4 h-[52px] flex items-center justify-between">
                <button
                    onClick={() => navigate(-1)}
                    className="text-gray-600 dark:text-gray-300 text-[16px] font-medium active:opacity-60 transition-opacity"
                >
                    取消
                </button>
                <h1 className="text-[17px] font-bold text-[#111618] dark:text-white">入库申请</h1>
                <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="bg-primary hover:bg-primary/90 text-white text-[14px] font-bold px-4 py-1.5 rounded-full shadow-sm shadow-primary/20 active:scale-95 transition-all disabled:opacity-50"
                >
                    {submitting ? '提交中...' : '发布'}
                </button>
            </header>

            <main className="flex-1 p-4 space-y-4 overflow-y-auto">
                <div className="bg-white dark:bg-surface-dark rounded-2xl p-4 shadow-soft">
                    <div className="flex items-center justify-between mb-3">
                        <label className="font-bold text-gray-900 dark:text-white text-sm">宠物照片</label>
                        <span className="text-xs text-gray-400">必填 ({images.length}/9)</span>
                    </div>
                    <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
                        {images.map((img, index) => (
                            <div key={index} className="relative size-24 shrink-0 rounded-xl overflow-hidden group border border-gray-100 dark:border-gray-700">
                                <img src={img} alt="Pet preview" className="w-full h-full object-cover" />
                                <button
                                    onClick={() => removeImage(index)}
                                    className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-0.5"
                                >
                                    <span className="material-symbols-outlined text-[14px]">close</span>
                                </button>
                            </div>
                        ))}
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="size-24 shrink-0 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex flex-col items-center justify-center text-gray-400 gap-1 active:bg-gray-100 transition-colors"
                        >
                            <span className="material-symbols-outlined text-[28px]">add</span>
                            <span className="text-xs font-medium">添加更多</span>
                        </button>
                        <input
                            type="file"
                            className="hidden"
                            ref={fileInputRef}
                            onChange={handleImageUpload}
                            accept="image/*"
                            multiple
                        />
                    </div>
                </div>

                <div className="bg-white dark:bg-surface-dark rounded-2xl p-4 shadow-soft space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-900 dark:text-white">宠物名称</label>
                        <input
                            type="text"
                            placeholder="给它起个名字吧"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-gray-50 dark:bg-gray-800/50 border-0 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-900 dark:text-white">类型</label>
                            <select
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                className="w-full bg-gray-50 dark:bg-gray-800/50 border-0 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20"
                            >
                                <option value="dog">狗狗</option>
                                <option value="cat">猫咪</option>
                                <option value="other">其他</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-900 dark:text-white">性别</label>
                            <div className="flex bg-gray-50 dark:bg-gray-800/50 rounded-xl p-1">
                                <button
                                    onClick={() => setGender('male')}
                                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${gender === 'male' ? 'bg-white dark:bg-card-dark text-primary shadow-sm' : 'text-gray-400'}`}
                                >
                                    男生
                                </button>
                                <button
                                    onClick={() => setGender('female')}
                                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${gender === 'female' ? 'bg-white dark:bg-card-dark text-pink-500 shadow-sm' : 'text-gray-400'}`}
                                >
                                    女生
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-900 dark:text-white">品种</label>
                            <input
                                type="text"
                                placeholder="如：金毛、橘猫"
                                value={breed}
                                onChange={(e) => setBreed(e.target.value)}
                                className="w-full bg-gray-50 dark:bg-gray-800/50 border-0 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-900 dark:text-white">年龄</label>
                            <input
                                type="text"
                                placeholder="如：2岁、6个月"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                className="w-full bg-gray-50 dark:bg-gray-800/50 border-0 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-900 dark:text-white">详情描述</label>
                        <textarea
                            placeholder="请描述宠物的健康状况、性格特征及救助经过..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full bg-gray-50 dark:bg-gray-800/50 border-0 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 min-h-[120px] resize-none"
                        ></textarea>
                    </div>
                </div>

                <div className="bg-white dark:bg-surface-dark rounded-2xl overflow-hidden shadow-soft divide-y divide-gray-50 dark:divide-gray-800">
                    <div className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-3.5 shrink-0">
                            <div className="size-9 rounded-full bg-[#FFB8A3]/20 dark:bg-[#FFB8A3]/10 flex items-center justify-center text-primary">
                                <span className="material-symbols-outlined text-[20px] filled">location_on</span>
                            </div>
                            <span className="font-bold text-sm text-gray-900 dark:text-white">所在位置</span>
                        </div>
                        <input
                            type="text"
                            placeholder="点击选择位置"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="flex-1 bg-transparent border-none text-right text-gray-900 dark:text-white placeholder-gray-400 focus:ring-0 p-0 ml-4 text-sm font-medium"
                        />
                    </div>
                    <div className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-3.5 shrink-0">
                            <div className="size-9 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-green-500">
                                <span className="material-symbols-outlined text-[20px] filled">perm_phone_msg</span>
                            </div>
                            <span className="font-bold text-sm text-gray-900 dark:text-white">联系方式</span>
                        </div>
                        <input
                            type="text"
                            placeholder="手机号 / 微信号"
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                            className="flex-1 bg-transparent border-none text-right text-gray-900 dark:text-white placeholder-gray-400 focus:ring-0 p-0 ml-4 text-sm font-medium"
                        />
                    </div>
                </div>

                <div className="px-4 py-2">
                    <p className="text-xs text-gray-400 dark:text-gray-500 text-center leading-relaxed">
                        提交即代表您承诺提供真实信息。
                        <br />审核结果将在 24 小时内通过系统消息告知。
                    </p>
                </div>
            </main>
        </div>
    );
};

export default AddPetScreen;
