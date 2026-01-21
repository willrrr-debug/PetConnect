import { supabase } from './supabase';
import { Database } from './database.types';

type Post = Database['public']['Tables']['posts']['Row'];
type PostInsert = Database['public']['Tables']['posts']['Insert'];

/**
 * 帖子服务
 */
export const postService = {
    /**
     * 获取全部帖子
     */
    async getPosts(category?: string) {
        let query = supabase
            .from('posts')
            .select('*, profiles(id, name, avatar_url, verified)')
            .order('created_at', { ascending: false });

        if (category && category !== '全部') {
            // 简单的分类映射
            const catMap: any = {
                '全部': 'all',
                '猫': 'cat',
                '狗': 'dog',
                '紧急': 'emergency',
                '附近': 'nearby'
            };
            const mappedCat = catMap[category] || category;
            if (mappedCat !== 'all') {
                query = query.eq('category', mappedCat);
            }
        }

        const { data, error } = await query;
        return { data, error };
    },

    /**
     * 获取单个帖子详情
     */
    async getPostById(id: string) {
        const { data, error } = await supabase
            .from('posts')
            .select('*, profiles(id, name, avatar_url, verified)')
            .eq('id', id)
            .single();

        return { data, error };
    },

    /**
     * 创建帖子
     */
    async createPost(post: any) {
        const { data, error } = await supabase
            .from('posts')
            .insert(post)
            .select()
            .single();

        return { data, error };
    }
};
