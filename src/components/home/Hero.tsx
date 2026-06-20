import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ChevronRight, ArrowUpRight } from 'lucide-react';

export const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.95]);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden px-6 lg:px-20">
      <motion.div 
        style={{ y: y1, opacity, scale }}
        className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
      >
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 border border-black/10 text-[10px] uppercase tracking-[0.2em] text-black/50 mb-6">
              <span className="w-1 h-1 rounded-full bg-blue-500 animate-pulse" />
              杨琳媛 | GLOBAL UX STRATEGIST
            </span>
            <h1 className="text-[56px] lg:text-[84px] font-semibold tracking-tighter leading-[0.95] mb-8 text-[#1d1d1f]">
              UX 作品集
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <h2 className="text-2xl lg:text-3xl font-medium tracking-tight text-black/80">
              参加多个 UX 项目
            </h2>
            <p className="text-lg text-black/50 max-w-md font-light leading-relaxed">
              深耕跨境社交、工具、数字文创多赛道，熟悉国际化产品设计标准。
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-4"
          >
            <button 
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 bg-black text-white rounded-full text-sm font-bold hover:bg-opacity-90 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              浏览作品
            </button>
            <button className="px-8 py-3 border border-black/10 text-black rounded-full text-sm font-medium hover:bg-black/5 backdrop-blur-md transition-all active:scale-95">
              设计思考
            </button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-4 grid grid-cols-2 gap-4 border-t border-black/5 pt-8"
          >
            <div>
              <p className="text-[10px] uppercase tracking-widest text-black/40 mb-1">设计理念</p>
              <p className="text-sm text-black/80 font-medium">认知降维</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-black/40 mb-1">核心专长</p>
              <p className="text-sm text-black/80 font-medium">多模态系统</p>
            </div>
          </motion.div>
        </div>

        {/* Floating AI UI Elements - The "Spatial" Layer */}
        <div className="hidden lg:block relative h-[600px]">
          <motion.div
            style={{ y: y2 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="relative w-full h-full">
              {/* Mockup Card 1 */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: 100 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-[10%] right-0 w-[400px] aspect-[4/3] bg-white/20 backdrop-blur-2xl rounded-2xl border border-black/5 shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-6 overflow-hidden group"
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-black/5" />
                    <div className="w-12 h-3 rounded-full bg-black/5" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-black/5" />
                </div>
                <div className="space-y-4">
                  <div className="h-4 w-3/4 rounded bg-black/10" />
                  <div className="h-4 w-1/2 rounded bg-black/5" />
                  <div className="h-32 w-full rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 animate-pulse" />
                </div>
              </motion.div>

              {/* Mockup Card 2 - Smaller, Floating */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: -100, y: 100 }}
                animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                transition={{ duration: 1.2, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-[10%] left-[10%] w-[280px] aspect-square bg-white/40 backdrop-blur-3xl rounded-xl border border-black/10 shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-4 z-20"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-6 h-6 rounded bg-blue-500/10 flex items-center justify-center">
                    <ArrowUpRight className="w-3 h-3 text-blue-500" />
                  </div>
                  <div className="text-[10px] font-mono text-black/30 tracking-widest uppercase">智能中枢</div>
                </div>
                <div className="space-y-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-black/10" />
                      <div className="flex-1 h-1.5 rounded-full bg-black/5 overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.random() * 60 + 20}%` }}
                          transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
                          className="h-full bg-black/10" 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Ambient Glow behind cards */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
      >
        <div className="w-px h-12 bg-gradient-to-b from-white to-transparent" />
      </motion.div>
    </section>
  );
};
