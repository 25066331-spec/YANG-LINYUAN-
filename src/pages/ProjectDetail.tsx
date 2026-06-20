import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'motion/react';
import { projects } from '../data/projects';
import { ArrowLeft, Sparkles, Brain, Activity, Search, Globe, Cpu, MessageSquare, TrendingUp, Zap, Eye, MousePointer2, ShieldCheck, Layers, UserCheck, Layout, Heart, Shield, Dumbbell, Dog, Sun, Moon, Gauge, Key, Battery, Gamepad2, Compass, RefreshCw, Car, HelpCircle, ShieldAlert } from 'lucide-react';

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

  // Shared state declarations for new premium interactive mockups (declared at top level)
  const [activeCharacter, setActiveCharacter] = React.useState('helena');
  const [fateGameTheme, setFateGameTheme] = React.useState('dark'); // 'dark' | 'light'
  const [selectedOre, setSelectedOre] = React.useState('透光原石');
  
  const [cabinTemp, setCabinTemp] = React.useState(24);
  const [energyLevel, setEnergyLevel] = React.useState(85);
  const [injoyHmiScreen, setInjoyHmiScreen] = React.useState('map'); // 'map' | 'audio' | 'parking' | 'diagnostics'
  const [activeNotification, setActiveNotification] = React.useState('weather_alert'); // 'weather_alert' | 'air_quality' | 'charging'

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
                          “拒绝海量数据堆砌，通过 LLM（大语言模型） 对全店多维数据进行语义化抽提。将复杂的月收入、转化率等非结构化数据转化为直观的‘经营诊断语’，直接指出流量利用率不足的底层原因。”
                        </p>
                     </div>
                  </div>
               </div>
            </div>
          </div>
          
          <div className="lg:sticky lg:top-24">
            <ImageRenderer 
              title="AI 诊断中心核心主页" 
              src="/【工作台首页（Dashboard）】，.png" 
              className="w-full aspect-[16/10] shadow-[0_0_80px_rgba(0,0,0,0.8)] border border-white/10"
            />
            <p className="text-[10px] font-mono text-white/40 mt-4 text-center">TikTok Shop 全球化经营诊断控制台 (AI Copilot Hub) / Click to Zoom</p>
          </div>
        </div>
      </section>

      {/* FINAL EXIT */}
      <section className="relative h-[80vh] flex flex-col items-center justify-center border-t border-white/5 overflow-hidden">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
           className="relative z-10 flex flex-col items-center gap-16 group cursor-pointer"
           onClick={() => navigate('/')}
        >
          <div className="text-[10px] font-mono tracking-[2.5em] text-white/20 uppercase ml-12">Case Terminal</div>
          <h2 className="text-4xl md:text-[10rem] font-bold tracking-[1.5rem] tracking-tighter text-white/5 group-hover:text-[#00F0FF] transition-all duration-1000 text-center px-10">
            EXIT TIKTOK
          </h2>
          <div className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center glass group-hover:border-cyan-400/40 group-hover:scale-110 transition-all duration-700 shadow-sm">
             <ArrowLeft className="w-6 h-6 text-white/40 group-hover:text-[#00F0FF] transition-colors" />
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="px-10 py-32 border-t border-white/5 bg-black flex flex-col items-center gap-10">
         <div className="flex items-center gap-6">
            <div className="h-[1px] w-12 bg-white/10" />
            <div className="text-[10px] font-mono tracking-[1.5em] text-white/20 uppercase">TikTok Shop Global AI Copilot</div>
            <div className="h-[1px] w-12 bg-white/10" />
         </div>
         <div className="text-[10px] font-mono text-white/40 uppercase text-center max-w-lg leading-relaxed tracking-[0.2em] font-light">
            This project is part of the TikTok Shop Global Design Systems & AI Copilot initiatives. / 2026
         </div>
      </footer>
    </div>
  );
}

