/**
 * Mock 宠物数据
 * NOTE: 后期可替换为 API 调用
 */

import type { Pet, Shelter } from '../types';

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
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDiPoSXxeAmwXX64LAmWPvtmvbsfYt9pj4A7VCK0PHqER2A6IYXJzEJL-RJIrohMNZzbv9Xsh8Y_d4XQKJ2WSwIOR7aYAgDdi2l94womrJXF6mjO5ohxKeOaffDenloX1VwOmsb4O28pNhmWSrhkqrwiYsrubq51rPF_NU0QuR37JCYVtUZxbacrm1qzqC55XdLkU8063LgiDL4YUxYMiEwxEBUxvaQnNIW4mnO4rhW5xe-dJn7wEOtmYv9VnzDG9h7RjEln6fEd4o',
        images: [
            'https://lh3.googleusercontent.com/aida-public/AB6AXuDDNgVh4DJGy5DBClF4Ko4pufTG4XNUn05LjLauMrm98gcAJmjpGVMXR9msmyEG0TICn_4U7Gy-j_Jal0wNDgH-QYkICKC7N57GlcC1h4eU7yB_7F38RQPAGmW5E3LD7deIBIhZI53RY9e8RwJgQwtedtbuyEe3iGu0VwSEYSsUsZqkFwHCAHLmcUFsIaBiPcgFwHT8vFg1B9qi03G0KfJBzgoSwunMUIrz-WTUHyK-bRx9RBiNOAxSjPZHGeg1v7NboIMVJ4Zia_s',
            'https://lh3.googleusercontent.com/aida-public/AB6AXuCuDOtM54eLmay-g12dbu3kb9bbFbZ2AXKuj02WdhAHIS0_dkBYK7UtyKkIZjM6O1m-RHjaMIOZBU-sySdHkl4IXP597-gpdESjhGttqBaZHi6TZV10sf5Yt0L4UDhc5DT4qlq8uVwAVYPZcSDdfyXHMWZ1nNVrjZIVHOK7VjmUtF5oAkcaJlPi5Q30gxxheGoYaJxMroDw3kjVnWF5UrKtEo1smIZgiIGvWi31iysURDNeJzyLdUocIt9wwdhxMlbuEqqsKee0Mns',
            'https://lh3.googleusercontent.com/aida-public/AB6AXuDG0WE_gwVQX5Pb_v5ICXS7qXsaxuGpBnR2EiAz2DAusFsOTeWR47eBFi5_o4xw1O9w6NISW6ye6O8q2n5BHNer1pgXmcFQMSxmrChOX3r39amp17kcsEwHRDv17ofYA9P4eM7OzTxQQNy5L1wOsF2KPHgoI5lnH8m9jzfLg4Lg2EBzOMt0eBnFuWL5cOVXGowaFsKUZEZ5Fp9n2hjbwbvhyhTdg4fTn7xduTTbxA_Bb0wBJ-Rdc71U9fuvxctJapokbNjrrGA7MIU',
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
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuClKKZ73rFT8yg9ktxhuLkoRWh5Yx8bJFEDXC_J25ykpKp2QhVzolTg1iSo8gznQ33e4-INvZm0mQuDgpq5KqrzAw28eieJrseZaed2y4zBdzYeK0ttDfftC-FbD1qN_YSuaJdoRnTjXK6L9b30yxHjebYnx7_i2YHtvMy27EULFjyK7Nr7UECBGZyYZnga4HZFyKvPoYgMc0_Cw2sIx9nELPogJJBi6aBKiZkCEUqvTACvFQFAT3QAW2OwSutv98zHumQRMnRtBXk',
    },
    {
        id: '3',
        name: '黛西',
        type: 'dog',
        breed: '寻回犬',
        age: '4月',
        gender: 'female',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6wkG4U1EoItUWIiHx3_Rf1uyQ7SKDjNu0qrAZjtNXNB48j3uLomQu_7w6m18z9UNve26gaFroDrWk6JPUw0c7UPOUEm4R94xUbeGtjoJoUMpHStL7eUX-Xq0LmeE3B2zSEsBEQSBEw-5bzdP7rw4MSp8WDzNTLFuT6J234t9-vWykzsG1xX90rLOQnaasJanYkb1lyLdE5kkHegy_78innrReH_MCLOKXtsYn6vAt_wEO_wQWef-IDyUPpKO1kdqDbHWuFDUDI1Q',
    },
    {
        id: '4',
        name: '麦克斯',
        type: 'dog',
        breed: '比格犬',
        age: '3岁',
        gender: 'male',
        distance: '1.2 km',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcTGe7DgGuf0M-EXwYaBjE-bKuZg53PVv4k82kSVPGyDG_rLS5DNezvFh5dtKXF1CbGewdoAQyLlKrb8Pd3q1BTqNrd634I67-1krfxex1i0FYl4YROkBtbJPzAJuNi1idIBMAV00JNDczEDapYjJolWcuwXR81D662tmv3GweRkbxApazU_Gwe7nmkAdk0y2LjAkQmXwJ2y_pw2OBTarfrqhFL7QXZIr-W1yUvzYLjNU9LIC16cjt4ynY3GGzupKJtYLZ9-HThzc',
    },
    {
        id: '5',
        name: '露娜',
        type: 'cat',
        breed: '暹罗猫',
        age: '1岁',
        gender: 'female',
        distance: '2.5 km',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7W_vs2Xe_HI4vs0hTdtKRbEnVm0gPK2cP2sO3n8V0z17uVTpwq3LPNfUngsgKKaM33XBZOiAxC8TlIgg1VWwvtXnUGLTnj_P3jRgG1j6YXLzsNx5-0_y4Ra8GqTJrhlfFzzV5rByq31xoJ-pf27eNPLvFxE5J3xe4CYsZ0CsraJA5Q7OJFWpMIADW5dDBU7VnlAr--BAZK7C0Iy6YD6sogAk4J-Nljbiug3x4WvWROJAqowckLKUsJyMRE162ig7jEiN22GBkwA8',
    },
    {
        id: '6',
        name: '贝拉',
        type: 'cat',
        breed: '英国短毛猫',
        age: '6个月',
        gender: 'female',
        distance: '0.8 km',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXtsLTHGz1r4YKI-YqhW7a1kGhYcRn73R9GMpsAjTB1rOEGplw33ZhGsnBvu5r57Skk1sEkZu3P6pSX2dZc0lkGxBinSFHZOgBZR2gPtUBEVYrsgCdHNpeB5iCrDwgjZR6PL7GTRM-jLKKwgfXr41-E1u4G9j2d9huqf3furWM7QbXgmqk8pB369y4JbBMhdff_Eeu4GJuIauJi9Pmli5puM8zU0vNaeGqsmc7T-o9vz7aR0_6rV6luTAAh_2Ym8mRnYS1s_fxxC4',
    },
    {
        id: '7',
        name: '洛基',
        type: 'dog',
        breed: '斗牛犬',
        age: '2岁',
        gender: 'male',
        distance: '4.2 km',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBl3toi0-lNTgAwXFR93fb-CIjYhxhMeJJ2TgAwZ1K5jnZ4adCOQULcLV19rrojSU_EaKkjB73RhDVqIDzKV53Y0pSWgg20lNQz17-6Ci5Hl-USeIBr2Ma7pxMDG9qjZNCK_qw1YyBHxbQwfv2L870WDGBIyzW5U1IEvqNZcTkotjHlKYGV7SJzXy9ppNAc1QgK4zpV0A-1AWncAEZEHvhxP2wo1p-GhDsNbYwTTKfJmBYvYsycYu8HaJ53U5_0k8k8nlYbpU753DI',
    },
];

