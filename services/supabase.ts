/**
 * Supabase 客户端初始化
 * 
 * 配置说明：
 * 1. 在 Supabase 控制台获取 Project URL 和 Anon Key
 * 2. 将凭证填入 .env.local 文件
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

// 从环境变量获取配置
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// 是否已配置
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

// 创建 Supabase 客户端（延迟初始化，防止崩溃）
let _supabase: SupabaseClient<Database> | null = null;

/**
 * 获取 Supabase 客户端
 * 如果未配置则返回 null
 */
export function getSupabaseClient(): SupabaseClient<Database> | null {
    if (!isSupabaseConfigured) {
        console.warn(
            '⚠️ Supabase 凭证未配置。请在 .env.local 文件中添加：\n' +
            'VITE_SUPABASE_URL=your-project-url\n' +
            'VITE_SUPABASE_ANON_KEY=your-anon-key\n' +
            '然后重启开发服务器 (npm run dev)'
        );
        return null;
    }

    if (!_supabase) {
        _supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
            auth: {
                autoRefreshToken: true,
                persistSession: true,
                detectSessionInUrl: true,
            },
        });
    }

    return _supabase;
}

// 为了兼容现有代码，也导出一个 supabase 实例
// 但在使用前应该检查 isSupabaseConfigured
export const supabase = isSupabaseConfigured
    ? createClient<Database>(supabaseUrl, supabaseAnonKey, {
        auth: {
            autoRefreshToken: true,
            persistSession: true,
            detectSessionInUrl: true,
        },
    })
    : null as unknown as SupabaseClient<Database>; // 类型断言以保持类型兼容

export default supabase;
