import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context';

const LoginScreen: React.FC = () => {
  const navigate = useNavigate();
  const { login, loading } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('请输入邮箱');
      return;
    }
    if (!password) {
      setError('请输入密码');
      return;
    }

    const result = await login(email, password);

    if (result.success) {
      navigate('/home');
    } else {
      setError(result.error || '登录失败');
    }
  };

  return (
    <div className="bg-white dark:bg-background-dark font-sans text-[#111618] dark:text-white antialiased min-h-screen flex flex-col">
      <div className="relative w-full h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#eef7ff] to-white dark:from-[#15202b] dark:to-background-dark">
        <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute bottom-10 right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-500/5 blur-3xl"></div>
        <div className="relative z-10 flex flex-col items-center">
          <div className="size-48 rounded-full bg-white p-2 shadow-xl shadow-blue-900/5 dark:bg-surface-dark dark:shadow-none animate-float">
            <div
              aria-label="Happy pet illustration"
              className="w-full h-full rounded-full bg-cover bg-center overflow-hidden border-4 border-white dark:border-gray-700"
              role="img"
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDDNgVh4DJGy5DBClF4Ko4pufTG4XNUn05LjLauMrm98gcAJmjpGVMXR9msmyEG0TICn_4U7Gy-j_Jal0wNDgH-QYkICKC7N57GlcC1h4eU7yB_7F38RQPAGmW5E3LD7deIBIhZI53RY9e8RwJgQwtedtbuyEe3iGu0VwSEYSsUsZqkFwHCAHLmcUFsIaBiPcgFwHT8vFg1B9qi03G0KfJBzgoSwunMUIrz-WTUHyK-bRx9RBiNOAxSjPZHGeg1v7NboIMVJ4Zia_s')" }}
            >
            </div>
          </div>
          <div className="mt-6 text-center px-6">
            <h1 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white">寻找您的完美伙伴</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 font-medium tracking-wide">温暖每一个流浪的心灵</p>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-white dark:bg-background-dark px-8 relative z-20 pb-8">
        <div className="flex items-end gap-7 mb-8">
          <button className="text-[28px] font-black text-[#111618] dark:text-white relative pb-2 leading-none transition-opacity">
            登录
            <span className="absolute bottom-0 left-0 w-8 h-1.5 bg-primary rounded-full"></span>
          </button>
          <button
            onClick={() => navigate('/register')}
            className="text-xl font-bold text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors pb-2.5 leading-none"
          >
            注册
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm font-medium flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">error</span>
            {error}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="group">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 pl-1">邮箱</label>
            <div className="relative transition-all">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-gray-400 group-focus-within:text-primary transition-colors text-[22px]">mail</span>
              </div>
              <input
                className="block w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-[#1c2e36] border-none rounded-2xl text-[#111618] dark:text-white font-bold placeholder-gray-400 focus:ring-2 focus:ring-primary/20 focus:bg-white dark:focus:bg-[#1c2e36] transition-all shadow-sm"
                placeholder="请输入邮箱"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="group">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 pl-1">密码</label>
            <div className="relative transition-all">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-gray-400 group-focus-within:text-primary transition-colors text-[22px]">lock</span>
              </div>
              <input
                className="block w-full pl-12 pr-12 py-4 bg-gray-50 dark:bg-[#1c2e36] border-none rounded-2xl text-[#111618] dark:text-white font-bold placeholder-gray-400 focus:ring-2 focus:ring-primary/20 focus:bg-white dark:focus:bg-[#1c2e36] transition-all shadow-sm"
                placeholder="请输入密码"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {showPassword ? 'visibility' : 'visibility_off'}
                </span>
              </button>
            </div>
          </div>

          <div className="flex justify-end pt-1">
            <a className="text-sm font-bold text-gray-400 hover:text-primary transition-colors" href="#">忘记密码?</a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-[#2b8fd9] disabled:opacity-50 text-white font-bold text-lg py-4 rounded-2xl shadow-lg shadow-blue-500/25 active:scale-[0.98] transition-all mt-4 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span>
                登录中...
              </>
            ) : (
              <>
                登录
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-10 mb-4">
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-gray-100 dark:border-gray-800"></div>
            <span className="flex-shrink-0 mx-4 text-gray-400 text-xs font-bold">社交账号登录</span>
            <div className="flex-grow border-t border-gray-100 dark:border-gray-800"></div>
          </div>

          <div className="flex justify-center gap-6 mt-6">
            <button
              type="button"
              onClick={() => alert('开发配置中，敬请期待')}
              className="size-12 rounded-full bg-[#f2fcf6] hover:bg-[#e0f7ea] border border-[#d6f2e0] flex items-center justify-center transition-colors group"
            >
              <svg className="w-6 h-6 text-[#07C160]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.5 4C4.358 4 1 7.134 1 11c0 2.126.98 4.024 2.503 5.342l-.568 2.083 2.518-1.32c.944.305 1.956.471 3.012.471.503 0 .99-.038 1.459-.11-.274-.634-.423-1.332-.423-2.067 0-3.13 2.91-5.666 6.5-5.666.541 0 1.066.059 1.564.172C16.666 6.273 13.06 4 8.5 4zm10 5.4c-3.038 0-5.5 2.239-5.5 5 0 2.761 2.462 5 5.5 5 .765 0 1.49-.14 2.146-.395l1.638.918-.466-1.603C22.618 17.387 24 16.035 24 14.4c0-2.761-1.962-5.4-5.5-5z" />
              </svg>
            </button>
          </div>

          <p className="text-center text-[10px] text-gray-300 mt-8">
            登录即代表您同意 <span className="text-gray-400 underline">隐私政策</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;