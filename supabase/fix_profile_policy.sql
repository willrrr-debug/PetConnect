-- 修复 profiles 表的权限问题，允许所有用户查看其他用户的基本信息
-- 否则在论坛、宠物详情等页面无法正确显示发布者信息

-- 1. 删除旧的受限策略
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;

-- 2. 创建新的策略，允许所有人读取资料
-- 注意：如果是敏感信息（如手机号），可以在字段级或通过视图进行过滤，但目前 PetConnect 业务需要展示头像和名字
CREATE POLICY "Anyone can view any profile" ON profiles
  FOR SELECT USING (true);

-- 3. 确保用户只能修改自己的资料
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);
