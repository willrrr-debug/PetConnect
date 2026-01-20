import React from 'react';
import { useNavigate } from 'react-router-dom';

const OnboardingScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen overflow-hidden bg-background-dark font-sans text-white">
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] scale-110" 
        style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDDNgVh4DJGy5DBClF4Ko4pufTG4XNUn05LjLauMrm98gcAJmjpGVMXR9msmyEG0TICn_4U7Gy-j_Jal0wNDgH-QYkICKC7N57GlcC1h4eU7yB_7F38RQPAGmW5E3LD7deIBIhZI53RY9e8RwJgQwtedtbuyEe3iGu0VwSEYSsUsZqkFwHCAHLmcUFsIaBiPcgFwHT8vFg1B9qi03G0KfJBzgoSwunMUIrz-WTUHyK-bRx9RBiNOAxSjPZHGeg1v7NboIMVJ4Zia_s')" }}
      >
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30"></div>
      
      <div className="relative h-full flex flex-col justify-end px-6 pb-16">
        <div className="absolute top-12 left-1/2 -translate-x-1/2">
          <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
            <span className="material-symbols-outlined text-primary text-3xl">pets</span>
          </div>
        </div>

        <div className="mb-12 space-y-4">
          <h1 className="text-4xl md:text-5xl font-black leading-[1.2] tracking-tight text-white drop-shadow-2xl">
            您想为哪种<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">毛孩子</span><br/>
            提供一个家？
          </h1>
          <p className="text-white/70 text-lg font-medium">
            您的选择将开启一段温暖的缘分。
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => navigate('/login')}
            className="group relative aspect-[3/4] rounded-[2.5rem] overflow-hidden glass-panel active:scale-95 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="h-full flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary border border-primary/30 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-4xl">voice_selection</span>
              </div>
              <span className="text-xl font-bold tracking-wider">狗狗</span>
              <div className="px-3 py-1 rounded-full bg-white/10 text-[10px] uppercase tracking-[0.2em] font-bold">Waiting for you</div>
            </div>
          </button>
          
          <button 
             onClick={() => navigate('/login')}
            className="group relative aspect-[3/4] rounded-[2.5rem] overflow-hidden glass-panel active:scale-95 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="h-full flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center text-secondary border border-secondary/30 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-4xl">pets</span>
              </div>
              <span className="text-xl font-bold tracking-wider">猫猫</span>
              <div className="px-3 py-1 rounded-full bg-white/10 text-[10px] uppercase tracking-[0.2em] font-bold">Seek a friend</div>
            </div>
          </button>
        </div>

        <div className="mt-10 text-center">
          <button onClick={() => navigate('/login')} className="text-white/50 text-sm font-medium hover:text-white transition-colors">
            已经有账号？ <span className="text-white underline underline-offset-4 decoration-primary/50">立即登录</span>
          </button>
        </div>
      </div>
      
      {/* Glow effects */}
      <div className="absolute top-20 right-[-10%] w-64 h-64 bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-40 left-[-10%] w-64 h-64 bg-secondary/10 rounded-full blur-[100px] pointer-events-none"></div>
    </div>
  );
};

export default OnboardingScreen;