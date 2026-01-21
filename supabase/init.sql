-- PetConnect 数据库重置脚本
-- 在 Supabase SQL Editor 中执行此脚本
-- 注意：这会删除并重新创建所有表和策略

-- ============================================
-- 0. 删除已存在的策略（避免冲突）
-- ============================================
DO $$ 
BEGIN
    -- profiles policies
    DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
    DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
    
    -- shelters policies  
    DROP POLICY IF EXISTS "Anyone can view shelters" ON shelters;
    
    -- pets policies
    DROP POLICY IF EXISTS "Anyone can view pets" ON pets;
    
    -- favorites policies
    DROP POLICY IF EXISTS "Users can view own favorites" ON favorites;
    DROP POLICY IF EXISTS "Users can add favorites" ON favorites;
    DROP POLICY IF EXISTS "Users can remove favorites" ON favorites;
    
    -- applications policies
    DROP POLICY IF EXISTS "Users can view own applications" ON applications;
    DROP POLICY IF EXISTS "Users can create applications" ON applications;
    DROP POLICY IF EXISTS "Users can update own applications" ON applications;
    
    -- messages policies
    DROP POLICY IF EXISTS "Users can view own messages" ON messages;
    DROP POLICY IF EXISTS "Users can send messages" ON messages;
EXCEPTION
    WHEN undefined_table THEN NULL;
END $$;

-- ============================================
-- 1. 用户资料表
-- ============================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  avatar_url TEXT,
  phone TEXT,
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- ============================================
-- 2. 救助站表
-- ============================================
CREATE TABLE IF NOT EXISTS shelters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  avatar_url TEXT,
  verified BOOLEAN DEFAULT FALSE,
  location TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE shelters ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view shelters" ON shelters
  FOR SELECT USING (true);

-- ============================================
-- 3. 宠物表
-- ============================================
CREATE TABLE IF NOT EXISTS pets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('dog', 'cat', 'other')),
  breed TEXT NOT NULL,
  age TEXT NOT NULL,
  gender TEXT NOT NULL CHECK (gender IN ('male', 'female')),
  weight TEXT,
  description TEXT,
  image_url TEXT NOT NULL,
  images TEXT[],
  distance TEXT,
  shelter_id UUID REFERENCES shelters(id),
  health_tags JSONB,
  requirements TEXT[],
  restrictions TEXT[],
  status TEXT DEFAULT 'available' CHECK (status IN ('available', 'adopted', 'pending')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE pets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view pets" ON pets
  FOR SELECT USING (true);

-- ============================================
-- 4. 收藏表
-- ============================================
CREATE TABLE IF NOT EXISTS favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  pet_id UUID NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, pet_id)
);

ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own favorites" ON favorites
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can add favorites" ON favorites
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove favorites" ON favorites
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================
-- 5. 领养申请表
-- ============================================
CREATE TABLE IF NOT EXISTS applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  pet_id UUID NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewing', 'approved', 'rejected')),
  personal_info JSONB,
  living_info JSONB,
  agreed_to_terms BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own applications" ON applications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create applications" ON applications
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own applications" ON applications
  FOR UPDATE USING (auth.uid() = user_id);

-- ============================================
-- 6. 消息表
-- ============================================
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL,
  sender_id UUID REFERENCES profiles(id),
  content TEXT NOT NULL,
  type TEXT DEFAULT 'text' CHECK (type IN ('text', 'image', 'system')),
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own messages" ON messages
  FOR SELECT USING (auth.uid() = sender_id);

CREATE POLICY "Users can send messages" ON messages
  FOR INSERT WITH CHECK (auth.uid() = sender_id);

-- ============================================
-- 7. 触发器：自动创建用户资料
-- ============================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- 8. 清理并插入示例数据
-- ============================================
DELETE FROM pets;
DELETE FROM shelters;

