/**
 * 宠物相关类型定义
 */

/** 宠物性别 */
export type PetGender = 'male' | 'female';

/** 宠物类型 */
export type PetType = 'dog' | 'cat' | 'other';

/** 宠物健康状态标签 */
export interface HealthTag {
  id: string;
  label: string;
  icon: string;
  color: 'green' | 'purple' | 'blue' | 'yellow' | 'red';
}

/** 宠物基础信息 */
export interface Pet {
  id: string;
  name: string;
  type: PetType;
  breed: string;
  age: string;
  gender: PetGender;
  weight?: string;
  imageUrl: string;
  images?: string[];
  distance?: string;
  description?: string;
  healthTags?: HealthTag[];
  requirements?: string[];
  restrictions?: string[];
  shelterId?: string;
  createdAt?: string;
}

/** 救助站信息 */
export interface Shelter {
  id: string;
  name: string;
  avatar: string;
  verified: boolean;
  location?: string;
}

/** 领养申请状态 */
export type ApplicationStatus = 'pending' | 'reviewing' | 'approved' | 'rejected';

/** 领养申请 */
export interface AdoptionApplication {
  id: string;
  petId: string;
  userId: string;
  status: ApplicationStatus;
  step: number;
  personalInfo?: {
    name: string;
    phone: string;
    email: string;
  };
  livingInfo?: {
    residenceType: 'apartment' | 'house';
    experience: string;
    reason: string;
  };
  agreedToTerms: boolean;
  createdAt: string;
  updatedAt: string;
}
