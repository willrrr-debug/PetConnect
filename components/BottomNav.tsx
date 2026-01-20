import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getIconClass = (path: string) => {
    return location.pathname === path ? "material-symbols-outlined text-[26px] filled" : "material-symbols-outlined text-[26px]";
  };

  const getTextClass = (path: string) => {
    return location.pathname === path ? "text-[10px] font-bold text-primary" : "text-[10px] font-medium text-text-muted dark:text-gray-500";
  };

  const getContainerClass = (path: string) => {
    return location.pathname === path ? "text-primary" : "text-text-muted hover:text-primary dark:text-gray-500 dark:hover:text-gray-300";
  };

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50 flex h-20 items-center justify-around bg-surface-light dark:bg-card-dark pb-safe border-t border-gray-100 dark:border-gray-800 shadow-[0_-4px_20px_-2px_rgba(0,0,0,0.05)] px-4">
      <button
        onClick={() => navigate('/home')}
        className={`flex flex-col items-center gap-1 p-2 ${getContainerClass('/home')}`}
      >
        <span className={getIconClass('/home')}>home</span>
        <span className={getTextClass('/home')}>首页</span>
      </button>
      <button
        onClick={() => navigate('/forum')}
        className={`flex flex-col items-center gap-1 p-2 ${getContainerClass('/forum')}`}
      >
        <span className={getIconClass('/forum')}>forum</span>
        <span className={getTextClass('/forum')}>论坛</span>
      </button>
      <button
        onClick={() => navigate('/profile')}
        className={`flex flex-col items-center gap-1 p-2 ${getContainerClass('/profile')}`}
      >
        <span className={getIconClass('/profile')}>person</span>
        <span className={getTextClass('/profile')}>我的</span>
      </button>
    </nav>
  );
};

export default BottomNav;