/**
 * Mock 宠物数据
 * NOTE: 后期可替换为 API 调用
 */

import type { Pet, Shelter } from '../types';

// 预加载图片资源，确保会被 Vite 打包和哈希
// 预加载图片资源 (已注释，因本地文件缺失，改用占位图)
/*
import pet1Main from '../assets/images/pets/1-main.jpg';
import pet1G1 from '../assets/images/pets/1-gallery-1.jpg';
import pet1G2 from '../assets/images/pets/1-gallery-2.jpg';
import pet1G3 from '../assets/images/pets/1-gallery-3.jpg';
import pet2Main from '../assets/images/pets/2-main.jpg';
import pet3Main from '../assets/images/pets/3-main.jpg';
import pet4Main from '../assets/images/pets/4-main.jpg';
import pet5Main from '../assets/images/pets/5-main.jpg';
import pet6Main from '../assets/images/pets/6-main.jpg';
import pet7Main from '../assets/images/pets/7-main.jpg';

import shelter1Img from '../assets/images/shelters/shelter-1.jpg';
import shelter2Img from '../assets/images/shelters/shelter-2.jpg';
*/

const pet1Main = 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80';
const pet1G1 = pet1Main;
const pet1G2 = pet1Main;
const pet1G3 = pet1Main;
const pet2Main = 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80';
const pet3Main = 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80';
const pet4Main = pet3Main;
const pet5Main = 'https://images.unsplash.com/photo-1513245543132-31f507417b26?auto=format&fit=crop&w=800&q=80';
const pet6Main = 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=800&q=80';
const pet7Main = 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=800&q=80';
const shelter1Img = 'https://via.placeholder.com/150';
const shelter2Img = 'https://via.placeholder.com/150';

/** 宠物列表数据 */
export const mockPets: Pet[] = [
    {
        id: '1',
        name: '巴弟',
        type: 'dog',
        breed: '金毛',
        age: '2岁',
        gender: 'male',
        weight: '65磅',
        imageUrl: pet1Main,
        images: [
            pet1G1,
            pet1G2,
            pet1G3,
        ],
        distance: '2英里',
        description: '巴弟是个快乐的小家伙，喜欢长距离散步和肚皮按摩。他被发现流浪，但在我们的寄养团队中适应得很好。他已经学会了"坐下"，而且非常讨人喜欢！他有一颗金子般的心，正在寻找一个能让他成为焦点的永远的家。',
        healthTags: [
            { id: '1', label: '已接种疫苗', icon: 'vaccines', color: 'green' },
            { id: '2', label: '已绝育', icon: 'medical_services', color: 'purple' },
            { id: '3', label: '性格友好', icon: 'pets', color: 'orange' },
            { id: '4', label: '已训练', icon: 'home', color: 'yellow' },
        ],
        requirements: ['需要积极的生活方式（每日跑步）', '与其他狗狗相处融洽'],
        restrictions: ['家庭中不能有猫'],
        shelterId: 'shelter-1',
    },
    {
        id: '2',
        name: '米斯蒂',
        type: 'cat',
        breed: '虎斑',
        age: '8月',
        gender: 'female',
        imageUrl: pet2Main,
    },
    {
        id: '3',
        name: '黛西',
        type: 'dog',
        breed: '寻回犬',
        age: '4月',
        gender: 'female',
        imageUrl: pet3Main,
    },
    {
        id: '4',
        name: '麦克斯',
        type: 'dog',
        breed: '比格犬',
        age: '3岁',
        gender: 'male',
        distance: '1.2 km',
        imageUrl: pet4Main,
    },
    {
        id: '5',
        name: '露娜',
        type: 'cat',
        breed: '暹罗猫',
        age: '1岁',
        gender: 'female',
        distance: '2.5 km',
        imageUrl: pet5Main,
    },
    {
        id: '6',
        name: '贝拉',
        type: 'cat',
        breed: '英国短毛猫',
        age: '6个月',
        gender: 'female',
        distance: '0.8 km',
        imageUrl: pet6Main,
    },
    {
        id: '7',
        name: '洛基',
        type: 'dog',
        breed: '斗牛犬',
        age: '2岁',
        gender: 'male',
        distance: '4.2 km',
        imageUrl: pet7Main,
    },
];

/** 救助站数据 */
export const mockShelters: Shelter[] = [
    {
        id: 'shelter-1',
        name: '爪友救助站',
        avatar: shelter1Img,
        verified: true,
        location: '上海市',
    },
    {
        id: 'shelter-2',
        name: '快乐爪爪救助站',
        avatar: shelter2Img,
        verified: true,
        location: '上海市',
    },
];

/** 根据 ID 获取宠物 */
export const getPetById = (id: string): Pet | undefined => {
    return mockPets.find((pet) => pet.id === id);
};

/** 根据类型筛选宠物 */
export const getPetsByType = (type: Pet['type'] | 'all'): Pet[] => {
    if (type === 'all') return mockPets;
    return mockPets.filter((pet) => pet.type === type);
};

/** 获取救助站信息 */
export const getShelterById = (id: string): Shelter | undefined => {
    return mockShelters.find((shelter) => shelter.id === id);
};
