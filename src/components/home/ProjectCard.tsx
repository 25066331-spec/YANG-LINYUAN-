import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Project } from '../../data/projects';
import { ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const navigate = useNavigate();
  const cardRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { damping: 20, stiffness: 100 });
  const springY = useSpring(mouseY, { damping: 20, stiffness: 100 });
  
  const rotateX = useTransform(springY, [-1, 1], [10, -10]);
  const rotateY = useTransform(springX, [-1, 1], [-10, 10]);
  
  const glareX = useTransform(springX, [-1, 1], ['-20%', '120%']);
  const glareY = useTransform(springY, [-1, 1], ['-20%', '120%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    mouseX.set((e.clientX - centerX) / (rect.width / 2));
    mouseY.set((e.clientY - centerY) / (rect.height / 2));
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => navigate(`/project/${project.id}`)}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{ scale: 1.02 }}
      className="relative group cursor-pointer w-full h-full min-h-[400px] rounded-3xl overflow-hidden border border-black/5 bg-white/[0.05] backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.02)] transition-all hover:bg-white/[0.1] hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)]"
    >
      {/* Glare effect */}
      <motion.div
        className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-20"
        style={{
          background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(0,0,0,0.1) 0%, transparent 60%)`,
        }}
      />

      <div className="relative z-0 w-full h-full flex flex-col p-8 lg:p-10">
        <div className="flex justify-between items-start mb-6">
          <div className="space-y-4">
            <div className="flex gap-2">
              {project.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-black/5 rounded-full text-[10px] font-bold text-blue-600 border border-blue-600/10 uppercase tracking-tight">
                  {tag}
                </span>
              ))}
            </div>
            <h3 className="text-2xl lg:text-3xl font-semibold text-[#1d1d1f] tracking-tight">{project.title}</h3>
            <p className="text-black/50 font-light text-sm leading-snug max-w-sm">{project.subtitle}</p>
          </div>
          <div className="text-xs text-black/20 font-mono">
            {project.id === 'tiktok-ai' ? '01' : project.id === 'pdfelement-ai' ? '02' : '03'}
          </div>
        </div>

        {/* Floating Mockup Preview */}
        <div className="relative flex-1 mt-6 perspective-1000">
          <motion.div 
            style={{ translateZ: 50 }}
            className="w-full h-full relative"
          >
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover rounded-2xl grayscale group-hover:grayscale-0 transition-all duration-700 opacity-60 group-hover:opacity-100"
              referrerPolicy="no-referrer"
            />
            
            {/* Absolute UI overlaps */}
            <motion.div 
              style={{ translateZ: 100 }}
              className="absolute -bottom-4 -right-4 bg-white/40 backdrop-blur-xl border border-black/5 p-4 rounded-xl shadow-[0_15px_40px_rgba(0,0,0,0.08)] hidden lg:block"
            >
              <div className="flex items-center gap-4">
                {project.metrics?.map((m, i) => (
                  <div key={i} className="text-center px-4 py-2 border-r last:border-0 border-black/5">
                    <div className="text-xs text-black/30 uppercase tracking-tighter mb-1">{m.label}</div>
                    <div className="text-xl font-medium text-[#1d1d1f]">{m.value}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Ambient Glow bottom left */}
        <div 
          className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full blur-[80px] opacity-0 group-hover:opacity-40 transition-opacity"
          style={{ backgroundColor: project.color }}
        />
      </div>
    </motion.div>
  );
};
