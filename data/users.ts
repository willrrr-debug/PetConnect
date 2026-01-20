/**
 * Mock 用户数据
 */

import type { User } from '../types';

/** 当前用户（模拟已登录状态） */
export const mockCurrentUser: User = {
    id: 'user-1',
    name: 'Sarah Jenkins',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5vLJ1OukI1OOSo8_LttlcZX5TjojtbZORPDBx6pG4xwoDQd3RbyxS972wzKw8epwV5tpPst1PmTkAwpSkx_C3FhzDMYecJ67W_MCs9krFjOkrfJHvfsh0OqmyhY-_gMB2F0Z73z2uihz0dJhwXYDJcHdxqxdYR-S2vuvtAGVBpK3GJlgXM90WI3G-Gc1lugWPwh8IRYrW1lVyoIkffQFUICC-gw_Jj9BfUpurP9aSKNmKmtYoCazxup-k2kgrzSyIeG4mV6Dnbf0',
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
