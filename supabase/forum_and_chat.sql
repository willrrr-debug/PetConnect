-- 新增论坛帖子表和对话表
-- 支持联系功能和后台储存聊天记录

-- 1. 帖子表
CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  images TEXT[],
  location TEXT,
  category TEXT DEFAULT 'all', -- all, cat, dog, emergency, nearby
  is_emergency BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 开启 RLS
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view posts" ON posts
  FOR SELECT USING (true);

CREATE POLICY "Users can create posts" ON posts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own posts" ON posts
  FOR UPDATE USING (auth.uid() = user_id);

-- 2. 对话表 (Conversations)
-- 用于管理两个用户（或用户与救助站）之间的聊天
CREATE TABLE IF NOT EXISTS conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  participant1_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  participant2_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  last_message TEXT,
  last_message_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(participant1_id, participant2_id)
);

ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own conversations" ON conversations
  FOR SELECT USING (auth.uid() = participant1_id OR auth.uid() = participant2_id);

CREATE POLICY "Users can create conversations" ON conversations
  FOR INSERT WITH CHECK (auth.uid() = participant1_id OR auth.uid() = participant2_id);

-- 3. 修改消息表 (如果需要)
-- 之前的 init.sql 已经定义了 messages 表，我们确保它与 conversation_id 关联
-- 我们可能需要调整权限，让对话参与者都能看到消息
DROP POLICY IF EXISTS "Users can view own messages" ON messages;
CREATE POLICY "Users can view messages in own conversations" ON messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM conversations 
      WHERE conversations.id = messages.conversation_id 
      AND (conversations.participant1_id = auth.uid() OR conversations.participant2_id = auth.uid())
    )
  );

DROP POLICY IF EXISTS "Users can send messages" ON messages;
CREATE POLICY "Users can send messages to own conversations" ON messages
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM conversations 
      WHERE conversations.id = messages.conversation_id 
      AND (conversations.participant1_id = auth.uid() OR conversations.participant2_id = auth.uid())
    )
  );

-- 示例数据
INSERT INTO posts (user_id, title, content, location, category, is_emergency, image_url)
SELECT 
  id, 
  '紧急求助：在大悦城附近发现流浪小猫', 
  '小猫看起来很虚弱，左腿似乎受伤了，但我家里有大狗无法暂时收养。急需好心人或者救助机构接手...', 
  '北京市, 朝阳区', 
  'emergency', 
  true,
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBRlYbAw2_ehMSsH7qtvMOl_Vi87Lxs_jrL2K5M9MfH9_rpFIPoOfOrrIjMeXvrQFbq_zCRoPExCWpq-uBseIaZxhCTdHdyaMvZKDuL8uB_IUCuccLAV89gHOVrQ3zrFXDqyHNYGRDnMz1bPMkhRs3NbxQK1O9jj8HYtvECjbumbVLbXNp2aIPYJG9sd5yxQezvs38_B7BwUJG2czO4NEnxqIuBx_qOPLfLKhrlWhSi04GzyEs1g0jo39T08Yp0XzbEabGub9zgv4g'
FROM profiles LIMIT 1;