/** 救助站数据 */
export const mockShelters: Shelter[] = [
    {
        id: 'shelter-1',
        name: '爪友救助站',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAiSZdcIx37MuXzrl8JtMk87Z_29AiywcYVWqjcHXsJSBqzuT-TOR9VKRWm5gbRdtvBLCCetC_7lr4SOj9Lc-KODx_Z-7pGTOhmVHiRp6DdGtBJybzNuAcj-2zALaZzsr9fLN4jUF0sPCE1G1XZ64kw7NAHsJaHIsI650WdycpSGCuKq_E0qAOLiEZNSydMySKJE3Bq-vUeIZiJF0tsJO5b1LDB1UYXsRtQySWDSQ5nW3esRnsLaQyE65p-jWV31NLc4iYho2T6-AA',
        verified: true,
        location: '上海市',
    },
    {
        id: 'shelter-2',
        name: '快乐爪爪救助站',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMjMgySDEP8OcmEfL0vs6qML5NYZsyRYy9SmUAd_iwRgEvOlYRokUcDwt-AAdoj5eb36sgG-XZ6q8FMcivrnc7hjvtJN_TndeJKGcyxEdAfcInRzGd-m2GAGiFjQRy4JPjn8soh1B2BpuRQhS5g6Edl7iUUhZcvN8VJW-ZLKncoGvz_Y_7RogLkl2kjxURIks1I3Bxg9Dh5IfCYaW6pPg5K0wPmnc44vF2pf6SaNmNRRBRZqin25j0OV6l9fAmPoLJVFLpzyYChBY',
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
