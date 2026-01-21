import { supabase } from './supabase';

/**
 * 上传头像到 Supabase Storage
 */
export async function uploadAvatar(userId: string, file: File): Promise<{ url: string | null; error: string | null }> {
    try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${userId}-${Math.random()}.${fileExt}`;
        const filePath = `avatars/${fileName}`;

        // 上传文件
        const { error: uploadError } = await supabase.storage
            .from('petconnect')
            .upload(filePath, file, {
                cacheControl: '3600',
                upsert: true
            });

        if (uploadError) {
            throw uploadError;
        }

        // 获取公共 URL
        const { data: { publicUrl } } = supabase.storage
            .from('petconnect')
            .getPublicUrl(filePath);

        return { url: publicUrl, error: null };
    } catch (err: any) {
        console.error('Upload avatar error:', err);
        return { url: null, error: err.message || '上传失败' };
    }
}
