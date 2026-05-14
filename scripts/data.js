// 20 天深度课程数据 · 火山引擎售前工程师学习平台
const STAGES = [
  { id: 's1', name: '阶段一·云计算基础（深度版）', days: [1, 2, 3, 4, 5, 6, 7], color: '#2b5cff' },
  { id: 's2', name: '阶段二·火山引擎产品矩阵', days: [8, 9, 10, 11], color: '#6e3aff' },
  { id: 's3', name: '阶段三·AI 与大模型', days: [12, 13, 14], color: '#ff3a8c' },
  { id: 's4', name: '阶段四·售前专业技能', days: [15, 16, 17], color: '#f59e0b' },
  { id: 's5', name: '阶段五·行业方案与综合实战', days: [18, 19, 20], color: '#16a34a' }
];

const COURSE = [
  // ============ 阶段一：云计算基础（深度版，Day 1-7） ============
  {
    day: 1,
    videoQueries: ['云计算入门教程', 'IaaS PaaS SaaS 区别', '公有云 私有云 混合云'],
    stage: 's1',
    title: '云计算基础与全景架构',
    summary: '建立云的整体认知：从起源到 5 大特征、5 类服务、4 种部署、计费与迁移',
    duration: '约 110 分钟',
    objectives: [
      '理解云计算的起源、NIST 五大特征与核心商业逻辑',
      '区分 IaaS / PaaS / SaaS / CaaS / FaaS 五类服务模型及典型代表产品',
      '掌握公有云 / 私有云 / 混合云 / 多云 / 行业云的取舍依据',
      '理解虚拟化与容器化两类技术的边界与组合用法',
      '熟悉常见计费模型与 6R 迁移策略，能与客户初步对话上云路径'
    ],
    sections: [
      {
        title: '一、云计算的起源与发展史',
        keypoints: [
          { title: '云计算的"标志性起点"', body: '2006 年 AWS 推出 S3（3 月）和 EC2（8 月），第一次把"按需付费的计算"做成了商品；此前的 ASP/网格计算仅停留在概念。' },
          { title: '中国云的三波节奏', body: '第一波（2009-2013）阿里云写下"飞天"内核；第二波（2014-2018）腾讯/华为入场打公有云；第三波（2020 后）字节跳动孵化火山引擎、运营商云入场，行业云与信创成为主旋律。' },
          { title: 'Gartner 云成熟度模型', body: '从 Cloud-First → Cloud-Smart → Cloud-Native 演进，企业从"先上云"过渡到"按业务特征选云"，再走向"为云而生的架构"。' },
          { title: '云的本质是"算力的电网化"', body: '把分散的服务器变成可计量、按需调度的资源池。客户买的是"用电量"，不再买"发电机"——这是与 IDC 托管最根本的区别。' }
        ]
      },
      {
        title: '二、NIST 五大基本特征（深度解读）',
        keypoints: [
          { title: '按需自助服务（On-demand Self-service）', body: '客户通过控制台/API 自助开通资源，分钟级到位，无需人工审批。反例：传统 IDC 申请一台服务器要 2-4 周。' },
          { title: '广泛网络访问（Broad Network Access）', body: '通过标准互联网/专线访问，支持多种终端（PC/手机/IoT）；典型 SLA 99.95%-99.99%。' },
          { title: '资源池化（Resource Pooling）', body: '多租户共享底层硬件，云厂商通过虚拟化把一台 96 核物理机切成多个 4-8 核 ECS，整体利用率从 IDC 的 10-15% 拉到 50%+。' },
          { title: '快速弹性（Rapid Elasticity）', body: '业务高峰可分钟级扩容数千核，低谷自动收缩；电商大促从 100 台扩到 5000 台、跑完再缩，这在自建机房不可想象。' },
          { title: '可计量服务（Measured Service）', body: '资源用量精确到秒/GB，账单透明可审计；这是把 CapEx（资本支出）转 OpEx（运营支出）的财务前提。' }
        ]
      },
      {
        title: '三、五类服务模型 IaaS/PaaS/SaaS/CaaS/FaaS',
        keypoints: [
          { title: 'IaaS 基础设施即服务', body: '提供计算/存储/网络等底层资源，客户管理 OS 及以上。代表：火山引擎 ECS、TOS、VPC；适合需要完整控制的自研系统。' },
          { title: 'PaaS 平台即服务', body: '提供运行时与开发平台，如 RDS、消息队列、AI 平台。代表：veDB、ByteHouse、火山方舟；客户只关心应用与数据。' },
          { title: 'SaaS 软件即服务', body: '直接提供完整应用。代表：飞书、Coze 智能体平台；按账号/调用量付费，3 天内即可上线使用。' },
          { title: 'CaaS 容器即服务', body: '基于 Docker/K8s 提供的托管容器平台。代表：火山引擎 VKE、veCR 镜像仓库；介于 IaaS 与 PaaS 之间，是云原生主战场。' },
          { title: 'FaaS 函数即服务', body: '事件触发、按调用次数+毫秒计费的极致弹性。代表：veFaaS；典型场景为图片处理、IoT 上报、API 后端，闲时零成本。' }
        ]
      },
      {
        title: '四、四种部署模式与多云',
        keypoints: [
          { title: '公有云（Public Cloud）', body: '资源由云厂商提供并多租户共享，弹性最强、单价最低；适合互联网、SaaS、新零售等需要快速试错的业务。' },
          { title: '私有云（Private Cloud）', body: '专属硬件资源，OpenStack/VMware 是常见底座；满足金融、政务、军工对数据物理隔离的诉求；CapEx 高、利用率通常仅 20-30%。' },
          { title: '混合云（Hybrid Cloud）', body: '本地 IDC + 公有云通过专线打通，如核心交易留本地、营销弹性上云；银行业的"两地三中心"+ 公有云容灾是典型形态。' },
          { title: '多云（Multi-Cloud）', body: '同时使用 2 个及以上公有云，规避锁定与可用性风险；CNCF 调查显示 2024 年 76% 的中大型企业已采用多云。' },
          { title: '行业云/专属云', body: '为特定行业打造的合规云形态，如火山引擎汽车云、金融云、政务云；提供等保三级、信创基座、行业插件，部署在客户机房或专区。' }
        ]
      },
      {
        title: '五、虚拟化与容器化技术对比',
        keypoints: [
          { title: 'KVM（Kernel-based Virtual Machine）', body: 'Linux 内核原生虚拟化，开源免费，AWS Nitro、火山引擎 ECS 底层都基于 KVM；性能损耗约 3-5%。' },
          { title: 'Xen / Hyper-V / VMware ESXi 对比', body: 'Xen 早期 AWS 采用，半虚拟化；Hyper-V 微软产品适合 Windows 栈；ESXi 商业化最成熟、运维工具链完善但许可费贵。' },
          { title: '容器隔离原理', body: '基于 Linux Namespace（PID/Network/Mount 等）+ Cgroups（CPU/Memory 限额）实现进程级隔离，秒级启动 vs 虚拟机分钟级。' },
          { title: 'OCI 标准与 containerd', body: 'Open Container Initiative 定义镜像与运行时规范；K8s 1.20+ 弃用 dockershim，主流改用 containerd / CRI-O。' },
          { title: '虚拟化 vs 容器何时选谁', body: '需要内核级隔离/异构 OS（Windows + Linux 混跑）→ 虚拟机；需要高密度/快速迭代/微服务架构 → 容器；最佳实践是"虚拟机里跑容器"。' }
        ]
      },
      {
        title: '六、云原生与 CNCF 全景',
        keypoints: [
          { title: '12-Factor App 方法论', body: 'Heroku 提出的 12 条云原生应用准则，核心是配置外部化、无状态、日志即流；任何"上云改造"都要先做 12-Factor 体检。' },
          { title: 'CNCF 全景图', body: 'Cloud Native Computing Foundation 维护的 1500+ 项目地图，覆盖编排（K8s）、服务网格（Istio）、可观测（Prometheus）、CI/CD（Argo）等 30 个细分。' },
          { title: '毕业项目（Graduated）', body: '已大规模生产可用的 30+ 项目，如 Kubernetes、Prometheus、Envoy、etcd、Helm、Argo；选型优先看毕业级。' },
          { title: '云原生 vs 上云', body: '"上云"只是搬到 ECS；"云原生"是按 K8s+微服务+DevOps+可观测重新设计应用。前者节省硬件，后者改变研发效率。' }
        ]
      },
      {
        title: '七、计费模型与成本优化',
        keypoints: [
          { title: '按量付费（Pay-as-you-go）', body: '按秒/小时计费、随用随停；适合开发测试、突发活动；单价最贵，长期使用比包月贵 30-60%。' },
          { title: '包年包月（Subscription）', body: '提前承诺 1 个月-3 年，单价比按量低 30-50%；适合稳定的核心业务；提前退订有手续费。' },
          { title: '节省计划（Savings Plan）/ 预留实例', body: '承诺一定使用量换 30-72% 折扣，灵活性高于包月；AWS 同款称 SP，火山引擎称"资源包"。' },
          { title: '抢占式实例（Spot/Preemptible）', body: '使用云厂商空闲资源，单价比按量低 50-90%；可能 5 分钟通知后被回收，适合大数据离线计算、AI 训练 checkpoint 任务。' },
          { title: 'FinOps 三原则', body: 'Inform（账单可视）→ Optimize（按需选型/Right-sizing）→ Operate（持续治理）；好的售前要懂得算 TCO 而非只报刊例价。' }
        ]
      },
      {
        title: '八、6R 迁移策略与决策树',
        keypoints: [
          { title: 'Rehost（重新托管/Lift-and-Shift）', body: '原样搬到云上 ECS，改造最少、收益最少；适合上云时间紧、应用待退役的场景，1-2 周即可完成。' },
          { title: 'Replatform（小幅改造）', body: '换底层托管服务，如自建 MySQL → veDB MySQL，自建 Redis → 云 Redis；性价比最高，运维成本骤降。' },
          { title: 'Refactor（重构为云原生）', body: '按微服务+K8s+Serverless 重写，研发周期 3-12 个月；适合已规划技术升级或系统瓶颈严重的核心业务。' },
          { title: 'Repurchase（替换为 SaaS）', body: '自建 OA / CRM / 邮箱 → 飞书、Salesforce、企业微信；典型可省 60% 以上 IT 投入。' },
          { title: 'Retire（退役）', body: '迁移评估后发现 10-20% 的应用其实无人使用，直接关停；这是最被低估但 ROI 最高的策略。' },
          { title: 'Retain（保留不迁）', body: '受合规、硬件依赖（HSM/老 IBM 主机）或迁移风险过大的系统暂留本地，与云通过专线集成。' }
        ]
      },
      {
        title: '九、全球与中国云厂商格局',
        keypoints: [
          { title: '全球三巨头（AWS/Azure/GCP）', body: 'Gartner MQ 2024：AWS 市占率约 31%，Azure 约 25%，GCP 约 11%；技术栈各有所长（AWS 全、Azure 强企业、GCP 强 AI/数据）。' },
          { title: '中国第一梯队', body: 'IDC 中国 IaaS 2024：阿里云、华为云、腾讯云、中国电信天翼云、火山引擎位列 Top 5；其中火山引擎依托字节系业务快速崛起。' },
          { title: '火山引擎差异化定位', body: '"原生 AI + 字节同款基础设施"：豆包大模型、推荐算法、视频云、ByteHouse 等都是字节内部生产验证后对外输出。' },
          { title: '信创云', body: '国产 CPU（鲲鹏/海光/飞腾）+ 国产 OS（麒麟/欧拉）+ 国产数据库（达梦/人大金仓），政务、金融、能源等关键行业必备。' }
        ]
      }
    ],
    terms: ['IaaS', 'PaaS', 'SaaS', 'CaaS', 'FaaS', 'KVM', 'Namespace', 'Cgroups', 'OCI', '12-Factor', 'CNCF', 'CapEx', 'OpEx', '6R', 'FinOps', 'Spot 实例', '行业云', '信创'],
    sellingPoint: '客户问"为什么要上云"时，不要从技术堆起。先问三件事：① 你最痛的业务问题是什么（成本？弹性？合规？）② 你的 IT 预算结构是 CapEx 还是 OpEx 主导？③ 你的团队规模与技术储备能不能撑得起云原生？再用 6R 给一个分阶段路径：先 Rehost 试水 3 个非核心系统，6 个月后再 Replatform 数据库，最后 Refactor 核心。这样客户听到的是"路径"而不是"卖货"。',
    caseStudy: {
      scenario: '某传统零售企业 200+ 门店，自建 IDC 4 个机柜，每年 IT 折旧 + 机房费 + 带宽 ≈ 380 万。新业务（小程序、直播）流量峰值是平时的 8 倍，自建扩容来不及。',
      solution: '采取分阶段：① 第 1 阶段把电商前端、营销活动 Rehost 到火山引擎 ECS + CDN，3 周完成；② 第 2 阶段把 MySQL 替换为 veDB MySQL（Replatform），节省 2 名 DBA；③ 核心 ERP 暂 Retain 在本地，通过专线集成。',
      value: '年 IT 总成本从 380 万降到约 240 万（-37%），营销活动可分钟级扩容到 200 台 ECS，业务团队上线周期从 2 周缩短到 2 天。'
    },
    commonPitfalls: [
      '只比刊例价不算 TCO：忘记算迁移人力、流量费、技术栈学习成本',
      '一上来就 Refactor：所有应用按云原生重写 → 一年没产出，业务侧造反',
      '忽略合规：金融/政务客户没看清等保和数据出境约束就推公有云方案'
    ]
  },

  {
    day: 2,
    videoQueries: ['VPC 入门 阿里云', 'VLAN 子网划分 教程', 'CIDR 子网计算'],
    internalVideo: 'lessons/day2-video.html?v=15',
    stage: 's1',
    title: '云网络深度（VPC / 负载均衡 / 混合组网 / CDN）',
    summary: '从 OSI 模型到 VPC、SLB、专线、SD-WAN、CDN 的全栈云网络',
    duration: '约 120 分钟',
    objectives: [
      '回顾 OSI 与 TCP/IP，掌握 IP/CIDR/子网划分计算',
      '深度理解 VPC、安全组 vs ACL、路由表的工作机制',
      '区分四层 NLB 与七层 ALB，掌握常见 LB 算法与会话保持',
      '掌握 VPC 互联（对等连接 / CEN / PrivateLink）与混合云组网',
      '理解 CDN、DCDN、智能 DNS 的工作原理与选型边界'
    ],
    sections: [
      {
        title: '一、网络协议基础回顾',
        keypoints: [
          { title: 'OSI 七层 vs TCP/IP 四层', body: '应用/表示/会话/传输/网络/数据链路/物理 → 实际工程只用 TCP/IP 四层。售前最常打交道的：L4=TCP/UDP（NLB），L7=HTTP（ALB/WAF）。' },
          { title: 'IPv4 与 CIDR', body: 'IPv4 = 32 bit，地址枯竭已 8 年；CIDR 表示如 10.0.0.0/16 = 65536 个地址。VPC 规划必先定 CIDR。' },
          { title: '子网划分计算', body: '/24 = 256 个 IP（可用 251），/22 = 1024，/16 = 65536；建议给每个可用区/业务模块预留 /22-/24，未来不够扩。' },
          { title: 'IPv6', body: '128 bit，地址几乎无穷；电信运营商已普遍 IPv6，云上业务建议双栈，避免后续被动改造。' },
          { title: '常用端口与协议', body: 'HTTP 80、HTTPS 443、SSH 22、RDP 3389、MySQL 3306、Redis 6379；安全组配置必须精确到端口，禁开 0.0.0.0/0:22。' }
        ]
      },
      {
        title: '二、VPC 专有网络',
        keypoints: [
          { title: 'VPC 是什么', body: 'Virtual Private Cloud，租户在云上的逻辑隔离网络空间。每个 VPC 独立 CIDR、独立路由表、独立 ACL；账号默认有 1-3 个，可申请扩容。' },
          { title: 'CIDR 设计原则', body: '建议主 VPC 用 10.0.0.0/16，分支用 172.16.x.0/20，避免与 IDC 192.168.x.0/24 冲突；预留 50% 给未来。' },
          { title: '可用区与子网', body: '一个可用区 = 一个独立机房，跨 AZ 部署可抗机房级故障；子网必须落在某个可用区，多 AZ 业务要为每 AZ 配子网。' },
          { title: '主网卡 vs 弹性网卡 ENI', body: '主网卡随 ECS 创建删除；ENI 可在 ECS 间漂移，常用于双机热备、容器多网卡场景。' },
          { title: 'VPC 配额与上限', body: '默认每账号 5 个 VPC、每 VPC 24 个子网、每路由表 50 条路由；规划大网时需提前提工单扩容。' }
        ]
      },
      {
        title: '三、安全组 vs 网络 ACL',
        keypoints: [
          { title: '安全组（有状态）', body: '工作在 ECS/ENI 维度，按五元组（协议/源 IP/目的 IP/端口/方向）配置；有状态——出去的流量自动允许返回，无需配回程规则。' },
          { title: '网络 ACL（无状态）', body: '工作在子网维度，规则按编号顺序匹配；无状态——出/入流量必须分别配规则，配置更精细但易出错。' },
          { title: '组合用法', body: '"网络 ACL 做粗粒度子网隔离 + 安全组做细粒度实例放行"是大型架构的标准做法；金融客户尤其依赖这个组合。' },
          { title: '默认拒绝原则', body: '生产环境安全组应"白名单"模式：默认全拒，再按需放行端口；切忌默认 0.0.0.0/0:any open。' },
          { title: '审计与合规', body: '等保 2.0 三级要求安全组日志保留 6 个月+；火山引擎 VPC 流日志支持自动落 TOS。' }
        ]
      },
      {
        title: '四、路由与公网出入',
        keypoints: [
          { title: '路由表三类', body: '系统路由（VPC 自动生成）、自定义路由（手动加，指向 VPN/专线/NAT）、默认路由 0.0.0.0/0（指向网关）。' },
          { title: 'EIP 弹性公网 IP', body: '可绑定 ECS / NAT / SLB 的公网 IP，可解绑迁移；按 IP 占用费 + 流量费/带宽费两种计费。' },
          { title: 'NAT 网关', body: '允许 VPC 内大量 ECS 共享出公网，但隐藏内网 IP；适合无需对外暴露的批量爬虫、构建机。' },
          { title: '共享带宽包', body: '多个 EIP 共享一个带宽池，能抹平多业务峰值，平均节省 20-40% 带宽费用。' },
          { title: 'Anycast EIP', body: '全球同一 IP 多 POP 接入，外贸/海外业务延迟降低 30%+；典型用在游戏、跨境电商。' }
        ]
      },
      {
        title: '五、负载均衡',
        keypoints: [
          { title: '四层 NLB（Network LB）', body: '工作在 TCP/UDP 层，支持百万级 QPS、毫秒级延迟，适合金融交易、游戏长连接、物联网。' },
          { title: '七层 ALB（Application LB）', body: '工作在 HTTP/HTTPS 层，支持基于 URL/Host/Header 路由、SSL 卸载、WAF 集成；电商、SaaS 几乎都用 ALB。' },
          { title: 'LB 算法', body: '轮询（Round Robin）公平但忽略节点性能；加权轮询配大小不一节点；最小连接数适合长连接；源 IP Hash 用于会话保持。' },
          { title: '健康检查', body: 'HTTP/TCP/HTTPS 三种探测，每 2-5 秒一次，连续 3 次失败剔除节点；阈值过敏感会触发抖动雪崩。' },
          { title: '会话保持 vs 无状态', body: '老应用需要会话保持（Cookie/源 IP）；现代设计推无状态，把 Session 放 Redis，LB 才能真正水平扩展。' },
          { title: '跨 AZ 多活', body: 'SLB 默认跨 AZ 部署，单 AZ 故障自动切换；金融客户常用"主备 + 异地多活"双层架构。' }
        ]
      },
      {
        title: '六、VPC 互联',
        keypoints: [
          { title: '对等连接（VPC Peering）', body: '同区域两 VPC 直连，CIDR 不能重叠；适合关联子公司、跨账号合作；超过 3 个 VPC 后管理变难。' },
          { title: '云企业网 / Transit Gateway', body: '中心化的多 VPC 互联枢纽，支持跨 region/账号；火山引擎对应"云企业网 CEN"，简化 N×N 互联为 N×1。' },
          { title: 'PrivateLink 私网连接', body: '不暴露公网 IP，跨 VPC/账号访问 SaaS 服务（如 ByteHouse、第三方 API），大幅降低攻击面。' },
          { title: '共享 VPC', body: '多账号复用同一 VPC，资源集中管控；金融集团内常用"母子账号 + 共享 VPC"做财务隔离。' }
        ]
      },
      {
        title: '七、混合云组网',
        keypoints: [
          { title: 'IPSec VPN', body: '走公网加密隧道，开通快（小时级）、成本低（按带宽包月）；延迟取决于公网，约 30-100ms。' },
          { title: '专线（DC/Direct Connect）', body: '运营商物理专线接入云 POP 点，延迟 5-20ms、稳定性远高于 VPN；月费数千-数万，适合金融/汽车核心业务。' },
          { title: 'SD-WAN', body: '通过 SaaS 化设备做多分支智能选路，可融合 4G/5G/MPLS；连锁零售、跨境分公司常见。' },
          { title: 'BGP 与多线接入', body: '通过 BGP 协议同时接入电信/联通/移动，避免单运营商故障；DC 专线支持双 BGP 主备。' }
        ]
      },
      {
        title: '八、DNS 与 CDN',
        keypoints: [
          { title: 'DNS 工作原理', body: '递归解析（客户端→Local DNS）+ 迭代解析（Local→根→TLD→权威）；TTL 过短会打爆权威，过长会切换迟缓。' },
          { title: '智能 DNS', body: '按运营商/地域/客户端 IP 返回最近节点，是 CDN 的入口；火山引擎 PublicDNS 支持百毫秒级生效。' },
          { title: 'CDN 工作机制', body: '把静态资源缓存到边缘节点（POP），用户就近访问；首次回源、后续命中，命中率 90%+ 时回源带宽下降 10x。' },
          { title: 'DCDN 全站加速', body: '不仅缓存静态，还对动态请求做路由优化（智能选路+TCP 优化），适合电商详情页、API 类业务。' },
          { title: '缓存策略', body: 'TTL（生存时间）+ 缓存键（URL/参数/Header）；上线前必须做"刷新预热"，避免冷启动打爆源站。' },
          { title: '视频 CDN', body: '针对 HLS/DASH 切片、点播 Range 请求做专门优化；火山引擎 VOD/LSS 自带视频 CDN。' }
        ]
      }
    ],
    terms: ['VPC', 'CIDR', '安全组', '网络 ACL', 'NLB', 'ALB', 'EIP', 'NAT', 'Peering', 'CEN', 'PrivateLink', 'BGP', 'SD-WAN', 'DCDN', 'Anycast'],
    sellingPoint: '客户问网络方案时不要堆产品，先画"用户 → 边缘 → 入口 → 业务 → 数据"5 段路径。每段对应 1-2 个产品：边缘=CDN/DCDN/Anycast，入口=ALB+WAF+DDoS 高防，业务=VPC+安全组+ENI，互联=CEN+PrivateLink，混合=专线+SD-WAN。客户能听懂"网络的故事"，比单独讲 VPC 强 10 倍。',
    caseStudy: {
      scenario: '某直播平台日活 500 万，主站架构在火山引擎，海外用户占 30% 但卡顿严重，国内三大运营商访问质量也参差。',
      solution: '入口侧上 Anycast EIP + 全球 DCDN（边缘 2000+ 节点）；国内启用三线 BGP，海外开 5 个 POP 区域；同时 ALB 升级到跨 AZ 多活，CDN 命中率从 76% 优化到 94%。',
      value: '海外平均加载时延从 1.8s 降到 0.6s，回源带宽下降 70%，CDN 月费下降 35%；直播首屏卡顿率下降 60%。'
    },
    commonPitfalls: [
      'CIDR 规划过小：上线半年后扩 VPC 要重做对等连接，工作量极大',
      '安全组开放过宽：22/3389 对外暴露 → 一周内被全网扫到',
      'CDN 不预热直接切量：百万 QPS 全打回源，源站宕机'
    ]
  },

  {
    day: 3,
    videoQueries: ['对象存储 S3 入门', '块存储 文件存储 对象存储 区别', '云存储 IOPS 教程'],
    stage: 's1',
    title: '云存储深度（对象 / 块 / 文件 / 归档 / KMS）',
    summary: '掌握四类存储形态、IOPS/吞吐/延迟三大指标、加密与生命周期',
    duration: '约 110 分钟',
    objectives: [
      '建立存储分类全景，区分本地盘 / 块 / 文件 / 对象 / 归档 / 数据库',
      '深入对象存储：桶、Key、ACL、分片上传、版本控制、生命周期',
      '理解块存储 IOPS / 吞吐 / 延迟三大指标与云盘性能等级',
      '掌握 NAS、vePFS 等文件存储的协议（NFS/SMB）与典型场景',
      '理解数据加密、KMS 信封加密、跨区域复制 CRR 与合规要求'
    ],
    sections: [
      {
        title: '一、存储分类全景',
        keypoints: [
          { title: '六类常见形态', body: '本地盘（NVMe/SSD）、块（云盘）、文件（NAS）、对象（S3 类）、归档（Glacier 类）、数据库（结构化）；按访问模式与持久度选型。' },
          { title: '块存储', body: '裸设备级，支持 POSIX 读写，IOPS 高、延迟低（亚毫秒级）；典型用在数据库、虚拟机系统盘。' },
          { title: '文件存储', body: '提供共享文件系统（NFS/SMB），多机挂载读写；典型用在内容管理、企业网盘、ML 训练数据集。' },
          { title: '对象存储', body: '基于 HTTP RESTful，扁平 Key-Value 结构，单桶可存数 PB-EB；典型用在图片、视频、备份、数据湖。' },
          { title: '归档存储', body: '极低成本（约对象的 1/4-1/10），但取回需 1 分钟-12 小时；适合 7-30 年合规留档、视频冷备份。' },
          { title: '关系/NoSQL 数据库', body: '本质是结构化存储+查询引擎，会在 Day 4 详讲；与对象/文件/块互为分层。' }
        ]
      },
      {
        title: '二、对象存储深入',
        keypoints: [
          { title: '桶（Bucket）与对象（Object）', body: '桶是顶级容器，全局唯一名；Object 由 Key（路径）+ Value + Metadata 组成；火山引擎 TOS 单桶可存 EB 级。' },
          { title: 'S3 协议生态', body: '事实标准 API，火山引擎 TOS、阿里 OSS、华为 OBS 均兼容 S3；客户已有 S3 SDK 几乎零改造。' },
          { title: '上传方式', body: '小文件 PutObject 一次性上传；大文件用分片上传（Multipart Upload），可并行+断点续传，单文件最大 48.8 TB。' },
          { title: 'ACL 与签名 URL', body: '桶/对象 ACL 控制公私读写；Pre-signed URL 给临时下载/上传链接（有效期可设秒级到天）。' },
          { title: '版本控制', body: '开启后每次覆盖产生新版本，可恢复误删；存储成本上升，需配生命周期清理旧版。' },
          { title: '存储类别（Storage Class）', body: '标准（Standard）→ 低频（IA，单价低 30-40%）→ 归档（Archive，低 70%）→ 深度归档（Deep Archive，低 90%），按访问频率自动转换。' }
        ]
      },
      {
        title: '三、块存储与云盘',
        keypoints: [
          { title: 'IOPS / 吞吐 / 延迟', body: '三大指标。IOPS 是每秒 I/O 次数（事务型业务在意），吞吐是 MB/s（分析型在意），延迟是单次响应时间（金融/游戏在意）。' },
          { title: '云盘类型', body: 'PL0/PL1/PL2/PL3 性能逐级提升；PL3 单盘 IOPS 可达百万、延迟亚毫秒；越高越贵，按需选。' },
          { title: 'SSD vs HDD vs NVMe', body: 'HDD 成本最低（数 TB 级历史归档）；SSD 通用主流；NVMe 用于极致延迟（Redis 持久化、OLTP）。' },
          { title: '快照（Snapshot）', body: '增量备份，秒级触发；可定时策略（如每天凌晨）；跨区域复制实现异地容灾。' },
          { title: '云盘加密', body: '默认或按桶/盘开启 KMS 加密；性能损耗 <3%；金融、医疗合规必备。' }
        ]
      },
      {
        title: '四、文件存储 NAS',
        keypoints: [
          { title: 'NFS vs SMB 协议', body: 'NFS 是 Linux 主流（v3/v4），SMB（CIFS）是 Windows 主流；混合环境选支持双协议的 NAS。' },
          { title: '通用型 vs 极速型', body: '通用 NAS 容量大、IOPS 中等，适合 OA、企业网盘；极速型基于全闪，适合 AI 训练、HPC 高吞吐场景。' },
          { title: 'vePFS 并行文件系统', body: '火山引擎为 AI/HPC 打造的并行 FS，单文件系统支持 100GB/s+ 吞吐；千卡训练首选。' },
          { title: '与对象存储边界', body: 'NAS 适合需要 POSIX 共享的应用；对象适合海量+无修改+互联网访问；ML 数据集训练用 NAS、归档存档用对象。' }
        ]
      },
      {
        title: '五、归档存储与生命周期',
        keypoints: [
          { title: '归档触发与解冻', body: '低频访问→归档（Archive，5-15 分钟取回）→深度归档（Deep Archive，2-12 小时取回）；解冻按容量+次数收费。' },
          { title: '生命周期规则', body: '按对象前缀/Tag 配置自动转换：30 天前→IA，90 天前→Archive，1 年→删除；正确配置可省 50%-80% 存储费。' },
          { title: '典型行业用法', body: '医疗影像 30 年留档、银行流水 7 年合规、视频网站老剧冷备份；客户最容易忽略的成本优化。' },
          { title: 'WORM 合规模式', body: 'Write Once Read Many，写入后不可删改，等保/金融/政务部分场景强制要求。' }
        ]
      },
      {
        title: '六、数据加密与 KMS',
        keypoints: [
          { title: '传输加密 vs 静态加密', body: '传输靠 HTTPS/TLS 1.2+；静态靠 SSE-S3（云厂商管钥匙）或 SSE-KMS（你管钥匙）。' },
          { title: 'KMS 密钥管理', body: '管理 CMK（Customer Master Key），支持自动轮转、审计日志、HSM 硬件级保护。' },
          { title: '信封加密原理', body: '数据用 DEK（Data Encryption Key）加密，DEK 再用 CMK 加密。一次解密只暴露 DEK，CMK 永不落地，安全且性能好。' },
          { title: 'BYOK 自带密钥', body: '客户自有密钥导入 KMS 使用，金融/合规客户必备；与本地 HSM 联动可做"密钥不出企业"。' },
          { title: '加密性能影响', body: '现代 CPU 支持 AES-NI 指令集，加密/解密 CPU 开销 <3%；不该是拒绝加密的理由。' }
        ]
      },
      {
        title: '七、数据传输与迁移',
        keypoints: [
          { title: 'DTS 数据传输服务', body: '在线数据库迁移工具，支持 MySQL→veDB、Oracle→veDB MySQL/PG，保证 RPO 秒级；亿级数据 24 小时内迁完。' },
          { title: '闪电立方 / Snowball 类', body: 'PB 级离线迁移，物理设备寄送；当带宽不够（如 100TB 走 1Gbps 要 11 天）时是唯一选择。' },
          { title: 'rclone / s3cmd', body: '开源工具适合 GB-TB 级别同步，简单灵活；生产建议结合断点续传与 MD5 校验。' },
          { title: '直传与 SDK', body: '客户端直传对象存储（前端获取临时 STS Token），跳过应用层中转，节省服务器带宽。' }
        ]
      },
      {
        title: '八、跨区域复制与合规',
        keypoints: [
          { title: 'CRR 跨区域复制', body: '对象/数据库自动复制到异地，RPO 分钟级，是异地容灾基础；满足两地三中心要求。' },
          { title: 'SRR 同区域复制', body: '同 region 不同桶/账号复制，常用于审计副本、数据治理边界。' },
          { title: '数据出境合规', body: '《数据安全法》《个人信息保护法》要求关键数据不得出境；跨国客户必走专属 region 或行业云。' },
          { title: 'GDPR 与"被遗忘权"', body: '欧盟用户可要求彻底删除，对象存储版本控制 + WORM 配置不当会冲突，需提前设计。' }
        ]
      }
    ],
    terms: ['Bucket', 'Object', 'IOPS', '吞吐', '延迟', 'PL3', 'NFS', 'SMB', 'vePFS', '生命周期', 'WORM', 'KMS', 'CMK', 'DEK', '信封加密', 'CRR', 'BYOK', 'STS'],
    sellingPoint: '存储类客户对话最容易陷入"性能/价格"两端拉锯。售前的破题点是"分层"——把客户的存储画成"热/温/冷/冰"四层：热层（业务库）用 PL3 云盘；温层（30 天内可访问）用对象 Standard；冷层（30-365 天）走 IA + 生命周期；冰层（1 年+合规）走 Archive。算下来综合存储成本能砍 40-60%，比死磕单价有效得多。',
    caseStudy: {
      scenario: '某视频网站存量素材 8 PB，全部放对象 Standard，年存储费 2400 万；70% 内容半年无访问，但合规要求保留 5 年。',
      solution: '配置生命周期：30 天热门 → Standard，30-180 天 → IA，180 天-5 年 → Archive；同时开 CRR 复制到异地 region；冷数据加 WORM 合规锁定。',
      value: '年存储费降至约 720 万（-70%），同时满足 5 年合规与异地容灾；查询热门内容性能不变。'
    },
    commonPitfalls: [
      '一桶到底：所有内容堆 Standard，半年后被账单吓到',
      'KMS 密钥误删：1 个月窗口期内未恢复 → 数据永久不可解密',
      '跨境合规漏算：海外用户上传到中国 region，触犯当地数据驻留法'
    ]
  },

  {
    day: 4,
    videoQueries: ['MySQL Redis 区别', 'NoSQL 数据库对比', 'Kafka 入门教程'],
    stage: 's1',
    title: '云数据库与中间件（NewSQL / Redis / Kafka / 数据湖）',
    summary: 'CAP 与 ACID、关系/NoSQL/NewSQL 选型、缓存设计、消息队列、湖仓一体',
    duration: '约 120 分钟',
    objectives: [
      '掌握 CAP / BASE / ACID 理论及其工程含义',
      '能为典型场景在 MySQL / PG / NewSQL / NoSQL 间做合理选型',
      '理解 Redis 持久化、集群、缓存击穿/穿透/雪崩与对策',
      '区分 Kafka / RocketMQ / RabbitMQ 适用场景',
      '理解数据仓库 / 数据湖 / 湖仓一体的演进与差异'
    ],
    sections: [
      {
        title: '一、数据一致性理论',
        keypoints: [
          { title: 'CAP 定理', body: '一致性 C、可用性 A、分区容忍 P 三选二。云上分布式系统必选 P，所以核心矛盾在 CP（如 ZooKeeper、etcd）vs AP（如 Cassandra、Eureka）。' },
          { title: 'BASE 理论', body: 'Basically Available（基本可用）+ Soft state（软状态）+ Eventually consistent（最终一致）；电商、社交大多采用 AP+BASE。' },
          { title: 'ACID 四原则', body: '原子性、一致性、隔离性、持久性；银行转账等强事务场景必须 ACID，传统 MySQL/Oracle 是代表。' },
          { title: '隔离级别', body: '读未提交/读已提交/可重复读/串行化；MySQL 默认 RR、Oracle 默认 RC，理解隔离级别才能调对锁。' }
        ]
      },
      {
        title: '二、关系型数据库选型',
        keypoints: [
          { title: 'MySQL', body: '互联网最主流，5.7/8.0 是当前生产版本；适合 OLTP 中小规模（单实例 1-2 TB）；分库分表后管理复杂。' },
          { title: 'PostgreSQL', body: '"开源 Oracle"，复杂查询/JSON/GIS 都强，扩展性好；金融、政企国产化替代首选。' },
          { title: 'SQL Server / Oracle', body: '商业数据库，许可昂贵；上云常被 veDB MySQL/PG 替代以降低 TCO 50%+。' },
          { title: '主从架构', body: '一主多从，主写从读分担压力；半同步复制减少主从延迟。' },
          { title: '读写分离', body: '通过中间件（如 ProxySQL/veDB Proxy）按 SQL 类型路由，写请求到主，读到从；流量大的电商必备。' },
          { title: '分库分表', body: '当单库过 5 TB 或单表过 1 亿行时启用；按用户/订单 ID 哈希分；引入 Sharding-JDBC/MyCAT 等中间件。' }
        ]
      },
      {
        title: '三、NewSQL 分布式数据库',
        keypoints: [
          { title: 'NewSQL 是什么', body: '兼具 SQL 接口 + 分布式存储计算 + ACID 事务的数据库，解决"分库分表"复杂度。代表：veDB、TiDB、PolarDB、TDSQL。' },
          { title: 'Shared-Storage vs Shared-Nothing', body: 'PolarDB/veDB 走共享存储（计算与存储解耦，秒级扩从）；TiDB 走 Shared-Nothing（无共享，水平扩展更彻底）。' },
          { title: '兼容性', body: 'veDB MySQL 100% 兼容 MySQL 协议，应用零改造；veDB PostgreSQL 兼容 PG 标准。' },
          { title: 'HTAP 混合负载', body: 'Hybrid Transaction/Analytical Processing，既跑 OLTP 又能直接做实时分析，省去 ETL；ByteHouse、TiDB 7.0+ 是例子。' },
          { title: '典型场景', body: '业务规模快速增长、单库 MySQL 撑不住又不想分库分表的客户；veDB 单实例可达数十 TB、QPS 百万级。' }
        ]
      },
      {
        title: '四、索引与 SQL 优化',
        keypoints: [
          { title: 'B+ 树索引', body: '关系型数据库默认索引结构，范围查询友好；千万级表查询从全表扫数秒缩短到毫秒。' },
          { title: 'Hash 索引', body: 'O(1) 等值查询，但不支持范围；MySQL Memory 引擎、Redis 大量使用。' },
          { title: '倒排索引', body: '搜索引擎核心，把"文档→词"反转为"词→文档"；Elasticsearch、TiSearch 必备。' },
          { title: 'LSM Tree', body: 'Log-Structured Merge Tree，写优化结构；HBase、RocksDB、ClickHouse 写性能远超 B+ 树。' },
          { title: '慢查询', body: '设置 slow_query_log（>1s 的查询入日志），结合 EXPLAIN 看执行计划；80% 性能问题靠加索引解决。' }
        ]
      },
      {
        title: '五、Redis 缓存深度',
        keypoints: [
          { title: '持久化 RDB vs AOF', body: 'RDB 快照（启动快、可能丢分钟级数据）；AOF 追加日志（数据安全、文件大）；生产推荐两者结合。' },
          { title: '集群模式', body: '主从（单点写）、Sentinel（高可用）、Cluster（分槽 16384 个、水平扩展）；火山引擎云 Redis 三种全支持。' },
          { title: '缓存击穿', body: '热点 Key 失效瞬间打爆 DB；对策：互斥锁 / 永不过期 / 提前预热。' },
          { title: '缓存穿透', body: '查询不存在的 Key 不断打 DB；对策：Bloom Filter / 缓存空值。' },
          { title: '缓存雪崩', body: '大量 Key 同时失效；对策：TTL 加随机值 / 多级缓存 / 限流降级。' },
          { title: '常见用法', body: '会话（Session）、热点商品、排行榜（ZSet）、消息队列（List/Stream）、分布式锁（SETNX）。' }
        ]
      },
      {
        title: '六、NoSQL 多样化',
        keypoints: [
          { title: 'MongoDB 文档型', body: '灵活 Schema，JSON 原生存储；适合内容管理、用户画像；分片集群可达数十亿文档。' },
          { title: 'HBase 宽列', body: '列族存储，海量稀疏数据 PB 级；典型用在日志、点击流、推荐画像。' },
          { title: 'Cassandra', body: 'AP 强一致，跨数据中心写性能好；外贸/全球化业务常用。' },
          { title: '图数据库 Neo4j / ByteGraph', body: '建模"关系"，社交、风控、知识图谱必备；多跳查询比关系数据库 JOIN 快 100x+。' },
          { title: '时序数据库', body: 'InfluxDB / TDengine 专为指标/IoT 设计，写入压缩比 10x、查询 100x。' }
        ]
      },
      {
        title: '七、消息队列',
        keypoints: [
          { title: 'Kafka', body: '高吞吐（百万 TPS+），日志/数据管道/流处理首选；不擅长复杂消息路由与事务。' },
          { title: 'RocketMQ', body: '阿里开源，事务消息支持好，金融下单场景适用；社区活跃但不如 Kafka 国际化。' },
          { title: 'RabbitMQ', body: 'AMQP 协议，路由灵活、延迟低；适合企业 IT 业务流程，吞吐稍弱。' },
          { title: 'Pulsar', body: '存算分离架构，多租户友好；少数大型公司用作 Kafka 升级方案。' },
          { title: '事务消息 vs 普通消息', body: '事务消息保证"本地事务+发消息"原子性；下单+扣库存等强一致场景必备。' }
        ]
      },
      {
        title: '八、数据仓库 / 数据湖 / 湖仓一体',
        keypoints: [
          { title: '数据仓库', body: '结构化数据 + 高性能 OLAP，如 ByteHouse、Snowflake、Redshift；查询毫秒-秒级，单价较贵。' },
          { title: '数据湖', body: '存储原始多源数据（结构化+非结构化），格式如 Parquet/ORC；TOS+EMR+LAS 是典型组合，存储便宜分析慢。' },
          { title: '湖仓一体', body: '基于 Iceberg/Hudi/Delta Lake，把仓的高性能 + 湖的灵活性合一；火山引擎 LAS 是代表。' },
          { title: 'ETL vs ELT', body: 'ETL（先清洗再入库）适合传统数仓；ELT（先入湖再处理）适合大数据时代，灵活但需算力支撑。' }
        ]
      }
    ],
    terms: ['CAP', 'BASE', 'ACID', 'veDB', 'TiDB', 'HTAP', 'B+ 树', 'LSM Tree', 'Redis Cluster', 'Bloom Filter', 'Kafka', 'RocketMQ', 'Iceberg', '湖仓一体'],
    sellingPoint: '客户说"我们已经有 Oracle"时，先问三件事：① 版本与许可成本（每年是否上百万）② DBA 团队规模与瓶颈 ③ 是否考虑国产化/上云。再切到 veDB PostgreSQL 兼容性 + DTS 平滑迁移工具 + TCO 对比（通常省 50%+），而不是上来就让客户换。客户最关心的不是性能，是"换的过程会不会出事"。',
    caseStudy: {
      scenario: '某互联网金融公司核心交易库 Oracle，单实例 6 TB，许可+硬件年支出 800 万；业务增长后写入瓶颈明显，DBA 三人撑不住。',
      solution: '采用 veDB PG（PG 兼容 Oracle 多数语法）+ DTS 全量+增量同步先做镜像，灰度切读，最后切写；引入 ByteHouse 做实时风控分析。',
      value: '年许可+硬件费降到约 280 万（-65%），写入 TPS 提升 3 倍，DBA 释放 1.5 个 FTE 投入业务建模。'
    },
    commonPitfalls: [
      '盲目去 Oracle：用 MySQL 强切，触发存储过程兼容性深坑',
      '缓存当数据库用：未持久化 → Redis 重启数据全丢',
      '消息队列没幂等：网络重试 → 同一笔订单扣两次款'
    ]
  },

  {
    day: 5,
    videoQueries: ['Docker 入门', 'Kubernetes K8s 入门教程', 'Service Mesh Istio'],
    stage: 's1',
    title: '容器与云原生（Docker / K8s / Service Mesh / GitOps）',
    summary: 'Docker、Kubernetes 全要素、Service Mesh、CI/CD 与 GitOps 完整链路',
    duration: '约 120 分钟',
    objectives: [
      '理解容器化的价值与 Docker 核心组成',
      '掌握 K8s 架构（控制面/数据面）与十大资源对象',
      '理解 K8s 网络（CNI）、存储（CSI）、自动伸缩',
      '了解 Service Mesh / Istio 流量治理与可观测',
      '掌握 CI/CD、GitOps、Argo CD 的现代研发链路'
    ],
    sections: [
      {
        title: '一、容器化的价值',
        keypoints: [
          { title: '虚拟机 vs 容器启动开销', body: '虚拟机启动 1-3 分钟、占内存 GB 级；容器启动毫秒-秒级、内存 MB 级；同一机器密度差 10x。' },
          { title: '"一次构建到处运行"', body: '镜像把代码+运行时+OS 库打包，开发→测试→生产环境一致，根除"在我电脑上是好的"。' },
          { title: '不可变基础设施', body: '部署=替换镜像，禁止 SSH 改配置；故障即销毁，配合自愈大幅降低运维负担。' },
          { title: 'DevOps 基石', body: '容器是 CI/CD 流水线的天然单位，构建、扫描、推送、部署皆围绕镜像。' }
        ]
      },
      {
        title: '二、Docker 核心',
        keypoints: [
          { title: '镜像（Image）', body: '分层只读模板，由 Dockerfile 构建；通常基础镜像 + 业务层 + 配置层；alpine 基础可压到 5-30 MB。' },
          { title: 'Dockerfile 关键指令', body: 'FROM/COPY/RUN/CMD/ENTRYPOINT/EXPOSE；多阶段构建（multi-stage）能把镜像缩小 80%。' },
          { title: '镜像仓库 Registry', body: 'Docker Hub、Harbor、火山引擎 veCR；企业必建私有仓库做镜像扫描和访问控制。' },
          { title: 'Docker Compose', body: 'YAML 描述多容器组合，单机开发调试利器；生产环境基本由 K8s 取代。' }
        ]
      },
      {
        title: '三、Kubernetes 架构',
        keypoints: [
          { title: '控制面 4 大组件', body: 'API Server（统一入口）、etcd（强一致存储）、Scheduler（调度）、Controller Manager（控制器）；高可用部署 3 副本起。' },
          { title: '数据面 kubelet + kube-proxy', body: 'kubelet 在 Node 上拉镜像/起 Pod；kube-proxy 维护 Service IPVS/iptables 规则。' },
          { title: '声明式 API', body: '"我要 3 副本"，控制器自动协调到目标态；与命令式（"启动一个进程"）的区别决定运维方式。' },
          { title: '托管 K8s 与自建', body: '自建运维 etcd/证书/升级痛苦；火山引擎 VKE 提供托管控制面，SLA 99.95%，控制面不收费。' }
        ]
      },
      {
        title: '四、十大资源对象',
        keypoints: [
          { title: 'Pod', body: '最小调度单元，1 个或多个共享网络/存储的容器；通常 1 主容器 + 多个 sidecar。' },
          { title: 'ReplicaSet / Deployment', body: 'Deployment 管 RS、RS 管 Pod；支持滚动升级、回滚、暂停发布。' },
          { title: 'StatefulSet', body: '为有状态应用提供稳定网络名+存储，如数据库、ZK 集群；Pod 名 web-0/web-1 不变。' },
          { title: 'DaemonSet', body: '每节点一个，常用于日志收集（filebeat）、监控（node_exporter）、CSI/CNI 守护。' },
          { title: 'Service / Ingress', body: 'Service 内部 LB，Ingress 七层入口（如 Nginx/Traefik）；Ingress + cert-manager 自动签 HTTPS 证书。' },
          { title: 'ConfigMap / Secret', body: '配置/密钥外部化；Secret 默认仅 base64，生产建议结合 KMS / Vault。' },
          { title: 'Job / CronJob', body: '批处理任务/定时任务；适合数据清理、报表生成。' }
        ]
      },
      {
        title: '五、K8s 网络与存储',
        keypoints: [
          { title: 'CNI 容器网络接口', body: '插件化网络方案，常见 Flannel（简单 VXLAN）、Calico（BGP 高性能）、Cilium（eBPF 新一代）。' },
          { title: 'NetworkPolicy', body: '声明式 Pod 防火墙，按 Label 互通；零信任网络的关键能力。' },
          { title: 'Service 类型', body: 'ClusterIP（内部）、NodePort（节点暴露端口）、LoadBalancer（云上自动建 SLB）、ExternalName（DNS CNAME）。' },
          { title: 'CSI 容器存储接口', body: '统一存储驱动标准；火山引擎 EBS/NAS/TOS 都有 CSI 插件，PV/PVC 动态供给。' },
          { title: 'PV / PVC / StorageClass', body: 'PV 是集群存储资源、PVC 是 Pod 申请、SC 模板自动创建 PV；StatefulSet 必配。' }
        ]
      },
      {
        title: '六、自动伸缩',
        keypoints: [
          { title: 'HPA 水平 Pod 自动伸缩', body: '按 CPU/内存/自定义指标自动增减 Pod 副本；指标响应 30 秒-2 分钟。' },
          { title: 'VPA 垂直伸缩', body: '动态调整单 Pod 的 CPU/Memory request；与 HPA 不能混用同一指标。' },
          { title: 'CA 集群自动伸缩', body: '节点不够时自动加 ECS、空闲时下线；配合 Spot 抢占式可省 50-70% 计算费。' },
          { title: 'KEDA 事件驱动伸缩', body: '按 Kafka 消息堆积、队列长度等业务指标伸缩；Serverless 风格的容器扩缩容。' }
        ]
      },
      {
        title: '七、Service Mesh',
        keypoints: [
          { title: '为什么需要 Mesh', body: '微服务多了之后，限流/重试/灰度/链路加密在每个应用重复实现成本高；Mesh 把这些下沉到 sidecar。' },
          { title: 'Istio + Envoy', body: 'Istio 是控制面，Envoy 是 sidecar 数据面；流量、安全、可观测三大能力。' },
          { title: '流量管理', body: 'VirtualService 定义路由规则，DestinationRule 定义子集；可做按 Header/百分比的金丝雀发布。' },
          { title: 'mTLS 双向认证', body: '服务间自动加密+认证，零信任落地的关键；性能损耗 5-10%。' },
          { title: '可观测', body: 'Mesh 自动产出 metrics（Prometheus）、链路（Jaeger）、日志，无需应用埋点。' }
        ]
      },
      {
        title: '八、CI/CD 与 GitOps',
        keypoints: [
          { title: 'CI 持续集成', body: '代码 push → 自动构建+单测+静态扫描；常用 Jenkins、GitLab CI、GitHub Actions、火山引擎 CodePipeline。' },
          { title: 'CD 持续交付/部署', body: '交付（手动审批后发布）vs 部署（自动到生产）；金融常停在交付，互联网走到部署。' },
          { title: 'GitOps 理念', body: '生产状态完全声明在 Git，变更靠 PR + 自动同步；Argo CD / Flux 是工具代表。' },
          { title: '镜像扫描', body: 'Trivy / Clair 扫 CVE；上线前阻断高危漏洞，是云原生 DevSecOps 必备。' },
          { title: '蓝绿/金丝雀/滚动', body: '蓝绿全量切（最快回滚）；金丝雀按比例放量（最稳）；滚动逐 Pod 替换（最平滑）。' }
        ]
      }
    ],
    terms: ['Docker', 'Image', 'Pod', 'Deployment', 'StatefulSet', 'Service', 'Ingress', 'CNI', 'CSI', 'HPA', 'CA', 'Istio', 'Envoy', 'mTLS', 'GitOps', 'Argo CD', 'Trivy'],
    sellingPoint: '客户说"我们还在用虚拟机部署"时，不要直接劝 K8s。先帮他算一笔账：① 当前每月发布几次？② 单次发布回滚要多久？③ 节假日扩容是否手工？再用"3 个月试点 1 个非核心应用上 VKE"切入，量化指标：发布频率从月级→周级、回滚时间从小时→分钟、扩缩容自动化。客户愿意为"少加班"买单，比为"先进架构"买单容易。',
    caseStudy: {
      scenario: '某 SaaS 公司 60+ 微服务跑在 ECS 上，部署靠手工 + Ansible，发布常出错；新人上手要 2 周；峰值 3 倍流量靠值班手动加机器。',
      solution: '搬到火山引擎 VKE，配 Argo CD 做 GitOps，Helm Chart 管模板；Cluster Autoscaler + HPA 做弹性；Istio 做灰度发布；veCR 做镜像仓库 + Trivy 扫描。',
      value: '发布频率从每周 2 次升到每天 10+ 次；回滚从 30 分钟降到 1 分钟；扩缩容全自动，节假日值班解放；总 ECS 成本下降 28%。'
    },
    commonPitfalls: [
      '直接上 K8s 不上可观测：故障定位时间反而比虚拟机长',
      'StatefulSet 跑无状态应用：浪费 PV、调度复杂',
      '镜像里硬编码密码：被推到公共仓库，2 小时内被扫'
    ]
  },

  {
    day: 6,
    videoQueries: ['云安全 等保 2.0', '零信任 SASE 架构', 'WAF 防御 教程'],
    stage: 's1',
    title: '云安全与合规（IAM / 零信任 / WAF / 等保 / 信创）',
    summary: '责任共担、IAM 权限、网络/数据/主机安全、零信任与合规体系',
    duration: '约 105 分钟',
    objectives: [
      '理解云上责任共担模型与 IAM 最小权限原则',
      '掌握数据安全的加密/脱敏/分类分级框架',
      '熟悉 WAF / DDoS 高防 / 堡垒机等网络与主机安全产品',
      '理解零信任架构（BeyondCorp/SASE）的工程化落地',
      '掌握等保 2.0、ISO 27001、GDPR、信创等关键合规要求'
    ],
    sections: [
      {
        title: '一、责任共担模型',
        keypoints: [
          { title: '云厂商负责"云安全"', body: '物理机房、虚拟化层、骨干网、平台 SLA；可信第三方审计（如 SOC 2、ISO 27001）。' },
          { title: '客户负责"云上安全"', body: 'IAM 配置、应用代码、数据加密、补丁、合规配置；80% 的云上事故源于客户配置失误。' },
          { title: '不同服务模型边界', body: 'IaaS 客户管 OS 及以上；PaaS 厂商管到中间件；SaaS 厂商几乎全包。' },
          { title: '配置错误案例', body: '对象存储桶设置为公共读 → 数据泄漏；安全组 0.0.0.0/0:22 → SSH 被爆破；这些不是云的锅。' }
        ]
      },
      {
        title: '二、IAM 身份与权限',
        keypoints: [
          { title: '主账号 / 子账号 / 角色', body: '主账号是根账号、不应日常使用；子账号给个人；角色给应用/服务调用，临时凭证更安全。' },
          { title: 'MFA 多因子认证', body: '密码 + 手机/硬件 Token；主账号、特权子账号必开；防止凭证泄漏后被直接登录。' },
          { title: '权限策略 Policy', body: 'JSON 描述"谁可以对什么资源做什么操作"；推荐基于 Tag 的 ABAC 而非 RBAC。' },
          { title: '最小权限原则', body: '只给完成工作所需最小权限；定期审视未使用权限并回收，火山引擎 IAM 支持权限分析报表。' },
          { title: 'STS 临时凭证', body: '短期有效（15 分钟-12 小时），自动过期；适合移动端、第三方接入、跨账号访问。' }
        ]
      },
      {
        title: '三、数据安全',
        keypoints: [
          { title: '分类分级', body: '"公开/内部/敏感/机密"四级；个人信息单列；按级别决定加密、脱敏、留存策略。' },
          { title: '传输加密', body: '强制 HTTPS/TLS 1.2+；内部服务调用走 mTLS 或专线；老系统 Telnet/FTP 必须淘汰。' },
          { title: '静态加密', body: '存储/数据库默认 SSE-KMS；性能损耗 <3%，金融/医疗强制开启。' },
          { title: '数据脱敏', body: '生产→测试环境复制时按字段脱敏（手机号→138****1234），避免内部泄漏。' },
          { title: 'DLP 数据防泄漏', body: '基于内容识别+流量监控，防止机密文档外发；火山引擎数据安全中心提供。' }
        ]
      },
      {
        title: '四、网络安全',
        keypoints: [
          { title: 'WAF Web 应用防火墙', body: '防 OWASP Top 10（SQL 注入、XSS、命令注入等）；按域名/规则计费，电商/SaaS 必备。' },
          { title: 'DDoS 高防', body: '抗百 Gbps-Tbps 级洪泛攻击；分基础（免费 5 Gbps）+ 高防（按防御带宽收费）。' },
          { title: '堡垒机', body: '运维统一入口，所有 SSH/RDP 必须经过它，操作录像可审计；等保 2.0 必备。' },
          { title: 'API 网关 + 限流', body: '统一鉴权、限流、监控；防止刷接口/爬虫/DDoS 应用层攻击。' }
        ]
      },
      {
        title: '五、主机与端点安全',
        keypoints: [
          { title: 'HIDS 主机入侵检测', body: '在 ECS 上跑 Agent，检测异常进程/反弹 shell/挖矿；火山引擎主机安全 7×24 自动响应。' },
          { title: '漏洞扫描', body: '定期扫 CVE、配置基线；高危漏洞 24 小时内修复；上线前阻断式扫描。' },
          { title: '基线核查', body: '按 CIS Benchmark 检查 OS/中间件配置（如 SSH 禁 root 直连）；自动修复脚本化。' },
          { title: '防勒索备份', body: '关键数据快照异地副本+不可变（WORM）+ 离线归档；勒索病毒近年增长 200%+。' }
        ]
      },
      {
        title: '六、零信任架构',
        keypoints: [
          { title: '为什么传统边界失效', body: '远程办公、SaaS、混合云让"内网=可信"假设不成立；2020 后 BeyondCorp 模型成为新标准。' },
          { title: 'BeyondCorp / SDP / SASE', body: 'BeyondCorp 是理念（Google 提出）；SDP 是软件定义边界；SASE 是 Gartner 提出的网络+安全融合架构。' },
          { title: '核心原则', body: '"永不信任、始终验证"——每次访问都鉴权（身份+设备+上下文），不预设网络信任。' },
          { title: '工程要点', body: 'IAM + MDM 设备管理 + 单点登录 + 多因子 + 流量加密 + 持续行为分析；分阶段落地 12-24 个月。' }
        ]
      },
      {
        title: '七、合规体系',
        keypoints: [
          { title: '等保 2.0', body: '中国关键信息基础设施合规底线；分一/二/三/四级，互联网公司多走三级；含安全管理 + 技术 10 余类。' },
          { title: 'ISO 27001 / SOC 2', body: '国际信息安全管理体系；面向海外客户/IPO 准备的常规要求。' },
          { title: 'GDPR / CCPA', body: '欧盟通用数据保护条例 / 加州消费者隐私法；最高罚款全球营收 4%；跨境业务必看。' },
          { title: '《数据安全法》《个人信息保护法》', body: '中国"两法"，关键数据出境需安全评估；金融、医疗、政务尤为严格。' },
          { title: '信创合规', body: '党政、金融、能源等关键行业要求采用国产 CPU/OS/数据库/中间件；火山引擎信创云已覆盖鲲鹏/海光/麒麟。' }
        ]
      },
      {
        title: '八、安全运营 SOC',
        keypoints: [
          { title: 'SOC 安全运营中心', body: '7×24 监控、响应、复盘；中型企业自建 5-10 人团队，小公司常采购托管 MSSP。' },
          { title: 'SIEM 日志聚合分析', body: 'Splunk/Elastic/火山引擎 TLS 把分散日志汇总，UEBA 行为分析检测内部威胁。' },
          { title: 'SOAR 自动化响应', body: '安全事件触发剧本（Playbook）：自动隔离主机/封 IP/通知；将平均响应时间从小时降到分钟。' },
          { title: '红蓝对抗', body: '定期攻防演练，红队模拟真实攻击、蓝队防守；典型行业每年 1-4 次。' }
        ]
      }
    ],
    terms: ['IAM', 'MFA', 'STS', 'KMS', 'WAF', 'DDoS 高防', '堡垒机', 'HIDS', '等保 2.0', 'ISO 27001', 'GDPR', '零信任', 'SDP', 'SASE', 'SOC', 'SIEM', 'SOAR', '信创'],
    sellingPoint: '安全是售前最容易踩雷的话题——客户问"够不够安全"，技术答"我们有 WAF/DDoS/IAM"是错误打开方式。正确做法是先讲"责任共担"——明确云厂商和客户各担什么；再讲"分层防御"——边界（DDoS+WAF）→ 入口（API 网关）→ 主机（HIDS）→ 数据（KMS+脱敏）→ 身份（IAM+零信任）；最后讲合规对照（等保几级、是否信创）。客户听到的是"全景图"，安全感来自结构而非产品罗列。',
    caseStudy: {
      scenario: '某金融客户即将上线手机银行，监管要求等保三级 + 国密 + 数据不出境；安全团队 3 人，时间 6 个月。',
      solution: '使用火山引擎金融云 + 信创基座；接入 DDoS 高防 + WAF + API 网关 + 堡垒机；KMS 国密 SM4 加密；IAM + MFA + 角色化授权；TLS 日志归档 6 个月+；SOC 与火山安全托管。',
      value: '6 个月通过等保三级测评；安全事件平均响应时间 30 分钟；监管合规一次过审，节省合规整改 2 轮约 800 万。'
    },
    commonPitfalls: [
      'IAM 全员 AdministratorAccess：方便但出事就是大事',
      '只买 WAF 不调规则：开默认模板拦不住业务定制攻击',
      '日志不外送：勒索/被攻击后日志被加密 → 无法溯源'
    ]
  },

  {
    day: 7,
    videoQueries: ['上云迁移 6R 策略', 'TCO 计算 教程', 'SRE 站点可靠性 入门'],
    stage: 's1',
    title: '上云迁移与可观测性（6R / TCO / SLI/SLO / OTel）',
    summary: '迁移评估、TCO/ROI 模型、监控/日志/链路三大支柱、SRE 实践',
    duration: '约 115 分钟',
    objectives: [
      '掌握上云驱动力与价值的客户化表达',
      '能进行迁移评估、6R 决策、风险识别',
      '能搭建 TCO 模型并算出 ROI',
      '理解可观测三大支柱（Metrics/Logs/Traces）与 OpenTelemetry 标准',
      '熟悉 SRE 的 SLI / SLO / SLA / 错误预算与混沌工程'
    ],
    sections: [
      {
        title: '一、上云的五大价值',
        keypoints: [
          { title: '降本', body: 'OpEx 替代 CapEx，按使用付费；Right-sizing 后通常省 20-40% 总 IT 支出。' },
          { title: '提效', body: '资源开通从周级到分钟级；研发联调环境一键拉起；上线频率 5-10 倍提升。' },
          { title: '弹性', body: '应对秒杀、直播、大促等突发流量，扩容自动化；自建机房不可能做到。' },
          { title: '可靠', body: '云厂商 SLA 99.95-99.99%，背后是跨 AZ 冗余 + 7×24 SRE 团队。' },
          { title: '创新', body: '直接调用大模型/数据湖/视频云等高级能力，不必从零造轮子；这是云最被低估的价值。' }
        ]
      },
      {
        title: '二、迁移评估',
        keypoints: [
          { title: '应用画像', body: '收集 200+ 维度：CPU/内存/磁盘/网络、依赖、版本、合规、SLA、所有者；通常用 CMDB+扫描工具。' },
          { title: '依赖梳理', body: '画依赖图：应用→中间件→数据库→外部 API；分层迁移避免"切了 A 发现 B 还连旧 IP"。' },
          { title: '风险识别', body: '老硬件依赖（HSM/USB Key）、复杂存储过程、未维护代码；这些是 6R 决策的关键变量。' },
          { title: '试点选择', body: '先选"非核心+开发活跃+依赖少"的应用做试点；3 个试点跑通后全面铺开。' }
        ]
      },
      {
        title: '三、6R 决策树',
        keypoints: [
          { title: '判断顺序', body: '先问"还要不要"（Retire/Retain）→ 再问"换 SaaS 行不行"（Repurchase）→ 最后才在 Rehost/Replatform/Refactor 中选。' },
          { title: '迁移工具栈', body: '火山引擎 MgC（迁移中心）、阿里 ADAM、AWS Migration Hub；自动评估+生成方案。' },
          { title: '波次规划', body: '通常 12-24 个月分 4-6 波，每波 20-50 个应用，留 1 月稳定+复盘。' },
          { title: '回切预案', body: '前 30 天保留旧环境数据同步通道，可一键回切；金融客户尤其要求。' }
        ]
      },
      {
        title: '四、TCO 模型与 ROI',
        keypoints: [
          { title: 'TCO 五大科目', body: '硬件折旧 + 机房（电力/制冷/带宽）+ 软件许可 + 人员 + 隐性成本（停机/机会成本）；3-5 年视角对比。' },
          { title: '云上 TCO 计算', body: '计算（ECS+包年）+ 存储（Standard/IA）+ 网络（公网带宽）+ 数据库 + 备份 + 安全；结合 Right-sizing。' },
          { title: 'ROI 公式', body: '(收益 - 投入) / 投入 × 100%；上云收益除了直接降本，要算"提速带来的业务收入"——这部分常被忽略。' },
          { title: '非财务收益', body: '上线速度、招聘吸引力、合规通过率、客户体验；客户看到的是"为业务赋能"，不只是省钱。' }
        ]
      },
      {
        title: '五、可观测三大支柱',
        keypoints: [
          { title: 'Metrics 指标', body: '数值时间序列，如 CPU/QPS/RT；Prometheus 是事实标准，火山引擎 VMP 提供托管。' },
          { title: 'Logs 日志', body: '文本事件，如错误堆栈、审计；ELK / Loki / 火山 TLS 是常见栈。' },
          { title: 'Traces 链路', body: '分布式调用链路，定位"慢在哪一跳"；Jaeger / Zipkin / 火山 APM 支持。' },
          { title: 'OpenTelemetry', body: 'CNCF 项目，统一三大支柱的 SDK 与协议；新项目应直接用 OTel，避免厂商锁定。' },
          { title: 'USE / RED 方法论', body: 'USE（Utilization/Saturation/Errors）看资源；RED（Rate/Errors/Duration）看服务；两套互补。' }
        ]
      },
      {
        title: '六、APM 与 AIOps',
        keypoints: [
          { title: 'APM 应用性能管理', body: '探针自动采集 JVM/方法栈/SQL；定位慢请求、内存泄漏；DataDog、火山 APM 是代表。' },
          { title: '前端监控 RUM', body: '采集真实用户体验：白屏时间、JS 错误、API 失败率；与后端 APM 关联可端到端分析。' },
          { title: 'AIOps', body: '基于 ML 的异常检测、根因分析、容量预测；告警从"千条"压到"十条"。' },
          { title: '统一可观测平台', body: '把 Metrics/Logs/Traces+RUM/APM/告警整合，一个面板排障；这是 2024+ 行业方向。' }
        ]
      },
      {
        title: '七、SRE 实践',
        keypoints: [
          { title: 'SLI / SLO / SLA', body: 'SLI 是"测什么"（如成功率），SLO 是"目标"（如 99.9%），SLA 是"对客户的承诺+赔付"（如赔 10%）。' },
          { title: '错误预算', body: '100% - SLO = 允许出错的预算（如月 43 分钟）；预算用完就停发布、专注稳定性。' },
          { title: '黄金信号', body: '延迟、流量、错误、饱和度（Latency/Traffic/Errors/Saturation）；任何服务先做这四个监控。' },
          { title: '混沌工程', body: '主动注入故障（杀 Pod、断网、CPU 打满）验证韧性；Netflix Chaos Monkey 是开端。' },
          { title: '事后复盘 Postmortem', body: '不追责、追根因；问"5 个为什么"，输出可落地行动项；建立组织级学习机制。' }
        ]
      },
      {
        title: '八、上云组织能力建设',
        keypoints: [
          { title: '成立云卓越中心 CCoE', body: 'Cloud Center of Excellence，跨研发/运维/安全/财务的虚拟组织，统一架构、规范、培训。' },
          { title: '人才升级', body: '传统 SA → 云架构师；DBA → 数据工程师；运维 → SRE；通常需 6-12 个月外训+实战。' },
          { title: 'FinOps 治理', body: '建立账单可视、Right-sizing、Reserved/Savings 复购流程；通常运营 6 个月后省 15-25%。' },
          { title: '安全治理嵌入', body: 'DevSecOps：CI 流水线集成镜像扫描/依赖扫描；事后修复→事中阻断。' }
        ]
      }
    ],
    terms: ['6R', 'TCO', 'ROI', 'CMDB', 'MgC', 'Metrics', 'Logs', 'Traces', 'OpenTelemetry', 'USE/RED', 'APM', 'RUM', 'AIOps', 'SLI', 'SLO', 'SLA', '错误预算', '混沌工程', 'CCoE', 'FinOps'],
    sellingPoint: 'TCO 是售前的"必杀技"，但用错就是"催命符"。三个原则：① 不要用刊例价直接对比 IDC，要算同等可用性下的总成本（IDC 99% vs 云 99.95%差很多）；② 把"提速带来的业务增量"算进收益侧，可信案例是关键；③ 给客户做的 TCO 表必须用客户的实际负载，不是云厂商模板。客户看到"按你们 2024 年实际数据测算"和"按行业平均测算"是两种感受。',
    caseStudy: {
      scenario: '某连锁餐饮 IT 总监被 CEO 要求"3 个月内给上云方案+ROI"；自建 6 个机房、200 台服务器、3 套 ERP/POS/会员；运维 8 人。',
      solution: 'Day 1-30 用火山引擎 MgC 全量评估出 6R 比例（Retain 15% / Replatform 60% / Refactor 25%）；Day 31-60 做 5 个非核心试点；Day 61-90 输出 TCO 表（5 年节省 1800 万）+ 业务价值（新店上线时间从 30 天到 5 天）。',
      value: '方案一次过会；试点 3 个月跑通；后续 18 个月完成 80% 应用上云，年 IT 成本降 32%，新店上线提速 6 倍。'
    },
    commonPitfalls: [
      '"先迁完再说"：没做应用画像，迁后才发现某老系统离不开旧机房 USB Key',
      '只看降本忘了治理：上完云没建 FinOps，1 年后账单失控',
      'SLO 拍脑袋：99.999% 听起来美好，按实际架构根本做不到 → 永远超预算'
    ]
  },

  // ============ 阶段二：火山引擎产品矩阵（Day 8-11） ============
  {
    day: 8,
    videoQueries: ['火山引擎 入门', 'ECS 弹性云服务器 教程', 'VKE Kubernetes 火山'],
    stage: 's2',
    title: '火山引擎概览与计算（ECS / VKE / veFaaS / 异构）',
    summary: '火山引擎全景、ECS 规格族详解、VKE 容器、Serverless、异构 GPU 算力',
    duration: '约 110 分钟',
    objectives: [
      '掌握火山引擎全景架构与差异化定位',
      '熟悉 ECS 规格族（通用/计算/内存/GPU/裸金属）选型逻辑',
      '掌握 VKE 容器服务核心特性与定价',
      '理解 veFaaS Serverless 的事件触发模型与适用场景',
      '了解异构计算（GPU/弹性裸金属）的应用'
    ],
    sections: [
      {
        title: '一、火山引擎概览',
        keypoints: [
          { title: '业务定位', body: '字节跳动旗下 ToB 云服务品牌，2020 年 6 月发布；定位"原生 AI + 字节同款基础设施"。' },
          { title: '"字节同款"含义', body: '抖音、今日头条、TikTok 等亿级应用所用的推荐、视频、ByteHouse、KubeWharf 等技术对外输出。' },
          { title: '产品全景', body: '九大产品族：计算、存储、网络、数据库、容器、AI（豆包/方舟/Coze）、视频云、安全、行业解决方案。' },
          { title: 'Region 与可用区', body: '截至 2025 年覆盖华北/华东/华南国内多 region + 海外（新加坡/硅谷等），多 AZ 部署。' },
          { title: '行业云形态', body: '汽车云、金融云、政务云、教育云等专属云形态，提供合规基座+行业模板。' }
        ]
      },
      {
        title: '二、ECS 弹性云服务器',
        keypoints: [
          { title: '通用型', body: 'g 系列，CPU:Mem = 1:4，适合 Web、应用服务器、中型数据库；最常用规格。' },
          { title: '计算型', body: 'c 系列，CPU:Mem = 1:2，频率高，适合批处理、视频转码、科学计算。' },
          { title: '内存型', body: 'r 系列，CPU:Mem = 1:8，适合大型数据库、Redis/MC 缓存、ELK。' },
          { title: 'GPU 异构', body: 'g 系列（推理）/ p 系列（训练）；A100/H100/L20 等多代 GPU；按卡时计费。' },
          { title: '裸金属', body: '物理机性能 + 云的弹性，无虚拟化损耗；适合极致性能（核心数据库、HPC）或合规要求物理隔离。' },
          { title: '本地盘机型', body: 'i 系列自带 NVMe，IOPS 百万级；适合高性能 NoSQL、时序库（如 Druid、ClickHouse）。' }
        ]
      },
      {
        title: '三、ECS 选型与计费',
        keypoints: [
          { title: '规格选择三步法', body: '看 CPU 核数（按峰值 70-80% 设计）→ 配比内存（按业务画像）→ 选磁盘 PL 等级；遗忘第三步是常见错误。' },
          { title: '计费模式', body: '按量、包年包月、抢占式实例、资源包；混合使用：核心包月 + 弹性按量 + 离线 Spot。' },
          { title: 'Right-sizing', body: '通过监控 CPU/Mem 实际利用率定期调规格；通常 30-40% ECS 可降一档，节省 20%+。' },
          { title: '可用区分布', body: '关键业务跨 2-3 个 AZ 部署；通过 SLB 把流量打散，单 AZ 故障无感知。' }
        ]
      },
      {
        title: '四、VKE 容器服务',
        keypoints: [
          { title: 'VKE 是什么', body: 'Volcanic Kubernetes Engine，托管 K8s；控制面免费 + 标准 K8s 兼容性，支持 1.24-1.30 多版本。' },
          { title: '托管节点池 vs Serverless 容器', body: '托管节点池由你买 ECS 跑 Pod；Serverless（VCI）按 Pod 用量付费、秒级启动；混合用最划算。' },
          { title: '集成能力', body: '原生集成 CLB、TOS、EBS、CR 镜像仓库、APM、TLS 日志、ASM 服务网格；开箱即用一套云原生栈。' },
          { title: '弹性能力', body: 'CA + HPA 内置；veFaaS-K 可结合 KEDA 做事件驱动伸缩；分钟级千 Pod。' },
          { title: 'GPU 容器', body: '原生支持 GPU Pod 调度，按卡时按使用计费；支持 MIG（A100 切 7 份）共享。' }
        ]
      },
      {
        title: '五、veFaaS 函数计算',
        keypoints: [
          { title: '事件源', body: 'API 网关、TOS（文件上传）、定时器、Kafka、消息队列；事件触发执行函数。' },
          { title: '运行时', body: '支持 Python/Node.js/Go/Java/.NET 主流语言；冷启动通常 100-300ms，预留实例可降到毫秒。' },
          { title: '计费', body: '按调用次数 + 运行时长（GB·秒），免费额度足以覆盖小型 API；闲时零成本。' },
          { title: '典型场景', body: '图片/视频转码、IoT 上报处理、Webhook、轻量 API；不适合长时计算、有状态服务。' },
          { title: '与容器对比', body: 'FaaS 极致弹性零运维但限制多；容器灵活但需运维；按业务"突发性 + 状态" 选。' }
        ]
      },
      {
        title: '六、异构与算力',
        keypoints: [
          { title: '智算中心', body: '为大模型训练/推理打造的高性能集群，含 GPU + InfiniBand + 并行存储；万卡级规模。' },
          { title: '弹性 GPU', body: '按卡时租用 A100/H100/L20；支持容器、ECS、Spot 多种交付。' },
          { title: '推理优化', body: '与 vLLM/TensorRT-LLM 集成，吞吐提升 3-5x；火山方舟提供托管推理服务。' },
          { title: 'FPGA / ASIC', body: 'FPGA 适合视频编解码、加密；ASIC（如自研推理芯片）按场景定制。' }
        ]
      },
      {
        title: '七、私有/专有部署',
        keypoints: [
          { title: '专有云 Stack', body: '一体化软硬件交付，适合金融/政务客户机房；功能与公有云对齐 80%+。' },
          { title: '混合云一致体验', body: '同一套 API/控制台/工具链，公有/专有云统一管理；典型用 KubeWharf 跨集群编排。' },
          { title: '边缘计算', body: 'ECS Edge / Edge Stack 部署到客户站点（门店、工厂），毫秒级低延迟；与中心云协同。' }
        ]
      },
      {
        title: '八、上手与工具链',
        keypoints: [
          { title: 'Web 控制台', body: '资源开通、监控、计费一站式；支持 RAM 多账号、API 审计。' },
          { title: 'OpenAPI / SDK', body: '官方 SDK 支持 Python/Go/Java/Node 等；CI/CD 集成 IaC 必备。' },
          { title: 'Terraform Provider', body: '官方 volcengine 提供商，把基础设施声明在代码；GitOps 风格运维标配。' },
          { title: '迁移工具 MgC', body: '一站式迁移评估+实施工具，支持 P2V、V2V、应用迁移、数据库迁移。' }
        ]
      }
    ],
    terms: ['ECS', 'VKE', 'VCI', 'veFaaS', 'CLB', 'CR', 'A100', 'H100', 'MIG', 'InfiniBand', 'Right-sizing', 'KubeWharf', 'Edge Stack', 'Terraform', 'MgC'],
    sellingPoint: '客户问"火山引擎和阿里云/华为云有什么不同"时，最忌罗列产品。三句话答："① 字节同款——抖音、TikTok 实际跑出来的基础设施和算法直接对外；② 原生 AI——豆包+方舟+Coze 一体，企业不用拼装；③ 视频云第一阵营——直播、点播、RTC 体验最直接受益于字节业务沉淀。客户问哪个更便宜不如先确定他真正在意什么。"',
    caseStudy: {
      scenario: '某新能源车企智驾团队需要 200 张 A100 训练自动驾驶大模型，自建机房交付要 6 个月，预算紧张。',
      solution: '上火山引擎智算中心，包年 200 卡 + 弹性 50 卡 Spot 应对突增；用 vePFS 提供 100 GB/s 训练数据吞吐；veMLP 做训练任务调度；与 ECS 裸金属一致 InfiniBand 网络。',
      value: '从签约到 200 卡可用 5 工作日；训练任务排队时间从天级降到小时级；模型迭代周期缩短 50%。'
    },
    commonPitfalls: [
      'GPU 按卡选错代次：用 V100 跑 70B 模型 → 显存不够、训练失败',
      'VKE 控制面到处暴露：API Server 公网开启 → 被扫到立刻被攻击',
      'FaaS 跑长任务：单次 15 分钟超时 → 任务断在中间'
    ]
  },

  {
    day: 9,
    videoQueries: ['对象存储 TOS 教程', 'ByteHouse OLAP 教程', 'veDB MySQL'],
    stage: 's2',
    title: '火山引擎存储与网络（TOS / EBS / CDN / DCDN / VPC）',
    summary: '对象存储 TOS、块存储 EBS、CDN、DCDN、VPC/SLB 详细产品参数',
    duration: '约 105 分钟',
    objectives: [
      '掌握 TOS 对象存储核心特性、定价、生命周期',
      '理解 EBS 云盘性能等级与备份方案',
      '熟悉火山引擎 CDN/DCDN 的网络规模与适用场景',
      '掌握 VPC、SLB、Anycast EIP 等网络产品的关键参数',
      '能根据客户业务匹配合适的存储与网络组合'
    ],
    sections: [
      {
        title: '一、TOS 对象存储',
        keypoints: [
          { title: '基本能力', body: '兼容 S3 API；单桶 EB 级容量；多 AZ 副本，11 个 9 数据可靠性；千万 QPS。' },
          { title: '存储类别', body: 'Standard / IA（低频）/ Archive / Deep Archive 四档；按生命周期自动转换可省 50%+。' },
          { title: '冷数据归档优惠', body: 'Deep Archive 单价仅 Standard 的 1/10；适合 1 年+ 合规留存。' },
          { title: '加速能力', body: '内置 CDN 加速静态资源；可与 DCDN 联动做全球分发。' },
          { title: '安全', body: '桶 ACL + Bucket Policy + 签名 URL；服务端 KMS 加密；流量日志可输出 TLS。' }
        ]
      },
      {
        title: '二、EBS 块存储',
        keypoints: [
          { title: 'PL 性能等级', body: 'PL0/PL1/PL2/PL3 性能逐级；PL3 单盘 IOPS 100 万、吞吐 4 GB/s、延迟 0.2ms。' },
          { title: '快照', body: '增量快照、秒级触发；支持自动策略与跨 region 复制；数据库备份基石。' },
          { title: '加密', body: '默认 KMS 加密，可指定 CMK；性能损耗 <3%。' },
          { title: '扩容', body: '在线扩容（不停机），文件系统层用 resize2fs/xfs_growfs 配合；缩容需要重建。' }
        ]
      },
      {
        title: '三、文件存储',
        keypoints: [
          { title: 'NAS', body: '通用型（NFS/SMB），适合企业网盘、CMS、应用共享；按容量计费。' },
          { title: 'vePFS 并行文件系统', body: '为 AI/HPC 设计，单文件系统 100 GB/s 吞吐；配合 GPU 集群千卡训练。' },
          { title: 'CFS 极速版', body: '全闪 NAS，IOPS 30 万+，毫秒级延迟；中型 ML/视频生产场景。' }
        ]
      },
      {
        title: '四、CDN 与 DCDN',
        keypoints: [
          { title: 'CDN 节点规模', body: '国内 1500+ 节点，覆盖 31 省；境外 80+ 节点；支持 100 Tbps+ 带宽峰值。' },
          { title: '静态加速', body: '图片、JS/CSS、视频文件等；命中率 90%+ 时回源带宽降低 10x。' },
          { title: 'DCDN 全站加速', body: '动态请求 + 静态加速一体；TCP 优化、智能选路；电商详情页、API 类业务首选。' },
          { title: '视频 CDN', body: '专为 HLS/DASH 切片优化；与 VOD/LSS 联动；首屏卡顿率行业领先。' },
          { title: '自定义日志投递', body: '5 分钟级到 TOS 或 TLS；可对接 BI 做用户行为分析。' }
        ]
      },
      {
        title: '五、VPC 与子网',
        keypoints: [
          { title: 'VPC 规模', body: '默认账号 5 个 VPC，每 VPC 24 个子网，每路由表 50 条；可工单扩展至上百。' },
          { title: '路由策略', body: '系统路由+自定义路由；支持指向 NAT、专线、VPN、对等连接、PrivateLink。' },
          { title: '私网连接 PrivateLink', body: '无需公网即可访问 SaaS 服务（如 ByteHouse、TLS）；攻击面降低、合规友好。' },
          { title: 'CEN 云企业网', body: '跨 region/账号 VPC 互联中心；星型拓扑替代 N×N。' }
        ]
      },
      {
        title: '六、负载均衡 CLB / NLB',
        keypoints: [
          { title: 'CLB 七层', body: '支持 HTTP/HTTPS/HTTP2/WebSocket，监听器+转发规则灵活；与 WAF 集成。' },
          { title: 'NLB 四层', body: '百万级 QPS、亚毫秒延迟；游戏、金融交易、IoT 长连接首选。' },
          { title: '健康检查', body: '支持 HTTP/TCP/UDP；2-60 秒间隔；连续失败次数可调。' },
          { title: '跨 AZ 多活', body: '默认部署多 AZ，单 AZ 故障自动切换；与 ECS 多 AZ 配合做高可用。' },
          { title: '会话保持', body: '基于 Cookie/源 IP；新架构推荐无状态化，把 Session 外置 Redis。' }
        ]
      },
      {
        title: '七、公网与混合云',
        keypoints: [
          { title: 'EIP', body: '弹性公网 IP，按 IP 占用 + 流量/带宽计费；可绑定 ECS/SLB/NAT/HAVIP。' },
          { title: 'Anycast EIP', body: '全球同 IP 多 POP 接入，海外用户加速 30-50%；游戏、外贸首选。' },
          { title: '专线 / VPN', body: '专线接入云 POP，延迟 <20ms；VPN 走公网加密，开通快、成本低。' },
          { title: 'SD-WAN', body: '智能选路连锁分支；融合 4G/5G/MPLS；多分支零售/制造常见。' }
        ]
      },
      {
        title: '八、安全防护',
        keypoints: [
          { title: 'DDoS 高防', body: '清洗能力 Tbps 级；分基础（免费 5 Gbps）+ 高防 IP（按防御带宽计费）。' },
          { title: 'WAF', body: '防 OWASP Top 10、CC 攻击、爬虫；支持自定义规则、Bot 管理；按域名/QPS 计费。' },
          { title: '云防火墙', body: '统一管控南北/东西流量；可视化规则；零信任基础设施一环。' },
          { title: 'Bot 管理', body: '防爬虫、抢券、薅羊毛；指纹识别 + 行为分析；电商必备。' }
        ]
      }
    ],
    terms: ['TOS', 'EBS', 'PL3', 'NAS', 'vePFS', 'CFS', 'CDN', 'DCDN', 'VPC', 'CEN', 'PrivateLink', 'CLB', 'NLB', 'EIP', 'Anycast', 'DDoS 高防', 'WAF'],
    sellingPoint: '存储/网络的客户对话最容易陷入"参数比对"。建议用"业务三联问"切入：① 业务对延迟敏感吗（毫秒/秒级）？② 数据热/冷比例大概是什么（30/70 还是 70/30）？③ 用户分布是国内/全国还是全球？答案出来后给一张分层架构图（边缘 CDN → 入口 SLB → 业务 VPC → 存储 TOS+EBS），单价讨论留到最后。客户记得住的是"图"，不是"PL3 单盘 100 万 IOPS"。',
    caseStudy: {
      scenario: '某图片社交 App 月活 800 万，UGC 图片 1.2 PB 累积，使用某友商对象存储，CDN 单月 80 万；但海外回源慢、新功能上线 CDN 配置复杂。',
      solution: '迁到 TOS（生命周期：30 天 Standard、180 天 IA、1 年后 Archive）；CDN 切到火山 DCDN，配置自动签 HTTPS + 智能压缩；海外用 Anycast EIP 加海外 POP。',
      value: '存储费降 35%，CDN 月费降 22%，海外加载时延降 40%；新功能 CDN 配置时间从 2 天到 30 分钟。'
    },
    commonPitfalls: [
      'TOS 桶忘开生命周期：1 年后存储费 4 倍预算',
      'CDN 缓存键带 Cookie：命中率从 90% 降到 30%',
      'NLB 健康检查 2 秒一次过敏：业务高峰期误剔除节点'
    ]
  },

  {
    day: 10,
    videoQueries: ['DataLeap 数据中台', 'ByteHouse 数仓 教程', '湖仓一体 Iceberg'],
    stage: 's2',
    title: '火山引擎数据库与大数据（veDB / ByteHouse / LAS / Kafka）',
    summary: 'veDB 系列、ByteHouse 实时分析、LAS 湖仓一体、消息队列与数据集成',
    duration: '约 115 分钟',
    objectives: [
      '掌握 veDB MySQL/PostgreSQL/Redis/MongoDB 关键能力与定价',
      '理解 ByteHouse 实时分析数据库的性能与典型场景',
      '掌握 LAS 湖仓一体平台的架构与价值',
      '熟悉 Kafka、消息队列、DataSail 数据集成产品',
      '能为典型业务做"数据库 + 数仓 + 数据集成"组合方案'
    ],
    sections: [
      {
        title: '一、veDB MySQL',
        keypoints: [
          { title: '架构', body: '基于共享存储的云原生 MySQL，计算与存储解耦；100% 兼容 MySQL 5.7/8.0。' },
          { title: '性能', body: '单实例最大 88 vCPU/710 GB；QPS 100 万级；单库可达数十 TB。' },
          { title: '高可用', body: '自动跨 AZ 高可用；秒级故障切换；存储多副本 RPO=0。' },
          { title: '弹性', body: '只读节点秒级扩缩容；支持 Serverless 弹性版按使用付费。' },
          { title: '迁移', body: 'DTS 工具支持自建 MySQL/Oracle/SQL Server → veDB 平滑迁移，停机分钟级。' }
        ]
      },
      {
        title: '二、veDB PostgreSQL & 其他',
        keypoints: [
          { title: 'veDB PostgreSQL', body: '兼容 PG 14+；适合 GIS、JSON、复杂查询；金融、政企国产化替代主选。' },
          { title: 'veDB for MongoDB', body: '兼容 MongoDB 4.x/5.x；适合内容、用户画像；分片集群可达数十亿文档。' },
          { title: 'veDB Redis', body: '兼容 Redis 5.x/6.x；主从、Cluster、读写分离；缓存、会话、排行榜。' },
          { title: 'veDB 时序版', body: '基于 InfluxDB 协议；IoT、监控指标场景；写入压缩比 10x。' }
        ]
      },
      {
        title: '三、ByteHouse 数据仓库',
        keypoints: [
          { title: '内核来源', body: '基于 ClickHouse 深度优化的字节内部数仓，每日处理万亿级行；2022 年外发。' },
          { title: '查询性能', body: '单节点亿行毫秒返回；千节点查询百亿行秒级；适合 BI、广告、推荐分析。' },
          { title: '存算分离', body: 'CDW 存算一体（性能极致）/ CSP 存算分离（成本最优）两种部署形态。' },
          { title: '实时入库', body: '与 Kafka 直连，秒级可查；支持 Upsert 实时更新。' },
          { title: '典型场景', body: '互联网用户行为分析、广告归因、风控、IoT 实时监控；TPS 10 万级写入+复杂聚合。' }
        ]
      },
      {
        title: '四、LAS 湖仓一体',
        keypoints: [
          { title: 'LAS 是什么', body: 'Lakehouse Analytics Service，基于 Apache Iceberg/Hudi 的湖仓一体平台；存储用 TOS。' },
          { title: '统一元数据', body: '一份数据多种引擎查询（Spark/Presto/Trino/ClickHouse），不重复 ETL。' },
          { title: 'ACID 事务', body: '湖上支持事务；可做 GDPR 删除、修正错误数据；传统数据湖做不到。' },
          { title: '成本对比', body: '相同数据量比传统数仓存储成本低 60%+，但查询性能比 ByteHouse 慢 3-5x；冷热分层组合最优。' }
        ]
      },
      {
        title: '五、消息队列',
        keypoints: [
          { title: '云原生 Kafka', body: '托管 Kafka，分钟级开通；支持自动伸缩、跨 AZ 高可用；TPS 百万级。' },
          { title: 'RocketMQ 兼容', body: '事务消息、定时消息；金融、电商下单等强一致场景。' },
          { title: 'BMQ 高吞吐', body: '字节自研，存算分离，万亿 TPS；推荐系统、日志采集场景。' }
        ]
      },
      {
        title: '六、数据集成 DataSail',
        keypoints: [
          { title: '功能定位', body: '一站式数据同步：MySQL/Oracle/Kafka/TOS 等 50+ 数据源互通；可视化任务编排。' },
          { title: '实时 + 离线', body: '支持 CDC 实时同步（毫秒延迟）+ 批量离线；用同一平台。' },
          { title: '与传统 ETL 区别', body: '不只搬数据，还能做轻量清洗、维度建模；与 LAS / ByteHouse 上下游打通。' }
        ]
      },
      {
        title: '七、AI + 数据：DataLeap / EMR',
        keypoints: [
          { title: 'DataLeap 数据开发治理', body: '数据地图、血缘、质量、权限一站式；中型企业 6-12 个月数据治理标配。' },
          { title: 'E-MapReduce', body: '托管 Hadoop/Spark/Flink/Presto/Hive；按任务弹性付费，不必长跑集群。' },
          { title: 'StarRocks 极速分析', body: '兼容 MySQL 协议、近实时分析；自助 BI 报表毫秒级。' }
        ]
      },
      {
        title: '八、典型数据架构',
        keypoints: [
          { title: '互联网"湖+仓"双轨', body: '原始日志进 LAS 湖；清洗+主题数据进 ByteHouse；报表 BI 直连 ByteHouse。' },
          { title: '金融"主备双中心"', body: 'veDB MySQL 主写、跨 AZ 副本；DTS 同步到异地灾备库；合规审计 TLS 全留档。' },
          { title: '物联网时序', body: '设备上报 → Kafka → veDB 时序版 + ByteHouse 实时分析；告警走 EventBridge。' },
          { title: '推荐系统', body: '行为日志 → BMQ → Flink 实时特征 → Redis；离线特征用 LAS+Spark；模型在方舟训练。' }
        ]
      }
    ],
    terms: ['veDB', 'ByteHouse', 'LAS', 'Iceberg', 'BMQ', 'Kafka', 'DataSail', 'DataLeap', 'EMR', 'StarRocks', 'CDC', 'OLTP', 'OLAP', 'HTAP'],
    sellingPoint: '数据类项目客户最关心三件事：① 已有数据如何无痛迁过来（DTS/DataSail 是关键）；② 上云后开发是否要重新培训（兼容性能不能保证）；③ 出问题谁来兜底（SLA + 7×24 支持）。售前的核心动作是："演示一次 1 亿行数据从 MySQL 到 ByteHouse 的实时同步 + 一条 SQL 5 秒返回"。眼见为实比 20 页 PPT 强 100 倍。',
    caseStudy: {
      scenario: '某电商平台每天 5 亿订单事件，自建 Hadoop+Hive 数仓，T+1 报表延迟，业务想要"小时级用户画像"和"实时大屏"，但传统架构无法支撑。',
      solution: '订单 MySQL → DataSail CDC → BMQ → ByteHouse 实时表；同时落 LAS 做明细存档。运营大屏直接查 ByteHouse，报表 5 秒级；用户画像通过 DataLeap 编排定时任务。',
      value: '报表延迟从 T+1 降到秒级；运营 A/B 测试效率提升 10x；总数据栈成本降 30%（相比自建 Hadoop+Kafka+OLAP 拼装）。'
    },
    commonPitfalls: [
      'ByteHouse 当 OLTP 用：明细更新场景写性能差，应该走 veDB',
      'LAS 没分区：单表 PB 级直接全表扫，查询小时级',
      'Kafka 消费组没备份：消费组 offset 丢 → 重复消费百亿条'
    ]
  },

  {
    day: 11,
    videoQueries: ['RTC 直播 推流', 'CDN 直播 教程', '短视频 推荐系统'],
    stage: 's2',
    title: '火山引擎视频云与音视频（VOD / LSS / RTC / 多媒体处理）',
    summary: '点播 VOD、直播 LSS、实时音视频 RTC、视频 AI 处理矩阵',
    duration: '约 100 分钟',
    objectives: [
      '掌握视频点播 VOD 的端到端工作流',
      '熟悉直播 LSS 的低延迟、互动、推流 SDK',
      '理解 RTC 实时音视频在会议、教育、社交的应用',
      '了解视频 AI 处理：超分、降噪、智能审核、自动剪辑',
      '能为不同视频业务匹配合适产品组合'
    ],
    sections: [
      {
        title: '一、视频云背景',
        keypoints: [
          { title: '字节系基础', body: '抖音、TikTok、西瓜视频日均处理百亿次播放；视频技术是火山引擎最强壁垒之一。' },
          { title: '行业格局', body: '视频云市场约 200 亿+，火山引擎份额 Top 3；与阿里云、腾讯云三足鼎立。' },
          { title: '客户类型', body: 'OTT/IPTV、短视频/直播平台、在线教育、企业会议、医疗远程；各自参数差异巨大。' },
          { title: '基础设施支撑', body: '依赖 CDN（边缘节点）、AI（智能处理）、存储（海量素材）、实时网络（低延迟）。' }
        ]
      },
      {
        title: '二、VOD 点播',
        keypoints: [
          { title: '工作流', body: '上传 → 转码 → 加密 → 分发 CDN → 播放 SDK；端到端托管，开发者无需自建。' },
          { title: '转码', body: '支持 H.264/H.265/AV1、HLS/DASH 切片；按分辨率/码率/编码自动适配；存算分离按需。' },
          { title: 'DRM 版权保护', body: '支持 Widevine/FairPlay/HLS AES；禁防录屏、限地域、限设备；版权方核心需求。' },
          { title: '智能字幕与翻译', body: 'ASR 语音转文字 + NMT 翻译，30+ 语种；TikTok 模式让内容跨地域分发。' },
          { title: '播放器 SDK', body: 'iOS/Android/Web/小程序全平台；自动选码率、断网续播、弹幕互动开箱即用。' }
        ]
      },
      {
        title: '三、LSS 直播',
        keypoints: [
          { title: '推流协议', body: 'RTMP（最广泛）、SRT（低延迟+丢包恢复）、QUIC（移动网络更稳）。' },
          { title: '播放协议', body: 'FLV（PC/H5）、HLS（兼容性最好）、LL-HLS（低延迟）、WebRTC（亚秒级）。' },
          { title: '延迟指标', body: '标准直播 3-5 秒、低延迟 1-2 秒、超低延迟 <500ms；电商直播带货必须 <1.5 秒。' },
          { title: '互动能力', body: '连麦 PK、礼物特效、弹幕、白板；与 RTC 联动做"边看边连麦"。' },
          { title: '智能转码与画质增强', body: '窄带高清 1.0/2.0：相同码率画质提升 30%+；流量节省 40%+。' }
        ]
      },
      {
        title: '四、RTC 实时音视频',
        keypoints: [
          { title: '核心指标', body: '端到端延迟 <400ms、丢包率 50% 仍可通话、单房间千人在线；用于会议、教育。' },
          { title: 'SDK 平台', body: 'iOS/Android/Web/小程序/Electron；支持 1v1、多人、互动直播多种模式。' },
          { title: 'AI 增强', body: '降噪、回声消除、超分、虚拟背景；豆包大模型可做实时字幕、翻译。' },
          { title: '场景套件', body: '会议套件、互动课堂、社交（连麦/聊天室）、互动直播；开箱即用减少 80% 开发。' }
        ]
      },
      {
        title: '五、视频 AI 处理',
        keypoints: [
          { title: '智能转码', body: '基于内容感知的码率分配，相同画质码率降 20-40%；带宽与存储双省。' },
          { title: '超分辨率', body: '480p → 1080p 实时增强，老视频焕新；电视台、版权方需求大。' },
          { title: '智能审核', body: '色情/暴恐/政治敏感内容识别；准确率 99%+；UGC 平台合规必备。' },
          { title: '智能剪辑', body: '体育精彩片段、新闻摘要、短视频自动生成；新华社、央视已用。' },
          { title: '数字人', body: '基于豆包+RTC，AI 主播 7×24 直播带货；新零售场景试水中。' }
        ]
      },
      {
        title: '六、媒体处理与 AIGC',
        keypoints: [
          { title: 'imageX', body: '智能图像处理：压缩、裁剪、水印、AI 修图；CDN 集成按需处理。' },
          { title: '语音合成 TTS / 识别 ASR', body: '多音色 TTS、多语种 ASR；客服、教育、媒体广泛应用。' },
          { title: 'AIGC 视频', body: '基于豆包视频模型生成短片、广告创意；2025 年快速演进中。' }
        ]
      },
      {
        title: '七、计费与典型规模',
        keypoints: [
          { title: 'VOD 计费', body: '存储（GB/月）+ 转码（分钟·分辨率）+ 播放 CDN（GB）；按使用付费。' },
          { title: 'LSS 计费', body: '推流（TPS）+ 转码（分钟）+ 播放下行 CDN（GB）；常用 95th 计费。' },
          { title: 'RTC 计费', body: '按"分辨率·分钟"档位；千人会议成本约 $0.X/分钟。' },
          { title: '行业典型规模', body: '中型直播平台日下行带宽 100 Tb-1 Pb，月费数百万；上千人企业 RTC 月 5-10 万。' }
        ]
      },
      {
        title: '八、行业应用',
        keypoints: [
          { title: '电商直播', body: '低延迟连麦 + 货品弹窗 + 实时数据看板；典型客户：抖音电商生态。' },
          { title: '在线教育', body: '互动课堂 + 录课 VOD + 智能字幕 + 录屏防作弊；K12/大学/职业教育。' },
          { title: '远程医疗', body: '高清会诊 + 影像调阅 + 录像合规留档；与医院 HIS 集成。' },
          { title: '泛娱乐', body: '语聊房、播客、虚拟演唱会；豆包 AI 增强互动玩法。' },
          { title: '会议/办公', body: '飞书会议依托同套底层；企业会议中心 SaaS 化方案。' }
        ]
      }
    ],
    terms: ['VOD', 'LSS', 'RTC', 'RTMP', 'HLS', 'LL-HLS', 'WebRTC', 'DRM', '窄带高清', 'imageX', 'TTS', 'ASR', 'AIGC', '数字人'],
    sellingPoint: '视频客户最在意三组数字：① 端到端延迟（直播 ≤2s 还是 RTC ≤400ms）② 卡顿率与首屏时间（首屏 <1s 是底线）③ 单 GB 综合成本（含 CDN+转码+存储）。售前先问"用户场景是什么"再推产品——电商直播给 LSS+低延迟+连麦 SDK；教育给 RTC+互动课堂；OTT 给 VOD+DRM+多端播放器。所有方案都用"窄带高清节省 30% 流量"做价值钩子。',
    caseStudy: {
      scenario: '某短视频出海 App，海外日活 200 万，使用通用云对象存储+第三方 CDN，海外加载慢、字幕翻译靠手工、UGC 审核延迟 1 小时。',
      solution: '迁到火山引擎 VOD（自动转码+智能字幕 30+ 语种）+ DCDN 海外 80+ 节点；UGC 上传走 imageX + 智能审核（秒级）；点播首屏由 12s 优化到 1.2s。',
      value: '播放成功率从 92% 升到 99%；翻译人力从 8 人降到 1 人审校；UGC 上线时间从 1 小时到秒级；海外用户次日留存 +18%。'
    },
    commonPitfalls: [
      '直播架构不留缓冲：突发 10 万观众瞬时打爆推流',
      '不开 DRM：版权片源被盗录上架其他平台',
      'RTC 用 HLS 思路调参：以为延迟低就够，忽略弱网恢复'
    ]
  },

  // ============ 阶段三：AI 与大模型（Day 12-14） ============
  {
    day: 12,
    videoQueries: ['大语言模型 LLM 入门', 'Transformer 原理 通俗讲解', 'RLHF 训练 教程'],
    stage: 's3',
    title: 'AI / ML / DL 基础',
    summary: '机器学习/深度学习核心概念、模型训练流程、CNN/RNN/Transformer',
    duration: '约 105 分钟',
    objectives: [
      '理清 AI、ML、DL、生成式 AI 的范围与关系',
      '掌握监督/无监督/强化学习三类范式',
      '理解过拟合/欠拟合、损失函数、评估指标',
      '了解 CNN、RNN、Transformer 三大网络结构',
      '能在客户对话中区分判别式 vs 生成式、训练 vs 推理'
    ],
    sections: [
      {
        title: '一、AI 的边界与脉络',
        keypoints: [
          { title: 'AI / ML / DL / GenAI', body: 'AI 是大概念，ML 是其分支（让机器从数据学规律），DL 是 ML 的子集（多层神经网络），GenAI 是 DL 的应用（生成内容）。' },
          { title: '判别式 vs 生成式', body: '判别 P(y|x)：分类、识别（人脸、垃圾邮件）；生成 P(x)：写文章、画图、合成语音。' },
          { title: 'AI 三波热潮', body: '1950s 符号主义 → 1980s 专家系统 → 2010s 深度学习（AlexNet 2012）→ 2020s 大模型（GPT-3 2020、ChatGPT 2022）。' },
          { title: '行业落地阶段', body: '感知（图像/语音）→ 决策（推荐/风控）→ 生成（文/图/视频）→ Agent（自主完成任务）。' }
        ]
      },
      {
        title: '二、机器学习三大范式',
        keypoints: [
          { title: '监督学习', body: '有标注数据：分类（垃圾邮件）、回归（房价）；最常用，依赖大量人工标注。' },
          { title: '无监督学习', body: '无标注：聚类（用户分群）、降维（PCA）、异常检测（风控）。' },
          { title: '强化学习', body: '智能体在环境中试错获得奖励；AlphaGo、自动驾驶、ChatGPT 的 RLHF。' },
          { title: '半监督 / 自监督', body: '少量标注 + 大量无标注；BERT、GPT 等大模型预训练核心范式。' }
        ]
      },
      {
        title: '三、模型训练流程',
        keypoints: [
          { title: '数据', body: '采集 → 清洗 → 标注 → 切分（训练/验证/测试集，常 7:1:2）；80% 工作量在数据。' },
          { title: '特征工程', body: '把原始数据变可学习信号；DL 时代部分被自动化，传统 ML（XGBoost）仍核心。' },
          { title: '损失函数', body: 'MSE（回归）、Cross Entropy（分类）、Hinge Loss（SVM）；定义"算错的代价"。' },
          { title: '优化器', body: 'SGD、Adam、AdamW；调"学习率"是新手最容易踩的坑。' },
          { title: '过拟合 vs 欠拟合', body: '过拟合：训练好测试差（用 Dropout、正则、早停）；欠拟合：都差（加层加数据）。' },
          { title: '评估指标', body: '准确率、精确率、召回率、F1、AUC；不平衡数据用 F1/AUC，别只看准确率。' }
        ]
      },
      {
        title: '四、CNN 卷积神经网络',
        keypoints: [
          { title: '核心结构', body: '卷积层（提局部特征）+ 池化层（下采样）+ 全连接层；ImageNet 2012 颠覆 CV。' },
          { title: '经典模型', body: 'LeNet → AlexNet → VGG → ResNet → EfficientNet；各时代里程碑。' },
          { title: '应用', body: '图像分类（ImageNet）、目标检测（YOLO）、分割（U-Net）、人脸识别。' }
        ]
      },
      {
        title: '五、RNN / LSTM',
        keypoints: [
          { title: 'RNN', body: '处理序列数据：时间序列、文本、语音；存在梯度消失问题。' },
          { title: 'LSTM / GRU', body: '加入门控机制解决长程依赖；2014-2018 NLP 主力。' },
          { title: '应用', body: '机器翻译（早期 Seq2Seq）、语音识别、IoT 时序预测；2020 年后多被 Transformer 取代。' }
        ]
      },
      {
        title: '六、Transformer 与注意力',
        keypoints: [
          { title: '论文', body: '2017 年 Google "Attention is All You Need"；NLP 大变革起点。' },
          { title: '核心：Self-Attention', body: '让序列中每个位置看到所有其他位置，复杂度 O(n²)；并行性远超 RNN。' },
          { title: 'Encoder vs Decoder', body: 'Encoder（BERT）适合理解；Decoder（GPT）适合生成；Encoder-Decoder（T5）适合翻译/摘要。' },
          { title: 'Multi-Head Attention', body: '多头并行学不同关系（语法/语义/位置）；典型 8-32 头。' },
          { title: '位置编码', body: '由于没有循环，需 PE 注入位置信息；Sinusoidal、Learned、RoPE 等。' }
        ]
      },
      {
        title: '七、训练与推理基础设施',
        keypoints: [
          { title: '训练算力', body: '大模型训练需要数百-数万张 GPU；用 InfiniBand 高速互联（200-400 Gbps）。' },
          { title: '分布式训练', body: '数据并行（DP）、模型并行（MP）、张量并行（TP）、流水线并行（PP）；通常多种组合。' },
          { title: '推理优化', body: 'TensorRT、vLLM、连续批处理；7B 模型单 A10 推理 ~50 token/s。' },
          { title: '量化', body: 'FP16 → INT8/INT4；模型小 4-8x、显存省、速度提升 2-4x；精度损失 <2%。' }
        ]
      },
      {
        title: '八、AI 工程化关键概念',
        keypoints: [
          { title: 'MLOps', body: '机器学习的 DevOps：数据版本、模型版本、CI/CD、监控；不做就是手工小作坊。' },
          { title: '模型监控', body: 'Drift（数据/概念漂移）、性能下降；线上模型每 3-6 个月需重训。' },
          { title: 'AB 测试', body: '新模型上线前小流量验证；推荐系统业务必备。' },
          { title: 'A/B 漂移', body: '看似有效模型在真实流量上线后效果下降，常因离线指标 ≠ 线上业务指标。' }
        ]
      }
    ],
    terms: ['ML', 'DL', '监督学习', '强化学习', '过拟合', 'Loss', 'Adam', 'CNN', 'ResNet', 'RNN', 'LSTM', 'Transformer', 'Self-Attention', 'BERT', 'GPT', 'MLOps', '量化', 'TensorRT'],
    sellingPoint: 'AI 客户最常见的迷失是"我们要做 AI"但不知道做什么。售前要做的是把"AI"翻译成具体业务问题。三步：① 找一个可量化的痛点（客服响应慢？审核成本高？营销转化低？）；② 判断用哪类 AI（识别 → CV/ASR；理解 → NLP；生成 → LLM；决策 → ML）；③ 评估数据准备度（有 1 万条标注数据吗？没有从哪里来？）。客户第一次合作做"小而美的 PoC"，比上来卖大模型平台容易落地 10 倍。',
    caseStudy: {
      scenario: '某保险公司想用 AI 做"理赔单据审核"，把人工审核从 7 天压到 1 天；现有 5 万条历史标注、5 名 AI 工程师。',
      solution: '先用 CV（OCR + 单据要素提取）+ ML（异常分类）做基础版；再用豆包大模型做要素一致性校验和异常理由生成；3 个月上线 + 6 个月迭代。',
      value: '理赔单审核 80% 自动通过，平均响应从 7 天降到 8 小时；人工只看高风险 20%；客户满意度提升 22 个 NPS 点。'
    },
    commonPitfalls: [
      '没有数据就买大模型：调用 API 玩不出业务价值',
      '只看离线指标：模型 95% 准确率，上线发现样本分布全变',
      '低估部署：训练 1 个月、上线 3 个月，没人想运维'
    ]
  },

  {
    day: 13,
    videoQueries: ['豆包大模型 入门', 'RAG 检索增强生成 教程', 'Coze 智能体 搭建'],
    stage: 's3',
    title: '大模型与豆包（Tokenizer / Scaling Law / RLHF / 豆包矩阵）',
    summary: '大模型核心概念、训练流程、豆包模型家族与火山方舟入口',
    duration: '约 110 分钟',
    objectives: [
      '理解 LLM 工作原理：Tokenizer、Embedding、KV Cache',
      '掌握 Scaling Law、Pretraining → SFT → RLHF 训练流程',
      '熟悉豆包模型家族（通用/Pro/Lite/视觉/语音/视频）',
      '了解 MoE、量化、多模态等前沿技术',
      '能为客户匹配合适的模型规格与调用方式'
    ],
    sections: [
      {
        title: '一、大模型核心机制',
        keypoints: [
          { title: 'Tokenizer 分词器', body: 'BPE/SentencePiece 把文本切成 token，中文 ~1.5 字/token、英文 ~0.75 词/token；计费按 token。' },
          { title: 'Embedding 向量化', body: '把 token 映射成高维向量（768-12288 维）；语义相近的 token 向量空间近。' },
          { title: '上下文窗口', body: '一次能看的 token 数量，2k → 128k → 1M+ 演进；窗口越长成本越高（O(n²)）。' },
          { title: 'KV Cache', body: '推理时把已计算的 K/V 缓存，避免重复计算；显存占用与窗口长度线性相关。' },
          { title: '采样温度', body: 'Temperature=0 完全确定，1 较随机；客服等场景用 0.3-0.5，创意写作用 0.8-1。' }
        ]
      },
      {
        title: '二、训练流程',
        keypoints: [
          { title: 'Pretraining 预训练', body: '海量无标注语料（数 T token），任务"预测下一个 token"；核心知识来源；耗算力最大。' },
          { title: 'SFT 监督微调', body: '高质量人工指令-回答对，调出"听话"的模型；通常数十万条。' },
          { title: 'RLHF 人类反馈强化学习', body: '人评估多个回答相对好坏，PPO 算法对齐人类偏好；ChatGPT 的关键。' },
          { title: 'DPO 直接偏好优化', body: '比 RLHF 简单稳定，对齐效果接近；2024 年后主流方案。' },
          { title: 'Continual Pretraining', body: '在通用大模型上持续训练注入领域知识（医疗/法律/金融）。' }
        ]
      },
      {
        title: '三、Scaling Law 与模型规模',
        keypoints: [
          { title: 'Chinchilla 法则', body: '参数量 N 与训练 token 量 D 大致 1:20 最优；过参数化或欠数据都浪费算力。' },
          { title: '模型规模分级', body: '小（<10B）端侧/低延迟；中（10-70B）通用；大（100B+）顶级能力；超大（千B+）研究前沿。' },
          { title: '能力涌现', body: '某些能力（推理、代码）在百亿参数后突然出现；不是线性提升。' },
          { title: '推理成本', body: '70B 模型推理成本约 7B 的 10x；客户实际选型常用 7B-13B 平衡性价比。' }
        ]
      },
      {
        title: '四、MoE 与稀疏化',
        keypoints: [
          { title: 'MoE 混合专家', body: '稀疏激活，每次只算部分专家；总参数大但计算量小；DeepSeek-V3、Mixtral 等代表。' },
          { title: '推理优势', body: '同样总参数下，MoE 推理成本低 60-80%；适合大规模部署。' },
          { title: '工程难度', body: '路由不均衡、显存峰值、跨节点通信；门槛比 Dense 高。' }
        ]
      },
      {
        title: '五、豆包大模型家族',
        keypoints: [
          { title: '豆包通用', body: '默认对话模型，能力均衡，适合大多数场景；价格亲民。' },
          { title: '豆包 Pro', body: '复杂推理、专业知识更强；金融分析、技术问答、复杂工具使用。' },
          { title: '豆包 Lite', body: '轻量化，端侧/低延迟场景；客服、IoT 设备。' },
          { title: '豆包视觉', body: '图文理解，OCR、图表、UI 截图；电商、教育、办公。' },
          { title: '豆包语音', body: 'TTS（多音色）+ ASR（多语种）+ 语音对话；客服、车载、智能硬件。' },
          { title: '豆包视频', body: '视频生成与理解；广告创意、内容生产 2025 重点。' },
          { title: '豆包 1.5 / 1.6', body: '持续迭代，1.5 起支持长上下文 256K，1.6 起多模态能力增强。' }
        ]
      },
      {
        title: '六、调用方式',
        keypoints: [
          { title: 'API 调用', body: 'OpenAI 兼容接口，应用零改造迁移；按 token 计费、毫秒级首字延迟。' },
          { title: '批量推理', body: '离线大批任务用批处理 API，单价比实时低 50%+；适合数据标注、内容生成。' },
          { title: 'Stream 流式', body: 'SSE 推送 token，提升首字感知速度；聊天场景必用。' },
          { title: 'Function Call', body: '模型决定调外部 API（查天气、数据库、下单）；Agent 基础。' }
        ]
      },
      {
        title: '七、Prompt 工程',
        keypoints: [
          { title: '基础原则', body: '清晰指令 + 角色设定 + 输出格式 + 示例（Few-shot）；4 要素全到位质量提升 30%+。' },
          { title: 'Chain-of-Thought', body: '让模型"分步思考"，复杂推理任务正确率显著提升。' },
          { title: 'Few-shot Learning', body: '提供 2-5 个例子，无需微调即让模型学新格式。' },
          { title: 'System Prompt', body: '设定角色和约束，"你是专业法律顾问，只引用 2020 年后法规"。' }
        ]
      },
      {
        title: '八、企业落地考量',
        keypoints: [
          { title: '数据安全', body: 'API 调用是否会被用于训练？火山方舟提供"数据不入训练池"承诺。' },
          { title: '私有部署', body: '专有云部署豆包模型，数据不出企业；金融/政务必须。' },
          { title: '成本控制', body: '通过缓存、Prompt 压缩、模型分级（简单问题走 Lite）平均省 40-70%。' },
          { title: '合规', body: '生成内容审核（有害/版权/敏感）必须接入；火山引擎内容安全 API 配套。' }
        ]
      }
    ],
    terms: ['LLM', 'Token', 'Tokenizer', 'Embedding', '上下文窗口', 'KV Cache', 'Pretraining', 'SFT', 'RLHF', 'DPO', 'MoE', '豆包', 'Function Call', 'CoT', 'Few-shot'],
    sellingPoint: '客户问"豆包和 GPT/Claude 哪个好"时，技术比拼很难赢。售前的话术：① 选模型不是"哪个最强"，是"哪个适合你的业务+合规+成本"；② 中文场景豆包训练语料、本地化能力领先国外厂商；③ 数据安全和合规：火山方舟可承诺数据不入训练，私有部署可选；④ 一站式：方舟 + Coze + veMLP 减少自己拼装。先做小场景 PoC（1-2 周），让客户用脚投票。',
    caseStudy: {
      scenario: '某律所想做"合同智能审查"，3 名律师每天处理 200+ 合同，每份耗时 1.5 小时；要求数据绝不外泄。',
      solution: '私有化部署豆包 Pro + 向量库 + 历史 5 万份合同知识；按合同类型路由模型规格（标准合同 Lite、并购合同 Pro）；前端集成飞书插件；上线 3 个月。',
      value: '单合同处理时间从 1.5 小时降到 25 分钟；高风险条款识别覆盖率从 70% 提升到 96%；律师可承接业务量提升 3 倍。'
    },
    commonPitfalls: [
      '所有问题都用最大模型：成本爆炸、延迟高、客户体验差',
      '不做幻觉防护：客服模型胡说八道引发投诉',
      'API Key 写在前端：被盗用一夜烧光月度预算'
    ]
  },

  {
    day: 14,
    videoQueries: ['Function Calling Agent 入门', 'Prompt Engineering 教程', '向量数据库 VikingDB'],
    stage: 's3',
    title: '火山方舟 / Coze / veMLP（一站式 AI 平台）',
    summary: '方舟模型服务、Coze 智能体、veMLP 训练平台、Agent 工程',
    duration: '约 110 分钟',
    objectives: [
      '掌握火山方舟模型服务的全景与定价',
      '理解 RAG、Function Call、Agent 工程化方案',
      '熟悉 Coze 智能体平台的工作流、插件、知识库',
      '了解 veMLP 在大模型微调与训练中的角色',
      '能为客户设计端到端 AI 落地方案'
    ],
    sections: [
      {
        title: '一、火山方舟概览',
        keypoints: [
          { title: '产品定位', body: '一站式大模型服务平台：模型 API + 微调 + 知识库 + Agent + 工具市场；企业 AI 落地入口。' },
          { title: '提供的模型', body: '豆包系列 + 第三方模型（DeepSeek、Llama、Qwen 等）；统一接口管理。' },
          { title: '核心能力', body: '模型 API、Prompt 调试、知识库（RAG）、批量推理、SFT/LoRA 微调、Agent 编排。' },
          { title: '计费', body: '按 token（百万级单价）；微调按训练 token；存储按知识库容量；分级清晰。' }
        ]
      },
      {
        title: '二、RAG 检索增强生成',
        keypoints: [
          { title: '为什么需要 RAG', body: 'LLM 没有最新和企业内部知识、容易幻觉；RAG 通过检索注入事实，幻觉率显著下降。' },
          { title: '工作流', body: '文档 → 切片 → Embedding → 向量库；查询时检索 Top-K → 拼到 Prompt → LLM 生成。' },
          { title: '切片策略', body: '按字数/段落/语义切片；典型 200-1000 字；过短丢上下文，过长稀释相关性。' },
          { title: '检索质量', body: '主流用 Embedding 模型 + BM25 混合检索；常用召回 Top-20，重排 Top-5。' },
          { title: '常见踩坑', body: '文档质量差、切片乱、Prompt 不指定"只用提供资料"，模型仍会瞎编。' }
        ]
      },
      {
        title: '三、微调（SFT / LoRA / DPO）',
        keypoints: [
          { title: 'SFT 全参数微调', body: '调整模型所有参数，效果最好但成本高；只在数据特别多/特别专业时用。' },
          { title: 'LoRA / QLoRA', body: '冻结主参数，只训低秩适配器；省 90% 显存，质量接近 SFT；中小企业首选。' },
          { title: 'DPO 偏好对齐', body: '用偏好对（好/坏回答）对齐风格、价值观；客服话术、品牌语气适用。' },
          { title: '微调 vs RAG vs Prompt', body: 'Prompt（最快、最便宜）→ RAG（解决知识时效）→ 微调（解决格式与风格）；通常组合用。' }
        ]
      },
      {
        title: '四、Function Call 与工具',
        keypoints: [
          { title: '基本原理', body: '模型决定何时调外部函数（查数据库、调 API），并把结果带回继续生成。' },
          { title: '典型工具', body: '搜索、天气、数据库查询、下单、邮件、第三方 SaaS 接口。' },
          { title: '可靠性挑战', body: '模型可能调错工具或参数错误；需要参数校验、重试、回退；生产用日志审计每次调用。' }
        ]
      },
      {
        title: '五、Coze 智能体平台',
        keypoints: [
          { title: 'Coze 是什么', body: '低代码 Agent 搭建平台，国内 coze.cn / 海外 coze.com；可视化工作流 + 插件市场。' },
          { title: '工作流节点', body: 'LLM 调用、知识库检索、HTTP 请求、代码执行、条件分支、循环；图形化编排。' },
          { title: '知识库', body: '上传文档/网页/数据库，自动 Embedding；与方舟相同底层。' },
          { title: '插件市场', body: '已有 200+ 官方/三方插件（搜索、绘图、办公、电商）；也可自定义。' },
          { title: '渠道发布', body: '一键部署到飞书、抖音、微信、API；从 0 到 1 部署一个 bot 半小时内。' }
        ]
      },
      {
        title: '六、Agent 工程化',
        keypoints: [
          { title: 'Agent 是什么', body: '能感知-思考-行动的循环 AI；具备记忆、规划、工具调用能力。' },
          { title: 'ReAct / Plan-and-Execute', body: 'ReAct 思考一步执行一步；Plan-and-Execute 先做完整计划再执行；复杂任务用后者。' },
          { title: 'Memory 记忆', body: '短期（上下文窗口）+ 长期（向量库）+ 反思总结；让 Agent "记得"用户偏好。' },
          { title: 'Multi-Agent', body: '多个 Agent 协作（角色分工：研究员/写手/审查员）；适合复杂任务但成本高。' },
          { title: '可靠性挑战', body: '幻觉、循环、工具误用、token 失控；生产需限制最大步数+人工兜底。' }
        ]
      },
      {
        title: '七、veMLP 机器学习平台',
        keypoints: [
          { title: '功能定位', body: '面向 AI 工程师的训练 + 部署平台；与方舟（应用层）互补。' },
          { title: '训练', body: '支持单机/分布式/千卡集群；与 vePFS 高吞吐存储联动；Spot 抢占降本 60%。' },
          { title: '部署', body: '一键发布为 API 服务、批量推理任务；自带监控/弹性。' },
          { title: '与开源生态', body: '兼容 PyTorch/TensorFlow/Megatron/DeepSpeed；不绑定。' }
        ]
      },
      {
        title: '八、典型企业落地方案',
        keypoints: [
          { title: '智能客服', body: 'RAG（产品文档）+ 工具（订单查询）+ 多轮 + 兜底转人工；3-6 周上线。' },
          { title: '内部知识助手', body: '员工提问 → RAG 检索 → 生成；解放人力 10x；部署在飞书。' },
          { title: '营销内容生产', body: '商品图 → 文案 → 短视频脚本 → 投流素材；广告/电商在用。' },
          { title: '风控/审核', body: '文本/图片审核；判别+生成结合；合规留痕。' },
          { title: '研发提效', body: 'Code Copilot、单元测试生成、代码审查；研发效率 +30%。' }
        ]
      }
    ],
    terms: ['火山方舟', 'Coze', 'veMLP', 'RAG', '向量库', 'Embedding', 'SFT', 'LoRA', 'DPO', 'Function Call', 'ReAct', 'Multi-Agent', 'Memory', 'PyTorch', 'DeepSpeed'],
    sellingPoint: 'AI 平台客户最容易陷入"看谁功能多"的陷阱。售前要把客户拉回到落地——三段式："① 你的第一个 AI 应用是什么（客服？知识库？营销？）"；"② 数据准备到什么程度（已有多少标注、文档、对话日志）"；"③ 团队配比（业务 vs AI 工程比例）"。然后给"30 天 PoC + 90 天上线 + 持续迭代"的路线图，比一次卖整套方舟+Coze+veMLP 容易决策得多。',
    caseStudy: {
      scenario: '某互联网保险公司想做"智能保单顾问"，员工内部用：能查产品条款、计算费率、生成话术、跟进客户。',
      solution: 'Coze 搭建主 Agent，集成豆包 Pro；知识库导入 200+ 产品条款（方舟 RAG）；插件接保单系统 API + CRM；飞书机器人渠道发布；veMLP 微调话术风格。',
      value: '员工查询/生成话术耗时从 15 分钟降到 1 分钟；新人上岗培训周期从 2 个月缩短到 2 周；保单转化率提升 12%。'
    },
    commonPitfalls: [
      '上线前不做幻觉测试：客户问产品条款 → 模型瞎编 → 投诉',
      'RAG 知识库不更新：新产品上市 1 个月模型还在讲旧条款',
      '微调数据少又脏：训完模型反而比 base 还糟'
    ]
  },

  // ============ 阶段四：售前专业技能（Day 15-17） ============
  {
    day: 15,
    videoQueries: ['SPIN 销售方法 教程', 'MEDDIC 销售框架', '客户需求挖掘 售前'],
    stage: 's4',
    title: '售前角色与方法论（SPIN / MEDDIC / BANT / 价值主张）',
    summary: '售前职责、客户分层、需求挖掘方法论、价值主张表达',
    duration: '约 95 分钟',
    objectives: [
      '理清售前在销售铁三角中的角色与价值',
      '掌握 SPIN 提问法、MEDDIC 资格框架、BANT 商机判断',
      '建立"价值主张画布"思维',
      '区分 KA 大客户与 SMB 中小客户的售前打法',
      '熟悉典型售前流程与产出物'
    ],
    sections: [
      {
        title: '一、售前是谁',
        keypoints: [
          { title: '销售铁三角', body: 'AE（拿单）+ SA/PreSales（讲技术）+ Delivery（落地）；售前是"业务+技术"双语者。' },
          { title: '售前的三层价值', body: '"翻译"（产品语言→客户语言）+ "建模"（业务问题→技术架构）+ "信任"（专业度让客户敢决策）。' },
          { title: '售前 vs 售后', body: '售前在签单前讲故事；售后在签单后做交付与客户成功；优秀售前必须懂落地。' },
          { title: '售前画像', body: '通常 IT 背景 5-10 年 + 沟通好 + 抗压强；月均出 10-30 个客户、3-5 份方案。' }
        ]
      },
      {
        title: '二、客户分层与打法',
        keypoints: [
          { title: 'KA 大客户', body: '年合同 500 万+；决策链长（技术/业务/采购/高层）；项目周期 6-18 个月；售前重深度+定制。' },
          { title: 'SMB 中小客户', body: '年合同 5-100 万；决策快（往往 1-2 人）；售前重产品讲透+案例参考。' },
          { title: '行业重点客户', body: '汽车/金融/政企/能源等；要懂行业语言、合规要求；通常配行业专属售前。' },
          { title: '渠道客户', body: '通过代理商/集成商触达；售前协助代理商而非直接面客户；杠杆大。' }
        ]
      },
      {
        title: '三、SPIN 提问法',
        keypoints: [
          { title: 'Situation 状况', body: '了解客户现状（业务规模、技术栈、团队）；不要在这停留太久。' },
          { title: 'Problem 问题', body: '挖痛点（哪里慢/贵/不安全/不合规）；让客户自己说出来比你猜更有力。' },
          { title: 'Implication 影响', body: '把痛点放大（如果不解决会怎样？影响营收？合规？人效？）。' },
          { title: 'Need-Payoff 收益', body: '让客户自己描述"如果解决了会带来什么"；这是成交的临门一脚。' },
          { title: '示例', body: '客户："我们 ERP 慢"→ S："多久了" → P："具体哪些场景慢" → I："对业务影响" → N："如果秒级响应能多接多少订单"。' }
        ]
      },
      {
        title: '四、MEDDIC 商机资格',
        keypoints: [
          { title: 'M etrics 度量', body: '客户用什么指标判断成功（响应时间？成本？营收）；指标决定方案。' },
          { title: 'E conomic Buyer 决策人', body: '签字的那个人；售前要在合适时机见到他/她。' },
          { title: 'D ecision Criteria 决策标准', body: '客户怎么选择厂商（价格？功能？品牌？服务）。' },
          { title: 'D ecision Process 决策流程', body: '哪些岗位评审、是否走招标、采购周期。' },
          { title: 'I dentify Pain 痛点', body: '已识别的真实痛点（不是"想要"，是"必须解决"）。' },
          { title: 'C hampion 内部支持者', body: '客户内部站在你这边的人；没有 Champion 难赢单。' }
        ]
      },
      {
        title: '五、BANT 商机判断',
        keypoints: [
          { title: 'B udget 预算', body: '是否有预算？预算量级？没预算的需求多是"了解"，不要投入过多。' },
          { title: 'A uthority 决策权', body: '对接人是否能决策；只有决策人 1/3 的客户才推动得了。' },
          { title: 'N eed 需求', body: '需求是否真实+紧迫？"想了解"≠"想买"。' },
          { title: 'T iming 时间窗', body: '何时上线/付款？没有时间表的项目通常 6 个月还没动。' }
        ]
      },
      {
        title: '六、价值主张画布',
        keypoints: [
          { title: '客户侧三要素', body: '客户的工作（要完成什么）、痛苦（怕的事）、收益（想得到的）。' },
          { title: '产品侧三要素', body: '我们的产品/服务、痛苦缓解、收益创造；与客户侧一一映射。' },
          { title: '工作模板', body: '画成 9 宫格画布，售前与客户一起填；可视化对齐"产品价值"与"客户期待"。' },
          { title: '常见误区', body: '只列产品功能，不映射客户痛点；客户听不见。' }
        ]
      },
      {
        title: '七、典型售前流程',
        keypoints: [
          { title: '初次接触 → 需求调研', body: '1-2 次会议；产出"客户画像表 + 痛点清单"。' },
          { title: '方案设计 → 方案讲解', body: '2-4 周；产出"架构图 + 报价 + ROI 测算 + 案例"。' },
          { title: 'PoC / 试用 → 商务谈判', body: '1-3 个月；产出"PoC 报告 + 终稿合同"。' },
          { title: '签约 → 移交交付', body: '签约后 1 周内召开 KO 会议，正式移交给交付团队，售前进入"陪跑"模式。' }
        ]
      },
      {
        title: '八、售前的"软技能"',
        keypoints: [
          { title: '听比说重要', body: '70% 时间听客户、30% 时间表达；过早展示产品是新手最大的错。' },
          { title: '敢提问', body: '一个好问题胜过十页 PPT；敢问客户"为什么这样想"。' },
          { title: '可视化', body: '一张图 > 十段话；架构图、流程图、数据对比图是售前三件武器。' },
          { title: '案例化', body: '同行业、同体量、同问题的成功案例最有说服力；建议每月积累 3-5 个。' },
          { title: '诚实', body: '不能做就说不能做；你说"能做"但交付做不到，永远丢一个客户。' }
        ]
      }
    ],
    terms: ['SPIN', 'MEDDIC', 'BANT', 'KA', 'SMB', 'AE', 'SA', '价值主张画布', 'Champion', 'PoC', 'KO 会议', '决策链', '需求调研'],
    sellingPoint: '售前是"用客户能听懂的话讲技术，用技术给客户讲清楚生意"。两个动作能让你区别于 80% 的同行：① 第一次见客户先问 5 个 SPIN 问题再讲产品；② 每次提案附"3 年 ROI 表 + 客户同行案例"。技术好说、案例难找——所以平时积累比什么都重要。',
    caseStudy: {
      scenario: '某城商行 IT 主管想上 AI 中台，预算 1500 万；售前小李第一次见面就讲了 60 页方舟+Coze+veMLP PPT；客户说"再考虑下"。',
      solution: '复盘后小李改打法：第二次会议先用 SPIN 挖出银行真实痛点（信审材料初审人力 30 人/天）；第三次只讲一个场景方案（AI 信审助手）+ 同业案例；PoC 30 天验证人力降 60%；KO 签约。',
      value: '从被拒到签约 4 个月；客户对小李评价："他听得懂我们的业务"；后续追加合同 800 万。'
    },
    commonPitfalls: [
      '一上来就讲产品矩阵：客户听完说"很厉害但不知道跟我们什么关系"',
      '只见对接人不见决策人：方案做了几轮在最后一关被毙',
      '不挖隐含影响（SPIN 的 I）：客户觉得不解决也行，没有紧迫感'
    ]
  },

  {
    day: 16,
    videoQueries: ['FFAB 售前话术', '方案架构图 怎么画', '4+1 视图 架构'],
    stage: 's4',
    title: '解决方案设计与 TCO/ROI（架构图 / 4+1 视图 / 灾备 / 成本）',
    summary: '架构图绘制、4+1 视图、灾备等级、TCO/ROI 实操',
    duration: '约 110 分钟',
    objectives: [
      '掌握架构图的常见形态与画图原则',
      '理解 4+1 视图（逻辑/开发/进程/物理/场景）',
      '区分灾备等级（同城/异地/两地三中心/多活）',
      '能用 Excel 搭建 TCO 模型并算 ROI',
      '了解 SLA/RPO/RTO 与高可用架构对应关系'
    ],
    sections: [
      {
        title: '一、架构图的"三层"',
        keypoints: [
          { title: '业务架构', body: '画客户业务模块（用户、订单、营销、风控）；面向业务方讲"系统能做什么"。' },
          { title: '技术架构', body: '画云产品+组件（CDN→ALB→ECS→DB）；面向技术方讲"怎么实现"。' },
          { title: '部署架构', body: '画资源拓扑（VPC/AZ/Region 分布）；面向运维讲"在哪里跑"。' },
          { title: '一图三层', body: '同一份方案 3 张图分别讲，避免对每个人都讲一种；售前的"标配"。' }
        ]
      },
      {
        title: '二、4+1 视图',
        keypoints: [
          { title: '逻辑视图', body: '面向最终用户，描述系统功能模块及其关系；UML 类图/组件图。' },
          { title: '开发视图', body: '面向开发人员，描述代码组织、构建、第三方依赖。' },
          { title: '进程视图', body: '面向系统集成人员，描述运行时进程、并发、通信。' },
          { title: '物理视图', body: '面向系统工程师，描述硬件部署、网络拓扑。' },
          { title: '场景视图', body: '面向所有人，用关键用例串起其他四个视图；架构合理性的"试金石"。' }
        ]
      },
      {
        title: '三、SLA / RPO / RTO',
        keypoints: [
          { title: 'SLA 服务等级协议', body: '常见 99.9%（年 8.7h 不可用）/99.95%（4.4h）/99.99%（52min）/99.999%（5min）；越高成本指数级。' },
          { title: 'RPO 恢复点目标', body: '能容忍丢多少数据；秒级（同步复制）/分钟（异步）/小时（每日备份）。' },
          { title: 'RTO 恢复时间目标', body: '故障到恢复需要多久；分钟（自动切换）/小时（人工切）/天（重建）。' },
          { title: 'SLA 与架构对应', body: '99.9%：单 AZ；99.95%：跨 AZ；99.99%：多 region 异地；99.999%：多活。' }
        ]
      },
      {
        title: '四、灾备等级',
        keypoints: [
          { title: '冷备', body: '备份数据存异地，故障时手工恢复；RPO 小时-天，RTO 数小时；最便宜。' },
          { title: '温备', body: '异地有低规格资源待启动；故障时扩容上线；RPO 分钟，RTO 半小时-小时。' },
          { title: '热备/同城双活', body: '同城两机房双活，流量自动切换；RPO=0，RTO 分钟级；金融常用。' },
          { title: '两地三中心', body: '同城两个 + 异地一个；2010 后银行业标配；监管直接要求。' },
          { title: '异地多活', body: '多 region 同时承载流量；最高级；阿里、字节这类亿级互联网才有。' }
        ]
      },
      {
        title: '五、高可用设计原则',
        keypoints: [
          { title: '消除单点', body: '关键组件至少 N+1；NLB/SLB/数据库主从/缓存 Cluster/消息队列 3 副本。' },
          { title: '熔断降级', body: '依赖故障时自动断开+返回兜底数据，避免雪崩；Sentinel、Hystrix。' },
          { title: '限流', body: '保护核心服务不被打挂；按 QPS/并发数；常用算法令牌桶、漏桶。' },
          { title: '混沌工程', body: '主动注入故障验证韧性；从单 Pod kill 到整 AZ 断电演练。' }
        ]
      },
      {
        title: '六、TCO 模型实战',
        keypoints: [
          { title: '科目清单', body: '硬件折旧 + 机房 + 网络 + 软件许可 + 人力 + 隐性（停机/机会成本）；3-5 年累加。' },
          { title: '云上 TCO 计算', body: '计算（包月+按量）+ 存储（分级）+ 网络（带宽/流量）+ DB+备份+ 安全；按 12 个月预测。' },
          { title: 'Right-sizing 假设', body: '云上不能直接照搬 IDC 配置（IDC 通常超配 2-3 倍）；按真实利用率重新建模。' },
          { title: 'Excel 模板结构', body: '科目 × 年份矩阵；计算总成本、年化、对比 IDC；做差额柱状图。' },
          { title: '常见错误', body: '只算云端、不算迁移人力；忽略培训成本；预测刊例价不打折。' }
        ]
      },
      {
        title: '七、ROI 计算',
        keypoints: [
          { title: '基本公式', body: 'ROI = (收益 - 投入) / 投入 × 100%；投资回收期 = 投入 / 年净收益。' },
          { title: '收益侧三段', body: '直接降本（IT 支出↓）+ 业务增收（弹性带来更多营收）+ 风险下降（停机/合规罚款减少）。' },
          { title: '财务化语言', body: '净现值 NPV、内部收益率 IRR；高层喜欢看的财务模型，售前最好懂一点。' },
          { title: '时间维度', body: '通常给 3 年视图；第 1 年成本高（迁移投入），第 2-3 年收益体现。' }
        ]
      },
      {
        title: '八、方案产出物',
        keypoints: [
          { title: '方案 PPT', body: '15-30 页；结构：客户痛点 → 方案 → 架构图 → 案例 → ROI → 实施计划 → 商务报价。' },
          { title: '架构图', body: 'draw.io / Visio / PPT；标准图标库（火山引擎官方有）。' },
          { title: 'BOQ 报价', body: 'Bill of Quantities，资源清单 + 单价 + 数量 + 总价；通常 Excel。' },
          { title: '实施计划', body: '里程碑 + 资源 + 风险；甘特图常用；交给交付时是承诺基准。' },
          { title: '案例集', body: '同行业 / 同规模 / 同问题；售前最值钱的"知识库"。' }
        ]
      }
    ],
    terms: ['4+1 视图', 'SLA', 'RPO', 'RTO', '冷备', '热备', '两地三中心', '异地多活', 'TCO', 'ROI', 'NPV', 'IRR', 'BOQ', 'Right-sizing', '熔断'],
    sellingPoint: '方案设计的"杀招"是一张能让客户高层 30 秒看懂的"价值架构图"——左边写客户的 3 个核心痛点（带数字）；中间画云上架构（不超过 10 个产品图标）；右边写 3 个量化收益（成本降 X% / 业务提速 Y 倍 / 合规过审）。这张图比 50 页方案 PPT 更能打动决策人。',
    caseStudy: {
      scenario: '某券商核心交易系统要从老 IDC 迁移到云，监管要求两地三中心 + 99.99% SLA + 国密合规；售前要 4 周内出方案。',
      solution: '设计：北京同城双活（veDB 主+只读，CLB 跨 AZ）+ 上海异地灾备（DTS 异步复制）；KMS 国密 SM4；TCO 模型对比 IDC 5 年节省 3200 万；列出过等保三级 + 监管报备清单。',
      value: '方案一次过会；6 个月完成迁移；上线后 RTO 实测 4 分钟（要求 30 分钟）；监管检查零扣分。'
    },
    commonPitfalls: [
      '只画技术架构忘了业务架构：业务方说"看不懂"',
      'TCO 不算迁移人力：实际超预算 30%+',
      'SLA 承诺过高：99.99% 报价没翻倍 → 上线后赔不起'
    ]
  },

  {
    day: 17,
    videoQueries: ['POC 设计 怎么做', '招投标 售前讲标', '售前异议处理'],
    stage: 's4',
    title: '演讲、招投标与竞争分析',
    summary: '客户演讲 5 分钟法则、标书写作、异议处理、友商对比',
    duration: '约 105 分钟',
    objectives: [
      '掌握客户演讲的"5 分钟黄金法则"',
      '熟悉招投标流程（标前/标书/答辩/中标）',
      '掌握 7 步异议处理法',
      '能客观对比火山与阿里/华为/腾讯/AWS',
      '了解价格策略与谈判技巧'
    ],
    sections: [
      {
        title: '一、客户演讲',
        keypoints: [
          { title: '5 分钟黄金法则', body: '前 5 分钟决定成败：用"3 个数据 + 1 个故事"开场抓注意力；不要从"目录"开始。' },
          { title: 'SCQA 结构', body: 'Situation 现状 → Complication 矛盾 → Question 问题 → Answer 方案；麦肯锡咨询经典开场。' },
          { title: 'PPT 设计原则', body: '一页一个观点；图>表>字；字号 >24pt；引用数据必带出处；时长按 2-3 分钟/页预算。' },
          { title: '声调与节奏', body: '关键数字加重、关键转折停顿；避免读 PPT；对决策人的眼神交流。' },
          { title: '应对提问', body: '复述确认问题 → 简短直接答 → 必要时承诺会后跟进；不知道就说不知道。' }
        ]
      },
      {
        title: '二、招投标流程',
        keypoints: [
          { title: '标前期', body: '客户立项、需求摸底、邀请厂商演示；售前要争取"参与撰写需求"。' },
          { title: '发标书', body: 'RFP/RFQ 公开发布；通常给 7-30 天准备；分技术 + 商务 + 资质三本。' },
          { title: '应答', body: '点对点回答每条要求；写"应答 / 部分应答 / 替代方案"；遗漏一条可能被废标。' },
          { title: '答辩', body: '20-40 分钟现场或视频；评委 5-15 人；关键是"应答清晰 + 数字有支撑 + 案例可信"。' },
          { title: '中标', body: '公示 7 天 → 签合同 → 进入交付；中标后 1 个月内是续签/扩单的最佳窗口。' }
        ]
      },
      {
        title: '三、标书写作',
        keypoints: [
          { title: '结构化模板', body: '响应表 + 公司介绍 + 技术方案 + 实施计划 + 服务承诺 + 案例 + 资质；千篇一律但缺一不可。' },
          { title: '响应表关键', body: '一项一行"应答 / 偏离说明"；"完全响应"是底线；"超越响应"是加分项。' },
          { title: '资质证书', body: '等保 / ISO / CMMI / 行业认证；扫描件清晰、有效期内；新公司常因资质丢分。' },
          { title: '案例选择', body: '与客户同行业、同体量、同时间窗（3 年内）；把客户姓名换成"某 XX"。' },
          { title: '常见废标雷区', body: '过盖章、过期资质、缺响应表、报价错位（人民币写美元）；至少 2 人交叉审。' }
        ]
      },
      {
        title: '四、7 步异议处理法',
        keypoints: [
          { title: '步骤 1：倾听', body: '让客户把异议说完，不打断；很多异议在客户自己说时就解了一半。' },
          { title: '步骤 2：复述', body: '"您的意思是..."；复述后客户要么修正要么确认，避免双方误解。' },
          { title: '步骤 3：共情', body: '"我理解您的担心，许多客户最初也这么想"；化解对立。' },
          { title: '步骤 4：澄清', body: '"具体是哪个方面让您有这个顾虑"；继续挖根因。' },
          { title: '步骤 5：举证', body: '用数据、案例、第三方报告反驳；纯口述无效。' },
          { title: '步骤 6：试探', body: '"如果这个解决了，是否可以推进到下一步"；测试是否真异议。' },
          { title: '步骤 7：跟进', body: '当场没解决的，承诺会后给方案；每条都要落到时间表。' }
        ]
      },
      {
        title: '五、友商对比（客观视角）',
        keypoints: [
          { title: '阿里云', body: '产品最全、生态成熟（钉钉/达摩院）；电商客户友好；定位"全能选手"。' },
          { title: '腾讯云', body: '游戏、社交、视频强；微信生态联动；中等规模 SaaS 友好。' },
          { title: '华为云', body: '政企、信创、海外（特别东南亚/中东）强；CapEx 替代云方案多。' },
          { title: 'AWS / Azure', body: '海外业务首选；产品丰富但本地化弱、计费复杂、人民币结算难。' },
          { title: '火山引擎差异', body: '原生 AI（豆包/方舟/Coze）+ 视频云第一阵营 + 字节同款基础设施；新势力品牌。' },
          { title: '对比原则', body: '不抹黑友商、用客观数据；客户问"你们和阿里云比怎么样"，先回答"看你最在意什么"。' }
        ]
      },
      {
        title: '六、价格策略与谈判',
        keypoints: [
          { title: '报价节奏', body: '初次：刊例价 + 细节透明；二次：根据竞争给折扣；终轮：给"承诺量+赠送服务"组合包。' },
          { title: '不要先降价', body: '客户问降多少前，先确认还有什么需求未满足、决策权是否到位、签单时间能否锁定。' },
          { title: '换价值不换价格', body: '降价直接换"加资源/加服务/锁年度"；纯让利会让客户怀疑你"原价就贵"。' },
          { title: '免费试用', body: '中小客户给 1-3 个月免费试用 +技术陪跑；大客户给 PoC 池预算（不是无限）。' },
          { title: '总价 vs 单价', body: '客户算总价，售前要按总价让利、保单价；保住未来续费时的"基准"。' }
        ]
      },
      {
        title: '七、典型异议与应对',
        keypoints: [
          { title: '"我们已经用阿里云了"', body: '不是非此即彼，多云已成常态；用"互补 + AI 强 + 视频云强"切入；先小试点。' },
          { title: '"价格太贵"', body: '把价格拆成组件 → 找 3 个共识点 → 在客户低优先级处削减 → 让总价合预算。' },
          { title: '"性能能跟得上吗"', body: '案例（同行业某 X 案例）+ 数据（QPS/延迟实测）+ PoC 邀约。' },
          { title: '"安全性怎么保证"', body: '责任共担 + 等保几级 + 客户自己 IAM/加密配置；从认证 + 案例双切入。' },
          { title: '"项目时间紧"', body: '把方案拆"先 1 个月上 1 个核心场景 + 后续 6 个月扩展"；降低决策成本。' }
        ]
      },
      {
        title: '八、合同与谈判细节',
        keypoints: [
          { title: 'SLA 条款', body: '明确赔付公式（如未达 99.95% 退 10% 月费）；上限通常单月费用；写清楚很重要。' },
          { title: '数据所有权', body: '客户数据归客户、不可被云厂商二次使用；合规客户必看条款。' },
          { title: '退出条款', body: '合作终止后多久内可下载所有数据；365 天是常见承诺。' },
          { title: '价格保护', body: '合同期内（1-3 年）若刊例价下降，可同步享受；与续费谈判挂钩。' },
          { title: '保密 NDA', body: '通常签 MNDA 双向保密；售前接触客户业务前必走流程。' }
        ]
      }
    ],
    terms: ['SCQA', 'RFP', 'RFQ', '应答表', '废标', '7 步异议处理法', 'NDA', 'SLA 赔付', '价格保护', '退出条款', '友商对比', 'PoC'],
    sellingPoint: '客户问"你们和阿里云比怎么样"是售前的"高频送命题"。永远不要正面比拼。三步答："① 看您最在意什么——成本？AI？视频？合规？② 在 AI 和视频领域我们能拿出字节系生产案例，这是稀缺资源；③ 您也可以做 PoC，30 天里跑同一个负载，数字会说话。"——既不抹黑友商，又把战场拉到自己擅长的地方。',
    caseStudy: {
      scenario: '某省级政企客户公开招标"AI 政务助手"，5 家厂商参与；火山引擎是新进入者无政务案例；标书 30 天内交。',
      solution: '组建 8 人投标小组：售前主笔技术方案（突出豆包+方舟一体性）；引用司法、税务等可类比 AI 项目；答辩用 SCQA 开场；价格策略给"承诺量打包+前 3 个月免费"；准备 18 类异议预案。',
      value: '60 分钟答辩拿下评委一致好评；技术分 95/100、商务分 92/100；中标后客户主动追加 2 个相关项目。'
    },
    commonPitfalls: [
      '答辩超时：评委每家就 30 分钟，超时直接打断',
      '抹黑友商：评委记仇，下次招标不带你玩',
      '价格谈判先松口：客户从此把你当"可压价"的厂商'
    ]
  },

  // ============ 阶段五：行业方案与综合实战（Day 18-20） ============
  {
    day: 18,
    videoQueries: ['金融 大数据 风控 案例', '互联网 RAG 智能客服', '汽车云 智能座舱'],
    stage: 's5',
    title: '行业方案 (上)：互联网 / 泛娱乐 / 金融 / 汽车',
    summary: '4 大重点行业的痛点、典型架构、火山引擎对应能力',
    duration: '约 100 分钟',
    objectives: [
      '掌握互联网/电商行业的核心痛点与典型方案',
      '理解泛娱乐（直播/短视频/游戏）的视频云组合',
      '熟悉金融行业的合规、灾备、信创要求',
      '了解汽车行业的智驾/座舱/营销三大场景',
      '能为每个行业给出 1-2 套标准化方案模板'
    ],
    sections: [
      {
        title: '一、互联网/电商行业',
        keypoints: [
          { title: '核心特征', body: '高并发（百万 QPS）、强弹性（大促 5-10 倍峰值）、短迭代（每天上线 N 次）、用户体验敏感。' },
          { title: '典型痛点', body: '大促资源准备难、慢查询拖业务、模型推荐效果天花板、海外加速、UGC 审核合规。' },
          { title: '典型架构', body: 'CDN/DCDN → ALB → ECS/VKE 微服务 → veDB+Redis+ByteHouse → AI 推荐（方舟）。' },
          { title: '差异化打法', body: '"字节同款推荐算法 + 视频云 + 海外 POP"是最强组合；阿里电商客户难抢，但海外/视频/AI 强场景可切入。' },
          { title: '案例锚点', body: '中型电商日 GMV 100 万 → 支撑双 11 5x 流量 → CDN+DCDN+VKE 弹性。' }
        ]
      },
      {
        title: '二、互联网细分场景',
        keypoints: [
          { title: 'SaaS / B 端工具', body: '多租户隔离、API 性能、数据安全；适合 ALB+VKE+veDB；建议中型客户分阶段上云。' },
          { title: '社交/UGC', body: '海量内容存 TOS + 智能审核 + 推荐算法；豆包+Coze 做评论/帖子审核效率提升。' },
          { title: 'O2O 本地生活', body: '高频交易+地理位置+实时推送；veDB+Redis 缓存+RTC 配送通讯。' },
          { title: '工具类 App', body: '轻 SaaS 化；ECS+TOS+API 网关 + 飞书/微信生态接入；起步成本低。' }
        ]
      },
      {
        title: '三、泛娱乐行业',
        keypoints: [
          { title: '直播', body: '低延迟+大规模并发；LSS 推流+DCDN 分发；超低延迟连麦带货必备。' },
          { title: '短视频', body: 'VOD 转码+智能字幕+CDN；UGC 上传需智能审核；推荐算法是命脉。' },
          { title: '游戏', body: 'NLB 长连接+全球加速+DDoS 高防+实时音视频；战斗匹配靠 Redis Cluster。' },
          { title: '播客 / 音频', body: 'TTS+ASR+音频处理；与 Coze 智能体结合做"AI 主播"。' },
          { title: '虚拟人 / 数字人', body: 'RTC + 豆包视频 + AI 语音；2025 年增长最快子赛道。' }
        ]
      },
      {
        title: '四、泛娱乐方案要点',
        keypoints: [
          { title: '海外加速', body: 'Anycast EIP + 海外 POP + 跨境专线；TikTok 模式可复用。' },
          { title: '版权保护', body: 'DRM (FairPlay/Widevine) + 数字水印 + 盗录追踪；内容方刚需。' },
          { title: '合规审核', body: '智能审核（色情/暴恐/政治）+ 人工复审；UGC 平台必备。' },
          { title: '体验测量', body: '首屏时间、卡顿率、清晰度评分；BI 看板每天监控。' }
        ]
      },
      {
        title: '五、金融行业',
        keypoints: [
          { title: '核心特征', body: '强合规（等保 + 监管报备）、强灾备（两地三中心）、强一致（ACID 不能让步）、敏感数据（国密+脱敏）。' },
          { title: '典型痛点', body: '老 IDC 折旧 / 国产化（信创）/ AI 风控 / 数字员工 / 客户体验改善。' },
          { title: '产品组合', body: '金融云专属基座 + veDB（PG 替代 Oracle）+ ByteHouse 实时风控 + 豆包审单 + WAF/DDoS 高防。' },
          { title: '资质门槛', body: '客户需要厂商有金融行业等保三级 + 银保监备案 + 信创认证；新厂商前 3 年最难。' },
          { title: '"两地三中心"标配', body: '同城两个数据中心双活 + 异地一个灾备；监管直接要求。' }
        ]
      },
      {
        title: '六、金融细分场景',
        keypoints: [
          { title: '银行核心系统', body: 'Mainframe → 分布式改造 + 国产化；周期 3-5 年；保留旧系统集成。' },
          { title: '信审 / 风控', body: 'AI 模型 + ByteHouse 实时计算 + 知识图谱；风控决策毫秒级。' },
          { title: '反洗钱 / 合规', body: '海量交易扫描 + 异常检测；TLS 留档 6 年+；监管随时调取。' },
          { title: '数字银行 App', body: 'CDN + ALB + 微服务 + 端侧 SDK；结合人脸/活体识别。' },
          { title: '保险智能助理', body: 'Coze + 豆包 + 知识库；解决保单复杂度，提升坐席效率。' }
        ]
      },
      {
        title: '七、汽车行业',
        keypoints: [
          { title: '三大场景', body: '智驾（数据采集+训练+仿真）、座舱（车机+语音+娱乐）、营销（电商/直销/试驾）。' },
          { title: '智驾痛点', body: 'PB 级路测数据存储 + 千卡训练 + 标注外包 + 仿真平台；自建机房根本扛不住。' },
          { title: '智驾方案', body: 'TOS 海量存储 + vePFS 训练 + GPU 集群 + Volcano 调度 + 数据闭环工具链。' },
          { title: '座舱方案', body: '豆包语音 + RTC 音视频 + Coze 车载助手 + 车云一体管理。' },
          { title: '营销/直销', body: '抖音生态 + 直播间 + 智能推荐 + AIGC 试驾视频；新能源车标配。' }
        ]
      },
      {
        title: '八、汽车专属云',
        keypoints: [
          { title: '行业云形态', body: '火山引擎汽车云：合规基座 + 数据出境合规 + 智驾工具链；多家车企已采用。' },
          { title: '数据出境', body: '智驾路测数据出境需安全评估；境外业务用海外 region 隔离。' },
          { title: 'V2X / 车联网', body: 'IoT 平台 + MQTT + 实时计算；车端、路端、云端三者协同。' },
          { title: '典型客户规模', body: '一家头部新能源车企每年云支出 数亿元；售前一旦突破即可长期合作。' }
        ]
      }
    ],
    terms: ['CDN+DCDN', '智能审核', 'DRM', '两地三中心', '信创', 'veDB PG', '反洗钱', '智驾', 'vePFS', 'V2X', 'Coze 车载', '汽车云'],
    sellingPoint: '行业方案的关键不是"我们行业能力多强"，是"我们能解决你这个行业最痛的 1-2 个问题"。互联网客户最痛是"大促弹性 + AI 推荐"；金融最痛是"合规过审 + 国产化"；汽车最痛是"智驾算力 + 数据合规"。每个行业先搞定一个标杆案例，后续可以打 5 年。',
    caseStudy: {
      scenario: '某新势力车企智驾团队 60 人，路测车 200 辆，每天产生 100 TB 视频数据；自建 IDC 已存 10 PB，新数据扩容追不上。',
      solution: '存量数据 → 闪电立方 PB 级离线迁移到 TOS（生命周期分级）；增量 → 路测车直传 TOS；训练用 GPU 集群 + vePFS 100 GB/s 吞吐；仿真平台跑 VKE。',
      value: '存储成本年省 1200 万；训练任务排队从 7 天降到 6 小时；模型迭代周期由 6 周缩短到 2 周。'
    },
    commonPitfalls: [
      '互联网案例直接套金融：监管要求差异巨大，会被一票否决',
      '汽车数据未做出境合规：欧洲业务被 GDPR 罚款',
      '直播架构没留 5x 余量：突发大主播开播即崩'
    ]
  },

  {
    day: 19,
    videoQueries: ['零售云 会员营销', '政企云 一网通办', '教育 在线学习方案'],
    stage: 's5',
    title: '行业方案 (下)：零售 / 政企 / 教育 / 出海',
    summary: '4 大行业的核心痛点与火山引擎打法',
    duration: '约 95 分钟',
    objectives: [
      '掌握零售/快消行业线上线下融合的方案',
      '理解政企/制造业的合规与信创要求',
      '熟悉在线教育/双减后赛道的合规与降本',
      '掌握出海企业的全球架构与数据合规',
      '能为这 4 个行业给出标准化方案'
    ],
    sections: [
      {
        title: '一、零售/快消',
        keypoints: [
          { title: '核心特征', body: 'O2O 融合（线上线下一体）、千店千面（个性化）、季节性（大促/618/双 11）、低毛利（成本敏感）。' },
          { title: '典型痛点', body: '门店 POS 系统老旧、库存调度慢、营销 ROI 难测、私域流量沉淀难、数据散落在 ERP/CRM/POS。' },
          { title: '云上方案', body: 'CDN+ALB+ECS 电商前端 + veDB 订单 + ByteHouse 数据分析 + Coze 智能客服 + 豆包内容生成。' },
          { title: '抖音生态联动', body: '抖音小店、巨量引擎、抖音直播是零售客户必谈话题；火山引擎天然有协同。' },
          { title: '私有化诉求', body: '部分大型零售要求门店本地数据库（断网可用）+ 云端汇总；混合云架构匹配。' }
        ]
      },
      {
        title: '二、零售细分场景',
        keypoints: [
          { title: '电商平台', body: '同互联网电商，但流量更季节性；大促弹性是核心。' },
          { title: '私域 / 会员', body: '用户画像 + 推荐 + 自动化营销；豆包写文案 + Coze 自动 SOP。' },
          { title: '门店 IT', body: 'POS + 电子价签 + 智能称重；边缘计算+小型化云。' },
          { title: '供应链 / 库存', body: '多仓库存调度 + 智能补货 + 配送路径优化；ML 模型嵌入。' },
          { title: '客服中心', body: '工单系统 + 智能客服（Coze）+ 数字员工；人力可降 30-50%。' }
        ]
      },
      {
        title: '三、政企 / 制造业',
        keypoints: [
          { title: '核心特征', body: '强合规（等保 / 信创 / 行业法规）、流程长（审批多）、保守（容错率低）、强项目制。' },
          { title: '政企痛点', body: '国产化替代 + 业务系统现代化 + 营商环境数字化 + AI 政务助手 + 政务一网通办。' },
          { title: '产品组合', body: '专有云/政务云 + 信创基座（鲲鹏/海光）+ 国产 OS/DB + 豆包政务模型 + Coze 一网通办助手。' },
          { title: '制造痛点', body: 'OT/IT 融合 + 工业互联网 + 数字孪生 + 设备预测性维护 + AI 质检。' },
          { title: '制造方案', body: 'IoT 平台 + 时序数据库 + 边缘计算 + 视觉 AI 质检 + 数字孪生 3D 引擎。' }
        ]
      },
      {
        title: '四、政企典型项目',
        keypoints: [
          { title: '一网通办', body: '群众/企业一站式办事；后端打通 N 个委办；AI 助手解答+引导；3-12 个月项目。' },
          { title: '12345 智能热线', body: 'ASR+NLU+工单自动分派+话术生成；坐席效率提升 50%+。' },
          { title: '城市运营 / 大屏', body: '多源数据融合+实时分析+大屏可视化；ByteHouse + LAS + 报表平台。' },
          { title: '数字孪生', body: '3D 建模 + 实时数据 + 仿真预测；园区/工厂/能源管网应用。' },
          { title: '招投标限制', body: '政企采购普遍要求 3 年以上同类业绩；新厂商先做"小项目+合作伙伴"路径。' }
        ]
      },
      {
        title: '五、教育行业',
        keypoints: [
          { title: '行业现状', body: '双减后 K12 收缩；职业教育/高等教育/企业培训/海外留学增长。' },
          { title: '核心痛点', body: '内容版权 + 课堂互动体验 + 防作弊 + AI 答疑/批改 + 学生数据安全。' },
          { title: '产品组合', body: 'RTC（互动课堂）+ VOD（录播）+ DRM + 豆包答疑 + Coze 助教 + 实时弹幕。' },
          { title: 'AI 教育新机会', body: 'AI 助教（24h 答疑）+ 智能作业批改 + 个性化学习路径；2025 年快速增长。' },
          { title: '合规', body: '未成年人个人信息保护 + 内容审核 + 数据本地化；不能马虎。' }
        ]
      },
      {
        title: '六、教育细分场景',
        keypoints: [
          { title: 'K12 / 大学课堂', body: 'RTC 多人互动 + 白板 + AI 监课 + 录播回放；防 P2P 作弊。' },
          { title: '职业教育', body: '直播 + 实操平台 + 考证模拟；考试系统对作弊检测严苛。' },
          { title: '企业培训', body: '飞书+视频学习+AI 测评；企业 LMS 集成。' },
          { title: '留学/雅思', body: 'AI 口语陪练 + 写作批改 + 模考；豆包多语种是优势。' }
        ]
      },
      {
        title: '七、出海企业',
        keypoints: [
          { title: '出海三大模式', body: '产品出海（App/SaaS）、品牌出海（消费品）、服务出海（咨询/外包）；架构需求差异大。' },
          { title: '架构原则', body: '业务就近部署 + 数据合规驻留 + 多 region 高可用 + 全球加速；中心+边缘混合。' },
          { title: '合规要求', body: 'GDPR（欧盟）/ CCPA（加州）/ LGPD（巴西）/ PDPA（东南亚）；本地化处理。' },
          { title: '出海产品组合', body: '海外 region ECS+TOS+CDN + Anycast EIP + 多语种内容（豆包翻译）+ 当地支付。' },
          { title: '工具栈协同', body: 'TikTok 广告 + 巨量引擎 + 火山引擎云；从内容到流量到服务一体。' }
        ]
      },
      {
        title: '八、出海典型场景',
        keypoints: [
          { title: '跨境电商', body: 'Shopify/独立站 + 多支付 + 海外 CDN + AIGC 商品图/文案；东南亚增长最快。' },
          { title: '游戏出海', body: '全球低延迟（Anycast）+ DDoS 防护 + 数据中心多 region；中东、东南亚是热门。' },
          { title: 'SaaS 出海', body: '多租户隔离 + 多语言 + GDPR/SOC2 合规；典型服务于本地中小企业。' },
          { title: '内容/视频出海', body: 'CDN+VOD+智能字幕+本地化运营；TikTok 模式的副本。' }
        ]
      }
    ],
    terms: ['O2O', '私域', '抖音小店', '一网通办', '信创基座', '数字孪生', '12345', 'AI 助教', 'GDPR', 'CCPA', 'Anycast', 'AIGC', '出海', '边缘计算'],
    sellingPoint: '"行业打法"的精髓不是熟悉每个行业的产品，是熟悉每个行业 BD 心里的"3 个数字"——零售：库销比、复购率、获客成本；政企：审批流程节点数、国产化替代率；教育：续课率、师生比、做题人均时长；出海：多 region SLA、合规通过率、本地支付集成数。售前能用客户行业的语言聊三句话，转化率立刻翻倍。',
    caseStudy: {
      scenario: '某连锁茶饮 600+ 门店扩张到东南亚，现有架构集中在国内一台 IDC；东南亚门店 POS 卡顿，营销活动时延高，App 留存差。',
      solution: '主架构保留国内 + 在新加坡 region 部署副站点（ECS+CDN+TOS）；门店 POS 边缘缓存（断网可用）；东南亚用户走 Anycast EIP；抖音/TikTok 营销联动；豆包多语种生成本地文案。',
      value: '东南亚门店 POS 操作延迟从 800ms 到 80ms；当地 App 留存提升 14%；本地化营销内容生产效率提升 5x。'
    },
    commonPitfalls: [
      '出海不做合规：GDPR 罚款全球营收 4%，可能上千万欧',
      '政企标书没盖电子签：直接废标',
      '教育做未成年用户没数据本地化：被网信办约谈整改'
    ]
  },

  {
    day: 20,
    videoQueries: ['售前面试 经验分享', '解决方案架构师 SA 面试题', '火山引擎 面试'],
    stage: 's5',
    title: '综合实战：客户 Q&A、红线、速记卡与考试冲刺',
    summary: '20+ 高频客户 Q&A、售前红线清单、速记卡、考试技巧',
    duration: '约 90 分钟',
    objectives: [
      '掌握 20+ 高频客户问题的标准答案',
      '了解售前的"绝不能做"红线清单',
      '建立"数字 / 案例 / 术语"三类速记卡',
      '学会综合考试的应试技巧',
      '形成持续学习的方法论'
    ],
    sections: [
      {
        title: '一、20+ 高频 Q&A（一）：选型类',
        keypoints: [
          { title: 'Q：火山和阿里云比怎么样？', body: 'A：看您最在意什么。AI 和视频是我们的强项（字节系生产案例），其他能力对标主流；建议同负载做 30 天 PoC，数字会说话。' },
          { title: 'Q：为什么不直接用 GPT/Claude？', body: 'A：① 中文场景豆包训练语料更对路；② 数据安全/合规可承诺不入训练池；③ 一站式（方舟+Coze+veMLP）减少拼装；④ 国内合规过审更顺。' },
          { title: 'Q：私有云还是公有云？', body: 'A：核心高合规留私有，弹性业务上公有，混合云连接。建议先识别哪些应用必须私有（合规/物理隔离），其余进公有。' },
          { title: 'Q：用什么数据库替代 Oracle？', body: 'A：veDB PostgreSQL 是首选（PG 兼容 Oracle 多数语法）；DTS 工具平滑迁移；TCO 通常省 50%+。' },
          { title: 'Q：K8s 还是 Serverless？', body: 'A：长稳定服务用 K8s（VKE）；事件驱动/突发任务用 FaaS；混合用最划算。' }
        ]
      },
      {
        title: '二、20+ 高频 Q&A（二）：合规与安全',
        keypoints: [
          { title: 'Q：等保过审需要多久？', body: 'A：从架构准备到测评通常 3-6 个月；火山引擎金融云已自带等保三级基座，可省 1-2 个月。' },
          { title: 'Q：数据是否会被云厂商使用？', body: 'A：合同明确客户数据归客户、云厂商不得二次使用；火山方舟可承诺 API 调用不入训练池。' },
          { title: 'Q：怎么做异地灾备？', body: 'A：按等级选——冷备（异地备份）→ 温备（异地待机资源）→ 热备（双活）→ 异地多活；金融通常两地三中心。' },
          { title: 'Q：信创要求怎么满足？', body: 'A：火山引擎信创云支持鲲鹏/海光/飞腾 + 麒麟/欧拉 OS + 达梦/人大金仓 DB；提供国产化基座。' },
          { title: 'Q：海外业务合规怎么办？', body: 'A：欧洲走 GDPR + 海外 region 部署；美国 CCPA；东南亚 PDPA；国内出境数据走安全评估。' }
        ]
      },
      {
        title: '三、20+ 高频 Q&A（三）：成本与价值',
        keypoints: [
          { title: 'Q：上云比 IDC 真的便宜吗？', body: 'A：算同等可用性下的 5 年 TCO（IDC 99% vs 云 99.95%）通常省 20-40%；重点不是单价，是隐性成本（停机/机会/人力）。' },
          { title: 'Q：账单失控怎么办？', body: 'A：建立 FinOps：账单可视 + Right-sizing + Reserved/SP + Spot 抢占式；半年通常省 15-25%。' },
          { title: 'Q：能否给免费试用？', body: 'A：中小客户 1-3 个月免费 + 技术陪跑；大客户给 PoC 池预算（封顶）；商业大单结合"承诺量打包"。' },
          { title: 'Q：刊例价后续会涨吗？', body: 'A：合同期内（1-3 年）保护价格不涨；行业整体趋势是降，老客户续约时同步享受新折扣。' },
          { title: 'Q：上云后 IT 团队怎么办？', body: 'A：传统 SA → 云架构师；DBA → 数据工程师；运维 → SRE；通常 6-12 个月外训+实战；提升而非裁员。' }
        ]
      },
      {
        title: '四、20+ 高频 Q&A（四）：AI 与新技术',
        keypoints: [
          { title: 'Q：大模型适合我们用吗？', body: 'A：先选场景（客服/知识库/营销/审单）→ 评估数据准备度（标注/文档量）→ 做小 PoC → 看 ROI 决定扩展。' },
          { title: 'Q：豆包 vs DeepSeek vs Llama？', body: 'A：方舟支持调用所有这些；中文场景豆包优；推理深度 DeepSeek 强；开源自部署 Llama 灵活；可以同时用、按场景路由。' },
          { title: 'Q：RAG vs 微调如何选？', body: 'A：知识时效性问题用 RAG；格式/风格问题用微调；通常组合用。' },
          { title: 'Q：AI 出错怎么办？', body: 'A：① Prompt 加约束（"只用提供材料"）；② 加内容审核；③ 关键场景人工兜底；④ 日志全留档复盘。' },
          { title: 'Q：AI 投入 ROI 多久？', body: 'A：常见 6-18 个月。关键是算"提速带来的业务增量 + 节省人力"，不只算 API 成本。' }
        ]
      },
      {
        title: '五、售前红线清单',
        keypoints: [
          { title: '不答应做不到的事', body: '签单一时爽，交付火葬场；客户终身记仇。' },
          { title: '不抹黑友商', body: '客户记得你说过的每句话；评委也是。' },
          { title: '不泄露其他客户信息', body: 'NDA 是底线；案例必须脱敏（"某 X 客户"）。' },
          { title: '不擅自降价', body: '价格有权限，超过权限当场说"我回去申请"。' },
          { title: '不绕过 AE/采购流程', body: '按公司流程走，不私下承诺；越界一次终身受限。' },
          { title: '不在客户面前贬同事/产品', body: '内部问题内部解决；客户面前一直统一战线。' }
        ]
      },
      {
        title: '六、速记卡（一）：必背数字',
        keypoints: [
          { title: 'SLA 等级', body: '99.9% (年 8.7h) / 99.95% (4.4h) / 99.99% (52min) / 99.999% (5min)。' },
          { title: 'CDN 节点', body: '火山引擎国内 1500+ 节点，海外 80+，总带宽 100 Tbps+。' },
          { title: 'TOS 可靠性', body: '11 个 9（99.999999999%）；多 AZ 副本。' },
          { title: 'NLB 性能', body: '百万 QPS，亚毫秒延迟。' },
          { title: 'PL3 云盘', body: '单盘 100 万 IOPS，4 GB/s 吞吐，0.2ms 延迟。' },
          { title: '豆包模型', body: '通用/Pro/Lite/视觉/语音/视频；上下文最长 256K+；OpenAI 兼容 API。' }
        ]
      },
      {
        title: '七、速记卡（二）：必背案例',
        keypoints: [
          { title: '互联网电商', body: '某中型电商上 VKE+CDN+ByteHouse，大促支撑 5x 流量，整体 IT 成本降 28%。' },
          { title: '金融', body: '某券商两地三中心方案，6 个月迁完，监管检查零扣分，5 年 TCO 节省 3200 万。' },
          { title: '汽车', body: '某新能源车企 100 TB/天路测数据上 TOS+vePFS，训练任务排队从 7 天降到 6 小时。' },
          { title: 'AI 落地', body: '某保险公司 AI 信审，理赔时长从 7 天降到 8 小时，客户满意度 +22 NPS。' },
          { title: '出海', body: '某连锁茶饮东南亚扩张，POS 延迟 800→80ms，App 留存 +14%。' }
        ]
      },
      {
        title: '八、综合考试技巧 + 持续成长',
        keypoints: [
          { title: '考试策略', body: '先做有把握的，标记不会的；时间管理：30 题 30 分钟 = 1 分钟/题；剩余时间检查标记。' },
          { title: '排除法', body: '4 选 1 大多能秒排 1-2 个；剩下两个看关键字（"必须"/"通常"/"最优"）。' },
          { title: '陷阱题', body: '"以下不正确的是" / "以下不属于的是"——一定看清是问对的还是错的。' },
          { title: '持续学习', body: '每月看 1 本经典书（《架构整洁之道》《SRE Google》）+ 1 个开源项目；季度复盘案例库。' },
          { title: '社群与行业活动', body: 'CNCF 中国大会、火山引擎 OneCC、Coze 开发者大会；社群比官方 PPT 更新快。' },
          { title: '工具栈个人化', body: '建立你的"售前工具包"：方案模板、报价模板、案例库、问题库、工具清单；3-5 年是杀手锏。' }
        ]
      }
    ],
    terms: ['Q&A', '红线', '速记卡', 'PoC', 'TCO', '99.95%', '11 个 9', '决策链', 'NDA', '友商对比', '内容审核', 'FinOps', '持续学习', '案例库'],
    sellingPoint: '一个合格售前 vs 一个优秀售前的差别只在两件事：① 能不能 30 秒内说出"客户最痛 1 件事 + 我们的核心价值 + 1 个同业案例"；② 能不能在客户提非预期问题时不慌、能用框架（SCQA / SPIN / 7 步异议处理）兜住。技术是基础，结构化思考与不慌是分水岭。这 20 天的内容只是骨架，真正长成是签 100 个单后才有的肌肉。',
    caseStudy: {
      scenario: '20 天学习结束，第一次独立面对客户：某连锁酒店 IT 总监问"我们想用 AI 做客服，但担心安全和成本；阿里云已经用了 3 年；预算 200 万；3 个月想看到效果"。',
      solution: '用 SPIN 切入（确认痛点是"客服人均工单不够"）；给三段方案：① 30 天 PoC（Coze + 豆包 Lite + 知识库，专做"房型咨询"场景）；② 60 天扩展到"投诉处理 + 房卡问题"；③ 90 天对接订单系统做"全链路自动化"；TCO 表 3 年节省 600 万；案例锚点是某连锁餐饮的 Coze 客服。',
      value: '客户 1 周内决策做 PoC；30 天后转化为 80 万合同；6 个月后扩单到 200 万；售前个人 KPI 月度第一。'
    },
    commonPitfalls: [
      '考试不规划时间：纠结 1 道难题用了 5 分钟，后面 5 道没看清',
      '签单后立刻消失：客户进交付期遇到困难找不到你 → 续签丢',
      '只学产品不学客户：3 年下来还是"火山引擎产品手册人形版"'
    ]
  }
];

