/**
 * 论坛帖子相关类型定义
 */

/** 帖子类型 */
export type PostType = 'rescue' | 'adopt' | 'lost' | 'found' | 'other';

/** 帖子紧急程度 */
export type PostUrgency = 'normal' | 'urgent';

/** 论坛帖子 */
export interface Post {
    id: string;
    authorId: string;
    author: PostAuthor;
    type: PostType;
    urgency: PostUrgency;
    title: string;
    content: string;
    images: string[];
    location: {
        city: string;
        district: string;
    };
    likes: number;
    comments: number;
    createdAt: string;
}

/** 帖子作者信息 */
export interface PostAuthor {
    id: string;
    name: string;
    avatar: string;
    verified: boolean;
}
