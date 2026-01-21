-- 彻底修复注册报错：new row violates row-level security policy for table "profiles"

-- 1. 允许用户插入自己的资料（虽然我们有触发器，但前端有时可能需要显式插入/幂等处理）
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- 2. 这里的关键在于：Supabase 的注册流程中，auth.users 的记录创建早于前端 insert profile 
-- 如果你已经配置了 handle_new_user 触发器，那么 insert 操作会由系统触发，不需要 RLS 权限（定义为 SECURITY DEFINER）。
-- 但如果前端还在尝试手动 insert，就需要这个 INSERT 策略。

-- 3. 顺便完善其他的策略
DROP POLICY IF EXISTS "Anyone can view any profile" ON profiles;
CREATE POLICY "Anyone can view any profile" ON profiles
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);
