import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'motion/react';
import { projects } from '../data/projects';
import { ArrowLeft, Sparkles, Brain, Activity, Search, Globe, Cpu, MessageSquare, TrendingUp, Zap, Eye, MousePointer2, ShieldCheck, Layers, UserCheck, Layout, Heart, Shield, Dumbbell, Dog } from 'lucide-react';

const ImageRenderer: React.FC<{ title: string; src: string; className?: string }> = ({ title, src, className = "" }) => {
  const [isZoomed, setIsZoomed] = React.useState(false);

  return (
    <>
      <div 
        onClick={() => setIsZoomed(true)}
        className={`relative group overflow-hidden rounded-[2rem] glass border border-white/5 flex items-center justify-center transition-all duration-700 cursor-zoom-in ${className}`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        
        <img 
          src={src} 
          alt={title} 
          className="w-full h-full object-contain relative z-10 p-4 md:p-6 group-hover:scale-[1.01] transition-transform duration-[2000ms] cubic-bezier(0.16, 1, 0.3, 1)" 
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
            e.currentTarget.parentElement?.querySelector('.placeholder-content')?.classList.remove('hidden');
          }}
        />

          <div className="placeholder-content hidden absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 text-white/5 select-none bg-black/40 backdrop-blur-xl">
          <Sparkles className="w-8 h-8 text-white/20" />
          <span className="text-xs font-mono tracking-widest text-white/40">{title}</span>
        </div>
        
        <div className="absolute bottom-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="px-3 py-1.5 rounded-full glass border border-white/10 text-[9px] font-mono uppercase tracking-widest text-white/40 flex items-center gap-2">
            <MousePointer2 className="w-3 h-3" /> Click to Expand
          </div>
        </div>
      </div>

      {isZoomed && (
        <div 
          className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-20 bg-black/95 backdrop-blur-2xl transition-all duration-500"
          onClick={() => setIsZoomed(false)}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full h-full flex items-center justify-center"
          >
            <img 
              src={src} 
              alt={title} 
              className="max-w-full max-h-full object-contain shadow-2xl"
              referrerPolicy="no-referrer"
            />
            <button 
              className="absolute top-0 right-0 p-4 text-white/40 hover:text-white transition-colors"
              onClick={(e) => { e.stopPropagation(); setIsZoomed(false); }}
            >
              <div className="px-4 py-2 border border-white/10 rounded-full glass font-mono text-[10px] tracking-widest uppercase">
                Close [esc]
              </div>
            </button>
          </motion.div>
        </div>
      )}
    </>
  );
};

