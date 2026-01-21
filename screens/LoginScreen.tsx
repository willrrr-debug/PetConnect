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
    <div className="relative min-h-screen overflow-hidden bg-[#FFF9F5] font-sans">
      {/* 背景装饰 */}
      <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] rounded-full bg-gradient-to-br from-[#FFB8A3]/20 to-transparent blur-3xl"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-gradient-to-tl from-[#FF9671]/15 to-transparent blur-3xl"></div>

      {/* 头像区域 */}
      <div className="relative pt-16 pb-6 flex flex-col items-center z-10">
        {/* 玻璃态头像容器 */}
        <div className="relative">
          <div className="w-36 h-36 rounded-full bg-white/80 backdrop-blur-xl border border-white/60 shadow-2xl shadow-[#FFB8A3]/20 p-1.5 animate-float">
            <div
              className="w-full h-full rounded-full bg-cover bg-center"
              style={{ backgroundImage: "url('/images/cat-background.png')" }}
            />
          </div>
          {/* 装饰光环 */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#FFB8A3]/30 to-[#FF9671]/30 opacity-0 group-hover:opacity-100 blur-xl transition-opacity"></div>
        </div>

        {/* 标题 */}
        <div className="mt-8 text-center px-6">
          <h1 className="text-3xl font-extrabold tracking-tight text-[#4A3728]">
            寻找您的完美伙伴
          </h1>
          <p className="text-base text-[#8B7355] mt-2 font-medium">
            连接每一次美丽的心动
          </p>
        </div>
      </div>

      {/* 表单区域 */}
      <div className="relative z-20 px-8 pb-8">
        {/* 登录/注册切换 */}
        <div className="flex items-end gap-6 mb-8">
          <button className="text-3xl font-black text-[#4A3728] relative pb-2">
            登录
            <span className="absolute bottom-0 left-0 w-10 h-1.5 bg-gradient-to-r from-[#FFB8A3] to-[#FF9671] rounded-full"></span>
          </button>
          <button
            onClick={() => navigate('/register')}
            className="text-xl font-bold text-[#A08E81] hover:text-[#8B7355] transition-colors pb-2.5"
          >
            注册
          </button>
        </div>

        {/* 错误提示 */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-sm font-medium flex items-center gap-3 animate-shake">
            <span className="text-lg">⚠️</span>
            {error}
          </div>
        )}

        {/* 表单 */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* 邮箱输入 */}
          <div className="group">
            <label className="block text-xs font-bold text-[#8B7355] uppercase tracking-wider mb-2 pl-1">
              邮箱
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="text-[#A08E81] group-focus-within:text-[#FFB8A3] transition-colors text-xl">
                  ✉️
                </span>
              </div>
              <input
                className="block w-full pl-12 pr-4 py-4 bg-white/80 backdrop-blur-sm border border-[#FFB8A3]/20 rounded-xl text-[#4A3728] font-semibold placeholder-[#C4B5A0] focus:ring-2 focus:ring-[#FFB8A3]/50 focus:border-[#FFB8A3] focus:bg-white transition-all shadow-sm hover:shadow-md"
                placeholder="请输入邮箱"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* 密码输入 */}
          <div className="group">
            <label className="block text-xs font-bold text-[#8B7355] uppercase tracking-wider mb-2 pl-1">
              密码
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="text-[#A08E81] group-focus-within:text-[#FFB8A3] transition-colors text-xl">
                  🔒
                </span>
              </div>
              <input
                className="block w-full pl-12 pr-12 py-4 bg-white/80 backdrop-blur-sm border border-[#FFB8A3]/20 rounded-xl text-[#4A3728] font-semibold placeholder-[#C4B5A0] focus:ring-2 focus:ring-[#FFB8A3]/50 focus:border-[#FFB8A3] focus:bg-white transition-all shadow-sm hover:shadow-md"
                placeholder="请输入密码"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#A08E81] hover:text-[#8B7355] transition-colors"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                <span className="text-lg">
                  {showPassword ? '👁️' : '🙈'}
                </span>
              </button>
            </div>
          </div>

          {/* 忘记密码 */}
          <div className="flex justify-end pt-1">
            <a className="text-sm font-bold text-[#A08E81] hover:text-[#FFB8A3] transition-colors" href="#">
              忘记密码?
            </a>
          </div>

          {/* 登录按钮 */}
          <button
            type="submit"
            disabled={loading}
            className="group relative w-full bg-gradient-to-r from-[#FFB8A3] to-[#FF9671] hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-lg py-4 rounded-2xl shadow-xl shadow-[#FFB8A3]/40 active:scale-[0.98] transition-all mt-6 flex items-center justify-center gap-2 overflow-hidden"
          >
            {/* 按钮光效 */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>

            <span className="relative z-10 flex items-center gap-2">
              {loading ? (
                <>
                  <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  登录中...
                </>
              ) : (
                <>
                  登录
                  <span className="text-lg transition-transform group-hover:translate-x-1">→</span>
                </>
              )}
            </span>
          </button>
        </form>

        {/* 社交登录 */}
        <div className="mt-10 mb-4">
          <div className="relative flex py-3 items-center">
            <div className="flex-grow border-t border-[#E8DED0]"></div>
            <span className="flex-shrink-0 mx-4 text-[#A08E81] text-xs font-bold tracking-wide">
              社交媒体登录
            </span>
            <div className="flex-grow border-t border-[#E8DED0]"></div>
          </div>

          <div className="flex justify-center gap-4 mt-6">
            <button
              type="button"
              onClick={() => alert('开发配置中，敬请期待')}
              className="group w-14 h-14 rounded-2xl bg-gradient-to-br from-[#07C160]/10 to-[#07C160]/5 hover:from-[#07C160]/20 hover:to-[#07C160]/10 border border-[#07C160]/20 flex items-center justify-center transition-all hover:scale-105 hover:shadow-lg shadow-[#07C160]/20"
            >
              <svg className="w-7 h-7 text-[#07C160]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.5 4C4.358 4 1 7.134 1 11c0 2.126.98 4.024 2.503 5.342l-.568 2.083 2.518-1.32c.944.305 1.956.471 3.012.471.503 0 .99-.038 1.459-.11-.274-.634-.423-1.332-.423-2.067 0-3.13 2.91-5.666 6.5-5.666.541 0 1.066.059 1.564.172C16.666 6.273 13.06 4 8.5 4zm10 5.4c-3.038 0-5.5 2.239-5.5 5 0 2.761 2.462 5 5.5 5 .765 0 1.49-.14 2.146-.395l1.638.918-.466-1.603C22.618 17.387 24 16.035 24 14.4c0-2.761-1.962-5.4-5.5-5z" />
              </svg>
            </button>
          </div>

          <p className="text-center text-[10px] text-[#C4B5A0] mt-8">
            登录即代表您同意{' '}
            <span className="text-[#A08E81] underline cursor-pointer hover:text-[#8B7355] transition-colors">
              隐私政策
            </span>
          </p>
        </div>
      </div>

      {/* 动画样式 */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default LoginScreen;