import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured, onAuthStateChange, signIn, signUp, signOut as authSignOut, resetPassword as authResetPassword } from '../services';
import * as favoritesService from '../services/favorites';
import { mockCurrentUser } from '../data';

// ============ 类型定义 ============

interface UserProfile {
    id: string;
    name: string;
    avatarUrl: string | null;
    phone: string | null;
    verified: boolean;
}

interface AppState {
    /** 当前用户 */
    user: User | null;
    /** 用户资料 */
    profile: UserProfile | null;
    /** 是否已登录 */
    isAuthenticated: boolean;
    /** 收藏的宠物 ID 列表 */
    favorites: string[];
    /** 是否加载中 */
    loading: boolean;
    /** 是否初始化完成 */
    initialized: boolean;
    /** 是否使用 Mock 模式 */
    isMockMode: boolean;
}

interface AppContextType extends AppState {
    /** 登录 */
    login: (email: string, password: string) => Promise<{ success: boolean; error: string | null }>;
    /** 注册 */
    register: (email: string, password: string, name: string) => Promise<{ success: boolean; error: string | null }>;
    /** 重置密码 */
    logout: () => Promise<void>;
    /** 发送重置密码邮件 */
    sendPasswordResetEmail: (email: string) => Promise<{ success: boolean; error: string | null }>;
    /** 添加收藏 */
    addFavorite: (petId: string) => Promise<void>;
    /** 移除收藏 */
    removeFavorite: (petId: string) => Promise<void>;
    /** 切换收藏状态 */
    toggleFavorite: (petId: string) => Promise<void>;
    /** 检查是否已收藏 */
    isFavorited: (petId: string) => boolean;
    /** 刷新收藏列表 */
    refreshFavorites: () => Promise<void>;
}

// ============ Context 创建 ============

const AppContext = createContext<AppContextType | undefined>(undefined);

// ============ Provider 组件 ============

interface AppProviderProps {
    children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [state, setState] = useState<AppState>({
        user: null,
        profile: null,
        isAuthenticated: false,
        favorites: [],
        loading: true,
        initialized: false,
        isMockMode: !isSupabaseConfigured,
    });

    // 获取用户资料（Supabase 模式）
    const fetchProfile = useCallback(async (userId: string) => {
        if (!supabase) return null;

        const { data } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();

        const profileData = data as any;

        if (profileData) {
            return {
                id: profileData.id,
                name: profileData.name,
                avatarUrl: profileData.avatar_url,
                phone: profileData.phone,
                verified: profileData.verified,
            };
        }
        return null;
    }, []);

    // 获取收藏列表
    const fetchFavorites = useCallback(async (userId: string) => {
        if (!isSupabaseConfigured) {
            // Mock 模式：从 localStorage 读取
            const saved = localStorage.getItem('petconnect_favorites');
            return saved ? JSON.parse(saved) : [];
        }
        const { data } = await favoritesService.getFavorites(userId);
        return data;
    }, []);

    // 初始化
    useEffect(() => {
        const initAuth = async () => {
            // Mock 模式
            if (!isSupabaseConfigured) {
                console.log('📱 PetConnect 运行在 Mock 模式（Supabase 未配置）');
                const savedAuth = localStorage.getItem('petconnect_auth');
                const savedFavorites = localStorage.getItem('petconnect_favorites');

                setState({
                    user: null,
                    profile: savedAuth === 'true' ? {
                        id: mockCurrentUser.id,
                        name: mockCurrentUser.name,
                        avatarUrl: mockCurrentUser.avatar,
                        phone: mockCurrentUser.phone || null,
                        verified: mockCurrentUser.verified,
                    } : null,
                    isAuthenticated: savedAuth === 'true',
                    favorites: savedFavorites ? JSON.parse(savedFavorites) : [],
                    loading: false,
                    initialized: true,
                    isMockMode: true,
                });
                return;
            }

            // Supabase 模式
            const { data: { session } } = await supabase.auth.getSession();
            const savedFavorites = localStorage.getItem('petconnect_favorites');
            const localFavorites = savedFavorites ? JSON.parse(savedFavorites) : [];

            if (session?.user) {
                const profile = await fetchProfile(session.user.id);
                const supabaseFavorites = await fetchFavorites(session.user.id);
                // 合并本地（Mock）和云端收藏
                const mergedFavorites = Array.from(new Set([...supabaseFavorites, ...localFavorites]));

                setState({
                    user: session.user,
                    profile,
                    isAuthenticated: true,
                    favorites: mergedFavorites,
                    loading: false,
                    initialized: true,
                    isMockMode: false,
                });
            } else {
                setState((prev) => ({
                    ...prev,
                    favorites: localFavorites,
                    loading: false,
                    initialized: true,
                    isMockMode: false,
                }));
            }
        };

        initAuth();

        // 监听认证状态变化（仅 Supabase 模式）
        if (isSupabaseConfigured) {
            const { data: { subscription } } = onAuthStateChange(async (user) => {
                if (user) {
                    const profile = await fetchProfile(user.id);
                    const favorites = await fetchFavorites(user.id);

                    setState((prev) => ({
                        ...prev,
                        user,
                        profile,
                        isAuthenticated: true,
                        favorites,
                        loading: false,
                    }));
                } else {
                    setState((prev) => ({
                        ...prev,
                        user: null,
                        profile: null,
                        isAuthenticated: false,
                        favorites: [],
                        loading: false,
                    }));
                }
            });

            return () => {
                subscription.unsubscribe();
            };
        }
    }, [fetchProfile, fetchFavorites]);

