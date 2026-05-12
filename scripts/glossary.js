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
      // ===========================================================
      // ☁️ 云基础与服务模型
      // ===========================================================
      'IaaS': { en: 'Infrastructure as a Service', tag: '云', def: '基础设施即服务，云厂商提供计算/存储/网络的底层资源，客户自行管理 OS 及以上。代表：ECS、TOS、VPC。适合需要完整 OS 控制权、自研系统迁移、定制化深的客户。对位 PaaS：少省心但灵活。' },
      'PaaS': { en: 'Platform as a Service', tag: '云', def: '平台即服务，云厂商管到运行时/中间件层，客户只关心应用与数据。代表：veDB（托管 MySQL）、ByteHouse（云数仓）、火山方舟（大模型平台）。优势：运维成本骤降；劣势：定制空间小。' },
      'SaaS': { en: 'Software as a Service', tag: '云', def: '软件即服务，直接提供完整应用，按账号/调用量付费。代表：飞书、Salesforce、Coze。3 天内即可上线使用，几乎零部署。售前角度：替代传统自建 CRM/OA/邮箱，可节省 60%+ IT 投入。' },
      'CaaS': { en: 'Containers as a Service', tag: '云', def: '容器即服务，托管 Docker/K8s 平台。代表：VKE、阿里 ACK、华为 CCE、AWS EKS。介于 IaaS 与 PaaS 之间，是云原生主战场。客户只需提交镜像和 YAML，无需关心节点运维。' },
      'FaaS': { en: 'Functions as a Service', tag: '云', def: '函数即服务（Serverless 子集），事件触发 + 按调用次数与毫秒计费的极致弹性。代表：veFaaS、AWS Lambda。典型场景：图片处理、IoT 上报、API 后端、Webhook。闲时零成本，突发流量自动扩。' },
      'Serverless': { tag: '云', def: '无服务器（不是真没服务器，是用户不管服务器）。包含 FaaS（函数）+ BaaS（后端服务，如 Auth、DB、Storage）。优势：按用量付费、无需运维；劣势：冷启动、调试复杂、有厂商绑定。' },
      '公有云': { tag: '云部署', def: 'Public Cloud，资源由云厂商提供并多租户共享。代表：火山引擎、阿里云、AWS。弹性最强、单价最低、上手快，适合互联网、SaaS、新零售等需要快速试错的业务。' },
      '私有云': { tag: '云部署', def: 'Private Cloud，专属硬件资源，常用 OpenStack/VMware/HCS 作底座。满足金融、政务、军工对数据物理隔离的诉求。CapEx 高、利用率通常仅 20-30%。' },
      '混合云': { tag: '云部署', def: 'Hybrid Cloud，本地 IDC + 公有云通过专线打通。如核心交易留本地、营销弹性上云；银行业的"两地三中心"+公有云容灾是典型形态。' },
      '多云': { tag: '云部署', def: 'Multi-Cloud，同时使用 2+ 个公有云，规避锁定与可用性风险。CNCF 调查显示 2024 年 76% 的中大型企业已采用多云。常见组合：阿里云+火山、华为云+天翼云。' },
      '行业云': { tag: '云部署', def: '为特定行业打造的合规云形态，如火山引擎汽车云、金融云、政务云。提供等保三级、信创基座、行业插件，可部署在客户机房或专区。' },
      '专有云': { tag: '云部署', def: 'Dedicated Cloud，介于公有云与私有云之间——硬件可以是云厂商的，但部署在客户机房或独立专区，享受公有云的产品但拥有独立运维边界。火山引擎专有云、HCS 都是此类。' },

      // ===========================================================
      // 🌐 云网络与负载均衡
      // ===========================================================
      'VPC': { en: 'Virtual Private Cloud', tag: '云网络', def: '虚拟私有云，云上的逻辑隔离网络空间。可自定义网段（CIDR）、子网、路由表、安全组、ACL，相当于"云上私有机房"。每个客户的 VPC 互不可达，需主动打通（如 VPC 对等连接、CEN）。' },
      'VLAN': { en: 'Virtual LAN', tag: '云网络', def: '虚拟局域网，通过 802.1Q 标签将一个物理网络逻辑分割为多个广播域。云上的 VPC 概念是 VLAN 在数据中心的演进版，提供更大规模、更灵活的隔离。' },
      'CIDR': { en: 'Classless Inter-Domain Routing', tag: '云网络', def: '无类域间路由，IP 地址 + 子网掩码的简写形式。如 10.0.0.0/16 表示 10.0.0.0 到 10.0.255.255 共 65536 个地址。VPC 规划第一步就是定 CIDR，事后改成本极高。' },
      '子网': { tag: '云网络', def: 'Subnet，VPC 内的更小网段，通常按可用区划分以实现高可用。如 VPC 是 10.0.0.0/16，可以切成 10.0.1.0/24（可用区A）、10.0.2.0/24（可用区B）。' },
      'CDN': { en: 'Content Delivery Network', tag: '云网络', def: '内容分发网络，把静态资源（图片/视频/JS/CSS）缓存到离用户最近的边缘节点。降低延迟、提升首字节时间、为源站抗流量。视频/电商/资讯类业务标配。' },
      'DCDN': { en: 'Dynamic CDN', tag: '云网络', def: '动态内容 CDN，对 API 等动态请求做边缘加速。含路由优化、SSL 卸载、Anycast、回源连接复用等。直播、实时聊天、跨境业务的延迟优化神器。' },
      'EIP': { en: 'Elastic IP', tag: '云网络', def: '弹性公网 IP，可以解绑/重绑到不同实例的公网地址。比传统固定 IP 灵活——故障切换时把 EIP 漂移到备机即可秒级恢复，IP 不变客户感知不到。' },
      'NAT': { en: 'Network Address Translation', tag: '云网络', def: '网络地址转换，让 VPC 内私网地址通过共享公网 IP 访问互联网。NAT 网关是托管服务，省去自己搭软路由的运维。SNAT 出方向 vs DNAT 入方向。' },
      'BGP': { en: 'Border Gateway Protocol', tag: '云网络', def: '边界网关协议，运营商之间互连的路由协议。多线 BGP=单 IP 多运营商可达，避免南北电信联通互访慢。国内宽带客户必选 BGP 网络。' },
      'SDN': { en: 'Software Defined Network', tag: '云网络', def: '软件定义网络，把网络控制平面（决策路由）和数据平面（转发包）解耦，可编程动态配置。云上 VPC 底座就是 SDN，分钟级开网而非传统数周。' },
      'SLB': { en: 'Server Load Balancer', tag: '云网络', def: '服务器负载均衡，把流量分发到多台后端实例。L4=NLB（TCP/UDP）侧重性能，L7=ALB（HTTP）侧重应用层路由。云上托管版可弹性、按需开关、按流量计费。' },
      'NLB': { tag: '云网络', def: 'Network Load Balancer，四层负载均衡，按 IP+Port 分发。性能极高（千万 PPS），不解析应用层，主要用于 TCP/UDP 长连接、数据库、游戏服务器。' },
      'ALB': { tag: '云网络', def: 'Application Load Balancer，七层负载均衡，按 HTTP 路径/Header/Cookie 路由。支持灰度发布、A/B 测试、WAF 联动、SSL 卸载。Web/API 后端首选。' },
      'WAF': { en: 'Web Application Firewall', tag: '安全', def: 'Web 应用防火墙，挡 SQL 注入/XSS/CC 攻击/恶意爬虫。互联网业务前置必备。云上 WAF 配合 CDN 边缘可拦截 80% 已知攻击。' },
      'Anycast': { tag: '云网络', def: '同一个 IP 地址被全球多个节点宣告，BGP 自动选最近节点。CDN/DDoS 高防/DNS 都用 Anycast 给用户"就近接入"的体验。火山 EIP Anycast 版本支持跨地域故障切换。' },
      'IPv6': { tag: '云网络', def: '下一代 IP 协议，128 位地址（vs IPv4 32 位）。中国政府要求 2025 年前全面 IPv6 化，互联网+政企都得改造。云厂商一般免费开通 IPv6 流量。' },

      // ===========================================================
      // 🚀 SLA / 高可用 / 容量
      // ===========================================================
      'SLA': { en: 'Service Level Agreement', tag: '云服务', def: '服务等级协议，云厂商对可用性/性能的对外承诺。如 99.95% 年停机 ≤4.4 小时；99.99% ≤52.6 分钟；99.999%（五个九）≤5.3 分钟。未达标按比例赔付。' },
      'SLO': { en: 'Service Level Objective', tag: '云服务', def: '服务等级目标，内部技术指标。SLA 是对外承诺、SLO 是对内目标，SLO 一般高于 SLA（留缓冲），如 SLA 99.95% 时 SLO 设 99.99%。' },
      'SLI': { en: 'Service Level Indicator', tag: '云服务', def: '服务等级指标，可观测的数值（成功率/延迟/吞吐）。SLI 是事实测量，SLO 是目标，SLA 是承诺，三层递进。如 P99 延迟 SLI ≤ 200ms 是常见目标。' },
      'HA': { en: 'High Availability', tag: '架构', def: '高可用，通过冗余设计让系统在部分故障时仍能提供服务。手段：多实例+负载均衡、跨可用区、自动故障转移、健康检查。和 DR（灾备）的区别：HA 应对单机/服务故障，DR 应对整个数据中心故障。' },
      'AZ': { en: 'Availability Zone', tag: '架构', def: '可用区，同一地域内电力/网络/制冷彼此独立的数据中心。生产业务必须跨 AZ 部署，单 AZ 故障不影响业务。火山引擎北京有 3 个 AZ。' },
      'Region': { tag: '架构', def: '地域，独立的地理位置（如北京、上海、广州）。跨 Region 延迟高（30-50ms+），主要用于灾备和合规需求。同 Region 内跨 AZ 延迟低（1-3ms）。' },
      'PPS': { en: 'Packets Per Second', tag: '架构', def: '每秒包数，衡量网络转发性能。小包高 PPS 比大包高带宽更挑战 CPU。云上虚机 PPS 一般 50-200 万，物理机 1000 万+。' },
      'QPS': { en: 'Queries Per Second', tag: '架构', def: '每秒查询数，衡量服务处理能力。MySQL 单库 1-3 万 QPS，Redis 单实例 10 万 QPS，火山方舟豆包推理几万 QPS。' },
      'TPS': { en: 'Transactions Per Second', tag: '架构', def: '每秒事务数，比 QPS 严格——一个事务可能含多次查询。支付系统、订单系统、库存系统 TPS 是核心指标。' },
      'P99': { tag: '架构', def: '99 百分位延迟，99% 请求在此时间内响应。比平均延迟更能反映用户体验——P99 200ms 意味着只有 1% 请求慢于 200ms。常配套 P50/P95/P999 看长尾分布。' },

      // ===========================================================
      // 🐳 容器与云原生
      // ===========================================================
      'K8s': { tag: '云原生', def: 'Kubernetes 的常用缩写（K + 8 字母 + s），容器编排事实标准。火山 VKE、阿里 ACK、华为 CCE、AWS EKS 都是托管 K8s。Google 2014 开源，CNCF 旗舰项目。' },
      'Kubernetes': { tag: '云原生', def: '开源容器编排平台。声明式管理 Pod/Service/Deployment，自动扩缩容、滚动升级、自愈、负载均衡。是云原生应用的"操作系统"。' },
      'Docker': { tag: '云原生', def: '容器化技术与工具，把应用+依赖+运行环境打包为镜像，跨平台一致运行。秒级启动 vs 虚拟机分钟级，密度提升 5-10 倍。但 K8s 1.20+ 已弃用 dockershim 改用 containerd。' },
      'Pod': { tag: '云原生', def: 'K8s 最小调度单元，包含 1+ 个共享网络/存储的容器。99% 场景一个 Pod 一个容器，少数场景多个（如 Sidecar 模式）。同 Pod 容器可通过 localhost 互访。' },
      'Sidecar': { tag: '云原生', def: '边车模式，在主应用 Pod 旁部署辅助容器（如代理、日志收集、监控 agent）。Service Mesh 把网络、流控、可观测能力下沉到 Sidecar，让业务代码零侵入。' },
      'Service Mesh': { tag: '云原生', def: '服务网格（如 Istio、Linkerd），把服务间通信、限流、熔断、可观测下沉到独立基础设施层。让业务代码专注业务，代价是性能损耗 5-15% + 复杂度。' },
      'Helm': { tag: '云原生', def: 'K8s 包管理器，把一组 YAML 打包成"Chart"，一键安装/升级/卸载复杂应用。如 helm install prometheus，几秒部署整套监控栈。' },
      'CRD': { en: 'Custom Resource Definition', tag: '云原生', def: '自定义资源定义，让你扩展 K8s API 引入新对象类型。Operator 模式的基石——把运维逻辑（如数据库主从切换）编码进控制器。' },
      'Operator': { tag: '云原生', def: 'K8s 扩展模式，把"运维经验"编码成控制器。如 etcd Operator、MySQL Operator 自动处理备份、扩容、故障切换。让 K8s 像管 Pod 一样管复杂中间件。' },
      'Ingress': { tag: '云原生', def: 'K8s 入口资源，把外部 HTTP 流量按路径/域名路由到内部 Service。常配 Nginx/Traefik 实现。和 LoadBalancer Service 的区别：Ingress 是 L7 应用层路由，能复用一个公网 IP 给多个服务。' },
      'CNCF': { en: 'Cloud Native Computing Foundation', tag: '云原生', def: '云原生计算基金会，Linux 基金会下子项目。维护 K8s/Prometheus/Envoy/Helm 等 1500+ 项目地图。"毕业级"（Graduated）项目意味着大规模生产可用。' },
      'DevOps': { tag: '云原生', def: '开发-运维一体化文化与实践，含 CI/CD + IaC + 监控告警 + 跨团队协作。让发布从"季度"变"每天"，故障恢复从"几小时"变"几分钟"。售前角度：让客户的研发效率提升 2-5 倍。' },
      'GitOps': { tag: '云原生', def: 'Git 作为生产真相源（Source of Truth），所有基础设施变更通过 PR 合并触发自动部署。代表工具：Argo CD、Flux。优势：审计完整、回滚秒级、人为操作隔离。' },
      'CI/CD': { tag: '云原生', def: '持续集成/持续部署。代码提交→自动测试→自动构建→自动发布。Jenkins/GitLab CI/GitHub Actions/Argo 是常见工具。让单次发布从 1 小时人工降到 5 分钟自动。' },
      'IaC': { en: 'Infrastructure as Code', tag: '云原生', def: '基础设施即代码，用 Terraform/Pulumi/CloudFormation 等代码描述云资源。版本化+审计+一键复制环境，比传统手工点页面强一个数量级。' },
      '12-Factor': { tag: '云原生', def: 'Heroku 提出的 12 条云原生应用准则，含配置外部化、无状态、日志即流、进程模型、端口绑定等。任何"上云改造"都要先做 12-Factor 体检。' },
      '虚拟化': { tag: '云原生', def: '把一台物理机切成多台虚拟机的技术。KVM/Xen/Hyper-V/ESXi 是常见 hypervisor，性能损耗 3-5%。云上 ECS 底层都基于虚拟化，把利用率从 IDC 的 10-15% 拉到 50%+。' },
      'KVM': { en: 'Kernel-based Virtual Machine', tag: '云原生', def: 'Linux 内核原生虚拟化，开源免费。AWS Nitro、火山引擎 ECS 底层都基于 KVM。相比 Xen/VMware 性能更接近原生，已成事实标准。' },
      'OCI': { en: 'Open Container Initiative', tag: '云原生', def: '开放容器倡议，定义容器镜像格式与运行时规范。让 Docker 镜像可以在 containerd、CRI-O、podman 等多种运行时跑，避免厂商绑定。' },

      // ===========================================================
      // 💾 存储与数据库
      // ===========================================================
      'OLTP': { en: 'Online Transaction Processing', tag: '数据库', def: '联机事务处理，面向交易的工作负载，强 ACID + 低延迟。代表：MySQL/PostgreSQL/Oracle/veDB。订单、支付、库存系统典型 OLTP。' },
      'OLAP': { en: 'Online Analytical Processing', tag: '数据库', def: '联机分析处理，面向多维分析的工作负载，列存+聚合性能优先。代表：ClickHouse/ByteHouse/Hologres/Doris。BI 报表、行为分析典型 OLAP。' },
      'HTAP': { en: 'Hybrid Transaction/Analytical Processing', tag: '数据库', def: '混合事务分析处理，一套引擎同时支持 OLTP+OLAP。TiDB、TDSQL-H、PolarDB-X 是代表。让"分析数据要等 T+1"变成实时，但成本和复杂度更高。' },
      'ACID': { tag: '数据库', def: '原子性（Atomicity）/一致性（Consistency）/隔离性（Isolation）/持久性（Durability），关系数据库事务四特性。传统强一致 OLTP 必备，互联网常牺牲 C 换取 AP。' },
      'BASE': { tag: '数据库', def: '基本可用（Basically Available）/软状态（Soft state）/最终一致（Eventual consistency），互联网分布式系统的设计哲学。和 ACID 是两个极端，多数互联网产品偏 BASE。' },
      'CAP': { tag: '数据库', def: '一致性（Consistency）/可用性（Availability）/分区容错（Partition tolerance）三选二定理。分布式系统永远要在 C 和 A 之间取舍——金融偏 CP，互联网偏 AP。' },
      'NoSQL': { tag: '数据库', def: '非关系数据库统称，含 KV（Redis）/文档（MongoDB）/列存（HBase）/图（Neo4j）/时序（InfluxDB）/向量（VikingDB/Milvus）。各有专长，不是"取代 SQL"而是"补充 SQL"。' },
      'NewSQL': { tag: '数据库', def: '分布式关系数据库，兼具 NoSQL 的扩展性 + SQL 的强一致。代表：TiDB、CockroachDB、Spanner、OceanBase。金融大型客户去 Oracle 化首选。' },
      'Redis': { tag: '中间件', def: '内存 KV 数据库，QPS 单实例 10 万级。常用于缓存、Session、计数器、限流、消息队列、分布式锁、排行榜。云上托管版自动主从+持久化。' },
      'MongoDB': { tag: '数据库', def: '文档数据库，JSON 风格存储，灵活 schema。适合内容管理、用户画像、日志归档等结构不定的数据。MongoDB Atlas 是官方托管云服务。' },
      'Elasticsearch': { tag: '中间件', def: '分布式搜索引擎，全文检索 + 聚合分析。日志（ELK 栈）、商品搜索、APM 监控都用它。火山引擎 ES 是托管版，对位阿里云 Elasticsearch。' },
      'Kafka': { tag: '中间件', def: 'LinkedIn 开源的分布式消息队列，单集群百万 TPS。事件流处理、日志收集、CDC、实时数仓的脊柱。FlinkSQL+Kafka 是实时数仓标配。' },
      'Pulsar': { tag: '中间件', def: 'Apache 顶级项目，云原生消息+流统一平台。比 Kafka 多租户和分层存储能力强，腾讯、智联、连尚等大规模使用。' },
      'ZooKeeper': { tag: '中间件', def: '分布式协调服务，提供分布式锁、配置中心、命名服务、Leader 选举。Kafka/HBase/Dubbo 早期都依赖 ZK，新系统逐步用 etcd 替代。' },
      'ETL': { en: 'Extract-Transform-Load', tag: '数据', def: '抽取-转换-加载，业务数据搬到数仓的传统流程。现代大数据多用 ELT（先入仓再变换），让数仓承担更多计算，减少中间链路。' },
      'CDC': { en: 'Change Data Capture', tag: '数据', def: '变更数据捕获，实时抓取数据库 binlog 同步到下游。Flink CDC、Debezium、阿里 DTS 是代表。让"T+1 报表"变实时报表的关键技术。' },
      'Binlog': { tag: '数据库', def: 'MySQL 的二进制日志，记录所有改动。主从复制和 CDC 都基于 binlog。开启 binlog 后磁盘开销 ~10%，但数据可追溯、可回滚、可同步下游。' },
      '主从复制': { tag: '数据库', def: 'Master-Slave Replication，写主库读从库，读写分离。MySQL/PostgreSQL/Redis 标配。优势：分担读压力 + 主库故障切到从库。劣势：异步复制可能丢数据（毫秒级延迟）。' },

      // ===========================================================
      // 📊 大数据与数仓
      // ===========================================================
      'Hadoop': { tag: '大数据', def: '分布式存储（HDFS）+ 计算（MapReduce）开源生态。EMR 提供托管 Hadoop，是离线大数据的基础。如今 MapReduce 多被 Spark/Flink 取代，HDFS 仍是数据湖底座之一。' },
      'HDFS': { en: 'Hadoop Distributed File System', tag: '大数据', def: 'Hadoop 分布式文件系统，分块存储 + 三副本。设计目标是大文件、高吞吐、低成本，不擅长小文件。云上多被对象存储（S3/TOS/OSS）取代。' },
      'Spark': { tag: '大数据', def: '内存计算引擎，比 MapReduce 快 10-100 倍。统一支持批处理（Spark SQL）/ 流处理（Structured Streaming）/ 机器学习（MLlib）/ 图计算（GraphX）。火山 EMR、阿里 MaxCompute 都内建。' },
      'Flink': { tag: '大数据', def: '阿里大量使用的实时流处理引擎，事件时间语义 + 精确一次（Exactly Once）。金融实时风控、广告实时归因、IoT 数据处理必选。FlinkSQL 让 SQL 写流计算。' },
      'Iceberg': { tag: '大数据', def: 'Netflix 开源的表格式标准，配对象存储构建湖仓一体。支持时间旅行（查历史快照）、Schema 演进、分区演进。Iceberg+Spark/Flink 是新一代数据湖标配。' },
      'Hudi': { tag: '大数据', def: 'Uber 开源的另一种湖仓表格式，强项是流式 Upsert（实时插入+更新）。和 Iceberg、Delta Lake 三选一，国内 Hudi 接受度较高。' },
      'Delta Lake': { tag: '大数据', def: 'Databricks 开源的湖仓表格式，与 Spark 深度集成。ACID 事务 + 时间旅行 + Schema 演进。和 Iceberg 功能相似，生态偏 Databricks。' },
      'Presto': { tag: '大数据', def: 'Facebook 开源的 SQL 查询引擎，跨数据源联合查询（MySQL+Hive+Kafka+ES 一起 join）。2020 年分叉为 Trino（社区主力）和 PrestoDB（Facebook 维护）。' },
      'ClickHouse': { tag: '大数据', def: 'Yandex 开源的列存 OLAP 数据库，单机亿级行秒查。极致写入吞吐 + 极致聚合性能，缺点是 JOIN 弱、不擅长高并发点查。ByteHouse、Doris 都受其启发。' },
      '数据湖': { tag: '数据', def: 'Data Lake，原始格式（CSV/Parquet/JSON）存储所有结构化/非结构化数据。按需 ELT 分析。对位"先建模再入库"的传统数仓，更灵活但治理更挑战。' },
      '湖仓一体': { tag: '数据', def: 'Lakehouse，数据湖灵活性 + 数据仓库强分析能力。Iceberg/Delta Lake/Hudi 是底座，Spark/Flink 是计算。降本（用便宜对象存储）+ 提速（统一引擎）。' },
      '数仓': { tag: '数据', def: '数据仓库（Data Warehouse），结构化存储 + 主题域建模 + 历史快照。ByteHouse、AnalyticDB、GaussDB(DWS) 是云原生数仓。和 OLTP 库分离，避免分析查询拖垮业务。' },
      '数据中台': { tag: '数据', def: '业务数据资产化平台，把分散数据统一治理→构建标签/指标→开放给业务使用。DataLeap、DataWorks 是典型。售前角度：让客户告别"数据要 3 天才能拉出来"。' },

      // ===========================================================
      // 🤖 AI 与大模型
      // ===========================================================
      'LLM': { en: 'Large Language Model', tag: 'AI', def: '大语言模型，参数百亿级以上。GPT-4/豆包 Pro/DeepSeek-V3/通义/盘古/文心都是 LLM。能写代码、写文案、答客服、做翻译，但有幻觉、长上下文性能下降、推理成本高的局限。' },
      'GPT': { tag: 'AI', def: 'Generative Pre-trained Transformer，OpenAI 系列大模型（GPT-3.5/4/4o/o1）。引发 2022 年起的 AI 浪潮。国内豆包、通义、文心、智谱 GLM、DeepSeek 等都是 GPT-Like 架构。' },
      'Transformer': { tag: 'AI', def: 'Google 2017 论文《Attention is All You Need》提出的神经网络架构，自注意力机制让长距离关系建模成为可能。是 ChatGPT/豆包/Sora 等几乎所有现代 AI 的基石。' },
      'Attention': { tag: 'AI', def: '注意力机制，让模型在处理一个词时"看见"序列中所有词的相关性。自注意力（Self-Attention）是 Transformer 的核心。' },
      'RAG': { en: 'Retrieval-Augmented Generation', tag: 'AI', def: '检索增强生成，回答前先查知识库找相关文档，把检索结果+原问题一起喂给模型生成答案。企业知识问答首选，避免模型乱编（幻觉）。火山方舟+VikingDB 是一站式 RAG 方案。' },
      'Agent': { tag: 'AI', def: '智能体，能调工具、规划多步、自主决策的 AI 应用。如查日历+订机票+发邮件的助手就是 Agent。Coze、火山方舟、LangChain 是常见构建平台。' },
      'Token': { tag: 'AI', def: 'AI 模型最小处理单元。中文 1 字 ≈ 1-2 token，英文 1 词 ≈ 1.3 token。模型按 token 数计费——DeepSeek ¥1 ≈ 200 万 token，豆包 Pro ¥1 ≈ 50 万 token。' },
      'Embedding': { tag: 'AI', def: '把文本/图像/音频编码为高维向量（通常 768-3072 维浮点数组）。语义相近的内容向量距离也近，是 RAG 检索、语义搜索、推荐系统的基础。' },
      'Vector': { tag: 'AI', def: '向量，高维浮点数组。LLM 内部所有"理解"都基于向量空间，向量数据库（VikingDB/Milvus）就是高效存储和检索这些向量的专用数据库。' },
      'Vector DB': { tag: 'AI', def: '向量数据库，专门存储高维向量并支持相似度搜索（cosine/欧氏距离）。代表：VikingDB（火山）、Milvus、Pinecone、Weaviate。RAG 的核心组件。' },
      'Fine-tuning': { tag: 'AI', def: '精调，在预训练模型上用领域数据继续训练。让模型适应特定行业风格/术语/任务。代价是需要标注数据 + GPU 资源。' },
      'SFT': { en: 'Supervised Fine-Tuning', tag: 'AI', def: '监督精调，用"问题-标准答案"对训练模型。让模型按预期格式/风格输出。如果只是改风格，几百条样本就够；改能力需要几万-几十万条。' },
      'RLHF': { en: 'Reinforcement Learning from Human Feedback', tag: 'AI', def: '人类反馈强化学习——让人评价模型答案再训练。GPT/Claude/豆包对齐人类偏好的核心技术。让模型从"会回答"进化到"答得让人满意"。' },
      'LoRA': { en: 'Low-Rank Adaptation', tag: 'AI', def: '低秩适应，只训练少量参数（原模型 1%-10%）就能让大模型适应新任务。显存需求大幅降低，普通显卡也能玩。SFT 最常用的高效精调方法。' },
      'MoE': { en: 'Mixture of Experts', tag: 'AI', def: '混合专家模型，把大模型切成多个专家，每次推理只激活 2-4 个。DeepSeek-V3、Mixtral 用 MoE 大幅降本——总参数 671B 但激活仅 37B，成本只有稠密 70B 的 1/10。' },
      'CoT': { en: 'Chain of Thought', tag: 'AI', def: '思维链，让模型"逐步推理"而非直接给答案。在 Prompt 里加"让我们一步步思考"或用 Agent 框架触发，复杂数学/逻辑题准确率显著提升（如从 17% 到 79%）。' },
      'Prompt': { tag: 'AI', def: '提示词，给 LLM 的输入指令。"用 100 字总结" vs "你是资深律师，请用 100 字总结合同要点，重点指出风险" 效果天差地别。' },
      'Prompt Engineering': { tag: 'AI', def: '提示词工程，设计 Prompt 引导 LLM 输出。零代码改进模型效果的常用手段。常见技巧：角色扮演、Few-shot 示例、结构化输出、链式分步。' },
      'Function Calling': { tag: 'AI', def: '函数调用/工具调用，让 LLM 输出结构化 JSON 指示调用哪个外部工具（查天气/搜索/订票）。是 Agent 的核心机制。' },
      'Tool Use': { tag: 'AI', def: '工具使用，LLM 通过 Function Calling 调用外部 API（搜索、计算、数据库、邮件等）。让模型从"只会聊天"扩展到"能干活"。' },
      'Multi-Modal': { tag: 'AI', def: '多模态，能同时处理文本/图像/音频/视频的模型。GPT-4o、豆包视觉版、通义 VL 都是多模态。让 AI 能"看图说话"、"读视频做摘要"。' },
      'Diffusion': { tag: 'AI', def: '扩散模型，文生图/视频的主流架构。代表：Stable Diffusion、Midjourney、Sora、可灵。从噪声逐步"反向去噪"生成图像。' },
      'ASR': { en: 'Automatic Speech Recognition', tag: 'AI', def: '自动语音识别，把语音转文字。火山引擎语音识别、阿里通义听悟、Whisper 是代表。智能客服、会议纪要、字幕生成必备。' },
      'TTS': { en: 'Text To Speech', tag: 'AI', def: '语音合成，把文字转语音。火山 TTS 支持上千种音色（含克隆），抖音读书、智能音箱主流用。' },
      'OCR': { en: 'Optical Character Recognition', tag: 'AI', def: '光学字符识别，把图片里的文字提取出来。证件识别、票据录入、合同抽取场景核心。' },
      'NLP': { en: 'Natural Language Processing', tag: 'AI', def: '自然语言处理，让计算机理解和生成人类语言。LLM 是 NLP 的"终极武器"，覆盖了过去单独建模的分类、抽取、翻译、问答等任务。' },
      'CV': { en: 'Computer Vision', tag: 'AI', def: '计算机视觉，让计算机理解图像/视频。涵盖图像分类、目标检测、OCR、人脸识别、视频分析。多模态 LLM 正在统一 CV 与 NLP。' },
      'Quantization': { tag: 'AI', def: '量化，把模型权重从 FP32 压到 INT8/INT4，体积缩小 4-8 倍、推理快 2-4 倍、显存省 4 倍。代价是精度损失 1-3%，多数业务场景可接受。' },
      'KV Cache': { tag: 'AI', def: '键值缓存，LLM 推理时缓存历史 token 的注意力中间结果，避免重复计算。多轮对话场景能加速 5-10 倍，但占大量显存。' },

      // ===========================================================
      // 🌋 火山引擎产品
      // ===========================================================
      '豆包': { tag: '火山', def: '字节跳动自研大模型系列。Pro 重任务、Lite 轻量、Mini 端侧、Code 编程。月级迭代，背靠抖音/电商海量真实场景。火山引擎 AI 的旗舰。' },
      '豆包大模型': { tag: '火山', def: '字节自研 LLM 全家桶。1.5/1.6/2.0 系列分通用/Code/Vision/Music 多分支。火山引擎 ToB 调用量第一的模型。' },
      '火山方舟': { tag: '火山', def: '火山引擎大模型 PaaS 平台，一站式集成多家模型（豆包+DeepSeek+智谱+...）+ 推理 + 评测 + 精调 + Agent 链路。对位阿里百炼、华为 ModelArts。' },
      'VikingDB': { tag: '火山', def: '火山引擎向量数据库，用于 RAG 知识库的语义检索。亿级向量秒级召回，支持混合检索（向量+关键词+元数据过滤）。火山 RAG 链路核心组件。' },
      'DataLeap': { tag: '火山', def: '火山引擎数据中台一体化产品，含数据集成（DataSail）/开发/治理/资产/服务。对位阿里 DataWorks、华为 DataArts。让数据工程从代码堆变可视化。' },
      'ByteHouse': { tag: '火山', def: '火山引擎云原生数据仓库，基于 ClickHouse 增强。PB 级亚秒查询，存算分离，对位阿里 AnalyticDB、华为 GaussDB(DWS)。' },
      'EMR': { tag: '火山', def: 'Elastic MapReduce，火山引擎托管 Hadoop/Spark/Flink/Iceberg/Presto 服务。开源大数据生态的云上一键版，节省自建集群的运维成本。' },
      'VKE': { tag: '火山', def: 'Volcengine Kubernetes Engine，火山引擎托管 K8s。对位阿里 ACK、华为 CCE、AWS EKS。支持 Serverless 容器（VCI）、GPU 池化、多集群联邦。' },
      'TOS': { tag: '火山', def: 'Tinder Object Storage，火山引擎对象存储。对位 AWS S3、阿里 OSS、华为 OBS。EB 级、按量计费、11 个 9 持久性、99.9% 可用。冷归档单价 ¥0.03/GB/月。' },
      'veDB': { tag: '火山', def: '火山引擎数据库系列（MySQL/PostgreSQL/Oracle 兼容），云原生关系库。对位阿里 RDS/PolarDB、华为 GaussDB。读写分离、自动备份、跨可用区高可用。' },
      'veFaaS': { tag: '火山', def: '火山引擎函数计算，事件触发 + 毫秒计费的 Serverless。冷启动 ~50ms，支持多语言、HTTP/定时/MQ 触发。适合图片处理、IoT 上报、API 后端、Webhook。' },
      'LAS': { en: 'Lake Analytics Service', tag: '火山', def: '火山湖仓一体分析服务，统一处理数据湖+数仓，存算分离，按量付费。对位阿里 MaxCompute Serverless、AWS Athena+Glue。' },
      'RTC': { en: 'Real-Time Communications', tag: '火山', def: '实时音视频，火山 RTC 是抖音直播底座的对外版。端到端延迟<400ms，全球 BGP 网络，支持万人同时连麦。在线教育、视频会议、连麦电商必选。' },
      'VOD': { en: 'Video on Demand', tag: '火山', def: '点播，视频上传/转码/分发/播放一站式。抖音技术原生，转码速度比开源 FFmpeg 快 3-5 倍。' },
      'Live': { tag: '火山', def: '直播服务，含推流、转码、CDN 分发、低延迟播放。抖音直播全球节点底座的对外版。' },
      'IES': { tag: '火山', def: 'Interactive Entertainment Service，火山互娱业务体系（短视频/直播/游戏等）。火山引擎的"母厂"，技术从这里长出来后对外开放。' },
      'A/B 测试': { tag: '火山', def: 'AB Testing，火山引擎 ABTest 平台，抖音/今日头条/西瓜内部使用的同款。让产品/算法/UI 改动用数据决策，告别拍脑袋。' },
      '增长引擎': { tag: '火山', def: 'Growth Engine，火山引擎增长营销 PaaS，含 ABTest+用户画像+营销自动化+归因分析。抖音电商等真实场景验证的工具链。' },

      // ===========================================================
      // 💼 售前方法论与销售
      // ===========================================================
      'POC': { en: 'Proof of Concept', tag: '售前', def: '概念验证，把方案在客户真实数据/小范围跑一遍，证明能解决问题。售前赢单的关键环节——口头讲再多不如让客户看到自己数据上跑出的结果。设计原则：小范围、真数据、明指标、可复盘。' },
      'TCO': { en: 'Total Cost of Ownership', tag: '售前', def: '总拥有成本：硬件+软件+人力+电费+迁移成本+风险成本全算上的真实账。客户看刊例价容易上当，TCO 才能算出"3 年下来用云比自建省 60%"这种说服力。' },
      'ROI': { en: 'Return on Investment', tag: '售前', def: '投资回报率 = (收益-成本)/成本。客户做决策的核心指标。售前要会把"AI 帮人节省 30% 时间" 换算成"每年省 ¥200 万人力"。' },
      'SPIN': { tag: '售前', def: 'Situation/Problem/Implication/Need-payoff 提问法。S=现状、P=痛点、I=影响、N=带来好处。引导客户从陈述事实到自己说出"我需要解决这个问题"。' },
      'MEDDIC': { tag: '售前', def: '企业级销售方法论：M=量化指标 / E=拍板人 / D=决策标准 / D=决策流程 / I=痛点 / C=内部赢家。比 BANT 更细，适合长周期大单。' },
      'BANT': { tag: '售前', def: 'Budget/Authority/Need/Timeline，销售线索质量的 4 个判断维度。预算/拍板人/需求/时间表。BANT 全齐才算是高质量线索。' },
      'FFAB': { tag: '售前', def: 'Feature/Function/Advantage/Benefit，售前介绍产品的四层递进。F1 是什么 → F2 干什么 → A 比对手强在哪 → B 给客户带来什么价值。' },
      'RFP': { en: 'Request For Proposal', tag: '售前', def: '招标书，客户发起的方案征集。售前要"识标→响应→澄清→讲标→中标"完整链路。RFP 越详细，越倾向某家厂商（标书可能就是某厂商写的）。' },
      'RFI': { en: 'Request For Information', tag: '售前', def: '需求信息征集，比 RFP 早一阶段。客户摸底市场都有什么方案，售前要趁机进入采购短名单。' },
      'RFQ': { en: 'Request For Quotation', tag: '售前', def: '询价书，相对简单的商务报价请求。一般已经选定方案，只是比价。' },
      'HLD': { en: 'High-Level Design', tag: '售前', def: '高阶设计，方案的总体架构、组件关系、关键流程。一般给客户高层和评审委员会看。' },
      'LLD': { en: 'Low-Level Design', tag: '售前', def: '详细设计，落地到每个组件的配置、规格、参数、API 接口。给客户技术团队和实施方看。' },
      'SA': { en: 'Solution Architect', tag: '售前', def: '解决方案架构师，售前核心岗位。负责需求理解+方案设计+技术选型+POC+招投标。火山引擎这次招的就是 SA。' },
      'AE': { en: 'Account Executive', tag: '售前', def: '客户经理（销售），管客户关系+回款。售前 SA 和 AE 一对组合是 ToB 标配。' },
      'CSM': { en: 'Customer Success Manager', tag: '售前', def: '客户成功经理，签约后持续帮客户成功使用产品。续费率、扩容率是 KPI。SaaS 时代的核心岗。' },
      '客户成功': { tag: '售前', def: 'Customer Success，从售卖一次性产品转向持续帮客户成功。SaaS 时代核心理念——客户用得好、用得多，才能续费、扩容、推荐。' },
      'FinOps': { tag: '云服务', def: '云成本治理，三原则 Inform(账单可视)→Optimize(选型/Right-sizing)→Operate(持续治理)。好的售前要懂得算 TCO 而非只报刊例价。' },
      '6R': { tag: '云迁移', def: '上云策略 6 种选择：Rehost（直搬/Lift-and-Shift）/Replatform（小改）/Refactor（重构云原生）/Repurchase（换 SaaS）/Retain（暂不上云）/Retire（下线）。一个客户一般混合多种 R。' },
      'KPI': { en: 'Key Performance Indicator', tag: '售前', def: '关键绩效指标。销售 KPI 一般是回款额，售前 KPI 包含中标率、POC 通过率、协助回款。' },
      'OKR': { tag: '售前', def: 'Objective and Key Results，目标与关键结果。字节内部主要用 OKR 而非 KPI。OKR 强调"自下而上挑战目标"，KPI 强调"自上而下分配指标"。' },
      'PaaS 售前': { tag: '售前', def: '相对 SaaS/IaaS 售前，PaaS 售前要懂中间件原理 + 客户技术架构 + 上层业务场景。难度最大、价值最高的售前类别。' },

      // ===========================================================
      // 🛡 数据保护与容灾
      // ===========================================================
      'CDP': { en: 'Continuous Data Protection', tag: '数据保护', def: '持续数据保护，对核心数据持续记录变化日志，秒级 RPO，可恢复到任意时间点。对位传统备份（小时/天级 RPO），是应对勒索软件、误操作的杀手锏。中安 TeraBackup、英方 i2 都是 CDP 产品。' },
      'CDM': { en: 'Copy Data Management', tag: '数据保护', def: '副本数据管理，统一管理多用途数据副本（备份/灾备/测试/分析）。用一份基底+多份增量节省 5-10 倍空间。Actifio、火山引擎 ABM 是代表。' },
      'CRR': { en: 'Cross Region Replication', tag: '数据保护', def: '跨区域复制，把数据同步到另一个地理位置，应对区域性灾难（地震、断电）。云上对象存储一般原生支持，关系数据库需要主从+异地从库。' },
      'RPO': { en: 'Recovery Point Objective', tag: '数据保护', def: '恢复点目标，灾难发生时最多能丢多长时间的数据。RPO=1 小时 = 最多丢 1 小时数据；RPO=0 = 不允许丢数据（需要同步复制+双活）。' },
      'RTO': { en: 'Recovery Time Objective', tag: '数据保护', def: '恢复时间目标，灾难后业务恢复所需时间。RTO=4 小时 = 4 小时内必须恢复；金融核心业务 RTO 通常 <30 分钟。' },
      'WORM': { en: 'Write Once Read Many', tag: '数据保护', def: '一次写入多次读取的不可变存储。抵御勒索软件加密改数据——即使被攻破也无法删除/改写备份。等保 3 级、金融合规标配。' },
      'Air-Gap': { tag: '数据保护', def: '物理隔离区，备份完成后切断与生产网络的连接（断网/拔线）。勒索病毒爬不到 Air-Gap 区。中安、英方、Veritas 都有 Air-Gap 产品方案。' },
      'Ransomware': { tag: '安全', def: '勒索软件，加密企业数据后索要赎金。2022 起爆发增长，已成为企业第一安全威胁。CDP（任意时间恢复）+ Air-Gap（隔离备份）+ WORM（不可变存储）三件套是有效防御。' },
      '3-2-1': { tag: '数据保护', def: '备份黄金法则：3 份副本、2 种介质、1 份异地。如本地原始+本地磁带备份+异地对象存储备份。被业界沿用 30+ 年。' },
      '快照': { tag: '数据保护', def: 'Snapshot，某一时刻数据的只读副本。秒级创建（只存增量，不复制全量）、占空间少、可瞬间恢复。块存储、文件存储、数据库都支持。' },
      '全量备份': { tag: '数据保护', def: 'Full Backup，完整复制所有数据。占空间大、恢复快、独立可用。一般每周做一次。' },
      '增量备份': { tag: '数据保护', def: 'Incremental Backup，只备份自上次（任意）备份以来变化的数据。空间小、备份快，但恢复需要全量+所有增量链。' },
      '差异备份': { tag: '数据保护', def: 'Differential Backup，备份自上次全量以来所有变化（不依赖上次差异）。空间和速度介于全量和增量之间，恢复只需全量+最新差异。' },
      '归档': { tag: '数据保护', def: 'Archive，把不常访问的冷数据搬到便宜慢的介质（磁带/冷归档存储），降本 10 倍+。访问需要分钟到小时级解冻。合规法规要求保留 5-30 年时刚需。' },
      'Failover': { tag: '容灾', def: '故障切换，主系统挂时自动切到备系统。配合心跳检测、健康检查、VIP 漂移完成。Failover 时间 = RTO。' },
      'Failback': { tag: '容灾', def: '故障回切，主系统恢复后从备系统切回。比 Failover 更复杂，因为要先把备系统的新数据同步回主才能切。' },
      'Active-Active': { tag: '容灾', def: '双活/同时写，两套系统同时承担业务读写。RPO ≈ 0、RTO 极短，但需要解决数据冲突、网络分区。成本最高的容灾形态。' },
      'Active-Passive': { tag: '容灾', def: '主备/单活，备系统平时只同步数据不承担业务。简单可靠，但备机长期闲置（成本浪费）。多数中小客户的选择。' },
      '双活': { tag: '容灾', def: '两个数据中心同时承担业务，互为热备。任一挂了另一秒级接管。RPO ≈ 0、RTO < 1 分钟，但要求专线低延迟、数据同步复杂、成本高。金融核心业务标配。' },
      '同城双活': { tag: '容灾', def: '同一城市内两个机房构成双活，距离 30-50 km、延迟 1-3 ms。能抵抗机房级故障（断电、火灾），但抗不住城市级灾难（地震、洪水）。' },
      '异地多活': { tag: '容灾', def: '不同地域多个机房同时承担业务（不同于同城双活）。蚂蚁、淘宝、抖音都用单元化架构实现。RPO=0 极难，多数采用最终一致+异步复制。' },
      '两地三中心': { tag: '容灾', def: '同城双中心（双活/主备）+异地一个中心（灾备）的经典容灾架构。同城抗机房故障、异地抗区域灾难。金融、政企客户合规要求标配。' },
      'D2D2D': { tag: '数据保护', def: 'Disk-to-Disk-to-Disk，磁盘三级复制：本地→同城→异地。常见于政务云、银行灾备方案。和"两地三中心"配套出现。' },
      'D2D2T': { tag: '数据保护', def: 'Disk-to-Disk-to-Tape，磁盘到磁盘再归档到磁带。磁带 ¥10/TB（vs 磁盘 ¥200/TB），适合长期保留+合规归档。' },
      '单元化': { tag: '容灾', def: '把业务按用户/订单 ID 切成多个独立单元，每个单元在不同机房独立运行。蚂蚁集团的"异地多活"基石，让一个机房挂掉只影响 1/N 用户。' },
      'CR': { en: 'Continuous Replication', tag: '数据保护', def: '持续复制，实时同步源端数据到目标端。和 CDP 区别：CR 同步当前状态，CDP 保留历史每个时刻；CR 用于灾备/迁移，CDP 用于"任意时间点恢复"。' },

      // ===========================================================
      // 🇨🇳 信创与合规
      // ===========================================================
      '信创': { tag: '信创', def: '信息技术应用创新，国产化替代——CPU/OS/数据库/中间件全栈国产。等保+信创是政企单子的双必答题。鲲鹏+欧拉+高斯+HCS 是华为信创代表组合。' },
      '鲲鹏': { tag: '信创', def: '华为基于 ARM 架构的国产 CPU 系列（鲲鹏 920 是主力）。对位 Intel Xeon。配合欧拉 OS 构成华为信创基座。' },
      '昇腾': { tag: '信创', def: '华为 AI 算力芯片（昇腾 910B 对位 NVIDIA H100，910C 对位 H200）。Atlas 800/900 是昇腾代表集群产品。国产 AI 算力的主流方案。' },
      '欧拉': { tag: '信创', def: 'openEuler，华为捐赠给开放原子基金会的开源 Linux 发行版。国产服务器 OS 主流之一。CentOS 停服后大量企业切换到欧拉。' },
      '高斯': { tag: '信创', def: '华为 GaussDB，国产分布式数据库系列，含 OLTP(MySQL/PG 兼容)、OLAP(DWS)、NoSQL、向量等多种引擎。对位 Oracle/PostgreSQL。' },
      '海光': { tag: '信创', def: '海光信息（Hygon）国产 x86 CPU，AMD 授权技术。国内市场份额仅次于鲲鹏。海光 AI 加速卡（DCU）也对位 NVIDIA。' },
      '龙芯': { tag: '信创', def: '中科院龙芯中科的国产 CPU，自研 LoongArch 指令集（非 ARM/x86）。完全自主可控但生态最难——需要专门编译软件。' },
      '飞腾': { tag: '信创', def: '飞腾信息技术的国产 ARM CPU，FT-2000/4000 系列。和鲲鹏并列国产 ARM 双雄。' },
      '麒麟': { tag: '信创', def: '银河麒麟 OS 和中标麒麟 OS（2019 合并为麒麟软件）。基于 Linux 的国产服务器 OS，市占率较高。' },
      '统信': { tag: '信创', def: '统信 UOS，深度 Linux 演进的国产桌面+服务器 OS。强调"开箱即用"，办公场景成熟度较高。' },
      '达梦': { tag: '信创', def: '达梦数据库（DM），国内最早的国产关系数据库厂商之一。对位 Oracle，电力、金融、政府广泛使用。' },
      '人大金仓': { tag: '信创', def: 'KingbaseES，中国人民大学背景的国产数据库。PostgreSQL 兼容，党政军场景份额大。' },
      '瀚高': { tag: '信创', def: '瀚高（HighGo）数据库，山东本土国产关系数据库厂商。PostgreSQL 兼容。' },
      'HCS': { tag: '信创', def: 'Huawei Cloud Stack，华为私有云专有解决方案。国内私有云市场份额第一。基于华为公有云内核，部署在客户机房。' },
      '等保': { tag: '合规', def: '等保 2.0，《网络安全等级保护基本要求》（GB/T 22239-2019）。1-5 级，三级是政企/金融常见要求。涉及物理/网络/主机/应用/数据/管理全方位。' },
      '密评': { tag: '合规', def: '商用密码应用安全性评估，按《密码法》要求企业部署国密算法（SM2 非对称、SM3 哈希、SM4 对称）。金融、政务、医疗信息系统必做。' },
      'GMP': { tag: '合规', def: 'Good Manufacturing Practice，药品生产质量管理规范。医药行业 IT 合规标准，要求数据完整性、可靠性、可追溯性。海南三洋药业、广州白云山等是典型客户。' },
      'HIPAA': { tag: '合规', def: '美国医疗健康数据保护法，要求医院/保险公司对患者数据加密、审计、访问控制。出海医疗 SaaS 合规要点。' },
      'GDPR': { tag: '合规', def: '欧盟通用数据保护条例，史上最严数据隐私法律。罚款可达营收 4%。出海欧洲业务必须合规：数据驻留、用户授权、被遗忘权等。' },
      '国密': { tag: '合规', def: '国密算法体系，SM2（椭圆曲线非对称，对位 RSA/ECC）/SM3（哈希，对位 SHA-256）/SM4（对称分组，对位 AES）/SM9（标识密码）。密评要求强制使用。' },
      '自主可控': { tag: '信创', def: '从芯片到 OS 到数据库到中间件全栈国产+开源可控。是党政、央国企、关键基础设施的强制要求。等保 4 级、信创认证都要看这一项。' },

      // ===========================================================
      // 🏢 竞品厂商与产品
      // ===========================================================
      '阿里云': { tag: '竞品', def: '中国最大公有云（2024 IDC 数据约 36% 份额），2009 年阿里飞天起步。生态最厚、数据中台最成熟（DataWorks）、价格最灵活。强势在互联网/零售/部分政务。' },
      '华为云': { tag: '竞品', def: '中国政企第一云（2024 IDC 数据约 19% 份额），2017 年大规模商用。强势在政务/国企/信创/全栈自主。盘古/HCS/CCE/FusionInsight 是核心。' },
      '腾讯云': { tag: '竞品', def: '中国第三大公有云（约 16%），游戏/视频/微信生态主场。代表产品：TRTC、混元大模型、腾讯会议、TDSQL。' },
      '百度智能云': { tag: '竞品', def: 'AI 老品牌（约 9% 份额），文心一言+智能驾驶 Apollo 是核心资产。部分政企+智慧交通有积累，企业级 ToB 应用化速度被字节追上。' },
      'AWS': { tag: '竞品', def: 'Amazon Web Services，全球最大公有云。中国大陆 2024 年起合规收紧，主战场转向出海、外企在华。生态最深、SDK 最完善、文档最全。' },
      'Azure': { tag: '竞品', def: '微软云，全球第二大公有云。AI 领先优势源于 OpenAI 投资。中国版由世纪互联运营，主要服务外企在华。' },
      'GCP': { en: 'Google Cloud Platform', tag: '竞品', def: '谷歌云，全球第三大公有云。AI/大数据/Kubernetes 技术领先（K8s/TensorFlow 都源自 Google），但中国大陆没有节点。' },
      '天翼云': { tag: '竞品', def: '中国电信旗下国资云，央国企/区县政府主场。强势在网络资源+央企决策链。2024 年起在政企单子里份额持续上升。' },
      '移动云': { tag: '竞品', def: '中国移动旗下国资云，覆盖范围广、网络强。在地方政府、运营商内部系统占优。' },
      '联通云': { tag: '竞品', def: '中国联通旗下国资云，与腾讯云有合作渊源。在联通体系内的系统占优。' },
      '盘古': { tag: '竞品', def: '华为大模型，分 NLP/CV/多模态/预测/科学计算多子模型。行业知识深，迭代慢，开发者生态相对闭。政务/煤矿/电网等垂直场景有积累。' },
      '通义千问': { tag: '竞品', def: '阿里大模型 Qwen 系列。开源版本（Qwen-7B/14B/32B/72B）生态广，海外开发者影响力大。商业版叫"通义"。' },
      '文心一言': { tag: '竞品', def: '百度文心大模型，国内最早商用 LLM 之一。中文语料积累深、知识图谱底子厚、ToB 应用化速度被字节追上。' },
      'DeepSeek': { tag: '竞品', def: '幻方量化旗下大模型公司。DeepSeek-V3（通用）/R1（推理）性价比极高（API ¥1/百万 token 输入），开源策略影响全球行业。' },
      '混元': { tag: '竞品', def: '腾讯大模型，接入微信/腾讯文档/视频号生态。多模态能力突出（文/图/视频）。' },
      '智谱': { tag: '竞品', def: '清华系大模型公司，ChatGLM/GLM-4 系列。开源版本社区活跃，是国内最早开源的 LLM 厂商之一。' },
      'Kimi': { tag: '竞品', def: '月之暗面（Moonshot）的大模型品牌。长上下文起家（200 万 token），C 端"Kimi 智能助手"装机量大。' },
      'ModelArts': { tag: '竞品', def: '华为云 AI 开发平台，对位火山方舟+机器学习平台。AutoML、大规模训练、模型管理、推理服务一站式。' },
      'FusionInsight': { tag: '竞品', def: '华为云大数据平台，含 HDFS/HBase/Hive/Spark/Flink。偏传统 Hadoop 生态。对位 DataLeap+EMR。' },
      'DataWorks': { tag: '竞品', def: '阿里云数据中台旗舰产品，业内最成熟的数据开发治理平台。覆盖数据集成/开发/调度/治理/资产/服务全链路。对位 DataLeap。' },
      'MaxCompute': { tag: '竞品', def: '阿里云离线大数据平台，原名 ODPS。EB 级数据仓库，阿里集团内部主力数仓。对位 ByteHouse + EMR 组合。' },
      'GaussDB': { tag: '竞品', def: '华为分布式数据库，含 OLTP(MySQL/PG/Oracle 兼容)/OLAP(DWS)/NoSQL/向量等多引擎。' },
      'GoldenDB': { tag: '竞品', def: '中兴通讯分布式数据库，金融/政府国产化替代 Oracle 主流方案之一。' },
      'OceanBase': { tag: '竞品', def: '蚂蚁集团自研分布式数据库。从支付宝核心系统出来，2020 年开源。Oracle/MySQL 兼容，金融场景广泛使用。' },
      'TiDB': { tag: '竞品', def: 'PingCAP 开源的 NewSQL 分布式数据库，MySQL 兼容，HTAP 能力强。微博、Shopee、丰巢、网易等大客户使用。' },
      'PolarDB': { tag: '竞品', def: '阿里云自研云原生数据库，分 MySQL/PG/Oracle 兼容三个版本。共享存储 + 计算节点解耦，性能 6 倍于自建。' },
      'OceanStor': { tag: '竞品', def: '华为存储系列产品，含全闪存、混闪、分布式。国内存储市场份额第一。' },
      'OpenStack': { tag: '私有云', def: '开源私有云平台事实标准，IaaS 层。华为/中兴/H3C/烽火/红帽私有云都基于 OpenStack 二次开发。' },
      '深信服': { tag: '厂商', def: '中国老牌安全+超融合厂商，超融合 HCI+VDI（虚拟桌面）+终端安全是核心。' },
      '英方': { tag: '厂商', def: '上海英方软件，国产数据复制/CDP/灾备厂商。i2 系列产品在金融、运营商有积累。售前讲数据保护必绕不开。' },
      '中安数联': { tag: '厂商', def: '陕西中安数联，国产备份/容灾/归档/迁移厂商。产品矩阵：TeraBackup（备份）/TDRP（容灾）/TA（归档）/TCMP（迁移）。简历主人 2025 在职。' },
      'TeraBackup': { tag: '产品', def: '中安数联备份产品，含 Master/Media Server 架构。支持物理机/虚拟机/数据库/无代理备份，配合 T200/T400 一体机硬件。' },
      'TDRP': { tag: '产品', def: '中安数联容灾产品，提供本地+异地+云灾备一体化。配合 TeraBackup 形成完整数据保护栈。' },
      'Networker': { tag: '产品', def: 'Dell EMC 企业级备份软件，配 Data Domain 重删存储是传统金融/政企备份标配。简历主人在广汽本田/康佳项目中使用。' },
      'Data Domain': { tag: '产品', def: 'Dell EMC 重删存储一体机。备份场景重删比 10-50:1，大幅省空间。' },
      'Veritas': { tag: '厂商', def: '美国老牌备份厂商，NetBackup 是世界级备份软件。和 Dell Networker、Commvault 并列三大企业级备份。' },
      'Commvault': { tag: '厂商', def: '美国企业级数据保护厂商，比 Veritas/Networker 更年轻但功能集成度高。SaaS 备份业务快速增长。' },

      // ===========================================================
      // 🏛 行业方案与政务
      // ===========================================================
      '数字政府': { tag: '行业', def: '政府数字化转型方案，含一网通办/一网统管/政务云/政务大模型/数据共享/数字员工。华为/阿里/天翼/火山激烈竞争的领域。' },
      '智慧城市': { tag: '行业', def: '城市级数字化方案，含交通/水务/应急/能源/政务/医疗。城市大脑是核心调度中心，"一图全感知"是终极目标。' },
      '智能客服': { tag: '行业', def: 'AI 客服系统，含意图识别/知识库/对话管理/转人工。RAG+LLM 替代传统检索式客服，解决率从 40% 提升到 70%+。火山方舟+Coze 是落地方案。' },
      '一网通办': { tag: '政务', def: '数字政府代表场景，一个网站办所有政府事项。后端要打通 N 个委办局数据。上海、浙江、深圳是标杆。' },
      '一网统管': { tag: '政务', def: '城市治理一图全感知，把交通/水务/应急/网格等数据汇到城市大脑统一调度。和"一网通办"是政府数字化双轮。' },
      '雪亮工程': { tag: '政务', def: '公共安全视频监控联网应用项目，城乡视频全覆盖+智能分析。华为/海康/大华长期主导。' },
      '智慧应急': { tag: '行业', def: '应急指挥平台，含监测预警/指挥调度/应急救援/灾后评估全链路。覆盖地震、洪水、火灾、危化品事故。' },
      '智慧水务': { tag: '行业', def: '城市供排水智能化方案，含管网监测/水质分析/调度优化/应急响应。华为、阿里、中科水景是主要玩家。' },
      '智慧园区': { tag: '行业', def: '产业园区数字化方案，含安防/能耗/会议/招商/物业一体化。华为/阿里/万达广泛部署。' },
      '智慧医院': { tag: '行业', def: '医院信息化方案，含 HIS/EMR/PACS/CIS+AI 辅诊+互联网医院。等保三级+患者数据隐私是核心合规挑战。' },
      'HIS': { tag: '医疗', def: 'Hospital Information System，医院信息系统，含挂号/收费/医保/药品管理等业务模块。每家医院的核心 IT 系统。' },
      'EMR': { tag: '医疗', def: 'Electronic Medical Record，电子病历系统。和 HIS 互联，记录诊疗过程。HIPAA、等保对 EMR 有严格要求。' },
      'PACS': { tag: '医疗', def: 'Picture Archiving and Communication System，影像归档与通信系统。医院 CT/MRI/X 光等影像存储+调阅平台。' },
      'CRM': { tag: '行业', def: 'Customer Relationship Management，客户关系管理系统。Salesforce 是 SaaS 鼻祖，国内有纷享销客、销售易、加推。' },
      'ERP': { tag: '行业', def: 'Enterprise Resource Planning，企业资源规划。SAP、Oracle 是国际巨头，国内有用友、金蝶、Odoo。' },
      'MES': { tag: '行业', def: 'Manufacturing Execution System，制造执行系统，连接 ERP（计划层）和 SCADA（设备层）。智能制造关键中间层。' },
      'SCADA': { tag: '行业', def: 'Supervisory Control and Data Acquisition，监控与数据采集系统。工业现场设备的实时监控大脑，电网、水务、能源标配。' },
      'PLC': { tag: '行业', def: 'Programmable Logic Controller，可编程逻辑控制器。工业自动化最底层控制单元，西门子、三菱、罗克韦尔是巨头。' },
      'IoT': { en: 'Internet of Things', tag: '行业', def: '物联网，设备-平台-应用三层架构。火山引擎 IoT 平台支持千万级设备接入，对位阿里云 IoT、华为云 IoT。' },

      // ===========================================================
      // 🔒 安全
      // ===========================================================
      'DDoS': { tag: '安全', def: 'Distributed Denial of Service，分布式拒绝服务攻击。云上 DDoS 高防能扛 T 级流量。代表：阿里云高防 IP、火山高防包。' },
      '零信任': { tag: '安全', def: 'Zero Trust，默认不信任任何用户/设备，每次访问都验证（身份+设备健康+上下文）。替代传统"内网就安全"的边界模型。SASE 是其架构落地。' },
      'SASE': { tag: '安全', def: 'Secure Access Service Edge，安全+网络融合云服务。传统 VPN 的替代品，远程办公时代必备。Zscaler、Netskope、深信服 aTrust 是代表。' },
      'HSM': { tag: '安全', def: 'Hardware Security Module，硬件密码机。金融/政务存储密钥的合规设备，FIPS 140-2 三级认证。云上 KMS+HSM 配合做密钥管理。' },
      'KMS': { tag: '安全', def: 'Key Management Service，密钥管理服务。云上托管密钥，配合 HSM 实现合规加密。AWS KMS、阿里云 KMS、火山 KMS 都是同名产品。' },
      'CC 攻击': { tag: '安全', def: 'Challenge Collapsar，模拟正常用户高频访问消耗服务器资源。和 DDoS 区别：DDoS 拼流量，CC 拼复杂请求数。WAF 是主要防御工具。' },

      // ===========================================================
      // 📈 数据中台与营销
      // ===========================================================
      'DMP': { tag: '数据', def: 'Data Management Platform，数据管理平台，集中处理用户画像+广告投放。腾讯 DMP、阿里达摩盘是代表。' },
      'CDP（营销）': { tag: '数据', def: 'Customer Data Platform，客户数据平台。统一融合多渠道用户数据（CRM/网站/APP/小程序），构建 360 度画像。注意和数据保护的 CDP 重名。' },
      'DataPhin': { tag: '竞品', def: '阿里云智能数据建设与治理平台。是 DataWorks 的升级品牌，强调"数据资产化"。' },
      'QuickBI': { tag: '竞品', def: '阿里云 BI 工具，可视化分析+报表+大屏。对位 PowerBI/Tableau。' },
  
    // ===== 第二批扩充（基于扫描语料发现的高频未收录词）=====
    // 计算/存储核心
    'AI': { en: 'Artificial Intelligence', tag: 'AI', def: '人工智能。狭义指 ML/DL/LLM 等技术；广义指让机器具备感知、推理、决策、生成能力的工程。火山引擎的 AI 产品矩阵包括豆包、火山方舟、机器学习平台、VikingDB。' },
    'API': { en: 'Application Programming Interface', tag: '云', def: '应用程序接口，让不同系统通过预定义协议交互。RESTful API、GraphQL、gRPC 是主流形态。云上一切资源都通过 API 操作（OpenAPI、SDK 都是 API 的不同封装）。' },
    'ECS': { en: 'Elastic Compute Service', tag: '云', def: '弹性云服务器，云上最基础的虚拟机。火山 ECS、阿里 ECS、AWS EC2 同义。提供 CPU/内存/网卡/磁盘的灵活组合，分钟级开通，按量/包月计费。' },
    'EBS': { en: 'Elastic Block Storage', tag: '云存储', def: '弹性块存储，给 ECS 挂载的网络云盘。可热扩容、可快照、可跨可用区迁移。性能从普通云盘（几千 IOPS）到 NVMe SSD（几十万 IOPS）多档可选。' },
    'ENI': { en: 'Elastic Network Interface', tag: '云网络', def: '弹性网卡，可以独立于 ECS 创建、绑定、解绑。一台 ECS 可绑多张 ENI 实现多 IP 多网段；故障切换时把 ENI 漂到备机，IP 不变。' },
    'IDC': { en: 'Internet Data Center', tag: '架构', def: '互联网数据中心，传统机房。客户自己买服务器/网络/制冷设备，运维全包，CapEx 重、利用率 10-15%。上云就是把 IDC 的活外包给云厂商。' },
    'POP': { en: 'Point of Presence', tag: '云网络', def: '接入点，CDN/网络服务在城市的边缘节点。北京 POP、上海 POP、广州 POP 都是物理机房。用户访问就近 POP，CDN 厂商在全球部署 1000+ POP。' },

    // 数据库/中间件
    'MySQL': { tag: '数据库', def: '最流行的开源关系数据库，1995 年瑞典 MySQL AB 发布，被 Oracle 收购。OLTP 主力库，单实例 1-3 万 QPS。火山 veDB、阿里 RDS、华为 GaussDB(MySQL) 都是托管 MySQL。' },
    'PostgreSQL': { tag: '数据库', def: '功能最丰富的开源关系数据库（被誉为 "开源 Oracle"），强项是复杂查询、JSON 字段、向量、地理空间。火山、阿里、华为都提供托管 PG 服务。' },
    'PG': { tag: '数据库', def: 'PostgreSQL 的简称。常说 "PG 系" 数据库——很多国产数据库（GaussDB、瀚高、金仓）都基于 PG。' },
    'Oracle': { tag: '数据库', def: '美国甲骨文公司及其旗舰商业数据库。金融、电信、政府等高端 OLTP 场景统治者。"去 O" = 国产数据库替代 Oracle 是信创核心话题。' },
    'DB': { tag: '数据库', def: 'Database 的缩写。一般指关系型/非关系型数据系统。云上 "veDB" "GaussDB" "PolarDB" 都用 DB 后缀。' },
    'RDS': { en: 'Relational Database Service', tag: '数据库', def: '关系型数据库服务，云上托管的 MySQL/PostgreSQL/SQL Server。云厂商负责备份/高可用/补丁/监控，客户专注业务。比自建省 70% 运维。' },
    'SQL': { en: 'Structured Query Language', tag: '数据库', def: '结构化查询语言，关系数据库标准操作语言。SELECT/INSERT/UPDATE/DELETE 是 CRUD 四件套。' },
    'DTS': { en: 'Data Transmission Service', tag: '数据', def: '数据传输服务，把数据从一个库同步到另一个（如 MySQL 上云、跨地域同步、CDC 流到 Kafka）。阿里 DTS、华为 DRS、火山 veDB 同步是同类产品。' },
    'IOPS': { en: 'Input/Output Operations Per Second', tag: '架构', def: '每秒读写操作数，磁盘性能核心指标。普通 SSD 几万 IOPS，NVMe SSD 几十万 IOPS。数据库密集小 IO 场景的瓶颈指标。' },

    // 中间件/消息
    'Service': { tag: '云原生', def: 'K8s 中提供稳定网络入口的资源。Pod IP 漂移，Service IP 不变。常见类型：ClusterIP（集群内）/NodePort（节点端口）/LoadBalancer（外部 LB）/Headless（无 IP）。' },
    'Cluster': { tag: '云原生', def: '集群，多台机器协同组成的一个逻辑系统。K8s 集群、Redis 集群、Kafka 集群、ES 集群都是同义。优势：扩容横向、单点故障无感、负载均衡。' },
    'BMQ': { tag: '火山', def: 'Byte Message Queue，火山引擎消息队列，对位阿里 RocketMQ、AWS SQS。抖音/今日头条内部主力 MQ 的对外版。' },
    'ISV': { en: 'Independent Software Vendor', tag: '售前', def: '独立软件供应商。云生态合作伙伴的一种，把自己的软件部署到云上卖。如把 SaaS 上架到火山引擎云市场。售前要懂 ISV 渠道分成模型。' },

    // AI / 机器学习
    'ML': { en: 'Machine Learning', tag: 'AI', def: '机器学习。让计算机从数据中"学习"规律而非硬编码规则。监督学习/无监督/强化学习是三大范式。LLM 是 ML 的特殊形态（自监督 + 大规模）。' },
    'DL': { en: 'Deep Learning', tag: 'AI', def: '深度学习，用多层神经网络做 ML。是当前 AI 主流方法。CNN（视觉）、RNN/LSTM（序列）、Transformer（语言）都是 DL 架构。' },
    'GPU': { en: 'Graphics Processing Unit', tag: 'AI', def: '图形处理器，原本做游戏渲染，因擅长并行计算成为 AI 训练/推理算力主力。NVIDIA H100/H200/B200 是当前训练王者，单卡 ¥30万+。' },
    'AIGC': { en: 'AI Generated Content', tag: 'AI', def: 'AI 生成内容，含文本（ChatGPT）、图像（Midjourney）、视频（Sora）、音乐（Suno）、代码（Copilot）。是 2023 起的产业大风口。' },
    'Coze': { tag: '火山', def: '字节扣子，国内最大的 AI Agent 开发平台。可视化拖拽搭建智能体，一键发布到微信公众号/抖音/网页/飞书。零代码做 AI 应用首选。' },
    'LSS': { tag: '火山', def: 'Live Streaming Service，火山直播服务的简称。含推流、转码、分发、低延迟拉流，<1.5s 端到端延迟。直播带货、连麦电商首选。' },
    '大模型': { tag: 'AI', def: 'Large Model 通称，参数百亿+的神经网络。包括 LLM（语言）、多模态、Vision、Audio 等。豆包/盘古/通义/文心都是大模型。' },
    '知识库': { tag: 'AI', def: '企业知识的结构化集合，配合 RAG 让 LLM 回答专业问题。火山方舟、Coze 都内建知识库管理。文档上传→自动切片→向量化→存 VikingDB。' },

    // 网络/安全
    'IP': { tag: '云网络', def: 'Internet Protocol 地址，网络上的唯一标识。IPv4 是 32 位（如 10.0.0.1），IPv6 是 128 位。云上分公网 IP（EIP）和私网 IP。' },
    'DNS': { en: 'Domain Name System', tag: '云网络', def: '域名系统，把 baidu.com 解析为 IP。云上的 DNS 服务还提供智能解析（按地域分流）、健康检查、CDN 联动。' },
    'TTL': { en: 'Time To Live', tag: '云网络', def: '生存时间。DNS 缓存 TTL 影响切换速度（小则切换快但根服务器压力大）；CDN 缓存 TTL 影响内容更新延迟。' },
    'TLS': { en: 'Transport Layer Security', tag: '安全', def: '传输层安全，HTTPS 的底层协议。当前主流 TLS 1.3，握手快、前向安全。云上 LB/CDN 都内置 TLS 卸载，业务无需自己跑加密。' },
    'SSH': { en: 'Secure Shell', tag: '安全', def: '安全终端登录协议。远程登录服务器、Git 推送、堡垒机、SCP 文件传输都基于 SSH。密钥对认证比密码更安全。' },
    'HTTP': { en: 'HyperText Transfer Protocol', tag: '云网络', def: '超文本传输协议，Web 标准协议。HTTP/1.1（队头阻塞）→ HTTP/2（多路复用）→ HTTP/3（基于 QUIC，更抗丢包）。' },
    'VPN': { en: 'Virtual Private Network', tag: '云网络', def: '虚拟专用网络，加密隧道。企业 IPSec VPN 把分支接入总部，IPSec SSL VPN 让员工远程办公。零信任/SASE 正在取代传统 VPN。' },
    'SD-WAN': { tag: '云网络', def: 'Software-Defined WAN，软件定义广域网。多分支企业的 MPLS 替代品，用互联网+智能路由+加密构建专网，成本降 60%+。' },
    'IAM': { en: 'Identity and Access Management', tag: '安全', def: '身份和访问管理，控制"谁能做什么"。云上 IAM 含用户、角色、策略、访问密钥。最小权限原则是安全合规底线。' },
    'CMK': { en: 'Customer Master Key', tag: '安全', def: '客户主密钥，KMS 中由客户管理的密钥。CMK 加密数据加密密钥（DEK），DEK 加密真实数据——双层加密保证安全。' },
    'SOC': { en: 'Security Operations Center', tag: '安全', def: '安全运营中心，企业 7x24 监控+响应安全威胁的指挥部。SIEM/SOAR 是其底层工具，云上 SOC 整合 WAF/DDoS/HSS/审计日志一站式。' },
    'ACL': { en: 'Access Control List', tag: '云网络', def: '访问控制列表。VPC 子网级 ACL 控制入方向/出方向流量，比安全组更粗粒度但能限制整个子网。' },
    'PL3': { tag: '云网络', def: 'Premium Line 3 / Private Line 3，私有专线/物理专线的不同等级。云专线（如阿里高速通道、火山专线）让客户 IDC 直连云上 VPC，绕开公网。' },

    // 计算/性能
    'CPU': { en: 'Central Processing Unit', tag: '架构', def: '中央处理器，通用计算。x86（Intel/AMD/海光）vs ARM（鲲鹏/飞腾/Graviton）vs RISC-V（龙芯）三大架构。' },
    'OS': { en: 'Operating System', tag: '架构', def: '操作系统。云上常见：Linux 系（CentOS/Ubuntu/欧拉/麒麟）、Windows Server。容器化让 OS 重要性降低，但底层仍是基石。' },
    'Linux': { tag: '架构', def: '开源 Unix-Like 操作系统，1991 Linus 创建。服务器市场占比 90%+，云原生 100%。发行版：Ubuntu、CentOS、RHEL、Debian、欧拉。' },
    'Windows': { tag: '架构', def: 'Microsoft Windows 操作系统。服务器版（Windows Server）和桌面版。.NET、Active Directory、SQL Server 等微软栈应用必选。' },
    'GB': { tag: '架构', def: 'Gigabyte，10 亿字节。1 GB = 1024 MB。云盘最小通常 20 GB。' },
    'TB': { tag: '架构', def: 'Terabyte，万亿字节。1 TB = 1024 GB。企业级数据集起步单位。' },
    'PB': { tag: '架构', def: 'Petabyte，千万亿字节。1 PB = 1024 TB。大型数据湖、互联网公司用户行为日志规模。' },
    'SDK': { en: 'Software Development Kit', tag: '云', def: '软件开发工具包，封装 API 调用的语言级库。如 Python SDK、Java SDK、JS SDK。比直接调 REST API 简洁。' },
    'IT': { en: 'Information Technology', tag: '行业', def: '信息技术。企业 IT 部门负责硬件/软件/网络运维。云时代 IT 部门重心从"机房运维"转向"业务赋能"。' },

    // 售前/销售/商业
    'ToB': { tag: '售前', def: 'To Business，面向企业销售。和 ToC（面向消费者）相对。ToB 决策链长（1-12 个月）、单价高（¥10万-¥千万）、需要售前 SA。' },
    'PoC': { en: 'Proof of Concept', tag: '售前', def: '概念验证（同 POC）。售前必经环节——把方案在客户真实数据上小范围跑一遍，证明能落地。' },
    'CapEx': { en: 'Capital Expenditure', tag: '售前', def: '资本支出，一次性大额投入买固定资产（服务器、机房、设备）。自建 IDC 是典型 CapEx。' },
    'OpEx': { en: 'Operational Expenditure', tag: '售前', def: '运营支出，持续性按月按用量付费。云服务是典型 OpEx。CFO 喜欢 OpEx（财务灵活、税务利好）。' },
    'JD': { en: 'Job Description', tag: '售前', def: '岗位职责。面试前必读 JD 找出 5-10 个关键词，回答时主动 hit。' },
    'SCQA': { tag: '售前', def: 'Situation/Complication/Question/Answer，麦肯锡问题分析框架。情境→冲突→问题→答案，是写方案 PPT 开头的标准结构。' },
    'STAR': { tag: '售前', def: 'Situation/Task/Action/Result，面试行为题黄金答案结构。讲项目案例必用：背景→任务→你的动作→量化结果。' },

    // 性能/运维
    'APM': { en: 'Application Performance Management', tag: '架构', def: '应用性能管理，监控应用调用链/慢查询/异常。代表：阿里 ARMS、华为 APM、Datadog、New Relic、SkyWalking。' },
    'SRE': { en: 'Site Reliability Engineering', tag: '架构', def: '站点可靠性工程，Google 提出的运维理念。用编程方式做运维（IaC、自动化、可观测），把运维变工程问题。SRE = 工程师 ÷ 50%。' },
    'Right-sizing': { tag: '云服务', def: '资源规格优化，FinOps 核心动作。把过大的 ECS 缩到合适规格（如 16 核降 8 核），可省 30-60% 成本。云厂商一般提供 RightSizing 建议工具。' },
    'Spot': { tag: '云服务', def: '抢占式实例，云厂商把空闲资源以 50-90% 折扣卖出。可被 5 分钟通知后回收。适合大数据离线计算、AI 训练 checkpoint 任务。' },

    // 中文术语
    '数据库': { tag: '数据库', def: '存储和管理数据的系统。结构化数据用关系库（MySQL/Oracle/PG），半结构化用文档库（MongoDB），KV 用 Redis，时序用 InfluxDB，向量用 VikingDB。' },
    '消息队列': { tag: '中间件', def: 'Message Queue，应用解耦+削峰填谷+异步处理的中间件。Kafka（大吞吐流）/RabbitMQ（业务）/Pulsar（云原生）/RocketMQ（阿里）/BMQ（火山）。' },
    '负载均衡': { tag: '云网络', def: 'Load Balance，把流量分发到多台后端。云上托管版（火山 SLB、阿里 SLB、AWS ELB）省去自建 Nginx 的运维。' },
    '容器服务': { tag: '云原生', def: '云上托管 K8s/Docker 的服务，统称 CaaS。火山 VKE、阿里 ACK、华为 CCE、AWS EKS 都是。客户提交镜像 + YAML，平台管节点和编排。' },
    '微服务': { tag: '云原生', def: 'Microservices，把单体应用拆成几十/几百个独立服务，每个独立部署/独立伸缩/独立技术栈。K8s+Service Mesh+API 网关是标配。' },
    '高并发': { tag: '架构', def: 'High Concurrency，同时处理大量请求的能力。秒杀、抢购、双 11 是高并发典型场景。靠水平扩展+缓存+异步+削峰来实现。' },
    '可观测': { tag: '架构', def: 'Observability，能从系统外部看清内部状态。三大支柱：Logs（日志）、Metrics（指标）、Traces（链路）。云上代表：阿里云 ARMS、火山 APMPlus、Datadog、OpenTelemetry。' },
    '客户端': { tag: '架构', def: 'Client，相对服务端的访问端。Web 浏览器、App、SDK、CLI 都是客户端。云上"X客户端"通常指安装在用户机器上的代理程序（如备份客户端、监控客户端）。' },
    '应用层': { tag: '架构', def: 'OSI 第 7 层 / TCP/IP 第 4 层，HTTP/HTTPS/WebSocket 都在这层。ALB（七层 LB）、API 网关、CDN 都是应用层基础设施。' },
    '架构图': { tag: '售前', def: 'Architecture Diagram，方案的可视化表达。云上常分逻辑架构图/部署架构图/数据流图三类。画图工具：draw.io、Visio、ProcessOn、火山引擎架构图工具。' },
    '调度器': { tag: '云原生', def: 'Scheduler，决定任务/容器放在哪台机器上跑的组件。K8s 默认 kube-scheduler 按资源+亲和性调度，可自定义如 Volcano 调度器适合 AI 大规模训练。' },
    '一站式': { tag: '售前', def: 'One-Stop，所有功能在一个平台搞定。云厂商最爱用的卖点。售前讲方案时一站式 = 客户少集成多家、少培训多团队。但也是绑定深、扩展弱的代价。' },
    '客户经理': { tag: '售前', def: 'Account Manager（AE），管客户关系+回款的销售。售前 SA 配 AE 是 ToB 标配——AE 找客户，SA 出方案。' },
    '一对一': { tag: '售前', def: '一对一服务，云厂商对大客户的差异化服务。包括专属客户经理、专属架构师、专属支持工程师。年消费 ¥100 万+一般享受。' },
    '日志库': { tag: '架构', def: 'Log Store，集中化日志收集+索引+检索系统。代表：阿里 SLS、火山 TLS、ELK 栈、Datadog Logs。比 grep 服务器日志高效 100 倍。' },
    '实时计算': { tag: '大数据', def: 'Stream Processing，毫秒到秒级处理数据流。Flink、Spark Streaming、Kafka Streams 是代表。金融实时风控、广告实时归因、IoT 实时告警标配。' },
    '短视频': { tag: '行业', def: '15 秒-3 分钟的视频内容。抖音、TikTok、视频号、快手是平台。火山引擎是抖音技术底座的对外版，短视频场景是火山引擎的天然主场。' },
    '视频号': { tag: '行业', def: '微信视频号，腾讯生态短视频平台。和抖音是国内短视频两大主力。' },
    '数据安全': { tag: '安全', def: '数据全生命周期保护（采集/传输/存储/使用/销毁）。手段：加密、脱敏、权限管控、审计、DLP、防勒索、合规分类分级。是售前讲云方案必答的合规问题。' },

    // 流程/方法论
    '需求挖掘': { tag: '售前', def: '从客户表述中挖出真正需要解决的问题。SPIN 提问法、5 Why、客户旅程图都是工具。售前最关键的能力，往往决定方案成败。' },
    '客户旅程': { tag: '售前', def: 'Customer Journey，把客户从认知→兴趣→评估→购买→使用→续费的完整路径可视化。售前+客户成功一起经营客户旅程。' },
    '客户成功': { tag: '售前', def: 'Customer Success，从售卖一次性产品转向持续帮客户成功。SaaS 时代核心 — 客户用得好/用得多才会续费扩容。' },

    // 火山引擎相关
    '火山引擎': { tag: '火山', def: '字节跳动旗下云服务品牌，2021 年正式独立。强项：AI 大模型（豆包）、数据分析（ByteHouse/DataLeap）、音视频（RTC/Live）、增长营销。' },
    '火山方舟': { tag: '火山', def: '火山引擎大模型 PaaS 平台，集成豆包+DeepSeek+智谱+Llama+Qwen 等多家模型 + 推理/评测/精调/Agent 链路。对位阿里百炼、华为 ModelArts。' },

    // 项目阶段
    '第一阶段': { tag: '售前', def: '项目分阶段实施的第 1 期。售前讲方案常用"先做 X 第一阶段验证→第二阶段全面推广"减少客户决策压力。' },
    '第二阶段': { tag: '售前', def: '项目第 2 期。一般在第一阶段验证成功后扩大规模。售前要把每个阶段的 KPI、时间、投入都写清楚。' },
    'HCSP-Presales': { tag: '认证', def: '华为 HCSP-Presales（Specialist Professional 售前认证）-Government & Public Affairs（政企方向）。简历主人考过此认证，懂华为打法，对应聘火山政企售前是核心优势。' },

    // ===== 第三批扩充 v12（基于全资料扫描，含 9 篇 md 学习资料）=====
    // 火山产品 / 大数据
    'BI': { en: 'Business Intelligence', tag: '数据', def: '商业智能，把数据转化为可视化分析与决策。代表：阿里 QuickBI、火山 DataWind、PowerBI、Tableau、帆软。BI 是数据中台对业务的最直接交付物。' },
    'DataWind': { tag: '火山', def: '火山引擎数据可视化平台（智能数据洞察），抖音/今日头条内部 BI 工具的对外版。支持自助拖拽分析、看板、大屏、归因分析。' },
    'DataSail': { tag: '火山', def: '火山引擎数据集成产品（DataLeap 子模块）。负责把业务库/日志/Kafka/SaaS 的数据搬到 EMR/ByteHouse/LAS 等目的端，支持 CDC 实时同步。' },
    'DataArts': { tag: '竞品', def: '华为云 DataArts Studio，一站式数据集成开发治理平台。对位火山 DataLeap、阿里 DataWorks。是华为云政企客户的数据中台核心产品。' },
    'Hive': { tag: '大数据', def: 'Hadoop 生态的 SQL 引擎，让 SQL 查 HDFS 上的数据。早期大数据标配（也叫"Hadoop SQL on Hadoop"），现在多被 Spark SQL / Trino 取代。' },
    'HBase': { tag: '大数据', def: 'Hadoop 生态的列存 NoSQL 数据库，PB 级随机读写。早年是大数据架构标配，现在多场景被 ClickHouse / TiKV 替代。' },
    'TOS/LAS': { tag: '火山', def: '火山引擎的对象存储 TOS + 湖仓服务 LAS 组合，构建数据湖底座。数据进 TOS，LAS 做 ELT 分析，是数据湖标配组合。' },

    // 计算/网络
    'NAS': { en: 'Network Attached Storage', tag: '云存储', def: '网络附加存储，提供 NFS/SMB 协议挂载的文件存储。多客户端共享读写。火山 NAS、阿里 NAS、AWS EFS 是同类。文件存储 vs 块存储（EBS）：NAS 多挂载、EBS 单挂载。' },
    'CLB': { en: 'Classic Load Balancer', tag: '云网络', def: '经典负载均衡，云上 L4+L7 一体的 LB 服务（如火山 CLB、阿里 CLB）。新的 ALB/NLB 分别专注 L7/L4，但 CLB 仍在使用。' },
    'LB': { en: 'Load Balancer', tag: '云网络', def: '负载均衡器统称。NLB（L4）/ALB（L7）/CLB（混合）都是 LB。把流量分发到多台后端实例，提升可用性和吞吐。' },
    'L4': { tag: '云网络', def: 'OSI 第 4 层=传输层（TCP/UDP）。L4 LB（NLB）只看 IP+端口，性能极高（百万级 PPS），适合数据库/游戏服务器。' },
    'L1': { tag: '云网络', def: 'OSI 第 1 层=物理层。光纤、双绞线、电信号传输。和云上业务工程几乎无关。' },
    'L2': { tag: '云网络', def: 'OSI 第 2 层=数据链路层（MAC 地址、VLAN）。云上 VPC 内的"大二层"网络让虚机跨物理机如同在同一交换机下。' },

    // 容器云原生
    'Deployment': { tag: '云原生', def: 'K8s 的核心工作负载资源，管理无状态应用。声明副本数 → K8s 保证始终运行 N 个 Pod。支持滚动升级、回滚、暂停、扩缩容。' },
    'HPA': { en: 'Horizontal Pod Autoscaler', tag: '云原生', def: '水平 Pod 自动伸缩器。根据 CPU/内存/自定义指标自动增减 Pod 数量。秒杀场景从 10 个 Pod 扩到 100 个再缩回。' },
    'NetworkPolicy': { tag: '云原生', def: 'K8s 网络策略，控制 Pod 之间通信白名单。默认 K8s 集群内 Pod 互通，生产环境必须配置 NetworkPolicy 做零信任。' },
    'Secret': { tag: '云原生', def: 'K8s 密钥资源，存储 API key/证书/密码等敏感数据。Base64 编码（非加密！需要配 KMS 才是真加密），挂到 Pod 作为环境变量或文件。' },
    'Prometheus': { tag: '云原生', def: 'CNCF 监控系统，云原生标配。Pull 模型采指标、PromQL 查询、Alertmanager 告警。和 Grafana 配套展示。' },
    'Envoy': { tag: '云原生', def: 'Lyft 开源的高性能代理，Istio Service Mesh 的数据面。负责服务间流量代理、限流、熔断、TLS、可观测。' },
    'Istio': { tag: '云原生', def: 'Google/IBM/Lyft 联合开源的服务网格控制面。配合 Envoy 把网络治理从应用代码下沉到 Sidecar。复杂度高，中大规模微服务才用。' },
    'Jenkins': { tag: '云原生', def: '老牌 CI/CD 服务器，自动化构建/测试/部署。云原生时代被 GitLab CI / GitHub Actions / Argo CD 部分取代，但企业内仍大量存量。' },
    'CI': { en: 'Continuous Integration', tag: '云原生', def: '持续集成，每次代码提交自动跑测试构建。Jenkins/GitLab CI/GitHub Actions 是代表。CI 通过率反映团队工程成熟度。' },
    'CD': { en: 'Continuous Deployment', tag: '云原生', def: '持续部署，CI 之后自动发到生产。和"持续交付"（自动到预生产，手动到生产）有区别。Argo CD、Flux CD 是 GitOps 时代代表。' },

    // 大模型相关
    'Pro': { tag: '火山', def: '豆包 Pro 系列，性能最强的旗舰版本。适合复杂任务（合同抽取、深度推理、代码生成）。API 价格高于 Lite 但效果更好。' },
    'Lite': { tag: '火山', def: '豆包 Lite 系列，性价比首选。响应快、价格低，适合客服对话、内容审核、简单分类等轻量任务。' },
    'Mini': { tag: '火山', def: '豆包 Mini 系列，最轻量版本。可端侧推理（手机/IoT 设备本地运行），低延迟+隐私保护场景适合。' },
    'Code': { tag: '火山', def: '豆包 Code 系列，专为代码生成/补全优化。对位 GitHub Copilot、阿里通义灵码。集成 IDE 插件、Web IDE。' },
    'Studio': { tag: '火山', def: '通常指开发平台。如 Coze Studio（Agent 开发）、ModelArts Studio（华为 AI）、Pangu Studio（华为大模型）。' },
    'Demo': { tag: '售前', def: '演示，向客户展示产品/方案的关键环节。售前 Demo 三原则：贴客户场景、控制时长（15-30 分钟）、可现场互动。' },
    'Top': { tag: '通用', def: '顶部/最优。常见用法 Top-K（前 K 名）、Top-N（前 N 条）、Top-Down（自顶向下设计）。' },
    'Function Call': { tag: 'AI', def: '函数调用/工具调用，让 LLM 输出结构化 JSON 指示调用哪个外部工具（查天气/搜索/订票）。是 Agent 的核心机制。' },

    // 安全/治理
    'RBAC': { en: 'Role-Based Access Control', tag: '安全', def: '基于角色的访问控制。不直接给用户授权，而是先建角色→把权限给角色→把角色给用户。K8s/IAM/数据库权限都用 RBAC。' },
    'NVIDIA': { tag: 'AI', def: '英伟达，全球 AI 算力霸主。H100/H200/B200 系列 GPU 是大模型训练事实标准，单卡 ¥30 万-¥80 万。被禁运后国内昇腾/海光/天数顶上。' },

    // 数据/文件存储
    '文件存储': { tag: '云存储', def: '提供 NFS/SMB 共享文件访问的云存储。多客户端可同时读写。代表：火山 NAS、阿里 NAS、华为 SFS。' },
    '对象存储': { tag: '云存储', def: 'Object Storage，扁平命名空间+HTTP API 访问的海量存储。代表：火山 TOS、AWS S3、阿里 OSS、华为 OBS。海量非结构化数据首选。' },
    '块存储': { tag: '云存储', def: 'Block Storage，给 VM 挂载的磁盘。POSIX 接口、低延迟、按 IOPS+容量计费。代表：火山 EBS、阿里 ESSD、AWS EBS。' },
    '冷存储': { tag: '云存储', def: 'Cold/Archive Storage，不常访问数据的低价存储层。单价比标准存储低 5-10 倍，但读取需分钟到小时级"解冻"。归档场景必备。' },
    'Archive': { tag: '云存储', def: '归档存储层。把不常访问的数据搬到便宜慢的介质（磁带/冷归档），合规法规要求保留 5-30 年时刚需。' },
    'S3': { tag: '竞品', def: 'AWS Simple Storage Service，对象存储事实标准（2006 推出）。"S3 兼容"成为行业 API 共识，火山 TOS/阿里 OSS/华为 OBS 都兼容 S3 协议。' },

    // 行业/产品
    'OA': { en: 'Office Automation', tag: '行业', def: '办公自动化系统。审批/请假/报销/公告。钉钉、飞书、企业微信、泛微、致远是主流 OA。火山引擎飞书是企业级 OA+协作 SaaS。' },
    'POS': { en: 'Point of Sale', tag: '行业', def: '销售终端系统。零售门店收银+库存+会员一体。云上 POS（阿里零售云、火山新零售云）让连锁门店实时同步总部。' },
    'FAQ': { en: 'Frequently Asked Questions', tag: '通用', def: '常见问题与解答。是企业知识库基础形态。RAG+LLM 让 FAQ 从静态检索升级到智能回答。' },
    'SOP': { en: 'Standard Operating Procedure', tag: '通用', def: '标准操作流程。售前 SOP=拿到客户线索 → 需求调研 → 方案撰写 → 演示 POC → 投标讲标 → 售中协同。' },
    'Web': { tag: '通用', def: '万维网，浏览器访问的页面集合。"Web 应用"=运行在浏览器里的应用（vs 桌面/App）。云上 Web 应用部署常用 ECS+SLB+CDN。' },
    'JSON': { en: 'JavaScript Object Notation', tag: '通用', def: '轻量级数据交换格式，键值对结构。API 响应、配置文件、日志主流格式。比 XML 简洁、比 YAML 严格。' },
    'TikTok': { tag: '火山', def: '字节跳动旗下海外短视频平台，月活 10+ 亿。火山引擎为 TikTok 提供云基础设施和 AI 推荐能力。' },
    'Cloud': { tag: '云', def: '云的英文。"Cloud Native"=云原生、"Cloud First"=优先上云策略、"Multi-Cloud"=多云。火山引擎品牌叫 Volcengine（火山的 Cloud）。' },
    'UGC': { en: 'User Generated Content', tag: '行业', def: '用户生成内容（vs PGC 专业生产/AIGC AI 生成）。短视频、社区评论、UGC 直播是火山引擎天然主场。' },
    'Stack': { tag: '通用', def: '技术栈/全栈。"LAMP Stack"=Linux+Apache+MySQL+PHP；"HCS Stack"=华为云全栈。云原生 Stack 多指 K8s+Istio+Prometheus 组合。' },
    'NVIDIA': { tag: 'AI', def: '英伟达，全球 AI 算力霸主。H100/H200/B200 是大模型训练事实标准。被禁运后国产昇腾/海光/天数等顶上，但生态差距仍大。' },
    'Hive': { tag: '大数据', def: 'Apache Hive，把 SQL 翻译成 MapReduce 跑在 HDFS 上的大数据 SQL 引擎。早期大数据标配，已被 Spark SQL/Trino 大量取代。' },

    // 商业/招聘
    'PPT': { tag: '通用', def: 'PowerPoint 演示文稿。售前必备技能——写客户方案、内部评审、招投标讲标都用 PPT。建议用麦肯锡 SCQA / 金字塔结构。' },
    'HR': { en: 'Human Resources', tag: '通用', def: '人力资源/人事。招聘、培训、绩效、薪酬。面试时遇到 HR 面要展现稳定性+文化匹配度，技术面留给技术官。' },
    'Offer': { tag: '通用', def: '录用通知。HR 发 Offer 后一般 3-7 天给反馈期，可谈薪资/职级/股票/Sign-on Bonus 等条件。' },
    'JD': { en: 'Job Description', tag: '通用', def: '岗位职责描述。面试前必读 JD 找出 5-10 个关键词，回答时主动 hit。' },
    'Sign-on': { tag: '通用', def: 'Sign-on Bonus，签字费/入职奖金。一次性现金奖励（一般等同 1-3 个月工资）补偿放弃前公司的损失。' },
    'Case': { tag: '售前', def: '案例/案件。售前讲解中"Case Study"=客户成功案例分析；面试"Case 类"题=给你一个具体业务场景让你设计方案。' },
    'Situation': { tag: '售前', def: 'STAR / SPIN 框架的"情境"维度。回答行为题或挖客户需求时，先讲背景情境再展开。' },

    // 中文复合术语
    '云原生': { tag: '云原生', def: 'Cloud Native，按云的能力重新设计应用——12-Factor + 容器化 + 微服务 + DevOps + 可观测。CNCF 是云原生生态主导组织。' },
    '云服务商': { tag: '云', def: 'Cloud Service Provider，提供云服务的厂商。中国主要：阿里云/华为云/腾讯云/火山引擎/百度智能云/天翼云。全球：AWS/Azure/GCP。' },
    '机器学习平台': { tag: '火山', def: '火山引擎 ML 平台，AI 模型从训练到部署的一站式工具。对位华为 ModelArts、阿里 PAI、AWS SageMaker。支持自定义模型 + AutoML + 大规模分布式训练。' },
    '产品矩阵': { tag: '售前', def: 'Product Portfolio，公司全部产品的集合。售前要会画客户能用到的"产品矩阵图"。火山引擎产品矩阵分 IaaS+PaaS+SaaS+AI+大数据 5 大板块。' },
    '参考答案': { tag: '售前', def: '面试题或案例的标准回答。本学习平台 05_面试题库与参考回答.md 提供 50+ 题参考答案。注意：参考答案是骨架，要换成你自己的项目经历填充。' },
    '示例回答': { tag: '售前', def: '面试问题的"示范级"答案。比参考答案更具体，含 STAR 结构、量化数据、真实场景。本平台学习资料里多处提供。' },
    '一句话': { tag: '售前', def: '"一句话总结"是售前核心能力。能把复杂方案压缩成 1 句话讲给客户高层。如"我们不抢底座，AI 应用层切入"=火山 vs 华为一句话。' },
    '产品演示': { tag: '售前', def: '售前向客户展示产品的环节（即 Demo）。原则：贴客户场景 + 控时 15-30 分钟 + 可现场互动 + 提前预演避免 bug。' },
    '解决方案': { tag: '售前', def: 'Solution，对客户某个业务问题的完整方案。包括需求理解+架构设计+产品组合+实施计划+商务报价。售前 SA 的核心交付物。' },
    '应用层': { tag: '架构', def: 'Application Layer，OSI 第 7 层。HTTP/HTTPS/WebSocket 都在这层。"AI 应用层"是火山引擎竞品差异化的核心抓手——不抢华为底座，AI 应用层切入。' },
    '数据集成': { tag: '数据', def: 'Data Integration，把多源数据汇到统一目的端。批/流/CDC 三种主要方式。火山 DataSail、阿里 DataX、Flink CDC、Debezium 是代表。' },
    '数据仓库': { tag: '数据', def: 'Data Warehouse / 数仓。结构化存储 + 主题域建模 + 历史快照。和 OLTP 库分离，避免分析查询拖垮业务。火山 ByteHouse、阿里 MaxCompute 是代表。' },
    '稳定性': { tag: '架构', def: 'Stability/Reliability。生产系统的可用性 + 性能 + 容错能力。SRE 团队的核心 KPI。三大指标：MTTR（故障恢复时间）/MTBF（故障间隔）/可用性百分比。' },
    '响应时间': { tag: '架构', def: 'Response Time / Latency。系统处理请求的时间。P50/P95/P99 不同分位数指标揭示不同的性能问题。API 响应一般要求 P99 < 1s。' },
    '准确率': { tag: 'AI', def: 'Accuracy，AI 模型对的比例。和 Precision（精确率）、Recall（召回率）、F1（综合）一起评估模型效果。智能客服一般要求准确率 > 90%。' },
    '安全性': { tag: '安全', def: '系统抵御威胁的能力。含身份验证、权限控制、加密、审计、合规等多个维度。等保 / ISO27001 是常见框架。' },
    '高并发': { tag: '架构', def: 'High Concurrency，同时处理大量请求的能力。秒杀、抢购、双 11 是典型场景。水平扩展+缓存+异步+削峰是基本手段。' },
    '客户故事': { tag: '售前', def: 'Customer Story / Case Study，客户成功案例。售前讲故事比讲产品有效 10 倍。每个售前要会讲 3-5 个不同行业的客户故事。' },
    '客户痛点': { tag: '售前', def: '客户业务痛点。"业务做不动/数据看不清/AI 用不起来/合规过不了"是常见类型。挖痛点用 SPIN 提问法效果最好。' },
    '客户业务': { tag: '售前', def: '客户的核心业务。售前必须先理解客户业务才能讲方案。"业务-技术-产品"翻译能力是售前 SA 的护城河。' },
    '数据资产': { tag: '数据', def: 'Data as Asset。把数据当公司核心资产经营。含资产目录+血缘+质量+权限+服务化。DataLeap 等数据中台核心产品就是做这件事。' },
    '数据中心': { tag: '架构', def: 'Data Center / 机房。物理服务器+网络+电力+制冷+消防的集中场所。云上"地域(Region)"由多个数据中心组成。' },
    '一站式': { tag: '售前', def: 'One-Stop，所有功能在一个平台搞定。云厂商最爱用的卖点。售前讲方案时一站式 = 客户少集成多家、少培训多团队。但也是绑定深、扩展弱的代价。' },
    '架构图': { tag: '售前', def: 'Architecture Diagram，方案可视化。常分逻辑架构图/部署架构图/数据流图三类。画图工具：draw.io、ProcessOn、Visio。售前 SA 必备技能。' },
    '业务目标': { tag: '售前', def: 'Business Objective，客户业务上要达成的目标。和"技术目标"是两个维度。售前的责任是把业务目标翻译成技术目标 + 量化指标。' },
    '实施计划': { tag: '售前', def: 'Implementation Plan，方案落地的时间表+里程碑+责任人+风险。方案设计八步法的第 6 步。客户最看重的就是"你能不能按时交付"。' },
    '成本收益': { tag: '售前', def: 'Cost-Benefit Analysis，成本对比收益的核心商务材料。把 TCO 三年总成本 vs 总收益（开源/节流/创收）算清楚，给 CFO 看的最重要一页 PPT。' },
    '风险预案': { tag: '售前', def: 'Risk Mitigation Plan，方案设计八步法最后一步。把识别到的风险（技术/进度/合规/商务）每个都给应对方案。售前不讲风险 = 不专业。' },
    '客户认证': { tag: '售前', def: 'Customer Reference Story，客户公开背书。Gartner 评分、客户视频证言、媒体报道是常见形式。售前讲故事的杀手锏。' },
    '差异化': { tag: '售前', def: 'Differentiation，和竞品比的独特价值。火山引擎差异化 = 字节场景+AI 迭代+生态开放。售前必须能讲清楚自己的差异化。' },
    '客户旅程': { tag: '售前', def: 'Customer Journey，客户从认知→兴趣→评估→购买→使用→续费的完整路径。售前+客户成功联合经营客户旅程。' },
    '权限管控': { tag: '安全', def: 'Access Control，谁能做什么的细粒度控制。IAM+RBAC+ABAC+审批流是常见手段。等保/合规的硬要求。' },
    '微服务态': { tag: '云原生', def: '微服务架构形态。一个业务系统拆成 N 个独立服务，独立开发+部署+扩展。代价：复杂度高、运维难、调试难。需要 K8s+Service Mesh+APM 三件套配套。' },
    '智能驾驶': { tag: '行业', def: 'Autonomous Driving，L1-L5 级自动驾驶。百度 Apollo/小鹏/华为/特斯拉是主要玩家。火山引擎为车企提供智能座舱+数据湖+车端 AI 算力支持。' },
    '智慧政务': { tag: '行业', def: '数字政府场景，含一网通办+一网统管+智慧城市+数字员工。华为/阿里/天翼云/火山激烈竞争的领域。' },
    '智慧医疗': { tag: '行业', def: '医院+医保+药企数字化。AI 辅诊、互联网医院、HIS+EMR+PACS 一体化是核心场景。合规挑战：HIPAA/患者隐私/三级等保。' },
    '智慧金融': { tag: '行业', def: '银行/保险/证券数字化。核心场景：反欺诈/智能风控/数字银行/智能投顾/合规审计。容灾要求最严格（两地三中心/RPO=0）。' },
    '智能客服': { tag: '行业', def: 'AI 客服系统，含意图识别+知识库+对话管理+转人工。RAG+LLM 替代传统检索式客服，解决率从 40% 提升到 70%+。' },
    '运营商': { tag: '行业', def: '电信运营商。中国电信/中国移动/中国联通三大。运营商既是云厂商（天翼/移动/联通云）也是大客户。' },
    '门店': { tag: '行业', def: '零售连锁实体店。云上"门店数字化"= 总部 ERP + 门店 POS + 会员 CRM + AI 推荐 + 视频监控 + IoT 设备一体化。' },
    '直播带货': { tag: '行业', def: '主播在直播间卖货。抖音/快手/视频号是主要平台。云上技术栈：RTC（连麦）+ Live（直播） + 弹窗购买 + 实时数据看板。' },
    '货品弹窗': { tag: '行业', def: '直播间右下角的购买卡片，点击直接下单。直播带货核心转化点。需要直播流+商品系统+订单系统的毫秒级联动。' },
    '车端': { tag: '行业', def: '车辆本地（座舱屏/车机/智驾系统）。和"云端"对应。L3+ 智能驾驶需要车端推理（毫秒响应），但模型训练在云端。' },
    '推荐系统': { tag: 'AI', def: '基于用户兴趣个性化推送内容。抖音/淘宝/今日头条是经典案例。技术栈：召回+排序+特征工程+实时反馈+A/B 测试。' },
    '多模态': { tag: 'AI', def: 'Multi-Modal，同时处理文本+图像+音频+视频的 AI 模型。GPT-4o、豆包视觉版、Sora 都是。让 AI 能"看图说话"、"读视频做摘要"。' },
    '数字员工': { tag: '行业', def: 'Digital Worker，AI Agent+RPA 替代或辅助人类员工。客服、HR、财务、销售等岗位都有数字员工。' },
    '存量场景': { tag: '售前', def: '客户已有 IT 系统的场景。和"增量场景"对应。售前要懂存量改造（评估+迁移+验证+切换）的方法论。' },
    '热点话题': { tag: '售前', def: '行业当前热议的事。AI 大模型、信创、出海、双碳、低代码是 2024-2026 热点。售前要会借热点切入客户对话。' },
    '关键词': { tag: '售前', def: 'Keyword。售前面试和讲标都要识别关键词——客户 JD 里的、招标书里的、客户高层讲话里的。围绕关键词答题/讲标是必修。' },
    '价值主张': { tag: '售前', def: 'Value Proposition，客户为什么选你。简洁 1-2 句话讲清"我能解决什么+独特价值是什么"。FFAB 中的 B（Benefit）。' },
    'AI/' : { tag: 'AI', def: '常见技术栈表达，如 AI/ML、AI/大模型、AI/RAG，斜线表示"或"或"组合"。' },
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
