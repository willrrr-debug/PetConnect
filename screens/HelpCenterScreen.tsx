import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HelpCenterScreen: React.FC = () => {
    const navigate = useNavigate();
    const [openId, setOpenId] = useState<number | null>(1);

    const faqs = [
        {
            id: 1,
            question: '如何申请领养？',
            answer: '在宠物详情页点击“立即申请”按钮，填写个人详细信息及领养意愿表单。我们的志愿者会在 3-7 个工作日内进行初步审核并联系您。'
        },
        {
            id: 2,
            question: '领养审核需要多久？',
            answer: '通常需要一周左右的时间。这包括在线审核、电话沟通以及可能的家庭实地探访，以确保能为宠物提供一个安全稳定的生活环境。'
        },
        {
            id: 3,
            question: '如果领养后无法继续饲养怎么办？',
            answer: '如果出于不可抗力原因无法继续饲养，请务必第一时间联系我们救助站，严禁弃养、转送。我们会协助重新寻找领养人或收回宠物。'
        },
        {
            id: 4,
            question: '领养是否需要支付费用？',
            answer: 'PetConnect 坚持“领养代替购买”的原则，领养本身不收取费用。但部分站点可能会建议捐赠小额爱心基金用于宠物的后续医疗和保险，具体视救助站而定。'
        },
        {
            id: 5,
            question: '领养前可以去线下看宠物吗？',
            answer: '非常欢迎！您可以在“救助站探访”中预约线下探访时间。建议领养前多次互动，确认您与宠物的性格是否契合。'
        }
    ];

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen pb-10 flex justify-center">
            <div className="relative w-full max-w-[430px] flex flex-col bg-background-light dark:bg-background-dark shadow-2xl">
                {/* Header */}
                <div className="flex items-center p-4 sticky top-0 z-10 backdrop-blur-md bg-transparent">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center justify-center size-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                    >
                        <span className="material-symbols-outlined">arrow_back</span>
                    </button>
                    <h2 className="flex-1 text-center text-lg font-bold mr-10">帮助中心</h2>
                </div>

                <div className="flex flex-col px-4 pt-4 gap-4">
                    <div className="bg-primary/5 dark:bg-primary/10 rounded-2xl p-6 mb-2">
                        <h3 className="text-primary font-bold text-lg mb-2">常见问题 (FAQ)</h3>
                        <p className="text-text-secondary dark:text-gray-400 text-sm font-medium">
                            如果您有任何其他疑问，欢迎通过“设置 - 意见反馈”或直接联系在线客服。
                        </p>
                    </div>

                    <div className="flex flex-col gap-3">
                        {faqs.map(faq => (
                            <div
                                key={faq.id}
                                className="rounded-2xl bg-surface-light dark:bg-surface-dark border border-transparent dark:border-white/5 overflow-hidden shadow-sm"
                            >
                                <button
                                    onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                                    className="w-full flex items-center justify-between p-4 text-left font-bold text-text-main dark:text-white"
                                >
                                    <span className="flex-1">{faq.question}</span>
                                    <span className={`material-symbols-outlined transition-transform duration-300 ${openId === faq.id ? 'rotate-180 text-primary' : 'text-gray-400'}`}>
                                        expand_more
                                    </span>
                                </button>
                                <div
                                    className={`overflow-hidden transition-all duration-300 ${openId === faq.id ? 'max-h-40' : 'max-h-0'}`}
                                >
                                    <div className="px-4 pb-4 text-sm text-text-secondary dark:text-gray-400 leading-relaxed font-medium">
                                        {faq.answer}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 p-4 rounded-2xl border-2 border-dashed border-gray-100 dark:border-white/5 flex flex-col items-center gap-3">
                        <p className="text-text-secondary dark:text-gray-400 text-sm font-medium">没能解决您的问题？</p>
                        <button
                            onClick={() => alert('人工客服正在连线中...')}
                            className="px-6 py-2 rounded-full bg-primary text-white font-bold text-sm shadow-md shadow-primary/20"
                        >
                            联系在线客服
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HelpCenterScreen;
