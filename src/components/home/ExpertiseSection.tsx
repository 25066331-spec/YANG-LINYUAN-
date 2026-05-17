import React from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  Cpu, 
  Layers, 
  Monitor, 
  BarChart3, 
  Globe2, 
  Microscope, 
  Zap 
} from 'lucide-react';

export const ExpertiseSection: React.FC = () => {
  return (
    <section className="py-24 md:py-32 px-6 lg:px-20 bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto space-y-24 md:space-y-32">
        
        {/* Core Strengths - Research & AI */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="p-8 md:p-10 rounded-[2rem] bg-white border border-zinc-100 shadow-sm space-y-6 hover:shadow-md transition-shadow group"
          >
            <div className="flex items-center gap-4 text-purple-600">
              <div className="p-3 bg-purple-50 rounded-2xl group-hover:scale-110 transition-transform duration-500">
                <Microscope className="w-6 h-6" />
              </div>
              <h3 className="text-xl md:text-2xl font-medium tracking-tight">研究型核心优势</h3>
            </div>
            <p className="text-zinc-500 font-light leading-relaxed text-sm md:text-base">
              <sub>拥有国际会议科研成果，擅长用学术研究方法支撑设计决策。</sub>
              <br/>
              <span className="text-zinc-900 font-normal italic mt-2 block">区别于纯执行型设计师，具备深厚的底层设计推演理论支撑。</span>
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="p-8 md:p-10 rounded-[2rem] bg-white border border-zinc-100 shadow-sm space-y-6 hover:shadow-md transition-shadow group"
          >
            <div className="flex items-center gap-4 text-blue-600">
              <div className="p-3 bg-blue-50 rounded-2xl group-hover:scale-110 transition-transform duration-500">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-xl md:text-2xl font-medium tracking-tight">AI 协同专家思维</h3>
            </div>
            <p className="text-zinc-500 font-light leading-relaxed text-sm md:text-base">
              <sub>熟练使用 Claude / Gemini 进行精细化 Prompt 工程与 Vibe Coding。</sub>
              <br/>
              <span className="text-zinc-900 font-normal italic mt-2 block">实现算力向业务场景的降维封装，提升设计交付的智能化水平。</span>
            </p>
          </motion.div>
        </div>

        {/* Professional Skills Matrix */}
        <div className="space-y-12 md:space-y-16">
          <div className="text-center space-y-4">
            <span className="text-[10px] font-mono tracking-[0.4em] text-zinc-400 uppercase">Expertise Ecology</span>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight">全链路个人技能矩阵</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {[
              {
                icon: <Layers className="w-5 h-5" />,
                title: 'UX 全链路设计',
                subtitle: 'Full-Stack UX Design',
                items: [
                  '熟练用户研究、信息架构、流程梳理',
                  '原型设计、可用性测试与落地复盘',
                  '出海产品 0 到 1 完整交互设计经验'
                ]
              },
              {
                icon: <Monitor className="w-5 h-5" />,
                title: '工具与多端能力',
                subtitle: 'Tools & Multi-Terminal Mastery',
                items: [
                  '精通 Figma, Axure, Adobe CC, UE5',
                  '擅长移动端、PC 及沉浸式 3D 交互',
                  '丰富的跨境多语言界面国际化适配'
                ]
              },
              {
                icon: <BarChart3 className="w-5 h-5" />,
                title: '数据与研究能力',
                subtitle: 'Data & Research Intelligence',
                items: [
                  '熟练运用 Mixpanel / Firebase / Excel',
                  '用户画像构建与行为路径分析',
                  '以心理模型 (Mental Models) 驱动迭代'
                ]
              },
              {
                icon: <Globe2 className="w-5 h-5" />,
                title: '出海及本地化设计',
                subtitle: 'Globalized Localization',
                items: [
                  '深度了解东南亚用户行为与宗教文化',
                  '全球化产品体验优化与区域化适配',
                  '大厂级组件库规范 (Design System) 搭建'
                ]
              }
            ].map((skill, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 text-zinc-900">
                  <div className="p-2 bg-zinc-100 rounded-lg">{skill.icon}</div>
                  <div>
                    <h4 className="text-sm font-semibold">{skill.title}</h4>
                    <p className="text-[10px] text-zinc-400 font-mono italic">{skill.subtitle}</p>
                  </div>
                </div>
                <ul className="space-y-4">
                  {skill.items.map((item, i) => (
                    <li key={i} className="text-xs text-zinc-500 font-light flex gap-2">
                      <span className="text-zinc-300">•</span>
                      <sub>{item}</sub>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tools Stack */}
        <div className="pt-16 border-t border-zinc-100 flex flex-wrap justify-center gap-4">
          {[
            'Figma', 'Axure', 'Adobe CC', 'Unreal Engine 5', 
            'Mixpanel', 'Firebase', 'Medical/Enterprise LLM Prompting'
          ].map((tool, idx) => (
            <motion.span 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="px-5 py-2 rounded-full bg-zinc-900 text-zinc-100 text-[10px] font-mono tracking-widest uppercase hover:bg-purple-600 transition-colors cursor-default"
            >
              {tool}
            </motion.span>
          ))}
        </div>

      </div>
    </section>
  );
};
