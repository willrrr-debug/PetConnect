-- 为 pets 表增加 user_id 字段，用于追踪提交该宠物的用户
ALTER TABLE pets ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES profiles(id) ON DELETE SET NULL;

-- 允许用户提交宠物
CREATE POLICY "Users can insert pets" ON pets
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 允许用户查看自己提交的宠物（如果需要）
CREATE POLICY "Users can view own pets" ON pets
  FOR SELECT USING (auth.uid() = user_id OR status = 'available');