// ============================================================
// 面试培训模块（独立于 20 天课程，按章节组织）
// ============================================================
const INTERVIEW = [
  {
    id: 'i1',
    videoQueries: ['售前工程师 简历 怎么写', '简历优化 售前', '技术简历 模板'],
    title: 'C01 · 面试全景与准备',
    summary: '认识售前面试的流程、考点与必备物料，建立"先准备后表达"的心态',
    duration: '约 25 分钟',
    objectives: [
      '理解云厂商售前面试的 4-5 轮典型流程及每轮考察重点',
      '区分技术面、行为面、压力面、Case 面的应对策略',
      '建立面试前 7 天的准备清单',
      '掌握"反向调研"客户/岗位/面试官的方法'
    ],
    sections: [
      {
        title: '一、售前面试的典型流程',
        keypoints: [
          { title: '第 1 轮 HR 初筛（30 分钟）', body: '考察基本信息、动机、稳定性、薪资预期；30% 候选人挂在这里——多因薪资虚高或动机模糊。准备一段"为什么离职 + 为什么选这家"的 60 秒话术。' },
          { title: '第 2 轮 技术经理面（45-60 分钟）', body: '考察云/AI/产品基础 + 1-2 个简历项目深挖；重点在"懂不懂细节"——能追到第 3 层就过关。建议带笔记本/白板可画图。' },
          { title: '第 3 轮 售前总监 / 业务负责人面（60 分钟）', body: '考察行业理解、案例、商业敏感度、表达；常给一个 case 让你 15 分钟出方案。这一轮是"成单关键"。' },
          { title: '第 4 轮 跨部门 / 高管面（30-45 分钟）', body: '考察文化匹配、抗压、规划；问题往往无标准答案，看你思考的"质感"。' },
          { title: '第 5 轮 HRBP / Offer 沟通（30 分钟）', body: '走完 background check、聊薪资、谈福利；这轮是"补位"环节，态度决定 Offer 数字。' }
        ]
      },
      {
        title: '二、4 类面试题型与策略',
        keypoints: [
          { title: '技术面（What & How）', body: '考点：云基础、火山引擎产品、AI 大模型、SLA/RPO/RTO、典型架构。策略：先答主线再补细节，承认不会比硬撑好；准备 3 个深度项目能"反客为主"。' },
          { title: '行为面（STAR）', body: '考点：合作、冲突、失败、成长。策略：用 STAR 模型——Situation/Task/Action/Result；务必量化结果（"团队效率 +30%"比"提升明显"强 10 倍）。' },
          { title: '压力面（Stress）', body: '考点：抗压、应变、不被牵着走。策略：先停 2 秒；复述确认；不慌不辩；承认局限。"我没遇到过类似场景，但我会这样思考……"是好答案。' },
          { title: 'Case 面（方案设计）', body: '考点：业务理解+架构能力+表达。策略：先问 3 个澄清问题（业务规模/合规/预算）；画结构图（4-6 个组件）；最后给 ROI 与里程碑。' }
        ]
      },
      {
        title: '三、面试前 7 天准备清单',
        keypoints: [
          { title: 'D-7 反向调研', body: '研究公司：财报/官网/最新发布会；研究岗位：JD 关键词逐条对应自己的经历；研究面试官：LinkedIn / 脉脉看背景，能聊到他擅长的领域加分。' },
          { title: 'D-5 简历精炼', body: '把简历改到 1 页（5 年内）或 2 页（5 年+），每条都要有数字；删除"沟通好/学习快"等废话；把项目按 STAR 重写。' },
          { title: 'D-3 八大模板话术', body: '自我介绍（1/3 分钟）、为什么离职、为什么这家、最大成就、最大失败、3 年规划、薪资预期、反问 8 题——逐字写出再背熟。' },
          { title: 'D-1 模拟实战', body: '找朋友/AI 模拟 1 次完整面试（30-60 分钟）；录音回放挑卡顿、口头禅、跑题；调整 2-3 处。' },
          { title: 'D-Day 物料', body: '简历 3 份（自留+面试官+备份）+ 笔记本 + 笔 + 身份证 + 水。线上面试再准备：网线/有线鼠标/独立麦克风/纯色背景。' }
        ]
      },
      {
        title: '四、心态与节奏',
        keypoints: [
          { title: '"双向选择"心态', body: '面试不是审讯——你也在评估这家公司。带着这个意识，你紧张感会下降 50%；面试官也会觉得你成熟。' },
          { title: '提前 15 分钟到场', body: '现场面试比约定时间早 15 分钟到，给自己适应空间；线上提前 5 分钟测网络/摄像头。迟到一次基本判负。' },
          { title: '语速与停顿', body: '紧张会让语速变快 1.3 倍；刻意慢下来，关键句后停 1 秒；面试官记笔记的时间也是你的呼吸时间。' },
          { title: '不慌的"3 秒法则"', body: '听到难题——停 3 秒。可以说"这个问题我想一下"，比张口胡说更专业。3 秒里复述题意、列要点、再开口。' }
        ]
      }
    ],
    tips: '售前面试不是"记忆力比拼"，是"沟通能力 + 技术储备 + 商业感"的三角。哪一边短板都能挂；好消息是这三件事 7 天内都能显著提升。'
  },

  {
    id: 'i2',
    videoQueries: ['售前面试 自我介绍 模板', 'STAR 法则 自我介绍', '30秒 自我介绍'],
    title: 'C02 · 简历优化',
    summary: '把简历改造成"30 秒能看懂、1 分钟能记住"的售前作品',
    duration: '约 20 分钟',
    objectives: [
      '掌握售前简历的 5 模块结构',
      '学会用数字+成果+对比量化项目经验',
      '识别并删除"减分"的常见表述',
      '生成与 JD 匹配度 > 80% 的关键词清单'
    ],
    sections: [
      {
        title: '一、售前简历的 5 大模块',
        keypoints: [
          { title: '① 顶部基本信息（10 秒）', body: '姓名 + 1 句标签（"5 年云售前 / 主导金融行业 8 个项目 / 累计签约 6000 万"）+ 联系方式；不要放"求职意向"——浪费空间。' },
          { title: '② 核心能力关键词（10 秒）', body: '与 JD 高度匹配的 8-12 个关键词：云架构 / 解决方案设计 / TCO 测算 / 招投标 / 行业（金融/汽车）/ AI 大模型。HR 30 秒内扫这一栏。' },
          { title: '③ 工作经历（占 60% 篇幅）', body: '按 STAR 重写每段：1 句业务背景 → 你做了什么（动作）→ 量化结果。倒序排列，最近 3 年最详细。' },
          { title: '④ 项目经验（占 25%）', body: '挑 3-5 个最有亮点的：客户行业 / 规模 / 你的角色 / 用了哪些产品 / 最终签约金额或业务价值。' },
          { title: '⑤ 教育与认证（占 5%）', body: '学历 + 火山引擎 / 阿里云 / 华为云 / AWS 等认证；非计算机专业别隐瞒，正面写"经济学 + 自学云架构 3 年"反而真诚。' }
        ]
      },
      {
        title: '二、量化表达 vs 平庸表达',
        keypoints: [
          { title: '差：负责重要客户的售前工作', body: '好：主导某城商行（500+ 网点）信创替代项目售前，从需求调研到签约 7 个月，签约 1200 万、毛利率 38%。' },
          { title: '差：协助销售完成方案', body: '好：6 个月内独立完成 12 份方案 PPT + 8 次客户答辩，单项目最大签约 2400 万；客户满意度调研 4.7/5。' },
          { title: '差：熟悉云产品', body: '好：掌握火山引擎 ECS/VKE/TOS/veDB/方舟 + AWS EC2/RDS/S3 全套；持有火山引擎云架构师认证（2024）。' },
          { title: '差：参与公司大客户拓展', body: '好：作为售前组长带 3 人小组，进入头部新能源车企智驾团队 BD 名单，6 个月推动签约 800 万 + 续约 600 万。' }
        ]
      },
      {
        title: '三、5 类减分表述（必删）',
        keypoints: [
          { title: '"沟通能力强、学习能力强"', body: '所有人都这样写——失去信号；改成"在 60 人售前团队中获 2024 Q3 之星——客户满意度排名 TOP 3"。' },
          { title: '"参与了 / 协助了"', body: '动词软弱——面试官读不到你的贡献；改成"主导 / 设计 / 优化 / 推动"。' },
          { title: '"具体细节面谈时详述"', body: '甩给面试官——他没时间；写出来，让他读完直接想见你。' },
          { title: '"对工作充满热情"', body: '这是态度词——不是结果；用"愿意为 1 个客户去对方城市出差 3 次"等具体行为替代。' },
          { title: '简历过 3 页', body: '5 年以内 1 页、5-10 年 2 页、10 年+ 才 3 页；过长 = 不会取舍 = 减分。' }
        ]
      },
      {
        title: '四、与 JD 匹配的"关键词工程"',
        keypoints: [
          { title: '把 JD 关键词全部拎出', body: '复制 JD → 高频名词圈出（如"金融行业""信创""国产数据库""TCO 测算""招投标"）；每个关键词都要在简历找到对应；缺的就补/调整。' },
          { title: 'ATS 系统过滤', body: '大公司用 ATS（Applicant Tracking System）按关键词过滤；JD 里出现 5 次的词必须在简历出现 1-2 次；纯图片简历直接被丢。' },
          { title: '行业匹配度', body: '应聘"金融售前"——金融项目排第一段；应聘"汽车智驾售前"——汽车/AI/数据合规放显眼位置。' },
          { title: '工具与认证', body: 'Excel 报价、Visio/draw.io 架构图、火山引擎 / Coze / Terraform / SQL 等工具具体写出；认证写颁发机构 + 年份。' }
        ]
      }
    ],
    tips: '一份好简历的标准：HR 看 30 秒能"决定是否给面试"，技术经理看 1 分钟能"决定问什么问题"。永远站在读者角度修改，不是站在自己角度炫耀。'
  },

  {
    id: 'i3',
    videoQueries: ['售前面试 行为题', 'STAR 法则 面试', '压力面试 应对'],
    title: 'C03 · 自我介绍',
    summary: '准备 30 秒 / 1 分钟 / 3 分钟三个版本，按场景切换',
    duration: '约 20 分钟',
    objectives: [
      '掌握 SCQA 风格的自我介绍结构',
      '准备 3 个长度版本（30 秒 / 1 分钟 / 3 分钟）',
      '能在 5 秒内说出"我是谁 + 凭什么"',
      '识别自我介绍的常见 8 个雷区'
    ],
    sections: [
      {
        title: '一、为什么自我介绍这么关键',
        keypoints: [
          { title: '"5 分钟黄金法则"', body: '面试前 5 分钟决定面试官对你的印象——而前 60 秒由你的自我介绍决定；后面问什么、怎么问，都被这一段塑造。' },
          { title: '不是"念简历"', body: '面试官手里有简历——你照着读他立即会走神；自我介绍是"重新挑选 3 个亮点+加 1 个故事"。' },
          { title: '为面试官"埋钩子"', body: '故意留 1-2 个有趣但不展开的点（"3 个月推动签约 800 万的过程其实有个意外转折"）——他自然会追问，把面试拉到你舒适区。' }
        ]
      },
      {
        title: '二、3 个长度版本',
        keypoints: [
          { title: '30 秒版（电梯演讲）', body: '"我是 X，5 年云售前，主导金融行业 8 个项目累计签约 6000 万；最近一年聚焦 AI + 信创替代场景。今天来火山引擎是看好原生 AI 这个差异化壁垒。"——3 句话讲完。' },
          { title: '1 分钟版（标准开场）', body: '在 30 秒版上加：① 你最自豪的 1 个项目（2 句）；② 你下一阶段的目标（1 句）；③ 为什么是这家公司（1 句）。共 6-7 句。' },
          { title: '3 分钟版（深度面）', body: '加：教育/转型背景（30 秒）+ 1 个完整 STAR 故事（90 秒）+ 自我评价 2 个关键词（30 秒）+ 期待与提问（30 秒）。注意"3 分钟"是 3 分钟——不能拖到 5 分钟。' }
        ]
      },
      {
        title: '三、SCQA 结构应用',
        keypoints: [
          { title: 'S 现状', body: '你现在的角色 + 1 句业务画像。"我目前是某互联网售前，主要面向中型电商客户。"' },
          { title: 'C 矛盾 / 转折', body: '为什么这次找新机会。"过去一年 AI 业务高速增长，我意识到现有公司在 AI 产品矩阵上不够强，希望去原生 AI 领先的厂商。"' },
          { title: 'Q 问题 / 期待', body: '你想解决什么 + 想成长什么。"希望参与豆包大模型 ToB 落地——这是行业稀缺机会。"' },
          { title: 'A 你为什么合适', body: '用一句"过去成绩 + 可迁移能力"收尾。"过去 3 年我在客户侧把 AI 推荐从 PoC 推到生产，正是这个岗位需要的能力。"' }
        ]
      },
      {
        title: '四、8 个常见雷区',
        keypoints: [
          { title: '雷区 1：照念简历', body: '解药：自我介绍只讲简历上"看不到的"——动机、个性、转折、热情。' },
          { title: '雷区 2：从小学讲起', body: '解药：除非是应届生，重点放最近 3 年；早期一笔带过。' },
          { title: '雷区 3：名词堆砌', body: '"懂 K8s/Istio/Prometheus/OpenTelemetry/Argo CD"——面试官记不住；改成 1 个项目里你怎么用了这些工具解决问题。' },
          { title: '雷区 4：只讲"我们"不讲"我"', body: '"我们团队完成了"——你做了什么？必须有"我"——决策点、动作、贡献。' },
          { title: '雷区 5：避谈失败', body: '解药：面试官如果听到"一直一帆风顺"会怀疑你成长；准备 1 个"我曾经犯过 X 错，从中学到 Y"。' },
          { title: '雷区 6：开场低头/手机', body: '抬头、目光接触、笑容；身体姿态决定声音状态——含胸的人声音也会含混。' },
          { title: '雷区 7：超时', body: '面试官问"做个简短自我介绍"——超过 90 秒就尴尬；问"详细介绍下"——3-4 分钟封顶。' },
          { title: '雷区 8：背太死', body: '解药：背骨架（5-6 个段落标题），具体语句每次现场组织——这样不会卡顿但又自然。' }
        ]
      }
    ],
    tips: '自我介绍的目标只有 1 个：让面试官在你说完后想接着追问 3 个问题。如果他听完愣住、问"还有吗"——说明你要重写。'
  },

  {
    id: 'i4',
    videoQueries: ['大模型 面试题', '云原生 面试题', 'Kubernetes 面试题'],
    title: 'C04 · STAR 行为面试',
    summary: '掌握 STAR 模型 + 10 道高频行为题的标准答题模板',
    duration: '约 30 分钟',
    objectives: [
      '深度掌握 STAR 模型的 4 个组成部分',
      '准备 10 个高频行为题的个性化答案',
      '识别行为面的"陷阱题"——失败/冲突/弱点',
      '让答案具备数字、对比、反思三大要素'
    ],
    sections: [
      {
        title: '一、STAR 模型详解',
        keypoints: [
          { title: 'S 情境（Situation）', body: '20 秒内交代背景：什么公司、什么客户、什么项目、当时的难点；不要花 1 分钟讲背景——面试官会失去耐心。' },
          { title: 'T 任务（Task）', body: '10-15 秒说清你的角色与目标："我作为售前组长负责 3 个金融客户、年度签约目标 1500 万"。一句话讲清"你要干什么"。' },
          { title: 'A 行动（Action）', body: '60-90 秒——这是核心；说清你做了什么决策、什么动作；用第一人称"我"；列 3-5 个关键动作而非流水账。' },
          { title: 'R 结果（Result）', body: '20-30 秒：用数字呈现结果——签约金额、客户满意度、效率提升、成本下降；最后加 1 句"我从中学到 X"。' }
        ]
      },
      {
        title: '二、10 道高频行为题（一）：成就/挑战类',
        keypoints: [
          { title: 'Q1：你最自豪的一个项目', body: '答题点：选签约金额大或难度高的项目；S 背景 → A 你主导的关键决策（如改方案、调价格）→ R 结果（数字+客户口碑）；不超过 3 分钟。' },
          { title: 'Q2：你做过最难的方案', body: '答题点：选有"反转"的项目——一开始客户拒绝/友商抢单/突发预算砍半，最终你怎么逆转。展现"在压力下的决策"。' },
          { title: 'Q3：失败 / 教训', body: '答题点：选"非致命但教训深"的——丢了一个单/方案被毙/客户投诉；重点不是讲失败，是"我从这里学到了 X 并在后来 Y"。完全说没失败 = 减分。' }
        ]
      },
      {
        title: '三、10 道高频行为题（二）：协作/冲突类',
        keypoints: [
          { title: 'Q4：和同事冲突如何处理', body: '答题点：选与销售/产品/交付的"职责边界"冲突；S → A（主动沟通+找数据）→ R（双方达成共识 + 项目按期完成）。展现"对事不对人"。' },
          { title: 'Q5：上司不认可你的方案', body: '答题点：不要"硬刚"也不要"全屈服"；展现"先理解对方、再用数据说服、最终结合"。售前最看重这种"政治智商"。' },
          { title: 'Q6：跨部门拉通经历', body: '答题点：售前必须跨研发/交付/法务/财务；选 1 个推过比较难的事（如 SLA 条款谈判），讲清你怎么主导沟通节奏。' },
          { title: 'Q7：带过新人 / 实习生', body: '答题点：即使没正式带——选过往帮过同事的事；"师徒制 / 周复盘 / 让新人独立 own 1 个小客户"——展现 leadership。' }
        ]
      },
      {
        title: '四、10 道高频行为题（三）：发展/动机类',
        keypoints: [
          { title: 'Q8：3 年规划', body: '答题点：先讲短期（1 年深耕岗位）→ 中期（2-3 年成专家或 leader）→ 长期（5 年想成为什么样的人）；与公司发展挂钩才加分。' },
          { title: 'Q9：你的弱点 / 短板', body: '答题点：禁选"工作太拼"等假短板；选"过去某具体短板（如不善言辞/经验偏单一行业）+ 已采取的改进措施 + 成果"。展现自我觉察。' },
          { title: 'Q10：为什么离开 / 选我们', body: '答题点：离开——讲"想做更有挑战性的事"，不要骂前公司；选我们——具体到某个产品/某个业务/某个文化标签，体现你做过功课。' }
        ]
      },
      {
        title: '五、行为面的"3 个加分要素"',
        keypoints: [
          { title: '数字', body: '"提升 30%""签约 800 万""6 个月""5 人团队"——任何能数字化的都数字化；模糊话术 = 减分。' },
          { title: '对比', body: '"原本月度签约 200 万、改进后 500 万""友商方案报价 1500 万、我方 1100 万但 SLA 更高"——对比让贡献立体化。' },
          { title: '反思', body: '每个故事最后加 1 句"我从中学到 X"——展现成长心态；面试官最怕雇"自己觉得很完美"的人。' }
        ]
      }
    ],
    tips: '每个候选人至少准备 6-8 个 STAR 故事——最好的 3 个 + 备用 3-5 个；面试官无论问什么，你都能从故事池里"借"一个改造来回答。临场编 = 灾难。'
  },

  {
    id: 'i5',
    videoQueries: ['售前 Case 题', '方案设计 面试', '架构设计 面试题'],
    title: 'C05 · 技术深问应对',
    summary: '云/AI/产品高频技术题分类与"答主线 + 留细节"答题策略',
    duration: '约 30 分钟',
    objectives: [
      '建立云、AI、产品三类技术题的答题框架',
      '掌握"先框架后细节"的层次化表达',
      '准备 15+ 高频技术题的标准答案',
      '学会处理"不会"问题——承认 + 推理 + 类比'
    ],
    sections: [
      {
        title: '一、技术深问的 3 大套路',
        keypoints: [
          { title: '套路 1：从概念问到细节', body: '"什么是 K8s" → "Pod 调度怎么工作" → "etcd 挂了会怎样" → "如何排障"。考察知识链的深度——能追到第 3 层即合格。' },
          { title: '套路 2：从场景问设计', body: '"客户日 1 亿订单要存哪里"——考的不是单一产品；要从访问模式（OLTP/OLAP）→ 一致性 → 成本 → 灾备综合答。' },
          { title: '套路 3：从你的项目反问', body: '"你简历写用了 ByteHouse——给我画一下当时的架构"。陷阱：如果不是你做的或细节模糊，立刻露馅。简历不写没经历的内容。' }
        ]
      },
      {
        title: '二、云基础高频题（5 题）',
        keypoints: [
          { title: 'Q：什么是 VPC？子网怎么划分？', body: '答：VPC 是租户云上逻辑隔离网络（独立 CIDR/路由）。子网划分按"业务+环境"切，每 AZ 一个子网，预留 50% 给未来扩容。提"建议主 VPC 用 10.0.0.0/16"加分。' },
          { title: 'Q：99.95% SLA 怎么实现？', body: '答：99.95% = 年不可用 4.4 小时；架构上需"跨 AZ 部署 + 多活 + 健康检查 + 自动故障转移"；数据库主备 RPO 秒级、RTO 分钟级。' },
          { title: 'Q：MySQL 性能瓶颈如何优化？', body: '答：4 步——慢查询日志 + EXPLAIN 看执行计划 → 加索引 → 读写分离 → 分库分表/换 NewSQL。80% 问题在前两步解决。' },
          { title: 'Q：缓存穿透怎么解决？', body: '答：穿透是查不存在的 Key 一直打 DB；对策：Bloom Filter 过滤已知不存在 / 缓存空值（短 TTL）。补一句"击穿用互斥锁、雪崩用 TTL 加随机"展全景。' },
          { title: 'Q：什么是云原生？', body: '答："为云而生的架构"——12-Factor + 容器 + 微服务 + DevOps + 可观测；不只是"上云"。CNCF 是事实标准生态。' }
        ]
      },
      {
        title: '三、AI 大模型高频题（5 题）',
        keypoints: [
          { title: 'Q：RAG vs 微调如何选？', body: '答：知识时效性问题用 RAG（更新文档即可）；格式/风格问题用微调；通常组合用：Prompt 兜底 + RAG 注入事实 + LoRA 调风格。' },
          { title: 'Q：LLM 幻觉怎么防', body: '答：4 层防御——① Prompt 加约束（"只用提供材料"）；② RAG 注入事实；③ 输出后做内容审核 / 二次验证；④ 关键场景人工兜底。' },
          { title: 'Q：豆包和 GPT/Claude 比有什么差异', body: '答：① 中文场景训练语料更对路；② 数据合规可承诺不入训练池；③ 一站式（方舟+Coze+veMLP）；④ 国内合规过审更顺。不抹黑友商。' },
          { title: 'Q：大模型推理如何优化？', body: '答：3 板斧——量化（FP16→INT8 速度 2-4x）+ KV Cache 缓存 + 连续批处理（vLLM/TensorRT-LLM）；典型 7B 模型 A10 上 ~50 tokens/s。' },
          { title: 'Q：Agent 与 Function Call 的关系', body: '答：Function Call 是模型"会调工具"的能力；Agent 是用 Function Call + Memory + 规划循环起来；ReAct/Plan-Execute 是 Agent 的两种模式。' }
        ]
      },
      {
        title: '四、产品/架构高频题（5 题）',
        keypoints: [
          { title: 'Q：客户日 1 亿订单方案设计', body: '答：先分层——OLTP（veDB MySQL 写入）+ 缓存（Redis Cluster）+ 消息队列（Kafka 解耦）+ 实时分析（ByteHouse）+ 离线（LAS）。架构图 + 容量估算 + 灾备 3 段讲。' },
          { title: 'Q：如何设计跨 region 灾备？', body: '答：RPO/RTO 决定方案——RPO 秒级用同步复制（跨 AZ）；RPO 分钟用异步复制（跨 region）；金融两地三中心；互联网异地多活。' },
          { title: 'Q：如何为客户做 TCO 测算？', body: '答：3-5 年视角；科目=硬件折旧+机房（电+冷+带宽）+许可+人员+隐性；按客户实际负载（不是云厂商模板）；提示考虑迁移人力。' },
          { title: 'Q：客户问"上云会不会数据被你们用了"', body: '答：① 合同明确数据归客户、云厂商不得二次使用；② 火山方舟可承诺 API 不入训练池；③ 私有部署可选；④ 加密 + IAM 客户自管。' },
          { title: 'Q：你怎么和友商比', body: '答：先问客户最在意什么；用客观数据 + PoC 让数字说话；不抹黑友商；强调差异化（如原生 AI、视频云、字节同款）。' }
        ]
      },
      {
        title: '五、不会的题怎么答',
        keypoints: [
          { title: '不会硬撑 = 双倍减分', body: '面试官 80% 能听出来你在编；编错一个细节，整段加分清零。' },
          { title: '"3 句话承认法"', body: '"这个细节我不熟悉" + "我大概知道方向是 X" + "如果我去做我会先 Y 再 Z"——既诚实又展示思维。' },
          { title: '类比迁移', body: '"我没用过 BMQ，但用过 Kafka——它们都是分布式消息队列；我猜 BMQ 在存算分离上做了优化"——能被原理打通的，承认 + 类比加分。' },
          { title: '问回去', body: '"这个题在贵司是怎么考虑的？"——把面试官变成"分享者"是高级技巧；但只能用 1-2 次，多了显得没准备。' }
        ]
      }
    ],
    tips: '技术面的真正考点不是"你知不知道"，是"你思考问题的方式"。一个 5 分熟悉但思路清晰的候选人，胜过一个 9 分熟悉但答得乱的候选人。'
  },

  {
    id: 'i6',
    videoQueries: ['客户角色扮演 面试', '售前模拟客户对话', '销售场景演练'],
    title: 'C06 · 方案设计题（Case 面）',
    summary: '15-30 分钟内完成"客户场景 → 架构设计 → 商业表达"全链路',
    duration: '约 30 分钟',
    objectives: [
      '掌握"3-2-1 法则"做 Case 题的结构化答题',
      '能在 15 分钟内画出含 5-7 个组件的架构图',
      '把技术方案翻译成"业务+成本+风险"3 段商业表达',
      '准备 3 个典型场景的"模板答案"'
    ],
    sections: [
      {
        title: '一、Case 题的"3-2-1 法则"',
        keypoints: [
          { title: '3 分钟澄清问题', body: '听完题目立刻问 3 类问题：① 业务规模（QPS/数据量/用户数）② 关键约束（合规/预算/团队）③ 时间窗（多久要上线）。不澄清就开画 = 自杀。' },
          { title: '2 段画图说明', body: '边画边讲——"用户从 CDN 进 → 经 ALB 分发 → 走微服务 → 命中缓存或落 DB"；说完一句画一个组件；不要先画完再讲。' },
          { title: '1 分钟商业总结', body: '收尾必须含：成本（量级）+ 关键风险（1-2 个）+ 实施节奏（分阶段）。让面试官看到你不只是技术，还有商业感。' }
        ]
      },
      {
        title: '二、典型场景 1：电商秒杀',
        keypoints: [
          { title: '业务画像', body: '日常 10 万 QPS，秒杀峰值 100 万 QPS（10x 突发）；客单价 200 元；3-5 秒成交；强一致库存。' },
          { title: '架构要点', body: '前端：CDN+静态页静态化；入口：ALB+WAF+CC 防护；服务：VKE 弹性扩到 1000 Pod；缓存：Redis Cluster 预热库存；DB：veDB MySQL+本地缓存+异步落单。' },
          { title: '关键设计', body: '① 库存"扣减"先打 Redis 再异步入库 ② 限流：令牌桶按用户 ID ③ 用消息队列削峰 ④ 提前 30 分钟弹性扩容预热。' },
          { title: '商业表达', body: '"秒杀 1 小时成本约 X 万；峰值过后 30 分钟内自动缩到日常容量；建议先做 1 次小规模演练再正式上。"' }
        ]
      },
      {
        title: '三、典型场景 2：金融实时风控',
        keypoints: [
          { title: '业务画像', body: '日 1000 万笔交易，单笔风控决策 <50ms；规则 200+ 条；历史数据 5 年共 200 亿条；监管要求等保三级。' },
          { title: '架构要点', body: '入流：Kafka 接收交易 → Flink 实时特征 → ByteHouse 实时画像查询 → 规则引擎 + AI 模型综合决策 → 返回风控结果。' },
          { title: '关键设计', body: '① 决策必须 <50ms：用 Redis 存高频特征 + 模型本地推理 ② 5 年数据用 LAS 湖仓 ③ 等保三级走金融云专属基座 ④ 全链路日志归档 6 年。' },
          { title: '商业表达', body: '"相比传统规则引擎风控，AI+实时特征预计提升通过率 3-5%、漏判率下降 30%；ROI 在 12 个月回本。"' }
        ]
      },
      {
        title: '四、典型场景 3：AI 智能客服',
        keypoints: [
          { title: '业务画像', body: '客户某连锁酒店，日均 5000 客服工单；现有客服 30 人；想 AI 自动化 70%、人力降一半；保护客户数据。' },
          { title: '架构要点', body: 'Coze 主 Agent + 豆包 Pro + 知识库（方舟 RAG，所有产品/政策文档）+ 工具：订单/会员系统 API + 飞书坐席接入 + TLS 留档。' },
          { title: '关键设计', body: '① 高频简单问题（房型/政策）AI 直接答 ② 投诉/退款转人工 ③ 人工答完反哺训练 ④ 数据不入训练池可承诺。' },
          { title: '商业表达', body: '"30 天 PoC（10 万）+ 60 天上线（80 万）+ 年订阅（120 万）；预计 6 个月人力降 40%、客户满意度 +10。投资回收 14 个月。"' }
        ]
      },
      {
        title: '五、Case 面的 5 个加分动作',
        keypoints: [
          { title: '把客户痛点说在嘴上', body: '"客户最大的痛是 X、第二是 Y"——开篇就把"以客户为中心"立起来；面试官立刻给好评。' },
          { title: '画结构图', body: '哪怕是白板/纸上——视觉化让面试官跟得上你；只用嘴讲 = 抽象 = 减分。' },
          { title: '给 2 个备选方案', body: '"方案 A 性能最佳但成本高；方案 B 成本可控但需要 Redis 预热——我推荐 A 因为客户预算允许"——展现取舍能力。' },
          { title: '主动谈风险', body: '"这个方案有 1 个风险——XXX；缓解措施 YYY"——主动提风险 = 成熟；面试官最怕"什么都好"的人。' },
          { title: '给实施路线图', body: '"前 30 天 PoC，后 60 天上线，第 90 天扩展功能"——把方案"产品化"，不只是技术堆砌。' }
        ]
      }
    ],
    tips: 'Case 题考的不是"答案对错"——根本没有标准答案；考的是"你的思维过程是不是结构化、是不是接地气、是不是有商业感"。同一道题 5 个候选人 5 个答法，但只有结构化的会被选中。'
  },

  {
    id: 'i7',
    videoQueries: ['面试反问 怎么问', '结构化面试 反问环节'],
    title: 'C07 · 角色扮演与压力面',
    summary: '现场扮演售前对真实客户场景；处理刁钻提问与突发压力',
    duration: '约 25 分钟',
    objectives: [
      '在 10-15 分钟角色扮演中完成 SPIN 提问 + 异议处理',
      '应对 5 类典型压力面（贬低/否定/打断/沉默/陷阱）',
      '保持节奏——不被面试官带跑',
      '掌握"承认局限 + 寻求协作"的高情商话术'
    ],
    sections: [
      {
        title: '一、角色扮演的"4 步法"',
        keypoints: [
          { title: '第 1 步：开场建立信任（30 秒）', body: '"X 总您好，今天感谢抽时间——我先简单介绍下今天计划：先了解贵司情况 5 分钟，我再针对性给思路 10 分钟，最后留时间答疑。" 把节奏抓在自己手里。' },
          { title: '第 2 步：SPIN 挖痛点（5 分钟）', body: '严格按 Situation→Problem→Implication→Need-Payoff 推进；让客户自己说出"如果不解决会怎样"；这是成单基础。' },
          { title: '第 3 步：方案+案例（5 分钟）', body: '不要一上来讲产品；先讲一个"同行业类似客户"的故事，再说"基于您刚才说的，我建议这个方向"。案例 > 产品手册。' },
          { title: '第 4 步：试探+下一步（2 分钟）', body: '"基于今天的沟通，下一步是 PoC 还是出方案 PPT，您建议哪个节奏？"——把球抛给客户做"小决策"，比直接 close 容易 5 倍。' }
        ]
      },
      {
        title: '二、5 类压力面应对',
        keypoints: [
          { title: '压力 1：贬低 / 否定', body: '"你这方案不行/我们不需要/你水平不够"——面试官故意激你；解药：不辩解，先问"具体哪部分让您觉得不行"——把对方拉回事实。' },
          { title: '压力 2：连续打断', body: '"等下、不对、再说一遍"——考你节奏控制；解药：停 2 秒，平静地说"我理解您的意思，让我先把这一段说完，然后听您指正"。' },
          { title: '压力 3：长时间沉默', body: '说完一段——面试官不接、盯着你；很多人会慌乱补话；解药：你也保持沉默，等他说话；先慌的是面试官。' },
          { title: '压力 4：陷阱选择题', body: '"你认为 A 还是 B"——往往两个都不好；解药：跳出框架——"在 X 场景下选 A，在 Y 场景下选 B；您具体场景是什么"。' },
          { title: '压力 5：让你"批评"前公司或同行', body: '陷阱：贬低别人 = 暴露格局小；解药：客观评价好的部分，再说自己的一两个观察；不要骂人。' }
        ]
      },
      {
        title: '三、SPIN 实战话术（金融客户场景）',
        keypoints: [
          { title: 'Situation', body: '"X 总，能简单介绍一下现在核心业务系统的架构吗？比如核心交易库现在是什么数据库、哪个版本、撑多少 TPS？"' },
          { title: 'Problem', body: '"那这套架构当前最让您头痛的问题是什么？是性能、成本、人员、还是合规压力？"' },
          { title: 'Implication', body: '"假如这个问题继续 1-2 年不解决，对业务会是什么影响？是不是会限制新业务上线、或者监管检查不过关？"' },
          { title: 'Need-Payoff', body: '"如果有一个方案能在 6 个月内解决这个问题、同时 TCO 下降 40%，您觉得对您团队和业务的价值有多大？"' },
          { title: '收口', body: '听完客户回答，立刻接："基于您刚才提到的——某城商行用 veDB PG 做信创替代——他们 6 个月完成迁移、5 年 TCO 节省 3000 万。我把他们案例发您参考？"' }
        ]
      },
      {
        title: '四、异议处理 7 步法实战',
        keypoints: [
          { title: '客户异议："你们价格太贵"', body: '步骤：①倾听完整理由 ②"我理解预算压力——具体是和谁比觉得贵" ③"和某友商比是 X，但我们的 SLA 是 Y" ④给"分阶段付费"或"配置裁剪"方案。' },
          { title: '客户异议："你们没有金融案例"', body: '步骤：①承认"金融案例确实在累积中" ②举其他高合规行业（汽车/政企）类比 ③主动提出"愿意做免费 PoC、签数据保密、共建标杆案例"换信任。' },
          { title: '客户异议："我们已经用阿里云了"', body: '步骤：①不否定阿里云 ②"多云已成常态" ③"我们 AI 和视频是差异化点" ④建议小范围试点，对数据说话。' },
          { title: '客户异议："决策权在领导那"', body: '步骤：①不催客户 ②"完全理解，您建议我下一步如何配合您"——把客户变成你的"内部代言人"，邀请他帮你设计方案策略。' }
        ]
      }
    ],
    tips: '角色扮演的最高境界——面试官扮演的客户最后说"X 总今天聊得很愉快，下次还想聊聊"。这意味着你不是在"答题"，是真的在"做销售"——这种状态会让你在所有候选人里脱颖而出。'
  },

  {
    id: 'i8',
    videoQueries: ['薪资谈判 技巧', 'Offer 谈判 工程师', '对标拉薪资'],
    title: 'C08 · 反问环节（你问面试官）',
    summary: '8 个高质量反问，让面试官记住你 + 主动获取关键信息',
    duration: '约 15 分钟',
    objectives: [
      '理解"反问"是面试的"二次答题机会"',
      '准备 8 个分层级（HR / 技术 / 总监 / 高管）的反问',
      '识别"问什么会减分"的雷区',
      '通过反问反向评估这家公司值不值得加入'
    ],
    sections: [
      {
        title: '一、为什么反问环节这么重要',
        keypoints: [
          { title: '它是"二次答题"', body: '面试官最后问"你有什么问题"——你的反问质量直接体现思考深度；问得平庸 = 印象分回落；问得精彩 = 关键加分。' },
          { title: '它是"双向选择"信号', body: '不反问 / 问废话 = "你不挑"——面试官心理：这候选人没有标准；好候选人都对加入哪家很慎重。' },
          { title: '它是"获取关键信息"的窗口', body: '团队真实情况、业务真实数字、加班强度、晋升通道——很多在 JD 看不到的，靠反问问出来。' }
        ]
      },
      {
        title: '二、对 HR 的 2 个反问',
        keypoints: [
          { title: 'Q1：这个岗位的 OKR / KPI 是怎么衡量的？', body: '价值：摸清考核口径——是签约金额、客户满意度、还是项目数？避免入职后才发现考核与你预期完全不一致。' },
          { title: 'Q2：上一个 / 上几个做这个岗位的人，目前在哪里？', body: '价值：流失率信号——如果"两年内换了 3 个人"——这岗位有坑；HR 的回答含糊也是信号。' }
        ]
      },
      {
        title: '三、对技术经理的 2 个反问',
        keypoints: [
          { title: 'Q3：团队当前最大的技术挑战是什么？', body: '价值：判断你能否解决——若答案是"K8s 还没普及"——你刚好擅长，加分；若是"业务方需求太多"——可能是组织问题，要警惕。' },
          { title: 'Q4：售前与产品 / 销售 / 交付的协作机制是怎样的？', body: '价值：摸清"售前在公司里有没有话语权"；若售前只是"销售附属"——你成长空间有限；若有方案中心 / 售前架构师阶梯——成长空间大。' }
        ]
      },
      {
        title: '四、对总监 / 业务负责人的 2 个反问',
        keypoints: [
          { title: 'Q5：这个团队 / 业务未来 1-2 年的核心战略是什么？', body: '价值：摸清业务方向是否值得加入——是"高速扩张"还是"维稳"？是"主航道"还是"创新边缘"？决定 3-5 年成长。' },
          { title: 'Q6：您理想中的售前是什么样的？过去 1 年表现最好的售前做对了什么？', body: '价值：摸清晋升标准——既能听到具体行为，也让面试官想起"对，就是这样的人"——他会潜意识把你和他想要的人对应起来。' }
        ]
      },
      {
        title: '五、对高管 / 跨部门的 2 个反问',
        keypoints: [
          { title: 'Q7：公司最近 1 年面临的最大挑战是什么？', body: '价值：高管视角——你能听到行业趋势 + 公司战略；这种问题会让高管认真对待你，因为很少候选人这么问。' },
          { title: 'Q8：您当初为什么加入这家公司？现在还会选它吗？', body: '价值：高情商——让对方思考自己；常常获得"实话实说"的回答——比公关稿真实 100 倍。' }
        ]
      },
      {
        title: '六、5 个"减分反问"必避',
        keypoints: [
          { title: '减分 1：薪资范围多少？', body: '在终面前问 = 表明你只关心钱；薪资在 HR 谈 Offer 阶段问，前面留白。' },
          { title: '减分 2：加班多吗？', body: '考察你抗压度的负面信号；想问可改成"团队的工作节奏一般是什么样"。' },
          { title: '减分 3：能不能 WFH？', body: '现在多是混合制——直接问意味着"你想偷懒"；入职谈条件再说。' },
          { title: '减分 4：我什么时候能升职？', body: '面试还没结果就问晋升 = 浮躁；改成"晋升路径一般是什么"——更稳重。' },
          { title: '减分 5：网上能搜到的问题', body: '"贵公司主要做什么"——查 JD/官网 5 分钟就有；这类问题暴露你没做功课。' }
        ]
      },
      {
        title: '七、用反问反向评估公司',
        keypoints: [
          { title: '听"是否回避"', body: '当你问 OKR / 流失率 / 业务挑战，面试官回避或敷衍——大概率有问题；正面回答的公司可信度高。' },
          { title: '听"是否一致"', body: 'HR 说"轻松"、技术经理说"经常加班"——内部信息不一致，公司管理混乱。' },
          { title: '听"是否数字化"', body: '问"团队多少人"——回答清晰 = 健康；含糊带过 = 团队小或不稳定。' },
          { title: '听"对你是否有兴趣"', body: '面试官说"你有什么计划"——他在为你后续做铺垫；说"我们再看其他候选人"——你大概率挂了。' }
        ]
      }
    ],
    tips: '反问 = 你的"复试卷"。提前准备 12-15 个问题——按面试官身份分层，按面试节奏挑 2-4 个问；问题质量比数量重要，问 1 个深的胜过问 3 个浅的。'
  },

  {
    id: 'i9',
    videoQueries: ['售前面试 50题', '销售面试 真题'],
    title: 'C09 · 薪资与 Offer 谈判',
    summary: '理解 P 级体系 / 谈判节奏 / 高情商话术，避免少拿 30% 薪水',
    duration: '约 25 分钟',
    objectives: [
      '理解云厂商售前的 P 级 / M 级薪资分布',
      '掌握"先了解 Offer 全貌再谈数字"的节奏',
      '能用 5 个高情商话术提涨薪',
      '识别 Offer 里的 4 类隐藏陷阱'
    ],
    sections: [
      {
        title: '一、云厂商售前的薪资分层',
        keypoints: [
          { title: 'P5/T5 级（初级售前）', body: '工作 1-3 年；年包 30-50 万（一线城市）；主要做方案撰写、客户调研支持；考核以参与项目数为主。' },
          { title: 'P6/T6 级（中级 / 主任售前）', body: '工作 3-6 年；年包 50-90 万；独立 own 中型客户；考核含签约金额。' },
          { title: 'P7/T7 级（高级 / 资深售前）', body: '工作 6-10 年；年包 90-150 万；行业专家方向；考核含战略客户业绩。' },
          { title: 'P8+ / 售前总监', body: '工作 10 年+；年包 150-300 万+；带团队、签千万级项目；股权激励占比上升。' },
          { title: '常见结构', body: '基本 + 绩效奖金（20-40% 浮动）+ 股票/期权（4 年归属）+ 福利（13-16 月薪、补贴）；签字费（Sign-on）头部公司常给。' }
        ]
      },
      {
        title: '二、谈薪节奏的 4 个阶段',
        keypoints: [
          { title: '阶段 1：HR 初筛（不报具体数字）', body: '回答："期望与目前持平、并有合理涨幅；具体看 Offer 整体结构。"——避免被"锚定"低数字。' },
          { title: '阶段 2：技术面 / 业务面（不谈钱）', body: '关注：能力匹配、文化契合；钱的话题留给 HR——技术经理给不出最终数字。' },
          { title: '阶段 3：终面后 HR 复议', body: 'HR 会问"期望薪资"——此时给一个区间："期望 X-Y 万年包"，区间宽度 20-30%；同时重申"看整体结构（基本/绩效/股票/签字费）"。' },
          { title: '阶段 4：Offer Letter 出来谈细节', body: '这是真正的谈判时刻——细抠每一项；"竞品公司给了 Z，希望贵司能优化"是合规话术；不要谎报有 Offer。' }
        ]
      },
      {
        title: '三、5 个高情商谈薪话术',
        keypoints: [
          { title: '话术 1：先肯定再提诉求', body: '"非常感谢这份 Offer，对贵司业务和团队都很认可。基本符合我的预期，但有几个点希望进一步沟通。"——让 HR 听得进去。' },
          { title: '话术 2：用市场数据撑腰', body: '"根据看准 / 拉勾 / Levels.fyi，这个级别这个城市的 P50 在 X，P75 在 Y；我希望能到 P75 因为我有 Z 的差异化经验。"' },
          { title: '话术 3：拆开谈每一项', body: '"基本工资 OK；绩效系数比预期低 5%；股票批次能否调整为前置——这样综合年化更接近预期。"' },
          { title: '话术 4：用"长期承诺"换"短期数字"', body: '"如果今年绩效达成 OKR，明年回看能否提前晋升 / 调薪？"——给公司锁人理由，自己也有奔头。' },
          { title: '话术 5：要 Sign-on 补离职损失', body: '"我离职会损失年终 10 万——希望贵司给等额签字费补偿。"——这个理由 HR 通常会买单。' }
        ]
      },
      {
        title: '四、4 类 Offer 陷阱',
        keypoints: [
          { title: '陷阱 1：浮动比例过高', body: '"基本工资 30 万 + 浮动奖金最高可达 40 万"——浮动 = 不确定；问清楚"过去 3 年实际拿到比例多少"。' },
          { title: '陷阱 2：股票"成熟期"长', body: '"股票 X 万元——4 年归属、第 1 年悬崖期"——意味着第 1 年你 1 股没有；如果一年内你离职，股票全没。' },
          { title: '陷阱 3：竞业限制范围过广', body: '部分大厂竞业范围广 + 时长 1-2 年 + 补偿比例低；签前看清条款；竞业期补偿建议 50%+ 月薪。' },
          { title: '陷阱 4：Offer 与口头承诺不一致', body: '"HR 说会给 Sign-on——Offer 里没写"——一切以 Offer 书面为准；任何口头承诺都要求"加入 Offer 或邮件确认"。' }
        ]
      },
      {
        title: '五、谈判禁忌',
        keypoints: [
          { title: '禁忌 1：撒谎说有 Offer', body: 'HR 圈很小——一个电话就能查到；一旦被发现，立即取消所有沟通，且行业内永远拉黑。' },
          { title: '禁忌 2：开口就要求高 50%+', body: '合理涨幅 20-30%；高于 50% 需要有"职级跳跃"或"行业转换"等强理由；漫天要价 = 不专业。' },
          { title: '禁忌 3：威胁"不给就走"', body: '强硬态度 = 关系破裂；改成"我希望能拿到 X，否则可能要再权衡"——同样是表达底线，但留余地。' },
          { title: '禁忌 4：拖延 Offer 决策', body: '一般给 3-5 个工作日；过期不回复 = 默认拒绝；如要加时间，主动告知 HR 真实原因。' }
        ]
      }
    ],
    tips: '薪资谈判的核心心态：你不是在"求"工作——双方在做"商业合作"。准备充分、保持礼貌、用数据说话；优秀的候选人和好的 HR 谈完都能达成"双赢"。'
  },

  {
    id: 'i10',
    videoQueries: ['售前面试 复盘', '面试反馈 怎么做'],
    title: 'C10 · 模拟面试题库（50+ 高频题）',
    summary: '5 大类共 50+ 高频题，每题给"答题要点 + 模板答案"，反复练习',
    duration: '约 40 分钟',
    objectives: [
      '熟悉 5 大类高频题的分布与频率',
      '每类挑 3-5 题用"自己的故事"练答',
      '识别"陷阱题"的设计意图',
      '形成自己的答题风格而非死记硬背'
    ],
    sections: [
      {
        title: '一、自我类高频题（10 题）',
        keypoints: [
          { title: 'Q1：做个简短自我介绍', body: '要点：30-90 秒；不念简历；用 SCQA。' },
          { title: 'Q2：你最大的优势是什么', body: '要点：选岗位最需要的 1 个优势 + 1 个具体故事支撑；如"商业敏感度——某项目我提前发现客户预算紧、调价方案最终签下"。' },
          { title: 'Q3：你最大的不足是什么', body: '要点：选具体的、非致命的；说明已采取的改进；忌"工作太拼"等假短板。' },
          { title: 'Q4：3 年规划是什么', body: '要点：与岗位/公司方向挂钩；短期/中期/长期分层。' },
          { title: 'Q5：你最自豪的一件事', body: '要点：选最有数字、有反转、有学习的项目；用 STAR。' },
          { title: 'Q6：你最遗憾 / 失败的一件事', body: '要点：选有教训但非致命的；重点放"我学到了什么"。' },
          { title: 'Q7：你的同事 / 老板会怎么评价你', body: '要点：选 2-3 个具体特质 + 1 个事例支撑；不要全是"沟通好"。' },
          { title: 'Q8：你为什么离开上家', body: '要点：不骂前公司；用"想做更有挑战的事"+ 具体方向。' },
          { title: 'Q9：为什么选我们公司', body: '要点：具体到产品/业务/文化；体现你做过功课。' },
          { title: 'Q10：你的职业兴趣 / 热情是什么', body: '要点：与岗位有关；最好能讲出业余时间投入（开源贡献、技术博客、社群活动）。' }
        ]
      },
      {
        title: '二、技术 / 产品类高频题（12 题）',
        keypoints: [
          { title: 'Q11：什么是 IaaS / PaaS / SaaS', body: '要点：举例对比；IaaS（ECS）/ PaaS（veDB）/ SaaS（飞书/Coze）。' },
          { title: 'Q12：什么是 K8s 及其核心组件', body: '要点：控制面 4 件套（API Server/etcd/Scheduler/Controller）；数据面（kubelet/kube-proxy）。' },
          { title: 'Q13：MySQL 主从复制原理', body: '要点：主库 binlog → 从库 IO 线程 → relay log → SQL 线程回放；半同步比异步更安全。' },
          { title: 'Q14：Redis 集群方案对比', body: '要点：主从 / Sentinel / Cluster；分片机制；典型 16384 槽。' },
          { title: 'Q15：什么是 RAG，与微调对比', body: '要点：RAG 解决知识时效；微调解决格式风格；通常组合用。' },
          { title: 'Q16：大模型推理优化', body: '要点：量化 + KV Cache + 连续批处理 + 模型分级路由。' },
          { title: 'Q17：99.99% SLA 怎么实现', body: '要点：跨 AZ + 多活 + 健康检查 + 自动故障转移。' },
          { title: 'Q18：CDN 工作原理', body: '要点：边缘节点缓存 + 智能 DNS + 命中/回源；命中率 90%+ 回源带宽降 10x。' },
          { title: 'Q19：什么是云原生', body: '要点：12-Factor + 容器 + 微服务 + DevOps + 可观测；不只是上云。' },
          { title: 'Q20：什么是 Service Mesh', body: '要点：把限流/灰度/链路加密下沉到 sidecar；Istio + Envoy。' },
          { title: 'Q21：CAP 定理', body: '要点：一致性/可用性/分区容忍三选二；分布式必选 P。' },
          { title: 'Q22：火山引擎和阿里云比', body: '要点：不抹黑；强调差异化（AI / 视频 / 字节同款）；用 PoC 让数字说话。' }
        ]
      },
      {
        title: '三、行为类高频题（10 题）',
        keypoints: [
          { title: 'Q23：你和同事冲突经历', body: '要点：对事不对人；展现主动沟通+找数据。' },
          { title: 'Q24：上司不认可你的方案', body: '要点：先理解对方+用数据说服+最终结合；展现政治智商。' },
          { title: 'Q25：跨部门拉通经历', body: '要点：有具体场景（如 SLA 谈判）；说清节奏。' },
          { title: 'Q26：带新人 / 实习生经历', body: '要点：师徒制 + 周复盘 + 让新人独立 own。' },
          { title: 'Q27：抗压故事', body: '要点：选真实案例；说清你在压力下的"决策动作"。' },
          { title: 'Q28：远程协作经历', body: '要点：异步沟通工具+清晰文档+定期对齐。' },
          { title: 'Q29：被客户骂 / 投诉经历', body: '要点：先承认 + 立即解决 + 后续复盘；不甩锅。' },
          { title: 'Q30：项目周期被砍一半', body: '要点：先评估范围调整+和客户管预期+技术方案降复杂度。' },
          { title: 'Q31：和销售冲突', body: '要点：售前-销售常见的"承诺过度"——你怎么处理。' },
          { title: 'Q32：第一次 own 大单', body: '要点：紧张但兴奋；做了什么准备；如何与团队协作。' }
        ]
      },
      {
        title: '四、Case / 方案类高频题（10 题）',
        keypoints: [
          { title: 'Q33：日 1 亿订单方案', body: '要点：分层架构 + 容量估算 + 灾备。' },
          { title: 'Q34：金融实时风控架构', body: '要点：Kafka+Flink+ByteHouse+规则引擎+AI 模型；<50ms 决策。' },
          { title: 'Q35：智能客服设计', body: '要点：Coze+豆包+RAG+渠道接入；分级转人工。' },
          { title: 'Q36：海外 App 出海架构', body: '要点：多 region+合规驻留+Anycast EIP+本地支付。' },
          { title: 'Q37：电商秒杀方案', body: '要点：CDN 静态化+Redis 库存+消息削峰+VKE 弹性。' },
          { title: 'Q38：直播带货低延迟', body: '要点：LSS 超低延迟<1.5s+连麦 SDK+货品弹窗+实时数据。' },
          { title: 'Q39：智驾 PB 级数据', body: '要点：TOS 分级+vePFS 训练+GPU 集群+生命周期。' },
          { title: 'Q40：信创替代 Oracle', body: '要点：veDB PG 兼容+DTS 平滑迁移+TCO 测算+5 年节省。' },
          { title: 'Q41：客户上云路径', body: '要点：6R 决策树+分波次+回切预案。' },
          { title: 'Q42：客户问"AI 能不能省人"', body: '要点：先识别痛点+给量化目标+PoC 验证+分阶段。' }
        ]
      },
      {
        title: '五、刁钻 / 压力类高频题（8 题）',
        keypoints: [
          { title: 'Q43：你的简历怎么有半年空窗', body: '要点：诚实说原因（家庭/学习/创业失败）+ 那段做了什么+从中收获。' },
          { title: 'Q44：你为什么 35 岁还在做售前', body: '要点：不慌；强调"专业沉淀"+"持续成长"+"行业积累"——售前是"越老越吃香"的岗位。' },
          { title: 'Q45：你这年纪想再换方向（如转售前管理）你已经晚了', body: '要点：不应；用"我看到的真实标杆"反例；展现学习与决心。' },
          { title: 'Q46：你期望薪资 X 万——我们只能给 0.7X', body: '要点：不立即放弃；问"基本/绩效/股票/Sign-on"哪一项可以优化；保持职业。' },
          { title: 'Q47：你之前的项目数据，看着不真实', body: '要点：冷静解释——背景+你的角色边界+可验证的细节；忌辩解过度。' },
          { title: 'Q48：你为什么跳槽这么频繁', body: '要点：复盘每次跳槽的"成长曲线"——有学到什么 / 进步什么；展现"主动选择"而非被动。' },
          { title: 'Q49：如果你今天的 boss 是你过去的下属', body: '要点：放下身段+尊重新角色+主动配合；展现成熟。' },
          { title: 'Q50：你为什么没有被竞争对手挖走', body: '要点：不冷嘲；客观分析自己 / 公司 / 行业；表达"主动选择留下"或"主动选择换"。' }
        ]
      },
      {
        title: '六、练习方法',
        keypoints: [
          { title: '"逐题写出"是底线', body: '50 题——每题逐字写出 100-200 字答案；这一步绝大多数人偷懒，但这是练好的唯一捷径。' },
          { title: '录音回放 = 神器', body: '把答案对着镜子或录音回放——你会发现"自以为流畅"实际有 30% 的口头禅、跑题、卡顿。' },
          { title: '约 1-2 个朋友模拟面试', body: '请有面试经验的人做面试官；用 60-90 分钟完整跑一遍；他给你 3 条改进意见——立即调整。' },
          { title: '"3-3-3 复习法"', body: '每天复习 3 题、每周回看 3 类、每月整体跑 3 遍；面试前 3 天重点突击"自我介绍 + 反问 + 难题"。' }
        ]
      }
    ],
    tips: '面试是"概率游戏"——准备充分把成功率从 20% 提到 60%；剩下的 40% 是匹配度（公司文化/面试官风格/你状态）——这部分接受不可控。把能控的做到 100%，剩下的交给运气。'
  }
];