export const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = projects.find(p => p.id === id);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll();

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen bg-black text-white p-20 flex flex-col items-center justify-center">
        <button onClick={() => navigate('/')} className="px-6 py-3 glass rounded-full border border-white/10 hover:border-white/30 transition-colors">Return to Home</button>
      </div>
    );
  }

  if (project.id === 'pdfelement-ai') {
    return (
      <div ref={containerRef} className="relative min-h-screen bg-[#000000] text-white selection:bg-purple-500/30 font-sans overflow-x-hidden">
        {/* Background Effects */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-600/10 blur-[200px] rounded-full" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[200px] rounded-full" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] contrast-150 brightness-50 mix-blend-overlay" />
        </div>

        {/* Progress Bar */}
        <motion.div 
          className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-400 via-blue-500 to-cyan-600 origin-left z-[1001]"
          style={{ scaleX: smoothProgress }}
        />

        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-[1000] px-10 py-10 md:px-16 flex justify-between items-center mix-blend-difference">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate('/')}
            className="flex items-center gap-4 group"
          >
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center glass group-hover:border-white/40 transition-all duration-700">
               <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-2" />
            </div>
            <span className="text-[10px] font-mono tracking-[0.6em] uppercase opacity-40 group-hover:opacity-100 transition-opacity">Portfolio</span>
          </motion.button>
          <div className="hidden md:flex items-center gap-10">
             <div className="text-[10px] font-mono tracking-[0.4em] text-white/20 uppercase">Project / Detail / PDFelement 10 AI</div>
          </div>
        </nav>

        {/* Strategic Background & Core Insight */}
        <section className="relative min-h-screen flex items-center px-10 md:px-24 pt-40 pb-20 overflow-hidden">
          <div className="max-w-7xl mx-auto w-full">
             <motion.div
               initial={{ opacity: 0, y: 80 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
               className="space-y-16"
             >
               <div className="space-y-8">
                  <div className="flex items-center gap-4 text-purple-400">
                    <div className="h-[1px] w-12 bg-gradient-to-r from-purple-500 to-transparent" />
                    <span className="text-xs font-mono tracking-[0.8em] uppercase">Background & Strategy</span>
                  </div>
                  <h1 className="text-5xl md:text-8xl font-medium tracking-tighter leading-[0.9] text-white">
                    战略背景与核心洞察
                  </h1>
                  <p className="text-xl md:text-2xl font-mono text-purple-400/60 uppercase tracking-[0.2em]">PDFelement 10 AI 交互重构</p>
               </div>

               <div className="grid lg:grid-cols-12 gap-16 items-start">
                 <div className="lg:col-span-8 space-y-10">
                   <div className="space-y-6">
                     <h3 className="text-3xl font-medium">项目介绍</h3>
                     <p className="text-xl md:text-2xl text-white/70 leading-[1.4] font-light">
                       主导全平台集成大模型（LLM）的 UX 规范。定义了“上下文感知菜单”与“AI 侧边栏”交互逻辑，支持一键总结、智能改写。在普通 waps 等办公软件的程度上，添加了 AI 提示功能，可以在你做一些专业性文件时，给予数据库支持以及文件修改建议，也方便上班族办公，例如写日报周报等。
                     </p>
                   </div>
                   <div className="space-y-6">
                     <h3 className="text-3xl font-medium">营收转化策略优化</h3>
                     <p className="text-xl md:text-2xl text-white/70 leading-[1.4] font-light">
                       利用 Mixpanel 埋点分析付费流失节点，重构 Paywall（付费墙）交互，支撑业务实现 16% 的营收转化提升。上线后产品 NPS 提升 28%。
                     </p>
                   </div>
                 </div>
                 <div className="lg:col-span-4 space-y-8">
                    <div className="glass p-10 rounded-[3rem] border border-purple-500/20 bg-purple-500/5 space-y-6">
                      <TrendingUp className="w-8 h-8 text-purple-400" />
                      <div className="space-y-2">
                        <div className="text-[10px] font-mono tracking-widest text-purple-400 uppercase">Impact Metrics</div>
                        <div className="text-4xl font-medium">+16% Revenue</div>
                        <div className="text-4xl font-medium">+28% NPS</div>
                      </div>
                    </div>
                 </div>
               </div>
             </motion.div>
          </div>
        </section>

        {/* Intelligence Assets Center */}
        <section className="relative px-10 md:px-24 py-60 bg-white/[0.01]">
          <div className="max-w-7xl mx-auto space-y-32">
             <div className="space-y-10 text-center">
               <span className="text-xs font-mono tracking-[1em] text-white/20 uppercase">Intelligence Library</span>
               <h2 className="text-4xl md:text-7xl font-medium tracking-tighter">智能文档资产中枢</h2>
             </div>

             <div className="space-y-20">
                <div className="space-y-8">
                   <h3 className="text-2xl font-mono text-purple-400 flex items-center justify-center gap-6">
                      <div className="h-[1px] w-12 bg-purple-500/30" />
                      核心定位：大模型驱动的合同资产数字化管理与自动化风险筛查看板
                      <div className="h-[1px] w-12 bg-purple-500/30" />
                   </h3>
                   <ImageRenderer 
                      title="Asset Management Dashboard" 
                      src="/核心定位：大模型驱动的合同资产数字化管理与自动化风险筛查看板.png" 
                      className="w-full aspect-[21/9]" 
                   />
                </div>

                <div className="grid md:grid-cols-2 gap-20">
                   <div className="space-y-10">
                      <div className="flex items-center gap-6">
                         <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                            <Brain className="w-6 h-6" />
                         </div>
                         <h4 className="text-2xl font-medium">1. 智能文档资产库</h4>
                      </div>
                      <div className="space-y-8 pl-18 border-l border-white/5">
                         <div className="space-y-4">
                            <h5 className="text-xl font-medium text-white/90">资产状态聚合与分布式筛选</h5>
                            <p className="text-lg text-white/50 leading-relaxed font-light">
                              摆脱传统 PDF 软件冷冰冰的本地工具属性。本页面引入了具备 *上下文联邦* 心智的‘Intelligence Library’。顶部清晰呈现‘32 文件已就绪’与‘AI 语义同步中’的实时 Backend 状态。通过‘全部/本地/云端’的响应式切页（Tab-switching），帮助法务及商务人员在海量合同文件中实现秒级的多端资产检索。
                            </p>
                         </div>
                         <div className="space-y-4">
                            <h5 className="text-xl font-medium text-white/90">卡片式风险预警评级 (Risk-rating Cards)</h5>
                            <p className="text-lg text-white/50 leading-relaxed font-light">
                              在文档卡片设计中，通过 *色彩语意化* 建立了原子化的风险分级模型。系统通过底层解析引擎，直接在卡片外层浮出‘极高风险’、‘中等风险’、‘极低风险’的语义标签。这种 *‘前置化拦截’* 的交互策略，打破了用户必须逐页读完合同才能发现漏洞的传统弊端，显著缩短了企业高风险合同的处理链路。
                            </p>
                         </div>
                      </div>
                   </div>

                   <div className="space-y-10">
                      <div className="flex items-center gap-6">
                         <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                            <Zap className="w-6 h-6" />
                         </div>
                         <h4 className="text-2xl font-medium">2. 动态智能动态流 (Intelligence Feeds)</h4>
                      </div>
                      <div className="p-10 rounded-[3rem] glass border border-white/10 space-y-8">
                         <div className="text-[10px] font-mono tracking-widest text-white/30 uppercase">Active Insight Feed</div>
                         <p className="text-lg text-white/80 leading-relaxed font-light italic">
                           “从‘用户被动查找’到‘AI 主动动态 Feed 流’。在页面底部设计了深色的‘Intelligence Feeds’。这套组件的交互核心在于 *‘无侵入式主动提醒’*。”
                         </p>
                         <p className="text-base text-white/50 leading-relaxed font-light">
                           AI 引擎在后台自动运行，当发现合同改写成功或识别到条款与最新的《民法典》发生合规冲突时，会以流式卡片（Feed Cards）的形式主动向用户推送‘Review’动作。这种设计降低了用户的操作中断感，构建了更加智能、丝滑的法务审计工作流。
                         </p>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </section>

        {/* 沉浸式双栏工作区 */}
        <section className="relative px-6 md:px-10 lg:px-24 py-32 lg:py-60">
          <div className="max-w-7xl mx-auto space-y-24 lg:space-y-32">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
                <div className="space-y-12">
                   <span className="text-[10px] font-mono tracking-[0.8em] text-white/20 uppercase">Workspace Layout</span>
                   <h2 className="text-4xl md:text-5xl lg:text-7xl font-medium tracking-tighter leading-none">沉浸式双栏工作区</h2>
                   <div className="space-y-8 py-10">
                      <h3 className="text-xl text-purple-400 font-mono">核心定位：上下文感知的双栏沉浸式阅读交互与专业技能套件</h3>
                      <p className="text-xl text-white/70 font-light leading-relaxed">
                        打破传统 PDF 编辑器菜单臃肿、功能难找的束缚，通过“阅读主画布 + 智能侧边栏”的设计，构建全新的人机协同界面。
                      </p>
                   </div>
                   
                   <div className="space-y-16 pl-10 border-l border-purple-500/20">
                      <div className="space-y-4">
                         <h4 className="text-xl font-medium">Lumi AI 智能助手面板</h4>
                         <p className="text-base text-white/50 leading-relaxed font-light">
                           在界面右侧引入了全高（Full-Height）的 Lumi AI 智能助手面板，其核心设计理念是 *‘上下文感知的无缝融合’*。副标题提示‘上下文感知已开启’，向用户传递明确的机器工作态。面板中心采用极简的引导文案（Onboarding Text），明确告知用户‘划选即可快速摘要、翻译’，实现了低认知门槛的功能教育。
                         </p>
                      </div>
                      <div className="space-y-4">
                         <h4 className="text-xl font-medium">专业辅助工具箱 —— 从自由对话到预设提效</h4>
                         <p className="text-base text-white/50 leading-relaxed font-light">
                           针对法务和商务用户的核心高频场景，我设计了‘专业辅助 (PROFESSIONAL KIT)’卡片式快捷工具箱。内嵌了‘撰写周报’、‘起草说明’、‘待办提炼’、‘风险摘要’四个高频原子功能。这种 *‘微应用化’* 的设计，让用户无需花费时间去思考、编写复杂的提示词（Prompt），只需一键即可调用大模型垂直能力，实现真正的‘降本增效’。
                         </p>
                      </div>
                   </div>

                   <div className="p-8 rounded-3xl glass border border-red-500/20 bg-red-500/5 flex gap-6 items-start">
                      <ShieldCheck className="w-6 h-6 text-red-400 mt-1" />
                      <div className="space-y-3">
                         <div className="text-[10px] font-mono tracking-widest text-red-400 uppercase">Trust Boundary</div>
                         <p className="text-sm text-red-400/80 leading-relaxed font-light italic">
                           “在处理敏感商业合同的设计中，建立合理的信任边界至关重要。我们在底部增加了提示文本以体现对法律业务严肃性的尊重。”
                         </p>
                      </div>
                   </div>
                </div>
                <div className="sticky top-40">
                   <ImageRenderer 
                      title="Split-Screen Workspace" 
                      src="/核心定位：上下文感知的双栏沉浸式阅读交互与专业技能套件.png" 
                      className="aspect-[3/4] shadow-[0_0_120px_rgba(138,43,226,0.2)]" 
                   />
                </div>
             </div>
          </div>
        </section>

        {/* 数据仪表盘与合规扫描 */}
        <section className="relative px-6 md:px-10 lg:px-24 py-32 lg:py-80 bg-[#050505]">
          <div className="max-w-7xl mx-auto space-y-24 lg:space-y-32">
             <div className="space-y-10 flex flex-col lg:flex-row lg:items-end justify-between gap-10">
                <div className="space-y-8">
                  <span className="text-xs font-mono tracking-[0.8em] text-white/20 uppercase">Compliance Dashboard</span>
                  <h2 className="text-4xl md:text-5xl lg:text-7xl font-medium tracking-tighter">数据仪表盘与合规扫描</h2>
                </div>
                <div className="text-xs font-mono tracking-widest text-white/20 uppercase max-w-xs leading-relaxed text-right">
                   Digitizing Non-Structured Contract Assets with Actionable Risk Hierarchies
                </div>
             </div>

             <ImageRenderer 
                title="Compliance Scanner Console" 
                src="/核心定位：非结构化长合同的数字化度量衡与全维度合规扫描仪表盘.png" 
                className="w-full aspect-[16/8]" 
             />

             <div className="grid md:grid-cols-3 gap-12">
                <div className="glass p-10 rounded-[3rem] border border-white/5 space-y-8">
                   <div className="flex items-center gap-4 text-cyan-400">
                      <Activity className="w-6 h-6" />
                      <h4 className="font-medium">核心合规性健康度</h4>
                   </div>
                   <p className="text-sm text-white/50 leading-relaxed font-light">
                      打破传统 PDF 软件无法感知文档内容价值的局限，通过三大核心指标卡片，赋予长文档可量化的“健康体感”。系统将非结构化的合同文本转化为直观的‘82分’。
                   </p>
                </div>
                <div className="glass p-10 rounded-[3rem] border border-white/5 space-y-8">
                   <div className="flex items-center gap-4 text-purple-400">
                      <Globe className="w-6 h-6" />
                      <h4 className="font-medium">商业博弈分析</h4>
                   </div>
                   <p className="text-sm text-white/50 leading-relaxed font-light">
                      利用精准的环形比例图，直观呈现‘买方保护条款（65%）’、‘卖方保护条款（25%）’的博弈格局。帮助谈判人员在合同签署前，瞬间洞察利益分配上的倾斜度。
                   </p>
                </div>
                <div className="glass p-10 rounded-[3rem] border border-white/5 space-y-8">
                   <div className="flex items-center gap-4 text-red-400">
                      <Search className="w-6 h-6" />
                      <h4 className="font-medium">风险热力分布</h4>
                   </div>
                   <p className="text-sm text-white/50 leading-relaxed font-light">
                      系统将超长合同按章节进行切片，通过高饱和度的红蓝进度条标识风险等级。实现毫秒级的像素级高亮定位，终结肉眼寻找漏洞。
                   </p>
                </div>
             </div>

             <div className="p-16 rounded-[4rem] bg-gradient-to-br from-white/5 to-transparent border border-white/10 flex flex-col items-center gap-10 text-center">
                <div className="text-[10px] font-mono tracking-[0.5em] text-white/20 uppercase">Testing Results</div>
                <blockquote className="text-2xl md:text-3xl text-white/80 font-light max-w-4xl italic leading-relaxed">
                   “在针对 15 名资深法务进行的易用性测试中，这套智能诊断看板的引入，使得单份合同的合规初审时间缩短了 64%。”
                </blockquote>
             </div>
          </div>
        </section>

        {/* 垂直领域 AI Agent 矩阵 */}
        <section className="relative px-6 md:px-10 lg:px-24 py-32 lg:py-60">
           <div className="max-w-7xl mx-auto space-y-32 lg:space-y-40">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                 <div className="space-y-12">
                   <span className="text-[10px] font-mono tracking-[0.8em] text-white/20 uppercase">AI Agent Ecosystem</span>
                   <h2 className="text-4xl md:text-5xl lg:text-7xl font-medium tracking-tighter">垂直领域 AI Agent 矩阵</h2>
                   <p className="text-xl text-white/70 font-light leading-relaxed">
                     重构 B 端产品对 AI 能力的承载方式，将其从边缘的“Chatbot”升级为平台级的“Agent 调度中心”。通过这种卡片式的 Agent 布局，未来无论是增加法务新规模块还是全新的审计 Agent，系统都无需重构全局导航。
                   </p>
                 </div>
                 <div className="space-y-10 p-12 rounded-[3.5rem] glass border border-purple-500/10">
                    <div className="space-y-6">
                       <h3 className="text-xl font-medium flex items-center gap-4">
                          <Layers className="w-5 h-5 text-purple-400" />
                          Scalable Architecture
                       </h3>
                       <p className="text-base text-white/50 font-light">
                          我的核心交互策略是 *‘框架即生态’*。通过响应式网格中注入新的原子卡片。这种高扩展性的 B 端设计心智，极大地降低了产品的迭代研发成本。
                       </p>
                    </div>
                    <div className="space-y-6 pt-10 border-t border-white/5">
                       <h3 className="text-xl font-medium flex items-center gap-4">
                          <Eye className="w-5 h-5 text-blue-400" />
                          Reflection
                       </h3>
                       <p className="text-base text-white/50 font-light">
                          AI 时代的 B 端设计，其本质不是去堆砌更多的 Prompt 输入框，而是 *‘如何通过系统架构的升维，实现用户操作的降维’*。
                       </p>
                    </div>
                 </div>
              </div>

              {/* Grid 01-09 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 <ImageRenderer title="Agent 01" src="/万兴1.png" className="w-full aspect-square" />
                 <ImageRenderer title="Agent 02" src="/万兴2.png" className="w-full aspect-square" />
                 <ImageRenderer title="Agent 03" src="/万兴3.png" className="w-full aspect-square" />
                 <ImageRenderer title="Agent 04" src="/万兴4.png" className="w-full aspect-square" />
                 <ImageRenderer title="Agent 05" src="/万兴5.png" className="w-full aspect-square" />
                 <ImageRenderer title="Agent 06" src="/万兴6.png" className="w-full aspect-square" />
                 <ImageRenderer title="Agent 07" src="/万兴7.png" className="w-full aspect-square" />
                 <ImageRenderer title="Agent 08" src="/万兴8.png" className="w-full aspect-square" />
                 <ImageRenderer title="Agent 09" src="/万兴9.png" className="w-full aspect-square" />
              </div>
           </div>
        </section>

        {/* 多模态界面扩展与暗色模式 */}
        <section className="relative px-6 md:px-10 lg:px-24 py-32 lg:py-80 bg-[#000000]">
           <div className="max-w-7xl mx-auto space-y-24 lg:space-y-32">
              <div className="space-y-10 text-center">
                <span className="text-xs font-mono tracking-[0.8em] text-white/20 uppercase">Visual Systems</span>
                <h2 className="text-4xl md:text-5xl lg:text-7xl font-medium tracking-tighter">多模态界面扩展与暗色模式</h2>
                <p className="text-xl text-white/40 max-w-2xl mx-auto leading-relaxed">
                   为了适配更长时间精度的沉浸式工作流、降低商务与法务人员长时阅读的眼部疲劳，系统提供了完整无缝切换的“暗色模式”。
                </p>
              </div>
              <ImageRenderer 
                 title="Dark Mode Workflow" 
                 src="/暗色.png" 
                 className="w-full aspect-[16/9] shadow-[0_0_150px_rgba(0,0,0,1)]" 
              />
           </div>
        </section>

        {/* 设计回顾：精细化 B 端网格系统与空白美学 */}
        <section className="relative px-6 md:px-10 lg:px-24 py-32 lg:py-60">
           <div className="max-w-7xl mx-auto space-y-32 lg:space-y-40">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                 <div className="space-y-12">
                   <span className="text-[10px] font-mono tracking-[0.8em] text-white/20 uppercase">Retrospective</span>
                   <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter leading-none">设计回顾：精细化 B 端网格系统与空白美学</h2>
                   <p className="text-xl text-white/70 font-light leading-relaxed">
                     采用了 **4 栏响应式网格卡片**，配合大面积的 **#F9FAFB 背景留白**，极大地缓解了用户处理合同等严肃、高压文档时的焦虑感。
                   </p>
                   <div className="p-10 rounded-[3rem] glass border border-blue-500/10 bg-blue-500/5 space-y-6">
                      <div className="text-[9px] font-mono tracking-widest text-blue-400 uppercase">UX Strategy</div>
                      <p className="text-sm text-blue-400/80 leading-relaxed font-light">
                         本页面的设计核心在于 *‘降维认知（Cognitive De-escalation）’*。将 AI 的高级数据能力降维成‘风险标签’与‘动态流’。
                      </p>
                   </div>
                 </div>
                 <div className="grid grid-cols-1 gap-12">
                    <ImageRenderer title="Grid System Asset 1" src="/精细化 B 端网格系统与空白美学1.png" className="w-full aspect-[4/3]" />
                    <ImageRenderer title="Grid System Asset 2" src="/精细化 B 端网格系统与空白美学2.png" className="w-full aspect-[4/3]" />
                 </div>
              </div>
           </div>
        </section>

        {/* 多端协同移动手机界面响应式展示 */}
        <section className="relative px-6 md:px-10 lg:px-24 py-32 lg:py-80 bg-[#000000]">
           <div className="max-w-7xl mx-auto space-y-24 lg:space-y-32">
              <div className="space-y-10">
                <span className="text-xs font-mono tracking-[0.8em] text-white/20 uppercase">Mobile Ecosystem</span>
                <h2 className="text-4xl md:text-5xl lg:text-7xl font-medium tracking-tighter leading-none">多端协同移动手机界面响应式展示</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                 <ImageRenderer title="Mobile UI M1" src="/m1.png" className="w-full aspect-[9/16] md:aspect-square" />
                 <ImageRenderer title="Mobile UI M2" src="/m2.png" className="w-full aspect-[9/16] md:aspect-square" />
                 <ImageRenderer title="Mobile UI M3" src="/m3.png" className="w-full aspect-[9/16] md:aspect-square" />
                 <ImageRenderer title="Mobile UI M4" src="/m4.png" className="w-full aspect-[9/16] md:aspect-square" />
                 <ImageRenderer title="Mobile UI M5" src="/m5.png" className="w-full aspect-[9/16] md:aspect-square" />
                 <ImageRenderer title="Mobile UI M6" src="/m6.png" className="w-full aspect-[9/16] md:aspect-square" />
              </div>
           </div>
        </section>

        {/* FINAL EXIT */}
        <section className="relative h-[80vh] flex flex-col items-center justify-center border-t border-white/5 overflow-hidden">
          <div className="absolute inset-0 aurora-glow opacity-10 pointer-events-none" />
          <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
             className="relative z-10 flex flex-col items-center gap-16 group cursor-pointer"
             onClick={() => navigate('/')}
          >
            <div className="text-[10px] font-mono tracking-[2em] text-white/20 uppercase ml-12">Transmission Terminal</div>
            <h2 className="text-4xl md:text-8xl font-medium tracking-tighter text-white/10 group-hover:text-white transition-all duration-1000 text-center px-10">
              Exit Case Study
            </h2>
            <div className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center glass group-hover:border-purple-400/40 group-hover:scale-110 transition-all duration-700">
               <ArrowLeft className="w-6 h-6 rotate-180" />
            </div>
          </motion.div>
        </section>

        {/* FOOTER */}
        <footer className="px-10 py-32 border-t border-white/5 bg-black flex flex-col items-center gap-10">
           <div className="flex items-center gap-6">
              <div className="h-[1px] w-12 bg-white/10" />
              <div className="text-[10px] font-mono tracking-[1.5em] text-white/20 uppercase">PDFelement AI Project Suite</div>
              <div className="h-[1px] w-12 bg-white/10" />
           </div>
           <div className="text-[10px] font-mono text-white/5 uppercase text-center max-w-lg leading-relaxed tracking-[0.2em]">
              This project is part of the AI Workspace Design Evolution. All visual assets and strategic frameworks are proprietary property of the respective design systems. / 2026
           </div>
        </footer>
      </div>
    );
  }

  if (project.id === 'feishu-ai') {
    return (
      <div ref={containerRef} className="relative min-h-screen bg-[#000000] text-white selection:bg-blue-500/30 font-sans overflow-x-hidden">
        {/* Background Effects */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-600/10 blur-[200px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[200px] rounded-full" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.1] contrast-150 brightness-50 mix-blend-overlay" />
        </div>

        {/* Progress Bar */}
        <motion.div 
          className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-400 via-blue-600 to-cyan-600 origin-left z-[1001]"
          style={{ scaleX: smoothProgress }}
        />

        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-[1000] px-10 py-10 md:px-16 flex justify-between items-center mix-blend-difference">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate('/')}
            className="flex items-center gap-4 group"
          >
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center glass group-hover:border-white/40 transition-all duration-700">
               <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-2" />
            </div>
            <span className="text-[10px] font-mono tracking-[0.6em] uppercase opacity-40 group-hover:opacity-100 transition-opacity">Portfolio</span>
          </motion.button>
          <div className="hidden md:flex items-center gap-10">
             <div className="text-[10px] font-mono tracking-[0.4em] text-white/20 uppercase">Project / Detail / Lark AI Attendance</div>
          </div>
        </nav>

        {/* 「飞书假勤」AI 方向探索 */}
        <section className="relative min-h-screen flex items-center px-6 md:px-10 lg:px-24 pt-40 pb-20 overflow-hidden">
          <div className="max-w-7xl mx-auto w-full space-y-16 lg:space-y-24">
             <motion.div
               initial={{ opacity: 0, y: 80 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
               className="space-y-12 text-center"
             >
                <div className="space-y-6">
                   <span className="text-xs font-mono tracking-[1em] text-blue-400 uppercase">Project Positioning</span>
                   <h1 className="text-5xl md:text-6xl lg:text-8xl font-medium tracking-tighter leading-none">「飞书假勤」AI 方向探索</h1>
                   <p className="text-2xl md:text-3xl text-white/60 font-light tracking-tight max-w-4xl mx-auto italic">
                     为管理者提供轻松的假勤管理
                   </p>
                </div>
                <p className="text-xl text-white/40 leading-relaxed max-w-3xl mx-auto font-light">
                   让我们紧跟潮流，做人工智能时代的弄潮儿。AI 提供了巨大的可能性，包括面部识别打卡、简单点击即可安排日程、以及出勤数据可视化。
                </p>
                <div className="pt-20">
                   <ImageRenderer 
                      title="「飞书假勤」AI 方向探索" 
                      src="/「飞书假勤」AI 方向探索.png" 
                      className="w-full aspect-[21/9] shadow-[0_0_150px_rgba(51,112,255,0.1)]" 
                   />
                </div>
             </motion.div>
          </div>
        </section>

        {/* 与不同的利益相关者交谈 */}
        <section className="relative px-6 md:px-10 lg:px-24 py-32 lg:py-60 border-y border-white/5 bg-white/[0.01]">
          <div className="max-w-7xl mx-auto space-y-24 lg:space-y-32">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                <div className="space-y-12">
                   <span className="text-xs font-mono tracking-[0.8em] text-white/20 uppercase">Stakeholder Interviews</span>
                   <h2 className="text-4xl md:text-5xl lg:text-7xl font-medium tracking-tighter leading-none">与不同的利益相关者交谈</h2>
                   <p className="text-xl text-white/60 font-light leading-relaxed">
                     通过与飞书的各种利益相关者进行采访，包括 leader、员工和 HR，我识别出他们在使用飞书时遇到的不便和建议：
                   </p>
                </div>
                <div className="space-y-10">
                   <div className="glass p-10 rounded-[3rem] border border-white/5 space-y-6">
                      <div className="flex items-center gap-4 text-blue-400">
                         <div className="w-8 h-8 rounded-full border border-blue-500/20 flex items-center justify-center text-[10px] font-mono">01</div>
                         <h4 className="font-medium">Leader（管理者）</h4>
                      </div>
                      <p className="text-sm text-white/40 leading-relaxed font-light">
                        目前无法使用飞书直观地跟踪他们团队的休假和出勤情况。团队成员无法主动看到彼此的假期/加班安排，合作计划变得困难。
                      </p>
                   </div>
                   <div className="glass p-10 rounded-[3rem] border border-white/5 space-y-6">
                      <div className="flex items-center gap-4 text-blue-400">
                         <div className="w-8 h-8 rounded-full border border-blue-500/20 flex items-center justify-center text-[10px] font-mono">02</div>
                         <h4 className="font-medium">员工</h4>
                      </div>
                      <p className="text-sm text-white/40 leading-relaxed font-light">
                        经常忘记他们剩余的年假和病假余额，缺乏及时的假期状态反馈与查询入口。
                      </p>
                   </div>
                   <div className="glass p-10 rounded-[3rem] border border-white/5 space-y-6">
                      <div className="flex items-center gap-4 text-blue-400">
                         <div className="w-8 h-8 rounded-full border border-blue-500/20 flex items-center justify-center text-[10px] font-mono">03</div>
                         <h4 className="font-medium">HR（假勤管理员）</h4>
                      </div>
                      <p className="text-sm text-white/40 leading-relaxed font-light">
                        需要手动输入不同国家和地区的复杂加班规则，这需要深刻的理解和大量的时间投入。
                      </p>
                   </div>
                </div>
             </div>
             <div className="flex justify-center">
                <ImageRenderer 
                   title="利益相关者调研与协作" 
                   src="/与不同的利益相关者交谈.png" 
                   className="w-full max-w-5xl aspect-[16/8]" 
                />
             </div>
          </div>
        </section>

        {/* 探索机会 */}
        <section className="relative px-6 md:px-10 lg:px-24 py-32 lg:py-80">
          <div className="max-w-7xl mx-auto space-y-32 lg:space-y-40">
             <div className="space-y-10 text-center">
                <span className="text-xs font-mono tracking-[0.8em] text-white/20 uppercase">Opportunity Discovery</span>
                <h2 className="text-4xl md:text-5xl lg:text-7xl font-medium tracking-tighter">探索机会</h2>
             </div>

             <div className="grid md:grid-cols-3 gap-12 text-center">
                <div className="space-y-10 group">
                   <div className="aspect-[3/4] relative">
                      <ImageRenderer 
                        title="管理者：信息预警" 
                        src="/feishu_opportunity_1.png" 
                        className="w-full h-full" 
                      />
                   </div>
                   <div className="space-y-4 px-4">
                      <h3 className="text-2xl font-medium">1. 管理者：信息预警</h3>
                      <p className="text-sm text-white/40 leading-relaxed font-light">
                        为了避免团队内出现人手不足、或员工负荷较大的情况，leader 可以订阅 MyAI 的异常数据推送，如每周工作时长超过劳动法、员工经常性休假、团队出勤率低等异常情况。
                      </p>
                   </div>
                </div>
                <div className="space-y-10 group">
                   <div className="aspect-[3/4] relative">
                      <ImageRenderer 
                        title="管理者：数据查询" 
                        src="/feishu_opportunity_2.png" 
                        className="w-full h-full" 
                      />
                   </div>
                   <div className="space-y-4 px-4">
                      <h3 className="text-2xl font-medium">2. 管理者：数据查询</h3>
                      <p className="text-sm text-white/40 leading-relaxed font-light">
                        管理者希望了解团队内的假勤健康度，以及让员工之间可关注休假和加班情况，以便及时安排人员，提高上下游协作效率。
                      </p>
                   </div>
                </div>
                <div className="space-y-10 group">
                   <div className="aspect-[3/4] relative">
                      <ImageRenderer 
                        title="员工 & HR：智能化信息填写" 
                        src="/员工 & HR：智能化信息填写。.png" 
                        className="w-full h-full" 
                      />
                   </div>
                   <div className="space-y-4 px-4">
                      <h3 className="text-2xl font-medium">3. 员工 & HR：智能化信息填写</h3>
                      <p className="text-sm text-white/40 leading-relaxed font-light">
                        通过在飞书对话中 AI 识别休假、加班信息并自动生成假勤申请，员工直接使用 AI 查询自己的假期余额，管理员使用自然语言生成复杂的加班规则，AI 可以高效地帮助组织提升工作效率。
                      </p>
                   </div>
                </div>
             </div>
          </div>
        </section>

        {/* 「对话式」智能团队信息推送 & 查询 */}
        <section className="relative px-6 md:px-10 lg:px-24 py-32 lg:py-80 bg-[#050505]">
          <div className="max-w-7xl mx-auto space-y-24 lg:space-y-32">
             <div className="space-y-10">
                <span className="text-xs font-mono tracking-[0.8em] text-white/20 uppercase">Conversational UX</span>
                <h2 className="text-4xl md:text-5xl lg:text-7xl font-medium tracking-tighter">「对话式」智能团队信息推送 & 查询</h2>
                <p className="text-xl text-white/40 max-w-3xl leading-relaxed">
                   展示多模态对话式卡片的完整交互链路，涵盖从开启话题到数据日报、周报推送的无缝体验。
                </p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="space-y-4">
                   <ImageRenderer title="打开新话题" src="/打开新话题.png" className="w-full aspect-square" />
                   <p className="text-xs md:text-sm font-mono tracking-wider text-center text-white/40 uppercase italic">打开新话题</p>
                </div>
                <div className="space-y-4">
                   <ImageRenderer title="查看未出勤" src="/查看未出勤.png" className="w-full aspect-square" />
                   <p className="text-xs md:text-sm font-mono tracking-wider text-center text-white/40 uppercase italic">查看未出勤</p>
                </div>
                <div className="space-y-4">
                   <ImageRenderer title="团队周报详情" src="/团队周报详情.png" className="w-full aspect-square" />
                   <p className="text-xs md:text-sm font-mono tracking-wider text-center text-white/40 uppercase italic">团队周报详情</p>
                </div>
                <div className="space-y-4">
                   <ImageRenderer title="团队考勤日报" src="/团队考勤日报.png" className="w-full aspect-square" />
                   <p className="text-xs md:text-sm font-mono tracking-wider text-center text-white/40 uppercase italic">团队考勤日报</p>
                </div>
                <div className="space-y-4">
                   <ImageRenderer title="推送考勤周报" src="/推送考勤周报.png" className="w-full aspect-square" />
                   <p className="text-xs md:text-sm font-mono tracking-wider text-center text-white/40 uppercase italic">推送考勤周报</p>
                </div>
                <div className="space-y-4">
                   <ImageRenderer title="个人考勤日历" src="/个人考勤日历.png" className="w-full aspect-square" />
                   <p className="text-xs md:text-sm font-mono tracking-wider text-center text-white/40 uppercase italic">个人考勤日历</p>
                </div>
                <div className="space-y-4">
                   <ImageRenderer title="订阅每日推送" src="/订阅每日推送.png" className="w-full aspect-square" />
                   <p className="text-xs md:text-sm font-mono tracking-wider text-center text-white/40 uppercase italic">订阅每日推送</p>
                </div>
                <div className="space-y-4">
                   <ImageRenderer title="团队月报详情" src="/团队月报详情.png" className="w-full aspect-square" />
                   <p className="text-xs md:text-sm font-mono tracking-wider text-center text-white/40 uppercase italic">团队月报详情</p>
                </div>
                <div className="space-y-4">
                   <ImageRenderer title="团队考勤日报1" src="/团队考勤日报1.png" className="w-full aspect-square" />
                   <p className="text-xs md:text-sm font-mono tracking-wider text-center text-white/40 uppercase italic">团队考勤日报1</p>
                </div>
             </div>
          </div>
        </section>

        {/* 核心功能模块深度拆解 */}
        <section className="relative px-6 md:px-10 lg:px-24 py-32 lg:py-80">
          <div className="max-w-7xl mx-auto space-y-40 lg:space-y-60">
             <div className="space-y-10">
                <span className="text-xs font-mono tracking-[0.8em] text-white/20 uppercase">Deep Dive</span>
                <h2 className="text-4xl md:text-5xl lg:text-7xl font-medium tracking-tighter">核心功能模块深度拆解</h2>
             </div>

             {/* 1. 团队假勤数据可视化看板 */}
             <div className="space-y-20">
                <div className="flex items-center gap-6">
                   <div className="h-[1px] w-12 bg-blue-500/30" />
                   <h3 className="text-3xl font-medium">1. 团队假勤数据可视化看板</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                   <div className="space-y-4">
                      <ImageRenderer title="本月请假天数排名1" src="/本月请假天数排名1.png" className="w-full h-80" />
                      <p className="text-xs md:text-sm font-mono tracking-wider text-blue-400 uppercase italic">本月请假天数排名1</p>
                   </div>
                   <div className="space-y-4">
                      <ImageRenderer title="本月假期类型占比2" src="/本月假期类型占比2.png" className="w-full h-80" />
                      <p className="text-xs md:text-sm font-mono tracking-wider text-blue-400 uppercase italic">本月假期类型占比2</p>
                   </div>
                   <div className="space-y-4">
                      <ImageRenderer title="团队近一周加班情况2" src="/团队近一周加班情况2.png" className="w-full h-80" />
                      <p className="text-xs md:text-sm font-mono tracking-wider text-blue-400 uppercase italic">团队近一周加班情况2</p>
                   </div>
                   <div className="space-y-4">
                      <ImageRenderer title="近两周请假时长对比2" src="/近两周请假时长对比2.png" className="w-full h-80" />
                      <p className="text-xs md:text-sm font-mono tracking-wider text-blue-400 uppercase italic">近两周请假时长对比2</p>
                   </div>
                </div>
             </div>

             {/* 2. AI 智能识别与休假申请生成流 */}
             <div className="space-y-20">
                <div className="flex items-center gap-6">
                   <div className="h-[1px] w-12 bg-blue-500/30" />
                   <h3 className="text-3xl font-medium">2. AI 智能识别与休假申请生成流</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                   <div className="space-y-4">
                      <ImageRenderer title="识别可能的休假信息2" src="/识别可能的休假信息2.png" className="w-full aspect-square" />
                      <p className="text-xs md:text-sm font-mono tracking-wider text-blue-400 uppercase italic">识别可能的休假信息2</p>
                   </div>
                   <div className="space-y-4">
                      <ImageRenderer title="信息加载与处理2" src="/信息加载与处理2.png" className="w-full aspect-square" />
                      <p className="text-xs md:text-sm font-mono tracking-wider text-blue-400 uppercase italic">信息加载与处理2</p>
                   </div>
                   <div className="space-y-4">
                      <ImageRenderer title="智能生成休假申请2" src="/智能生成休假申请2.png" className="w-full aspect-square" />
                      <p className="text-xs md:text-sm font-mono tracking-wider text-blue-400 uppercase italic">智能生成休假申请2</p>
                   </div>
                </div>
             </div>

             {/* 3. 个人与团队假勤意图查询 */}
             <div className="space-y-20">
                <div className="flex items-center gap-6">
                   <div className="h-[1px] w-12 bg-blue-500/30" />
                   <h3 className="text-3xl font-medium">3. 个人与团队假勤意图查询</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                   <div className="space-y-4">
                      <ImageRenderer title="查看个人假期余额2" src="/查看个人假期余额2.png" className="w-full h-80" />
                      <p className="text-xs md:text-sm font-mono tracking-wider text-blue-400 uppercase italic">查看个人假期余额2</p>
                   </div>
                   <div className="space-y-4">
                      <ImageRenderer title="查询团队成员的请假记录2" src="/查询团队成员的请假记录2.png" className="w-full h-80" />
                      <p className="text-xs md:text-sm font-mono tracking-wider text-blue-400 uppercase italic">查询团队成员的请假记录2</p>
                   </div>
                </div>
             </div>

             {/* 4. 自然语言配置复杂加班规则 */}
             <div className="space-y-20">
                <div className="flex items-center gap-6">
                   <div className="h-[1px] w-12 bg-blue-500/30" />
                   <h3 className="text-3xl font-medium">4. 自然语言配置复杂加班规则（HR端提效）</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                   <div className="space-y-4">
                      <ImageRenderer title="新建一个加班规则2" src="/新建一个加班规则2.png" className="w-full aspect-square" />
                      <p className="text-xs md:text-sm font-mono tracking-wider text-blue-400 uppercase italic">新建一个加班规则2</p>
                   </div>
                   <div className="space-y-4">
                      <ImageRenderer title="点击智能填写2" src="/点击智能填写2.png" className="w-full aspect-square" />
                      <p className="text-xs md:text-sm font-mono tracking-wider text-blue-400 uppercase italic">点击智能填写2</p>
                   </div>
                   <div className="space-y-4">
                      <ImageRenderer title="用自然语言描述加班规则2" src="/用自然语言描述加班规则2.png" className="w-full aspect-square" />
                      <p className="text-xs md:text-sm font-mono tracking-wider text-blue-400 uppercase italic">用自然语言描述加班规则2</p>
                   </div>
                </div>
             </div>
          </div>
        </section>

        {/* 多模态界面扩展与暗黑模式 */}
        <section className="relative px-6 md:px-10 lg:px-24 py-32 lg:py-80 bg-black">
          <div className="max-w-7xl mx-auto space-y-24 lg:space-y-32">
             <div className="space-y-10 text-center">
                <span className="text-xs font-mono tracking-[0.8em] text-white/20 uppercase">Night Flow</span>
                <h2 className="text-4xl md:text-5xl lg:text-7xl font-medium tracking-tighter">多模态界面扩展与暗黑模式</h2>
                <p className="text-xl text-white/40 max-w-3xl mx-auto leading-relaxed font-light">
                   为了适配用户在长时段、夜间或高关注度状态下的数据监控需求，系统全面重构并适配了“暗黑模式”界面，确保视觉舒适度与信息层级的一致性。
                </p>
             </div>
             <div className="flex justify-center">
                <ImageRenderer 
                   title="暗黑模式全屏画布" 
                   src="/暗黑2.png" 
                   className="w-full max-w-6xl aspect-[16/9] shadow-[0_0_200px_rgba(0,0,0,1)]" 
                />
             </div>
             <p className="text-xs md:text-sm font-mono tracking-wider text-center text-white/40 uppercase italic">暗黑模式全屏画布</p>
          </div>
        </section>

        {/* 手机移动多端协同界面响应式展示 */}
        <section className="relative px-6 md:px-10 lg:px-24 py-32 lg:py-80">
          <div className="max-w-7xl mx-auto space-y-24 lg:space-y-32">
             <div className="space-y-10">
                <span className="text-xs font-mono tracking-[0.8em] text-white/20 uppercase">Mobile Experience</span>
                <h2 className="text-4xl md:text-5xl lg:text-7xl font-medium tracking-tighter">手机移动多端协同界面响应式展示</h2>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                <div className="space-y-6">
                   <ImageRenderer title="移动端假勤主页" src="/o1.png" className="w-full aspect-[4/5]" />
                   <p className="text-xs md:text-sm font-mono tracking-wider text-center text-white/40 uppercase italic">移动端假勤主页</p>
                </div>
                <div className="space-y-6">
                   <ImageRenderer title="移动端 AI 交互流" src="/o2.png" className="w-full aspect-[4/5]" />
                   <p className="text-xs md:text-sm font-mono tracking-wider text-center text-white/40 uppercase italic">移动端 AI 交互流</p>
                </div>
                <div className="space-y-6">
                   <ImageRenderer title="移动端审批与详情" src="/o3.png" className="w-full aspect-[4/5]" />
                   <p className="text-xs md:text-sm font-mono tracking-wider text-center text-white/40 uppercase italic">移动端审批与详情</p>
                </div>
             </div>
          </div>
        </section>

        {/* FINAL EXIT */}
        <section className="relative h-[80vh] flex flex-col items-center justify-center border-t border-white/5 overflow-hidden">
          <div className="absolute inset-0 aurora-glow opacity-10 pointer-events-none" />
          <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
             className="relative z-10 flex flex-col items-center gap-16 group cursor-pointer"
             onClick={() => navigate('/')}
          >
            <div className="text-[10px] font-mono tracking-[2em] text-white/20 uppercase ml-12">Transmission Terminal</div>
            <h2 className="text-4xl md:text-8xl font-medium tracking-tighter text-white/10 group-hover:text-white transition-all duration-1000 text-center px-10">
              Exit Exploration
            </h2>
            <div className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center glass group-hover:border-blue-400/40 group-hover:scale-110 transition-all duration-700">
               <ArrowLeft className="w-6 h-6 rotate-180" />
            </div>
          </motion.div>
        </section>

        {/* FOOTER */}
        <footer className="px-10 py-32 border-t border-white/5 bg-black flex flex-col items-center gap-10">
           <div className="flex items-center gap-6">
              <div className="h-[1px] w-12 bg-white/10" />
              <div className="text-[10px] font-mono tracking-[1.5em] text-white/20 uppercase">Lark AI Attendance Exploration Suite</div>
              <div className="h-[1px] w-12 bg-white/10" />
           </div>
           <div className="text-[10px] font-mono text-white/5 uppercase text-center max-w-lg leading-relaxed tracking-[0.2em]">
              This project is part of the Lark AI Workspace Exploration. All visual assets and strategic frameworks are proprietary property of the respectve design systems. / 2026
           </div>
        </footer>
      </div>
    );
  }

  if (project.id === 'medical-ai') {
    return (
      <div ref={containerRef} className="relative min-h-screen bg-[#050505] text-white selection:bg-cyan-500/30 font-sans overflow-x-hidden">
        {/* Background Effects */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-cyan-600/5 blur-[200px] rounded-full" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/5 blur-[200px] rounded-full" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.1] contrast-150 brightness-50 mix-blend-overlay" />
        </div>

        {/* Progress Bar */}
        <motion.div 
          className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-600 origin-left z-[1001]"
          style={{ scaleX: smoothProgress }}
        />

        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-[1000] px-10 py-10 md:px-16 flex justify-between items-center mix-blend-difference">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate('/')}
            className="flex items-center gap-4 group"
          >
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center glass group-hover:border-white/40 transition-all duration-700">
               <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-2" />
            </div>
            <span className="text-[10px] font-mono tracking-[0.6em] uppercase opacity-40 group-hover:opacity-100 transition-opacity">Portfolio</span>
          </motion.button>
          <div className="hidden md:flex items-center gap-10">
             <div className="text-[10px] font-mono tracking-[0.4em] text-white/20 uppercase">Project / Detail / RareCare AI</div>
          </div>
        </nav>

        {/* 项目介绍与设计哲学 */}
        <section className="relative min-h-screen flex items-center px-6 md:px-10 lg:px-24 pt-40 pb-20 overflow-hidden">
          <div className="max-w-7xl mx-auto w-full space-y-16 lg:space-y-24">
             <motion.div
               initial={{ opacity: 0, y: 80 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
               className="space-y-12 text-center"
             >
                <div className="space-y-6">
                   <span className="text-xs font-mono tracking-[1em] text-cyan-400 uppercase">Design Philosophy</span>
                   <h1 className="text-5xl md:text-6xl lg:text-8xl font-medium tracking-tighter leading-none">项目介绍与设计哲学</h1>
                   <div className="pt-10">
                     <h2 className="text-3xl md:text-5xl font-medium text-white/90">[项目名称] 罕见病大模型 AI 辅助诊断平台 —— RareCare</h2>
                   </div>
                </div>

                <div className="max-w-4xl mx-auto space-y-8">
                  <div className="p-10 rounded-[3rem] glass border border-white/5 bg-white/[0.02] relative">
                    <div className="absolute -top-4 -left-4 w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.5)]">
                      <Brain className="w-6 h-6 text-black" />
                    </div>
                    <p className="text-xl md:text-2xl text-white/70 font-light leading-relaxed italic">
                      “罕见病 App 的设计本质不是做一个普通的 B 端或 C 端工具，而是利用设计策略在‘AI 幻觉’与‘医疗严肃性’之间建立信任天平。架构图定义了医学信息的‘数字容器’，而流程图则定义了生命安全的‘流转方向’。通过这套线上线下一体化的服务蓝图，我们将高深的大模型技术转化为具备温度、科学严谨的医疗助手。这也是该专项能够切实缩短罕见病‘初筛确诊周期’的底层设计逻辑所在。”
                    </p>
                  </div>
                </div>
             </motion.div>
          </div>
        </section>

        {/* 核心定位与多模态诊断流重构 */}
        <section className="relative px-6 md:px-10 lg:px-24 py-32 lg:py-60 border-y border-white/5 bg-white/[0.01]">
          <div className="max-w-7xl mx-auto space-y-24 lg:space-y-32">
             <div className="space-y-12">
                <span className="text-xs font-mono tracking-[0.8em] text-white/20 uppercase">Architecture & Workflow</span>
                <h2 className="text-4xl md:text-5xl lg:text-7xl font-medium tracking-tighter leading-none">核心定位与多模态诊断流重构</h2>
                <div className="flex items-center gap-6">
                   <div className="h-[1px] w-12 bg-cyan-500/30" />
                   <h3 className="text-2xl md:text-3xl font-medium text-white/60">核心定位：面向医患双端的长尾医学知识降维与多模态 AI 辅助诊断流重构</h3>
                </div>
             </div>

             <div className="space-y-20">
                <div className="space-y-10">
                   <p className="text-[10px] font-mono tracking-widest text-center text-white/20 uppercase mb-4">全景架构与诊断流画布展示</p>
                   <ImageRenderer 
                      title="面向医患双端的长尾医学知识降维与多模态 AI 辅助诊断流重构" 
                      src="/核心定位：面向医患双端的长尾医学知识降维与多模态 AI 辅助诊断流重构-1.png" 
                      className="w-full aspect-[21/9]" 
                   />
                </div>

                <div className="grid lg:grid-cols-2 gap-24">
                   <div className="space-y-12">
                      <div className="space-y-6">
                         <h4 className="text-2xl font-medium flex items-center gap-4">
                            <Layers className="w-6 h-6 text-cyan-400" />
                            1. 罕见病全景信息架构
                         </h4>
                         <p className="text-lg text-white/50 leading-relaxed font-light">
                           针对长尾、高密度的医学非结构化数据，构建高内聚、低耦合的“医患协同”移动端信息矩阵。
                           “罕见病领域面临的核心挑战是‘信息孤岛’与‘认知鸿沟’。为了打破这一壁垒，我搭建了这套具备高度包容性的系统架构，并划分出四大核心信息层级：
                         </p>
                      </div>
                      <div className="space-y-8 pl-10 border-l border-white/5">
                         <div className="space-y-2">
                            <h5 className="text-lg font-medium text-white/90">多模态诊断视窗</h5>
                            <p className="text-sm text-white/40 leading-relaxed">全局的主行动点。支持患者/医生进行症状多维录入，作为整个 AI 诊断工作流的‘核心入口’。</p>
                         </div>
                         <div className="space-y-2">
                            <h5 className="text-lg font-medium text-white/90">智能病例资产库</h5>
                            <p className="text-sm text-white/40 leading-relaxed">结构化封装患者的历史检查报告、基因检测结果与表型特征，将其从物理碎纸片转化为大模型可读的‘标准医学资产’。</p>
                         </div>
                         <div className="space-y-2">
                            <h5 className="text-lg font-medium text-white/90">知识联邦中枢</h5>
                            <p className="text-sm text-white/40 leading-relaxed">对接全球罕见病知识库（如 Orphanet、OMIM）。通过将极度长尾、晦涩的医学文献转化为可检索、可视化的知识图谱，降低信息获取成本。</p>
                         </div>
                         <div className="space-y-2">
                            <h5 className="text-lg font-medium text-white/90">多学科 AI 社区</h5>
                            <p className="text-sm text-white/40 leading-relaxed">建立跨区域的‘AI 预会诊’与专家联动模块，实现医疗资源的数字化下沉。</p>
                         </div>
                      </div>
                   </div>

                   <div className="space-y-12">
                      <div className="space-y-6">
                         <h4 className="text-2xl font-medium flex items-center gap-4">
                            <Activity className="w-6 h-6 text-cyan-400" />
                            2. 痛点捕捉与大模型交互闭环
                         </h4>
                         <p className="text-lg text-white/50 leading-relaxed font-light italic">
                           “用户（无论是患者还是基层医生）面对罕见病时，最大的痛苦在于‘无法用准确的医学术语描述症状’。”
                         </p>
                      </div>
                      <div className="glass p-10 rounded-[3rem] border border-white/5 space-y-10">
                         <div className="space-y-4">
                            <h5 className="text-lg font-medium text-white/90 flex items-center gap-3">
                               <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                               旅程前期（输入端）
                            </h5>
                            <p className="text-sm text-white/40 leading-relaxed">设计支持‘图片（病征部位/检查报告） + 口语化语音述说 + 既往史勾选’的多模态混合输入。通过前置的交互容器降低用户的表达门槛。</p>
                         </div>
                         <div className="space-y-4">
                            <h5 className="text-lg font-medium text-white/90 flex items-center gap-3">
                               <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                               旅程中期（算法解析）
                            </h5>
                            <p className="text-sm text-white/40 leading-relaxed">底层接入医学微调大模型（Medical LLM）。将用户的‘大白话’和报告图片反向转化为标准的‘HPO标签（人类表型术语）’，在界面中以‘AI 智能摘要’的形式向用户确认，构建‘交互的透明度与知知情权’。</p>
                         </div>
                         <div className="space-y-4">
                            <h5 className="text-lg font-medium text-white/90 flex items-center gap-3">
                               <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                               旅程后期（价值转化）
                            </h5>
                            <p className="text-sm text-white/40 leading-relaxed">最终输出‘罕见病风险分筛报告’，并一键推荐对口的垂直医院与专家专家会诊，彻底终结患者盲目就医的死循环。</p>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </section>

        {/* 情感共鸣与群体互助社区 */}
        <section className="relative px-6 md:px-10 lg:px-24 py-32 lg:py-80">
          <div className="max-w-7xl mx-auto space-y-32 lg:space-y-40">
             <div className="space-y-12">
                <span className="text-xs font-mono tracking-[0.8em] text-white/20 uppercase">Community & Support</span>
                <h2 className="text-4xl md:text-5xl lg:text-7xl font-medium tracking-tighter text-white">情感共鸣与群体互助社区</h2>
                <h3 className="text-2xl md:text-3xl font-medium text-white/60">核心交互机制：从“冷冰冰的诊断”到“有温度的数字化社会学支持”</h3>
                <p className="text-xl text-white/40 max-w-4xl leading-relaxed italic border-l-2 border-white/10 pl-10 font-light">
                  “确诊或疑似罕见病对任何家庭都是毁灭性的打击，心理支持与经验互助在诊后链路中至关重要。我在此设计了 **‘互助纽带流（Peer-Support Streams）’**：
                  <br /><br />
                  采用温和、克制的无边框微卡片（Borderless Cards）承载‘病友心路’。通过群体归属感消解患者的孤独与恐惧；卡片外层提取关键的‘用药经验’、‘康复打卡’、‘日常护理’标签（Tags）。这种结构化的信息流包装，让患者及家属能够以最低的认知负载，获取最真实的民间长尾康复经验。”
                </p>
             </div>

             <div className="space-y-10">
                <p className="text-[10px] font-mono tracking-widest text-center text-white/20 uppercase mb-4 text-white">互助社区精美图文排版</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                   <div className="space-y-6">
                      <ImageRenderer title="情感共鸣与群体互助社区 1" src="/情感共鸣与群体互助社区 1.png" className="w-full aspect-[4/5]" />
                      <p className="text-xs font-mono tracking-widest text-center text-white/20 uppercase italic mt-4">互助纽带流模块 01</p>
                   </div>
                   <div className="space-y-6">
                      <ImageRenderer title="情感共鸣与群体互助社区 2" src="/情感共鸣与群体互助社区 2.png" className="w-full aspect-[4/5]" />
                      <p className="text-xs font-mono tracking-widest text-center text-white/20 uppercase italic mt-4">互助纽带流模块 02</p>
                   </div>
                   <div className="space-y-6">
                      <ImageRenderer title="情感共鸣与群体互助社区 3" src="/情感共鸣与群体互助社区 3.png" className="w-full aspect-[4/5]" />
                      <p className="text-xs font-mono tracking-widest text-center text-white/20 uppercase italic mt-4">互助纽带流模块 03</p>
                   </div>
                </div>
             </div>
          </div>
        </section>

        {/* 医疗资源中心模块 */}
        <section className="relative px-6 md:px-10 lg:px-24 py-32 lg:py-80 bg-white/[0.01]">
          <div className="max-w-7xl mx-auto space-y-24 lg:space-y-32">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                <div className="space-y-12">
                   <span className="text-xs font-mono tracking-[0.8em] text-white/20 uppercase">Resource Hub</span>
                   <h2 className="text-4xl md:text-5xl lg:text-7xl font-medium tracking-tighter text-white">医疗资源中心模块</h2>
                   <p className="text-xl text-white/40 leading-relaxed font-light italic bg-cyan-500/5 p-10 rounded-[3rem] border border-cyan-500/10">
                     本界面作为 RareCare 平台连接线下医疗实体的桥梁，旨在通过高效的直达链路，提供权威、精准的垂直医院与罕见病专家资源匹配，打通从线上 AI 筛查到线下精准转诊的最后一公里。
                   </p>
                </div>
                <div className="relative group">
                   <div className="absolute inset-x-0 -top-20 -bottom-20 bg-cyan-500/5 blur-[120px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                   <ImageRenderer 
                      title="医疗资源中心模块" 
                      src="/医疗资源中心模块.png" 
                      className="w-full aspect-[4/5] shadow-2xl relative z-10" 
                   />
                </div>
             </div>
          </div>
        </section>

        {/* 个人学习 Dashboard */}
        <section className="relative px-6 md:px-10 lg:px-24 py-32 lg:py-80">
          <div className="max-w-7xl mx-auto space-y-32 lg:space-y-40">
             <div className="space-y-12">
                <span className="text-xs font-mono tracking-[0.8em] text-white/20 uppercase">Learning Dashboard</span>
                <h2 className="text-4xl md:text-5xl lg:text-7xl font-medium tracking-tighter">个人学习 Dashboard</h2>
                <p className="text-xl text-white/40 max-w-3xl leading-relaxed font-light">
                   本界面为 RareCare AI 的个人学习 Dashboard，主要用于整合用户的学习进度、知识掌握情况与待完成任务。设计通过数据可视化与模块化卡片布局，将复杂的医疗培训信息转化为更直观、更易理解的操作体验。
                </p>
             </div>

             <div className="grid lg:grid-cols-12 gap-20 items-start">
                <div className="lg:col-span-4 space-y-12">
                   <div className="space-y-10">
                      <div className="space-y-4">
                         <h4 className="text-xl font-medium text-white/90">Knowledge Progression（学习进度）</h4>
                         <p className="text-base text-white/40 leading-relaxed font-light">首页重点展示该模块，以百分比与环形图形式强化用户反馈感知，帮助用户快速了解当前学习状态。</p>
                      </div>
                      <div className="space-y-4">
                         <h4 className="text-xl font-medium text-white/90">多元工作台组件</h4>
                         <p className="text-base text-white/40 leading-relaxed font-light">有机结合了“待办任务”、“Rumor Interceptor（谣言识别提醒）”以及“AI 助手入口”，构建了一个兼具学习、信息筛选与智能辅助的医疗知识工作台。</p>
                      </div>
                   </div>
                   <div className="p-10 rounded-[3rem] glass border border-white/5 space-y-6">
                      <div className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase">Design Principle</div>
                      <p className="text-sm text-white/40 leading-relaxed font-light">
                        整体视觉延续医疗场景中的低干扰设计原则，通过大面积留白、浅色背景与高对比重点信息，提升专业感与长期使用舒适度。
                      </p>
                   </div>
                </div>
                <div className="lg:col-span-8">
                   <p className="text-[10px] font-mono tracking-widest text-center text-white/20 uppercase mb-6">知识工作台交互主画布呈现</p>
                   <ImageRenderer 
                      title="个人学习 Dashboard" 
                      src="/个人学习 Dashboard.png" 
                      className="w-full aspect-[16/10] shadow-[0_0_120px_rgba(0,0,0,0.4)]" 
                   />
                </div>
             </div>
          </div>
        </section>

        {/* FINAL EXIT */}
        <section className="relative h-[80vh] flex flex-col items-center justify-center border-t border-white/5 overflow-hidden">
          <div className="absolute inset-0 aurora-glow opacity-10 pointer-events-none" />
          <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
             className="relative z-10 flex flex-col items-center gap-16 group cursor-pointer"
             onClick={() => navigate('/')}
          >
            <div className="text-[10px] font-mono tracking-[2em] text-white/20 uppercase ml-12">Transmission Terminal</div>
            <h2 className="text-4xl md:text-8xl font-medium tracking-tighter text-white/10 group-hover:text-white transition-all duration-1000 text-center px-10 text-white shadow-cyan-500/20 drop-shadow-2xl">
              Exit RareCare Case
            </h2>
            <div className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center glass group-hover:border-cyan-400/40 group-hover:scale-110 transition-all duration-700">
               <ArrowLeft className="w-6 h-6 rotate-180" />
            </div>
          </motion.div>
        </section>

        {/* FOOTER */}
        <footer className="px-10 py-32 border-t border-white/5 bg-black flex flex-col items-center gap-10">
           <div className="flex items-center gap-6">
              <div className="h-[1px] w-12 bg-white/10" />
              <div className="text-[10px] font-mono tracking-[1.5em] text-white/20 uppercase">RareCare AI Diagnostic Suite</div>
              <div className="h-[1px] w-12 bg-white/10" />
           </div>
           <div className="text-[10px] font-mono text-white/5 uppercase text-center max-w-lg leading-relaxed tracking-[0.2em]">
              This project is part of the Medical AI Design Evolution. All visual assets and strategic frameworks are proprietary property of the respectve design systems. / 2026
           </div>
        </footer>
      </div>
    );
  }

  if (project.id === 'vanke-crm') {
    return (
      <div ref={containerRef} className="relative min-h-screen bg-[#0A0A0A] text-white selection:bg-red-500/30 font-sans overflow-x-hidden">
        {/* Background Effects */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-red-600/5 blur-[200px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-zinc-800/10 blur-[200px] rounded-full" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.1] contrast-150 brightness-50 mix-blend-overlay" />
        </div>

        {/* Progress Bar */}
        <motion.div 
          className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-red-600 to-red-400 origin-left z-[1001]"
          style={{ scaleX: smoothProgress }}
        />

        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-[1000] px-10 py-10 md:px-16 flex justify-between items-center mix-blend-difference">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate('/')}
            className="flex items-center gap-4 group"
          >
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center glass group-hover:border-red-500/40 transition-all duration-700">
               <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-2" />
            </div>
            <span className="text-[10px] font-mono tracking-[0.6em] uppercase opacity-40 group-hover:opacity-100 transition-opacity">Portfolio</span>
          </motion.button>
          <div className="hidden md:flex items-center gap-10">
             <div className="text-[10px] font-mono tracking-[0.4em] text-white/20 uppercase">Vanke Marketing / CRM Case Study</div>
          </div>
        </nav>

        {/* 项目背景与一线洞察 */}
        <section className="relative min-h-[80vh] flex items-center px-6 md:px-10 lg:px-24 pt-40 pb-20">
          <div className="max-w-7xl mx-auto w-full space-y-16 lg:space-y-24">
             <motion.div
               initial={{ opacity: 0, y: 80 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
               className="space-y-16"
             >
                <div className="space-y-8">
                   <div className="flex items-center gap-4">
                     <span className="text-xs font-mono tracking-[1em] text-red-500 uppercase">Project Background</span>
                   </div>
                   <h1 className="text-5xl md:text-6xl lg:text-8xl font-medium tracking-tighter leading-[0.9] text-white">
                      项目背景与一线洞察
                   </h1>
                </div>

                <div className="grid lg:grid-cols-12 gap-16 items-start">
                   <div className="lg:col-span-8">
                      <p className="text-xl md:text-2xl text-white/80 leading-[1.6] font-light tracking-tight italic border-l-4 border-red-600 pl-10">
                        “深入一线售楼处进行 Shadowing (影子观察)，针对置业顾问移动端录入难的问题，设计‘卡片式任务看板’并引入语音智能填表功能，使人均跟进效率提升 20%。”
                      </p>
                   </div>
                   <div className="lg:col-span-4 hidden lg:block">
                      <div className="glass p-10 rounded-[3rem] border border-white/5 space-y-6">
                        <UserCheck className="w-8 h-8 text-red-500" />
                        <div className="space-y-2">
                           <div className="text-[9px] font-mono tracking-widest text-white/40 uppercase">Methodology</div>
                           <div className="text-lg font-medium leading-tight text-white/90">User Shadowing & Contextual Inquiry</div>
                        </div>
                      </div>
                   </div>
                </div>
             </motion.div>
          </div>
        </section>

        {/* 营销工作台数字化体验 */}
        <section className="relative px-6 md:px-10 lg:px-24 py-32 lg:py-60 border-y border-white/5 bg-white/[0.01]">
          <div className="max-w-7xl mx-auto space-y-24 lg:space-y-32">
             <div className="space-y-12">
                <span className="text-xs font-mono tracking-[0.8em] text-white/20 uppercase">Digital Dashboard</span>
                <h2 className="text-4xl md:text-5xl lg:text-7xl font-medium tracking-tighter leading-none text-white">营销工作台数字化体验</h2>
                <h3 className="text-2xl md:text-3xl font-medium text-white/60">核心定位：基于一线销售场景洞察的“游戏化”闯关式 CRM 与语音智能填表系统</h3>
             </div>

             <div className="space-y-20">
                <div className="space-y-10">
                   <p className="text-[10px] font-mono tracking-widest text-center text-white/20 uppercase mb-4">营销工作台全局画布呈现</p>
                   <ImageRenderer 
                      title="营销工作台全局画布呈现" 
                      src="/【工作台首页（Dashboard）】，.png" 
                      className="w-full aspect-[21/9] shadow-2xl" 
                   />
                </div>

                <div className="grid lg:grid-cols-2 gap-24">
                   <div className="space-y-10">
                      <h4 className="text-2xl font-medium flex items-center gap-4 text-white">
                         <Layout className="w-6 h-6 text-red-500" />
                         1. 营销工作台全景视图
                      </h4>
                      <p className="text-lg text-white/50 leading-relaxed font-light">
                        摆脱传统 B 端 CRM 复杂的表格堆砌，专位置业顾问（销售）打造的高效移动数字化座舱。
                      </p>
                      <div className="space-y-8 pl-10 border-l border-white/5">
                         <div className="space-y-3">
                            <h5 className="text-lg font-medium text-white/90">今日待办与业绩战况</h5>
                            <p className="text-sm text-white/40 leading-relaxed italic">
                              <sub>针对置业顾问高频离座、手忙脚乱的售楼处真实场景，顶部采用大字报式设计聚合‘今日带看、今日回访、待签约’三大漏斗核心指标。中间引入‘本月战绩（5月）TOP 3 战队’荣誉看板，将高压的销售指标转化为‘具象化的竞争推力’。通过‘距离销冠还差 2 套签约’的动态话术，强力驱动销售的主观能动性。</sub>
                            </p>
                         </div>
                         <div className="space-y-3">
                            <h5 className="text-lg font-medium text-white/90">实时市况映射</h5>
                            <p className="text-sm text-white/40 leading-relaxed italic">
                              <sub>在工作台中嵌入实时住宅指数与商办热度波动。这一设计不仅为销售提供即时的市场体感，更作为其与客户面对面沟通过程中的‘权威话术底牌’，缩短了一线人员获取市场数据流的路径。</sub>
                            </p>
                         </div>
                      </div>
                   </div>
                   <div className="flex items-center justify-center lg:pt-20">
                      <div className="p-12 rounded-[3.5rem] bg-red-600/5 border border-red-600/10 backdrop-blur-3xl text-center space-y-6">
                         <Zap className="w-10 h-10 text-red-500 mx-auto" />
                         <p className="text-2xl font-medium tracking-tight text-white/90">Efficiency Evolution</p>
                         <p className="text-sm text-white/40 font-light leading-relaxed max-w-xs">
                           From management tool to frontline empowerment.
                         </p>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </section>

        {/* 闯关式 CRM 任务列表 */}
        <section className="relative px-6 md:px-10 lg:px-24 py-32 lg:py-80 bg-black">
          <div className="max-w-7xl mx-auto space-y-32 lg:space-y-40">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                <div className="space-y-12">
                   <span className="text-xs font-mono tracking-[0.8em] text-white/20 uppercase">Interaction Logic</span>
                   <h2 className="text-4xl md:text-5xl lg:text-7xl font-medium tracking-tighter text-white">闯关式 CRM 任务列表</h2>
                   <h3 className="text-2xl md:text-3xl font-medium text-white/60">“闯关式” CRM 任务流设计</h3>
                   <div className="space-y-10">
                      <div className="space-y-4">
                         <h4 className="text-xl font-medium text-white/90">原子化客户闯关卡片</h4>
                         <p className="text-sm text-white/40 leading-relaxed italic">
                           <sub>基于‘影子观察法’对万科售楼处的实地调研，我发现销售极易遗忘跟进节点。因此，我重构了客户列表，将其定义为‘闯关式 CRM’。每位客户（张先生、王女士、陈总）都是一个独立的任务卡片，标签化透出‘住宅/写字楼/商铺’属性。界面引入了精准的时间倒计时心智（如：倒计时 30 分钟、今日 18:00 前联系、签约倒计时 2 天），将模糊的‘今天记得联系’进化为像素级的‘时间强催促’，大幅降低了客源流失率。</sub>
                         </p>
                      </div>
                      <div className="space-y-4">
                         <h4 className="text-xl font-medium text-white/90">右下角全局悬浮语音球</h4>
                         <p className="text-sm text-white/40 leading-relaxed italic">
                           <sub>我设计了全局高亮红色麦克风悬浮球。带看一结束，销售只需右滑或微抬大拇指即可触发录音。通过对接后台的语音识别（ASR）与命名实体识别（NER）算法，销售说出一句‘张先生想买三居室，预算500万’，系统便可自动将数据分类并填入表单，彻底终结了销售回到办公室补录数据的痛苦，达成真正的‘场景化降本增效’。</sub>
                         </p>
                         <p className="text-sm text-white/40 leading-relaxed italic">
                           <sub>传统的 CRM 系统往往是站在管理层视角对销售进行‘数据监控’，导致一线员工极其排斥。而万科‘助办’的设计完全从一线置业顾问的真实双脚和双手出发。通过‘去通关’（去通关 &gt;）这一极具行动感和游戏化的微文案设计，配合高饱和度的品牌红与安全圆角，消解了销售面对 B端软件时的戒备心，让工具真正服务于业务增长。</sub>
                         </p>
                      </div>
                   </div>
                </div>
                <div className="space-y-10">
                   <p className="text-[10px] font-mono tracking-widest text-center text-white/20 uppercase mb-4 text-white">任务列表及语音录入交互图</p>
                   <ImageRenderer title="任务列表及语音录入交互图" src="/闯关式 CRM 任务列表.png" className="w-full aspect-[4/5] shadow-2xl" />
                   <div className="glass p-10 rounded-[3rem] border border-red-500/20 bg-red-500/5">
                      <div className="text-[10px] font-mono tracking-widest text-red-500 uppercase mb-4">UX Outcome</div>
                      <p className="text-sm text-white/60 leading-relaxed font-light italic">
                         <sub>“通过引入‘闯关式倒计时提醒’与‘全局语音智能填表’交互，万科试点售楼处的客户跟进延误率降低了 42%。置业顾问日均数据录入耗时从 45 分钟缩短至 8 分钟。这一设计真正实现了数字化工具对一线生产力的赋能，并成功在万科营销生态内完成了全量落地。”</sub>
                      </p>
                   </div>
                </div>
             </div>
          </div>
        </section>

        {/* 置业顾问数字化身份中心 */}
        <section className="relative px-6 md:px-10 lg:px-24 py-32 lg:py-80 bg-white/[0.01]">
          <div className="max-w-7xl mx-auto space-y-32 lg:space-y-40">
             <div className="space-y-12">
                <span className="text-xs font-mono tracking-[0.8em] text-white/20 uppercase">Digital Identity</span>
                <h2 className="text-4xl md:text-5xl lg:text-7xl font-medium tracking-tighter text-white leading-none">置业顾问数字化身份中心</h2>
                <h3 className="text-2xl md:text-3xl font-medium text-white/60">核心定位：基于荣誉驱动与角色解耦的置业顾问数字化身份中心</h3>
             </div>

             <div className="grid lg:grid-cols-2 gap-24 items-center">
                <div className="space-y-12">
                   <div className="space-y-8">
                      <h4 className="text-2xl font-medium flex items-center gap-4 text-white">
                         <span className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center font-mono text-[10px]">01</span>
                         1. 置业顾问数字化身份卡片
                      </h4>
                      <p className="text-lg text-white/60 font-light leading-relaxed">
                        在移动端 B 端设计中，个人中心往往被忽视。本专项打破常规，将其重构为激发一线员工自驱力的“荣誉中枢”。
                      </p>
                   </div>
                   <div className="space-y-10 pl-16 border-l border-white/5">
                      <div className="space-y-3">
                         <h5 className="text-lg font-medium text-white/90">等级与身份认同体系</h5>
                         <p className="text-sm text-white/40 leading-relaxed italic">
                           <sub>设计建立了极具归属感的身份标识。通过‘认证置业顾问’与‘高级置业顾问’的双重标签，在视觉上进行精细的色值区分。头像右下角悬浮的‘红色奖杯徽章’，不仅是一种装饰，更是对销售专业能力的显性背书。整个页面采用圆润的微质感卡片封装（Card-based Encapsulation），将枯燥的岗位信息转化为极极具情感价值的‘个人数字化资产’。</sub>
                         </p>
                      </div>
                      <div className="space-y-3">
                         <h5 className="text-lg font-medium text-white/90">荣誉激励机制与长期自驱</h5>
                         <p className="text-sm text-white/40 leading-relaxed italic">
                           <sub>底部设计了暗色高对比的‘万科·月度星级勋章’模块。系统自动抓取底层的带看数据，并转化为‘已连续 3 个月达成带看指标！您是团队的核心支柱’等正向情感话术。这种‘成就即时反馈（Instant Feedback UI）’的设计，精准踩中了一线销售渴望被团队认可的心理痛点，以无形的设计心智代替了冷冰冰的管理考核。</sub>
                         </p>
                      </div>
                   </div>
                </div>
                <div className="grid grid-cols-2 gap-8">
                   <div className="space-y-4">
                      <ImageRenderer title="身份中心资产图 01" src="/核心定位：基于荣誉驱动与角色解耦的置业顾问数字化身份中心1.png" className="w-full aspect-[4/5]" />
                      <p className="text-[9px] font-mono tracking-widest text-center text-white/20 uppercase italic">身份中心资产图 01</p>
                   </div>
                   <div className="space-y-4">
                      <ImageRenderer title="身份中心资产图 02" src="/核心定位：基于荣誉驱动与角色解耦的置业顾问数字化身份中心2.png" className="w-full aspect-[4/5]" />
                      <p className="text-[9px] font-mono tracking-widest text-center text-white/20 uppercase italic">身份中心资产图 02</p>
                   </div>
                </div>
             </div>
          </div>
        </section>

        {/* 智能化客户画像与 AI 话术推荐系统 */}
        <section className="relative px-6 md:px-10 lg:px-24 py-32 lg:py-80">
          <div className="max-w-7xl mx-auto space-y-32 lg:space-y-40">
             <div className="space-y-12">
                <span className="text-xs font-mono tracking-[0.8em] text-white/20 uppercase">AI Intelligence</span>
                <h2 className="text-4xl md:text-5xl lg:text-7xl font-medium tracking-tighter text-white leading-none">智能化客户画像与 AI 话术推荐系统</h2>
                <h3 className="text-2xl md:text-3xl font-medium text-white/60">核心定位：基于 ASR 语义抽提的智能化客户画像与销冠级 AI 话术推荐系统</h3>
             </div>

             <div className="space-y-24">
                <p className="text-[10px] font-mono tracking-widest text-center text-white/20 uppercase mb-8 text-white">客户画像与智能 Copilot 交互全链路</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                   <div className="space-y-6">
                      <ImageRenderer title="智能化看板 01" src="/核心定位：基于 ASR 语义抽提的智能化客户画像与销冠级 AI 话术推荐系统1.png" className="w-full aspect-[4/5]" />
                      <p className="text-[9px] font-mono tracking-widest text-center text-white/20 uppercase mt-4 italic">智能化看板 01</p>
                   </div>
                   <div className="space-y-6">
                      <ImageRenderer title="智能化看板 02" src="/核心定位：基于 ASR 语义抽提的智能化客户画像与销冠级 AI 话术推荐系统2.png" className="w-full aspect-[4/5]" />
                      <p className="text-[9px] font-mono tracking-widest text-center text-white/20 uppercase mt-4 italic">智能化看板 02</p>
                   </div>
                   <div className="space-y-6">
                      <ImageRenderer title="智能化看板 03" src="/核心定位：基于 ASR 语义抽提的智能化客户画像与销冠级 AI 话术推荐系统3.png" className="w-full aspect-[4/5]" />
                      <p className="text-[9px] font-mono tracking-widest text-center text-white/20 uppercase mt-4 italic">智能化看板 03</p>
                   </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-24 pt-20">
                   <div className="space-y-12">
                      <div className="space-y-4">
                         <h4 className="text-xl font-medium text-white/90">1. 智能化客户档案管理</h4>
                         <p className="text-base text-white/60 font-light leading-relaxed">将销售通过语音录入的非结构化叙述，自动转化为像素级的结构化客户画像，构建动态生命周期流。</p>
                      </div>
                      <div className="space-y-10 pl-16 border-l border-white/5">
                         <div className="space-y-3">
                            <h5 className="text-lg font-medium text-white/90">AI 语义画像抽提</h5>
                            <p className="text-sm text-white/40 leading-relaxed italic">
                              <sub>拒绝让销售在移动端进行复杂的表单勾选。当销售使用全局语音球输入带看总结后，后台 NLP 引擎自动进行实体识别，并在‘AI 置业简报’模块中实时结构化输出：意向物业（住宅）、需求规格（120平三居室）、财务预算（500万）。系统更进一步抽提核心词汇，打出‘学区 + 地铁’的黄金意图标签，让销售在二次回访前，0 秒心智唤醒客户的核心痛点。</sub>
                            </p>
                         </div>
                         <div className="space-y-3">
                            <h5 className="text-lg font-medium text-white/90">动态跟进纪要与时间线</h5>
                            <p className="text-sm text-white/40 leading-relaxed italic">
                              <sub>在‘跟进记事簿’的设计中，引入了以时间为轴的线性容器。精确记录‘2026-05-14 10:30 客户对采光非常满意...’。通过极简的输入框与‘确认录入轨迹’的主行动按键（Action Button），降低销售的文本输入负荷，确保客户生命周期（LTV）数据的颗粒度与连续性。</sub>
                            </p>
                         </div>
                      </div>
                   </div>
                   <div className="space-y-12">
                      <div className="space-y-4">
                         <h4 className="text-xl font-medium text-white/90">2. 房源参数与 AI 销冠说服话术</h4>
                         <p className="text-base text-white/60 font-light leading-relaxed">将冷冰冰的“楼盘字典”升级为具备实时博弈能力的“智能销售副驾（Copilot）”。</p>
                      </div>
                      <div className="space-y-10 pl-16 border-l border-white/5">
                         <div className="space-y-3">
                            <h5 className="text-lg font-medium text-white/40">全维物理参数看板</h5>
                            <p className="text-sm text-white/40 leading-relaxed italic">
                              <sub>在‘万科理想城·云端雅居’的详情页设计中，顶部采用大面积全景意向图（Hero Image）建立情感共鸣，中段通过大字报‘488万起’和‘125㎡’锁定核心物理指标。将楼层（中/33层）、朝向（南北通透）、装修标准（万科标精）进行网格化原子对齐，确保销售在面对客户质询时能够进行秒级的信息视觉检索。</sub>
                            </p>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </section>

        {/* 业务全景与核心界面扩展 */}
        <section className="relative px-6 md:px-10 lg:px-24 py-32 lg:py-80 bg-[#050505]">
          <div className="max-w-7xl mx-auto space-y-32 lg:space-y-40">
             <div className="space-y-12">
                <span className="text-xs font-mono tracking-[0.8em] text-white/20 uppercase">Business Expansion</span>
                <h2 className="text-4xl md:text-5xl lg:text-7xl font-medium tracking-tighter text-white leading-none">业务全景与核心界面扩展</h2>
                <p className="text-xl text-white/40 max-w-4xl leading-relaxed font-light">
                   为了提供完整、丝滑的移动端闭环体验，本章节集中展示万科营销工作台的其他核心业务存量管理界面。整体排版注重留白与画面的舒适度，降低用户的视觉干扰。
                </p>
             </div>

             <div className="space-y-12">
                <p className="text-[10px] font-mono tracking-widest text-center text-white/20 uppercase mb-8 text-white">业务拓展存量界面矩阵</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                   <div className="space-y-4">
                      <ImageRenderer title="存量管理视图 01" src="/存量1.png" className="w-full aspect-[4/5]" />
                      <p className="text-[9px] font-mono tracking-widest text-center text-white/20 uppercase italic">存量视图 01</p>
                   </div>
                   <div className="space-y-4">
                      <ImageRenderer title="存量管理视图 02" src="/存量2.png" className="w-full aspect-[4/5]" />
                      <p className="text-[9px] font-mono tracking-widest text-center text-white/20 uppercase italic">存量视图 02</p>
                   </div>
                   <div className="space-y-4">
                      <ImageRenderer title="存量管理视图 03" src="/存量3.png" className="w-full aspect-[4/5]" />
                      <p className="text-[9px] font-mono tracking-widest text-center text-white/20 uppercase italic">存量视图 03</p>
                   </div>
                   <div className="space-y-4">
                      <ImageRenderer title="存量管理视图 04" src="/存量4.png" className="w-full aspect-[4/5]" />
                      <p className="text-[9px] font-mono tracking-widest text-center text-white/20 uppercase italic">存量视图 04</p>
                   </div>
                </div>
             </div>
          </div>
        </section>

        {/* FINAL EXIT */}
        <section className="relative h-[80vh] flex flex-col items-center justify-center border-t border-white/5 overflow-hidden">
          <div className="absolute inset-0 aurora-glow opacity-10 pointer-events-none" />
          <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
             className="relative z-10 flex flex-col items-center gap-16 group cursor-pointer"
             onClick={() => navigate('/')}
          >
            <div className="text-[10px] font-mono tracking-[2em] text-white/20 uppercase ml-12">Transmission Terminal</div>
            <h2 className="text-4xl md:text-8xl font-medium tracking-tighter text-white/10 group-hover:text-white transition-all duration-1000 text-center px-10 text-white drop-shadow-2xl">
              Exit Vanke Case
            </h2>
            <div className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center glass group-hover:border-red-500/40 group-hover:scale-110 transition-all duration-700">
               <ArrowLeft className="w-6 h-6 rotate-180" />
            </div>
          </motion.div>
        </section>

        {/* FOOTER */}
        <footer className="px-10 py-32 border-t border-white/5 bg-black flex flex-col items-center gap-10">
           <div className="flex items-center gap-6">
              <div className="h-[1px] w-12 bg-white/10" />
              <div className="text-[10px] font-mono tracking-[1.5em] text-white/20 uppercase">Vanke Digital Marketing Workspace</div>
              <div className="h-[1px] w-12 bg-white/10" />
           </div>
           <div className="text-[10px] font-mono text-white/5 uppercase text-center max-w-lg leading-relaxed tracking-[0.2em]">
              This project is part of the Vanke Enterprise Digital Evolution. All visual assets and strategic frameworks are proprietary property of the respectve design systems. / 2026
           </div>
        </footer>
      </div>
    );
  }

  if (project.id === 'travel-ai') {
    return (
      <div className="relative min-h-screen bg-[#FDFCFB] text-slate-900 selection:bg-emerald-500/10 font-sans overflow-x-hidden">
        {/* Progress Bar */}
        <motion.div 
          className="fixed top-0 left-0 right-0 h-[3px] bg-emerald-500 origin-left z-[1001]"
          style={{ scaleX: smoothProgress }}
        />

        {/* Background Accents */}
        <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
           <div className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] bg-emerald-100/50 blur-[150px] rounded-full" />
           <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-100/30 blur-[150px] rounded-full" />
        </div>

        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-[1000] px-10 py-10 md:px-16 flex justify-between items-center">
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => navigate('/')}
            className="flex items-center gap-4 group"
          >
            <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center bg-white/80 backdrop-blur-md group-hover:border-emerald-500/40 transition-all duration-700 shadow-sm">
               <ArrowLeft className="w-4 h-4 text-slate-600 transition-transform group-hover:-translate-x-2" />
            </div>
            <span className="text-[10px] font-mono tracking-[0.6em] uppercase text-slate-400 group-hover:text-slate-900 transition-colors">YouXing / AI Travel</span>
          </motion.button>
        </nav>

        {/* HERO SECTION */}
        <section className="relative min-h-screen flex flex-col justify-center px-10 md:px-24 pt-40 pb-20">
           <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-12"
              >
                 <div className="space-y-6">
                    <div className="flex items-center gap-4 text-emerald-600">
                       <Sparkles className="w-5 h-5" />
                       <span className="text-xs font-mono tracking-[0.8em] uppercase font-semibold">AI Travel Redefined</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-medium tracking-tighter leading-none text-slate-900">
                      悠行 YouXing
                    </h1>
                    <p className="text-2xl md:text-3xl text-slate-500 font-light leading-snug max-w-xl">
                      让每一次出发，都是一场精准而浪漫的定制旅程。
                    </p>
                 </div>
                 <div className="flex flex-wrap gap-8 py-10 border-t border-slate-100">
                    <div className="space-y-1">
                       <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Project Role</div>
                       <div className="text-sm font-medium">Lead UX/UI Designer</div>
                    </div>
                    <div className="space-y-1">
                       <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Duration</div>
                       <div className="text-sm font-medium">12 Weeks</div>
                    </div>
                    <div className="space-y-1">
                       <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Platform</div>
                       <div className="text-sm font-medium">iOS / Web Application</div>
                    </div>
                 </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                 <ImageRenderer 
                    title="YouXing Homepage" 
                    src="/AI 智能旅行规划工具「悠行」核心首页界面.png" 
                    className="w-full aspect-[4/5] shadow-2xl rounded-[3rem] ring-1 ring-slate-200" 
                 />
              </motion.div>
           </div>
        </section>

        {/* SECTION 1: 核心产品心智 */}
        <section className="relative px-10 md:px-24 py-60 bg-emerald-50/30">
           <div className="max-w-7xl mx-auto space-y-32">
              <div className="text-center space-y-8">
                 <h2 className="text-4xl md:text-6xl font-medium tracking-tighter">极简输入，全局掌控</h2>
                 <p className="text-xl text-slate-500 max-w-3xl mx-auto font-light leading-relaxed">
                    打破传统旅行 App 繁杂的信息流，通过对话式交互与 AI 画板，将原本数天的规划周期缩短至几秒。
                 </p>
              </div>
              <div className="grid md:grid-cols-2 gap-20">
                 <div className="space-y-12">
                    <div className="space-y-4">
                       <h3 className="text-2xl font-medium">景点筛选：从海量到精选</h3>
                       <p className="text-slate-500 font-light leading-relaxed">
                          基于地理围栏与用户偏好的实时计算，AI 自动从千万级 POI 数据中提取最契合的内容。通过卡片堆叠式的筛选交互，让选择变得像刷短视频一样轻松。
                       </p>
                    </div>
                    <ImageRenderer title="景点筛选" src="/景点筛选选择页.png" className="w-full aspect-[4/5] shadow-xl" />
                 </div>
                 <div className="space-y-12 md:pt-40">
                    <div className="space-y-4">
                       <h3 className="text-2xl font-medium">行程结果：毫秒级逻辑闭环</h3>
                       <p className="text-slate-500 font-light leading-relaxed">
                          采用自研的多智能体协作系统，不仅生成行程，还自动考虑了交通拥堵、景区人数与动态开闭园时间，生成真实可用的履约方案。
                       </p>
                    </div>
                    <ImageRenderer title="行程生成" src="/行程结果生成页设计.png" className="w-full aspect-[4/5] shadow-xl" />
                 </div>
              </div>
           </div>
        </section>

        {/* SECTION 2: 多人协同 */}
        <section className="relative px-10 md:px-24 py-80">
           <div className="max-w-7xl mx-auto space-y-40">
              <div className="grid lg:grid-cols-2 gap-24 items-center">
                 <div className="space-y-12">
                    <div className="w-16 h-16 rounded-3xl bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                       <UserCheck className="w-8 h-8" />
                    </div>
                    <div className="space-y-8">
                       <h2 className="text-4xl md:text-7xl font-medium tracking-tighter leading-none">多人投票：<br />终结决策焦虑</h2>
                       <p className="text-xl text-slate-500 font-light leading-relaxed">
                          旅行从来不是一个人的事。我们设计了全新的“多人投票筛选”机制，通过实时的权限控制与权重建议，在快乐的氛围中达成团队共识。
                       </p>
                    </div>
                    <div className="grid grid-cols-2 gap-8 py-10 border-t border-slate-100">
                       <div className="space-y-2">
                          <div className="text-3xl font-medium text-emerald-600">89%</div>
                          <p className="text-xs text-slate-400 uppercase tracking-widest font-mono">Decision Speedup</p>
                       </div>
                       <div className="space-y-2">
                          <div className="text-3xl font-medium text-blue-500">4.9/5</div>
                          <p className="text-xs text-slate-400 uppercase tracking-widest font-mono">User Satisfaction</p>
                       </div>
                    </div>
                 </div>
                 <div className="grid grid-cols-2 gap-8">
                    <ImageRenderer title="多人投票 1" src="/多人投票筛选 & 行程分享页设计1.png" className="w-full aspect-[9/16]" />
                    <ImageRenderer title="多人投票 2" src="/多人投票筛选 & 行程分享页设计2.png" className="w-full aspect-[9/16]" />
                 </div>
              </div>
           </div>
        </section>

        {/* SECTION 3: 配套设施 */}
        <section className="relative px-10 md:px-24 py-80 bg-slate-900 text-white overflow-hidden">
           <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] blend-overlay" />
           <div className="max-w-7xl mx-auto space-y-32">
              <div className="flex flex-col md:flex-row justify-between items-end gap-10">
                 <div className="space-y-8">
                    <span className="text-xs font-mono tracking-[0.8em] text-white/30 uppercase">Infrastructure & Ecosystem</span>
                    <h2 className="text-4xl md:text-7xl font-medium tracking-tighter">住宿与美食：<br />场景化精准推荐</h2>
                 </div>
                 <p className="text-lg text-white/40 max-w-xs font-light leading-relaxed">
                    AI 不仅懂路线，更懂生活。多模态大模型动态匹配最舒适的休憩地与最地道的人间烟火。
                 </p>
              </div>
              <div className="grid md:grid-cols-2 gap-12">
                 <ImageRenderer title="住宿美食 1" src="/住宿 & 美食配套信息页1.png" className="w-full aspect-[16/10] ring-1 ring-white/10" />
                 <ImageRenderer title="住宿美食 2" src="/住宿 & 美食配套信息页2.png" className="w-full aspect-[16/10] ring-1 ring-white/10" />
              </div>
           </div>
        </section>

        {/* SECTION 4: 资产沉淀 */}
        <section className="relative px-10 md:px-24 py-80">
           <div className="max-w-7xl mx-auto space-y-40">
              <div className="grid lg:grid-cols-12 gap-24 items-center">
                 <div className="lg:col-span-4 space-y-12">
                    <div className="space-y-8">
                       <h2 className="text-4xl md:text-6xl font-medium tracking-tighter leading-none">行程夹与长图导出</h2>
                       <p className="text-xl text-slate-500 font-light leading-relaxed">
                          每一次的规划都是独一无二的数字资产。通过精美的长图导出与瀑布流式的行程夹管理，让“悠行”不仅是一个工具，更是你旅行生命周期的记录者。
                       </p>
                    </div>
                    <div className="p-10 rounded-[3rem] bg-emerald-50 border border-emerald-100 space-y-6">
                       <div className="text-[10px] font-mono tracking-widest text-emerald-600 uppercase">Design Insight</div>
                       <p className="text-sm text-slate-600 leading-relaxed font-light italic">
                          “在分享经济时代，我们强化了‘长图导出’的视觉仪式感，让 AI 生成的枯燥列表转化为极具社交属性的精美海报。”
                       </p>
                    </div>
                 </div>
                 <div className="lg:col-span-8 grid grid-cols-2 gap-12">
                    <div className="space-y-8">
                       <ImageRenderer title="我的行程夹" src="/我的行程夹.png" className="w-full aspect-[4/5] shadow-lg" />
                       <p className="text-center text-xs font-mono text-slate-400 uppercase tracking-widest">Itinerary Folder</p>
                    </div>
                    <div className="space-y-8 pt-20">
                       <ImageRenderer title="长图导出" src="/行程长图导出页设计.png" className="w-full aspect-[4/5] shadow-lg" />
                       <p className="text-center text-xs font-mono text-slate-400 uppercase tracking-widest">Social Export</p>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* FINAL EXIT */}
        <section className="relative h-[80vh] flex flex-col items-center justify-center border-t border-slate-100 overflow-hidden">
          <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
             className="relative z-10 flex flex-col items-center gap-16 group cursor-pointer"
             onClick={() => navigate('/')}
          >
            <div className="text-[10px] font-mono tracking-[2em] text-slate-300 uppercase ml-12">Next Destination</div>
            <h2 className="text-4xl md:text-8xl font-medium tracking-tighter text-slate-100 group-hover:text-slate-900 transition-all duration-1000 text-center px-10">
              Back to Home
            </h2>
            <div className="w-20 h-20 rounded-full border border-slate-200 flex items-center justify-center bg-white group-hover:border-emerald-500/40 group-hover:scale-110 transition-all duration-700 shadow-sm">
               <ArrowLeft className="w-6 h-6 text-slate-400 group-hover:text-emerald-500 transition-colors" />
            </div>
          </motion.div>
        </section>

        {/* FOOTER */}
        <footer className="px-10 py-32 border-t border-slate-100 bg-white flex flex-col items-center gap-10">
           <div className="flex items-center gap-6">
              <div className="h-[1px] w-12 bg-slate-100" />
              <div className="text-[10px] font-mono tracking-[1.5em] text-slate-300 uppercase">YouXing AI Travel Systems</div>
              <div className="h-[1px] w-12 bg-slate-100" />
           </div>
           <div className="text-[10px] font-mono text-slate-400 uppercase text-center max-w-lg leading-relaxed tracking-[0.2em]">
              The future of travel is collaborative and intelligent. Crafted for the curious explorer. / 2026
           </div>
        </footer>
      </div>
    );
  }

  if (project.id === 'healthy-app') {
    return (
      <div className="relative min-h-screen bg-[#FDF8FF] text-zinc-900 selection:bg-purple-500/10 font-sans overflow-x-hidden">
        {/* Progress Bar */}
        <motion.div 
          className="fixed top-0 left-0 right-0 h-[3px] bg-purple-500 origin-left z-[1001]"
          style={{ scaleX: smoothProgress }}
        />

        {/* Background Accents */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-100/50 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-100/40 blur-[120px] rounded-full" />
        </div>

        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-[1000] px-10 py-10 md:px-16 flex justify-between items-center">
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => navigate('/')}
            className="flex items-center gap-4 group"
          >
            <div className="w-12 h-12 rounded-full border border-zinc-200 flex items-center justify-center bg-white/80 backdrop-blur-md group-hover:border-purple-500/40 transition-all duration-700 shadow-sm">
               <ArrowLeft className="w-4 h-4 text-zinc-600 transition-transform group-hover:-translate-x-2" />
            </div>
            <span className="text-[10px] font-mono tracking-[0.6em] uppercase text-zinc-400 group-hover:text-purple-600 transition-colors">Portfolio / Healthy Case</span>
          </motion.button>
        </nav>

        {/* Slide 1: Title Slide (品牌启程) */}
        <section className="relative h-screen flex flex-col items-center justify-center px-10 overflow-hidden">
           <div className="absolute inset-0 z-0 opacity-20">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-purple-400/20 via-pink-400/10 to-transparent blur-3xl animate-[spin_20s_linear_infinite]" />
           </div>
           
           <motion.div 
             initial={{ opacity: 0, y: 40 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
             className="relative z-10 text-center space-y-12"
           >
              <div className="flex flex-col items-center gap-6">
                 <div className="w-24 h-24 rounded-3xl bg-purple-500 flex items-center justify-center text-white shadow-2xl shadow-purple-500/30">
                    <Heart className="w-12 h-12 fill-current" />
                 </div>
                 <h1 className="text-8xl md:text-[12rem] font-bold tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-br from-purple-600 to-pink-500">
                   Healthy
                 </h1>
              </div>
              <div className="space-y-4 max-w-4xl mx-auto">
                 <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-zinc-800">
                   全人群、多场景的综合健康运动服务平台
                 </h2>
                 <p className="text-lg md:text-xl text-zinc-400 font-light tracking-wide italic">
                   整合康复、健身与宠物训练的创新生态
                 </p>
              </div>
           </motion.div>

           <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-zinc-300"
            >
              <div className="text-[10px] font-mono tracking-[0.4em] uppercase">Scroll to explore case</div>
              <div className="w-[1px] h-12 bg-gradient-to-b from-purple-500 to-transparent" />
           </motion.div>
        </section>

        {/* Slide 2: Project Overview (项目简介与目标) */}
        <section className="relative px-10 md:px-24 py-60 border-y border-zinc-100 bg-white">
           <div className="max-w-7xl mx-auto space-y-32">
              <div className="grid lg:grid-cols-2 gap-24 items-end">
                 <div className="space-y-10">
                    <span className="text-xs font-mono tracking-[0.8em] text-purple-500 uppercase font-semibold">Project Overview</span>
                    <h3 className="text-4xl md:text-7xl font-medium tracking-tighter text-zinc-900 leading-[1.1]">
                       填补细分人群运动健康需求空白
                    </h3>
                 </div>
                 <p className="text-xl text-zinc-400 font-light leading-relaxed">
                   随着大众健康意识的觉醒，运动需求正从单一的“减脂瘦身”向“全生命周期管理”演进。Healthy 通过场景重塑，旨在构建一个跨物种、全场景的数字健康闭环。
                 </p>
              </div>

              <div className="grid md:grid-cols-4 gap-12">
                 {[
                   { icon: <Activity className="w-6 h-6" />, title: '人群普惠化', desc: '兼顾康复、健身、宠物训练，实现健康服务普惠。' },
                   { icon: <Zap className="w-6 h-6" />, title: '专业轻量化', desc: '降低专业知识门槛，转化易懂界面内容。' },
                   { icon: <Dog className="w-6 h-6" />, title: '视觉情感化', desc: '传递温暖关怀，弱化运动紧绷感，适配温情场景。' },
                   { icon: <Layers className="w-6 h-6" />, title: '架构清晰化', desc: '层级分明，保障多场景操作流畅度。' }
                 ].map((item, idx) => (
                   <div key={idx} className="p-10 rounded-[2.5rem] bg-zinc-50 border border-zinc-100 space-y-6 group hover:bg-white hover:shadow-xl transition-all duration-500">
                      <div className="w-14 h-14 rounded-2xl bg-white border border-zinc-200 flex items-center justify-center text-purple-600 shadow-sm group-hover:scale-110 transition-transform duration-500">
                         {item.icon}
                      </div>
                      <div className="space-y-3">
                         <h4 className="font-medium text-lg">{item.title}</h4>
                         <p className="text-sm text-zinc-500 leading-relaxed font-light">
                           <sub>{item.desc}</sub>
                         </p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </section>

        {/* Slide 3: Visual Design System (视觉系统设计) */}
        <section className="relative px-10 md:px-24 py-80">
           <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-24 items-center">
              <div className="lg:col-span-5 space-y-16">
                 <div className="space-y-8">
                    <span className="text-xs font-mono tracking-[0.8em] text-purple-500 uppercase font-semibold">Visual Design System</span>
                    <h2 className="text-4xl md:text-6xl font-medium tracking-tighter leading-tight text-zinc-900">品牌符号与设计规范</h2>
                 </div>
                 
                 <div className="space-y-12 pl-10 border-l border-purple-200">
                    <div className="space-y-4">
                       <h4 className="text-xl font-medium">LOGO 设计</h4>
                       <p className="text-base text-zinc-500 font-light leading-relaxed italic">
                         <sub>结合「杠铃」与「爱心」，象征健身属性与人文关怀的融合。粉紫撞色，兼具活力与治愈感。</sub>
                       </p>
                    </div>
                    <div className="space-y-4">
                       <h4 className="text-xl font-medium">图标与字体</h4>
                       <p className="text-base text-zinc-500 font-light leading-relaxed italic">
                         <sub>线性简约图标搭配层级清晰的无衬线字体，适配全年龄段视觉舒适度。</sub>
                       </p>
                    </div>
                 </div>

                 <div className="flex gap-4">
                    {[ '#A855F7', '#EC4899', '#3B82F6', '#F59E0B' ].map(color => (
                      <div key={color} className="w-12 h-12 rounded-2xl border-4 border-white shadow-lg" style={{ backgroundColor: color }} />
                    ))}
                 </div>
              </div>
              <div className="lg:col-span-7">
                 <ImageRenderer title="视觉规范" src="/健身.jpg" className="w-full aspect-[4/3] shadow-2xl" />
              </div>
           </div>
        </section>

        {/* Slide 4: Functional Architecture (功能架构图) */}
        <section className="relative px-10 md:px-24 py-80 bg-zinc-900 items-center overflow-hidden">
           <div className="absolute inset-x-0 -top-20 -bottom-20 bg-purple-500/5 blur-[120px] rounded-full" />
           <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-24 items-center">
              <div className="lg:col-span-7 order-2 lg:order-1">
                 <ImageRenderer title="功能架构" src="/健身.jpg" className="w-full aspect-[16/10] shadow-[0_0_80px_rgba(0,0,0,0.5)] border-white/5" />
              </div>
              <div className="lg:col-span-5 space-y-12 order-1 lg:order-2">
                 <div className="space-y-8">
                    <span className="text-xs font-mono tracking-[0.8em] text-purple-400 uppercase font-semibold">Information Architecture</span>
                    <h2 className="text-4xl md:text-6xl font-medium tracking-tighter leading-tight text-white">逻辑严密的数字座舱</h2>
                    <p className="text-xl text-white/40 font-light leading-relaxed">
                       <sub>搭建康复中心、健身训练、宠物服务、个人中心四大核心模块，实现康复指导、定制健身、宠物训练、数据监测、线上咨询等功能全覆盖。</sub>
                    </p>
                 </div>
                 <div className="grid grid-cols-2 gap-8">
                    <div className="p-6 rounded-3xl border border-white/5 bg-white/5 backdrop-blur-md">
                       <div className="text-2xl font-bold text-purple-400">04 CORE</div>
                       <div className="text-[9px] font-mono uppercase tracking-widest text-white/20 mt-1">Modules</div>
                    </div>
                    <div className="p-6 rounded-3xl border border-white/5 bg-white/5 backdrop-blur-md">
                       <div className="text-2xl font-bold text-white">32+ SITES</div>
                       <div className="text-[9px] font-mono uppercase tracking-widest text-white/20 mt-1">Touch Points</div>
                    </div>
                 </div>
              </div>
           </div>
        </section>



        {/* FINAL EXIT */}
        <section className="relative h-[80vh] flex flex-col items-center justify-center border-t border-zinc-100 overflow-hidden bg-white">
          <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
             className="relative z-10 flex flex-col items-center gap-16 group cursor-pointer"
             onClick={() => navigate('/')}
          >
            <div className="text-[10px] font-mono tracking-[2.5em] text-zinc-300 uppercase ml-12">Case Terminal</div>
            <h2 className="text-4xl md:text-[10rem] font-bold tracking-[1.5rem] tracking-tighter text-zinc-100 group-hover:text-purple-600 transition-all duration-1000 text-center px-10">
              EXIT HEALTHY
            </h2>
            <div className="w-20 h-20 rounded-full border border-zinc-200 flex items-center justify-center bg-white group-hover:border-purple-500/40 group-hover:scale-110 transition-all duration-700 shadow-sm">
               <ArrowLeft className="w-6 h-6 text-zinc-400 group-hover:text-purple-500 transition-colors" />
            </div>
          </motion.div>
        </section>

        {/* FOOTER */}
        <footer className="px-10 py-32 border-t border-zinc-100 bg-zinc-50 flex flex-col items-center gap-10">
           <div className="flex items-center gap-6">
              <div className="h-[1px] w-12 bg-zinc-200" />
              <div className="text-[10px] font-mono tracking-[1.5em] text-zinc-300 uppercase italic">Healthy Design Archives</div>
              <div className="h-[1px] w-12 bg-zinc-200" />
           </div>
           <div className="text-[10px] font-mono text-zinc-400 uppercase text-center max-w-lg leading-relaxed tracking-[0.2em] font-light">
              Designing for health means designing for empathy. Every pixel matters when it comes to well-being. / 2026
           </div>
        </footer>
      </div>
    );
  }

  if (project.id === 'tiktok-ai') {
    return (
      <div ref={containerRef} className="relative min-h-screen bg-[#000000] text-white selection:bg-cyan-500/30 font-sans overflow-x-hidden selection:text-white">
        {/* Background */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-600/10 blur-[200px] rounded-full" />
          <div className="absolute bottom-[10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[200px] rounded-full" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.1] contrast-150 brightness-50 mix-blend-overlay" />
        </div>

        {/* Progress */}
        <motion.div 
          className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 origin-left z-[1001]"
          style={{ scaleX: smoothProgress }}
        />

        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-[1000] px-10 py-10 md:px-16 flex justify-between items-center mix-blend-difference">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate('/')}
            className="flex items-center gap-4 group"
          >
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center glass group-hover:border-white/40 transition-all duration-700">
               <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-2" />
            </div>
            <span className="text-[10px] font-mono tracking-[0.6em] uppercase opacity-40 group-hover:opacity-100 transition-opacity">Portfolio</span>
          </motion.button>
          <div className="hidden md:flex items-center gap-10">
             <div className="text-[10px] font-mono tracking-[0.4em] text-white/20 uppercase">Project / Detail / Global AI Diagnostic</div>
          </div>
        </nav>

        {/* 项目介绍 */}
        <section className="relative min-h-screen flex items-center px-6 md:px-10 lg:px-24 py-32 lg:py-40 overflow-hidden">
          <div className="max-w-7xl mx-auto w-full">
             <motion.div
               initial={{ opacity: 0, y: 80 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
               className="space-y-16"
             >
               <div className="space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="h-[1px] w-12 bg-gradient-to-r from-cyan-500 to-transparent" />
                    <span className="text-[10px] font-mono tracking-[0.8em] text-white/40 uppercase">Introduction</span>
                  </div>
                  <h1 className="text-5xl md:text-6xl lg:text-8xl font-medium tracking-tighter leading-[0.9] text-white">
                    项目介绍
                  </h1>
               </div>

               <div className="grid lg:grid-cols-12 gap-16 items-start">
                 <div className="lg:col-span-8 space-y-10">
                   <p className="text-xl md:text-2xl text-white/80 leading-[1.4] font-light tracking-tight">
                     本专项深刻探讨了人工智能（LLM/NLP）如何全面重构跨境电商卖家的数字化履约体验。针对东南亚中小卖家看不懂数据、难以理解长尾 SEO 指标的经营痛点，我通过 “AI 智能副驾（Copilot）” 的设计心智，彻底摒弃了传统 B 端繁琐的数据仪表盘与表单堆砌。
                   </p>
                   <p className="text-xl md:text-2xl text-white/80 leading-[1.4] font-light tracking-tight">
                     设计引入了全新的自适应意图识别与智能化对话诊断层，成功在前端将数据密集型的后端“黑盒系统”降维转化为具备高心理确定性、实时归因、一键生成 SEO 策略的人机协同环境。同时，本专项深度融入 TikTok Shop 全球化设计系统（Design System） 的演进建设，确保了体验机制在跨语种、多市场环境下的精细化、高一致性落地。
                   </p>
                 </div>
                 <div className="lg:col-span-4 hidden lg:block">
                    <div className="glass p-10 rounded-[3rem] border border-white/10 space-y-6 relative overflow-hidden group">
                      <Cpu className="w-8 h-8 text-cyan-400" />
                      <div className="space-y-2">
                        <div className="text-[9px] font-mono tracking-widest text-white/40 uppercase">Core Methodology</div>
                        <div className="text-lg font-medium leading-tight">AI-Native Service Architecture for Global Merchants</div>
                      </div>
                    </div>
                 </div>
               </div>
             </motion.div>
          </div>
        </section>
      {/* 用户调研 */}
      <section className="relative px-6 md:px-10 lg:px-24 py-32 lg:py-60 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-5xl mx-auto space-y-16 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <span className="text-[10px] font-mono tracking-[0.8em] text-white/20 uppercase">User Research</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter">用户调研</h2>
            <p className="text-2xl md:text-3xl text-white/70 leading-[1.4] font-light tracking-tight max-w-4xl mx-auto">
              随着电商出海的数量增多，除了电商公司，更多个体户选择电商创业，电商运营会夹杂着对于数据的不理解，为了解决这一痛点，该体验的设计理念是“人工智能作为运营副驾驶”，将传统卖家工作流的复杂性简化为直观且以人为本的交互。
            </p>
          </motion.div>
        </div>
      </section>

      {/* 用户画像 */}
      <section className="relative px-6 md:px-10 lg:px-24 py-32 lg:py-60">
        <div className="max-w-7xl mx-auto space-y-20">
           <div className="space-y-8">
             <span className="text-[10px] font-mono tracking-[0.8em] text-white/20 uppercase">Persona Profile</span>
             <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter">用户画像</h2>
           </div>
           <ImageRenderer title="Target User Persona" src="/user-persona.png" className="w-full aspect-[21/9] shadow-inner" />
        </div>
      </section>

      {/* 用户旅程图 */}
      <section className="relative px-6 md:px-10 lg:px-24 py-32 lg:py-60 bg-[#050505]">
        <div className="max-w-7xl mx-auto space-y-20">
           <div className="flex flex-col md:flex-row justify-between items-end gap-10">
              <div className="space-y-8">
                <span className="text-[10px] font-mono tracking-[0.8em] text-white/20 uppercase">Journey Mapping</span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter">用户旅程图</h2>
              </div>
              <div className="text-[9px] font-mono tracking-[0.5em] text-white/20 uppercase mb-4">Experiential Flow Visualization</div>
           </div>
           <ImageRenderer title="User Journey Ecosystem" src="/用户旅程图1.png" className="w-full aspect-[16/7] shadow-2xl" />
        </div>
      </section>

      {/* 交互亮点与 AI 逻辑 */}
      <section className="relative px-6 md:px-10 lg:px-24 py-32 lg:py-60">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div className="space-y-16 lg:space-y-24">
            <div className="space-y-10">
               <span className="text-[10px] font-mono tracking-[0.8em] text-white/20 uppercase">Logic & Interaction</span>
               <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter leading-none">交互亮点与 AI 逻辑</h2>
            </div>
            
            <div className="space-y-16 lg:space-y-24">
               {/* 1. 界面总览 */}
               <div className="space-y-12">
                  <div className="space-y-6">
                     <h3 className="text-2xl font-medium text-white/40 flex items-center gap-6">
                       <span className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center font-mono text-[10px]">01</span>
                       界面总览 (Final UI Overview)
                     </h3>
                     <p className="text-lg text-white/80 leading-relaxed font-light pl-16">
                       这张图展示的是 AI 诊断中心的核心控制台，它是整个卖家经营链路的“大脑”。
                     </p>
                  </div>
                  <div className="space-y-12 pl-16 border-l border-white/5">
                     <div className="space-y-4">
                        <h4 className="text-xl font-medium text-white/90">AI 执行摘要 (AI Executive Summary)：</h4>
                        <p className="text-base text-white/50 leading-relaxed font-light">
                          “拒绝海量数据堆砌，通过 LLM（大语言模型） 对全店多维数据进行语义化抽提。将复杂的月收入、转化率等非结构化数据转化为直观的‘经营诊断语’，直接指出流量利用率不足的底层。”
                        </p>
                     </div>
                     <div className="space-y-4">
                        <h4 className="text-xl font-medium text-white/90">本土化运营洞察 (Localized Insights)</h4>
                        <p className="text-base text-white/50 leading-relaxed font-light">
                          “针对东南亚细分市场的复杂性，设计了具备本土化意识（Market-Aware）的策略引擎。系统能自动识别印尼免运费、菲律宾发薪日等大促节点，动态生成适配当地搜索习惯的 SEO 建议。”
                        </p>
                     </div>
                  </div>
               </div>

               {/* 2. 交互亮点 */}
               <div className="space-y-12">
                  <div className="space-y-6">
                     <h3 className="text-2xl font-medium text-white/40 flex items-center gap-6">
                       <span className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center font-mono text-[10px]">02</span>
                       交互亮点与 AI 逻辑 (Interaction Highlights)
                     </h3>
                  </div>
                  <div className="space-y-12 pl-16 border-l border-white/5">
                     <div className="space-y-4">
                        <h4 className="text-xl font-medium text-white/90">策略卡片设计 (Actionable Strategy Cards)：</h4>
                        <p className="text-base text-white/50 leading-relaxed font-light">
                          通过优先级（Priority）标签引导卖家关注核心任务。界面不仅提供建议，更通过 “优化逻辑详情” 展示了 SEO 评分提升 15% 的量化预估，将 AI 的“黑盒”决策透明化。
                        </p>
                     </div>
                     <div className="space-y-4">
                        <h4 className="text-xl font-medium text-white/90">一键优化 (Seamless Execution)：</h4>
                        <p className="text-base text-white/50 leading-relaxed font-light">
                          设计原则： “最简操作路径（The Shortest Path to Success）”。通过 Before/After 的强对比视图，降低卖家的心理门槛。配合‘一键优化’功能，将复杂的 SEO 修改耗时从 30 分钟降至秒级，极大提升了中小型卖家的运营人效。”
                        </p>
                     </div>
                     <div className="space-y-4">
                        <h4 className="text-xl font-medium text-white/90">从“数据看板”到“诊断引擎”：</h4>
                        <p className="text-base text-white/50 leading-relaxed font-light">
                          “传统的 B 端后台往往面临‘信息过载’。我通过 AI 诊断中心实现了从 ‘用户找问题’ 到 ‘AI 推方案’ 的范式转移。通过渐进式披露（Progressive Disclosure），确保界面在信息密度与易用性之间达到动态平衡。”
                        </p>
                     </div>
                  </div>
               </div>
            </div>
          </div>
          <div className="sticky top-40">
             <ImageRenderer title="AI Diagnostic Interface" src="/交互亮点与 AI 逻辑1.png" className="aspect-[3/4] shadow-[0_0_100px_rgba(0,0,0,0.6)]" />
          </div>
        </div>
      </section>

      {/* 经营全景看板 */}
      <section className="relative px-6 md:px-10 lg:px-24 py-32 lg:py-60 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto space-y-24 lg:space-y-32">
           <div className="space-y-8">
             <span className="text-[10px] font-mono tracking-[0.8em] text-white/20 uppercase">Business Intelligence</span>
             <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter">经营全景看板</h2>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start">
              <div className="lg:col-span-4 space-y-12">
                 <div className="glass p-10 rounded-[3rem] border border-white/5 space-y-6">
                    <h3 className="text-xl font-medium">核心定位</h3>
                    <p className="text-base text-white/60 font-light leading-relaxed">
                       多维经营数据的可视化降维与风险自动化识别。通过高度聚合的仪表盘，为全球卖家提供即时、透明的业务健康度检测。
                    </p>
                 </div>
                 <div className="space-y-10 pl-4">
                    <div className="space-y-3">
                       <h4 className="text-lg font-medium text-white/90 flex items-center gap-4">
                          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                          Research Insight
                       </h4>
                       <p className="text-sm text-white/40 leading-relaxed">
                          在对 20 位头部卖家的 Shadowing 调研中，发现 85% 的用户无法快速从原始报表中提取决策。
                       </p>
                    </div>
                    <div className="space-y-3">
                       <h4 className="text-lg font-medium text-white/90">核心指标监控</h4>
                       <p className="text-sm text-white/40 leading-relaxed">
                          对总营收、转化率、访客数进行实时环比对比，建立直观的经营反馈闭环。
                       </p>
                    </div>
                    <div className="space-y-3">
                       <h4 className="text-lg font-medium text-white/90">全球销售表现与类目分布</h4>
                       <p className="text-sm text-white/40 leading-relaxed">
                          利用地理空间可视化，呈现东南亚各国的销售贡献权重及品类健康度。
                       </p>
                    </div>
                    <div className="space-y-3">
                       <h4 className="text-lg font-medium text-white/90 flex items-center gap-4">
                          <TrendingUp className="w-4 h-4 text-purple-400" />
                          趋势分析与风险预警
                       </h4>
                       <p className="text-sm text-white/40 leading-relaxed">
                          实时对齐流量增长与营收转化的动态关联，从海量数据中打捞异常。
                       </p>
                    </div>
                    <div className="space-y-4 border-t border-white/5 pt-8">
                       <h5 className="text-[10px] font-mono tracking-widest text-white/20 uppercase">Composite Features</h5>
                       <ul className="space-y-2 text-[12px] text-white/30 list-disc list-inside">
                          <li>复合趋势分析与 Y 轴精度调试</li>
                          <li>自动化风险因子识别与红区告警</li>
                          <li>信息层级的优先级管理 (Less is More)</li>
                       </ul>
                    </div>
                 </div>
              </div>
              <div className="lg:col-span-8">
                 <ImageRenderer title="Global Dashboard Console" src="/经营全景看板1.png" className="aspect-[16/9] shadow-2xl" />
              </div>
           </div>
        </div>
      </section>

      {/* 品牌资产聚合与服务质量 */}
      <section className="relative px-6 md:px-10 lg:px-24 py-32 lg:py-60">
        <div className="max-w-7xl mx-auto space-y-24 lg:space-y-32">
           <div className="space-y-10">
             <span className="text-[10px] font-mono tracking-[0.8em] text-white/20 uppercase">Brand & Reliability</span>
             <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter leading-[1.1] max-w-4xl">
               品牌资产聚合与服务质量（SLA）的数字化度量
             </h2>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <div className="space-y-12">
                 <div className="space-y-8">
                    <h3 className="text-2xl font-medium">核心定位</h3>
                    <p className="text-lg text-white/70 font-light leading-relaxed">
                       品牌资产聚合与服务质量（SLA）的数字化度量。通过结构化的信息布局，强化卖家的全球化品牌心智。
                    </p>
                 </div>
                 <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-3">
                       <h4 className="text-lg font-medium text-white/90">品牌身份与资产中心</h4>
                       <p className="text-xs text-white/40 leading-relaxed">
                          建立极具辨识度的全球认证卖家标识体系。通过核心视觉区隔锚定市场层级。
                       </p>
                    </div>
                    <div className="space-y-3">
                       <h4 className="text-lg font-medium text-white/90">店铺状态实时监控</h4>
                       <p className="text-xs text-white/40 leading-relaxed">
                          利用色彩语义化状态标签，提供稳定的经营体感，降低复杂决策的心理压力。
                       </p>
                    </div>
                    <div className="space-y-3">
                       <h4 className="text-lg font-medium text-white/90">关键服务指标可视化</h4>
                       <p className="text-xs text-white/40 leading-relaxed">
                          将“聊聊回复率”与“履约效率”提升至一级，作为卖家竞争力的核心抽象。
                       </p>
                    </div>
                    <div className="space-y-3">
                       <h4 className="text-lg font-medium text-white/90">健康度状态评估</h4>
                       <p className="text-xs text-white/40 leading-relaxed">
                          实现“从数字化到语意化”的演进，将复杂指标聚合成直观的健康等级结论。
                       </p>
                    </div>
                 </div>
                 <div className="p-8 rounded-[2.5rem] glass border border-white/10 flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                       <Eye className="w-5 h-5 text-pink-400" />
                       <h5 className="font-medium text-sm">B 端设计的“温度感”</h5>
                    </div>
                    <p className="text-xs text-white/40 font-light italic leading-relaxed">
                       “引入更具颗粒度的卡片式布局与呼吸感微动效。通过对 Card-based UI 的网格化控制，确保了信息密度的平衡（Design Principle）。”
                    </p>
                 </div>
              </div>
              <ImageRenderer 
                 title="Brand & Service Metrics" 
                 src="/品牌资产聚合与服务质量（SLA）的数字化度量.png" 
                 className="aspect-[4/5] shadow-2xl" 
              />
           </div>
        </div>
      </section>

      {/* 区域市场情报与 AI 助手 */}
      <section className="relative px-6 md:px-10 lg:px-24 py-32 lg:py-60">
        <div className="max-w-7xl mx-auto space-y-24 lg:space-y-32">
           <div className="space-y-8">
             <span className="text-[10px] font-mono tracking-[0.8em] text-white/20 uppercase">Growth Engine</span>
             <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter">区域市场情报与 AI 助手</h2>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start">
              <div className="lg:col-span-7">
                 <ImageRenderer title="Market Intel Console" src="/区域市场情报1.png" className="aspect-[16/10] shadow-[0_0_120px_rgba(0,0,0,0.4)]" />
              </div>
              <div className="lg:col-span-5 space-y-12">
                 <div className="space-y-10">
                    <div className="space-y-6">
                       <h3 className="text-2xl font-medium flex items-center gap-6">
                          <Globe className="w-6 h-6 text-cyan-400" />
                          区域市场情报
                       </h3>
                       <p className="text-lg text-white/70 font-light leading-relaxed">
                          针对东南亚各细分市场建立实时情建模。将宏观市场波动转化为量化的百分比增长提示，帮助卖家精准识别市场风口。
                       </p>
                    </div>
                    <div className="space-y-10 pl-8 border-l border-white/5">
                       <div className="space-y-3">
                          <h4 className="text-lg font-medium text-white/90">市场热度实时映射</h4>
                          <p className="text-sm text-white/40 leading-relaxed font-light">
                             全天候观测区域搜索热词与流量趋势。AI 将杂乱的实时数据映射为直观的热力分布与热度波段。
                          </p>
                       </div>
                       <div className="space-y-3">
                          <h4 className="text-lg font-medium text-white/90">策略中心与 AI 经营助手</h4>
                          <p className="text-sm text-white/40 leading-relaxed font-light">
                             基于社交洞察的情报引擎，自动捕捉节点并推送“达人合作与爆款潜力挖掘”的差异化经营策略。
                          </p>
                       </div>
                       <div className="space-y-3">
                          <h4 className="text-lg font-medium text-white/90 flex items-center gap-4">
                             <MessageSquare className="w-4 h-4 text-cyan-400" />
                             对话式 AI 经营助手
                          </h4>
                          <p className="text-sm text-white/40 leading-relaxed font-light">
                             从“被动呈现”到“主动应答”。具备上下文感知的 Copilot 能识别竞争态势并提供快捷指令，将复杂决策降维至对话级。
                          </p>
                       </div>
                       <div className="space-y-3">
                          <h4 className="text-lg font-medium text-white/90">模块化策略卡片</h4>
                          <p className="text-sm text-white/40 leading-relaxed font-light">
                             采用模块化策略，每张卡片承载一个核心动作，彻底解决传统 B 端界面的“策略丛林”与信息闭塞。
                          </p>
                       </div>
                    </div>
                 </div>
                 <div className="glass p-10 rounded-[3rem] border border-cyan-500/10 bg-cyan-500/5 space-y-6 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8">
                       <Zap className="w-6 h-6 text-cyan-400 animate-pulse" />
                    </div>
                    <div className="text-[9px] font-mono tracking-widest text-cyan-400 uppercase">Business Impact</div>
                    <div className="space-y-3">
                       <div className="text-3xl font-medium tracking-tighter">Growth +22%</div>
                       <p className="text-[13px] text-cyan-400/60 leading-relaxed">
                          试点商家“爆款转化率”平均提升 22%，后台停留深度增加 15%，显著提升经营决策的科学性与执行效率。
                       </p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* 移动端界面展示 */}
      <section className="relative px-6 md:px-10 lg:px-24 py-32 lg:py-60">
        <div className="max-w-7xl mx-auto space-y-24 lg:space-y-32">
           <div className="space-y-8 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              <div className="space-y-6">
                <span className="text-[10px] font-mono tracking-[0.8em] text-white/20 uppercase">Mobile Experience</span>
                <h2 className="text-4xl md:text-5xl lg:text-7xl font-medium tracking-tighter leading-none">移动端界面展示</h2>
              </div>
              <div className="text-[10px] font-mono tracking-widest text-white/20 uppercase max-w-xs leading-relaxed text-right">
                Immersive Mobile Showcase with Spatial Depth & Editorial Precision
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="md:col-span-2 md:row-span-2">
                <ImageRenderer title="Mobile Overview" src="/mobile 1.png" className="w-full aspect-square md:aspect-auto h-full" />
              </div>
              <div className="md:col-span-1">
                <ImageRenderer title="AI Insights" src="/mobile 2.png" className="w-full aspect-[4/5]" />
              </div>
              <div className="md:col-span-1">
                <ImageRenderer title="Market Intel" src="/mobile 3.png" className="w-full aspect-[4/5]" />
              </div>
              <div className="md:col-span-1">
                <ImageRenderer title="Dashboard" src="/mobile 4.png" className="w-full aspect-[4/5]" />
              </div>
              <div className="md:col-span-1">
                <ImageRenderer title="Optimization" src="/mobile 5.png" className="w-full aspect-[4/5]" />
              </div>
              <div className="md:col-span-1">
                <ImageRenderer title="Seller Hub" src="/mobile6.png" className="w-full aspect-[4/5]" />
              </div>
              <div className="md:col-span-2">
                <ImageRenderer title="Sales Stats" src="/mobile 7.png" className="w-full aspect-[2/1]" />
              </div>
              <div className="md:col-span-1">
                <ImageRenderer title="AI Chat" src="/mobile8.png" className="w-full aspect-[4/5]" />
              </div>
           </div>
        </div>
      </section>

      {/* FINAL EXIT */}
      <section className="relative h-[80vh] flex flex-col items-center justify-center border-t border-white/5 overflow-hidden">
        <div className="absolute inset-0 aurora-glow opacity-10 pointer-events-none" />
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
           className="relative z-10 flex flex-col items-center gap-16 group cursor-pointer"
           onClick={() => navigate('/')}
        >
          <div className="text-[10px] font-mono tracking-[2em] text-white/20 uppercase ml-12">Transmission Terminal</div>
          <h2 className="text-4xl md:text-8xl font-medium tracking-tighter text-white/10 group-hover:text-white transition-all duration-1000 text-center px-10">
            Exit Case Study
          </h2>
          <div className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center glass group-hover:border-cyan-400/40 group-hover:scale-110 transition-all duration-700">
             <ArrowLeft className="w-6 h-6 rotate-180" />
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="px-10 py-32 border-t border-white/5 bg-black flex flex-col items-center gap-10">
         <div className="flex items-center gap-6">
            <div className="h-[1px] w-12 bg-white/10" />
            <div className="text-[10px] font-mono tracking-[1.5em] text-white/20 uppercase">TikTok Global AI Diagnostic Center</div>
            <div className="h-[1px] w-12 bg-white/10" />
         </div>
         <div className="text-[10px] font-mono text-white/5 uppercase text-center max-w-lg leading-relaxed tracking-[0.2em]">
            This project is part of the TikTok Shop Global Design Evolution. All visual assets and strategic frameworks are proprietary property of the respective design systems. / 2026
         </div>
      </footer>
    </div>
  );
  }

  return (
    <div className="min-h-screen bg-black text-white p-20 flex flex-col items-center justify-center">
      <h1 className="text-2xl mb-8">Case study for "{project.title}" is under construction.</h1>
      <button onClick={() => navigate('/')} className="px-6 py-3 glass rounded-full border border-white/10 hover:border-white/30 transition-colors">Return to Home</button>
    </div>
  );
};
