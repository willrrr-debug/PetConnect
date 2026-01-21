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

export const mockProfiles: Profile[] = [
    {
        id: 'user-1',
        name: '张晓明',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuTQm6GAkVfJmtgOCn2l0NEb2BdyTsEHOyM58L1TJ4pgkfTkq-0BxvGQoswNrKqR8IC1z6vSH5WWS6rZOP_hCEPWevHThs6VxBoV8ywFyjdxJ8gQGZqh9F-69DTov9FJBn93VjW-pnw3_U0TyGcsnrbLnNWZfAbUlEJ6sTEXaUnnggsxxoVT9b3b61eLbNXnjtQCwK-J02dZ664oGcXB5kC-d4ZlOQXriInqZd1W8VnGs2oEOjYx7N0zKSFlOtblH1veDiW8W0j3E',
        verified: true,
    },
    {
        id: 'user-2',
        name: 'Sarah Lee',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAE2GbrFxGu6gp8BftJAxmflTWNvv8Ue_yzYZTIDLj7WJxfqpeDbQPCPWzvqYeiHY6o0nzMOmxW8nZqmZZLDhpOwizQjXYDFG6Qg15EzlS-RL8KdCP7KT_AkMYA0JYgrMDWjDUQrFxCmoQ1LKdtUyRdSQ9IeBiTWUdgWYpUZqElcQNpqAukpqFq3ieH8Cefkwj7TOsXEPxht4S4I699jFTWRfz_KbzLR1KJe2fcG8wC_Nuuw8hPAYbEUVXPkuxND4jW02vjFw23REY',
        verified: false,
    },
    {
        id: 'shelter-1',
        name: '爪友救助站',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAiSZdcIx37MuXzrl8JtMk87Z_29AiywcYVWqjcHXsJSBqzuT-TOR9VKRWm5gbRdtvBLCCetC_7lr4SOj9Lc-KODx_Z-7pGTOhmVHiRp6DdGtBJybzNuAcj-2zALaZzsr9fLN4jUF0sPCE1G1XZ64kw7NAHsJaHIsI650WdycpSGCuKq_E0qAOLiEZNSydMySKJE3Bq-vUeIZiJF0tsJO5b1LDB1UYXsRtQySWDSQ5nW3esRnsLaQyE65p-jWV31NLc4iYho2T6-AA',
        verified: true,
    }
];
