import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OnboardingScreen: React.FC = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // 触发入场动画
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#FFF9F5] font-sans">
      {/* 猫咪背景图片层 - 使用本地资源确保中国可访问 */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center animate-ken-burns-subtle"
          style={{
            backgroundImage: `url('/images/cat-background.png')`
          }}
        />
        {/* 温馨渐变叠加层 - 降低不透明度让猫咪更清晰 */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#FFF9F5]/70"></div>
        {/* 底部强化遮罩 */}
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#FFF9F5]/95 via-[#FFF9F5]/50 to-transparent"></div>
      </div>

      {/* 主要内容区域 */}
      <div className="relative h-full flex flex-col justify-between px-6 py-12 z-10">
        {/* 顶部 Logo 区域 */}
        <div className={`flex justify-center transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/60 backdrop-blur-xl border border-white/80 shadow-lg shadow-orange-100/30">
            <span className="text-[#8B7355] font-bold text-lg tracking-wide">PetConnect</span>
          </div>
        </div>

        {/* 中部内容区域 - 直接显示在视频上 */}
        <div className={`flex-1 flex items-end pb-8 transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="w-full max-w-md mx-auto px-4">
            {/* 内容区域 - 无背景 */}
            <div className="relative space-y-6">
              {/* 标题区域 */}
              <div className="space-y-4 relative text-center">
                <h1 className="text-5xl font-extrabold leading-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
                  每一个毛孩子<br />
                  都在等待
                  <span className="relative inline-block ml-2">
                    <span className="relative z-10 text-[#FFB8A3] drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">温暖的家</span>
                  </span>
                </h1>

                <p className="text-white text-lg leading-relaxed font-medium drop-shadow-[0_2px_6px_rgba(0,0,0,0.3)]">
                  在这里，开启一段充满爱与陪伴的旅程
                </p>
              </div>

              {/* 开始按钮 */}
              <button
                onClick={() => navigate('/login')}
                className="group relative w-full h-16 rounded-2xl bg-gradient-to-r from-[#FFB8A3] to-[#FF9671] shadow-xl shadow-black/30 hover:shadow-2xl hover:shadow-black/40 active:scale-[0.98] transition-all duration-300 overflow-hidden"
              >
                {/* 按钮光效 */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>

                <div className="relative flex items-center justify-center gap-2">
                  <span className="text-white text-xl font-bold tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]">开始寻找萌宠</span>
                </div>
              </button>

              {/* 登录提示 */}
              <div className="text-center pt-2">
                <button
                  onClick={() => navigate('/login')}
                  className="text-white/90 text-sm hover:text-white transition-colors group drop-shadow-[0_1px_4px_rgba(0,0,0,0.3)]"
                >
                  已有账号？
                  <span className="ml-1 text-[#FFB8A3] font-semibold border-b-2 border-transparent group-hover:border-[#FFB8A3] transition-all">
                    立即登录
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 浮动装饰元素 */}
      <div className="absolute top-1/4 right-8 w-20 h-20 rounded-full bg-[#FFB8A3]/20 blur-2xl animate-float-slow pointer-events-none"></div>
      <div className="absolute top-1/3 left-12 w-16 h-16 rounded-full bg-[#FF9671]/15 blur-xl animate-float-slower pointer-events-none"></div>

      {/* 动画样式 */}
      <style>{`
        @keyframes ken-burns-subtle {
          0% { 
            transform: scale(1) translate(0, 0);
          }
          50% { 
            transform: scale(1.08) translate(-1%, -1%);
          }
          100% { 
            transform: scale(1) translate(0, 0);
          }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes float-slower {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-15px) translateX(10px); }
        }
        
        .animate-ken-burns-subtle {
          animation: ken-burns-subtle 25s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 4s ease-in-out infinite;
        }
        
        .animate-float-slower {
          animation: float-slower 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default OnboardingScreen;