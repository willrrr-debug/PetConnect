import React, { ReactNode } from 'react';

interface MobileLayoutProps {
    children: ReactNode;
}

/**
 * 手机预览布局组件
 * 在桌面浏览器中模拟手机屏幕尺寸
 */
const MobileLayout: React.FC<MobileLayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-slate-200 dark:bg-slate-950 flex justify-center overflow-x-hidden">
            {/* 手机屏幕模拟容器 */}
            <div
                className="
                    relative 
                    w-full 
                    max-w-[430px] 
                    min-h-screen 
                    bg-background-light 
                    dark:bg-background-dark
                    shadow-2xl
                    flex
                    flex-col
                "
            >
                {/* 滚动内容区域 */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default MobileLayout;