    // 同步收藏到 localStorage (即使是 Supabase 模式，也同步 mock ID 的收藏)
    useEffect(() => {
        if (state.initialized) {
            localStorage.setItem('petconnect_favorites', JSON.stringify(state.favorites));
        }
    }, [state.favorites, state.initialized]);

    // 登录
    const login = useCallback(async (email: string, password: string) => {
        setState((prev) => ({ ...prev, loading: true }));

        // Mock 模式
        if (!isSupabaseConfigured) {
            await new Promise((resolve) => setTimeout(resolve, 500));
            localStorage.setItem('petconnect_auth', 'true');
            setState((prev) => ({
                ...prev,
                profile: {
                    id: mockCurrentUser.id,
                    name: mockCurrentUser.name,
                    avatarUrl: mockCurrentUser.avatar,
                    phone: mockCurrentUser.phone || null,
                    verified: mockCurrentUser.verified,
                },
                isAuthenticated: true,
                loading: false,
            }));
            return { success: true, error: null };
        }

        // Supabase 模式
        const { error } = await signIn(email, password);

        if (error) {
            setState((prev) => ({ ...prev, loading: false }));
            return { success: false, error: error.message };
        }

        return { success: true, error: null };
    }, []);

    // 注册
    const register = useCallback(async (email: string, password: string, name: string) => {
        setState((prev) => ({ ...prev, loading: true }));

        // Mock 模式
        if (!isSupabaseConfigured) {
            await new Promise((resolve) => setTimeout(resolve, 500));
            localStorage.setItem('petconnect_auth', 'true');
            setState((prev) => ({
                ...prev,
                profile: {
                    id: 'mock-user-id',
                    name,
                    avatarUrl: null,
                    phone: null,
                    verified: false,
                },
                isAuthenticated: true,
                loading: false,
            }));
            return { success: true, error: null };
        }

        // Supabase 模式
        const { error } = await signUp(email, password, name);

        if (error) {
            setState((prev) => ({ ...prev, loading: false }));
            return { success: false, error: error.message };
        }

        return { success: true, error: null };
    }, []);

    // 登出
    const logout = useCallback(async () => {
        if (!isSupabaseConfigured) {
            localStorage.removeItem('petconnect_auth');
        } else {
            await authSignOut();
        }

        setState((prev) => ({
            ...prev,
            user: null,
            profile: null,
            isAuthenticated: false,
            favorites: state.isMockMode ? prev.favorites : [],
        }));
    }, [state.isMockMode]);

    // 发送重置密码邮件
    const sendPasswordResetEmail = useCallback(async (email: string) => {
        if (!isSupabaseConfigured) {
            await new Promise(resolve => setTimeout(resolve, 800));
            return { success: true, error: null };
        }

        const { error } = await authResetPassword(email);
        return { success: !error, error: error?.message || null };
    }, []);

    // 刷新收藏列表
    const refreshFavorites = useCallback(async () => {
        if (state.user || state.isMockMode) {
            const favorites = await fetchFavorites(state.user?.id || 'mock');
            setState((prev) => ({ ...prev, favorites }));
        }
    }, [state.user, state.isMockMode, fetchFavorites]);

    // 添加收藏
    const addFavorite = useCallback(async (petId: string) => {
        // 乐观更新
        setState((prev) => ({
            ...prev,
            favorites: Array.from(new Set([...prev.favorites, petId])),
        }));

        // 如果是系统预设的 Mock ID (通常不是 UUID)，不尝试同步到 Supabase 
        const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(petId);

        if (!state.isMockMode && state.user && isUUID) {
            const { success } = await favoritesService.addFavorite(state.user.id, petId);
            if (!success) {
                // 仅在真实数据同步失败时回滚
                setState((prev) => ({
                    ...prev,
                    favorites: prev.favorites.filter((id) => id !== petId),
                }));
            }
        }
    }, [state.user, state.isMockMode]);

    // 移除收藏
    const removeFavorite = useCallback(async (petId: string) => {
        // 乐观更新
        setState((prev) => ({
            ...prev,
            favorites: prev.favorites.filter((id) => id !== petId),
        }));

        const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(petId);

        if (!state.isMockMode && state.user && isUUID) {
            const { success } = await favoritesService.removeFavorite(state.user.id, petId);
            if (!success) {
                // 回滚
                setState((prev) => ({
                    ...prev,
                    favorites: [...prev.favorites, petId],
                }));
            }
        }
    }, [state.user, state.isMockMode]);

    // 切换收藏状态
    const toggleFavorite = useCallback(async (petId: string) => {
        if (state.favorites.includes(petId)) {
            await removeFavorite(petId);
        } else {
            await addFavorite(petId);
        }
    }, [state.favorites, addFavorite, removeFavorite]);

    // 检查是否已收藏
    const isFavorited = useCallback((petId: string) => {
        return state.favorites.includes(petId);
    }, [state.favorites]);

    const value: AppContextType = {
        ...state,
        login,
        register,
        logout,
        sendPasswordResetEmail,
        addFavorite,
        removeFavorite,
        toggleFavorite,
        isFavorited,
        refreshFavorites,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// ============ Hook ============

/**
 * 使用全局状态的 Hook
 * @throws 如果在 AppProvider 外部使用会抛出错误
 */
export const useApp = (): AppContextType => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
};

export default AppContext;
