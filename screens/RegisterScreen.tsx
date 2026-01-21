import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context';

const RegisterScreen: React.FC = () => {
    const navigate = useNavigate();
    const { register, loading } = useApp();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitError, setSubmitError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // 表单验证
    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) {
            newErrors.name = '请输入姓名';
        }
        if (!formData.email.trim()) {
            newErrors.email = '请输入邮箱';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = '邮箱格式不正确';
        }
        if (!formData.password) {
            newErrors.password = '请输入密码';
        } else if (formData.password.length < 6) {
            newErrors.password = '密码至少6位';
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = '两次密码不一致';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [field]: e.target.value }));
        // 清除该字段的错误
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: '' }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitError('');

        if (!validateForm()) return;

        const result = await register(formData.email, formData.password, formData.name);

        if (result.success) {
            navigate('/home');
        } else {
            setSubmitError(result.error || '注册失败，请稍后重试');
        }
    };

    return (
        <div className="relative min-h-screen overflow-hidden bg-[#FFF9F5] font-sans">
            {/* 背景装饰 */}
            <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] rounded-full bg-gradient-to-br from-[#FFB8A3]/20 to-transparent blur-3xl"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-gradient-to-tl from-[#FF9671]/15 to-transparent blur-3xl"></div>

            {/* 头部区域 */}
            <div className="relative pt-12 pb-6 flex flex-col items-center z-10">
                <div className="w-24 h-24 rounded-full bg-white/80 backdrop-blur-xl border border-white/60 shadow-xl shadow-[#FFB8A3]/20 flex items-center justify-center">
                    <span className="text-5xl">🐾</span>
                </div>
                <div className="mt-6 text-center px-6">
                    <h1 className="text-3xl font-extrabold tracking-tight text-[#4A3728]">创建账号</h1>
                    <p className="text-base text-[#8B7355] mt-2 font-medium">开启您的领养之旅</p>
                </div>
            </div>

            {/* 表单区域 */}
            <div className="relative z-20 px-8 pb-8">
                {/* 错误提示 */}
                {submitError && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-sm font-medium flex items-center gap-3 animate-shake">
                        <span className="text-lg">⚠️</span>
                        {submitError}
                    </div>
                )}

                {/* 表单 */}
                <form className="space-y-4" onSubmit={handleSubmit}>
                    {/* 姓名 */}
                    <div className="group">
                        <label className="block text-xs font-bold text-[#8B7355] uppercase tracking-wider mb-2 pl-1">
                            姓名
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <span className="text-[#A08E81] group-focus-within:text-[#FFB8A3] transition-colors text-xl">
                                    👤
                                </span>
                            </div>
                            <input
                                className={`block w-full pl-12 pr-4 py-4 bg-white/80 backdrop-blur-sm border ${errors.name ? 'border-red-300' : 'border-[#FFB8A3]/20'
                                    } rounded-xl text-[#4A3728] font-semibold placeholder-[#C4B5A0] focus:ring-2 focus:ring-[#FFB8A3]/50 focus:border-[#FFB8A3] focus:bg-white transition-all shadow-sm hover:shadow-md`}
                                placeholder="请输入您的姓名"
                                value={formData.name}
                                onChange={handleInputChange('name')}
                            />
                        </div>
                        {errors.name && <p className="mt-1.5 text-xs text-red-600 pl-1">{errors.name}</p>}
                    </div>

                    {/* 邮箱 */}
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
                                className={`block w-full pl-12 pr-4 py-4 bg-white/80 backdrop-blur-sm border ${errors.email ? 'border-red-300' : 'border-[#FFB8A3]/20'
                                    } rounded-xl text-[#4A3728] font-semibold placeholder-[#C4B5A0] focus:ring-2 focus:ring-[#FFB8A3]/50 focus:border-[#FFB8A3] focus:bg-white transition-all shadow-sm hover:shadow-md`}
                                placeholder="请输入邮箱地址"
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange('email')}
                            />
                        </div>
                        {errors.email && <p className="mt-1.5 text-xs text-red-600 pl-1">{errors.email}</p>}
                    </div>

                    {/* 密码 */}
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
                                className={`block w-full pl-12 pr-12 py-4 bg-white/80 backdrop-blur-sm border ${errors.password ? 'border-red-300' : 'border-[#FFB8A3]/20'
                                    } rounded-xl text-[#4A3728] font-semibold placeholder-[#C4B5A0] focus:ring-2 focus:ring-[#FFB8A3]/50 focus:border-[#FFB8A3] focus:bg-white transition-all shadow-sm hover:shadow-md`}
                                placeholder="请设置密码（至少6位）"
                                type={showPassword ? 'text' : 'password'}
                                value={formData.password}
                                onChange={handleInputChange('password')}
                            />
                            <button
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#A08E81] hover:text-[#8B7355] transition-colors"
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                <span className="text-lg">{showPassword ? '👁️' : '🙈'}</span>
                            </button>
                        </div>
                        {errors.password && <p className="mt-1.5 text-xs text-red-600 pl-1">{errors.password}</p>}
                    </div>

                    {/* 确认密码 */}
                    <div className="group">
                        <label className="block text-xs font-bold text-[#8B7355] uppercase tracking-wider mb-2 pl-1">
                            确认密码
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <span className="text-[#A08E81] group-focus-within:text-[#FFB8A3] transition-colors text-xl">
                                    🔒
                                </span>
                            </div>
                            <input
                                className={`block w-full pl-12 pr-12 py-4 bg-white/80 backdrop-blur-sm border ${errors.confirmPassword ? 'border-red-300' : 'border-[#FFB8A3]/20'
                                    } rounded-xl text-[#4A3728] font-semibold placeholder-[#C4B5A0] focus:ring-2 focus:ring-[#FFB8A3]/50 focus:border-[#FFB8A3] focus:bg-white transition-all shadow-sm hover:shadow-md`}
                                placeholder="请再次输入密码"
                                type={showConfirmPassword ? 'text' : 'password'}
                                value={formData.confirmPassword}
                                onChange={handleInputChange('confirmPassword')}
                            />
                            <button
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#A08E81] hover:text-[#8B7355] transition-colors"
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                <span className="text-lg">{showConfirmPassword ? '👁️' : '🙈'}</span>
                            </button>
                        </div>
                        {errors.confirmPassword && <p className="mt-1.5 text-xs text-red-600 pl-1">{errors.confirmPassword}</p>}
                    </div>

                    {/* 注册按钮 */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="group relative w-full bg-gradient-to-r from-[#FFB8A3] to-[#FF9671] hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-lg py-4 rounded-2xl shadow-xl shadow-[#FFB8A3]/40 active:scale-[0.98] transition-all mt-6 flex items-center justify-center gap-2 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>

                        <span className="relative z-10 flex items-center gap-2">
                            {loading ? (
                                <>
                                    <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                    注册中...
                                </>
                            ) : (
                                <>
                                    注册
                                    <span className="text-lg transition-transform group-hover:translate-x-1">→</span>
                                </>
                            )}
                        </span>
                    </button>
                </form>

                {/* 底部链接 */}
                <div className="mt-8 text-center">
                    <p className="text-sm text-[#8B7355]">
                        已有账号？{' '}
                        <button
                            onClick={() => navigate('/login')}
                            className="text-[#FFB8A3] font-bold hover:text-[#FF9671] transition-colors"
                        >
                            立即登录
                        </button>
                    </p>
                </div>

                <p className="text-center text-[10px] text-[#C4B5A0] mt-6">
                    注册即代表您同意{' '}
                    <span className="text-[#A08E81] underline cursor-pointer hover:text-[#8B7355] transition-colors">
                        用户协议
                    </span>{' '}
                    和{' '}
                    <span className="text-[#A08E81] underline cursor-pointer hover:text-[#8B7355] transition-colors">
                        隐私政策
                    </span>
                </p>
            </div>

            {/* 动画样式 */}
            <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
        </div>
    );
};

export default RegisterScreen;
