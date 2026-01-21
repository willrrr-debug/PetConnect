/**
 * Mock 用户数据
 */

export interface Profile {
    id: string;
    name: string;
    avatar: string;
    verified: boolean;
    email?: string;
    phone?: string;
    role?: string;
    stats?: {
        adoptions: number;
        favorites: number;
        following: number;
    };
}

/** 当前用户（模拟已登录状态） */
export const mockCurrentUser: Profile = {
    id: 'user-1',
    name: 'Sarah Jenkins',
    avatar: 'https://images.weserv.nl/?url=images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop',
    email: 'sarah@example.com',
    phone: '138 0000 0000',
    verified: true,
    role: 'adopter',
    stats: {
        adoptions: 1,
        favorites: 14,
        following: 5,
    },
};

export const mockProfiles: Profile[] = [
    {
        id: 'user-1',
        name: '张晓明',
        avatar: 'https://images.weserv.nl/?url=images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&h=200&fit=crop',
        verified: true,
    },
    {
        id: 'user-2',
        name: 'Sarah Lee',
        avatar: 'https://images.weserv.nl/?url=images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
        verified: false,
    },
    {
        id: 'shelter-1',
        name: '爪友救助站',
        avatar: 'https://images.weserv.nl/?url=images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=200&h=200&fit=crop',
        verified: true,
    }
];
