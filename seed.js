
import { createClient } from '@supabase/supabase-js';

// 请替换为您在 Supabase 控制台获取的参数
const supabaseUrl = 'https://amaszxsqfbaesoogvxmr.supabase.co';
// ⚠️ 这里需要填入 Service Role Key，不要在客户端代码中暴露
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFtYXN6eHNxZmJhZXNvb2d2eG1yIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODg2MzUwNiwiZXhwIjoyMDg0NDM5NTA2fQ.SBsv8I-1M4XsffHDiObYvNDBsEzlxbZIC6MkFJirQhs';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const pets = [
    {
        name: '糯米',
        type: 'dog',
        breed: '萨摩耶',
        age: '2岁',
        gender: 'male',
        weight: '22kg',
        description: '糯米是标准的“微笑天使”，性格非常温顺，喜欢和人互动。它已经完成了基础的随行训练，非常适合有小朋友的家庭。',
        image_url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2094&auto=format&fit=crop',
        status: 'available',
        distance: '1.2 km',
        health_tags: [
            { "id": "vaccinated", "label": "已疫苗", "icon": "vaccines", "color": "green" },
            { "id": "neutered", "label": "已绝育", "icon": "healing", "color": "purple" },
            { "id": "dewormed", "label": "已驱虫", "icon": "medication", "color": "orange" }
        ],
        requirements: ['有足够的陪伴时间', '科学喂养', '定期回访']
    },
    {
        name: '元宝',
        type: 'cat',
        breed: '中华田园橘猫',
        age: '1岁',
        gender: 'male',
        weight: '6kg',
        description: '元宝是一只标准的“大橘”，心宽体胖，性格极其随和，谁抱都可以。它最喜欢的事情就是在阳光晒得到的窗台上睡觉。',
        image_url: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=1935&auto=format&fit=crop',
        status: 'available',
        distance: '0.8 km',
        health_tags: [
            { "id": "vaccinated", "label": "已疫苗", "icon": "vaccines", "color": "green" },
            { "id": "dewormed", "label": "已驱虫", "icon": "medication", "color": "orange" }
        ],
        requirements: ['封网', '按时疫苗', '不抛弃']
    },
    {
        name: '布丁',
        type: 'cat',
        breed: '英国短毛猫',
        age: '8个月',
        gender: 'female',
        weight: '3.5kg',
        description: '小美猫布丁，有一双圆圆的眼睛，性格稍微有点害羞，但只要你拿出零食，它就会立刻变成你的贴身小棉袄。',
        image_url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2043&auto=format&fit=crop',
        status: 'available',
        distance: '2.5 km',
        health_tags: [
            { "id": "vaccinated", "label": "已疫苗", "icon": "vaccines", "color": "green" }
        ],
        requirements: ['仅限室内饲养', '科学喂养', '适龄绝育']
    },
    {
        name: '坦克',
        type: 'dog',
        breed: '法国斗牛犬',
        age: '3岁',
        gender: 'male',
        weight: '12kg',
        description: '坦克虽然叫坦克，但其实胆子很小。它不爱运动，只想静静地躺在你脚边陪着你。适合平时比较安静的主人。',
        image_url: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=2069&auto=format&fit=crop',
        status: 'available',
        distance: '3.5 km',
        health_tags: [
            { "id": "vaccinated", "label": "已疫苗", "icon": "vaccines", "color": "green" },
            { "id": "neutered", "label": "已绝育", "icon": "healing", "color": "purple" }
        ],
        requirements: ['注意空调环境', '定期清理皮肤皱褶']
    },
    {
        name: '将军',
        type: 'dog',
        breed: '德国牧羊犬',
        age: '4岁',
        gender: 'male',
        weight: '32kg',
        description: '将军是退役的搜救犬（模拟数据），服从性极高，能听懂多种指令。它需要一个有大空间的家庭，以及能够经常带它出去运动的主人。',
        image_url: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?q=80&w=1974&auto=format&fit=crop',
        status: 'available',
        distance: '5.0 km',
        health_tags: [
            { "id": "vaccinated", "label": "已疫苗", "icon": "vaccines", "color": "green" },
            { "id": "neutered", "label": "已绝育", "icon": "healing", "color": "purple" }
        ],
        requirements: ['有养大型犬经验', '每天保证运动量', '领养需家访']
    },
    {
        name: '雪球',
        type: 'dog',
        breed: '比熊',
        age: '1.5岁',
        gender: 'female',
        weight: '5kg',
        description: '雪球就像一朵行走的棉花糖，性格活泼好动，喜欢到处跑和跳。它非常有灵性，能感觉到主人的情绪。',
        image_url: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=2071&auto=format&fit=crop',
        status: 'available',
        distance: '1.8 km',
        health_tags: [
            { "id": "vaccinated", "label": "已疫苗", "icon": "vaccines", "color": "green" },
            { "id": "dewormed", "label": "已驱虫", "icon": "medication", "color": "orange" }
        ],
        requirements: ['需要定期美容', '不离不弃']
    },
    {
        name: '煤球',
        type: 'cat',
        breed: '孟买猫',
        age: '2岁',
        gender: 'male',
        weight: '4.5kg',
        description: '煤球是一只通体漆黑、眼睛像琥珀一样的帅猫。它的颜值极高，在人群中总能一眼认出。它有点高冷，但一旦认准主人就会非常忠诚。',
        image_url: 'https://images.unsplash.com/photo-1557246565-8a3d955d7426?q=80&w=2070&auto=format&fit=crop',
        status: 'available',
        distance: '4.2 km',
        health_tags: [
            { "id": "vaccinated", "label": "已疫苗", "icon": "vaccines", "color": "green" },
            { "id": "neutered", "label": "已绝育", "icon": "healing", "color": "purple" }
        ],
        requirements: ['室内散养', '按时体检', '科学喂养']
    },
    {
        name: '六六',
        type: 'cat',
        breed: '狸花猫',
        age: '1岁',
        gender: 'female',
        weight: '4kg',
        description: '六六是救助站的“抓鼠能手”，身体素质极佳。它是典型的外向型猫咪，对新环境适应非常快。',
        image_url: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?q=80&w=2000&auto=format&fit=crop',
        status: 'available',
        distance: '2.1 km',
        health_tags: [
            { "id": "vaccinated", "label": "已疫苗", "icon": "vaccines", "color": "green" },
            { "id": "dewormed", "label": "已驱虫", "icon": "medication", "color": "orange" }
        ],
        requirements: ['必须封网', '领养代替购买']
    },
    {
        name: '摩卡',
        type: 'dog',
        breed: '拉布拉多',
        age: '5岁',
        gender: 'female',
        weight: '28kg',
        description: '摩卡性格沉稳，是家里的定海神针。它非常聪明，能听懂简单的日常指令，甚至能帮你拿拖鞋。',
        image_url: 'https://images.unsplash.com/photo-1591769225440-811ad7d6eab2?q=80&w=1974&auto=format&fit=crop',
        status: 'available',
        distance: '6.5 km',
        health_tags: [
            { "id": "vaccinated", "label": "已疫苗", "icon": "vaccines", "color": "green" },
            { "id": "neutered", "label": "已绝育", "icon": "healing", "color": "purple" }
        ],
        requirements: ['科学喂养防止肥胖', '充足的户外运动时间']
    },
    {
        name: '可乐',
        type: 'dog',
        breed: '柯基',
        age: '2岁',
        gender: 'male',
        weight: '11kg',
        description: '小短腿可乐，是一个十足的吃货。虽然腿短，但跑起来像个小电钻。它是邻里间的明星，大家都喜欢它的小电臀。',
        image_url: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?q=80&w=1974&auto=format&fit=crop',
        status: 'available',
        distance: '3.0 km',
        health_tags: [
            { "id": "vaccinated", "label": "已疫苗", "icon": "vaccines", "color": "green" }
        ],
        requirements: ['注意脊椎护理', '不予过于剧烈的爬楼梯运动']
    }
];

async function seed() {
    console.log('🌱 开始清理旧数据并插入全新宠物测试数据...');

    // 1. 删除现有所有宠物（慎用，仅限测试环境）
    const { error: deleteError } = await supabase.from('pets').delete().neq('id', '00000000-0000-0000-0000-000000000000');

    if (deleteError) {
        console.error('❌ 清理旧数据失败:', deleteError);
        // 如果是权限问题，可能无法删除，我们直接尝试插入
    }

    // 2. 插入新数据
    const { data, error } = await supabase.from('pets').insert(pets).select();

    if (error) {
        console.error('❌ 插入数据失败:', error);
        process.exit(1);
    } else {
        console.log(`✅ 成功插入 ${data.length} 只宠物数据！`);
        console.log('宠物列表:', data.map(p => `${p.name} (${p.breed})`).join(', '));
    }
}

seed();
