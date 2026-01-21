import React from 'react';

export interface TagProps {
    /** 标签文字 */
    label: string;
    /** 图标 */
    icon?: string;
    /** 颜色主题 */
    color?: 'green' | 'purple' | 'blue' | 'yellow' | 'red' | 'gray' | 'orange';
    /** 尺寸 */
    size?: 'sm' | 'md';
}

/**
 * 标签组件
 * 用于显示状态、分类等信息
 */
const Tag: React.FC<TagProps> = ({
    label,
    icon,
    color = 'gray',
    size = 'md',
}) => {
    // 颜色映射
    const colorStyles = {
        green: 'bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-900/30 text-green-700 dark:text-green-400',
        purple: 'bg-purple-50 dark:bg-purple-900/20 border-purple-100 dark:border-purple-900/30 text-purple-700 dark:text-purple-400',
        blue: 'bg-orange-50 dark:bg-orange-900/20 border-orange-100 dark:border-orange-900/30 text-orange-700 dark:text-orange-400',
        orange: 'bg-orange-50 dark:bg-orange-900/20 border-orange-100 dark:border-orange-900/30 text-orange-700 dark:text-orange-400',
        yellow: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-100 dark:border-yellow-900/30 text-yellow-700 dark:text-yellow-400',
        red: 'bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-900/30 text-red-700 dark:text-red-400',
        gray: 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400',
    };

    // 尺寸映射
    const sizeStyles = {
        sm: 'pl-1.5 pr-2 py-0.5 text-xs',
        md: 'pl-2 pr-3 py-1.5 text-sm',
    };

    const iconSizes = {
        sm: 'text-[14px]',
        md: 'text-[18px]',
    };

    return (
        <span
            className={`
        inline-flex items-center gap-1.5 rounded-lg border font-semibold
        ${colorStyles[color]}
        ${sizeStyles[size]}
      `}
        >
            {icon && (
                <span className={`material-symbols-outlined ${iconSizes[size]}`}>
                    {icon}
                </span>
            )}
            {label}
        </span>
    );
};

export default Tag;
