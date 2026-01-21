import { Post } from '../types/post';

export const mockPosts: Post[] = [
    {
        id: 'post-1',
        authorId: 'user-1',
        author: {
            id: 'user-1',
            name: '张晓明',
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuTQm6GAkVfJmtgOCn2l0NEb2BdyTsEHOyM58L1TJ4pgkfTkq-0BxvGQoswNrKqR8IC1z6vSH5WWS6rZOP_hCEPWevHThs6VxBoV8ywFyjdxJ8gQGZqh9F-69DTov9FJBn93VjW-pnw3_U0TyGcsnrbLnNWZfAbUlEJ6sTEXaUnnggsxxoVT9b3b61eLbNXnjtQCwK-J02dZ664oGcXB5kC-d4ZlOQXriInqZd1W8VnGs2oEOjYx7N0zKSFlOtblH1veDiW8W0j3E',
            verified: true,
        },
        type: 'rescue',
        urgency: 'urgent',
        title: '紧急求助：在大悦城附近发现流浪小猫',
        content: '小猫看起来很虚弱，左腿似乎受伤了，但我家里有大狗无法暂时收养。急需好心人或者救助机构接手... 其实它非常亲人，只是目前状态不太好。希望能尽快找到避风港。',
        images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuBRlYbAw2_ehMSsH7qtvMOl_Vi87Lxs_jrL2K5M9MfH9_rpFIPoOfOrrIjMeXvrQFbq_zCRoPExCWpq-uBseIaZxhCTdHdyaMvZKDuL8uB_IUCuccLAV89gHOVrQ3zrFXDqyHNYGRDnMz1bPMkhRs3NbxQK1O9jj8HYtvECjbumbVLbXNp2aIPYJG9sd5yxQezvs38_B7BwUJG2czO4NEnxqIuBx_qOPLfLKhrlWhSi04GzyEs1g0jo39T08Yp0XzbEabGub9zgv4g'],
        location: {
            city: '北京市',
            district: '朝阳区',
        },
        likes: 24,
        comments: 12,
        createdAt: '2小时前',
    },
    {
        id: 'post-2',
        authorId: 'user-2',
        author: {
            id: 'user-2',
            name: 'Sarah Lee',
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAE2GbrFxGu6gp8BftJAxmflTWNvv8Ue_yzYZTIDLj7WJxfqpeDbQPCPWzvqYeiHY6o0nzMOmxW8nZqmZZLDhpOwizQjXYDFG6Qg15EzlS-RL8KdCP7KT_AkMYA0JYgrMDWjDUQrFxCmoQ1LKdtUyRdSQ9IeBiTWUdgWYpUZqElcQNpqAukpqFq3ieH8Cefkwj7TOsXEPxht4S4I699jFTWRfz_KbzLR1KJe2fcG8wC_Nuuw8hPAYbEUVXPkuxND4jW02vjFw23REY',
            verified: false,
        },
        type: 'adopt',
        urgency: 'normal',
        title: '寻找领养：两岁金毛寻找新家',
        content: '因为工作调动无法继续照顾，性格非常温顺，已绝育，希望能找到一个爱它的家庭。疫苗齐全，非常听话。',
        images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuCMrtLO_liWeXzv0MR8zvYqVD-7fkKMF3v17CcylTSJesM-DBcOQ1oCYOVss5MODp2J5zKXBvdo28o195YQRF64-em3OzwyDJUZN8qDL7Itik_KYLPD4ibhsGgZdvXbFxFvKS3TJxuC4vIdd556d1FUTiRObG2PzHNbMwQfJdFZvCqTNYjh4TnrrYe9z-lQRw1bs7XDRp9QHoXQBrLFUFRvMrZRcdQoVTNst_pB9sOCNPp9AzE3elFdubeIBR7FelbY-G4qJQW0h-M'],
        location: {
            city: '上海市',
            district: '静安区',
        },
        likes: 45,
        comments: 28,
        createdAt: '5小时前',
    },
];
