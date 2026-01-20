import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    /** 标签文字 */
    label?: string;
    /** 左侧图标 */
    icon?: string;
    /** 错误信息 */
    error?: string;
    /** 辅助文字 */
    helperText?: string;
}

/**
 * 通用输入框组件
 * 支持标签、图标、错误提示
 */
const Input: React.FC<InputProps> = ({
    label,
    icon,
    error,
    helperText,
    className = '',
    ...props
}) => {
    return (
        <div className="flex flex-col w-full">
            {label && (
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 pl-1">
                    {label}
                </label>
            )}
            <div className="relative group">
                {icon && (
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <span className={`material-symbols-outlined text-[22px] transition-colors ${error ? 'text-red-500' : 'text-gray-400 group-focus-within:text-primary'}`}>
                            {icon}
                        </span>
                    </div>
                )}
                <input
                    className={`
            block w-full py-4 
            ${icon ? 'pl-12 pr-4' : 'px-4'}
            bg-gray-50 dark:bg-[#1c2e36] 
            border-none rounded-2xl 
            text-text-main dark:text-white font-bold 
            placeholder-gray-400 
            focus:ring-2 focus:ring-primary/20 focus:bg-white dark:focus:bg-[#1c2e36] 
            transition-all shadow-sm
            ${error ? 'ring-2 ring-red-500/50' : ''}
            ${className}
          `}
                    {...props}
                />
            </div>
            {error && (
                <p className="mt-1.5 pl-1 text-xs text-red-500 font-medium flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">error</span>
                    {error}
                </p>
            )}
            {helperText && !error && (
                <p className="mt-1.5 pl-1 text-xs text-gray-400">{helperText}</p>
            )}
        </div>
    );
};

export default Input;
