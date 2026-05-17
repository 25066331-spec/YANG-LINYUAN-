export interface ProjectSection {
  id: string;
  title: string;
  content: string;
  subsections?: { title: string; content: string }[];
  image: string;
  isLandscape?: boolean;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  color: string;
  image: string;
  tags: string[];
  metrics?: { label: string; value: string }[];
  sections: ProjectSection[];
}

export const projects: Project[] = [
  {
    id: 'tiktok-ai',
    title: '字节跳动 AI (TikTok Shop)',
    subtitle: '面向跨境卖家的 AI 经营副驾驶',
    description: '该项目探讨了人工智能如何重塑跨境电商卖家的运营体验。系统不再要求商家手动解读仪表盘和零散的 SEO 指标，而是引入了一层对话式诊断层，能够实时识别业务问题、解释原因并推荐可执行的策略。该体验的设计理念是“人工智能作为运营副驾驶”，将传统卖家工作流的复杂性简化为直观且以人为本的交互。通过将提示工程与自适应意图识别相结合，该平台将数据密集型的后端系统转变为更易于访问且以信任为驱动的决策环境。 与此同时，该项目还延伸至 TikTok Shop 设计系统的全球化，确保提升了运营一致性。',
    color: '#00F0FF',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=2574&auto=format&fit=crop',
    tags: ['AI 智能体', '电子商务', '企业级体验'],
    metrics: [
      { label: '爆款转化提升', value: '22%' },
      { label: '后台停留深度', value: '15%' },
      { label: '效率提升', value: '300%' },
    ],
    sections: [
      {
        id: 'ui-overview',
        title: '1. 界面总览 (Final UI Overview)',
        content: '这张图展示的是 AI 诊断中心的核心控制台，它是整个卖家经营链路的“大脑”。',
        subsections: [
          {
            title: 'AI 执行摘要 (AI Executive Summary)',
            content: '拒绝海量数据堆砌，通过 LLM（大语言模型）对全店多维数据进行语义化抽提。将复杂的月收入、转化率等非结构化数据转化为直观的‘经营诊断语’，直接指出流量利用率不足的底层原因。'
          },
          {
            title: '本土化运营洞察 (Localized Insights)',
            content: '针对东南亚细分市场的复杂性，设计了具备本土化意识（Market-Aware）的策略引擎。系统能自动识别印尼免运费、菲律宾发薪日等大促节点，动态生成适配当地搜索习惯的 SEO 建议。'
          }
        ],
        image: 'https://images.unsplash.com/photo-1551288049-bbbda536339a?q=80&w=2670&auto=format&fit=crop'
      },
      {
        id: 'interaction',
        title: '2. 交互亮点与 AI 逻辑 (Interaction Highlights)',
        content: '实现从“用户找问题”到“AI 推方案”的范式转移，建立人机协作的沉浸式工作流。',
        subsections: [
          {
            title: '策略卡片设计 (Actionable Strategy Cards)',
            content: '通过优先级（Priority）标签引导卖家关注核心任务。界面不仅提供建议，更通过“优化逻辑详情” 展示了 SEO 评分提升 15% 的量化预估，将 AI 的“黑盒”决策透明化。'
          },
          {
            title: '一键优化 (Seamless Execution)',
            content: '设计原则：“最简操作路径（The Shortest Path to Success）”。通过 Before/After 的强对比视图，降低卖家的心理门槛。配合‘一键优化’功能，将复杂的 SEO 修改耗时从 30 分钟降至秒级。'
          }
        ],
        image: 'https://images.unsplash.com/photo-1581291518137-9ba3f937e290?q=80&w=2670&auto=format&fit=crop'
      },
      {
        id: 'design-logic',
        title: '3. 设计背后的思考 (The Design Logic)',
        content: '从“数据看板”到“诊断引擎”：“传统的 B 端后台往往面临‘信息过载’。我通过 AI 诊断中心实现了从 ‘用户找问题’ 到 ‘AI 推方案’ 的范式转移。',
        subsections: [
          {
            title: '交互的“颗粒度”管理',
            content: '在增长中心的设计中，我采用了 模块化策略卡片（Strategic Modular Cards）。每张卡片承载一个核心增长动作，避免了传统 B 端系统常见的‘策略丛林’问题。'
          },
          {
            title: '信息层级的优先级',
            content: '在 B 端深色模式的设计实践中，我坚持 ‘Less is More’ 的原则。通过高饱和度的 Action Colors（如增长绿与预警红）在深色背景上的强对比，极大地降低了用户的信息筛选成本。'
          },
          {
            title: 'B 端设计的“温度感”',
            content: '引入了更具颗粒度的卡片式布局与呼吸感微动效。通过对 Card-based UI 的网格化控制，确保了信息密度的平衡。右下角悬浮的 AI 入口作为全局交互触点，预示着 AI 诊断能力随时待命。'
          }
        ],
        image: 'https://images.unsplash.com/photo-1553028826-f4804a6dba3b?q=80&w=2670&auto=format&fit=crop'
      },
      {
        id: 'business-panorama',
        title: '1. 经营全景看板 (Business Panorama)',
        content: '核心定位：多维经营数据的可视化降维与风险自动化识别。通过高度聚合的仪表盘，为全球卖家提供即时、透明的业务健康度检测。',
        subsections: [
          {
            title: '核心指标监控 (North Star Metrics)',
            content: '不再让卖家迷失在复杂的报表层级中。通过对总营收、转化率、访客数三大核心指标的实时监控，配合环比增长率（Wow）的视觉化对比，建立起最直观的经营反馈闭环。针对转化率导致的波动，系统将自动触发归因分析。'
          },
          {
            title: '全球销售表现与类目分布',
            content: '利用 地理空间可视化（Geo-Spatial Visualization） 与多维环形图，清晰呈现东南亚各国的销售贡献权重及品类健康度，支持卖家的跨境库存调拨决策。'
          }
        ],
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop'
      },
      {
        id: 'trend-analysis',
        title: '2. 趋势分析与风险预警 (Trend Analysis & Risk Prediction)',
        content: '通过面积折线图实时对齐总营收与访客数的动态关联，确保卖家能一眼识别出流量增长与营收转化之间的“背离现象”，从海量数据中打捞异常。',
        subsections: [
          {
            title: '复合趋势分析 (Composite Trend Tracking)',
            content: '设计师通过对 Y 轴比例的精细调试，确保卖家能一眼识别出流量增长与营收转化之间的‘背离现象’，从而快速定位运营断层。'
          },
          {
            title: '自动化风险因子识别 (Automated Risk Factors)',
            content: '设计逻辑：从海量数据中打捞异常（Anomalies Detection）。通过红区告警模块，AI 引擎自动抓取‘负面评价率过高’和‘复购率偏低’等核心风险。'
          }
        ],
        image: 'https://images.unsplash.com/photo-1551288049-bbbda536339a?q=80&w=2670&auto=format&fit=crop'
      },
      {
        id: 'brand-identity',
        title: '1. 品牌身份与资产中心 (Brand Identity & Assets)',
        content: '核心定位：品牌资产聚合与服务质量（SLA）的数字化度量。通过结构化的信息布局，强化卖家的全球化品牌心智。',
        subsections: [
          {
            title: '品牌背书与认证体系',
            content: '设计建立了极具辨识度的 全球认证卖家（Verified Global Seller） 标识体系。通过对头像、粉丝量、店铺评分的核心视觉区隔，快速锚定店铺的市场层级。'
          },
          {
            title: '店铺状态实时监控',
            content: '利用状态标签（Status Tags）实时同步店铺运行健康度。通过色彩语义化（如：正常运行的绿色）提供‘零负担’的情绪价值，确保卖家在进行复杂决策前拥有稳定的经营体感。'
          },
          {
            title: '关键服务指标可视化',
            content: '针对 TikTok 强社交属性，我们将 ‘聊聊回复率’ 与 ‘履约效率’ 提升至一级视觉层级。这不仅仅是数据，更是卖家竞争力的核心抽象。'
          },
          {
            title: '健康度状态评估 (Health Score Assessment)',
            content: '设计原则：“从数字化到语意化（Digit-to-Semantic Conversion）”。将底层的复杂经营指标最终聚合成‘表现优秀’的定性结论，降低认知负荷。'
          }
        ],
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop'
      },
      {
        id: 'market-intel',
        title: '1. 区域市场情报 (Regional Market Intelligence)',
        content: '通过对东南亚各细分市场的实时数据建模，提供精准的增长切入点。设计建立了具备 市场敏感度（Market-Sensitivity）的情报看板。',
        subsections: [
          {
            title: '市场热度实时映射',
            content: '通过对印尼、泰国、越南、马来西亚等不同区域‘搜索热词’与‘流量趋势’ 的实时抓取，将宏观的市场波动转化为量化的百分比增长提示，帮助识别风口。'
          },
          {
            title: '策略中心与 AI 助手 (Strategy Center & AI Agent)',
            content: '针对 TikTok 内容电商生态，设计了具备 社交洞察（Social-Insight） 的建议模型。AI 自动捕捉节点并推送‘寻找微型达人（KOC）带货’的差异化策略。'
          },
          {
            title: '对话式 AI 经营助手 (Conversational AI Copilot)',
            content: '交互逻辑：“从被动呈现到主动应答（From UI to Conversational AI）”。助手具备上下文感知（Context-aware），能识别用户关心的竞争态势并提供快捷指令（Quick Actions）。'
          },
          {
            title: '业务影响力 (Business Impact)',
            content: '通过 AI 增长中心的策略引导，试点商家的‘爆款转化率’平均提升了 22%。对话式助手的引入，使得卖家在后台的停留深度增加了 15%，显著提升了经营决策的科学性。'
          }
        ],
        image: 'https://images.unsplash.com/photo-1620712943543-bcc4628c9757?q=80&w=2544&auto=format&fit=crop'
      },
      {
        id: 'research',
        title: '用户调研 (User Research)',
        content: '随着电商出海的数量增多，除了电商公司，更多个体户选择电商创业，电商运营会夹杂着对于数据的不理解。该体验的设计理念是“人工智能作为运营副驾驶”。',
        subsections: [
          {
            title: '调研洞察',
            content: '在对 20 位头部跨境卖家的 Shadowing 调研中，我们发现 85% 的用户在面对原始数据表时无法快速得出决策结论。设计目标是将 Data 转化为 Insight。'
          }
        ],
        image: '/user-persona.png',
        isLandscape: true
      },
      {
        id: 'persona-journey',
        title: '用户画像与旅程图 (Persona & Journey)',
        content: '我们构建了典型的跨境卖家画像，并梳理了从流量下滑到优化完成的全链路体验旅程。',
        subsections: [
          {
            title: '用户画像 (User Persona)',
            content: '单人小卖家，自有货源，英语弱。习惯手动铺货、看不懂数据。痛苦曝光低、批量改货耗时、数据焦虑。心理偏好简单高效、怕违规。'
          },
          {
            title: '用户旅程图 (User Journey)',
            content: '触发（告警） -> 思考（查看数据看不懂） -> 寻找对策（点击 AI 诊断） -> 交互（一键优化） -> 结果反馈（分数提升 40%）。'
          }
        ],
        image: '/user-persona.png',
        isLandscape: true
      }
    ]
  },
  {
    id: 'pdfelement-ai',
    title: 'PDFelement 10 AI',
    subtitle: '重构 AI 时代的专业文档工作流',
    description: '主导全平台集成大模型（LLM）的 UX 规范。定义了“上下文感知菜单”与“AI 侧边栏”交互逻辑，支持一键总结、智能改写。',
    color: '#8A2BE2',
    image: '/核心定位：大模型驱动的合同资产数字化管理与自动化风险筛查看板.png',
    tags: ['生成式 AI', '生产力工具', '工作流重构'],
    metrics: [
      { label: '营收转化提升', value: '16%' },
      { label: 'NPS 提升', value: '28%' },
    ],
    sections: [] // We will render sections manually in the component for high-end layout
  },
  {
    id: 'feishu-ai',
    title: '「飞书假勤」AI 方向探索',
    subtitle: '为管理者提供轻松的假勤管理',
    description: '紧跟潮流，做人工智能时代的弄潮儿。AI 提供了巨大的可能性，包括面部识别打卡、简单点击即可安排日程、以及出勤数据可视化。',
    color: '#3370FF',
    image: '/「飞书假勤」AI 方向探索.png',
    tags: ['AI 助手', '假勤管理', '组织协同'],
    metrics: [
      { label: '流程自动化', value: '92%' },
      { label: '操作步数', value: '-60%' },
    ],
    sections: []
  },
  {
    id: 'medical-ai',
    title: '「RareCare」罕见病 AI 辅助诊断平台',
    subtitle: '面向医患双端的长尾医学知识降维与多模态 AI 辅助诊断流重构',
    description: '“罕见病 App 的设计本质不是做一个普通的 B 端或 C 端工具，而是利用设计策略在‘AI 幻觉’与‘医疗严肃性’之间建立信任天平。通过这套线上线下一体化的服务蓝图，我们将高深的大模型技术转化为具备温度、科学严谨的医疗助手。”',
    color: '#00D1FF',
    image: '/核心定位：面向医患双端的长尾医学知识降维与多模态 AI 辅助诊断流重构-1.png',
    tags: ['医疗 AI', '罕见病诊断', '多模态交互'],
    metrics: [
      { label: '误诊率降低', value: '18%' },
      { label: '初筛效率', value: '450%' },
    ],
    sections: []
  },
  {
    id: 'vanke-crm',
    title: '万科营销工作台',
    subtitle: '房产数字化营销移动端工作台',
    description: '深入一线售楼处进行 Shadowing (影子观察)，针对置业顾问移动端录入难的问题，设计“卡片式任务看板”并引入语音智能填表功能，使人均跟进效率提升 20%。',
    color: '#E60012',
    image: '/【工作台首页（Dashboard）】，.png',
    tags: ['移动 CRM', '营销科技', '语音填表'],
    metrics: [
      { label: '跟进率提升', value: '20%' },
      { label: '录入耗时', value: '-82%' },
    ],
    sections: []
  },
  {
    id: 'travel-ai',
    title: 'AI 旅行规划助手',
    subtitle: '通过 AI 降低复杂旅行决策成本',
    description: '一键生成个性化旅行地图与定制化行程单。基于多源数据的多智能体协作系统。',
    color: '#10B981',
    image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2670&auto=format&fit=crop',
    tags: ['个性化定制', '智慧旅游', '消费端应用'],
    metrics: [
      { label: '行程生成数', value: '1M+' },
      { label: '用户评分', value: '4.9' },
    ],
    sections: [
      {
        id: 'experience',
        title: '体验革新',
        content: '实时感知交通动态，拖拽式 AI 冲突修复，将复杂的行前规划时间从数小时缩短至分钟级。',
        image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2670&auto=format&fit=crop'
      }
    ]
  },
  {
    id: 'healthy-app',
    title: 'Healthy',
    subtitle: '多场景综合健康服务平台',
    description: '整合康复、健身与宠物训练的创新生态，全方位守护你与家人的健康生活。',
    color: '#A855F7',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2720&auto=format&fit=crop',
    tags: ['康复健身', '宠物训练', '综合健康'],
    metrics: [
      { label: '人次覆盖', value: '1M+' },
      { label: '满意度', value: '4.8' },
    ],
    sections: []
  }
];
