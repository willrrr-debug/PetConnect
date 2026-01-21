-- 插入10只精选宠物测试数据 (使用国内访问更稳定的镜像 CDN)
-- 请在 Supabase 控制台的 SQL Editor 中运行此脚本

-- 1. 清理旧数据
DELETE FROM pets;

-- 2. 插入精选宠物 (图片通过 weserv.nl 镜像加速)
INSERT INTO pets (name, type, breed, age, gender, weight, description, image_url, status, distance, health_tags, requirements) VALUES
  ('糯米', 'dog', '萨摩耶', '2岁', 'male', '22kg', '糯米是标准的“微笑天使”，性格非常温顺，喜欢和人互动。它已经完成了基础的随行训练，非常适合有小朋友的家庭。', 'https://images.weserv.nl/?url=images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&q=80', 'available', '1.2 km', '[{"id": "vaccinated", "label": "已疫苗", "icon": "vaccines", "color": "green"}, {"id": "neutered", "label": "已绝育", "icon": "healing", "color": "purple"}, {"id": "dewormed", "label": "已驱虫", "icon": "medication", "color": "orange"}]', ARRAY['有足够的陪伴时间', '科学喂养', '定期回访']),

  ('元宝', 'cat', '中华田园橘猫', '1岁', 'male', '6kg', '元宝是一只标准的“大橘”，心宽体胖，性格极其随和，谁抱都可以。它最喜欢的事情就是在阳光晒得到的窗台上睡觉。', 'https://images.weserv.nl/?url=images.unsplash.com/photo-1533738363-b7f9aef128ce?w=800&q=80', 'available', '0.8 km', '[{"id": "vaccinated", "label": "已疫苗", "icon": "vaccines", "color": "green"}, {"id": "dewormed", "label": "已驱虫", "icon": "medication", "color": "orange"}]', ARRAY['封网', '按时疫苗', '不抛弃']),

  ('布丁', 'cat', '英国短毛猫', '8个月', 'female', '3.5kg', '小美猫布丁，有一双圆圆的眼睛，性格稍微有点害羞，但只要你拿出零食，它就会立刻变成你的贴身小棉袄。', 'https://images.weserv.nl/?url=images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&q=80', 'available', '2.5 km', '[{"id": "vaccinated", "label": "已疫苗", "icon": "vaccines", "color": "green"}]', ARRAY['仅限室内饲养', '科学喂养', '适龄绝育']),

  ('坦克', 'dog', '法国斗牛犬', '3岁', 'male', '12kg', '坦克虽然叫坦克，但其实胆子很小。它不爱运动，只想静静地躺在你脚边陪着你。适合平时比较安静的主人。', 'https://images.weserv.nl/?url=images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&q=80', 'available', '3.5 km', '[{"id": "vaccinated", "label": "已疫苗", "icon": "vaccines", "color": "green"}, {"id": "neutered", "label": "已绝育", "icon": "healing", "color": "purple"}]', ARRAY['注意空调环境', '定期清理皮肤皱褶']),

  ('将军', 'dog', '德国牧羊犬', '4岁', 'male', '32kg', '将军是退役的搜救犬（模拟数据），服从性极高，能听懂多种指令。它需要一个有大空间的家庭，以及能够经常带它出去运动的主人。', 'https://images.weserv.nl/?url=images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=800&q=80', 'available', '5.0 km', '[{"id": "vaccinated", "label": "已疫苗", "icon": "vaccines", "color": "green"}, {"id": "neutered", "label": "已绝育", "icon": "healing", "color": "purple"}]', ARRAY['有养大型犬经验', '每天保证运动量', '领养需家访']),

  ('雪球', 'dog', '比熊', '1.5岁', 'female', '5kg', '雪球就像一朵行走的棉花糖，性格活泼好动，喜欢到处跑和跳。它非常有灵性，能感觉到主人的情绪。', 'https://images.weserv.nl/?url=images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=800&q=80', 'available', '1.8 km', '[{"id": "vaccinated", "label": "已疫苗", "icon": "vaccines", "color": "green"}, {"id": "dewormed", "label": "已驱虫", "icon": "medication", "color": "orange"}]', ARRAY['需要定期美容', '不离不弃']),

  ('煤球', 'cat', '黑猫', '2岁', 'male', '4.5kg', '煤球是一只通体漆黑、眼睛像琥珀一样的帅猫。它的颜值极高，在人群中总能一眼认出。它有点高冷，但一旦认准主人就会非常忠诚。', 'https://images.weserv.nl/?url=images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&q=80', 'available', '4.2 km', '[{"id": "vaccinated", "label": "已疫苗", "icon": "vaccines", "color": "green"}, {"id": "neutered", "label": "已绝育", "icon": "healing", "color": "purple"}]', ARRAY['室内散养', '按时体检', '科学喂养']),

  ('六六', 'cat', '狸花猫', '1岁', 'female', '4kg', '六六是救助站的“抓鼠能手”，身体素质极佳。它是典型的外向型猫咪，对新环境适应非常快。', 'https://images.weserv.nl/?url=images.unsplash.com/photo-1574158622682-e40e69881006?w=800&q=80', 'available', '2.1 km', '[{"id": "vaccinated", "label": "已疫苗", "icon": "vaccines", "color": "green"}, {"id": "dewormed", "label": "已驱虫", "icon": "medication", "color": "orange"}]', ARRAY['必须封网', '领养代替购买']),

  ('摩卡', 'dog', '拉布拉多', '5岁', 'female', '28kg', '摩卡性格沉稳，是家里的定海神针。它非常聪明，能听懂简单的日常指令，甚至能帮你拿拖鞋。', 'https://images.weserv.nl/?url=images.unsplash.com/photo-1552053831-71594a27632d?w=800&q=80', 'available', '6.5 km', '[{"id": "vaccinated", "label": "已疫苗", "icon": "vaccines", "color": "green"}, {"id": "neutered", "label": "已绝育", "icon": "healing", "color": "purple"}]', ARRAY['科学喂养防止肥胖', '充足的户外运动时间']),

  ('可乐', 'dog', '柯基', '2岁', 'male', '11kg', '小短腿可乐，是一个十足的吃货。虽然腿短，但跑起来像个小电钻。它是邻里间的明星，大家都喜欢它的小电臀。', 'https://images.weserv.nl/?url=images.unsplash.com/photo-1519098901909-b1553a1190af?w=800&q=80', 'available', '3.0 km', '[{"id": "vaccinated", "label": "已疫苗", "icon": "vaccines", "color": "green"}]', ARRAY['注意脊椎护理', '不要进行过于剧烈的爬楼梯运动']);

-- 3. 结果验证
SELECT id, name, breed, age FROM pets ORDER BY created_at DESC;
