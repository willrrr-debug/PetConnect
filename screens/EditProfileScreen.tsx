import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context';
import { getAvatarUrl } from '../utils/avatar';
import { uploadAvatar } from '../services/storage';

const EditProfileScreen: React.FC = () => {
    const navigate = useNavigate();
    const { profile, user, updateProfile } = useApp();
    const [name, setName] = useState(profile?.name || '萌宠用户');
    const [bio, setBio] = useState(profile?.bio || '宠物爱好者，希望能为更多流浪动物找到家。');
    const [location, setLocation] = useState(profile?.location || '上海');
    const [isSaving, setIsSaving] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !user) return;

        setIsUploading(true);
        const { url, error } = await uploadAvatar(user.id, file);

        if (error) {
            alert('上传头像失败: ' + error);
        } else if (url) {
            const result = await updateProfile({ avatarUrl: url });
            if (!result.success) {
                alert('更新头像记录失败: ' + result.error);
            }
        }
        setIsUploading(false);
    };

    const handleSave = async () => {
        if (!name.trim()) {
            alert('昵称不能为空');
            return;
        }

        setIsSaving(true);
        const result = await updateProfile({
            name,
            bio,
            location
        });

        setIsSaving(false);

        if (result.success) {
            alert('个人信息已更新！');
            navigate(-1);
        } else {
            alert('保存失败: ' + result.error);
        }
    };

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
                    <h2 className="flex-1 text-center text-lg font-bold">编辑资料</h2>
                    <button
                        onClick={handleSave}
                        disabled={isSaving || isUploading}
                        className="text-primary font-bold px-3 py-1.5 rounded-full hover:bg-primary/10 transition-colors disabled:opacity-50"
                    >
                        {isSaving ? '保存中...' : '保存'}
                    </button>
                </div>

                <div className="flex flex-col items-center px-6 pt-8 gap-10">
                    {/* Avatar Edit */}
                    <div className="relative group cursor-pointer" onClick={handleAvatarClick}>
                        <div
                            className="bg-center bg-no-repeat bg-cover rounded-full h-32 w-32 shadow-lg ring-4 ring-white dark:ring-surface-dark transition-transform bg-gray-100 flex items-center justify-center overflow-hidden"
                            style={{ backgroundImage: `url('${getAvatarUrl(profile?.id || user?.id, profile?.avatarUrl)}')` }}
                        >
                            <div className={`absolute inset-0 bg-black/30 rounded-full flex items-center justify-center transition-opacity ${isUploading ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                                {isUploading ? (
                                    <div className="animate-spin rounded-full h-8 w-8 border-2 border-white border-t-transparent"></div>
                                ) : (
                                    <span className="material-symbols-outlined text-white text-3xl">photo_camera</span>
                                )}
                            </div>
                        </div>
                        <p className="text-primary text-sm font-bold mt-3 text-center">
                            {isUploading ? '上传中...' : '更换头像'}
                        </p>
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={handleAvatarChange}
                        />
                    </div>

                    {/* Form */}
                    <div className="w-full flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-text-secondary dark:text-gray-500 uppercase tracking-widest ml-1">昵称</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full p-4 rounded-2xl bg-surface-light dark:bg-surface-dark border border-transparent dark:border-white/5 focus:ring-2 focus:ring-primary/20 outline-none font-medium transition-all"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-text-secondary dark:text-gray-500 uppercase tracking-widest ml-1">个性签名</label>
                            <textarea
                                rows={3}
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                className="w-full p-4 rounded-2xl bg-surface-light dark:bg-surface-dark border border-transparent dark:border-white/5 focus:ring-2 focus:ring-primary/20 outline-none font-medium transition-all resize-none"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-text-secondary dark:text-gray-500 uppercase tracking-widest ml-1">所在地</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    className="w-full pl-11 pr-4 py-4 rounded-2xl bg-surface-light dark:bg-surface-dark border border-transparent dark:border-white/5 focus:ring-2 focus:ring-primary/20 outline-none font-medium transition-all"
                                />
                                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">location_on</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProfileScreen;
