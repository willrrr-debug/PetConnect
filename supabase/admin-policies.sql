-- PetConnect 管理后台数据库策略
-- 为管理员添加访问权限

-- ============================================
-- 1. 消息表策略修改
-- ============================================
-- 添加系统消息策略（允许后端发送系统消息）
DROP POLICY IF EXISTS "System can send messages" ON messages;

CREATE POLICY "System can send messages" ON messages
  FOR INSERT WITH CHECK (sender_id IS NULL AND type = 'system');

-- 允许用户查看系统消息
DROP POLICY IF EXISTS "Users can view system messages" ON messages;

CREATE POLICY "Users can view system messages" ON messages
  FOR SELECT USING (
    type = 'system' OR auth.uid() = sender_id
  );

-- ============================================
-- 2. 使用 Service Key 绕过 RLS
-- ============================================
-- NOTE: 后端使用 Supabase Service Key 访问数据库
-- Service Key 拥有完全权限，可以绕过 RLS 策略
-- 因此不需要为管理员创建特殊的数据库策略

-- 如果需要在数据库层面进行权限控制，可以创建以下策略：

-- 创建 admin_users 表存储管理员用户ID
CREATE TABLE IF NOT EXISTS admin_users (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 为 pets 表添加管理员策略
DROP POLICY IF EXISTS "Admins can manage all pets" ON pets;

CREATE POLICY "Admins can manage all pets" ON pets
  FOR ALL USING (
    EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid())
  );

-- 为 applications 表添加管理员查看策略
DROP POLICY IF EXISTS "Admins can view all applications" ON applications;

CREATE POLICY "Admins can view all applications" ON applications
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid())
  );

-- 为 applications 表添加管理员更新策略
DROP POLICY IF EXISTS "Admins can update all applications" ON applications;

CREATE POLICY "Admins can update all applications" ON applications
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid())
  );

-- ============================================
-- 3. 插入示例管理员（可选）
-- ============================================
-- 如需添加管理员，在此处插入其user_id
-- 示例：
-- INSERT INTO admin_users (user_id) VALUES ('your-admin-uuid');

-- 完成
SELECT '管理后台数据库策略已创建' AS result;