if (project.id === 'fate-mystery') {
    return (
      <div ref={containerRef} className="relative min-h-screen bg-[#070503] text-[#f7efe6] selection:bg-amber-500/30 font-sans overflow-x-hidden">
        {/* Background Effects */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-[10%] right-[-10%] w-[60%] h-[60%] bg-amber-600/5 blur-[200px] rounded-full" />
          <div className="absolute bottom-[20%] left-[-10%] w-[50%] h-[50%] bg-purple-900/5 blur-[250px] rounded-full" />
          <div className="absolute inset-0 bg-[#000000]/80 mix-blend-color" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.25] contrast-150 brightness-75 mix-blend-overlay" />
        </div>

        {/* Progress Bar */}
        <motion.div 
          className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-amber-500 via-orange-600 to-purple-600 origin-left z-[1001]"
          style={{ scaleX: smoothProgress }}
        />

        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-[1000] px-6 md:px-16 py-8 flex justify-between items-center bg-[#070503]/80 backdrop-blur-xl border-b border-orange-950/20">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate('/')}
            className="flex items-center gap-4 group"
          >
            <div className="w-10 h-10 rounded-xl border border-orange-900/30 flex items-center justify-center glass group-hover:border-orange-500/50 transition-all duration-500 bg-orange-950/10">
               <ArrowLeft className="w-4 h-4 text-orange-400/80 transition-transform group-hover:-translate-x-1.5" />
            </div>
            <span className="text-[10px] font-mono tracking-[0.5em] uppercase text-orange-400/50 group-hover:text-amber-300 transition-colors">Portfolio</span>
          </motion.button>
          <div className="hidden md:flex items-center gap-10">
             <div className="text-[10px] font-mono tracking-[0.4em] text-orange-400/30 uppercase">Project / Detail / Fate Mystery</div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center px-6 md:px-10 lg:px-24 pt-44 pb-20 overflow-hidden">
          <div className="max-w-7xl mx-auto w-full space-y-16">
             <motion.div
               initial={{ opacity: 0, y: 50 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
               className="space-y-12"
             >
                <div className="space-y-6">
                   <div className="flex items-center gap-4 text-amber-500">
                     <span className="text-[10px] font-mono tracking-[0.8em] uppercase">Narrative-Driven AAA Game Battle Pass Proposal</span>
                     <div className="h-[1px] w-24 bg-gradient-to-r from-amber-500 to-transparent" />
                   </div>
                   <h1 className="text-5xl md:text-8xl font-medium tracking-tighter leading-none text-[#ffecd1]">
                     命运迷局 FATE MYSTERY
                   </h1>
                   <p className="text-xl md:text-2xl text-orange-300/60 font-light max-w-4xl leading-relaxed">
                     融合经典“发条蒸汽朋克”与“以太古典秘学”的深邃美学范式。在局内引入心流状态监测（理智值 SAN 监测）与非线性双轨剧情解密，彻底打破拼图式解谜的零散桎梏。
                   </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
                   <div className="lg:col-span-8 flex flex-col justify-between p-10 rounded-[2.5rem] border border-orange-950/40 bg-orange-950/5 backdrop-blur-xl space-y-8">
                     <div className="space-y-4">
                       <span className="text-xs font-mono tracking-widest text-[#ffaa44] uppercase">Strategic Paradigm</span>
                       <h3 className="text-3xl font-medium text-amber-100">主动探索与非线性“占星盘”系统</h3>
                       <p className="text-base text-orange-200/60 font-light leading-relaxed">
                         《命运迷局》是一个颠覆传统的叙事驱动型 AAA 游戏战令系统概念提案。项目摒弃了机械线性的“打卡式”升级流程，开创性地将其重构为非线性、具备肉鸽探索感的“机械占星盘”大富翁机制。针对核心高净值玩家对同质化奖励的倦怠痛点，系统引入“理性与感性”双轨代币策略控步玩法，使每一次格子落位都能灼烧开雾并触发深度世界观解谜。项目以维多利亚未来主义的暗黑仪式感美学为外壳，实现跨平台无缝适配，让战令晋升成为一场充满宿命博弈与身份蜕变的沉浸式史诗冒险。
                       </p>
                     </div>
                     <div className="grid grid-cols-3 gap-6 pt-4 border-t border-orange-950/20 text-center">
                       <div>
                         <p className="text-3xl font-mono text-[#ff8c00] font-semibold">35%</p>
                         <p className="text-[10px] text-orange-200/40 uppercase tracking-widest mt-1">控制载荷降幅</p>
                       </div>
                       <div>
                         <p className="text-3xl font-mono text-[#ff8c00] font-semibold">42%</p>
                         <p className="text-[10px] text-orange-200/40 uppercase tracking-widest mt-1">决策摩擦优化</p>
                       </div>
                       <div>
                         <p className="text-3xl font-mono text-[#ff8c00] font-semibold">D7 68%</p>
                         <p className="text-[10px] text-orange-200/40 uppercase tracking-widest mt-1">高净值心流留存</p>
                       </div>
                     </div>
                   </div>

                   <div className="lg:col-span-4 rounded-[2.5rem] border border-orange-950/40 bg-gradient-to-b from-amber-500/10 to-purple-500/5 p-10 flex flex-col justify-between">
                     <Gamepad2 className="w-12 h-12 text-[#ff9c3a] animate-pulse" />
                     <div className="space-y-4 pt-16">
                       <div className="text-[10px] font-mono tracking-widest text-orange-400">Core Paradigm Shift</div>
                       <h4 className="text-xl font-medium text-amber-100">双轨代币策略控步</h4>
                       <p className="text-sm text-orange-200/50 font-light leading-relaxed">
                         摒弃简单物理打卡，将每一次决策演化为“理性”（步数精细把控）与“感性”（大跨度迷雾开雾）的宿命平衡博弈。
                       </p>
                     </div>
                   </div>
                </div>
             </motion.div>
          </div>
        </section>

        {/* Part 1: 项目介绍 */}
        <section className="relative px-6 md:px-10 lg:px-24 py-20 border-t border-orange-950/15">
          <div className="max-w-7xl mx-auto space-y-16">
             <div className="space-y-4">
                <span className="text-[10px] font-mono tracking-[0.8em] text-orange-500/40 uppercase">PART 01 // OVERVIEW</span>
                <h2 className="text-4xl md:text-5xl font-medium text-amber-100 italic tracking-tight">项目核心介绍 Concept Blueprint</h2>
             </div>
             
             <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-5 space-y-6">
                   <p className="text-lg text-orange-100/90 leading-relaxed font-light">
                     <strong>《命运迷局》</strong> 开创性地将叙事深度与战令系统相绑定。传统的升级只是重复单调的进度条行为，而在这里，整个迷局就是一张充满神秘机械美学的大富翁星图，用户既是解谜者也是局内棋子。
                   </p>
                   <div className="p-6 rounded-2xl border border-orange-950/30 bg-orange-950/10 space-y-3">
                      <p className="text-xs text-orange-300 font-mono">美学外壳 Paradigm Aesthetic</p>
                      <p className="text-xs text-orange-200/60 leading-relaxed font-light">
                        本案采用维多利亚未来主义的暗黑仪式感作为界面内核，通过微晶显态的玻璃物理投影和雕版金辉拉丝，在屏幕指尖演绎非同一般的古典未来厚重感。
                      </p>
                   </div>
                </div>
                <div className="lg:col-span-7">
                   <ImageRenderer 
                     title="命运迷局 核心系统介绍图" 
                     src="/命运迷局介绍图.png" 
                     className="w-full aspect-[16/10] shadow-[0_0_80px_rgba(0,0,0,0.8)] border border-orange-900/20"
                   />
                </div>
             </div>
          </div>
        </section>

        {/* Part 2: 开始界面介绍 */}
        <section className="relative px-6 md:px-10 lg:px-24 py-32 bg-[#0c0906]/60 border-t border-orange-950/15">
          <div className="max-w-7xl mx-auto space-y-16">
             <div className="space-y-4">
                <span className="text-[10px] font-mono tracking-[0.8em] text-orange-500/40 uppercase">PART 02 // ONBOARDING GATEWAY</span>
                <h2 className="text-4xl md:text-5xl font-medium text-amber-100 italic tracking-tight">安全认知网关与命途选择</h2>
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                <div className="lg:col-span-6 space-y-8">
                   {/* Module 1 */}
                   <div className="p-8 rounded-[2rem] border border-orange-950/30 bg-orange-950/5 space-y-6">
                      <div className="flex items-center gap-3">
                         <div className="w-2.5 h-6 bg-amber-500 rounded-full" />
                         <h3 className="text-lg font-mono text-amber-100 tracking-wider">模块一：安全认知网关（登录/注册/用户协议）</h3>
                      </div>

                      <div className="space-y-4">
                         <div className="space-y-2">
                            <p className="text-xs font-mono uppercase text-red-400 flex items-center gap-2">
                               <span>❌ 设计痛点 (Design Pain Points)</span>
                            </p>
                            <p className="text-xs text-orange-200/50 leading-relaxed font-light">
                               <strong>低沉浸感与情绪断层：</strong>作为玩家进入游戏的第一道物理门槛，传统的账号登录、注册表单以及冗长的法务条款（用户协议）通常表现为冰冷的工业化界面，极易打断玩家在初始加载时建立的期待值，引发体验断层。
                            </p>
                            <p className="text-xs text-orange-200/50 leading-relaxed font-light">
                               <strong>高流动性摩擦（Friction）与流失风险：</strong>移动端多字段的输入、高频呼起的全键盘，以及密密麻麻的合规条文，会瞬间拉高用户的认知负载（Cognitive Load）。新用户在此链路中容易产生抗拒心理，导致临门一脚的转化率流失。
                            </p>
                         </div>

                         <div className="space-y-2 border-t border-orange-950/20 pt-4">
                            <p className="text-xs font-mono uppercase text-emerald-400 flex items-center gap-2">
                               <span>💡 设计思路 (Design Approach)</span>
                            </p>
                            <p className="text-xs text-orange-200/70 leading-relaxed font-light">
                               <strong>语境重构与“法务叙事化”：</strong>彻底解构传统表单，将其重塑为“与秘社缔结契约”的解谜仪式。将账号/密码字段语义转译为 <strong>执局者印记</strong> 与 <strong>以太密码</strong>；将法务协议重构为《理智保障与执局契约》，把“被迫阅读”异化为“主动探索世界观”的入局体验。
                            </p>
                            <p className="text-xs text-orange-200/70 leading-relaxed font-light">
                               <strong>渐进式认知降载与交互拦截：</strong>注册模块采用轻量化半透明浮层卡片（Sheet Drawer），配合直观的 Placeholder（占位符）示例，平滑引导输入。用户协议按钮增设“滚动激活”的物理阻尼逻辑，在确保法务绝对合规的前提下，通过仪式感消除界面的烦琐感。
                            </p>
                         </div>
                      </div>
                   </div>

                   {/* Module 2 */}
                   <div className="p-8 rounded-[2rem] border border-indigo-950/30 bg-purple-950/5 space-y-6">
                      <div className="flex items-center gap-3">
                         <div className="w-2.5 h-6 bg-purple-500 rounded-full" />
                         <h3 className="text-lg font-mono text-purple-100 tracking-wider">模块二：命途选择矩阵（角色选择界面）</h3>
                      </div>

                      <div className="space-y-4">
                         <div className="space-y-2">
                            <p className="text-xs font-mono uppercase text-red-400 flex items-center gap-2">
                               <span>❌ 设计痛点 (Design Pain Points)</span>
                            </p>
                            <p className="text-xs text-orange-200/50 leading-relaxed font-light">
                               <strong>维度单一与情感轻量化：</strong>传统游戏的选角界面往往偏向纯视觉展示，角色之间的属性对比不够直观，玩家难以在短时间内感知到不同角色对后续游戏机制（如战令系统、流派走法）的深远影响。
                            </p>
                            <p className="text-xs text-orange-200/50 leading-relaxed font-light">
                               <strong>缺乏决策阻尼与操作空间感：</strong>2D 扁平布局缺乏层次，核心行动点（CTA）不够聚焦，导致这一最具世界观分量的重要决策节点缺乏相应的“神圣仪式感”和空间纵深感。
                            </p>
                         </div>

                         <div className="space-y-2 border-t border-purple-950/20 pt-4">
                            <p className="text-xs font-mono uppercase text-emerald-400 flex items-center gap-2">
                               <span>💡 设计思路 (Design Approach)</span>
                            </p>
                            <p className="text-xs text-orange-200/70 leading-relaxed font-light">
                               <strong>双轨对立视差看板与多维数据可视化：</strong>界面采用 COGNITIVE CROSSROAD（命途交叉点）概念，通过红/灰、血月/星盘的强对比视觉建立“感性（海伦娜）”与“理性（施泰纳）”的宿命对立面。下方直接量化核心理智属性（MAX SAN）与直觉率，提供直观的决策数据支撑。
                            </p>
                            <p className="text-xs text-orange-200/70 leading-relaxed font-light">
                               <strong>微光晕材质与终极决策锚定：</strong>整体框架采用 Micro Glassmorphic（微玻璃材质） 与背板模糊（Backdrop Blur），卡片引入空间视差动效（Spatial Motion）。底部的 <strong>确认选择并缔结宿命锁链</strong> 终极按钮配合双侧羽翼符文高亮，极大地拉满了玩家做出核心策略抉择时的触觉与心理反馈。
                            </p>
                         </div>
                      </div>
                   </div>
                </div>

                <div className="lg:col-span-6 sticky top-24">
                   <ImageRenderer 
                     title="安全认知网关 & 角色选择界面" 
                     src="/命运迷局游戏登录·注册·用户协议·角色选择界面.png" 
                     className="w-full aspect-[16/10] shadow-[0_0_80px_rgba(0,0,0,0.9)] border border-orange-900/30"
                   />
                   <p className="text-[10px] font-mono text-orange-400/40 mt-4 text-center">命途选择矩阵：海伦娜直觉直落与施泰纳学术拼图界面 / Click to Zoom</p>
                </div>
             </div>
          </div>
        </section>

        {/* Part 3: 状态拦截与星仪沙盘 */}
        <section className="relative px-6 md:px-10 lg:px-24 py-32 border-t border-orange-950/15">
          <div className="max-w-7xl mx-auto space-y-16">
             <div className="space-y-4">
                <span className="text-[10px] font-mono tracking-[0.8em] text-orange-500/40 uppercase">PART 03 // CLOCKWORK SYSTEM</span>
                <h2 className="text-4xl md:text-5xl font-medium text-amber-100 italic tracking-tight">全息异步加载与因果发条星仪沙盘</h2>
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                <div className="lg:col-span-6 lg:order-2 space-y-8">
                   {/* Module 1 */}
                   <div className="p-8 rounded-[2rem] border border-orange-950/30 bg-orange-950/5 space-y-4">
                      <h4 className="text-base font-mono text-[#ff8c00] tracking-wider uppercase">模块一：全息异步加载流（Loading State）</h4>
                      <div className="space-y-3">
                         <p className="text-xs text-orange-200/50 font-light leading-relaxed">
                            <span className="text-red-400 font-semibold uppercase block pb-1">❌ 设计痛点 (Design Pain Points)</span>
                            <strong>低效等待焦虑：</strong>传统进度条无法提供明确的“技术稳定性”与“剧情相关度”反馈，缺乏安全锚点，易让玩家产生焦躁感。
                         </p>
                         <p className="text-xs text-[#ffecd1]/70 font-light leading-relaxed">
                            <span className="text-emerald-400 font-semibold uppercase block pb-1">💡 设计思路 (Design Approach)</span>
                            在 <strong>`bc148a63b77b23fbc2d351bde1b70113.png`</strong> 异步流中，将加载包装为“以太纪元重合熔融中...”。引入 <strong>AETHER FUSION PROCESS: 114%</strong> 超载溢数值动效拦截物理通信延迟。底部常驻跟随加载进程智能平变的世界观历史文本低语。
                         </p>
                      </div>
                   </div>

                   {/* Module 2 */}
                   <div className="p-8 rounded-[2rem] border border-orange-950/30 bg-orange-950/5 space-y-4">
                      <h4 className="text-base font-mono text-[#ff8c00] tracking-wider uppercase">模块二：因果发条星仪沙盘（核心主界面 1 & 2）</h4>
                      <div className="space-y-3">
                         <p className="text-xs text-orange-200/50 font-light leading-relaxed">
                            <span className="text-red-400 font-semibold uppercase block pb-1">❌ 设计痛点 (Design Pain Points)</span>
                            <strong>非线性路径认知过载：</strong>大富翁肉鸽迷雾在方寸小屏对探索者视觉产生高频干扰，极易遮蔽沙盘重心引发频繁弹出/退出的触觉疲劳。
                         </p>
                         <p className="text-xs text-[#ffecd1]/70 font-light leading-relaxed">
                            <span className="text-emerald-400 font-semibold uppercase block pb-1">💡 设计思路 (Design Approach)</span>
                            <strong>F型纵向锚点布局：</strong>顶部常驻 SAN: 20/20 灵魂理智与铭文，核心区部署星盘迷局，粗细相间因果线建立极高易读性。右下角整合防滑落悬浮操作环。并引入 <strong>COGNITION DRAWER（半开式认知抽屉）</strong>。玩家上滑查看日契、签到、FAQ时，沙盘背景仅以透射模糊态隐约呈现，保持空间完整性。
                         </p>
                      </div>
                   </div>

                   {/* Module 3 */}
                   <div className="p-8 rounded-[2rem] border border-orange-950/30 bg-orange-950/5 space-y-4">
                      <h4 className="text-base font-mono text-[#ff8c00] tracking-wider uppercase">模块三：多维色彩无缝转译（亮色模式手机端）</h4>
                      <div className="space-y-3">
                         <p className="text-xs text-orange-200/50 font-light leading-relaxed">
                            <span className="text-red-400 font-semibold uppercase block pb-1">❌ 设计痛点 (Design Pain Points)</span>
                            强光户外下暗色容易大面积反光导致阅读崩溃。若简单反色会导致维多利亚古典格调流失为平凡。
                         </p>
                         <p className="text-xs text-[#ffecd1]/70 font-light leading-relaxed">
                            <span className="text-emerald-400 font-semibold uppercase block pb-1">💡 设计思路 (Design Approach)</span>
                            推出 <strong>“纸质明亮学者风 (Manuscript Bright)”</strong>。纸张底物转译为微显颗粒纹理的古籍羊皮纸，骨架信息采用高对比棕褐古典活字。结合系统对比度自适应微调字磅与字距，在烈日下仍保持无懈可击的可读性也保留了典雅史诗感。
                         </p>
                      </div>
                   </div>
                </div>

                <div className="lg:col-span-6 lg:order-1 sticky top-24">
                   <ImageRenderer 
                     title="游戏加载 ＆ 星盘主界面 ＆ 纸质亮色模式" 
                     src="/游戏加载.主界面.亮色模式.png" 
                     className="w-full aspect-[16/10] shadow-[0_0_80px_rgba(0,0,0,0.85)] border border-orange-900/30"
                   />
                   <p className="text-[10px] font-mono text-orange-400/40 mt-4 text-center">全息加载流与明暗模式双向转译设计 / Click to Zoom</p>
                </div>
             </div>
          </div>
        </section>

        {/* Part 4: 抉择、秘藏、大君协助、好友排行榜 */}
        <section className="relative px-6 md:px-10 lg:px-24 py-32 bg-[#0c0906]/50 border-t border-orange-950/15">
          <div className="max-w-7xl mx-auto space-y-16">
             <div className="space-y-4">
                <span className="text-[10px] font-mono tracking-[0.8em] text-orange-500/40 uppercase">PART 04 // DECISION & EQUILIBRIUM</span>
                <h2 className="text-4xl md:text-5xl font-medium text-amber-100 italic tracking-tight">动作发条、执局秘藏、命运大君与智者之碑</h2>
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                <div className="lg:col-span-6 space-y-8">
                   {/* Module 1 */}
                   <div className="p-6 rounded-[1.5rem] border border-orange-950/30 bg-orange-950/5 space-y-3">
                      <h4 className="text-sm font-mono text-amber-400 uppercase">1. 动作·发条界面（事件抉择流）</h4>
                      <p className="text-xs text-orange-200/50 leading-relaxed font-light">
                         <span className="text-red-400 block font-semibold hover:tracking-wide transition-all uppercase pb-0.5">❌ 设计痛点 (Design Pain Points)</span>
                         传统的长篇剧情或战令任务文本平铺直叙，缺乏核心的视觉记忆点，导致玩家快速无视（Skip）或产生阅读倦怠，无法与玩法产生深度情感共鸣。面临选择分支时结果模糊。
                      </p>
                      <p className="text-xs text-orange-200/80 leading-relaxed font-light mt-2 bg-orange-950/20 p-3 rounded-lg border border-orange-900/20">
                         <span className="text-emerald-400 block font-bold uppercase pb-0.5">💡 设计思路 (Design Approach)</span>
                         <strong>多轨双选视差流架构：</strong>界面顶部清晰架构 Helena 洞察 与 Steiner 哲学双徽章，正文用“编年体”包裹 <strong>ACTIVE STORY CHRONO / 命轨微曜</strong>。下方采用预测式 UX（Predictive UX）将后果（如消耗及步数+1）前置呈現。通过触发裂解惩罚警示，卡死玩博弈心理阈值。
                      </p>
                   </div>

                   {/* Module 2 */}
                   <div className="p-6 rounded-[1.5rem] border border-orange-950/30 bg-orange-950/5 space-y-3">
                      <h4 className="text-sm font-mono text-amber-400 uppercase">2. 道具箱界面（执局神圣秘藏箱）</h4>
                      <p className="text-xs text-orange-200/50 leading-relaxed font-light">
                         <span className="text-red-400 block font-semibold uppercase pb-0.5">❌ 设计痛点 (Design Pain Points)</span>
                         同质化的格子背包难以体现道具的历史物质感。提示卡片跳转频繁，容易打断核心心流连续。
                      </p>
                      <p className="text-xs text-orange-200/80 leading-relaxed font-light mt-2 bg-orange-950/20 p-3 rounded-lg border border-orange-900/20">
                         <span className="text-emerald-400 block font-bold uppercase pb-0.5">💡 设计思路 (Design Approach)</span>
                         <strong>微拉丝暗金勾边暗盒（Micro Glassmorphic Grid）：</strong>标签采用复古归属，自带细腻光晕起伏。详情无缝合并在背包下方同一界面做渐进式折叠：<strong>【底蕴定义】（秘宝由来） $\rightarrow$ 【因果效能】（交互规则）</strong>，省去跳转，完成极速闭环认知。
                      </p>
                   </div>

                   {/* Module 3 */}
                   <div className="p-6 rounded-[1.5rem] border border-orange-950/30 bg-orange-950/5 space-y-3">
                      <h4 className="text-sm font-mono text-amber-400 uppercase">3. 命运大君协助界面（双轨神启）</h4>
                      <p className="text-xs text-orange-200/50 leading-relaxed font-light">
                         <span className="text-red-400 block font-semibold uppercase pb-0.5">❌ 设计痛点 (Design Pain Points)</span>
                         文字型的死板 FAQ 或平庸弹框让人出戏，缺乏叙事中的宿命庄严和神俯瞰。
                      </p>
                      <p className="text-xs text-orange-200/80 leading-relaxed font-light mt-2 bg-orange-950/20 p-3 rounded-lg border border-orange-900/20">
                         <span className="text-emerald-400 block font-bold uppercase pb-0.5">💡 设计思路 (Design Approach)</span>
                         全遮罩的深邃微透视卡片。将 AI 协助包装为 <strong>“因果权衡天平 (Cognitive Equilibrium)”</strong>。左为古典理性大君（安全慢步）；右为现代直觉大君（步幅跨越大，SAN暴跌风险）。让游戏 AI 充满双向博弈的仪式感。
                      </p>
                   </div>

                   {/* Module 4 */}
                   <div className="p-6 rounded-[1.5rem] border border-orange-950/30 bg-orange-950/5 space-y-3">
                      <h4 className="text-sm font-mono text-amber-400 uppercase">4. 执局者好友榜（智性排行）</h4>
                      <p className="text-xs text-orange-200/50 leading-relaxed font-light">
                         <span className="text-red-400 block font-semibold uppercase pb-0.5">❌ 设计痛点 (Design Pain Points)</span>
                         普通数字好友榜容易引发中下层气馁，平白丧失仪式美感。
                      </p>
                      <p className="text-xs text-orange-200/80 leading-relaxed font-light mt-2 bg-orange-950/20 p-3 rounded-lg border border-orange-900/20">
                         <span className="text-emerald-400 block font-bold uppercase pb-0.5">💡 设计思路 (Design Approach)</span>
                         <strong>阶梯学术徽章信息格式：</strong>黑金质感卡片包裹。每人均有流派图腾（如已通关理性星盘/已解锁感性契约）。摒弃单纯数字竞速，异化为“思想和学术探索阶段”的比拼，高易读度中唤醒长线社交驱动。
                      </p>
                   </div>
                </div>

                <div className="lg:col-span-6 sticky top-24">
                   <ImageRenderer 
                     title="发条抉择、神圣秘宝、天平神启与执局好友榜" 
                     src="/动作发条·道具箱·命运大君协助·好友排行榜.png" 
                     className="w-full aspect-[16/10] shadow-[0_0_80px_rgba(0,0,0,0.9)] border border-orange-900/30"
                   />
                   <p className="text-[10px] font-mono text-orange-400/40 mt-4 text-center">核心战斗动作、资产背囊与 AI 决策神启流交互细节 / Click to Zoom</p>
                </div>
             </div>
          </div>
        </section>

        {/* Part 5: 助手、配置与商业特权月卡 */}
        <section className="relative px-6 md:px-10 lg:px-24 py-32 border-t border-orange-950/15 bg-gradient-to-b from-[#070503] to-[#040302]">
          <div className="max-w-7xl mx-auto space-y-20">
             <div className="space-y-4">
                <span className="text-[10px] font-mono tracking-[0.8em] text-orange-500/40 uppercase">PART 05 // COMPANION, CONFIG & MONETIZATION</span>
                <h2 className="text-4xl md:text-5xl font-medium text-amber-100 italic tracking-tight">小秘助手、配置拦截、珍稀阁与月卡每日契约</h2>
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
                {/* Panel A - AI, Config & Skins */}
                <div className="p-8 rounded-[2.5rem] border border-orange-950/30 bg-[#0d0906]/80 flex flex-col justify-between space-y-8">
                   <div className="space-y-6">
                      <span className="text-xs font-mono text-amber-400 uppercase tracking-wider block">1. 智能助手、个性配置及珍衣饰 Cabins</span>
                      <div className="space-y-4">
                         <div className="text-xs text-orange-200/60 leading-relaxed font-light">
                            <strong>智能守护小秘号 AI 协同：</strong>
                            针对常见 FAQ 系统割裂心流，小秘助手实时上下文探测沙盘节点。采用Conversational UX。提供拇指热区高频预设卡片标签，实现零阻力极速疑问解答。
                         </div>
                         <div className="text-xs text-orange-200/60 leading-relaxed font-light border-y border-orange-950/20 py-4">
                            <strong>物理侧断连仿真模拟 (Edge Cases)：</strong>
                            网络发生异常不产生突兀代码。通过 ⚠️ 警示条显示“ONLINE 同步中”动态波纹。将离线重构为向神祈灵“Seek Lord Council”，用叙事手段抚平用户的等待焦虑。
                         </div>
                         <div className="text-xs text-orange-200/60 leading-relaxed font-light">
                            <strong>高级个性设置与衣饰珍稀阁：</strong>
                            设置大类模组卡片。传奇皮肤 [蔷薇以太 · Helena] 与史诗 [深渊学者 ] 将战令数值博弈与视觉观赏完美熔炼，强化炫耀及收藏成就感。
                         </div>
                      </div>
                   </div>
                   <ImageRenderer 
                     title="小秘助手 与 个性化设置 与 珍稀礼服" 
                     src="/小秘助手·游戏配置·个性化设置·珍稀皮肤.png" 
                     className="w-full aspect-[16/10] border border-orange-900/20"
                   />
                </div>

                {/* Panel B - Monetization & Season */}
                <div className="p-8 rounded-[2.5rem] border border-orange-950/30 bg-[#0d0906]/80 flex flex-col justify-between space-y-8">
                   <div className="space-y-6">
                      <span className="text-xs font-mono text-purple-400 uppercase tracking-wider block font-medium">2. 尊贵原石周卡月卡、每日打卡合约与赛季时空大盘</span>
                      <div className="space-y-4">
                         <div className="text-xs text-orange-200/60 leading-relaxed font-light">
                            <strong>尊贵原石月卡界面 (Monetization)：</strong>
                            付费结构化设计。顶部明确赛季底价， PREMIUM PASS 高高置顶、醒目呼唤。提炼三大限购及专属资产特权，直观拉近价值感。
                         </div>
                         <div className="text-xs text-orange-200/60 leading-relaxed font-light border-y border-orange-950/20 py-4">
                            <strong>每日契约签到 (Active Contract)：</strong>
                            打破机械感，升级为 DAILY SIGNATURE CONTRACT 契约。已领区域亮绿盖章冻结；未领维持灰度，双语行为高亮触发极佳终极交互完结感。
                         </div>
                         <div className="text-xs text-orange-200/60 leading-relaxed font-light">
                            <strong>总线契约季大盘因果 (General Season)：</strong>
                            宏观状态容器解构，包含 [第一赛季已锁死100%]、[第二赛季原子充能中57%]、[第三赛季虚无提示]。通过明确的引导流随时退避或一键按压折返沙盘主页。
                         </div>
                      </div>
                   </div>
                   <ImageRenderer 
                     title="原石月卡 ＆ 每日合约 ＆ 总赛季大盘机制" 
                     src="/砖石周卡·每日打卡签到·总赛季说明.png" 
                     className="w-full aspect-[16/10] border border-orange-900/20"
                   />
                </div>
             </div>
          </div>
        </section>

        {/* Part 6: 手机端全交互界面走廊 */}
        <section className="relative px-6 md:px-10 lg:px-24 py-32 border-t border-orange-950/20 bg-black">
          <div className="max-w-7xl mx-auto space-y-16">
             <div className="space-y-6 text-center max-w-3xl mx-auto">
                <span className="text-[10px] font-mono tracking-[0.8em] text-orange-500/50 uppercase block">PHONE VIEW ALL-MEMBER PASS GALLERY</span>
                <h2 className="text-3xl md:text-5xl font-medium text-amber-100 tracking-tight">手机端全交互界面走廊</h2>
                <p className="text-sm text-orange-300/40 leading-relaxed font-light">
                  由维多利亚暗黑占星盘设计系统（Aether Dark Spec）严格约束的14幅全端手机规格图层走廊，点击任何插画均可进行高精视窗细节缩放探索。
                </p>
             </div>

             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 pt-8">
                {[
                  { name: "游戏登录界面", file: "/游戏登录界面手机端.png", desc: "执局者印记登入契约起点" },
                  { name: "游戏注册界面", file: "/游戏注册界面手机端.png", desc: "半开抽屉轻盈多阶段账号塑造" },
                  { name: "用户协议界面", file: "/游戏用户协议界面手机端.png", desc: "理智契约法理保障机制阅读" },
                  { name: "角色选择界面", file: "/角色选择界面手机端.png", desc: "海伦娜与施泰纳宿命双向锁链" },
                  { name: "游戏加载界面", file: "/游戏加载界面手机端.png", desc: "以太纪元熔融无缝全息加载拦截" },
                  { name: "游戏核心主界面一", file: "/游戏主界面手机端.png", desc: "星野网格轨迹占星策略图层" },
                  { name: "游戏核心主界面二", file: "/游戏主界面手机端2.png", desc: "微物理拖拽防错防漏探索触感" },
                  { name: "亮色学者模式", file: "/亮色模式手机端.png", desc: "自适应古羊皮纸与活字印刷风契约" },
                  { name: "事件抉择动作", file: "/动作·发条界面手机端.png", desc: "多轨双向预测抉择双曜故事微徽章" },
                  { name: "圣物道具秘藏", file: "/道具箱界面手机端.png", desc: "金边槽位珍藏卡片详情合拢器" },
                  { name: "大君神启协助", file: "/游戏命运大君协助界面.png", desc: "因果天平折回退让仪式覆盖浮板" },
                  { name: "执局高手金榜", file: "/游戏好友排行榜手机端.png", desc: "阶梯图腾流派探索进程智性排行榜" },
                  { name: "智能守护协同", file: "/游戏小秘助手.png", desc: "AI多维语境感知对话快速推荐气泡" },
                  { name: "系统偏好设置", file: "/游戏配置界面手机端.png", desc: "音段重合度滑动与极度断网安全拦截" }
                ].map((item, idx) => (
                  <div key={idx} className="group relative flex flex-col justify-between p-4 rounded-3xl bg-orange-950/[0.03] border border-orange-950/20 hover:border-amber-500/20 hover:bg-orange-950/[0.05] transition-all duration-500">
                     <ImageRenderer 
                        title={item.name} 
                        src={item.file} 
                        className="w-full aspect-[9/16] shadow-xl rounded-2xl overflow-hidden bg-[#070503]" 
                     />
                     <div className="mt-4 space-y-1">
                        <p className="text-xs font-medium text-amber-100 font-mono tracking-tight">{item.name}</p>
                        <p className="text-[10px] text-orange-300/40 leading-none">{item.desc}</p>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        </section>

        {/* FINAL EXIT */}
        <section className="relative h-[80vh] flex flex-col items-center justify-center border-t border-orange-950/20 overflow-hidden">
          <div className="absolute inset-0 bg-amber-500/5 pointer-events-none" />
          <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
             className="relative z-10 flex flex-col items-center gap-16 group cursor-pointer"
             onClick={() => navigate('/')}
          >
            <div className="text-[10px] font-mono tracking-[2em] text-orange-400/50 uppercase ml-12">Transmission Terminal</div>
            <h2 className="text-4xl md:text-8xl font-medium tracking-tighter text-orange-400/30 group-hover:text-white transition-all duration-1000 text-center px-10">
              Exit Case Study
            </h2>
            <div className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center glass group-hover:border-orange-400/40 group-hover:scale-110 transition-all duration-700">
               <ArrowLeft className="w-6 h-6 rotate-180" />
            </div>
          </motion.div>
        </section>

        {/* FOOTER */}
        <footer className="px-10 py-32 border-t border-white/5 bg-black flex flex-col items-center gap-10">
           <div className="flex items-center gap-6">
              <div className="h-[1px] w-12 bg-white/10" />
              <div className="text-[10px] font-mono tracking-[1.5em] text-white/20 uppercase">FATE MYSTERY UX PROJECT</div>
              <div className="h-[1px] w-12 bg-white/10" />
           </div>
           <div className="text-[10px] font-mono text-white/5 uppercase text-center max-w-lg leading-relaxed tracking-[0.2em]">
              This project is part of the Fate Mystery Casual Strategy UX Initiative. All strategic frameworks and layout specifications are proprietary. / 2026
          </div>
        </footer>
      </div>
    );
  }

  if (project.id === 'injoy') {
    // Top-level states for live interactive prototypes
    const [doorLocked, setDoorLocked] = React.useState(true);
    const [leftFrontPressure, setLeftFrontPressure] = React.useState(2.4);
    const [rightFrontPressure, setRightFrontPressure] = React.useState(2.1); // Abnormal warning bar
    const [alarmActive, setAlarmActive] = React.useState(false);
    const [acPreset, setAcPreset] = React.useState('heat'); // 'heat' | 'cool' | 'plasma'
    const [parkingMode, setParkingMode] = React.useState('inout'); // 'inout' | 'remote'
    const [hudSynced, setHudSynced] = React.useState(false);
    const [simulatedTime, setSimulatedTime] = React.useState('09:52');
    
    // Community Feed States
    const [likes, setLikes] = React.useState({ post1: 124, post2: 256 });
    const [liked, setLiked] = React.useState({ post1: false, post2: false });
    
    // Store Dialog States
    const [orderedProduct, setOrderedProduct] = React.useState(null);

    const toggleLike = (postKey) => {
      setLiked(prev => {
        const nextLiked = !prev[postKey];
        setLikes(oldLikes => ({
          ...oldLikes,
          [postKey]: nextLiked ? oldLikes[postKey] + 1 : oldLikes[postKey] - 1
        }));
        return { ...prev, [postKey]: nextLiked };
      });
    };

    return (
      <div ref={containerRef} className="relative min-h-screen bg-[#070913] text-[#e2e8f0] selection:bg-cyan-500/30 font-sans overflow-x-hidden">
        {/* Background Effects */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-15%] right-[-10%] w-[60%] h-[70%] bg-cyan-500/10 blur-[180px] rounded-full" />
          <div className="absolute bottom-[-15%] left-[-10%] w-[50%] h-[70%] bg-blue-600/10 blur-[180px] rounded-full animate-pulse" />
          <div className="absolute top-[40%] left-[30%] w-[40%] h-[40%] bg-purple-600/[0.04] blur-[150px] rounded-full" />
          <div className="absolute inset-0 bg-[#000000]/70 mix-blend-color" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] contrast-150 brightness-50 mix-blend-overlay" />
        </div>

        {/* Progress Bar */}
        <motion.div 
          className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-cyan-400 via-blue-500 to-teal-400 origin-left z-[1001]"
          style={{ scaleX: smoothProgress }}
        />

        {/* Navigation bar with crystal glass design */}
        <nav className="fixed top-0 left-0 right-0 z-[1000] px-6 md:px-16 py-6 flex justify-between items-center bg-[#070913]/60 backdrop-blur-xl border-b border-white/5">
          <motion.button
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate('/')}
            className="flex items-center gap-3 group text-sm text-slate-300 hover:text-white transition-colors"
          >
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center glass group-hover:border-white/30 transition-all duration-500">
               <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            </div>
            <span className="text-[10px] font-mono tracking-[0.5em] uppercase opacity-70 group-hover:opacity-100 transition-opacity">Portfolio</span>
          </motion.button>
          
          <div className="text-[10px] font-mono tracking-[0.3em] text-white/40 uppercase hidden md:block">
            Project Index / <span className="text-cyan-400 font-semibold">境行 · INJOY 精确生态</span>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center px-6 md:px-16 lg:px-24 pt-36 pb-20 overflow-hidden">
          <div className="max-w-7xl mx-auto w-full space-y-16">
             <motion.div
               initial={{ opacity: 0, y: 50 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
               className="space-y-8"
             >
                <div className="space-y-4">
                   <div className="flex items-center gap-3 text-cyan-400">
                     <span className="text-xs font-mono tracking-[0.5em] uppercase">Human-Centric EV Cockpit Midcore UX</span>
                     <div className="h-[1px] w-16 bg-gradient-to-r from-cyan-400 to-transparent" />
                   </div>
                   <h1 className="text-4xl md:text-7xl lg:text-8xl font-medium tracking-tighter leading-none text-white font-sans">
                     境行 · INJOY
                   </h1>
                   <p className="text-lg md:text-xl text-slate-400 font-light max-w-4xl leading-relaxed">
                     现代极简互联车控体验。集成了车载 16:9 智能大屏 HMI 与手机端生态车控 App。本方案聚焦“零焦虑补能”、“自适应状态透明化”和“座舱微环境一键微调”，彻底打破车机与手持端的零散断层，让控车化繁为简、温和且具有前瞻性。
                   </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                   <div className="p-8 rounded-[2rem] border border-white/5 bg-white/[0.01] hover:border-cyan-500/10 transition-colors space-y-3">
                      <h4 className="text-sm font-medium text-slate-300">信息读取负载</h4>
                      <div className="text-3xl font-mono text-cyan-400 font-bold">-50%</div>
                      <p className="text-xs text-slate-500 leading-relaxed font-light">重构信息亲密性组织框架，对高安全敏感指标（如胎压）进行瞬时视觉提炼，隔绝冗余杂讯。</p>
                   </div>
                   <div className="p-8 rounded-[2rem] border border-white/5 bg-white/[0.01] hover:border-cyan-500/10 transition-colors space-y-3">
                      <h4 className="text-sm font-medium text-slate-300">补能决策链路</h4>
                      <div className="text-3xl font-mono text-cyan-400 font-bold">-80%</div>
                      <p className="text-xs text-slate-500 leading-relaxed font-light">将宏观路线向微观车位导航精细对齐，一秒同步超重液冷、空闲休息位等极具质量的补能数据。</p>
                   </div>
                   <div className="p-8 rounded-[2rem] border border-white/5 bg-white/[0.01] hover:border-cyan-500/10 transition-colors space-y-3">
                      <h4 className="text-sm font-medium text-slate-300">异常主动拦截</h4>
                      <div className="text-3xl font-mono text-emerald-400 font-bold">2.4s</div>
                      <p className="text-xs text-slate-500 leading-relaxed font-light">毫米级感知并下发轻量悬挂卡片，算法白盒化呈现卫星差分自愈机制，消除黑盒化系统信任摩擦。</p>
                   </div>
                </div>
             </motion.div>
          </div>
        </section>

        {/* BLOCK 1: 项目介绍 / 手机端车控生态中枢 */}
        <section className="relative px-6 md:px-16 lg:px-24 py-24 border-t border-white/5 bg-white/[0.002]">
          <div className="max-w-7xl mx-auto">
             <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                
                {/* Visual Description Left */}
                <div className="lg:col-span-6 space-y-8">
                   <div className="space-y-4">
                      <div className="flex items-center gap-2 text-cyan-400">
                        <span className="text-xs font-mono tracking-widest text-[#00E5FF]">PART 01 // GENERAL CORE</span>
                      </div>
                      <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-white">
                        境行 · INJOY 手机端车控生态中枢
                      </h2>
                      <div className="h-[2px] w-12 bg-cyan-400" />
                   </div>

                   {/* DESIGN PAIN POINTS */}
                   <div className="p-6 rounded-2xl bg-red-950/10 border border-red-500/10 space-y-3">
                      <div className="flex items-center gap-2 text-red-400 text-sm font-medium">
                         <span className="text-xs">❌</span> 设计痛点 (Design Pain Points)
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed font-light">
                        <strong>状态信息杂乱，缺乏前瞻性视觉锚点</strong>：传统新能源车控 App 的主界面往往将续航、胎压、车况等数据扁平化堆砌，缺乏合理的亲密性（Proximity）组织框架。当车辆出现潜在安全隐患（如单轮低胎压）时，异常指标极易被淹没在海量正常文本中，造成安全风险感知的严重滞后。
                      </p>
                      <p className="text-xs text-slate-400 leading-relaxed font-light">
                        <strong>常用快捷按键（CTA）无差别排布，点击效率低下</strong>：车锁、车窗、临时寻车等控制按钮在不同场景下的使用频次和紧急度完全不同。将它们进行无差别等宽排布或隐藏在深层链路中，会导致用户在户外、停车场等急迫场景下的操作摩擦力（Friction）骤增。
                      </p>
                   </div>

                   {/* DESIGN APPROACH */}
                   <div className="p-6 rounded-2xl bg-emerald-950/10 border border-emerald-500/10 space-y-3">
                      <div className="flex items-center gap-2 text-[#00E676] text-sm font-medium">
                         <span className="text-xs">💡</span> 设计思路 (Design Approach)
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed font-light">
                        <strong>数字孪生可视化与空间亲密性架构</strong>：采用上半区域作为核心状态看板。顶部高亮外显核心续航里程（399 km）并搭配 <span className="text-[#00E5FF] font-semibold">车门已锁</span> 的安全状态闭环。中间部署 3D 数字孪生车模，并紧密耦合下方 四轮胎压自检 卡片，通过高辨识度的色彩管理（将右前异常胎压 2.4 bar 以高对比度暖橙色标出），实现高安全敏感度指标的即时视觉跳跃。
                      </p>
                      <p className="text-xs text-slate-400 leading-relaxed font-light">
                        <strong>场景化自适应热区编排（Thumb Zone Optimization）</strong>：中部常驻高频全局搜索框（搜索充电网点、心愿目的地），缩短补能决策路径。下半部分严格遵循移动端拇指触控热区，将车锁、车窗、后备箱、临停寻车四大高频刚需功能解构为极简、大尺寸的独立微光卡片，并以强弱色彩对比凸显当前状态，大幅提升盲操成功率与核心控制链路的响应效率。
                      </p>
                   </div>
                </div>

                {/* Interactive Phone Mockup Right */}
                <div className="lg:col-span-6 space-y-6">
                   <div className="relative mx-auto max-w-[340px] rounded-[3rem] border-[6px] border-slate-700 bg-black shadow-[0_0_80px_rgba(6,182,212,0.15)] overflow-hidden">
                      {/* Speaker Notch */}
                      <div className="absolute top-0 inset-x-0 h-5 bg-black z-30 flex items-center justify-center">
                         <div className="w-16 h-4 bg-slate-900 rounded-b-xl" />
                      </div>
                      
                      {/* App Frame Inner */}
                      <div className="p-4 pt-8 bg-[#070b13] text-white min-h-[580px] flex flex-col justify-between select-none">
                         {/* Header Status */}
                         <div className="flex justify-between items-center px-2 text-[10px] font-mono text-white/50">
                            <span>INJOY OS</span>
                            <span>{simulatedTime}</span>
                         </div>
                         
                         {/* Top Cruising Gauge */}
                         <div className="mt-4 p-4 rounded-2xl bg-white/[0.01] border border-white/5 text-center relative overflow-hidden">
                            <div className="absolute top-0 right-0 px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-[8px] font-mono rounded-bl-lg">ONLINE</div>
                            <span className="text-[10px] uppercase font-mono text-slate-400 tracking-wider">WLTP Cruising Range</span>
                            <div className="flex items-baseline justify-center gap-1 mt-1">
                               <span className="text-4xl font-mono font-bold text-[#00E5FF]">399</span>
                               <span className="text-xs text-slate-400">km</span>
                            </div>
                            <div className="mt-2 text-xs text-slate-300 flex items-center justify-center gap-2">
                               <span className="w-2 h-2 rounded-full bg-emerald-400" />
                               {doorLocked ? "车门已锁 · 守护闭环" : "车门已解锁 · 请留意安全"}
                            </div>
                         </div>

                         {/* Wireframe digital car simulation */}
                         <div className="my-6 relative flex flex-col items-center justify-center py-4">
                            <div className="absolute inset-0 bg-cyan-400/5 blur-xl rounded-full" />
                            <Car className={`w-32 h-20 text-cyan-400/80 transition-all duration-700 ${alarmActive ? 'animate-pulse scale-105 text-amber-400' : ''}`} />
                            <div className="absolute bottom-1 bg-black/40 px-3 py-1 rounded-full border border-white/5 text-[9px] font-mono text-slate-400">
                               Digital Twin State v2.0
                            </div>
                         </div>

                         {/* Tire Pressure Container */}
                         <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                            <div className="flex justify-between items-center text-[9px] font-mono text-slate-400 px-1">
                               <span>四轮胎压智能检测</span>
                               <span className="text-amber-400 font-semibold">{rightFrontPressure === 2.1 ? "右前警报异常" : "自检状态优"}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                               <div className="p-2 bg-black/30 border border-white/5 rounded-lg flex justify-between">
                                  <span className="text-slate-500">左前:</span> <span>{leftFrontPressure} bar</span>
                               </div>
                               <div className={`p-2 bg-black/30 border rounded-lg flex justify-between transition-colors ${rightFrontPressure === 2.1 ? 'border-amber-500/30 bg-amber-500/5 text-amber-400' : 'border-white/5 text-slate-300'}`}>
                                  <span className="text-slate-500">右前:</span> <span>{rightFrontPressure} bar</span>
                               </div>
                               <div className="p-2 bg-black/30 border border-white/5 rounded-lg flex justify-between">
                                  <span className="text-slate-500">左后:</span> <span>2.5 bar</span>
                               </div>
                               <div className="p-2 bg-black/30 border border-white/5 rounded-lg flex justify-between">
                                  <span className="text-slate-500">右后:</span> <span>2.5 bar</span>
                               </div>
                            </div>
                         </div>

                         {/* Quick CTA - Thumb layout */}
                         <div className="mt-3 grid grid-cols-2 gap-2.5">
                            <button 
                              onClick={() => setDoorLocked(!doorLocked)}
                              className={`py-3 rounded-xl border font-medium text-xs flex flex-col items-center justify-center gap-1 transition-all duration-300 ${doorLocked ? 'bg-cyan-500 border-cyan-400 text-black' : 'bg-white/5 border-white/10 text-white hover:bg-white/10'}`}
                            >
                               <span className="text-sm">🔑</span>
                               <span>{doorLocked ? "解锁车辆" : "锁紧车辆"}</span>
                            </button>
                            
                            <button 
                              onClick={() => {
                                setAlarmActive(true);
                                setTimeout(() => setAlarmActive(false), 2000);
                              }}
                              className={`py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-xs flex flex-col items-center justify-center gap-1 ${alarmActive ? 'border-red-500 text-red-400 bg-red-500/10 animate-shake' : ''}`}
                            >
                               <span className="text-sm">🔊</span>
                               <span>寻车鸣笛/闪灯</span>
                            </button>
                         </div>
                      </div>
                   </div>
                   
                   <ImageRenderer 
                      title="第一部分项目介绍：车控生态中枢 境行主界面" 
                      src="/境行主界面.png" 
                      className="w-full aspect-[16/10] shadow-2xl mt-4" 
                   />
                </div>

             </div>
          </div>
        </section>

        {/* BLOCK 2: 手机端精细化车控矩阵 */}
        <section className="relative px-6 md:px-16 lg:px-24 py-24 bg-white/[0.005]">
          <div className="max-w-7xl mx-auto">
             <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                
                {/* Visual Interactivity Left */}
                <div className="lg:col-span-6 space-y-6">
                   <div className="p-8 rounded-[3rem] border border-white/5 bg-[#0a0f1d] shadow-[0_0_60px_rgba(6,182,212,0.1)] space-y-6">
                      <div className="flex justify-between items-center border-b border-white/5 pb-4">
                         <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">VEHICLE CONTROL MATRIX DECK</span>
                         <span className="text-[10px] font-mono text-slate-500">Live Configurator</span>
                      </div>

                      {/* Control grid */}
                      <div className="space-y-4">
                         <span className="text-xs font-mono text-slate-400 block">车辆控制 · VEHICLE CONTROL PANEL</span>
                         <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-mono">
                            <button className="p-3 bg-white/[0.02] border border-white/5 rounded-xl hover:border-cyan-400/30 text-xs transition-all flex flex-col items-center gap-1">
                               <span>🔌</span>
                               <span className="text-slate-400">充电口</span>
                            </button>
                            <button className="p-3 bg-white/[0.02] border border-white/5 rounded-xl hover:border-cyan-400/30 text-xs transition-all flex flex-col items-center gap-1">
                               <span>⚡</span>
                               <span className="text-slate-400">12V供能</span>
                            </button>
                            <button className="p-3 bg-white/[0.02] border border-white/5 rounded-xl hover:border-cyan-400/30 text-xs transition-all flex flex-col items-center gap-1">
                               <span>📯</span>
                               <span className="text-slate-400">鸣笛闪灯</span>
                            </button>
                            <button 
                              onClick={() => setRightFrontPressure(prev => prev === 2.1 ? 2.4 : 2.1)}
                              className={`p-3 border rounded-xl text-xs transition-all flex flex-col items-center gap-1 ${rightFrontPressure === 2.1 ? 'bg-amber-500/10 border-amber-500/30' : 'bg-white/[0.02] border-white/5'}`}
                            >
                               <span>🎈</span>
                               <span className={rightFrontPressure === 2.1 ? 'text-amber-400 font-semibold' : 'text-slate-400'}>
                                 {rightFrontPressure === 2.1 ? "重置胎压" : "微调胎压"}
                               </span>
                            </button>
                         </div>
                      </div>

                      {/* Climate quick action presets */}
                      <div className="space-y-3">
                         <div className="flex justify-between items-center">
                            <span className="text-xs font-mono text-slate-400">一键式高感官座舱场景预设</span>
                            <span className="text-xs font-bold text-cyan-400 font-mono">27.0°C 外显</span>
                         </div>
                         <div className="text-[10px] text-slate-400 font-mono italic">提示: 自动风量平衡 · 无微风感人感已激活</div>
                         <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                            <button 
                              onClick={() => setAcPreset('heat')}
                              className={`p-3 border rounded-xl flex items-center justify-center gap-1 transition-all ${acPreset === 'heat' ? 'bg-[#00E5FF]/10 border-[#00E5FF] text-[#00E5FF] font-semibold' : 'bg-white/[0.01] border-white/5 text-slate-400 hover:bg-white/5'}`}
                            >
                               <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-ping" />
                               极速升温
                            </button>
                            <button 
                              onClick={() => setAcPreset('cool')}
                              className={`p-3 border rounded-xl flex items-center justify-center gap-1 transition-all ${acPreset === 'cool' ? 'bg-[#00E5FF]/10 border-[#00E5FF] text-[#00E5FF] font-semibold' : 'bg-white/[0.01] border-white/5 text-slate-400 hover:bg-white/5'}`}
                            >
                               极速降温
                            </button>
                            <button 
                              onClick={() => setAcPreset('plasma')}
                              className={`p-3 border rounded-xl flex items-center justify-center gap-1 transition-all ${acPreset === 'plasma' ? 'bg-[#00E5FF]/10 border-[#00E5FF] text-[#00E5FF] font-semibold' : 'bg-white/[0.01] border-white/5 text-slate-400 hover:bg-white/5'}`}
                            >
                               等离子除味
                            </button>
                         </div>
                      </div>

                      {/* Remote Auto Parking */}
                      <div className="p-4 rounded-xl bg-cyan-950/10 border border-cyan-500/10 space-y-2">
                         <div className="flex justify-between items-center text-xs">
                            <span className="font-mono text-slate-300">智能泊车 · SMART PARKING</span>
                            <span className="text-[10px] font-mono text-emerald-400">已唤醒</span>
                         </div>
                         <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                            <button 
                               onClick={() => setParkingMode('inout')}
                               className={`p-2.5 rounded-lg border transition-colors ${parkingMode === 'inout' ? 'bg-cyan-500/20 border-cyan-400 text-white' : 'bg-black/40 border-white/5 text-slate-400'}`}
                            >
                               进出车位
                            </button>
                            <button 
                               onClick={() => setParkingMode('remote')}
                               className={`p-2.5 rounded-lg border transition-colors ${parkingMode === 'remote' ? 'bg-cyan-500/20 border-cyan-400 text-white' : 'bg-black/40 border-white/5 text-slate-400'}`}
                            >
                               遥控泊车
                            </button>
                         </div>
                         <p className="text-[9px] font-mono text-cyan-400/80 leading-relaxed pt-1">
                            🤖 *境行自适应车算法已唤醒，正在加载激光雷达传感器图层进行安全护航
                         </p>
                      </div>
                   </div>
                   
                   <ImageRenderer 
                      title="第二部分精细化车控展示：1.png" 
                      src="/1.png" 
                      className="w-full aspect-[16/10] shadow-2xl mt-4" 
                   />
                </div>

                {/* Visual Description Right */}
                <div className="lg:col-span-6 space-y-8">
                   <div className="space-y-4">
                      <div className="flex items-center gap-2 text-cyan-400">
                        <span className="text-xs font-mono tracking-widest text-[#00E5FF]">PART 02 // DETAILED ECO-MATRIX</span>
                      </div>
                      <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-white">
                        境行 · INJOY 手机端精细化车控矩阵
                      </h2>
                      <div className="h-[2px] w-12 bg-cyan-400" />
                   </div>

                   {/* DESIGN PAIN POINTS */}
                   <div className="p-6 rounded-2xl bg-red-950/10 border border-red-500/10 space-y-3">
                      <div className="flex items-center gap-2 text-red-400 text-sm font-medium">
                         <span className="text-xs">❌</span> 设计痛点 (Design Pain Points)
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed font-light">
                        <strong>高频次级控制链的归纳失序</strong>：智能汽车拥有庞大的电子控制节点（如充电口、12V电源、智能空调、泊车等）。传统 App 在用户下滑屏幕时，容易出现信息流逻辑断层或图标样式各异的问题，导致用户在寻找特定硬件开关（如“鸣笛闪灯”）时视觉检索效率低下。
                      </p>
                      <p className="text-xs text-slate-400 leading-relaxed font-light">
                        <strong>复杂环境调节功能的操作繁琐性</strong>：传统的空调或智能泊车模块往往需要进入多级子页面进行参数调校。在炎热夏季或拥挤车位前，这种漫长的交互路径会导致用户在车外远程控车时产生极强的操作焦虑与时间损耗。
                      </p>
                   </div>

                   {/* DESIGN APPROACH */}
                   <div className="p-6 rounded-2xl bg-emerald-950/10 border border-emerald-500/10 space-y-3">
                      <div className="flex items-center gap-2 text-[#00E676] text-sm font-medium">
                         <span className="text-xs">💡</span> 设计思路 (Design Approach)
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed font-light">
                        <strong>二级高精控制符号化网格（Information Hierarchy）</strong>：下滑界面通过清晰的模块化卡片（Card Container）重构了底盘控制链。*车辆控制 · VEHICLE CONTROL* 区域采用极极简的线性徽章图标（充电口、12V电源、鸣笛、闪灯、胎压）横向一字排开，并提供快捷详情分析入口，以极高的可读性（Scannability）精简了次级高频操作的触达路径。
                      </p>
                      <p className="text-xs text-slate-400 leading-relaxed font-light">
                        <strong>一键式高感官座舱场景预设（Scenario-Based UX）</strong>：
                        <br />
                        • <strong>智能空调模块</strong>：打破常规的增减度数操作限制，通过加粗文本 <span className="font-semibold text-cyan-400">27.0°C</span> 外显状态，并提供动态文案提示（自动风量平衡 · 无微风感人感）。下方直接平铺三大刚需场景快捷键：正在运行的 <span className="text-[#00E5FF] font-semibold">极速升温</span>（以高辨识度青蓝色包裹并带有状态呼吸点）、极速降温 与 等离子除味，实现零步长（Zero-Step）的座舱环境一键速达。
                        <br />
                        • <strong>智能泊车模块</strong>：界面底部平滑承接 *智能泊车 · SMART PARKING* 中枢，分段卡片提供 *进出车位* 与 *遥控泊车* 顶层决策切换。利用“境行自适应车算法已唤醒”的文字锚点，在底层数据加载时给用户确定性的安全心理暗示，打造极致平滑的智能硬件远程驾驭体验。
                      </p>
                   </div>
                </div>

             </div>
          </div>
        </section>

        {/* BLOCK 3: 智能出行补能与发现中枢 */}
        <section className="relative px-6 md:px-16 lg:px-24 py-24">
          <div className="max-w-7xl mx-auto">
             <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                
                {/* Visual Description Left */}
                <div className="lg:col-span-6 space-y-8">
                   <div className="space-y-4">
                      <div className="flex items-center gap-2 text-cyan-400">
                        <span className="text-xs font-mono tracking-widest text-[#00E5FF]">PART 03 // POWER CHARGE SYSTEMS</span>
                      </div>
                      <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-white">
                        境行 · INJOY 智能出行补能与发现中枢
                      </h2>
                      <div className="h-[2px] w-12 bg-cyan-400" />
                   </div>

                   {/* DESIGN PAIN POINTS */}
                   <div className="p-6 rounded-2xl bg-red-950/10 border border-red-500/10 space-y-3">
                      <div className="flex items-center gap-2 text-red-400 text-sm font-medium">
                         <span className="text-xs">❌</span> 设计痛点 (Design Pain Points)
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed font-light">
                        <strong>车位微观定位模糊导致的“补能焦虑”</strong>：传统导航 App 或车控 App 往往只能将用户引导至广义的目的地（如某产业园），而无法提供地库、楼层及桩位的微观精准引导。当车主急需充电时，极易因“找桩、找车位”引发严重的行车摩擦力与时间损耗。
                      </p>
                      <p className="text-xs text-[#94a3b8] leading-relaxed font-light">
                        <strong>网点静态信息堆砌，缺乏动态服务感知</strong>：普通的充电桩推荐列表通常只展示基础距离，不外显实时空闲状态（如是否有空闲枪头、休息区是否开放等）。这种信息的不透明导致用户盲目前往后面临排队、无桩可用的服务断层风险。
                      </p>
                   </div>

                   {/* DESIGN APPROACH */}
                   <div className="p-6 rounded-2xl bg-emerald-950/10 border border-emerald-500/10 space-y-3">
                      <div className="flex items-center gap-2 text-[#00E676] text-sm font-medium">
                         <span className="text-xs">💡</span> 设计思路 (Design Approach)
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed font-light">
                        <strong>轻量化数字微地图与无感空间锚定</strong>：在应用中，界面顶部创新性引入 *快速查找 · 智能出行补能* 卡片。利用卫星无感厘米级高精定位技术，将文字锚点直接精确至 <span className="text-[#00E5FF]">深圳市高新产业中核心产业园B5停车场</span>。地图内直观渲染 我的车 · 当前点 空间相对位置，并外显 *科技港快充 1.2km* 与 *免费合作桩 2.4km* 标签，通过极极简的轻地图交互，实现宏观导航向微观车道/车位级转译的无缝过渡。
                      </p>
                      <p className="text-xs text-slate-400 leading-relaxed font-light">
                        <strong>基于“智能流”的主动式网点推荐与一键触达（Dynamic Feed Card）</strong>：
                        <br />
                        • <strong>深度信息外显，消除决策顾虑</strong>：下方 *智能推送补能网点* 模块打破传统列表样式，采用高 Scannability 的动态信息网格。例如：*境行高压分布式直流超充网络 👑 01* 卡片中，直接透出 *空闲超高压液冷枪柱 12 根 · 空闲休息室已到位* 等核心高价值信息；*万象天成高速极速直流桩群* 则外显 *平均功率 240kW | 商超地下免费免单停*，让车主在未出发前即可完成确定性的心理预期建立。
                        <br />
                        • <strong>高对比 CTA 全局唤醒</strong>：每个推荐卡片右侧部署高对比度的 *导航* 黑色按钮，作为全局核心行动点（CTA），支持车主一键将最优补能流无缝同步至车机 HMI 大屏，达成跨端服务连续性的完美闭环。
                      </p>
                   </div>
                </div>

                {/* Interactive Map Feed Right */}
                <div className="lg:col-span-6 space-y-4">
                   <div className="p-6 rounded-[2.5rem] bg-[#090e1a] border border-white/5 space-y-5">
                      <div className="flex justify-between items-center pb-2 border-b border-white/5">
                         <div>
                            <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-widest">快速查找 · 智能出行补能</h4>
                            <p className="text-[10px] text-slate-400 font-sans mt-0.5">高精全场景感知网格系统</p>
                         </div>
                         <button 
                           onClick={() => {
                             setHudSynced(true);
                             setTimeout(() => setHudSynced(false), 2500);
                           }}
                           className="px-3 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-full font-mono text-[9px] uppercase tracking-wider transition-colors"
                         >
                            SYNC TO AUTOMOBILE
                         </button>
                      </div>

                      {/* Micro Map Mock */}
                      <div className="h-44 rounded-2xl bg-black/40 border border-[#00E5FF]/20 relative overflow-hidden flex flex-col justify-end p-3">
                         {/* Visual radar animation effect */}
                         <div className="absolute inset-0 bg-radial-gradient opacity-20" />
                         <div className="absolute top-1/2 left-1/3 w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                         <div className="absolute top-1/2 left-1/3 w-2 h-2 rounded-full bg-cyan-500" />
                         <div className="absolute top-1/4 right-1/4 w-2 h-2 rounded-full bg-emerald-400" />
                         
                         {/* Map Pins overlay */}
                         <div className="absolute top-6 left-12 px-2 py-1 bg-black/80 border border-cyan-400/30 rounded-lg text-[8px] font-mono whitespace-nowrap">
                            科技港快充 1.2km
                         </div>
                         <div className="absolute bottom-12 right-12 px-2 py-1 bg-black/80 border border-emerald-400/30 rounded-lg text-[8px] font-mono whitespace-nowrap">
                            免费合作桩 2.4km
                         </div>

                         <div className="relative z-10 p-3 rounded-xl bg-black/80 border border-white/10 backdrop-blur-md">
                            <p className="text-[9px] font-mono text-slate-400">当前精确对准：</p>
                            <p className="text-xs font-sans text-white font-medium">深圳市高新产业中核心产业园B5停车场</p>
                         </div>
                      </div>

                      {/* Recommend feeds */}
                      <div className="space-y-3">
                         <span className="text-xs font-mono text-slate-400 block">智能推送补能网点 (Dynamic Feed Card)</span>
                         
                         {/* Feed item 1 */}
                         <div className="p-3.5 rounded-2xl bg-black/40 border border-[#00d1ff]/20 flex justify-between items-center gap-4">
                            <div className="space-y-1 text-xs">
                               <div className="flex items-center gap-1.5">
                                  <span className="font-semibold text-white">境行高压分布式直流超充网络 👑 01</span>
                                  <span className="px-1.5 py-0.5 bg-yellow-400/10 text-yellow-400 text-[8px] rounded">EXCLUSIVE</span>
                               </div>
                               <p className="text-[10px] text-cyan-400 font-medium">空闲超高压液冷枪柱 12 根 · 空闲休息室已到位</p>
                               <p className="text-[8px] font-mono text-slate-500">距您 1.2 km | 平均功率 480kW</p>
                            </div>
                            <button className="px-3.5 py-2 bg-white text-black hover:bg-slate-200 text-[10px] font-semibold rounded-lg font-mono tracking-wider transition-colors">
                               导航
                            </button>
                         </div>

                         {/* Feed item 2 */}
                         <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 flex justify-between items-center gap-4">
                            <div className="space-y-1 text-xs">
                               <div className="flex items-center gap-1.5">
                                  <span className="font-semibold text-slate-300">万象天成高速极速直流桩群</span>
                               </div>
                               <p className="text-[10px] text-slate-400">平均功率 240kW | 商超地下免费免单停</p>
                               <p className="text-[8px] font-mono text-slate-500">距您 2.4 km | 闲置枪 4 根</p>
                            </div>
                            <button className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white text-[10px] font-mono tracking-wider transition-colors rounded-lg">
                               导航
                            </button>
                         </div>
                      </div>

                      {/* HUD sync confirmation visual toast */}
                      {hudSynced && (
                         <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-center text-xs font-mono animate-fadeIn font-sans">
                            ✔️ 补能服务流（500A超级充网络）成功无感同步至车载 HMI Hanger 屏幕上锁对齐！
                         </div>
                      )}
                   </div>
                   
                   <ImageRenderer 
                      title="第三部分智能补能发现中枢：2.png" 
                      src="/2.png" 
                      className="w-full aspect-[16/10] shadow-2xl mt-4" 
                   />
                </div>

             </div>
          </div>
        </section>

        {/* BLOCK 4: 实时座舱状态提示系统 */}
        <section className="relative px-6 md:px-16 lg:px-24 py-24 bg-white/[0.002]">
          <div className="max-w-7xl mx-auto">
             <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                
                {/* Visual Interactivity Left */}
                <div className="lg:col-span-6 space-y-6">
                   <div className="relative p-6 rounded-[2.5rem] border border-white/5 bg-[#090b14] shadow-[0_0_80px_rgba(6,182,212,0.12)] space-y-6 overflow-hidden">
                      {/* Grid background mesh mimicking HUD overlays */}
                      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
                      
                      <div className="flex justify-between items-center border-b border-white/5 pb-4 relative z-10">
                         <span className="text-xs font-mono text-cyan-400 tracking-wider">PROACTIVE ALGORITHM STATUS VIEWER</span>
                         <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                      </div>

                      <div className="space-y-4 relative z-10">
                         <span className="text-xs font-mono text-slate-400 block">实时微光悬挂气泡提示组</span>
                         
                         {/* Transparent Floating alert widget for Satellite realignment */}
                         <div className="p-4 rounded-2xl bg-black/70 border border-[#00d1ff]/30 shadow-2xl backdrop-blur-xl space-y-3">
                            <div className="flex items-center justify-between text-xs font-mono text-cyan-400">
                               <span>🧭 境行·INJOY 实时座舱状态</span>
                               <span>SYSTEM AUTO-FIX</span>
                            </div>
                            <h5 className="text-sm font-medium text-white">卫星差分坐标图层重新解算对齐</h5>
                            <p className="text-[11px] text-slate-400 leading-relaxed font-light">
                               为了在地下多重遮罩极窄区域实现更优等宽安全泊宿（20cm拼边缘），系统成功完成坐标校验，行车自愈图重置完成。
                            </p>
                            <div className="flex justify-between items-center pt-2 border-t border-white/5 text-[9px] font-mono text-slate-500">
                               <span>精度误差 &lt; 0.02m</span>
                               <span className="text-emerald-400">实时白盒算法传输中</span>
                            </div>
                         </div>

                         {/* Mini list items explaining the triggers */}
                         <div className="space-y-2 text-xs">
                            <div className="p-3 bg-white/[0.01] border border-white/5 rounded-xl flex items-center justify-between">
                               <div>
                                  <p className="font-semibold text-slate-300">防淹没悬挂机制 (Non-blocking Floating)</p>
                                  <p className="text-[10px] text-slate-500 mt-0.5">不强行中断搜寻路线，半透明底蕴对比一秒吸睛</p>
                               </div>
                               <span className="text-[#00E5FF] font-mono text-[10px]">ACTIVE</span>
                            </div>
                            <div className="p-3 bg-white/[0.01] border border-white/5 rounded-xl flex items-center justify-between">
                               <div>
                                  <p className="font-semibold text-slate-300">确定性心智暗示 (Trust Architecture)</p>
                                  <p className="text-[10px] text-slate-500 mt-0.5">技术细节白盒公开，人车稳固信任搭建</p>
                               </div>
                               <span className="text-[#00E5FF] font-mono text-[10px]">READY</span>
                            </div>
                         </div>
                      </div>
                   </div>
                   
                   <ImageRenderer 
                      title="第四部分座舱状态系统展示：3.png" 
                      src="/3.png" 
                      className="w-full aspect-[16/10] shadow-2xl mt-4" 
                   />
                </div>

                {/* Visual Description Right */}
                <div className="lg:col-span-6 space-y-8">
                   <div className="space-y-4">
                      <div className="flex items-center gap-2 text-cyan-400">
                        <span className="text-xs font-mono tracking-widest text-[#00E5FF]">PART 04 // ALGORITHM WHITEPAPER UX</span>
                      </div>
                      <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-white">
                        境行 · INJOY 实时座舱状态提示系统
                      </h2>
                      <div className="h-[2px] w-12 bg-cyan-400" />
                   </div>

                   {/* DESIGN PAIN POINTS */}
                   <div className="p-6 rounded-2xl bg-red-950/10 border border-red-500/10 space-y-3">
                      <div className="flex items-center gap-2 text-red-400 text-sm font-medium">
                         <span className="text-xs">❌</span> 设计痛点 (Design Pain Points)
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed font-light">
                        <strong>黑盒化底层算法状态，引发系统信任危机</strong>：在高精地图导航、自动泊车或地下微观定位等高阶智驾算法运行过程中，底层数据的解算、对齐与更新往往处于“黑盒状态”。当系统发生定位修正或数据重算时，若缺乏即时且明确的白盒化感知，用户极易对当前的定位精度产生怀疑，进而引发极高的心理操作焦虑。
                      </p>
                      <p className="text-xs text-slate-400 leading-relaxed font-light">
                        <strong>通知机制缺乏动态层级，易被淹没或造成过度干扰</strong>：传统车载或车控 App 的通知常常采用低辨识度的底部小字（Toast）或者强阻断式的全局居中弹窗。前者极易被车主的视觉盲区忽略，后者则会强行中断用户当前的补能网点检索链路，严重破坏了出行的服务连续性。
                      </p>
                   </div>

                   {/* DESIGN APPROACH */}
                   <div className="p-6 rounded-2xl bg-emerald-950/10 border border-emerald-500/10 space-y-3">
                      <div className="flex items-center gap-2 text-[#00E676] text-sm font-medium">
                         <span className="text-xs">💡</span> 设计思路 (Design Approach)
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed font-light">
                        <strong>主动式“智驾流”状态白盒化设计（Proactive & Transparent UX）</strong>：在设计重构中，系统捕获到空间算法的底层动态后，立即以“境行·INJOY 实时座舱状态”为主体进行前瞻性告知。通过文案 <span className="text-[#00E5FF] font-semibold">🧭 卫星差分坐标图层重新解算对齐</span>，将高精定位系统的自愈过程透明化呈现。不仅向车主传递了精准的系统运转意图，更通过“确定性”的技术词汇建立了极其稳固的人机信任（Trust Building）桥梁。
                      </p>
                      <p className="text-xs text-slate-400 leading-relaxed font-light">
                        <strong>轻量化非阻断式微光悬浮悬挂（Floating Motion & Micro Glow）</strong>：
                        <br />
                        • <strong>高 scannability 视觉层级</strong>：提示组件打破常规布局，采用高雅的深黑色半透明微光卡片，悬浮叠置于地图图层上方。其色彩与下方的浅色补能列表形成鲜明的明暗对比（High Contrast），确保车主在下滑浏览、筛选充电网点时，视线能第一秒精准捕捉系统状态。
                        <br />
                        • <strong>非阻断式的交互克制</strong>：该状态组件在顶部轻量化常驻并提供微小的关闭按钮（X），它不强制阻断用户对下方“境行高压分布式直流超充网络”等核心卡片的触控和导航操作，完美遵循了数据渐进式披露（Progressive Disclosure）与无感交互原则。
                      </p>
                   </div>
                </div>

             </div>
          </div>
        </section>

        {/* BLOCK 5: 车友大本营与生态社区 */}
        <section className="relative px-6 md:px-16 lg:px-24 py-24">
          <div className="max-w-7xl mx-auto">
             <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                
                {/* Visual Description Left */}
                <div className="lg:col-span-6 space-y-8">
                   <div className="space-y-4">
                      <div className="flex items-center gap-2 text-cyan-400">
                        <span className="text-xs font-mono tracking-widest text-[#00E5FF]">PART 05 // COMMUNITY CO-CREATION</span>
                      </div>
                      <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-white">
                        境行 · INJOY 车友大本营与生态社区
                      </h2>
                      <div className="h-[2px] w-12 bg-cyan-400" />
                   </div>

                   {/* DESIGN PAIN POINTS */}
                   <div className="p-6 rounded-2xl bg-red-950/10 border border-red-500/10 space-y-3">
                      <div className="flex items-center gap-2 text-red-400 text-sm font-medium">
                         <span className="text-xs">❌</span> 设计痛点 (Design Pain Points)
                      </div>
                      <p className="text-xs text-[#f1f5f9] leading-relaxed font-light">
                        <strong>传统车友社区信息杂乱，软硬件价值链脱节</strong>：许多新能源品牌的车友社区往往流于形式，灌水内容严重，且用户的真实用车反馈（如特定天气下的硬件表现、极限场景的智驾体验）缺乏高 Scannability 的视觉卡片归纳，导致核心高价值口碑被淹没在冗余的社交碎片中。
                      </p>
                      <p className="text-xs text-slate-400 leading-relaxed font-light">
                        <strong>用户身份标签模糊，缺乏圈层信任感与共鸣</strong>：普通社区中无法一眼识别发言者的“车主身份”或“专业属性”（例如是首批车主还是专业测评师）。这种信息不对称降低了内容的权威性，车主之间难以快速建立起基于共同车机、算法、生活方式的情感链接与社群粘性。
                      </p>
                   </div>

                   {/* DESIGN APPROACH */}
                   <div className="p-6 rounded-2xl bg-[#032e18] bg-opacity-30 border border-emerald-500/15 space-y-3">
                      <div className="flex items-center gap-2 text-[#00E676] text-sm font-medium">
                         <span className="text-xs">💡</span> 设计思路 (Design Approach)
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed font-light">
                        <strong>基于“身份锚定”的精细化内容流卡片架构（Identity & Trust Anchoring）</strong>：社区流采用了模块化聚合卡片设计，并对发言车主实施显性化的全场景标签管理。
                        <br />
                        • <strong>种子车主圈层</strong>：首个动态透出“上海车友 · IN_J99”，并附带副标题标签 <span className="text-[#00E5FF] font-semibold">境行首批创始车主</span>。文案通过真实场景（“394km WLTP 通勤与露营”、“梅雨季节等离子自净神器”）将产品硬核功能无缝转译为高感官的生活方式叙事。
                        <br />
                        • <strong>硬核极客圈层</strong>：第二个动态聚焦“首测官 · 极地大轮毂”，并加持深度极客标签 <span className="text-cyan-400 font-semibold">纯电独立算法实验室</span>。其文案通过极极具说服力的指标数据（“两侧间隙不到 20cm 的极限狭窄立柱停车”、“长按直线召回泊车平贴入库”），将抽象的智驾算法能力具象化，以极高的信任度击中潜在用户的核心痛点。
                      </p>
                      <p className="text-xs text-slate-400 leading-relaxed font-light">
                        <strong>克制且聚焦的社交微互动体系（Lean Engagement System）</strong>：界面底部平滑承接极极简的“赞/评论”数据外显，去除了多余的视觉噪音，引导用户将视线聚焦于“车友大本营 · 境行社区”的核心高品质 UGC 内容，通过高Scannability的排版完美达成品牌口碑沉淀与高粘度用户生态闭环。
                      </p>
                   </div>
                </div>

                {/* Interactive Feed Stream Right */}
                <div className="lg:col-span-6 space-y-4">
                   <div className="p-6 rounded-[2.5rem] bg-[#080d16] border border-white/5 space-y-4">
                      <div className="flex items-center justify-between border-b border-white/5 pb-2">
                         <span className="text-xs font-mono text-cyan-400 tracking-wider">境行社区 · HIGHLIGHT UGC FEED</span>
                         <span className="text-[10px] font-mono text-slate-500">24h Hot</span>
                      </div>

                      {/* Post 1 */}
                      <div className="p-4 rounded-2xl bg-black/40 border border-white/5 hover:border-[#00d1ff]/20 transition-all space-y-3">
                         <div className="flex justify-between items-start">
                            <div>
                               <div className="flex items-center gap-2">
                                  <h5 className="text-xs font-semibold text-white">上海车友 · IN_J99</h5>
                                  <span className="px-1.5 py-0.5 bg-cyan-400/10 text-cyan-400 text-[8px] font-mono rounded">境行首批创始车主</span>
                               </div>
                               <p className="text-[9px] text-slate-500 mt-0.5">上海 204kmWLTP 通勤探索者</p>
                            </div>
                            <span className="text-[10px] text-slate-500 font-mono">1.5h ago</span>
                         </div>
                         <p className="text-xs text-slate-300 leading-relaxed font-light">
                            “刚刚完成了 394km WLTP 的长线跨区通勤与湿地野营，不得不说，新一代底盘配上除霾等离子自净，在梅雨交替时简直是神一般的存在！零风感空调能安睡一整晚。”
                         </p>
                         <div className="flex items-center justify-between pt-2 border-t border-white/5">
                            <span className="text-[10px] font-mono text-slate-500">🏷️ #座舱高感空气净化</span>
                            <button 
                              onClick={() => toggleLike('post1')}
                              className={`flex items-center gap-1.5 transition-all text-xs font-mono ${liked.post1 ? 'text-[#00E5FF]' : 'text-slate-400'}`}
                            >
                               <span>👍</span>
                               <span>{likes.post1}</span>
                            </button>
                         </div>
                      </div>

                      {/* Post 2 */}
                      <div className="p-4 rounded-2xl bg-black/40 border border-white/5 hover:border-[#00d1ff]/20 transition-all space-y-3">
                         <div className="flex justify-between items-start">
                            <div>
                               <div className="flex items-center gap-2">
                                  <h5 className="text-xs font-semibold text-white">首测官 · 极地大轮毂</h5>
                                  <span className="px-1.5 py-0.5 bg-emerald-400/10 text-emerald-400 text-[8px] font-mono rounded">纯电独立算法实验室</span>
                               </div>
                               <p className="text-[9px] text-slate-500 mt-0.5">算法深度内测组成员</p>
                            </div>
                            <span className="text-[10px] text-slate-500 font-mono">3.2h ago</span>
                         </div>
                         <p className="text-xs text-slate-300 leading-relaxed font-light">
                            “两侧间隙不到 20cm 的极限地下极窄圆柱车位，手控直线召回完全不掉帧。车身自愈毫米精度激光解算很白盒很诚实，底盘气闭姿态调校完全平息了盲区焦虑。”
                         </p>
                         <div className="flex items-center justify-between pt-2 border-t border-white/5">
                            <span className="text-[10px] font-mono text-slate-500">🏷️ #智能算法遥控泊车</span>
                            <button 
                              onClick={() => toggleLike('post2')}
                              className={`flex items-center gap-1.5 transition-all text-xs font-mono ${liked.post2 ? 'text-[#00E5FF]' : 'text-slate-400'}`}
                            >
                               <span>👍</span>
                               <span>{likes.post2}</span>
                            </button>
                         </div>
                      </div>
                   </div>
                   
                   <div className="grid grid-cols-2 gap-4">
                      <ImageRenderer 
                         title="第五部分车友社区展示配图：4.png" 
                         src="/4.png" 
                         className="w-full aspect-[16/10] shadow-xl" 
                      />
                      <ImageRenderer 
                         title="第五部分车友社区备用配图：5.png" 
                         src="/5.png" 
                         className="w-full aspect-[16/10] shadow-2xl" 
                      />
                   </div>
                </div>

             </div>
          </div>
        </section>

        {/* BLOCK 6: 官方无界精选商城 */}
        <section className="relative px-6 md:px-16 lg:px-24 py-24 bg-white/[0.005]">
          <div className="max-w-7xl mx-auto">
             <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                
                {/* Visual Interactivity Left */}
                <div className="lg:col-span-6 space-y-6">
                   <div className="p-8 rounded-[3rem] border border-white/5 bg-[#070b13] space-y-6 shadow-[0_0_80px_rgba(6,182,212,0.1)]">
                      <div className="flex justify-between items-center border-b border-white/5 pb-3">
                         <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">BOUTIQUE PREMIUM DESIGN SHOP</span>
                         <span className="px-2 py-0.5 bg-[#00E5FF]/20 text-[#00E5FF] text-[8px] font-mono rounded">2026 IN-JOY ACC</span>
                      </div>

                      {/* Store Grid */}
                      <div className="grid grid-cols-2 gap-4">
                         {/* Product Item 1 */}
                         <div className="p-4 rounded-2xl bg-black/40 border border-white/5 hover:border-[#00d1ff]/20 transition-all flex flex-col justify-between h-72">
                            <div className="space-y-2">
                               <div className="flex justify-between items-start">
                                  <span className="px-1.5 py-0.5 bg-black text-white border border-white/10 text-[8px] font-mono rounded">HOT</span>
                                  <span className="text-[10px] font-mono text-[#00E5FF] font-semibold">⚡ CHARGING</span>
                               </div>
                               <h5 className="text-xs font-semibold text-slate-200 mt-2 leading-relaxed">
                                  7kW 智感家用智能双模充电桩 (安全防火款)
                               </h5>
                               <p className="text-[9px] text-slate-500 font-sans leading-relaxed">
                                  集成温控预警，支持车侧无感识别对齐，多重漏电绝缘等级防护认证。
                               </p>
                            </div>
                            <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-2">
                               <span className="text-xs font-mono text-cyan-400 font-semibold">¥ 2,999</span>
                               <button 
                                 onClick={() => setOrderedProduct('7kW 智感家用智能双模充电桩')}
                                 className="px-3 py-1.5 bg-[#00e5ff] text-black text-[9px] font-bold rounded hover:bg-cyan-300 font-mono tracking-wider uppercase transition-colors"
                               >
                                  订购
                               </button>
                            </div>
                         </div>

                         {/* Product Item 2 */}
                         <div className="p-4 rounded-2xl bg-black/40 border border-white/5 hover:border-[#00d1ff]/20 transition-all flex flex-col justify-between h-72">
                            <div className="space-y-2">
                               <div className="flex justify-between items-start">
                                  <span className="px-1.5 py-0.5 bg-black text-white border border-white/10 text-[8px] font-mono rounded">COMFORT</span>
                                  <span className="text-[10px] font-mono text-[#00E5FF] font-semibold">🛋️ CABIN</span>
                               </div>
                               <h5 className="text-xs font-semibold text-slate-200 mt-2 leading-relaxed">
                                  多维度高压全气压按摩多功能车载定制头枕
                               </h5>
                               <p className="text-[9px] text-slate-500 font-sans leading-relaxed">
                                  搭载九档物理震源波。记忆回弹贴合，专车专用气源阻闭。
                               </p>
                            </div>
                            <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-2">
                               <span className="text-xs font-mono text-cyan-400 font-semibold">¥ 489</span>
                               <button 
                                 onClick={() => setOrderedProduct('多维度高压全气压按摩车载定制头枕')}
                                 className="px-3 py-1.5 bg-[#00e5ff] text-black text-[9px] font-bold rounded hover:bg-cyan-300 font-mono tracking-wider uppercase transition-colors"
                               >
                                  订购
                               </button>
                            </div>
                         </div>
                      </div>

                      {/* Micro Dialog Confirmation */}
                      {orderedProduct && (
                         <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs flex justify-between items-center animate-fadeIn font-sans">
                            <span>🛒 已锁定 "${orderedProduct}" 意向订额！</span>
                            <button onClick={() => setOrderedProduct(null)} className="text-white hover:text-red-400 font-bold ml-2">×</button>
                         </div>
                      )}
                   </div>
                   
                   <ImageRenderer 
                      title="第六部分商城生态展示配图：6.png" 
                      src="/6.png" 
                      className="w-full aspect-[16/10] shadow-2xl mt-4" 
                   />
                </div>

                {/* Visual Description Right */}
                <div className="lg:col-span-6 space-y-8">
                   <div className="space-y-4">
                      <div className="flex items-center gap-2 text-cyan-400">
                        <span className="text-xs font-mono tracking-widest text-[#00E5FF]">PART 06 // INTUITIVE BOUTIQUE STORE</span>
                      </div>
                      <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-white">
                        境行 · INJOY 官方无界精选商城
                      </h2>
                      <div className="h-[2px] w-12 bg-cyan-400" />
                   </div>

                   {/* DESIGN PAIN POINTS */}
                   <div className="p-6 rounded-2xl bg-red-950/10 border border-red-500/10 space-y-3">
                      <div className="flex items-center gap-2 text-red-400 text-sm font-medium">
                         <span className="text-xs">❌</span> 设计痛点 (Design Pain Points)
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed font-light">
                        <strong>车主精品生态的决策阻力高</strong>：智能汽车的周边硬件（如家用充电桩）与舒适奢享配件（如定制头枕）通常客单价较高且涉及技术参数。传统车控 App 的商城板块往往将其作为普通零售商品陈列，缺乏关键硬核指标（如功率、气压机制、安全认证）的即时外显，导致用户面临漫长的决策链路与高昂的信任成本。
                      </p>
                      <p className="text-xs text-slate-400 leading-relaxed font-light">
                        <strong>传统双列布局信息过载与视觉杂乱</strong>：普通的电商双列流容易为了塞满空间而堆砌过多的视觉元素、斑驳的背景图和促销标签。在注重高级感的汽车品牌 App 中，这种设计会极大地破坏品牌的高品味调性，并降低用户的检索舒适度（Scannability）。
                      </p>
                   </div>

                   {/* DESIGN APPROACH */}
                   <div className="p-6 rounded-2xl bg-emerald-950/10 border border-emerald-500/10 space-y-3">
                      <div className="flex items-center gap-2 text-[#00E676] text-sm font-medium">
                         <span className="text-xs">💡</span> 设计思路 (Design Approach)
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed font-light">
                        <strong>平衡留白与信息外显的“呼吸感”双列网格（Boutique Matrix Grid）</strong>：在商城版面规划中，官方无界精选商城 采用了极致克制的卡片美学。背景使用低饱和度的深邃墨色承托，商品图采用悬浮式微缩拟物 3D 渲染，四周给予极其奢侈的呼吸留白，以一种极简的高级感强化了“精品（Boutique）”的品牌生态定位。
                      </p>
                      <p className="text-xs text-slate-400 leading-relaxed font-light">
                        <strong>基于安全与舒适硬核锚点的“零冗余”文案框架（High-Value Product Copy）</strong>：
                        <br />
                        • <strong>补能硬件锚点</strong>：左侧卡片直击车主的核心安全顾虑，文案前置关键参数，精准定名 <span className="text-[#00E5FF] font-semibold">7kW 智感家用智能双模充电桩 (安全防火款)</span>。配合微小的 *热卖* 黑色微标，不渲染促销焦虑，仅靠清晰的产品性能与安全锚点驱动车主理性决策。
                        <br />
                        • <strong>座舱生态锚点</strong>：右侧卡片完美呼应智能座舱的多维体验，命名为 <span className="text-[#00E5FF] font-semibold">多维度高压全气压按摩多功能车载定制头枕</span>。将“气压按摩、定制、多维度”等物理舒适属性转化为高可读性的标签文本，直击高端车主对长途驾驶舒适度的升级刚需。
                      </p>
                      <p className="text-xs text-slate-400 leading-relaxed font-light">
                        <strong>高聚合、低触达路径 of CTA 行动点</strong>：每个商品卡片底部将价格（如 <span className="font-semibold text-cyan-400">¥ 2,999</span> 与 <span className="font-semibold text-cyan-400">¥ 489</span>）与黑底白字的 <span className="px-2 py-1 bg-cyan-400 text-black rounded font-bold">订购</span> 胶囊按钮并置。没有层级繁琐的“加入购物车”中间态，而是通过一键直达的极简消费链路，完美达成车机硬件与精品配件的商业转化闭环。
                      </p>
                   </div>
                </div>

             </div>
          </div>
        </section>

        {/* FINAL EXIT */}
        <section className="relative h-[80vh] flex flex-col items-center justify-center border-t border-white/5 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-cyan-950/20 via-transparent to-transparent opacity-50 pointer-events-none" />
          <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
             className="relative z-10 flex flex-col items-center gap-16 group cursor-pointer animate-fadeIn"
             onClick={() => navigate('/')}
          >
            <div className="text-[10px] font-mono tracking-[2em] text-white/20 uppercase ml-12">Transmission Terminal</div>
            <h2 className="text-4xl md:text-8xl font-medium tracking-tighter text-white/10 group-hover:text-[#00e5ff] transition-all duration-1000 text-center px-10">
              EXIT CASE STUDY
            </h2>
            <div className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center glass group-hover:border-cyan-400/40 group-hover:scale-110 transition-all duration-700">
               <ArrowLeft className="w-6 h-6 text-slate-400 group-hover:text-[#00E5FF] transition-colors" />
            </div>
          </motion.div>
        </section>

        {/* FOOTER */}
        <footer className="px-10 py-24 border-t border-white/5 bg-black flex flex-col items-center gap-8">
           <div className="flex items-center gap-6">
              <div className="h-[1px] w-12 bg-white/10" />
              <div className="text-[10px] font-mono tracking-[1.5em] text-white/20 uppercase">INJOY EV HMI PORTFOLIO</div>
              <div className="h-[1px] w-12 bg-white/10" />
           </div>
           <div className="text-[10px] font-mono text-white/40 uppercase text-center max-w-lg leading-relaxed tracking-[0.2em]">
              This project is part of the INJOY Smart Cockpit Ecosystem Development. All interface materials are standardized. / 2026
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
