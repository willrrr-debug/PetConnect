import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context';

const RegisterScreen: React.FC = () => {
    const navigate = useNavigate();
    const { register, verifyOtp, loading } = useApp();

    const [step, setStep] = useState<'info' | 'otp'>('info');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [otp, setOtp] = useState('');
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
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: '' }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitError('');

        if (!validateForm()) return;

        // 这里的 register 会触发 Supabase 发送验证邮件
        const result = await register(formData.email, formData.password, formData.name);

        if (result.success) {
            // 提醒用户去邮箱查看并进入验证码步骤
            setStep('otp');
        } else {
            setSubmitError(result.error || '注册失败，请稍后重试');
        }
    };

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitError('');

        if (otp.length < 6) {
            setSubmitError('请输入完整的验证码');
            return;
        }

        const result = await verifyOtp(formData.email, otp, 'signup');

        if (result.success) {
            // 验证成功，跳转到登录页并预填写
            alert('验证成功！您的账号已激活，请登录。');
            navigate('/login', {
                state: {
                    email: formData.email,
                    password: formData.password
                }
            });
        } else {
            setSubmitError(result.error || '验证码错误或已过期');
        }
    };

    return (
        <div className="relative min-h-screen overflow-hidden bg-[#FFF9F5] font-sans">
            {/* 背景装饰 */}
            <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] rounded-full bg-gradient-to-br from-[#FFB8A3]/20 to-transparent blur-3xl"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-gradient-to-tl from-[#FF9671]/15 to-transparent blur-3xl"></div>

            {/* 头部区域 */}
            <div className="relative pt-12 pb-6 flex flex-col items-center z-10">
                <div
                    onClick={() => step === 'otp' && setStep('info')}
                    className={`w-24 h-24 rounded-full bg-white/80 backdrop-blur-xl border border-white/60 shadow-xl shadow-[#FFB8A3]/20 flex items-center justify-center transition-transform ${step === 'otp' ? 'cursor-pointer hover:scale-105 active:scale-95' : ''}`}
                >
                    <span className="text-5xl">{step === 'info' ? '🐾' : '📧'}</span>
                </div>
                <div className="mt-6 text-center px-6">
                    <h1 className="text-3xl font-extrabold tracking-tight text-[#4A3728]">
                        {step === 'info' ? '创建账号' : '验证邮箱'}
                    </h1>
                    <p className="text-base text-[#8B7355] mt-2 font-medium">
                        {step === 'info' ? '开启您的领养之旅' : `验证码已发送至 ${formData.email}`}
                    </p>
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

                {step === 'info' ? (
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="group">
                            <label className="block text-xs font-bold text-[#8B7355] uppercase tracking-wider mb-2 pl-1">姓名</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <span className="text-[#A08E81] text-xl">👤</span>
                                </div>
                                <input
                                    className={`block w-full pl-12 pr-4 py-4 bg-white/80 border ${errors.name ? 'border-red-300' : 'border-[#FFB8A3]/20'} rounded-xl text-[#4A3728] font-semibold placeholder-[#C4B5A0] focus:ring-2 focus:ring-[#FFB8A3]/50 outline-none transition-all`}
                                    placeholder="请输入您的姓名"
                                    value={formData.name}
                                    onChange={handleInputChange('name')}
                                />
                            </div>
                            {errors.name && <p className="mt-1.5 text-xs text-red-600 pl-1">{errors.name}</p>}
                        </div>

                        <div className="group">
                            <label className="block text-xs font-bold text-[#8B7355] uppercase tracking-wider mb-2 pl-1">邮箱</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <span className="text-[#A08E81] text-xl">✉️</span>
                                </div>
                                <input
                                    className={`block w-full pl-12 pr-4 py-4 bg-white/80 border ${errors.email ? 'border-red-300' : 'border-[#FFB8A3]/20'} rounded-xl text-[#4A3728] font-semibold placeholder-[#C4B5A0] focus:ring-2 focus:ring-[#FFB8A3]/50 outline-none transition-all`}
                                    placeholder="请输入邮箱地址"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleInputChange('email')}
                                />
                            </div>
                            {errors.email && <p className="mt-1.5 text-xs text-red-600 pl-1">{errors.email}</p>}
                        </div>

                        <div className="group">
                            <label className="block text-xs font-bold text-[#8B7355] uppercase tracking-wider mb-2 pl-1">密码</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <span className="text-[#A08E81] text-xl">🔒</span>
                                </div>
                                <input
                                    className={`block w-full pl-12 pr-12 py-4 bg-white/80 border ${errors.password ? 'border-red-300' : 'border-[#FFB8A3]/20'} rounded-xl text-[#4A3728] font-semibold placeholder-[#C4B5A0] focus:ring-2 focus:ring-[#FFB8A3]/50 outline-none transition-all`}
                                    placeholder="请设置密码（至少6位）"
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={handleInputChange('password')}
                                />
                                <button
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#A08E81]"
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    <span className="text-lg">{showPassword ? '👁️' : '🙈'}</span>
                                </button>
                            </div>
                            {errors.password && <p className="mt-1.5 text-xs text-red-600 pl-1">{errors.password}</p>}
                        </div>

                        <div className="group">
                            <label className="block text-xs font-bold text-[#8B7355] uppercase tracking-wider mb-2 pl-1">确认密码</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <span className="text-[#A08E81] text-xl">🔒</span>
                                </div>
                                <input
                                    className={`block w-full pl-12 pr-12 py-4 bg-white/80 border ${errors.confirmPassword ? 'border-red-300' : 'border-[#FFB8A3]/20'} rounded-xl text-[#4A3728] font-semibold placeholder-[#C4B5A0] focus:ring-2 focus:ring-[#FFB8A3]/50 outline-none transition-all`}
                                    placeholder="请再次输入密码"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange('confirmPassword')}
                                />
                                <button
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#A08E81]"
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    <span className="text-lg">{showConfirmPassword ? '👁️' : '🙈'}</span>
                                </button>
                            </div>
                            {errors.confirmPassword && <p className="mt-1.5 text-xs text-red-600 pl-1">{errors.confirmPassword}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full bg-gradient-to-r from-[#FFB8A3] to-[#FF9671] text-white font-bold text-lg py-4 rounded-2xl shadow-xl active:scale-[0.98] transition-all mt-6 flex items-center justify-center gap-2 overflow-hidden"
                        >
                            {loading ? (
                                <><span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>注册中...</>
                            ) : (
                                <>注册<span className="text-lg">→</span></>
                            )}
                        </button>
                    </form>
                ) : (
                    <form className="space-y-6" onSubmit={handleVerifyOtp}>
                        <div className="group">
                            <label className="block text-xs font-bold text-[#8B7355] uppercase tracking-wider mb-4 pl-1 text-center font-sans">
                                请输入邮件中的 8 位验证码
                            </label>
                            <div className="relative">
                                <input
                                    autoFocus
                                    className="block w-full py-6 bg-white border-2 border-[#FFB8A3]/40 rounded-2xl text-[#4A3728] font-bold text-3xl text-center tracking-[0.4em] focus:ring-4 focus:ring-[#FFB8A3]/20 focus:border-[#FFB8A3] transition-all shadow-inner font-mono"
                                    placeholder="00000000"
                                    maxLength={8}
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading || otp.length < 6}
                            className="group relative w-full bg-[#4A3728] hover:bg-[#2D2118] disabled:opacity-50 text-white font-bold text-lg py-4 rounded-2xl shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <><span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>验证中...</>
                            ) : (
                                <>完成注册<span className="text-lg">✨</span></>
                            )}
                        </button>

                        <div className="text-center">
                            <button
                                type="button"
                                onClick={() => setStep('info')}
                                className="text-sm font-bold text-[#A08E81] hover:text-[#FFB8A3] transition-colors"
                            >
                                ← 返回修改信息
                            </button>
                        </div>
                    </form>
                )}

                <div className="mt-8 text-center">
                    <p className="text-sm text-[#8B7355]">
                        已有账号？{' '}
                        <button onClick={() => navigate('/login')} className="text-[#FFB8A3] font-bold hover:text-[#FF9671] transition-colors">
                            立即登录
                        </button>
                    </p>
                </div>

                <p className="text-center text-[10px] text-[#C4B5A0] mt-6 leading-relaxed px-4">
                    注册即代表您同意{' '}
                    <span className="text-[#A08E81] underline cursor-pointer hover:text-[#8B7355]">用户协议</span>{' '}
                    和{' '}
                    <span className="text-[#A08E81] underline cursor-pointer hover:text-[#8B7355]">隐私政策</span>
                </p>
            </div>

            <style>{`
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                    20%, 40%, 60%, 80% { transform: translateX(5px); }
                }
                .animate-shake { animation: shake 0.5s ease-in-out; }
            `}</style>
        </div>
    );
};

export default RegisterScreen;
