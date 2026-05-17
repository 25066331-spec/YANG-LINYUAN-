import React from 'react';
import { Hero } from '../components/home/Hero';
import { ExpertiseSection } from '../components/home/ExpertiseSection';
import { ContactSection } from '../components/home/ContactSection';
import { BentoGrid } from '../components/home/BentoGrid';
import { AuroraBackground } from '../components/common/AuroraBackground';
import { Navigation } from '../components/common/Navigation';

export const Home: React.FC = () => {
  return (
    <main className="relative bg-[#ffffff]">
      <AuroraBackground />
      <Navigation />
      <div className="relative z-10">
        <Hero />
        <ExpertiseSection />
        <BentoGrid />
        <ContactSection />
        
        {/* Footer / Bottom Status Bar */}
        <footer className="px-12 py-6 border-t border-black/5 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-[0.2em] text-black/30 font-medium bg-white/40 backdrop-blur-xl gap-6">
          <div className="flex gap-12">
            <div className="flex items-center gap-2">
              <span className="w-1 h-1 bg-blue-500 rounded-full animate-pulse"></span>
              坐标: 31.2304° N, 121.4737° E
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1 h-1 bg-black/10 rounded-full"></span>
              版本: 2026.05-BETA
            </div>
          </div>
          <div className="flex gap-8">
            <span className="text-black/60 hover:text-black cursor-pointer transition-colors"> Behance</span>
            <span className="text-black/60 hover:text-black cursor-pointer transition-colors"> Dribbble</span>
            <span className="text-black/60 hover:text-black cursor-pointer transition-colors"> TWITTER</span>
          </div>
          <div className="text-center md:text-right">
            © 版权所有 / 杨琳媛 认知设计实验室
          </div>
        </footer>
      </div>
    </main>
  );
};
