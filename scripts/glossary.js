// 学习术语词典 · 覆盖 云 / AI / 数据保护 / 容灾 / 售前 / 信创 / 火山产品
// 渲染时自动给文本中的术语加 hover/tap 解释卡片
// 未收录的词可一键唤起 AI 浮窗实时解释
(function () {
  // ========================================================
  // 术语数据：term → { en?, tag, def }
  // tag 用于分类显示徽章颜色
  // def 控制在 1-2 句，方便弹窗显示
  // ========================================================
  const GLOSSARY = {
    // ===== 云基础与网络 =====
    'IaaS': { en: 'Infrastructure as a Service', tag: '云', def: '基础设施即服务，提供计算/存储/网络等底层资源，客户管理 OS 及以上。代表：ECS、TOS、VPC。' },
    'PaaS': { en: 'Platform as a Service', tag: '云', def: '平台即服务，提供运行时与开发平台，客户只关心应用与数据。代表：veDB、ByteHouse、火山方舟。' },
    'SaaS': { en: 'Software as a Service', tag: '云', def: '软件即服务，直接提供完整应用。代表：飞书、Coze 智能体平台。按账号/调用量付费。' },
    'CaaS': { en: 'Containers as a Service', tag: '云', def: '容器即服务，托管 Docker/K8s 平台。代表：VKE、阿里 ACK、华为 CCE。' },
    'FaaS': { en: 'Functions as a Service', tag: '云', def: '函数即服务，按调用次数+毫秒计费。代表：veFaaS、AWS Lambda。闲时零成本。' },
    'VPC': { en: 'Virtual Private Cloud', tag: '云网络', def: '虚拟私有云，云上的逻辑隔离网络空间。自定义网段/子网/路由/防火墙，相当于"云上私有机房"。' },
    'VLAN': { en: 'Virtual LAN', tag: '云网络', def: '虚拟局域网，把一个物理网络逻辑分割为多个广播域。VPC 是 VLAN 概念在云上的演进。' },
    'CIDR': { en: 'Classless Inter-Domain Routing', tag: '云网络', def: '无类域间路由，IP+掩码简写如 10.0.0.0/16 = 65536 个地址。VPC 规划必先定 CIDR。' },
    'CDN': { en: 'Content Delivery Network', tag: '云网络', def: '内容分发网络，把静态资源缓存到离用户最近的边缘节点，降低延迟提升首字节时间。' },
    'DCDN': { en: 'Dynamic Content Delivery Network', tag: '云网络', def: '动态内容 CDN，对 API 等动态请求做边缘加速，含路由优化、SSL 卸载、Anycast 等。' },
    'SLB': { en: 'Server Load Balancer', tag: '云网络', def: '服务器负载均衡，把流量分发到多台后端实例，提升可用性。L4=NLB（TCP/UDP）、L7=ALB（HTTP）。' },
    'NLB': { tag: '云网络', def: 'Network Load Balancer，四层（TCP/UDP）负载均衡，性能极高，按 IP+Port 分发，不解析应用层。' },
    'ALB': { tag: '云网络', def: 'Application Load Balancer，七层负载均衡，按 HTTP 路径/Header/Cookie 路由，支持 WAF、灰度。' },
    'NAT': { en: 'Network Address Translation', tag: '云网络', def: '网络地址转换，让 VPC 内私网地址通过共享公网 IP 访问互联网。NAT 网关是托管服务。' },
    'BGP': { en: 'Border Gateway Protocol', tag: '云网络', def: '边界网关协议，运营商之间互连路由协议。多线 BGP=单 IP 多运营商可达，国内宽带必选。' },
    'SDN': { en: 'Software Defined Network', tag: '云网络', def: '软件定义网络，把网络控制平面和数据平面解耦，可编程动态配置网络。云上 VPC 底座。' },
    'SLA': { en: 'Service Level Agreement', tag: '云服务', def: '服务等级协议，云厂商对可用性的承诺。如 99.95% 年停机 ≤4.4 小时；99.99% ≤52.6 分钟。' },
    'SLO': { en: 'Service Level Objective', tag: '云服务', def: '服务等级目标，内部技术指标。SLA 是对外承诺，SLO 是对内目标（一般高于 SLA）。' },
    'SLI': { en: 'Service Level Indicator', tag: '云服务', def: '服务等级指标，可观测的数值（成功率/延迟/吞吐）。SLI → SLO → SLA 三层递进。' },

    // ===== 容器与云原生 =====
    'K8s': { tag: '云原生', def: 'Kubernetes 缩写，容器编排事实标准。火山 VKE、阿里 ACK、华为 CCE 都是托管 K8s。' },
    'Kubernetes': { tag: '云原生', def: '容器编排平台，CNCF 旗舰项目。声明式管理 Pod/Service/Deployment，自动扩缩容/滚动升级。' },
    'Docker': { tag: '云原生', def: '容器化技术与工具，把应用+依赖打包为镜像，跨环境一致运行。秒级启动 vs 虚拟机分钟级。' },
    'Pod': { tag: '云原生', def: 'K8s 最小调度单元，包含 1+ 个共享网络/存储的容器。99% 场景一个 Pod 一个容器。' },
    'Service Mesh': { tag: '云原生', def: '服务网格（如 Istio），把服务间通信、限流、熔断、可观测能力从应用代码下沉到 Sidecar。' },
    'CNCF': { en: 'Cloud Native Computing Foundation', tag: '云原生', def: '云原生计算基金会，维护 K8s/Prometheus/Envoy 等 1500+ 项目。"毕业级"项目可放心生产用。' },
    'DevOps': { tag: '云原生', def: '开发-运维一体化，CI/CD + IaC + 监控告警 + 协作文化。让发布从"季度"变"每天"。' },
    'GitOps': { tag: '云原生', def: 'Git 即生产真相源，所有基础设施变更通过 PR 合并触发自动部署。Argo CD 是代表工具。' },
    'CICD': { tag: '云原生', def: '持续集成/持续部署。代码提交→自动测试→自动构建→自动发布。Jenkins/GitLab CI/Argo 是常见工具。' },
    'IaC': { en: 'Infrastructure as Code', tag: '云原生', def: '基础设施即代码，用代码（Terraform/Pulumi）描述云资源，版本化+审计+一键部署。' },

    // ===== 存储与数据库 =====
    'OLTP': { en: 'Online Transaction Processing', tag: '数据库', def: '联机事务处理，交易型负载，强一致+低延迟。MySQL/PostgreSQL/Oracle 是代表。' },
    'OLAP': { en: 'Online Analytical Processing', tag: '数据库', def: '联机分析处理，分析型负载，聚合查询性能优先。ClickHouse/ByteHouse/Hologres 是代表。' },
    'HTAP': { en: 'Hybrid TP/AP', tag: '数据库', def: '混合事务分析处理，一套引擎同时跑 OLTP+OLAP。TiDB、TDSQL-H 是代表。' },
    'ACID': { tag: '数据库', def: '原子性/一致性/隔离性/持久性，关系数据库事务四特性。传统强一致 OLTP 必备。' },
    'CAP': { tag: '数据库', def: '一致性/可用性/分区容错三选二定理。分布式系统永远要在 C 和 A 之间取舍。' },
    'NoSQL': { tag: '数据库', def: '非关系数据库统称，含 KV(Redis)/文档(MongoDB)/列存(HBase)/图(Neo4j)/向量(VikingDB)。' },
    'ETL': { en: 'Extract-Transform-Load', tag: '数据', def: '抽取-转换-加载，业务数据搬到数仓的传统流程。现在多用 ELT（先入仓再变换）。' },
    'CDC': { en: 'Change Data Capture', tag: '数据', def: '变更数据捕获，实时抓取数据库 binlog 同步到下游。Flink CDC/DTS 是代表。' },
    'Hadoop': { tag: '大数据', def: '分布式存储(HDFS)+计算(MapReduce)生态。EMR 提供托管 Hadoop，离线大数据基础。' },
    'Spark': { tag: '大数据', def: '内存计算引擎，比 MapReduce 快 10-100 倍。批处理/流处理/SQL/ML 通吃。' },
    'Flink': { tag: '大数据', def: '实时流处理引擎，事件时间语义+精确一次，金融实时风控等场景必选。' },
    'Iceberg': { tag: '大数据', def: '表格式标准，配合对象存储构建湖仓一体。支持时间旅行、Schema 演进。' },

    // ===== AI 与大模型 =====
    'LLM': { en: 'Large Language Model', tag: 'AI', def: '大语言模型，参数百亿+。GPT-4/豆包/DeepSeek/通义/盘古/文心都是 LLM。' },
    'RAG': { en: 'Retrieval-Augmented Generation', tag: 'AI', def: '检索增强生成，回答前先查知识库，把检索结果喂给模型再生成答案。企业知识问答首选。' },
    'Agent': { tag: 'AI', def: '智能体，能调工具、规划多步、自主决策的 AI 应用。查日历+订机票+发邮件的助手就是 Agent。' },
    'Token': { tag: 'AI', def: '模型最小处理单元。中文 1 字 ≈ 1-2 token，英文 1 词 ≈ 1.3 token。模型按 token 计费。' },
    'Embedding': { tag: 'AI', def: '把文本/图像/音频编码为高维向量。语义相近的内容向量距离也近，是 RAG 的检索基础。' },
    'Vector': { tag: 'AI', def: '向量，高维浮点数组。LLM 内部所有"理解"都基于向量空间，向量数据库就是存这个的。' },
    'Fine-tuning': { tag: 'AI', def: '精调，在预训练模型上用领域数据继续训练。让模型适应特定行业风格/术语/任务。' },
    'SFT': { en: 'Supervised Fine-Tuning', tag: 'AI', def: '监督精调，用"问题-标准答案"对训练模型。让模型按预期格式/风格输出。' },
    'RLHF': { en: 'Reinforcement Learning from Human Feedback', tag: 'AI', def: '人类反馈强化学习，让人评价模型答案再训练。GPT/Claude/豆包对齐人类偏好的核心技术。' },
    'MoE': { en: 'Mixture of Experts', tag: 'AI', def: '混合专家模型，把大模型切成多个专家，每次只激活 2-4 个。DeepSeek-V3/V2 用 MoE 大幅降本。' },
    'CoT': { en: 'Chain of Thought', tag: 'AI', def: '思维链，让模型"逐步推理"而非直接给答案。复杂问题准确率显著提升。' },
    'Prompt': { tag: 'AI', def: '提示词，给 LLM 的输入指令。Prompt Engineering = 设计提示词让模型表现更好。' },
    'Prompt Engineering': { tag: 'AI', def: '提示词工程，通过设计 Prompt 引导 LLM 输出。零代码改进模型效果的常用手段。' },
    'Coze': { tag: 'AI', def: '字节扣子，国内最大的 AI Agent 开发平台。可视化拖拽搭建智能体，连接 Bot/微信/抖音。' },

    // ===== 火山引擎产品 =====
    '豆包': { tag: '火山', def: '字节自研大模型，分 Pro / Lite / Mini / Code 四档。Pro 重任务、Lite 轻量、Mini 端侧、Code 编程。' },
    '豆包大模型': { tag: '火山', def: '字节自研 LLM 系列，火山引擎的旗舰 AI 产品。月级迭代，抖音电商等海量场景验证过。' },
    '火山方舟': { tag: '火山', def: '火山引擎大模型 PaaS 平台，集成多家模型推理/评测/精调/Agent 链路。一站式接入豆包+DeepSeek 等。' },
    'VikingDB': { tag: '火山', def: '火山引擎向量数据库，用于 RAG 知识库的语义检索。每秒可处理亿级向量。' },
    'DataLeap': { tag: '火山', def: '火山引擎数据中台（集成/开发/治理/资产），对位阿里 DataWorks。一站式数据工程平台。' },
    'ByteHouse': { tag: '火山', def: '火山引擎云原生数仓，基于 ClickHouse 增强。OLAP 性能强，PB 级亚秒查询。' },
    'EMR': { tag: '火山', def: 'Elastic MapReduce，火山引擎托管 Hadoop/Spark/Flink/Iceberg 服务。开源大数据生态的云上版。' },
    'VKE': { tag: '火山', def: 'Volcengine Kubernetes Engine，火山托管 K8s。对位阿里 ACK、华为 CCE、AWS EKS。' },
    'TOS': { tag: '火山', def: '火山对象存储，对位 AWS S3 / 阿里 OSS / 华为 OBS。PB 级、按量计费、99.9% 可用。' },
    'veDB': { tag: '火山', def: '火山引擎数据库系列（MySQL/PostgreSQL/Oracle 兼容），云原生关系库。对位阿里 RDS / PolarDB。' },
    'veFaaS': { tag: '火山', def: '火山函数计算，事件触发+毫秒计费的 Serverless。适合图片处理、IoT、API 后端。' },
    'LAS': { en: 'Lake Analytics Service', tag: '火山', def: '火山湖仓一体分析服务，统一处理数据湖+数仓，存算分离。' },
    'RTC': { en: 'Real-Time Communications', tag: '火山', def: '实时音视频，火山 RTC 是抖音直播底座的对外版。低延迟<400ms。' },
    'IdeaHub': { tag: '华为', def: '华为智能协作大屏，会议室一体机。视频会议+白板+无线投屏+智能聚音。' },

    // ===== 售前与方法论 =====
    'POC': { en: 'Proof of Concept', tag: '售前', def: '概念验证，把方案在客户真实数据/小范围跑一遍。售前关键环节，目的是证明方案可行。' },
    'TCO': { en: 'Total Cost of Ownership', tag: '售前', def: '总拥有成本，硬件+软件+人力+电费+迁移成本+风险成本全算上的真实账，比刊例价有说服力。' },
    'ROI': { en: 'Return on Investment', tag: '售前', def: '投资回报率 = (收益-成本)/成本。客户做决策的核心指标之一。' },
    'SPIN': { tag: '售前', def: 'Situation/Problem/Implication/Need-payoff 提问法，引导客户从现状到痛点到决策。' },
    'MEDDIC': { tag: '售前', def: '企业级销售方法论：Metrics/Economic Buyer/Decision Criteria/Decision Process/Identify Pain/Champion。' },
    'BANT': { tag: '售前', def: 'Budget/Authority/Need/Timeline，销售线索的 4 个判断维度。预算/拍板人/需求/时间表。' },
    'FFAB': { tag: '售前', def: 'Feature/Function/Advantage/Benefit，售前介绍产品的四层递进话术结构。' },
    '客户成功': { tag: '售前', def: 'Customer Success，从售卖一次性产品转向持续帮客户成功。SaaS 时代核心理念，决定续费率。' },
    'FinOps': { tag: '云服务', def: '云成本治理，三原则 Inform(账单可视)→Optimize(选型/Right-sizing)→Operate(持续治理)。' },
    '6R': { tag: '云迁移', def: '上云策略 6 种选择：Rehost(直搬)/Replatform(小改)/Refactor(重构)/Repurchase(换 SaaS)/Retain(保留)/Retire(下线)。' },

    // ===== 数据保护与容灾 =====
    'CDP': { en: 'Continuous Data Protection', tag: '数据保护', def: '持续数据保护，秒级 RPO，可恢复到任意时间点。比传统备份强很多，应对勒索软件首选。' },
    'CDM': { en: 'Copy Data Management', tag: '数据保护', def: '副本数据管理，统一管理多用途数据副本（备份/测试/分析），用一份基底节省 5-10 倍空间。' },
    'CRR': { en: 'Cross Region Replication', tag: '数据保护', def: '跨区域复制，数据同步到另一个地理位置，应对区域性灾难。' },
    'RPO': { en: 'Recovery Point Objective', tag: '数据保护', def: '恢复点目标，最多能丢多长时间的数据。RPO=1 小时 = 灾难最多丢 1 小时数据。' },
    'RTO': { en: 'Recovery Time Objective', tag: '数据保护', def: '恢复时间目标，灾难后业务恢复所需时间。RTO=4 小时 = 4 小时内必须恢复。' },
    'WORM': { en: 'Write Once Read Many', tag: '数据保护', def: '一次写入多次读取的不可变存储，抵御勒索软件加密改数据。等保/金融合规标配。' },
    'Air-Gap': { tag: '数据保护', def: '物理隔离区，备份完成后切断与生产网络的连接。勒索病毒永远爬不到 Air-Gap 区。' },
    'Ransomware': { tag: '安全', def: '勒索软件，加密数据后索要赎金。CDP+Air-Gap+WORM 三件套是有效防御组合。' },
    '双活': { tag: '容灾', def: '两个数据中心同时承担业务，互为热备。任一挂了另一秒级接管。RPO≈0, RTO 极短，成本高。' },
    '两地三中心': { tag: '容灾', def: '同城双中心(双活/主备)+异地一个中心(灾备)的容灾架构，金融政企标配。' },
    'D2D2D': { tag: '数据保护', def: 'Disk-to-Disk-to-Disk，磁盘三级复制：本地→同城→异地。常见于政务云灾备方案。' },
    'D2D2T': { tag: '数据保护', def: 'Disk-to-Disk-to-Tape，磁盘到磁盘再到磁带，归档长期保留。Iron Mountain 是磁带托管代表。' },
    '快照': { tag: '数据保护', def: 'Snapshot，某一时刻数据的只读副本。秒级创建、占空间少（只存增量）、可瞬间恢复。' },
    '归档': { tag: '数据保护', def: 'Archive，把不常访问的冷数据存到便宜慢的介质（磁带/冷归档存储），降本 10 倍。' },

    // ===== 信创 =====
    '信创': { tag: '信创', def: '信息技术应用创新，国产化替代——CPU/OS/数据库/中间件全栈国产。等保+信创是政企单子的双必答题。' },
    '鲲鹏': { tag: '信创', def: '华为基于 ARM 的国产 CPU，鲲鹏 920 是主力。配合欧拉 OS 构成华为信创基座。' },
    '昇腾': { tag: '信创', def: '华为 AI 算力芯片，对位 NVIDIA H100。Atlas 800/900 是昇腾代表集群产品。' },
    '欧拉': { tag: '信创', def: 'openEuler，华为捐赠开源的 Linux 发行版。国产服务器 OS 主流之一。' },
    '高斯': { tag: '信创', def: '华为 GaussDB，国产分布式数据库，含关系/向量/时序/图多种引擎。对位 Oracle/PG。' },
    'HCS': { tag: '信创', def: 'Huawei Cloud Stack，华为私有云专有解决方案，国内私有云份额第一。' },
    '等保': { tag: '合规', def: '等保 2.0，《网络安全等级保护基本要求》。1-5 级，三级是政企/金融常见要求。' },
    '密评': { tag: '合规', def: '商用密码应用安全性评估，按《密码法》要求企业部署国密算法 SM2/3/4。' },
    'GMP': { tag: '合规', def: 'Good Manufacturing Practice，药品生产质量管理规范。医药行业 IT 合规标准。' },
    'HIPAA': { tag: '合规', def: '美国医疗健康数据保护法，要求医院/保险公司对患者数据加密、审计、访问控制。' },

    // ===== 竞品厂商 =====
    '阿里云': { tag: '竞品', def: '中国最大公有云，2009 年起步，生态最厚。强势在互联网/零售/部分政务。竞品角度：DataWorks 工具链最成熟。' },
    '华为云': { tag: '竞品', def: '中国政企第一云，2017 年大规模商用。强势在政务/国企/信创/全栈自主。盘古/HCS/CCE 是核心产品。' },
    '腾讯云': { tag: '竞品', def: '中国第三大公有云，游戏/视频/微信生态主场。代表产品 TRTC、混元大模型、腾讯会议。' },
    '百度智能云': { tag: '竞品', def: 'AI 老品牌，文心一言+智能驾驶 Apollo 是核心资产。部分政企+智慧交通有积累。' },
    'AWS': { tag: '竞品', def: 'Amazon Web Services，全球最大公有云。中国大陆 2024 年起合规收紧，主战场转向出海。' },
    '天翼云': { tag: '竞品', def: '中国电信旗下国资云，央国企/区县政府主场。强势在网络+央企决策链。' },
    '盘古': { tag: '竞品', def: '华为大模型，NLP/CV/多模态/预测/科学计算多分支。行业知识深、迭代慢、生态闭。' },
    '通义千问': { tag: '竞品', def: '阿里大模型 Qwen 系列。开源版本生态广，海外影响力强。对应商业版叫"通义"。' },
    '文心一言': { tag: '竞品', def: '百度文心大模型，国内最早商用 LLM 之一。中文语料积累深、ToB 应用化速度被字节追上。' },
    'DeepSeek': { tag: '竞品', def: '幻方量化旗下大模型公司，DeepSeek-V3/R1 推理性价比极高，开源策略影响行业。' },
    '混元': { tag: '竞品', def: '腾讯大模型，接入微信/腾讯文档/视频号生态。多模态能力突出。' },
    'ModelArts': { tag: '竞品', def: '华为云 AI 开发平台，对位火山方舟+机器学习平台。AutoML+大规模训练+模型管理。' },
    'FusionInsight': { tag: '竞品', def: '华为云大数据平台，含 HDFS/HBase/Hive/Spark。偏传统 Hadoop 生态。对位 DataLeap+EMR。' },
    'GaussDB': { tag: '竞品', def: '华为分布式数据库，含 OLTP(MySQL/PG 兼容)/OLAP(DWS)/NoSQL/向量等多引擎。' },
    'GoldenDB': { tag: '竞品', def: '中兴通讯分布式数据库，金融/政府国产化替代 Oracle 的主流方案之一。' },
    'OpenStack': { tag: '私有云', def: '开源私有云平台，IaaS 层标准。华为/中兴/H3C 私有云都基于 OpenStack 二次开发。' },
    '深信服': { tag: '厂商', def: '中国老牌安全+超融合厂商，超融合 HCI+VDI+终端安全是核心。' },
    'Networker': { tag: '产品', def: 'Dell EMC 企业级备份软件，配 Data Domain 重删存储是传统金融/政企备份标配。' },
    'Data Domain': { tag: '产品', def: 'Dell EMC 重删存储一体机，备份场景重删比可达 10-50:1，大幅省空间。' },

    // ===== 数据中台 / 增长 =====
    '数据中台': { tag: '数据', def: '业务数据资产化平台，把分散数据统一治理→构建标签/指标→开放给业务使用。' },
    '一网通办': { tag: '政务', def: '数字政府代表场景，一个网站办所有政府事项。后端要打通 N 个委办局数据。' },
    '一网统管': { tag: '政务', def: '城市治理一图全感知，把交通/水务/应急/网格等数据汇到城市大脑统一调度。' },
    '雪亮工程': { tag: '政务', def: '公共安全视频监控联网应用项目，城乡视频全覆盖+智能分析。华为/海康长期主导。' },
    '数据湖': { tag: '数据', def: 'Data Lake，原始格式存储所有结构化/非结构化数据，按需 ELT 分析。对位"先建模再入库"的数仓。' },
    '湖仓一体': { tag: '数据', def: 'Lakehouse，数据湖的灵活性+数据仓库的强分析能力。Iceberg/Delta Lake/Hudi 是底座。' },

    // ===== 安全 =====
    'WAF': { en: 'Web Application Firewall', tag: '安全', def: 'Web 应用防火墙，挡 SQL 注入/XSS/CC 攻击。互联网业务前置必备。' },
    'DDoS': { tag: '安全', def: 'Distributed Denial of Service，分布式拒绝服务攻击。云上 DDoS 高防能扛 T 级流量。' },
    '零信任': { tag: '安全', def: 'Zero Trust，默认不信任任何用户/设备，每次访问都验证。SASE 是其架构落地。' },
    'SASE': { tag: '安全', def: 'Secure Access Service Edge，安全+网络融合云服务，传统 VPN 的替代品。' },
    'HSM': { tag: '安全', def: 'Hardware Security Module，加密硬件机，金融/政务存储密钥的合规设备。' },

    // ===== 行业方案 =====
    '数字政府': { tag: '行业', def: '政府数字化转型方案，含一网通办/一网统管/政务云/政务大模型/数据共享。' },
    '智慧城市': { tag: '行业', def: '城市级数字化方案，含交通/水务/应急/能源/政务，城市大脑是核心调度中心。' },
    '智能客服': { tag: '行业', def: 'AI 客服系统，含意图识别/知识库/对话管理/转人工。RAG+LLM 让效果大幅提升。' },
  };

  // ========================================================
  // 工具函数
  // ========================================================
  function escapeRegex(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[c]);
  }

  // 按词长降序排（先匹配长词避免被短词包错，如 "两地三中心" 应该先于 "中心"）
  const SORTED_TERMS = Object.keys(GLOSSARY).sort((a, b) => b.length - a.length);

  // 把容器内的纯文本节点扫描一遍，匹配术语包成 <span>
  function decorate(container) {
    if (!container || container.dataset.termsDecorated === '1') return;
    container.dataset.termsDecorated = '1';

    const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        // 跳过 .term-tip / script / style / a / button 等不应再处理的节点
        const p = node.parentNode;
        if (!p) return NodeFilter.FILTER_REJECT;
        const tag = (p.tagName || '').toLowerCase();
        if (['script', 'style', 'a', 'button', 'textarea', 'input'].includes(tag)) {
          return NodeFilter.FILTER_REJECT;
        }
        if (p.classList && p.classList.contains('term-tip')) return NodeFilter.FILTER_REJECT;
        if (!node.nodeValue || node.nodeValue.trim().length < 2) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });

    const textNodes = [];
    let n;
    while ((n = walker.nextNode())) textNodes.push(n);

    for (const node of textNodes) {
      const text = node.nodeValue;
      let hits = [];
      for (const term of SORTED_TERMS) {
        const isAscii = /^[A-Za-z0-9.+/_-]+$/.test(term);
        const re = isAscii
          ? new RegExp('(?<![A-Za-z0-9_])(' + escapeRegex(term) + ')(?![A-Za-z0-9_])', 'g')
          : new RegExp(escapeRegex(term), 'g');
        let m;
        while ((m = re.exec(text)) !== null) {
          hits.push({ start: m.index, end: m.index + m[0].length, term, match: m[0] });
        }
      }
      if (!hits.length) continue;

      // 解决重叠：保留较长且更靠前的匹配
      hits.sort((a, b) => a.start - b.start || (b.end - b.start) - (a.end - a.start));
      const pruned = [];
      let lastEnd = -1;
      for (const h of hits) {
        if (h.start >= lastEnd) { pruned.push(h); lastEnd = h.end; }
      }
      if (!pruned.length) continue;

      // 重建片段
      const frag = document.createDocumentFragment();
      let cursor = 0;
      for (const h of pruned) {
        if (h.start > cursor) frag.appendChild(document.createTextNode(text.slice(cursor, h.start)));
        const span = document.createElement('span');
        span.className = 'term-tip';
        span.dataset.term = h.term;
        span.textContent = h.match;
        frag.appendChild(span);
        cursor = h.end;
      }
      if (cursor < text.length) frag.appendChild(document.createTextNode(text.slice(cursor)));
      node.parentNode.replaceChild(frag, node);
    }
  }

  // ========================================================
  // tooltip UI
  // ========================================================
  let popup = null;
  function ensurePopup() {
    if (popup) return popup;
    popup = document.createElement('div');
    popup.className = 'term-popup';
    popup.hidden = true;
    popup.innerHTML = `
      <button class="term-popup-close" type="button" aria-label="关闭" title="关闭">×</button>
      <div class="term-popup-head"><span class="term-popup-name"></span><span class="term-popup-en"></span><span class="term-popup-tag"></span></div>
      <div class="term-popup-def"></div>
      <div class="term-popup-actions">
        <button class="term-popup-ai" type="button">🤖 让 AI 详细解释</button>
      </div>
    `;
    document.body.appendChild(popup);

    popup.querySelector('.term-popup-close').addEventListener('click', hidePopup);
    popup.querySelector('.term-popup-ai').addEventListener('click', () => {
      const term = popup.dataset.term;
      hidePopup();
      askAI(term);
    });
    return popup;
  }
  function hidePopup() {
    if (popup) {
      popup.hidden = true;
      popup.style.display = 'none';
    }
  }
  function showPopup(term, anchor) {
    const p = ensurePopup();
    const info = GLOSSARY[term];
    p.dataset.term = term;
    p.querySelector('.term-popup-name').textContent = term;
    p.querySelector('.term-popup-en').textContent = (info && info.en) ? info.en : '';
    p.querySelector('.term-popup-tag').textContent = (info && info.tag) ? info.tag : '';
    p.querySelector('.term-popup-def').textContent = (info && info.def) ? info.def : '词典里没收录这个词。点下面"让 AI 详细解释"问 AI。';
    p.hidden = false;
    p.style.display = 'block';
    positionPopup(p, anchor);
  }
  function positionPopup(p, anchor) {
    // 默认放在 anchor 上方，溢出则放下方
    const r = anchor.getBoundingClientRect();
    const pw = 320, ph = 200;
    let left = Math.min(window.innerWidth - pw - 12, Math.max(12, r.left));
    let top = r.top - ph - 8;
    if (top < 8) top = r.bottom + 8;
    p.style.left = left + 'px';
    p.style.top = top + 'px';
  }

  function askAI(term) {
    // 唤起聊天浮窗 + 自动塞问题
    const fab = document.getElementById('aiFab');
    if (fab) fab.click();
    setTimeout(() => {
      const input = document.getElementById('aiInput');
      const sendBtn = document.getElementById('aiSendBtn');
      if (input && sendBtn) {
        const info = GLOSSARY[term];
        const hint = info ? `（词典已收录："${info.def}"，请展开讲透）` : '';
        input.value = `请详细解释一下「${term}」是什么、用在什么场景、和相关概念的区别 ${hint}`;
        sendBtn.click();
      }
    }, 250);
  }

  // ========================================================
  // 全局事件：term-tip 点击
  // ========================================================
  document.addEventListener('click', (e) => {
    const tip = e.target.closest('.term-tip');
    if (tip) {
      e.stopPropagation();
      showPopup(tip.dataset.term, tip);
      return;
    }
    // 点击非 term-tip 区域 + 非 popup 内部 → 关闭 popup
    if (popup && !popup.hidden && !popup.contains(e.target)) {
      hidePopup();
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && popup && !popup.hidden) hidePopup();
  });
  window.addEventListener('scroll', hidePopup, true);

  // ========================================================
  // 提供给 app.js 调用
  // ========================================================
  window.GLOSSARY = GLOSSARY;
  window.decorateTerms = function (selector) {
    const containers = typeof selector === 'string'
      ? document.querySelectorAll(selector)
      : (selector instanceof Element ? [selector] : []);
    containers.forEach(decorate);
  };

  // 自动装饰函数：每次渲染后调用
  // app.js 渲染完成后会调一次 window.decorateAll()
  window.decorateAll = function () {
    // 主要装饰章节内容容器
    document.querySelectorAll('.lesson-section .keypoint, .day-card p, .interview-banner p, .competition-banner p').forEach(decorate);
  };

  // 监听 DOM 变化，自动装饰新出现的章节
  if (window.MutationObserver) {
    const mo = new MutationObserver(() => {
      // debounce
      clearTimeout(window.__decorateTimer);
      window.__decorateTimer = setTimeout(() => window.decorateAll(), 100);
    });
    if (document.body) {
      mo.observe(document.getElementById('app') || document.body, { childList: true, subtree: true });
    } else {
      document.addEventListener('DOMContentLoaded', () => {
        mo.observe(document.getElementById('app') || document.body, { childList: true, subtree: true });
      });
    }
  }

  // 初次装饰
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(window.decorateAll, 200));
  } else {
    setTimeout(window.decorateAll, 200);
  }
})();
