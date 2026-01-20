/**
 * 数据库类型定义
 * 与 Supabase 数据库表结构对应
 */

export interface Database {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string;
                    name: string;
                    avatar_url: string | null;
                    phone: string | null;
                    verified: boolean;
                    created_at: string;
                };
                Insert: {
                    id: string;
                    name: string;
                    avatar_url?: string | null;
                    phone?: string | null;
                    verified?: boolean;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    name?: string;
                    avatar_url?: string | null;
                    phone?: string | null;
                    verified?: boolean;
                    created_at?: string;
                };
            };
            pets: {
                Row: {
                    id: string;
                    name: string;
                    type: 'dog' | 'cat' | 'other';
                    breed: string;
                    age: string;
                    gender: 'male' | 'female';
                    weight: string | null;
                    description: string | null;
                    image_url: string;
                    images: string[] | null;
                    distance: string | null;
                    shelter_id: string | null;
                    health_tags: HealthTag[] | null;
                    requirements: string[] | null;
                    restrictions: string[] | null;
                    status: 'available' | 'adopted' | 'pending';
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    name: string;
                    type: 'dog' | 'cat' | 'other';
                    breed: string;
                    age: string;
                    gender: 'male' | 'female';
                    weight?: string | null;
                    description?: string | null;
                    image_url: string;
                    images?: string[] | null;
                    distance?: string | null;
                    shelter_id?: string | null;
                    health_tags?: HealthTag[] | null;
                    requirements?: string[] | null;
                    restrictions?: string[] | null;
                    status?: 'available' | 'adopted' | 'pending';
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    name?: string;
                    type?: 'dog' | 'cat' | 'other';
                    breed?: string;
                    age?: string;
                    gender?: 'male' | 'female';
                    weight?: string | null;
                    description?: string | null;
                    image_url?: string;
                    images?: string[] | null;
                    distance?: string | null;
                    shelter_id?: string | null;
                    health_tags?: HealthTag[] | null;
                    requirements?: string[] | null;
                    restrictions?: string[] | null;
                    status?: 'available' | 'adopted' | 'pending';
                    created_at?: string;
                };
            };
            shelters: {
                Row: {
                    id: string;
                    name: string;
                    avatar_url: string | null;
                    verified: boolean;
                    location: string | null;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    name: string;
                    avatar_url?: string | null;
                    verified?: boolean;
                    location?: string | null;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    name?: string;
                    avatar_url?: string | null;
                    verified?: boolean;
                    location?: string | null;
                    created_at?: string;
                };
            };
            favorites: {
                Row: {
                    id: string;
                    user_id: string;
                    pet_id: string;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    user_id: string;
                    pet_id: string;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    user_id?: string;
                    pet_id?: string;
                    created_at?: string;
                };
            };
            applications: {
                Row: {
                    id: string;
                    user_id: string;
                    pet_id: string;
                    status: 'pending' | 'reviewing' | 'approved' | 'rejected';
                    personal_info: PersonalInfo | null;
                    living_info: LivingInfo | null;
                    agreed_to_terms: boolean;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    user_id: string;
                    pet_id: string;
                    status?: 'pending' | 'reviewing' | 'approved' | 'rejected';
                    personal_info?: PersonalInfo | null;
                    living_info?: LivingInfo | null;
                    agreed_to_terms?: boolean;
                    created_at?: string;
                    updated_at?: string;
                };
                Update: {
                    id?: string;
                    user_id?: string;
                    pet_id?: string;
                    status?: 'pending' | 'reviewing' | 'approved' | 'rejected';
                    personal_info?: PersonalInfo | null;
                    living_info?: LivingInfo | null;
                    agreed_to_terms?: boolean;
                    created_at?: string;
                    updated_at?: string;
                };
            };
            messages: {
                Row: {
                    id: string;
                    conversation_id: string;
                    sender_id: string | null;
                    content: string;
                    type: 'text' | 'image' | 'system';
                    read: boolean;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    conversation_id: string;
                    sender_id?: string | null;
                    content: string;
                    type?: 'text' | 'image' | 'system';
                    read?: boolean;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    conversation_id?: string;
                    sender_id?: string | null;
                    content?: string;
                    type?: 'text' | 'image' | 'system';
                    read?: boolean;
                    created_at?: string;
                };
            };
        };
    };
}

// 辅助类型
interface HealthTag {
    id: string;
    label: string;
    icon: string;
    color: 'green' | 'purple' | 'blue' | 'yellow' | 'red';
}

interface PersonalInfo {
    name: string;
    phone: string;
    email: string;
}

interface LivingInfo {
    residenceType: 'apartment' | 'house';
    experience: string;
    reason: string;
}
