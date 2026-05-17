import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, ArrowUpRight } from 'lucide-react';

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-32 px-6 lg:px-20 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <span className="text-[10px] font-mono tracking-[0.4em] text-zinc-400 uppercase">Contact</span>
              <h2 className="text-4xl lg:text-7xl font-medium tracking-tighter text-zinc-900 leading-tight">
                Contact <br />
                <span className="text-zinc-400 font-light italic text-2xl lg:text-4xl">Let's build something together</span>
              </h2>
            </div>
            <p className="text-lg text-zinc-500 font-light max-w-md leading-relaxed">
              <sub>如果您有跨境设计、AI 产品咨询或全链路交互重构的需求，欢迎随时垂询。</sub>
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="group p-8 rounded-[2rem] bg-[#F9FAFB] border border-zinc-100 hover:border-purple-500/30 transition-all">
              <div className="flex items-start justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-purple-600">
                    <Mail className="w-5 h-5" />
                    <span className="text-xs font-mono uppercase tracking-widest">Email</span>
                  </div>
                  <a href="mailto:15750952862@163.com" className="text-xl md:text-2xl font-medium text-zinc-900 block hover:text-purple-600 transition-colors">
                    15750952862@163.com
                  </a>
                </div>
                <div className="p-3 rounded-full bg-white border border-zinc-100 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-4 h-4 text-purple-600" />
                </div>
              </div>
            </div>

            <div className="group p-8 rounded-[2rem] bg-[#F9FAFB] border border-zinc-100 hover:border-blue-500/30 transition-all">
              <div className="flex items-start justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-blue-600">
                    <Phone className="w-5 h-5" />
                    <span className="text-xs font-mono uppercase tracking-widest">Phone / Mobile</span>
                  </div>
                  <div className="space-y-2">
                    <a href="tel:+8615750952862" className="text-xl md:text-2xl font-medium text-zinc-900 block hover:text-blue-600 transition-colors">
                      +86 157 5095 2862
                    </a>
                    <a href="tel:+601128796947" className="text-xl md:text-2xl font-medium text-zinc-900 block hover:text-blue-600 transition-colors">
                      +60 11 2879 6947
                    </a>
                  </div>
                </div>
                <div className="p-3 rounded-full bg-white border border-zinc-100 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-4 h-4 text-blue-600" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
