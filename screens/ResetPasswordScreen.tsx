import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updatePassword } from '../services';

const ResetPasswordScreen: React.FC = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password.length < 6) {
            setError('密码长度不能少于6位');
            return;
        }

        if (password !== confirmPassword) {
            setError('两次输入的密码不一致');
            return;
        }

        setLoading(true);
        const { error: resetError } = await updatePassword(password);
        setLoading(false);

        if (resetError) {
            setError(resetError.message);
        } else {
            setSuccess(true);
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        }
    };

    return (
        <div className="relative min-h-screen overflow-hidden bg-[#FFF9F5] font-sans flex flex-col justify-center px-8">
            <div className="relative z-10 max-w-md w-full mx-auto">
                <div className="mb-10 text-center">
                    <h1 className="text-3xl font-black text-[#4A3728]">重置您的密码</h1>
                    <p className="text-[#8B7355] mt-2 font-medium">设置一个新的强密码以保护您的账户</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-sm font-medium animate-shake">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-2xl text-green-700 text-sm font-bold animate-fadeIn">
                        密码重置成功！正在为您跳转到登录页面...
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="group">
                        <label className="block text-xs font-bold text-[#8B7355] uppercase tracking-wider mb-2 pl-1">
                            新密码
                        </label>
                        <input
                            className="block w-full px-4 py-4 bg-white/80 backdrop-blur-sm border border-[#FFB8A3]/20 rounded-xl text-[#4A3728] font-semibold placeholder-[#C4B5A0] focus:ring-2 focus:ring-[#FFB8A3]/50 focus:border-[#FFB8A3] focus:bg-white transition-all shadow-sm"
                            placeholder="请输入新密码"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="group">
                        <label className="block text-xs font-bold text-[#8B7355] uppercase tracking-wider mb-2 pl-1">
                            确认新密码
                        </label>
                        <input
                            className="block w-full px-4 py-4 bg-white/80 backdrop-blur-sm border border-[#FFB8A3]/20 rounded-xl text-[#4A3728] font-semibold placeholder-[#C4B5A0] focus:ring-2 focus:ring-[#FFB8A3]/50 focus:border-[#FFB8A3] focus:bg-white transition-all shadow-sm"
                            placeholder="请再次输入新密码"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading || success}
                        className="w-full bg-gradient-to-r from-[#FFB8A3] to-[#FF9671] text-white font-bold text-lg py-4 rounded-2xl shadow-xl shadow-[#FFB8A3]/40 active:scale-[0.98] transition-all disabled:opacity-50"
                    >
                        {loading ? '提交中...' : '重置密码'}
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate('/login')}
                        className="w-full text-[#A08E81] font-bold text-sm py-2 hover:text-[#FFB8A3] transition-colors"
                    >
                        返回登录
                    </button>
                </form>
            </div>

            {/* 背景装饰保持一致 */}
            <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] rounded-full bg-gradient-to-br from-[#FFB8A3]/10 to-transparent blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-gradient-to-tl from-[#FF9671]/10 to-transparent blur-3xl pointer-events-none"></div>
        </div>
    );
};

export default ResetPasswordScreen;
