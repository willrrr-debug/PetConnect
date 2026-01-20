/**
 * 收藏相关 API 服务
 */

import { supabase } from './supabase';

/**
 * 获取用户的收藏列表
 */
export async function getFavorites(userId: string): Promise<{ data: string[]; error: string | null }> {
    try {
        const { data, error } = await supabase
            .from('favorites')
            .select('pet_id')
            .eq('user_id', userId);

        if (error) {
            return { data: [], error: error.message };
        }

        return { data: data?.map((f) => f.pet_id) || [], error: null };
    } catch (err) {
        return { data: [], error: '获取收藏列表失败' };
    }
}

/**
 * 添加收藏
 */
export async function addFavorite(
    userId: string,
    petId: string
): Promise<{ success: boolean; error: string | null }> {
    try {
        const { error } = await supabase.from('favorites').insert({
            user_id: userId,
            pet_id: petId,
        });

        if (error) {
            // 如果是重复收藏，忽略错误
            if (error.code === '23505') {
                return { success: true, error: null };
            }
            return { success: false, error: error.message };
        }

        return { success: true, error: null };
    } catch (err) {
        return { success: false, error: '添加收藏失败' };
    }
}

/**
 * 移除收藏
 */
export async function removeFavorite(
    userId: string,
    petId: string
): Promise<{ success: boolean; error: string | null }> {
    try {
        const { error } = await supabase
            .from('favorites')
            .delete()
            .eq('user_id', userId)
            .eq('pet_id', petId);

        if (error) {
            return { success: false, error: error.message };
        }

        return { success: true, error: null };
    } catch (err) {
        return { success: false, error: '移除收藏失败' };
    }
}

/**
 * 切换收藏状态
 */
export async function toggleFavorite(
    userId: string,
    petId: string,
    isFavorited: boolean
): Promise<{ success: boolean; error: string | null }> {
    if (isFavorited) {
        return removeFavorite(userId, petId);
    } else {
        return addFavorite(userId, petId);
    }
}

/**
 * 检查是否已收藏
 */
export async function checkFavorite(
    userId: string,
    petId: string
): Promise<{ isFavorited: boolean; error: string | null }> {
    try {
        const { data, error } = await supabase
            .from('favorites')
            .select('id')
            .eq('user_id', userId)
            .eq('pet_id', petId)
            .single();

        if (error && error.code !== 'PGRST116') {
            return { isFavorited: false, error: error.message };
        }

        return { isFavorited: !!data, error: null };
    } catch (err) {
        return { isFavorited: false, error: '检查收藏状态失败' };
    }
}
