import React from 'react';
import { motion } from 'motion/react';

export const AuroraBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#ffffff]">
      {/* Dynamic Aurora-like Gradients (Soft Pastels) */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
          x: [-50, 50, -50],
          y: [-20, 20, -20],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-100/40 blur-[120px] rounded-full mix-blend-multiply"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.05, 0.15, 0.05],
          x: [30, -30, 30],
          y: [10, -10, 10],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-purple-100/30 blur-[100px] rounded-full mix-blend-multiply"
      />
      
      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')`, mixBlendMode: 'overlay' }} />
           
      {/* Subtle Vignette */}
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.03)] z-10" />

      {/* Gradient Mask for spatial depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#ffffff]/0 via-[#ffffff]/20 to-[#ffffff]" />
    </div>
  );
};

export const NoiseOverlay: React.FC = () => (
  <div className="fixed inset-0 z-[9999] pointer-events-none opacity-[0.05] contrast-150 brightness-200"
       style={{ backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')` }} />
);
