import React from 'react';

export interface AvatarProps {
    /** 图片 URL */
    src: string;
    /** 替代文字 */
    alt?: string;
    /** 尺寸 */
    size?: 'sm' | 'md' | 'lg' | 'xl';
    /** 是否显示边框 */
    bordered?: boolean;
    /** 是否显示在线状态 */
    online?: boolean;
    /** 点击事件 */
    onClick?: () => void;
}

/**
 * 头像组件
 * 支持多种尺寸和在线状态指示
 */
const Avatar: React.FC<AvatarProps> = ({
    src,
    alt = 'Avatar',
    size = 'md',
    bordered = false,
    online,
    onClick,
}) => {
    // 尺寸映射
    const sizeStyles = {
        sm: 'h-8 w-8',
        md: 'h-10 w-10',
        lg: 'h-12 w-12',
        xl: 'h-14 w-14',
    };

    // 在线指示器尺寸
    const dotSizes = {
        sm: 'h-2 w-2',
        md: 'h-2.5 w-2.5',
        lg: 'h-3 w-3',
        xl: 'h-3.5 w-3.5',
    };

    return (
        <div className="relative shrink-0">
            <div
                className={`
          ${sizeStyles[size]}
          rounded-full bg-cover bg-center bg-no-repeat
          ${bordered ? 'border-2 border-white dark:border-gray-700 shadow-sm' : ''}
          ${onClick ? 'cursor-pointer hover:opacity-90 transition-opacity' : ''}
        `}
                style={{ backgroundImage: `url('${src}')` }}
                onClick={onClick}
                role={onClick ? 'button' : undefined}
                aria-label={alt}
            />
            {online !== undefined && (
                <div
                    className={`
            absolute bottom-0 right-0 rounded-full border-2 border-white dark:border-[#19252b]
            ${dotSizes[size]}
            ${online ? 'bg-green-500' : 'bg-gray-400'}
          `}
                />
            )}
        </div>
    );
};

export default Avatar;
