-- 为 posts 表增加联系方式字段
ALTER TABLE posts ADD COLUMN IF NOT EXISTS contact TEXT;
