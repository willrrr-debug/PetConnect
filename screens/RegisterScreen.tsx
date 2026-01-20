import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context';
import Button from '../components/Button';
import Input from '../components/Input';

/**
 * 注册页面
 * 新用户注册流程
 */
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
            // 注册成功跳转到首页
            navigate('/home');
        } else {
            setSubmitError(result.error || '注册失败，请稍后重试');
        }
    };

    return (
        <div className="bg-white dark:bg-background-dark font-sans text-[#111618] dark:text-white antialiased min-h-screen flex flex-col">
            {/* 头部装饰 */}
            <div className="relative w-full h-[25vh] min-h-[180px] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#eef7ff] to-white dark:from-[#15202b] dark:to-background-dark">
                <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] rounded-full bg-primary/5 blur-3xl" />
                <div className="absolute bottom-10 right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-500/5 blur-3xl" />
                <div className="relative z-10 flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full bg-white p-2 shadow-xl shadow-blue-900/5 dark:bg-surface-dark dark:shadow-none">
                        <div className="w-full h-full rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="material-symbols-outlined text-primary text-4xl">pets</span>
                        </div>
                    </div>
                    <h1 className="mt-4 text-2xl font-black tracking-tight text-gray-900 dark:text-white">
                        创建账号
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 font-medium">
                        开启您的领养之旅
                    </p>
                </div>
            </div>

            {/* 表单区域 */}
            <div className="flex-1 bg-white dark:bg-background-dark px-8 relative z-20 pb-8">
                {submitError && (
                    <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm font-medium flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px]">error</span>
                        {submitError}
                    </div>
                )}

                <form className="space-y-5 mt-6" onSubmit={handleSubmit}>
                    <Input
                        label="姓名"
                        icon="person"
                        placeholder="请输入您的姓名"
                        value={formData.name}
                        onChange={handleInputChange('name')}
                        error={errors.name}
                    />

                    <Input
                        label="邮箱"
                        icon="mail"
                        type="email"
                        placeholder="请输入邮箱地址"
                        value={formData.email}
                        onChange={handleInputChange('email')}
                        error={errors.email}
                    />

                    <Input
                        label="密码"
                        icon="lock"
                        type="password"
                        placeholder="请设置密码（至少6位）"
                        value={formData.password}
                        onChange={handleInputChange('password')}
                        error={errors.password}
                    />

                    <Input
                        label="确认密码"
                        icon="lock"
                        type="password"
                        placeholder="请再次输入密码"
                        value={formData.confirmPassword}
                        onChange={handleInputChange('confirmPassword')}
                        error={errors.confirmPassword}
                    />

                    <div className="pt-4">
                        <Button type="submit" fullWidth loading={loading} iconRight="arrow_forward">
                            注册
                        </Button>
                    </div>
                </form>

                {/* 底部链接 */}
                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-500">
                        已有账号？{' '}
                        <button
                            onClick={() => navigate('/login')}
                            className="text-primary font-bold hover:underline"
                        >
                            立即登录
                        </button>
                    </p>
                </div>

                <p className="text-center text-[10px] text-gray-300 mt-6">
                    注册即代表您同意 <span className="text-gray-400 underline">用户协议</span> 和{' '}
                    <span className="text-gray-400 underline">隐私政策</span>
                </p>
            </div>
        </div>
    );
};

export default RegisterScreen;
