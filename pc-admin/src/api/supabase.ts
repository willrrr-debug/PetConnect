import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabaseServiceKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

// 普通客户端，用于常规查询（受 RLS 限制）
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 管理员客户端，用于审批等高权限操作（绕过 RLS）
// 注意：仅在需要绕过 RLS 的操作中使用
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey || supabaseAnonKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});

export default supabase;
