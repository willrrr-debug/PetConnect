import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** 按钮变体 */
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    /** 按钮尺寸 */
    size?: 'sm' | 'md' | 'lg';
    /** 是否占满宽度 */
    fullWidth?: boolean;
    /** 图标（左侧） */
    icon?: string;
    /** 图标（右侧） */
    iconRight?: string;
    /** 加载状态 */
    loading?: boolean;
    children: React.ReactNode;
}

/**
 * 通用按钮组件
 * 支持多种变体、尺寸和状态
 */
const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    icon,
    iconRight,
    loading = false,
    disabled,
    className = '',
    children,
    ...props
}) => {
    // 基础样式
    const baseStyles = 'inline-flex items-center justify-center gap-2 font-bold rounded-xl transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed';

    // 变体样式
    const variantStyles = {
        primary: 'bg-primary hover:bg-[#2b8fd9] text-white shadow-lg shadow-primary/25',
        secondary: 'bg-secondary hover:bg-[#e88a5a] text-white shadow-lg shadow-secondary/25',
        outline: 'border-2 border-gray-200 dark:border-gray-700 bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800 text-text-main dark:text-white',
        ghost: 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-text-main dark:text-white',
        danger: 'bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/25',
    };

    // 尺寸样式
    const sizeStyles = {
        sm: 'h-9 px-4 text-sm',
        md: 'h-12 px-6 text-base',
        lg: 'h-14 px-8 text-lg',
    };

    // 图标尺寸
    const iconSizes = {
        sm: 'text-[16px]',
        md: 'text-[20px]',
        lg: 'text-[24px]',
    };

    return (
        <button
            className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? (
                <span className={`material-symbols-outlined animate-spin ${iconSizes[size]}`}>
                    progress_activity
                </span>
            ) : icon ? (
                <span className={`material-symbols-outlined ${iconSizes[size]}`}>{icon}</span>
            ) : null}
            {children}
            {iconRight && !loading && (
                <span className={`material-symbols-outlined ${iconSizes[size]}`}>{iconRight}</span>
            )}
        </button>
    );
};

export default Button;
