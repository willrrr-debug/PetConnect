/**
 * 用户相关类型定义
 */

/** 用户角色 */
export type UserRole = 'adopter' | 'shelter' | 'admin';

/** 用户信息 */
export interface User {
    id: string;
    name: string;
    avatar: string;
    email?: string;
    phone?: string;
    verified: boolean;
    role: UserRole;
    stats?: UserStats;
    createdAt?: string;
}

/** 用户统计数据 */
export interface UserStats {
    adoptions: number;
    favorites: number;
    following: number;
}

/** 认证状态 */
export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    loading: boolean;
}
