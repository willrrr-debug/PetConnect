import React, { type ReactNode } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, PawPrint, FileCheck, LogOut, Settings } from 'lucide-react';

interface NavItemProps {
    to: string;
    icon: React.ElementType;
    children: ReactNode;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon: Icon, children }) => (
    <NavLink
        to={to}
        className={({ isActive }) =>
            `flex items-center gap-3 px-6 py-4 rounded-2xl transition-all ${isActive
                ? 'bg-primary text-white shadow-lg shadow-primary/30 font-bold'
                : 'text-text-muted hover:bg-gray-100 dark:hover:bg-gray-800'
            }`
        }
    >
        {({ isActive }) => (
            <>
                <div className="relative">
                    <Icon size={20} />
                    {isActive && <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-1 bg-white rounded-full shadow-sm"></div>}
                </div>
                <span>{children}</span>
            </>
        )}
    </NavLink>
);

const AdminLayout: React.FC = () => {
    return (
        <div className="flex h-screen bg-background-light dark:bg-background-dark overflow-hidden font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-white dark:bg-card-dark border-r border-gray-100 dark:border-gray-800 flex flex-col p-4">
                <div className="flex items-center gap-3 px-4 py-6 mb-4">
                    <div className="bg-primary p-2 rounded-xl">
                        <PawPrint className="text-white" size={24} />
                    </div>
                    <h1 className="text-xl font-black tracking-tight text-text-main dark:text-white">
                        PetConnect <span className="text-primary">Admin</span>
                    </h1>
                </div>

                <nav className="flex-1 flex flex-col gap-2">
                    <NavItem to="/" icon={LayoutDashboard}>仪表盘</NavItem>
                    <NavItem to="/pets" icon={PawPrint}>宠物管理</NavItem>
                    <NavItem to="/approvals" icon={FileCheck}>领养审批</NavItem>
                </nav>

                <div className="mt-auto border-t border-gray-100 dark:border-gray-800 pt-4 flex flex-col gap-2">
                    <NavItem to="/settings" icon={Settings}>系统设置</NavItem>
                    <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all font-medium">
                        <LogOut size={20} />
                        退出登录
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden">
                <header className="h-16 bg-white dark:bg-card-dark border-b border-gray-100 dark:border-gray-800 flex items-center justify-between px-8">
                    <div className="text-sm font-medium text-text-muted">
                        欢迎回来, <span className="text-text-main dark:text-white">管理员</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="relative h-8 w-8 rounded-full overflow-hidden bg-gray-200">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin" alt="avatar" />
                        </button>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-8 no-scrollbar">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
