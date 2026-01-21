import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { AppProvider } from './context';
import MobileLayout from './components/MobileLayout';
import BottomNav from './components/BottomNav';
import OnboardingScreen from './screens/OnboardingScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import ForumScreen from './screens/ForumScreen';
import ProfileScreen from './screens/ProfileScreen';
import PetDetailScreen from './screens/PetDetailScreen';
import PostDetailScreen from './screens/PostDetailScreen';
import ApplicationScreen from './screens/ApplicationScreen';
import MessageCenterScreen from './screens/MessageCenterScreen';
import ChatScreen from './screens/ChatScreen';
import CreatePostScreen from './screens/CreatePostScreen';
import SearchScreen from './screens/SearchScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import MyApplicationsScreen from './screens/MyApplicationsScreen';
import PetListScreen from './screens/PetListScreen';
import AddPetScreen from './screens/AddPetScreen';
import SettingsScreen from './screens/SettingsScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import ShelterVisitScreen from './screens/ShelterVisitScreen';
import HelpCenterScreen from './screens/HelpCenterScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';

import { useApp } from './context/AppContext';

const AppContent: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, initialized } = useApp();

  const publicPaths = ['/', '/login', '/register', '/reset-password'];
  const isPublicPath = publicPaths.includes(location.pathname);

  // 路由守卫：只在确定未登录时才重定向，避免拦截正在登录的用户
  const shouldBlockAccess = React.useMemo(() => {
    // 如果还在初始化，不阻止（避免闪烁）
    if (!initialized) return false;
    // 如果是公开路径，不阻止
    if (isPublicPath) return false;
    // 如果已认证，不阻止
    if (isAuthenticated) return false;
    // 只有明确未认证且已初始化时，才阻止访问
    return true;
  }, [initialized, isAuthenticated, isPublicPath]);

  // 已登录用户访问公开页面（登录/注册）时，自动跳转到首页
  React.useEffect(() => {
    if (initialized && isAuthenticated && isPublicPath && location.pathname !== '/') {
      // 这里的 100ms 延迟是为了给 context 状态同步一点缓冲区，防止极速跳转导致的组件渲染冲突
      const timer = setTimeout(() => {
        navigate('/home', { replace: true });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [initialized, isAuthenticated, isPublicPath, location.pathname, navigate]);

  // 如果未初始化，显示加载占位（可选）
  if (!initialized) {
    return (
      <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (shouldBlockAccess) {
    return <Navigate to="/login" replace />;
  }

  const hideBottomNavPaths = [
    '/',
    '/login',
    '/register',
    '/applications',
    '/messages',
    '/search',
    '/create-post',
    '/add-pet',
    '/favorites',
    '/my-applications',
    '/settings',
    '/edit-profile',
    '/shelters',
    '/help',
  ];

  // Also hide for dynamic routes
  const isPetDetail = location.pathname.startsWith('/pet/');
  const isPostDetail = location.pathname.startsWith('/post/');
  const isChat = location.pathname.startsWith('/chat/');

  const shouldShowBottomNav = !hideBottomNavPaths.includes(location.pathname) && !isPetDetail && !isPostDetail && !isChat;

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <Routes>
        <Route path="/" element={<OnboardingScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/reset-password" element={<ResetPasswordScreen />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/forum" element={<ForumScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/pet/:id" element={<PetDetailScreen />} />
        <Route path="/post/:id" element={<PostDetailScreen />} />
        <Route path="/applications" element={<ApplicationScreen />} />
        <Route path="/messages" element={<MessageCenterScreen />} />
        <Route path="/chat/:id" element={<ChatScreen />} />
        <Route path="/create-post" element={<CreatePostScreen />} />
        <Route path="/search" element={<SearchScreen />} />
        <Route path="/pets" element={<PetListScreen />} />
        <Route path="/add-pet" element={<AddPetScreen />} />
        <Route path="/favorites" element={<FavoritesScreen />} />
        <Route path="/my-applications" element={<MyApplicationsScreen />} />
        <Route path="/settings" element={<SettingsScreen />} />
        <Route path="/edit-profile" element={<EditProfileScreen />} />
        <Route path="/shelters" element={<ShelterVisitScreen />} />
        <Route path="/help" element={<HelpCenterScreen />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {shouldShowBottomNav && <BottomNav />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <MobileLayout>
          <AppContent />
        </MobileLayout>
      </Router>
    </AppProvider>
  );
};

export default App;