INSERT INTO shelters (id, name, avatar_url, verified, location) VALUES
  ('11111111-1111-1111-1111-111111111111', '快乐爪爪救助站', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMjMgySDEP8OcmEfL0vs6qML5NYZsyRYy9SmUAd_iwRgEvOlYRokUcDwt-AAdoj5eb36sgG-XZ6q8FMcivrnc7hjvtJN_TndeJKGcyxEdAfcInRzGd-m2GAGiFjQRy4JPjn8soh1B2BpuRQhS5g6Edl7iUUhZcvN8VJW-ZLKncoGvz_Y_7RogLkl2kjxURIks1I3Bxg9Dh5IfCYaW6pPg5K0wPmnc44vF2pf6SaNmNRRBRZqin25j0OV6l9fAmPoLJVFLpzyYChBY', true, '上海市浦东新区'),
  ('22222222-2222-2222-2222-222222222222', '爱心宠物之家', 'https://lh3.googleusercontent.com/aida-public/AB6AXuANp8e4y-U3drq1bDemOmPVUy92eJO_75iG1dYm7ukOjibZ07QL4A7uqJqgibX-mGFNQQfINc6EodX3_d_oEyy-6D-l9xjkPLnxOdxn-XnBKqx178EcuqS1E2VT8YFKvJLKqHiTvKNGxdw6H--TcCIf9WzfAeWGF9Kfl5J5d-h6YbUjT_2a0xwZskFNT7cTVsKYQiEWqGINMY8lPiMxvOE8kTMPqUlZ10bGm9n4Fq_1XsE6-ue5Rvo_nE7bGD5j3UNhXgxP6tYcXMY', true, '上海市徐汇区');

INSERT INTO pets (name, type, breed, age, gender, image_url, distance, description, shelter_id, health_tags, requirements, status) VALUES
  ('巴弟', 'dog', '金毛', '2岁', 'male', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDiPoSXxeAmwXX64LAmWPvtmvbsfYt9pj4A7VCK0PHqER2A6IYXJzEJL-RJIrohMNZzbv9Xsh8Y_d4XQKJ2WSwIOR7aYAgDdi2l94womrJXF6mjO5ohxKeOaffDenloX1VwOmsb4O28pNhmWSrhkqrwiYsrubq51rPF_NU0QuR37JCYVtUZxbacrm1qzqC55XdLkU8063LgiDL4YUxYMiEwxEBUxvaQnNIW4mnO4rhW5xe-dJn7wEOtmYv9VnzDG9h7RjEln6fEd4o', '2.5km', '巴弟是一只非常活泼友好的金毛，喜欢和人玩耍。', '11111111-1111-1111-1111-111111111111', '[{"id":"1","label":"已绝育","icon":"check_circle","color":"green"},{"id":"2","label":"已驱虫","icon":"verified","color":"purple"}]', ARRAY['有固定住所', '同意定期回访', '有养宠经验'], 'available'),
  ('露娜', 'cat', '暹罗猫', '1岁', 'female', 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7W_vs2Xe_HI4vs0hTdtKRbEnVm0gPK2cP2sO3n8V0z17uVTpwq3LPNfUngsgKKaM33XBZOiAxC8TlIgg1VWwvtXnUGLTnj_P3jRgG1j6YXLzsNx5-0_y4Ra8GqTJrhlfFzzV5rByq31xoJ-pf27eNPLvFxE5J3xe4CYsZ0CsraJA5Q7OJFWpMIADW5dDBU7VnlAr--BAZK7C0Iy6YD6sogAk4J-Nljbiug3x4WvWROJAqowckLKUsJyMRE162ig7jEiN22GBkwA8', '3.2km', '露娜是一只优雅的暹罗猫，性格温顺。', '11111111-1111-1111-1111-111111111111', '[{"id":"1","label":"已绝育","icon":"check_circle","color":"green"},{"id":"3","label":"已疫苗","icon":"vaccines","color":"orange"}]', ARRAY['有固定住所', '封闭阳台'], 'available'),
  ('麦克斯', 'dog', '柴犬', '3岁', 'male', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwfmhJtQX87sM3VfMjO_LeFXj2Nk0_G3hVq3xjmeLFnKCYHjqNmOIkCXLh8hyeyBvOhLFY9O6zP1TLB7W-QjLqLvOKvDAi_B9EG4L6MBg7D6g15Yom8Lfh4UE1s8o0BoS1v1QZLlKi8l_P39X0nQqNKL8LQH1nVV-dPVVP4mzCQdE7d2yPLn0JYDcYB0r4rBmWnxLWl4YhpQ6sJjJLXbnqD4LNlUvBQ0JKoLwEJYqQCW2AYDEzqFlWk1bREVXybRmJkoPjB0M2ZLI', '1.8km', '麦克斯是一只活泼可爱的柴犬。', '22222222-2222-2222-2222-222222222222', '[{"id":"1","label":"已绝育","icon":"check_circle","color":"green"}]', ARRAY['有固定住所'], 'available'),
  ('咪咪', 'cat', '橘猫', '6个月', 'female', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMKXC5b8dU1wAfqf_JFdP5vJQKBE6Ld4yHT_5ZJDbM5vLOmVjGCXsQnE8FqJ3GLv1ZVJH7pJB0TG7qKt_hkR4Gn2dKU-hxPUvMPQpQhbNQrJXG4J8-9fJz7LVP1mQ8A7g5yEkbVgR3xK9K6qT2bz3P1G8nYmJ7LhVbN-qX9vJGLsHkQ2P8rMKoT5A6nLB3d1sZCw0fWh4XqY2jK8bRdN3H7mLxPvK0TJ5S9aE2gO4iU6yRrB8wC1nF3mI5kP7jQ', '4.1km', '咪咪是一只可爱的橘猫宝宝。', '22222222-2222-2222-2222-222222222222', '[{"id":"2","label":"已驱虫","icon":"verified","color":"purple"}]', ARRAY['有固定住所', '封闭阳台'], 'available');

-- 完成！
SELECT 'Database initialized successfully! Created tables: profiles, shelters, pets, favorites, applications, messages' AS result;
