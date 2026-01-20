/**
 * 宠物相关 API 服务
 */

import { supabase } from './supabase';
import type { Database } from './database.types';

type Pet = Database['public']['Tables']['pets']['Row'];
type PetInsert = Database['public']['Tables']['pets']['Insert'];

export interface PetsFilter {
    type?: 'dog' | 'cat' | 'other' | 'all';
    gender?: 'male' | 'female' | 'all';
    keyword?: string;
    limit?: number;
    offset?: number;
}

/**
 * 获取宠物列表
 */
export async function getPets(filter: PetsFilter = {}): Promise<{ data: Pet[]; error: string | null }> {
    try {
        let query = supabase
            .from('pets')
            .select('*')
            .eq('status', 'available')
            .order('created_at', { ascending: false });

        // 类型筛选
        if (filter.type && filter.type !== 'all') {
            query = query.eq('type', filter.type);
        }

        // 性别筛选
        if (filter.gender && filter.gender !== 'all') {
            query = query.eq('gender', filter.gender);
        }

        // 关键词搜索（名字或品种）
        if (filter.keyword) {
            query = query.or(`name.ilike.%${filter.keyword}%,breed.ilike.%${filter.keyword}%`);
        }

        // 分页
        if (filter.limit) {
            query = query.limit(filter.limit);
        }
        if (filter.offset) {
            query = query.range(filter.offset, filter.offset + (filter.limit || 10) - 1);
        }

        const { data, error } = await query;

        if (error) {
            return { data: [], error: error.message };
        }

        return { data: data || [], error: null };
    } catch (err) {
        return { data: [], error: '获取宠物列表失败' };
    }
}

/**
 * 获取单个宠物详情
 */
export async function getPetById(id: string): Promise<{ data: Pet | null; error: string | null }> {
    try {
        const { data, error } = await supabase
            .from('pets')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            return { data: null, error: error.message };
        }

        return { data, error: null };
    } catch (err) {
        return { data: null, error: '获取宠物详情失败' };
    }
}

/**
 * 获取最新入库的宠物
 */
export async function getLatestPets(limit = 5): Promise<{ data: Pet[]; error: string | null }> {
    return getPets({ limit });
}

/**
 * 搜索宠物
 */
export async function searchPets(keyword: string): Promise<{ data: Pet[]; error: string | null }> {
    return getPets({ keyword });
}
/**
 * 创建新宠物记录（入库申请）
 */
export async function createPet(pet: PetInsert): Promise<{ data: Pet | null; error: string | null }> {
    try {
        const { data, error } = await supabase
            .from('pets')
            .insert({
                ...pet,
                status: 'pending', // 初始状态为待审核
            })
            .select()
            .single();

        if (error) {
            return { data: null, error: error.message };
        }

        return { data, error: null };
    } catch (err) {
        return { data: null, error: '创建宠物记录失败' };
    }
}
