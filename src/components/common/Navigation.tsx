import React from 'react';
import { motion } from 'motion/react';

export const Navigation: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-12 py-8 flex justify-between items-center pointer-events-none">
      <div className="flex items-center gap-3 pointer-events-auto cursor-pointer group">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 group-hover:scale-110 transition-transform shadow-lg shadow-blue-500/20" />
        <span className="font-medium tracking-tight text-lg text-[#1d1d1f]">YANG LINYUAN 杨琳媛</span>
      </div>
      <div className="hidden md:flex gap-8 items-center text-sm font-light text-[#1d1d1f]/60 pointer-events-auto">
        <a href="#projects" className="hover:text-black transition-colors">作品展厅</a>
        <a href="#contact" className="hover:text-black transition-colors">合作垂询</a>
        <div className="h-4 w-px bg-black/10"></div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.4)]"></div>
          <span className="text-black/80 font-medium">开放 Q4 合作咨询</span>
        </div>
      </div>
    </nav>
  );
};
