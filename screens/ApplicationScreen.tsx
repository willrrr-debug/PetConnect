import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ApplicationScreen: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate(-1);
    }
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Submit logic here
      navigate('/messages');
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-sans text-[#111618] dark:text-gray-100 flex flex-col min-h-screen selection:bg-primary/20 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-50 flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between border-b border-gray-100 dark:border-gray-800">
        <button 
          onClick={handleBack}
          className="flex size-12 shrink-0 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 active:bg-gray-200 dark:active:bg-gray-800 transition-colors cursor-pointer text-[#111618] dark:text-white"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-[#111618] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12 font-sans">领养申请</h2>
      </div>

      {/* Stepper */}
      <div className="bg-background-light dark:bg-background-dark px-6 py-4">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 dark:bg-gray-800 rounded-full z-0"></div>
          <div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary rounded-full z-0 transition-all duration-300"
            style={{ width: step === 1 ? '33%' : step === 2 ? '66%' : '100%' }}
          ></div>
          
          {/* Step 1 Indicator */}
          <div className="relative z-10 flex flex-col items-center gap-1">
            <div className={`size-8 rounded-full flex items-center justify-center text-xs font-bold font-sans transition-colors duration-300 ${step >= 1 ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 text-gray-400'}`}>
              {step > 1 ? <span className="material-symbols-outlined text-[16px]">check</span> : '1'}
            </div>
            <span className={`text-xs font-medium absolute -bottom-6 w-max font-sans transition-colors duration-300 ${step >= 1 ? 'text-primary' : 'text-gray-400 dark:text-gray-500'}`}>个人信息</span>
          </div>

          {/* Step 2 Indicator */}
          <div className="relative z-10 flex flex-col items-center gap-1">
            <div className={`size-8 rounded-full flex items-center justify-center text-xs font-bold font-sans transition-colors duration-300 ${step >= 2 ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 text-gray-400'}`}>
               {step > 2 ? <span className="material-symbols-outlined text-[16px]">check</span> : '2'}
            </div>
            <span className={`text-xs font-medium absolute -bottom-6 w-max font-sans transition-colors duration-300 ${step >= 2 ? 'text-primary' : 'text-gray-400 dark:text-gray-500'}`}>居住环境</span>
          </div>

          {/* Step 3 Indicator */}
          <div className="relative z-10 flex flex-col items-center gap-1">
            <div className={`size-8 rounded-full flex items-center justify-center text-xs font-bold font-sans transition-colors duration-300 ${step >= 3 ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 text-gray-400'}`}>
              3
            </div>
            <span className={`text-xs font-medium absolute -bottom-6 w-max font-sans transition-colors duration-300 ${step >= 3 ? 'text-primary' : 'text-gray-400 dark:text-gray-500'}`}>领养协议</span>
          </div>
        </div>
      </div>

      <main className="flex-1 flex flex-col px-4 pb-32 pt-6 gap-6 max-w-lg mx-auto w-full">
        {/* Pet Summary Card - Always visible */}
        <div className="flex items-center gap-4 bg-white dark:bg-[#1A262D] p-3 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-16 shrink-0" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC5uSIuWzrLH1wWuHZRaEQ8t2vRZYi4Xdnt33oLNSnInalwuAvsdwbNuDHkdx2XWyOPqyy6B3BLHtx_yGV-nxairsSPbDQ-0IT08ac6jo-iN4CUCsdmoZqtsh_2WNEIjgnOSzgj7lmetqAv2ZLc-vnGbuWqlXuYqYh6NTMce7nL4LbwDvuA-34CuBcGSgzJ9TxiCqnxrzw0syqwCLb-ti300Rv3Kjhex1wxKZzUhGEEuGMF3mS6RGTDgScRHMuqMLSy4Z17EFf0sUk')"}}></div>
          <div className="flex flex-col justify-center flex-1">
            <div className="flex items-center justify-between">
              <p className="text-[#111618] dark:text-white text-base font-bold leading-normal line-clamp-1 font-sans">申请领养：Bella</p>
              <span className="material-symbols-outlined text-primary text-xl">pets</span>
            </div>
            <p className="text-[#617c89] dark:text-gray-400 text-sm font-normal leading-normal line-clamp-2 font-sans">金毛寻回犬 • 2岁</p>
          </div>
        </div>

        {/* Step 1 Content: Personal Info */}
        {step === 1 && (
          <div className="animate-fade-in space-y-6">
            <div>
              <h3 className="text-[#111618] dark:text-white tracking-light text-xl font-bold leading-tight pb-4 font-sans">个人信息</h3>
              <div className="flex flex-col gap-4">
                <label className="flex flex-col w-full">
                  <p className="text-[#111618] dark:text-gray-300 text-sm font-medium leading-normal pb-2 font-sans">姓名</p>
                  <input className="form-input flex w-full rounded-xl border border-[#dbe2e6] dark:border-gray-700 bg-white dark:bg-[#1A262D] text-[#111618] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 focus:border-primary h-12 px-4 placeholder:text-[#617c89] dark:placeholder:text-gray-600 text-base font-normal leading-normal transition-shadow font-sans" placeholder="例如：王小明" defaultValue="" />
                </label>
                <div className="flex gap-4">
                  <label className="flex flex-col w-full flex-1">
                    <p className="text-[#111618] dark:text-gray-300 text-sm font-medium leading-normal pb-2 font-sans">手机号码</p>
                    <input className="form-input flex w-full rounded-xl border border-[#dbe2e6] dark:border-gray-700 bg-white dark:bg-[#1A262D] text-[#111618] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 focus:border-primary h-12 px-4 placeholder:text-[#617c89] dark:placeholder:text-gray-600 text-base font-normal leading-normal transition-shadow font-sans" placeholder="138 0000 0000" type="tel" />
                  </label>
                </div>
                <label className="flex flex-col w-full">
                  <p className="text-[#111618] dark:text-gray-300 text-sm font-medium leading-normal pb-2 font-sans">邮箱地址</p>
                  <input className="form-input flex w-full rounded-xl border border-[#dbe2e6] dark:border-gray-700 bg-white dark:bg-[#1A262D] text-[#111618] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 focus:border-primary h-12 px-4 placeholder:text-[#617c89] dark:placeholder:text-gray-600 text-base font-normal leading-normal transition-shadow font-sans" placeholder="wang@example.com" type="email" />
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Step 2 Content: Residence & Lifestyle */}
        {step === 2 && (
          <div className="animate-fade-in space-y-6">
             <div>
              <h3 className="text-[#111618] dark:text-white tracking-light text-xl font-bold leading-tight pb-4 pt-2 font-sans">生活方式与经验</h3>
              <p className="text-[#111618] dark:text-gray-300 text-sm font-medium leading-normal pb-2 font-sans">居住类型</p>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <label className="cursor-pointer group">
                  <input type="radio" name="residence" className="peer sr-only" defaultChecked />
                  <div className="flex flex-col items-center justify-center p-4 rounded-xl border border-[#dbe2e6] dark:border-gray-700 bg-white dark:bg-[#1A262D] peer-checked:border-primary peer-checked:bg-primary/5 dark:peer-checked:bg-primary/10 peer-checked:text-primary transition-all">
                    <span className="material-symbols-outlined text-3xl mb-2 text-gray-400 dark:text-gray-500 peer-checked:text-primary transition-colors">apartment</span>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300 peer-checked:text-primary group-hover:text-primary transition-colors font-sans">公寓</span>
                  </div>
                </label>
                <label className="cursor-pointer group">
                  <input type="radio" name="residence" className="peer sr-only" />
                  <div className="flex flex-col items-center justify-center p-4 rounded-xl border border-[#dbe2e6] dark:border-gray-700 bg-white dark:bg-[#1A262D] peer-checked:border-primary peer-checked:bg-primary/5 dark:peer-checked:bg-primary/10 peer-checked:text-primary transition-all">
                    <span className="material-symbols-outlined text-3xl mb-2 text-gray-400 dark:text-gray-500 peer-checked:text-primary transition-colors">house</span>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300 peer-checked:text-primary group-hover:text-primary transition-colors font-sans">住宅</span>
                  </div>
                </label>
              </div>

              <label className="flex flex-col w-full">
                <p className="text-[#111618] dark:text-gray-300 text-sm font-medium leading-normal pb-2 font-sans">养宠经验</p>
                <div className="relative">
                  <select className="form-select w-full rounded-xl border border-[#dbe2e6] dark:border-gray-700 bg-white dark:bg-[#1A262D] text-[#111618] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 focus:border-primary h-12 pl-4 pr-10 text-base font-normal leading-normal appearance-none cursor-pointer font-sans">
                    <option>首次养宠</option>
                    <option>1-3年</option>
                    <option>3-5年</option>
                    <option>5年以上</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
                    <span className="material-symbols-outlined">expand_more</span>
                  </div>
                </div>
              </label>
            </div>

            <div>
              <h3 className="text-[#111618] dark:text-white tracking-light text-xl font-bold leading-tight pb-4 pt-2 font-sans">你为什么要领养？</h3>
              <label className="flex flex-col w-full">
                <textarea className="form-textarea flex w-full rounded-xl border border-[#dbe2e6] dark:border-gray-700 bg-white dark:bg-[#1A262D] text-[#111618] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 focus:border-primary h-32 p-4 placeholder:text-[#617c89] dark:placeholder:text-gray-600 text-base font-normal leading-normal resize-none font-sans" placeholder="请告诉我们您的日常生活安排，以及为什么您适合领养Bella..."></textarea>
              </label>
              <div className="flex items-center gap-2 mt-2">
                <span className="material-symbols-outlined text-green-500 text-sm">check_circle</span>
                <span className="text-xs text-gray-500 dark:text-gray-400 font-sans">草稿已自动保存</span>
              </div>
            </div>
          </div>
        )}

        {/* Step 3 Content: Agreement */}
        {step === 3 && (
           <div className="animate-fade-in space-y-6">
             <div>
               <h3 className="text-[#111618] dark:text-white tracking-light text-xl font-bold leading-tight pb-4 font-sans">领养协议</h3>
               <div className="bg-white dark:bg-[#1A262D] p-5 rounded-xl border border-gray-100 dark:border-gray-800 space-y-4">
                 <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-sans">
                   为了确保宠物能得到最好的照顾，请您仔细阅读以下条款：
                 </p>
                 <ul className="space-y-3">
                   <li className="flex gap-3 text-sm text-gray-700 dark:text-gray-200">
                     <span className="material-symbols-outlined text-primary text-[20px] shrink-0">verified_user</span>
                     <span>我承诺为宠物提供适宜的食物、住所和医疗护理。</span>
                   </li>
                    <li className="flex gap-3 text-sm text-gray-700 dark:text-gray-200">
                     <span className="material-symbols-outlined text-primary text-[20px] shrink-0">home_work</span>
                     <span>我同意在必要时接受救助站工作人员的家庭回访。</span>
                   </li>
                    <li className="flex gap-3 text-sm text-gray-700 dark:text-gray-200">
                     <span className="material-symbols-outlined text-primary text-[20px] shrink-0">pets</span>
                     <span>如果因任何原因无法继续抚养，我将联系救助站协助安置。</span>
                   </li>
                 </ul>
                 <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                   <label className="flex items-center gap-3 cursor-pointer">
                     <input type="checkbox" className="size-5 rounded border-gray-300 text-primary focus:ring-primary/50" defaultChecked />
                     <span className="text-sm font-bold text-[#111618] dark:text-white">我已阅读并同意以上条款</span>
                   </label>
                 </div>
               </div>
             </div>
           </div>
        )}

        {/* Bottom Button */}
        <div className="mt-4">
          <button 
            onClick={handleNext}
            className="w-full bg-primary hover:bg-primary/90 active:scale-[0.98] transition-all text-white font-bold h-14 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-primary/30"
          >
            <span className="font-sans">
              {step === 1 ? '下一步：居住环境' : step === 2 ? '下一步：领养协议' : '提交申请'}
            </span>
            <span className="material-symbols-outlined">
              {step === 3 ? 'send' : 'arrow_forward'}
            </span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default ApplicationScreen;