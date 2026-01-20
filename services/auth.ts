/**
 * 认证相关 API 服务
 */

import { supabase } from './supabase';
import type { User } from '@supabase/supabase-js';

export interface AuthError {
    message: string;
    code?: string;
}

export interface AuthResult {
    user: User | null;
    error: AuthError | null;
}

/**
 * 邮箱密码注册
 */
export async function signUp(
    email: string,
    password: string,
    name: string
): Promise<AuthResult> {
    try {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    name,
                },
            },
        });

        if (error) {
            return { user: null, error: { message: error.message, code: error.code } };
        }

        // 创建用户资料
        if (data.user) {
            await supabase.from('profiles').insert({
                id: data.user.id,
                name,
            });
        }

        return { user: data.user, error: null };
    } catch (err) {
        return { user: null, error: { message: '注册失败，请稍后重试' } };
    }
}

/**
 * 邮箱密码登录
 */
export async function signIn(email: string, password: string): Promise<AuthResult> {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            return { user: null, error: { message: error.message, code: error.code } };
        }

        return { user: data.user, error: null };
    } catch (err) {
        return { user: null, error: { message: '登录失败，请稍后重试' } };
    }
}

/**
 * 登出
 */
export async function signOut(): Promise<{ error: AuthError | null }> {
    try {
        const { error } = await supabase.auth.signOut();
        if (error) {
            return { error: { message: error.message } };
        }
        return { error: null };
    } catch (err) {
        return { error: { message: '登出失败' } };
    }
}

/**
 * 获取当前用户
 */
export async function getCurrentUser(): Promise<User | null> {
    const { data } = await supabase.auth.getUser();
    return data.user;
}

/**
 * 获取当前会话
 */
export async function getSession() {
    const { data } = await supabase.auth.getSession();
    return data.session;
}

/**
 * 监听认证状态变化
 */
export function onAuthStateChange(callback: (user: User | null) => void) {
    return supabase.auth.onAuthStateChange((event, session) => {
        callback(session?.user ?? null);
    });
}

/**
 * 重置密码
 */
export async function resetPassword(email: string): Promise<{ error: AuthError | null }> {
    try {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) {
            return { error: { message: error.message } };
        }
        return { error: null };
    } catch (err) {
        return { error: { message: '发送重置邮件失败' } };
    }
}
