-- 为 pets 表添加插入权限策略
-- 允许已认证用户插入宠物数据

DROP POLICY IF EXISTS "Authenticated users can insert pets" ON pets;

CREATE POLICY "Authenticated users can insert pets" ON pets
  FOR INSERT 
  WITH CHECK (auth.uid() IS NOT NULL);

-- 验证策略
SELECT 'Insert policy added successfully!' AS result;
