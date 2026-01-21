-- 为 profiles 表添加新字段
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS bio TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS location TEXT;

-- 确保存储桶存在（如果无法通过 SQL 创建，请在 Supabase Dashboard 手动创建）
-- INSERT INTO storage.buckets (id, name, public) VALUES ('petconnect', 'petconnect', true) ON CONFLICT (id) DO NOTHING;

-- 设置存储策略（允许认证用户上传自己的头像）
-- 注意：这里假设 bucket 名字为 'petconnect'，如果不同请修改
CREATE POLICY "Allow public select on petconnect" ON storage.objects FOR SELECT TO public USING (bucket_id = 'petconnect');
CREATE POLICY "Allow authenticated upload on petconnect" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'petconnect');
CREATE POLICY "Allow users to update own files on petconnect" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'petconnect' AND (storage.foldername(name))[1] = 'avatars');
