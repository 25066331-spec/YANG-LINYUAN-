import React from 'react';
import { ProjectCard } from './ProjectCard';
import { projects } from '../../data/projects';
import { motion } from 'motion/react';

export const BentoGrid: React.FC = () => {
  return (
    <section id="projects" className="py-32 px-6 lg:px-20 max-w-screen-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mb-20 space-y-4"
      >
        <span className="text-[10px] font-mono tracking-[0.3em] text-black/30 uppercase">精选项目集</span>
        <h2 className="text-4xl md:text-6xl font-medium text-[#1d1d1f] tracking-tight">AI 实验场</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-8 lg:gap-10">
        <div className="md:col-span-6 lg:col-span-8">
          <ProjectCard project={projects[0]} />
        </div>
        <div className="md:col-span-6 lg:col-span-4">
          <ProjectCard project={projects[1]} />
        </div>

        <div className="md:col-span-3 lg:col-span-4">
          <ProjectCard project={projects[2]} />
        </div>
        <div className="md:col-span-3 lg:col-span-8">
          <ProjectCard project={projects[3]} />
        </div>

        <div className="md:col-span-6 lg:col-span-4">
          <ProjectCard project={projects[4]} />
        </div>
        <div className="md:col-span-6 lg:col-span-4">
          <ProjectCard project={projects[5]} />
        </div>
        <div className="md:col-span-6 lg:col-span-4">
          <ProjectCard project={projects[6]} />
        </div>
      </div>
    </section>
  );
};
