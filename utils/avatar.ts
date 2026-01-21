/**
 * 头像处理工具函数
 */

// 预设的一组可爱动物头像 (使用 Unsplash 稳定 ID)
// 包含：猫、狗、兔子、熊猫、小狐狸、考拉、仓鼠、企鹅、小鹿、老虎
const ANIMAL_PHOTO_IDS = [
    '1514888286974-6c03e2ca1dba', // Cat
    '1543466835-00a7907e9de1', // Dog
    '1585110396000-c9fa40782d5a', // Rabbit
    '1521111998-d20dcf162f4b', // Panda
    '1474511320721-9a4ee2995ada', // Fox
    '1501159596142-f2ad0edc91ad', // Koala
    '1435055833403-24730ee35c7c', // Hamster
    '1550929940-84ca969bd37c', // Penguin
    '1516467508483-a7212febe31a', // Deer
    '1564349683136-77e08914812a'  // Tiger
];

/**
 * 获取代理后的图片地址，增加国内访问稳定性
 */
const getMirroredUrl = (url: string) => {
    if (!url) return '';
    // 使用 weserv.nl 作为镜像代理，国内访问相对稳定
    return `https://images.weserv.nl/?url=${encodeURIComponent(url.replace(/^https?:\/\//, ''))}&w=200&h=200&fit=crop`;
};

/**
 * 获取用户头像 URL
 * 如果用户没有上传头像，则根据其 ID 随机分配一个可爱的动物头像
 * 
 * @param userId 用户 ID
 * @param avatarUrl 原始头像 URL
 * @returns 最终显示的头像 URL
 */
export const getAvatarUrl = (userId?: string, avatarUrl?: string | null): string => {
    // 1. 如果有有效的自定义头像，使用它（通过代理确保稳定性）
    if (avatarUrl && avatarUrl.startsWith('http')) {
        // 排除掉可能无法查看到的 Google 头像链接
        if (!avatarUrl.includes('googleusercontent.com')) {
            return getMirroredUrl(avatarUrl);
        }
    }

    // 2. 如果没有头像或头像是 Google 链接，根据 userId 分配动物头像
    // 默认种子避免 userId 为空
    const seed = userId || 'anonymous-' + Math.floor(Math.random() * 1000);

    // 基于 seed 的简单哈希算法
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
        hash = seed.charCodeAt(i) + ((hash << 5) - hash);
    }

    const index = Math.abs(hash) % ANIMAL_PHOTO_IDS.length;
    const photoId = ANIMAL_PHOTO_IDS[index];

    return getMirroredUrl(`https://images.unsplash.com/photo-${photoId}`);
};
