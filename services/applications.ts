/**
 * 领养申请相关 API 服务
 */

import { supabase } from './supabase';
import type { Database } from './database.types';

type Application = Database['public']['Tables']['applications']['Row'];
type ApplicationInsert = Database['public']['Tables']['applications']['Insert'];

export interface ApplicationWithPet extends Application {
    pet?: {
        name: string;
        breed: string;
        image_url: string;
    };
}

/**
 * 获取用户的申请列表
 */
export async function getApplications(
    userId: string
): Promise<{ data: ApplicationWithPet[]; error: string | null }> {
    try {
        const { data, error } = await supabase
            .from('applications')
            .select(`
        *,
        pet:pets(name, breed, image_url)
      `)
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        if (error) {
            return { data: [], error: error.message };
        }

        return { data: data || [], error: null };
    } catch (err) {
        return { data: [], error: '获取申请列表失败' };
    }
}

/**
 * 获取单个申请详情
 */
export async function getApplicationById(
    id: string
): Promise<{ data: ApplicationWithPet | null; error: string | null }> {
    try {
        const { data, error } = await supabase
            .from('applications')
            .select(`
        *,
        pet:pets(name, breed, image_url)
      `)
            .eq('id', id)
            .single();

        if (error) {
            return { data: null, error: error.message };
        }

        return { data, error: null };
    } catch (err) {
        return { data: null, error: '获取申请详情失败' };
    }
}

/**
 * 创建新申请
 */
export async function createApplication(
    application: ApplicationInsert
): Promise<{ data: Application | null; error: string | null }> {
    try {
        const { data, error } = await supabase
            .from('applications')
            .insert(application)
            .select()
            .single();

        if (error) {
            return { data: null, error: error.message };
        }

        return { data, error: null };
    } catch (err) {
        return { data: null, error: '创建申请失败' };
    }
}

/**
 * 更新申请
 */
export async function updateApplication(
    id: string,
    updates: Partial<ApplicationInsert>
): Promise<{ success: boolean; error: string | null }> {
    try {
        const { error } = await supabase
            .from('applications')
            .update({
                ...updates,
                updated_at: new Date().toISOString(),
            })
            .eq('id', id);

        if (error) {
            return { success: false, error: error.message };
        }

        return { success: true, error: null };
    } catch (err) {
        return { success: false, error: '更新申请失败' };
    }
}

/**
 * 检查是否已申请某只宠物
 */
export async function checkExistingApplication(
    userId: string,
    petId: string
): Promise<{ exists: boolean; application: Application | null; error: string | null }> {
    try {
        const { data, error } = await supabase
            .from('applications')
            .select('*')
            .eq('user_id', userId)
            .eq('pet_id', petId)
            .single();

        if (error && error.code !== 'PGRST116') {
            return { exists: false, application: null, error: error.message };
        }

        return { exists: !!data, application: data, error: null };
    } catch (err) {
        return { exists: false, application: null, error: '检查申请状态失败' };
    }
}
