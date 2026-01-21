import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/home', icon: 'home', label: '首页' },
    { path: '/forum', icon: 'forum', label: '论坛' },
    { path: '/profile', icon: 'person', label: '我的' },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50 px-4 pb-3">
      {/* 毛玻璃导航容器 */}
      <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-white/20 dark:border-gray-700/20 overflow-hidden">

        <div className="flex items-center justify-around px-2 py-2">
          {navItems.map((item) => {
            const active = isActive(item.path);

            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`
                  relative flex flex-col items-center gap-1 px-5 py-1.5 rounded-2xl
                  transition-all duration-300 ease-out
                  ${active
                    ? 'scale-105'
                    : 'hover:scale-105 active:scale-95'
                  }
                `}
              >
                {/* 激活状态的渐变背景 */}
                {active && (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FFB8A3] to-[#FF9671] rounded-2xl opacity-100 animate-fadeIn" />
                )}

                {/* 图标容器 */}
                <div className="relative z-10 flex items-center justify-center">
                  <span
                    className={`
                      material-symbols-outlined text-[24px] transition-all duration-300
                      ${active
                        ? 'filled text-white drop-shadow-sm'
                        : 'text-[#4A3728]/60 dark:text-gray-400'
                      }
                    `}
                  >
                    {item.icon}
                  </span>
                </div>

                {/* 文字标签 */}
                <span
                  className={`
                    relative z-10 text-[10px] font-semibold transition-all duration-300
                    ${active
                      ? 'text-white'
                      : 'text-[#4A3728]/60 dark:text-gray-400'
                    }
                  `}
                >
                  {item.label}
                </span>

                {/* 激活状态的光晕效果 */}
                {active && (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FFB8A3] to-[#FF9671] rounded-2xl blur-xl opacity-30 -z-10" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;