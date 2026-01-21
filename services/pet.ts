/**
 * 宠物相关 API 服务
 */

import { supabase } from './supabase';
import type { Pet } from '../types/pet';

/**
 * 将数据库项转换为 Pet 类型
 */
export function mapPet(item: any): Pet {
    return {
        id: item.id,
        name: item.name,
        type: item.type,
        breed: item.breed,
        age: item.age,
        gender: item.gender,
        weight: item.weight,
        imageUrl: item.image_url,
        images: item.images,
        distance: item.distance,
        description: item.description,
        healthTags: item.health_tags,
        requirements: item.requirements,
        restrictions: item.restrictions,
        shelterId: item.shelter_id,
        createdAt: item.created_at,
    };
}

/**
 * 获取所有宠物
 */
export async function getPets() {
    const { data, error } = await supabase
        .from('pets')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching pets:', error);
        return [];
    }

    return (data || []).map(mapPet);
}

/**
 * 根据 ID 列表获取宠物
 */
export async function getPetsByIds(ids: string[]) {
    if (!ids || ids.length === 0) return [];

    const { data, error } = await supabase
        .from('pets')
        .select('*')
        .in('id', ids);

    if (error) {
        console.error('Error fetching pets by ids:', error);
        return [];
    }

    return (data || []).map(mapPet);
}
