// 章节小测：20 天 × 8 题 = 160 题；综合考试 50 题
const DAILY_QUIZ = {
  // ============ Day 1 云计算基础与全景架构 ============
  1: [
    { q: '云计算的"标志性起点"通常被认为是哪一年？', options: ['1999 年 Salesforce 成立', '2006 年 AWS 推出 S3 与 EC2', '2010 年 OpenStack 项目启动', '2014 年 Kubernetes 开源'], answer: 1, explanation: '2006 年 AWS 推出 S3（3 月）和 EC2（8 月），第一次把"按需付费的计算"做成商品，被业界视为云计算的标志性起点。' },
    { q: 'NIST 定义的云计算五大基本特征不包括以下哪一项？', options: ['按需自助服务', '资源池化', '快速弹性', '物理硬件独占'], answer: 3, explanation: 'NIST 五大特征：按需自助服务、广泛网络访问、资源池化、快速弹性、可计量服务。"物理硬件独占"恰好与多租户共享相反。' },
    { q: '以下哪种属于 PaaS（平台即服务）的典型代表？', options: ['火山引擎 ECS', 'veDB MySQL', '飞书', 'Coze 智能体平台'], answer: 1, explanation: 'veDB 是托管数据库，属于 PaaS；ECS 是 IaaS；飞书与 Coze 属于 SaaS。' },
    { q: '关于虚拟化和容器化技术，下列说法正确的是？', options: ['容器启动比虚拟机慢', '容器隔离基于 Linux Namespace 与 Cgroups', '虚拟机的资源密度比容器高', '所有云厂商都不再使用虚拟化'], answer: 1, explanation: '容器通过 Linux Namespace（命名空间）+ Cgroups（资源限额）实现进程级隔离；启动毫秒-秒级，密度远高于虚拟机。' },
    { q: '关于 6R 迁移策略，下列哪一项描述正确？', options: ['Rehost 是按云原生重写代码', 'Replatform 是替换为 SaaS 服务', 'Refactor 是按云原生架构重新设计', 'Retire 是保留在本地不迁'], answer: 2, explanation: 'Refactor 即重构为云原生架构。Rehost 是直接搬迁；Repurchase 才是替换 SaaS；Retain 才是保留本地。' },
    { q: '抢占式实例（Spot）相对按量计费的主要特点是？', options: ['永远不会被回收', '价格固定不变', '价格便宜 50-90% 但可能被回收', '只能用于数据库'], answer: 2, explanation: 'Spot 利用云厂商空闲资源，价格通常便宜 50-90%；但可能 5 分钟通知后被回收，适合 AI 训练 checkpoint、大数据离线计算。' },
    { q: '混合云的典型场景是？', options: ['只在一家公有云中部署', '只在自建机房中部署', '本地 IDC + 公有云通过专线打通', '使用多家公有云'], answer: 2, explanation: '混合云是本地 IDC 与公有云通过专线/VPN 打通；多家公有云称为多云；都用一家公有云不算混合。' },
    { q: '下列哪一项是行业云的典型特点？', options: ['完全等同公有云', '为特定行业提供合规基座与行业模板', '只在境外提供', '不支持等保'], answer: 1, explanation: '行业云为特定行业打造，提供等保/信创基座与行业插件模板，如汽车云、金融云、政务云。' }
  ],
  // ============ Day 2 云网络深度 ============
  2: [
    { q: 'CIDR 表示法中 10.0.0.0/16 表示多少个 IP 地址？', options: ['256', '1024', '4096', '65536'], answer: 3, explanation: '/16 = 2^(32-16) = 65536 个 IP 地址。' },
    { q: '关于安全组与网络 ACL，下列说法正确的是？', options: ['二者都是有状态的', '二者都是无状态的', '安全组是有状态、ACL 是无状态', '安全组工作在子网维度'], answer: 2, explanation: '安全组是有状态防火墙（出去流量自动允许返回），工作在 ECS/ENI 维度；网络 ACL 是无状态，工作在子网维度。' },
    { q: '四层负载均衡 NLB 与七层 ALB 的主要区别是？', options: ['NLB 不支持 HTTPS', 'NLB 工作在 TCP/UDP 层、ALB 工作在 HTTP 层', 'ALB 性能比 NLB 高', 'NLB 不能跨 AZ'], answer: 1, explanation: 'NLB 工作在四层 TCP/UDP，性能极高（百万 QPS）；ALB 工作在七层 HTTP/HTTPS，可基于 URL/Host 路由。' },
    { q: '电商详情页+API 类业务最适合使用以下哪种产品加速？', options: ['普通 CDN（仅静态）', 'DCDN 全站加速', '只用 EIP', '只用 NAT 网关'], answer: 1, explanation: 'DCDN 同时加速静态与动态请求，适合电商详情页/API 类业务；普通 CDN 主要加速静态资源。' },
    { q: '下列关于 VPC 互联方式的说法正确的是？', options: ['对等连接可用于跨 region 互联', 'CEN 适合多 VPC、跨 region 中心化互联', 'PrivateLink 必须经过公网', '专线只用于 VPC 间互联'], answer: 1, explanation: '对等连接通常同区域、CIDR 不重叠；CEN（云企业网）适合多 VPC、跨 region/账号；PrivateLink 不经公网；专线主要打通本地 IDC。' },
    { q: '关于 BGP 多线接入，下列说法正确的是？', options: ['只能接一个运营商', 'BGP 用于路由对接，可同时接入电信/联通/移动', 'BGP 必须搭配 NAT', '与 DNS 等价'], answer: 1, explanation: 'BGP 是边界网关协议，用于路由对接；多线 BGP 可避免单运营商故障，是典型多 ISP 接入方案。' },
    { q: 'CDN 缓存命中率较高时（90%+），主要带来什么收益？', options: ['用户访问延迟无变化', '回源带宽显著下降，节省源站压力', '源站需要更多机器', '必须额外购买 EIP'], answer: 1, explanation: 'CDN 命中率高时回源请求大幅减少，回源带宽可下降 10x；源站负载下降。' },
    { q: '关于 Anycast EIP，下列哪一项最准确？', options: ['只能在国内使用', '全球同一 IP 多 POP 接入，加速海外访问', '替代专线', '不支持游戏业务'], answer: 1, explanation: 'Anycast EIP 用同一公网 IP 在全球多个 POP 接入，海外访问延迟通常下降 30-50%；常用于游戏、外贸出海。' }
  ],
  // ============ Day 3 云存储深度 ============
  3: [
    { q: '对象存储与块存储的最大区别是？', options: ['对象存储不能存视频', '块存储是 RESTful API、对象存储是 POSIX', '对象存储是基于 HTTP 的扁平 Key-Value，块存储是裸设备', '块存储仅用于备份'], answer: 2, explanation: '对象存储基于 HTTP RESTful、Key-Value 扁平结构；块存储是裸设备级、POSIX 读写；二者定位完全不同。' },
    { q: '关于 IOPS、吞吐、延迟三大指标，下列匹配最准确的是？', options: ['IOPS 关心 MB/s', '吞吐关心毫秒响应', 'IOPS 关心每秒 I/O 次数（事务型业务）', '延迟关心总数据量'], answer: 2, explanation: 'IOPS 是每秒 I/O 次数（OLTP 事务型业务在意）；吞吐是 MB/s（分析型业务在意）；延迟是单次响应时间。' },
    { q: '关于对象存储分片上传（Multipart Upload），下列说法正确的是？', options: ['不支持断点续传', '只能上传 100 MB 以内文件', '支持并行上传与断点续传，单文件可达数十 TB', '会变慢'], answer: 2, explanation: '分片上传支持并行+断点续传，火山 TOS 单文件最大 48.8 TB；大文件场景必备。' },
    { q: '关于存储类别选择，最适合 1 年以上合规留档的低成本类型是？', options: ['Standard', 'IA 低频', 'Archive 归档', 'PL3 块存储'], answer: 2, explanation: 'Archive 单价是 Standard 的 1/4-1/10；适合 1 年+ 合规留档、视频冷备份。' },
    { q: 'KMS 信封加密的核心原理是？', options: ['只用一把密钥', '用 DEK 加密数据，CMK 加密 DEK', '不支持密钥轮转', '需暴露 CMK 给应用'], answer: 1, explanation: '信封加密用 DEK（数据加密密钥）加密数据，再用 CMK（主密钥）加密 DEK；CMK 永不落地，安全且性能好。' },
    { q: 'WORM（Write Once Read Many）的主要应用场景是？', options: ['高频读写数据库', '合规留档、防止删改', '机器学习训练数据', '直播流媒体'], answer: 1, explanation: 'WORM 写入后不可删改，等保/金融/政务部分场景强制要求；适合合规审计留档。' },
    { q: '关于 PB 级数据迁移，最适合的方式通常是？', options: ['用 SCP 走公网', '用闪电立方/Snowball 类离线设备', '用 NFS 挂载', '用 git 推送'], answer: 1, explanation: 'PB 级数据走 1 Gbps 公网需数十天；闪电立方/Snowball 物理设备寄送是工程上唯一可行方案。' },
    { q: '生命周期管理的典型价值是？', options: ['提升查询性能', '自动转换存储类别可省 50-80% 存储费', '只能删除数据', '与加密功能冲突'], answer: 1, explanation: '生命周期规则按对象前缀/Tag 自动转换：Standard → IA → Archive → 删除；正确配置可省 50-80% 存储费用。' }
  ],
  // ============ Day 4 云数据库与中间件 ============
  4: [
    { q: '关于 CAP 定理，分布式系统在网络分区情况下通常需要在哪两者中权衡？', options: ['一致性 C 与可用性 A', '原子性与隔离性', '吞吐与延迟', '安全与合规'], answer: 0, explanation: '云上分布式系统必选 P（分区容忍），所以核心矛盾在 C（一致性）vs A（可用性）。' },
    { q: 'MySQL 的默认事务隔离级别是？', options: ['读未提交', '读已提交', '可重复读 RR', '串行化'], answer: 2, explanation: 'MySQL InnoDB 默认隔离级别是 RR（可重复读）；Oracle 默认是 RC（读已提交）。' },
    { q: '关于 NewSQL 数据库（如 veDB、TiDB），下列说法正确的是？', options: ['不支持 ACID', '兼具 SQL + 分布式 + ACID 事务', '只支持 NoSQL 接口', '不能水平扩展'], answer: 1, explanation: 'NewSQL 兼具关系型 SQL 接口+分布式存储计算+ACID 事务，解决传统分库分表的复杂度。' },
    { q: '关于 Redis 缓存击穿、穿透、雪崩，下列说法正确的是？', options: ['击穿是查询不存在的 Key', '穿透可用 Bloom Filter 缓解', '雪崩是单个热点 Key 失效', '都用同一种解决方法'], answer: 1, explanation: '穿透：查询不存在的 Key，对策 Bloom Filter / 缓存空值；击穿：热点 Key 失效；雪崩：大量 Key 同时失效。' },
    { q: 'Kafka 最适合的场景是？', options: ['强事务的金融下单', '高吞吐日志/数据管道（百万 TPS）', '只支持小消息', '取代关系数据库'], answer: 1, explanation: 'Kafka 是高吞吐消息队列（百万 TPS+），适合日志、数据管道、流处理；事务性场景用 RocketMQ。' },
    { q: '湖仓一体（Lakehouse）依赖的开源格式不包括？', options: ['Iceberg', 'Hudi', 'Delta Lake', 'CSV'], answer: 3, explanation: '湖仓一体基于 Iceberg/Hudi/Delta Lake，提供事务+元数据；CSV 是普通文本格式，无事务能力。' },
    { q: 'B+ 树索引的主要优势是？', options: ['只支持等值查询', '范围查询友好，千万级表查询从全表扫缩短到毫秒', '不支持索引下推', '占用空间为零'], answer: 1, explanation: 'B+ 树是关系型数据库默认索引结构，叶子节点链式连接，范围查询友好；千万级表加索引后查询从秒级缩短到毫秒。' },
    { q: 'HTAP（混合事务/分析处理）的特点是？', options: ['只能跑 OLTP', '只能跑 OLAP', '同一系统兼顾 OLTP 与实时 OLAP，省去 ETL', '不支持事务'], answer: 2, explanation: 'HTAP 让同一个数据库既跑事务又能直接做实时分析，省去 ETL；TiDB 7.0+、ByteHouse 是代表。' }
  ],
  // ============ Day 5 容器与云原生 ============
  5: [
    { q: 'K8s 控制面的核心组件不包括以下哪一项？', options: ['API Server', 'etcd', 'kube-proxy', 'Scheduler'], answer: 2, explanation: 'kube-proxy 是数据面（Node 上）组件；控制面包括 API Server、etcd、Scheduler、Controller Manager。' },
    { q: '关于 K8s 资源对象，下列说法正确的是？', options: ['Deployment 适合有状态应用', 'StatefulSet 适合无状态应用', 'DaemonSet 在每个 Node 上各跑一个', 'Job 永远运行不停止'], answer: 2, explanation: 'DaemonSet 在每个 Node 各跑一个，常用于日志收集、监控代理；Deployment 适合无状态、StatefulSet 适合有状态、Job 是一次性任务。' },
    { q: 'HPA（水平 Pod 自动伸缩）按什么伸缩？', options: ['只按 CPU', '只按内存', 'CPU、内存或自定义指标', '只按时间表'], answer: 2, explanation: 'HPA 可按 CPU/内存/自定义指标（如 QPS、Kafka 消息堆积）触发自动增减 Pod 副本。' },
    { q: 'Service Mesh（如 Istio）的主要价值是？', options: ['取代 K8s', '把限流/灰度/链路加密等下沉到 sidecar', '让应用更难维护', '只能做监控'], answer: 1, explanation: 'Service Mesh 把流量管理、安全、可观测能力下沉到 sidecar（Envoy），应用层无需重复实现。' },
    { q: 'GitOps 的核心理念是？', options: ['代码必须用 Git', '生产状态完全声明在 Git，变更靠 PR + 自动同步', '不允许人工干预', '取代 CI/CD'], answer: 1, explanation: 'GitOps（Argo CD/Flux）把生产状态声明在 Git，所有变更通过 PR 触发自动同步，可审计可回滚。' },
    { q: '镜像扫描（Trivy/Clair）的作用是？', options: ['加速构建', '检测镜像中的 CVE 漏洞', '减小镜像大小', '替代 K8s'], answer: 1, explanation: '镜像扫描工具检测镜像内 OS 包/依赖的 CVE 漏洞，是云原生 DevSecOps 的关键步骤。' },
    { q: '关于 K8s 的 Service 类型，下列说法正确的是？', options: ['ClusterIP 暴露到公网', 'NodePort 用 Node 上一个端口暴露', 'LoadBalancer 不支持云上自动建 SLB', 'ExternalName 暴露内部 IP'], answer: 1, explanation: 'NodePort 在每个 Node 上开一个端口（30000-32767）；ClusterIP 仅集群内；LoadBalancer 自动建云 SLB；ExternalName 是 DNS CNAME。' },
    { q: '关于蓝绿/金丝雀/滚动发布，下列描述正确的是？', options: ['蓝绿发布最难回滚', '金丝雀按比例小范围放量验证最稳', '滚动发布会同时停所有 Pod', '三者完全等价'], answer: 1, explanation: '金丝雀按 5%-10%-50%-100% 渐进放量，最稳；蓝绿全量切（最快回滚）；滚动逐 Pod 替换（最平滑）。' }
  ],
  // ============ Day 6 云安全与合规 ============
  6: [
    { q: '云安全责任共担模型中，IaaS 模式下客户负责哪一层？', options: ['物理机房', '虚拟化层', 'OS 及以上（含应用、数据、配置）', '云厂商骨干网'], answer: 2, explanation: 'IaaS 模式下，云厂商管虚拟化及以下，客户管 OS 及以上（含应用、补丁、IAM 配置、数据加密）。' },
    { q: '最小权限原则的本质是？', options: ['给所有人 admin 权限', '只给完成工作所需最小权限', '完全禁止访问', '默认开放公网'], answer: 1, explanation: '最小权限原则要求只给完成工作所需的最小权限；定期审视未使用权限并回收；火山引擎 IAM 支持权限分析报表。' },
    { q: 'WAF（Web 应用防火墙）主要防御什么？', options: ['物理入侵', 'OWASP Top 10（SQL 注入、XSS 等）', 'CPU 过载', '机房断电'], answer: 1, explanation: 'WAF 防 OWASP Top 10：SQL 注入、XSS、命令注入、CSRF、越权等 Web 应用层攻击；电商/SaaS 必备。' },
    { q: '零信任架构的核心原则是？', options: ['内网即可信', '永不信任、始终验证', '不需要鉴权', '取代防火墙'], answer: 1, explanation: '零信任：每次访问都鉴权（身份+设备+上下文），不预设网络信任；BeyondCorp/SDP/SASE 都是其落地形态。' },
    { q: '等保 2.0 三级是什么级别的合规要求？', options: ['企业自定义', '国家级关键信息系统的常规级别', '军工级别', '完全可选'], answer: 1, explanation: '等保 2.0 分一/二/三/四级；三级是大多数互联网/金融/政务系统的常规要求；含技术与管理 10 余类。' },
    { q: '信创合规的核心要求是？', options: ['必须用海外硬件', '采用国产 CPU/OS/数据库/中间件', '可以用任意厂商', '只是性能要求'], answer: 1, explanation: '信创要求采用国产 CPU（鲲鹏/海光/飞腾）+ 国产 OS（麒麟/欧拉）+ 国产数据库等；党政/金融/能源/电信关键行业适用。' },
    { q: 'SOAR 的全称含义是？', options: ['服务编排自动化响应（Security Orchestration Automation Response）', '操作系统升级', '数据库工具', '硬件设备'], answer: 0, explanation: 'SOAR = Security Orchestration, Automation, and Response，安全事件触发剧本自动响应；将平均响应时间从小时降到分钟。' },
    { q: 'KMS 中的 CMK 是？', options: ['客户主密钥（Customer Master Key），用于加密 DEK', '一种数据库', '虚拟机型号', '日志文件'], answer: 0, explanation: 'CMK 是 KMS 中管理的客户主密钥，配合 DEK（数据加密密钥）实现信封加密；可自动轮转、HSM 保护。' }
  ],
  // ============ Day 7 上云迁移与可观测性 ============
  7: [
    { q: 'TCO（总拥有成本）通常需要算几年？', options: ['1 年', '3-5 年', '10 年以上', '不需要算时间'], answer: 1, explanation: 'TCO 通常按 3-5 年视角计算，包含硬件折旧、机房、软件、人员、隐性成本；与云上方案对比。' },
    { q: '可观测性的三大支柱是？', options: ['CPU、内存、磁盘', 'Metrics、Logs、Traces', '前端、后端、数据库', '开发、测试、运维'], answer: 1, explanation: '可观测三大支柱：Metrics（指标）、Logs（日志）、Traces（链路追踪）；OpenTelemetry 是统一标准。' },
    { q: 'SLO 与 SLA 的区别是？', options: ['完全相同', 'SLO 是内部目标，SLA 是对客户的承诺+赔付', 'SLA 是技术指标，SLO 是合同', 'SLO 必须 100%'], answer: 1, explanation: 'SLI 是测什么、SLO 是内部目标（如 99.9%）、SLA 是对客户的合同承诺+赔付公式（未达赔付月费的 X%）。' },
    { q: '错误预算（Error Budget）的含义是？', options: ['出错免责', '100% - SLO，允许出错的预算用完就停发布', '不限错误数', '与 SLO 无关'], answer: 1, explanation: '错误预算 = 100% - SLO（如 SLO 99.9% 则月预算约 43 分钟）；预算用完就停发布、专注稳定性。' },
    { q: 'OpenTelemetry 的主要价值是？', options: ['取代 K8s', '统一 Metrics/Logs/Traces 的 SDK 与协议，避免厂商锁定', '只支持 Java', '是云厂商专属'], answer: 1, explanation: 'OpenTelemetry 是 CNCF 项目，统一三大支柱标准 SDK 与协议；新项目应直接用 OTel 避免厂商锁定。' },
    { q: 'USE 方法论关注的三个指标是？', options: ['利用率、饱和度、错误率（针对资源）', '速率、错误、时长（针对服务）', '吞吐、延迟、抖动', '前端、后端、网络'], answer: 0, explanation: 'USE = Utilization/Saturation/Errors，针对资源层面；RED = Rate/Errors/Duration，针对服务层面。' },
    { q: '6R 决策树通常应该先问哪一个问题？', options: ['先 Refactor 重构', '先问"还要不要"（Retire/Retain）→ 再问"换 SaaS 行不行"', '先 Rehost', '先 Repurchase'], answer: 1, explanation: '6R 决策应先问"还要不要"（Retire/Retain）→ 再问"换 SaaS 行不行"（Repurchase）→ 最后才在 Rehost/Replatform/Refactor 中选。' },
    { q: 'CCoE（云卓越中心）的主要职责是？', options: ['取代 IT 部门', '统一架构、规范、培训，跨研发/运维/安全/财务的虚拟组织', '只做培训', '负责采购'], answer: 1, explanation: 'CCoE = Cloud Center of Excellence，跨部门虚拟组织，统一架构原则、安全规范、人才培养、FinOps 治理。' }
  ],
  // ============ Day 8 火山引擎概览与计算 ============
  8: [
    { q: '火山引擎的差异化定位常被概括为？', options: ['只做海外业务', '原生 AI + 字节同款基础设施', '只支持 Windows', '只做政企云'], answer: 1, explanation: '火山引擎依托字节系：豆包/方舟/Coze 一体的原生 AI 能力 + 抖音/TikTok 同款基础设施（推荐、视频、ByteHouse）。' },
    { q: 'ECS 通用型（g 系列）的 CPU:内存比通常是？', options: ['1:1', '1:2', '1:4', '1:8'], answer: 2, explanation: 'g 系列通用型 CPU:内存 = 1:4，适合 Web、应用服务器、中型数据库；c 计算型 1:2，r 内存型 1:8。' },
    { q: 'VKE 的特点不包括以下哪一项？', options: ['托管 K8s 控制面', '兼容标准 Kubernetes', '需要客户自建 etcd', '与 CLB/TOS/EBS 原生集成'], answer: 2, explanation: 'VKE 是托管 K8s，控制面（含 etcd）由火山引擎托管，客户无需自建；这是托管 K8s 的核心价值。' },
    { q: 'veFaaS 函数计算最不适合什么场景？', options: ['图片/视频转码', 'IoT 上报处理', '长时计算（小时级）的有状态任务', 'Webhook 回调'], answer: 2, explanation: 'FaaS 单次执行通常 15 分钟超时，不适合长时计算或需要持久状态的服务；这类场景应用容器或 ECS。' },
    { q: '裸金属服务器相比普通 ECS 的特点是？', options: ['性能更差', '物理机性能 + 云的弹性，无虚拟化损耗', '不能上云', '不支持网络'], answer: 1, explanation: '裸金属提供物理机级性能（无虚拟化 3-5% 损耗），同时具备云的弹性与网络；适合极致性能或合规要求物理隔离场景。' },
    { q: 'Spot 抢占式 GPU 实例的典型用途是？', options: ['核心数据库', '生产推理', 'AI 训练 checkpoint 任务（容忍中断）', '永远不可用'], answer: 2, explanation: 'Spot 价格便宜 50-90% 但可被回收，适合可中断重启的训练任务（用 checkpoint 续训）；推理服务一般不用 Spot。' },
    { q: 'Terraform Provider 的主要价值是？', options: ['替代 K8s', '把基础设施声明在代码（IaC），可版本化与 CI/CD 集成', '只能用于火山引擎', '与云无关'], answer: 1, explanation: 'Terraform 是基础设施即代码（IaC）工具，将云资源声明在代码中，可版本化、Code Review、CI/CD 集成；GitOps 风格运维标配。' },
    { q: '火山引擎 MgC 的主要功能是？', options: ['监控', '迁移评估与实施工具', '只是文档', '安全审计'], answer: 1, explanation: 'MgC（Migration Center）是一站式迁移评估+实施工具，支持 P2V、V2V、应用迁移、数据库迁移；可自动评估出 6R 比例。' }
  ],
  // ============ Day 9 火山引擎存储与网络 ============
  9: [
    { q: '火山引擎 TOS 的数据可靠性是？', options: ['7 个 9（99.99999%）', '9 个 9', '11 个 9（99.999999999%）', '只有 99.9%'], answer: 2, explanation: 'TOS 提供 11 个 9（99.999999999%）的数据可靠性，多 AZ 副本；这是行业主流对象存储水平。' },
    { q: 'PL3 云盘单盘 IOPS 大约能达到？', options: ['1 万', '10 万', '100 万', '1000 万'], answer: 2, explanation: 'PL3 单盘 IOPS 约 100 万、吞吐 4 GB/s、延迟 0.2ms；适合极高性能场景。' },
    { q: 'vePFS 是为哪类负载设计的？', options: ['通用 OA', '企业网盘', 'AI / HPC 高吞吐场景（千卡训练）', '冷归档'], answer: 2, explanation: 'vePFS 是并行文件系统，单系统支持 100 GB/s+ 吞吐；专为 AI 训练、HPC 高吞吐场景设计。' },
    { q: '关于 TOS 存储类别 Standard / IA / Archive 单价对比，下列正确的是？', options: ['IA 比 Standard 贵', 'Archive 单价仅 Standard 的 1/4-1/10', 'Archive 比 IA 贵', '都一样'], answer: 1, explanation: 'Archive 单价远低于 Standard，约为 1/4-1/10；Deep Archive 更低。配生命周期可省 50%+ 存储费。' },
    { q: 'PrivateLink 私网连接的主要价值是？', options: ['必须经过公网', '不暴露公网即可访问 SaaS 服务，攻击面降低', '只支持单 region', '仅用于 IDC 互联'], answer: 1, explanation: 'PrivateLink 通过私网即可访问 SaaS 服务（如 ByteHouse、TLS）；攻击面降低、合规友好。' },
    { q: '关于火山引擎 CLB（七层 LB）的能力，下列说法正确的是？', options: ['只支持 HTTP', '支持 HTTP/HTTPS/HTTP2/WebSocket，与 WAF 集成', '不支持 SSL 卸载', '只能在国内使用'], answer: 1, explanation: 'CLB 七层支持 HTTP/HTTPS/HTTP2/WebSocket；监听器+转发规则灵活；可与 WAF 集成做应用层防护。' },
    { q: 'DCDN 与普通 CDN 的核心区别是？', options: ['DCDN 只加速静态', 'DCDN 同时优化动态请求（智能选路+TCP 优化）', '完全一样', 'DCDN 不支持 HTTPS'], answer: 1, explanation: 'DCDN（全站加速）不仅缓存静态，还对动态请求做路由优化与 TCP 优化；适合电商详情页、API 类业务。' },
    { q: '关于 DDoS 高防与基础防护，下列说法正确的是？', options: ['两者完全相同', '基础防护免费 5 Gbps，高防按防御带宽收费', '高防免费', '基础防护可抗 1 Tbps'], answer: 1, explanation: '基础防护通常免费提供 5 Gbps 清洗能力；超出走 DDoS 高防 IP，按防御带宽计费，可抗 Tbps 级攻击。' }
  ],
  // ============ Day 10 火山引擎数据库与大数据 ============
  10: [
    { q: 'veDB MySQL 的核心特点是？', options: ['100% 兼容 MySQL，应用零改造', '不支持 MySQL 协议', '只能用于备份', '不支持高可用'], answer: 0, explanation: 'veDB MySQL 100% 兼容 MySQL 5.7/8.0，应用零改造迁移；存算分离架构、跨 AZ 自动高可用。' },
    { q: 'ByteHouse 主要用于什么场景？', options: ['OLTP 高频写入更新', '实时分析（OLAP），毫秒级查询', '替代 Redis', '仅做备份'], answer: 1, explanation: 'ByteHouse 基于 ClickHouse 优化，单节点亿行毫秒返回；适合 BI、广告归因、用户行为分析等 OLAP 场景。' },
    { q: 'LAS 湖仓一体相比传统数据仓库的优势？', options: ['查询更快', '存储成本更低（约 60%）+ 一份数据多引擎查', '不支持事务', '不支持 SQL'], answer: 1, explanation: 'LAS 基于 Iceberg/Hudi，存储用 TOS（成本低 60%+），且支持 Spark/Presto/ClickHouse 多引擎查询；湖仓一体核心价值。' },
    { q: 'DataSail 的主要功能是？', options: ['只做备份', '一站式数据同步：50+ 数据源互通，可视化任务编排', '替代 SQL', '取代 K8s'], answer: 1, explanation: 'DataSail 是一站式数据集成产品，支持 MySQL/Oracle/Kafka/TOS 等 50+ 数据源；实时（CDC）+ 离线两种模式。' },
    { q: 'CDC（Change Data Capture）的典型用途是？', options: ['只做全量同步', '实时捕获数据库变更并同步到下游', '替代缓存', '只用于备份'], answer: 1, explanation: 'CDC 实时捕获数据库 binlog 变更，毫秒延迟同步到下游（如 ByteHouse、Kafka）；实时数仓核心组件。' },
    { q: '关于 BMQ（字节自研消息队列），下列说法正确的是？', options: ['吞吐很低', '存算分离架构，万亿 TPS', '只能在内部使用', '不支持持久化'], answer: 1, explanation: 'BMQ 是字节自研消息队列，存算分离架构，吞吐可达万亿 TPS；推荐系统、日志采集等高吞吐场景使用。' },
    { q: 'DataLeap 的主要价值是？', options: ['替代 K8s', '数据开发治理一站式：地图/血缘/质量/权限', '只做监控', '与数据无关'], answer: 1, explanation: 'DataLeap 提供数据地图、血缘、质量、权限治理一站式能力；中型企业 6-12 个月数据治理标配。' },
    { q: '关于"湖+仓双轨"架构，下列描述正确的是？', options: ['二者完全等价', '湖（LAS）存原始多源数据，仓（ByteHouse）跑高性能分析', '湖比仓贵', '不能同时用'], answer: 1, explanation: '典型架构：原始日志进 LAS 湖（存便宜）；清洗后入 ByteHouse 仓（查快）；BI 直连 ByteHouse；冷热分层最优。' }
  ],
  // ============ Day 11 火山引擎视频云与音视频 ============
  11: [
    { q: '关于 LSS 直播延迟，下列说法正确的是？', options: ['标准直播延迟 30 秒以上', '低延迟直播 1-2 秒、超低延迟 <500ms', 'WebRTC 比 HLS 延迟高', '延迟越高越好'], answer: 1, explanation: '标准 HLS 直播 3-5 秒、低延迟 1-2 秒、超低延迟 <500ms；电商直播带货必须 <1.5 秒。WebRTC 可实现亚秒级。' },
    { q: 'RTC 实时音视频的核心要求是？', options: ['延迟越高越好', '端到端延迟 <400ms、丢包 50% 仍可通话', '只支持 1v1', '不支持移动端'], answer: 1, explanation: 'RTC 关键指标：端到端延迟 <400ms、抗丢包能力 50%、单房间支持千人；用于会议、互动课堂、社交。' },
    { q: '窄带高清的主要价值是？', options: ['提高分辨率', '相同码率画质提升 30%+，流量节省 40%+', '增加延迟', '减少 SDK'], answer: 1, explanation: '窄带高清 1.0/2.0：智能转码相同码率下画质明显提升、相同画质下码率显著降低；带宽与存储双省。' },
    { q: '关于 DRM 版权保护，下列说法正确的是？', options: ['只是简单加密', '支持 Widevine/FairPlay/HLS AES，可禁防录屏与限地域', '与播放器无关', '免费内置'], answer: 1, explanation: 'DRM 主流标准 Widevine（Android/Chrome）、FairPlay（iOS/Safari）、PlayReady（微软）；版权方刚需。' },
    { q: '智能审核的典型应用场景是？', options: ['只用于直播', '识别色情/暴恐/政治敏感等违规内容，准确率 99%+', '与人工无关', '只支持文本'], answer: 1, explanation: '智能审核基于 AI 识别违规内容，准确率 99%+；UGC 平台合规必备；通常配合人工复审。' },
    { q: 'imageX 的主要功能是？', options: ['存储图片', '智能图像处理：压缩、裁剪、水印、AI 修图，CDN 集成', '替代 K8s', '只是 SDK'], answer: 1, explanation: 'imageX 提供智能图像处理能力，配合 CDN 实现按需处理；电商商品图、UGC 头像等场景常用。' },
    { q: '关于视频 CDN 计费，下列说法正确的是？', options: ['按 IP 计费', '常用 95th（峰值平均）计费', '免费', '只按存储计费'], answer: 1, explanation: '视频/直播 CDN 通常按 95th 峰值带宽（5% 高峰削峰）或按流量 GB 计费；与计费策略选型相关。' },
    { q: '电商直播最重要的产品组合是？', options: ['VOD + 普通 CDN', 'LSS + 低延迟 + 连麦 SDK + 货品弹窗', '只用 RTC', '只用 OBS'], answer: 1, explanation: '电商直播：LSS 推流分发 + 低延迟（<1.5s）+ 连麦 SDK 互动 + 货品弹窗 + 实时数据看板；闭环。' }
  ],
  // ============ Day 12 AI/ML/DL 基础 ============
  12: [
    { q: '关于 AI、ML、DL、GenAI 的关系，下列正确的是？', options: ['四者相互独立', 'AI ⊃ ML ⊃ DL，GenAI 是 DL 的应用', 'GenAI 包含 AI', 'ML 与 DL 无关'], answer: 1, explanation: 'AI 是大概念，ML（机器学习）是其分支，DL（深度学习）是 ML 的子集，GenAI（生成式 AI）是 DL 的应用。' },
    { q: '监督学习与无监督学习的核心区别是？', options: ['监督学习更便宜', '监督学习需要标注数据，无监督学习不需要', '都不需要数据', '无监督学习只用于分类'], answer: 1, explanation: '监督学习需要标注数据（如分类、回归）；无监督学习无需标注（聚类、降维、异常检测）。' },
    { q: 'Transformer 的核心机制是？', options: ['循环连接', 'Self-Attention 自注意力', '池化', '卷积'], answer: 1, explanation: '2017 年 Transformer 论文核心创新是 Self-Attention，让序列每个位置看到所有其他位置；并行性远超 RNN。' },
    { q: '过拟合的典型表现是？', options: ['训练好测试也好', '训练好但测试差', '训练差但测试好', '完全无法学习'], answer: 1, explanation: '过拟合：模型记住训练数据但泛化差；对策：Dropout、正则化、早停、增加数据。' },
    { q: '关于推理加速，下列说法正确的是？', options: ['FP16 比 INT8 更省显存', '量化（FP16 → INT8/INT4）可让模型小 4-8x、速度 2-4x', '量化必降精度严重', 'TensorRT 与推理无关'], answer: 1, explanation: 'INT8/INT4 量化让模型显存占用降至 1/2-1/4，速度提升 2-4x；现代量化方案精度损失通常 <2%。' },
    { q: 'CNN 的典型应用是？', options: ['只用于文本', '图像分类、目标检测、人脸识别', 'OLTP 数据库', '消息队列'], answer: 1, explanation: 'CNN（卷积神经网络）擅长处理图像；典型应用：ImageNet 分类、YOLO 检测、人脸识别、医学影像。' },
    { q: 'AB 漂移的含义是？', options: ['离线指标好，上线后效果下降', '模型变小', '准确率永远 100%', '与数据无关'], answer: 0, explanation: 'AB 漂移：离线评估指标看着不错，但上线真实流量后效果下降；常因离线指标 ≠ 线上业务指标。' },
    { q: '判别式 vs 生成式模型的区别是？', options: ['判别式建模 P(y|x)，生成式建模 P(x)', '完全相同', '判别式只能做生成', '生成式只能做分类'], answer: 0, explanation: '判别式 P(y|x) 适合分类、识别（垃圾邮件、人脸）；生成式 P(x) 适合写文章、画图、合成语音。' }
  ],
  // ============ Day 13 大模型与豆包 ============
  13: [
    { q: '关于 Tokenizer 与 Token，下列说法正确的是？', options: ['Token 就是字符', '中文 ~1.5 字/token、英文 ~0.75 词/token，按 token 计费', 'Token 数与计费无关', '所有模型 Tokenizer 相同'], answer: 1, explanation: 'Tokenizer（BPE/SentencePiece）切分文本为 token；中文密度高（约 1.5 字/token），按 token 数计费。' },
    { q: 'KV Cache 的作用是？', options: ['存储训练数据', '推理时缓存已计算的 K/V，避免重复计算', '加速训练', '与显存无关'], answer: 1, explanation: 'KV Cache 把已计算的 Key/Value 缓存，每次只需算新 token；推理性能关键技术。显存占用与窗口长度线性相关。' },
    { q: '关于 RLHF、SFT、DPO，下列说法正确的是？', options: ['SFT 是监督微调，RLHF 是人类反馈强化学习，DPO 是直接偏好优化', '三者完全等价', 'SFT 比 RLHF 复杂', 'DPO 不能对齐人类偏好'], answer: 0, explanation: 'SFT（监督微调）→ RLHF（人类反馈强化学习）→ DPO（直接偏好优化，2024 后流行的简化方案）。' },
    { q: 'Scaling Law（Chinchilla）的核心结论是？', options: ['参数越大越好', '参数量 N 与训练 token D 大致 1:20 最优', '训练数据无关紧要', '小模型一定比大模型好'], answer: 1, explanation: 'Chinchilla 法则：N（参数量）与 D（训练 token 量）大致 1:20 最优；过参数化或欠数据都浪费算力。' },
    { q: 'MoE（混合专家）模型的特点是？', options: ['必须激活所有参数', '稀疏激活、推理成本远低于同总参数 Dense 模型', '与 Dense 完全等价', '不支持大模型'], answer: 1, explanation: 'MoE 每次只激活部分专家，总参数大但计算量小；同总参数下推理成本可低 60-80%；DeepSeek-V3、Mixtral 是代表。' },
    { q: '豆包模型家族中，最适合端侧/低延迟场景的是？', options: ['豆包 Pro', '豆包通用', '豆包 Lite', '豆包视频'], answer: 2, explanation: '豆包 Lite 是轻量化版本，适合端侧、IoT、客服等低延迟场景；Pro 偏复杂推理；通用是均衡。' },
    { q: '关于温度参数（Temperature），下列说法正确的是？', options: ['温度越高越确定', '温度=0 完全确定，温度=1 较随机', '与采样无关', '只能取整数'], answer: 1, explanation: 'Temperature=0：完全确定输出；0.3-0.5：客服等可控场景；0.8-1：创意写作；通常取 0-2 之间。' },
    { q: '关于 Function Call，下列说法正确的是？', options: ['模型自己决定何时调外部函数并把结果带回', '不能调外部 API', '与 Agent 无关', '只能查天气'], answer: 0, explanation: 'Function Call 是 Agent 基础：模型决定何时/如何调外部工具（数据库、API、搜索），把结果带回继续生成。' }
  ],
  // ============ Day 14 火山方舟 / Coze / veMLP ============
  14: [
    { q: 'RAG 的工作流程是？', options: ['只用大模型生成', '文档切片 → Embedding → 检索 → 拼到 Prompt → 生成', '只用关键词搜索', '与向量库无关'], answer: 1, explanation: 'RAG 流程：文档 → 切片 → Embedding 向量化 → 向量库；查询时 Embedding → 检索 Top-K → 拼到 Prompt → 大模型生成。' },
    { q: 'LoRA 微调的优势是？', options: ['必须全参数训练', '冻结主参数只训低秩适配器，省 90% 显存', '不能用于大模型', '比 SFT 慢'], answer: 1, explanation: 'LoRA / QLoRA 冻结主参数，只训低秩适配器，省 90% 显存；质量接近全参数 SFT；中小企业首选。' },
    { q: 'Coze 平台的核心能力是？', options: ['只做模型 API', '低代码 Agent 搭建：可视化工作流 + 插件 + 知识库 + 多渠道发布', '替代 K8s', '只做存储'], answer: 1, explanation: 'Coze 提供低代码 Agent 搭建：图形化工作流编排 + 插件市场 + 知识库 + 一键发布到飞书/抖音/微信/API。' },
    { q: '关于 RAG vs 微调 vs Prompt 的选择，下列说法正确的是？', options: ['Prompt → RAG（解决知识时效）→ 微调（解决格式与风格）', '都一样', '只能选一种', '微调比 Prompt 便宜'], answer: 0, explanation: '通常顺序：Prompt 最快最便宜 → RAG 解决知识时效 → 微调解决格式与风格；通常组合使用。' },
    { q: 'ReAct Agent 模式的特点是？', options: ['先做完整计划再执行', '思考一步执行一步（Reasoning + Acting）', '不用 LLM', '与工具无关'], answer: 1, explanation: 'ReAct = Reasoning + Acting，思考一步执行一步；与 Plan-and-Execute（先做完整计划）相对。' },
    { q: 'veMLP 的定位是？', options: ['取代 Coze', 'AI 工程师的训练 + 部署平台，与方舟（应用层）互补', '只是 IDE', '与 PyTorch 冲突'], answer: 1, explanation: 'veMLP 面向 AI 工程师，提供分布式训练（千卡）+ 推理部署+监控；与火山方舟（应用层）形成上下游。' },
    { q: 'RAG 切片策略，下列描述正确的是？', options: ['切得越大越好', '通常 200-1000 字，过短丢上下文、过长稀释相关性', '与文档质量无关', '不能用语义切片'], answer: 1, explanation: '切片粒度典型 200-1000 字（按段落/语义）；过短丢上下文，过长稀释相关性；切片质量直接决定 RAG 效果。' },
    { q: '关于 Multi-Agent，下列说法正确的是？', options: ['永远比单 Agent 好', '多 Agent 协作适合复杂任务但成本高', '不存在', '与 LLM 无关'], answer: 1, explanation: 'Multi-Agent 让多个 Agent 角色分工（研究员/写手/审查员），适合复杂任务；但 token 成本与延迟显著上升。' }
  ],
  // ============ Day 15 售前角色与方法论 ============
  15: [
    { q: '销售铁三角中，售前的主要价值不包括？', options: ['"翻译"产品语言到客户语言', '"建模"业务问题到技术架构', '"信任"专业度让客户敢决策', '"采购"代替客户买单'], answer: 3, explanation: '售前的核心价值是"翻译 + 建模 + 信任"；采购流程由客户走，不是售前职责。' },
    { q: 'SPIN 提问法的四个步骤是？', options: ['Status/Problem/Idea/Need', 'Situation/Problem/Implication/Need-Payoff', 'Sales/Plan/Issue/Note', 'Service/Process/Item/Number'], answer: 1, explanation: 'SPIN：Situation 状况、Problem 问题、Implication 影响、Need-Payoff 收益；逐步引导客户自己说出价值。' },
    { q: 'MEDDIC 中的 C 代表？', options: ['Challenge 挑战', 'Champion 内部支持者', 'Cost 成本', 'Customer 客户'], answer: 1, explanation: 'MEDDIC：Metrics、Economic Buyer、Decision Criteria、Decision Process、Identify Pain、Champion；C 是 Champion。' },
    { q: 'BANT 中 B 代表？', options: ['Brand 品牌', 'Budget 预算', 'Business 业务', 'Bidding 招标'], answer: 1, explanation: 'BANT = Budget（预算）、Authority（决策权）、Need（需求）、Timing（时间）；判断商机优先级的经典框架。' },
    { q: 'KA 大客户与 SMB 中小客户的差异不包括？', options: ['决策链长度', '项目周期', '售前打法', '产品规格'], answer: 3, explanation: 'KA 决策链长、周期长、需深度定制；SMB 决策快、周期短、产品讲透即可；产品本身规格无差异。' },
    { q: '价值主张画布的客户侧三要素是？', options: ['工作、痛苦、收益', '产品、定价、渠道', '人员、流程、技术', '过去、现在、未来'], answer: 0, explanation: '价值主张画布客户侧：客户的工作（要完成什么）、痛苦（怕的事）、收益（想得到的）；与产品侧三要素一一映射。' },
    { q: '初次见客户最不应该做的是？', options: ['倾听', '提问', '复述确认理解', '一上来讲 60 页产品 PPT'], answer: 3, explanation: '初次见客户应先听+问，挖痛点；过早展示产品是新手最大的错误。' },
    { q: '关于售前的"诚实"原则，下列说法正确的是？', options: ['为签单可承诺做不到的事', '不能做就说不能做', '永远说"可以"', '只看签单不看交付'], answer: 1, explanation: '不能做就说不能做；承诺做不到，永远丢一个客户。售前的信任价值大于一次签单。' }
  ],
  // ============ Day 16 解决方案设计与 TCO/ROI ============
  16: [
    { q: '架构图的"三层"通常是？', options: ['前端 / 后端 / 数据库', '业务架构 / 技术架构 / 部署架构', '云上 / 云下 / 边缘', '硬件 / 软件 / 网络'], answer: 1, explanation: '架构图三层：业务架构（讲能做什么）+ 技术架构（讲怎么实现）+ 部署架构（讲在哪里跑）；面向不同受众。' },
    { q: 'SLA 99.95% 对应的年不可用时间约？', options: ['8.7 小时', '4.4 小时', '52 分钟', '5 分钟'], answer: 1, explanation: '99.95% = 年不可用约 4.4 小时；99.99% = 52 分钟；99.999% = 5 分钟；99.9% = 8.7 小时。' },
    { q: 'RPO 与 RTO 的区别是？', options: ['完全相同', 'RPO 关心丢多少数据、RTO 关心多久恢复', 'RPO 关心硬件、RTO 关心软件', '与灾备无关'], answer: 1, explanation: 'RPO（恢复点目标）：能容忍丢多少数据；RTO（恢复时间目标）：故障到恢复需要多久；二者共同决定灾备等级。' },
    { q: '"两地三中心"是哪个行业的灾备标配？', options: ['互联网创业公司', '银行业（监管要求）', '游戏', '物联网'], answer: 1, explanation: '"两地三中心"（同城两个 + 异地一个）是银行业 2010 后监管标配；金融、保险、证券等高合规行业必备。' },
    { q: '4+1 视图中的"+1"是？', options: ['物理视图', '场景视图（用关键用例串起其他四个）', '逻辑视图', '开发视图'], answer: 1, explanation: '4+1 视图：逻辑、开发、进程、物理 4 个 + 场景 1 个；场景视图用关键用例串起其他四个，是架构合理性的"试金石"。' },
    { q: 'TCO 计算最常被忽略的科目是？', options: ['硬件', '电力', '迁移人力 + 培训成本 + 隐性机会成本', '云上账单'], answer: 2, explanation: '常见 TCO 错误是只算云端账单，忘记迁移人力、培训成本、停机机会成本；这部分常占 10-20%。' },
    { q: '关于 ROI 计算，下列说法正确的是？', options: ['只算降本不算业务增量', '收益侧含降本 + 业务增收 + 风险下降', 'ROI 与时间无关', '上云无 ROI'], answer: 1, explanation: 'ROI 收益侧三段：直接降本（IT 支出↓）+ 业务增收（弹性带来更多营收）+ 风险下降（停机/合规罚款减少）。' },
    { q: '熔断、限流、降级的核心目标是？', options: ['让系统更慢', '保护核心服务、防止雪崩', '取代 K8s', '与可观测无关'], answer: 1, explanation: '熔断（依赖故障自动断开）+ 限流（保护 QPS）+ 降级（返回兜底）共同保护核心服务，防止级联雪崩。' }
  ],
  // ============ Day 17 演讲、招投标与竞争分析 ============
  17: [
    { q: 'SCQA 结构由哪几部分组成？', options: ['Situation/Complication/Question/Answer', 'Story/Concept/Question/Action', 'Sales/Customer/Quote/Agree', 'Step/Check/Quality/Audit'], answer: 0, explanation: 'SCQA：Situation 现状 → Complication 矛盾 → Question 问题 → Answer 方案；麦肯锡咨询经典开场结构。' },
    { q: '招投标流程中"废标"最常见的原因不包括？', options: ['过盖章', '过期资质', '缺响应表', 'PPT 字号过大'], answer: 3, explanation: '废标原因：过盖章、资质过期、缺响应表、报价错位、未实质性响应需求；PPT 字号大不会废标。' },
    { q: '7 步异议处理法的第 1 步是？', options: ['立即反驳', '倾听', '降价', '走人'], answer: 1, explanation: '7 步异议处理：倾听 → 复述 → 共情 → 澄清 → 举证 → 试探 → 跟进；很多异议在客户自己说时就解了一半。' },
    { q: '客户问"火山引擎和阿里云比怎么样"，最佳应对是？', options: ['抹黑友商', '正面比拼参数', '"看您最在意什么"，用 PoC 让数字说话', '直接放弃'], answer: 2, explanation: '友商对比的核心原则：不抹黑、不正面比拼；先确定客户最在意什么，再把战场拉到自己擅长的地方（如 AI/视频）。' },
    { q: '关于价格谈判，下列哪种做法不推荐？', options: ['客户问降多少前先确认还有什么需求未满足', '降价直接换"加资源/加服务"', '客户没开口先主动降价', '保住单价让"总价"'], answer: 2, explanation: '不要先降价：客户问降多少前，先确认需求/决策权/签单时间；纯主动让利会让客户怀疑"原价就贵"。' },
    { q: '客户演讲的"5 分钟黄金法则"是指？', options: ['只讲 5 分钟', '前 5 分钟决定成败：用数据 + 故事抓注意力，不要从目录开始', '过 5 分钟必须停', '只能讲 5 个观点'], answer: 1, explanation: '5 分钟黄金法则：前 5 分钟决定成败；用"3 个数据 + 1 个故事"开场，不要从"目录"或"公司介绍"开始。' },
    { q: '关于 NDA（保密协议），售前应？', options: ['可以泄露其他客户信息', '不能在客户面前讲其他客户具体姓名/数字', '随便分享案例', 'NDA 没有约束力'], answer: 1, explanation: 'NDA 是底线；案例必须脱敏（"某 X 客户"）；泄露其他客户信息会丢了所有客户。' },
    { q: '答辩环节最常见的失分原因是？', options: ['答辩超时被打断', 'PPT 太漂亮', '案例太多', '声音太响'], answer: 0, explanation: '答辩通常每家 20-40 分钟；超时直接被评委打断，关键内容讲不完丢分；时间管理是答辩第一要务。' }
  ],
  // ============ Day 18 行业方案 (上) ============
  18: [
    { q: '互联网/电商行业的核心特征是？', options: ['流量稳定无波动', '高并发 + 强弹性 + 短迭代', '不需要 CDN', '不需要数据库'], answer: 1, explanation: '互联网/电商：高并发（百万 QPS）、强弹性（大促 5-10 倍峰值）、短迭代（每天上线 N 次）、用户体验敏感。' },
    { q: '电商直播带货最关键的延迟指标是？', options: ['<10 秒', '<1.5 秒', '>5 秒越好', '不重要'], answer: 1, explanation: '电商直播必须 <1.5 秒延迟，否则连麦/红包/抢购体验崩溃；火山 LSS 超低延迟可达 500ms。' },
    { q: '金融行业上云最容易踩的雷是？', options: ['速度太快', '忽略合规与监管报备', '产品太多', '价格太低'], answer: 1, explanation: '金融云方案必须先满足等保 + 监管 + 信创 + 灾备；忽略合规会导致整个方案被一票否决。' },
    { q: '汽车智驾的核心痛点不包括？', options: ['PB 级路测数据存储', '千卡 GPU 训练', '仿真平台', '游戏画质'], answer: 3, explanation: '智驾核心痛点：PB 级数据存储 + 千卡训练 + 标注外包 + 仿真平台；与游戏画质无关。' },
    { q: '关于汽车数据出境合规，下列说法正确的是？', options: ['可以随意出境', '智驾路测数据出境需安全评估', '海外业务不需关注合规', '与 GDPR 无关'], answer: 1, explanation: '智驾路测含地图/摄像头数据，出境需走《数据出境安全评估》；欧洲业务额外受 GDPR 约束。' },
    { q: '泛娱乐行业（直播/游戏/短视频）的关键产品组合？', options: ['只用 ECS', 'CDN/DCDN + LSS/RTC + DRM + 智能审核', '只用数据库', '只用 K8s'], answer: 1, explanation: '泛娱乐组合：海外加速（Anycast EIP + 海外 POP）+ 直播/RTC 实时音视频 + DRM 版权保护 + 智能审核合规。' },
    { q: '金融行业新厂商最大的资质门槛是？', options: ['没有 IDC', '同业业绩 / 等保三级 / 银保监备案 / 信创认证', 'PPT 太少', '人员不够'], answer: 1, explanation: '金融客户要求厂商有金融行业等保三级 + 银保监备案 + 信创认证 + 同业业绩；新厂商前 3 年最难突破。' },
    { q: '互联网客户最容易切入的火山引擎能力是？', options: ['冷归档', '原生 AI（豆包/方舟/Coze）+ 视频云 + 海外 POP', '专有云', '银行核心系统'], answer: 1, explanation: '互联网客户切入点：AI（豆包/方舟/Coze）+ 视频云（字节同款）+ 海外 POP（TikTok 模式）；这是火山引擎差异化最强项。' }
  ],
  // ============ Day 19 行业方案 (下) ============
  19: [
    { q: '零售/快消行业的核心特征是？', options: ['不需要线上', 'O2O 融合 + 千店千面 + 季节性 + 低毛利', '不在意成本', '只做线下'], answer: 1, explanation: '零售特征：O2O 线上线下融合、千店千面（个性化）、季节性（618/双 11）、低毛利（成本敏感）。' },
    { q: '门店本地数据库 + 云端汇总属于哪类架构？', options: ['公有云', '私有云', '混合云（边缘 + 中心）', '行业云'], answer: 2, explanation: '门店本地保留 POS 数据库（断网可用）+ 云端汇总，是混合云/边缘架构；零售连锁、银行网点常用。' },
    { q: '政企/制造客户的项目最大特点是？', options: ['决策快', '强合规、流程长、保守、强项目制', '价格敏感', '不需要案例'], answer: 1, explanation: '政企/制造：等保/信创合规 + 审批流程长 + 容错率低 + 项目制采购；新厂商先做"小项目+合作伙伴"路径。' },
    { q: '关于"一网通办"，下列描述正确的是？', options: ['只做线下', '群众/企业一站式办事，AI 助手解答+引导', '与 AI 无关', '只是网站'], answer: 1, explanation: '一网通办：群众/企业一站式办事；后端打通 N 个委办；AI 助手解答+引导；典型政务数字化项目。' },
    { q: '在线教育的合规重点是？', options: ['不重要', '未成年人个人信息保护 + 内容审核 + 数据本地化', '不限制', '只关心 GDPR'], answer: 1, explanation: '教育尤其涉及未成年人，个人信息保护要求严；内容审核合规；数据必须本地化；网信办监管严格。' },
    { q: '出海企业架构的核心原则是？', options: ['全球只用一个 region', '业务就近部署 + 数据合规驻留 + 多 region 高可用 + 全球加速', '用国内 IDC', '只用美国服务器'], answer: 1, explanation: '出海架构：业务就近部署（亚太/欧美）+ 数据合规驻留（GDPR/CCPA）+ 多 region 高可用 + Anycast EIP 全球加速。' },
    { q: '关于 GDPR 罚款上限，下列正确的是？', options: ['不超过 1 万欧', '最高全球营收 4%（可上千万欧）', '不会罚款', '只罚一次'], answer: 1, explanation: 'GDPR 罚款上限：全球营收 4% 或 2000 万欧元（取高）；多家科技公司被罚上亿欧元案例。' },
    { q: '游戏出海最关键的能力组合是？', options: ['只要服务器', '全球低延迟（Anycast）+ DDoS 高防 + 多 region 数据中心', '只要 CDN', '只要数据库'], answer: 1, explanation: '游戏出海：Anycast EIP 全球同 IP 低延迟 + DDoS 高防（游戏被攻击重灾区）+ 多 region 数据中心（中东/东南亚）。' }
  ],
  // ============ Day 20 综合实战 ============
  20: [
    { q: '客户问"我们已经用阿里云了"，最佳应对是？', options: ['说阿里云不好', '强行替换', '"不是非此即彼，多云已成常态，先小试点", 用 AI/视频/海外切入', '放弃这个客户'], answer: 2, explanation: '不是非此即彼，多云已成常态；用 AI 和视频强场景切入做小试点；让客户用脚投票。' },
    { q: '关于售前的"红线"，下列哪一项必须遵守？', options: ['可以承诺做不到的事', '不答应做不到的事，不抹黑友商，不擅自降价', '可以泄露其他客户信息', '可以贬低同事'], answer: 1, explanation: '售前红线：不答应做不到的事 / 不抹黑友商 / 不泄露客户信息 / 不擅自降价 / 不贬同事或产品。' },
    { q: '关于综合考试，最有效的应试策略是？', options: ['从难题开始', '先做有把握的，标记不会的；时间管理 1 分钟/题', '不看时间', '永远靠运气'], answer: 1, explanation: '考试策略：先做有把握的；标记不会的留时间检查；30 题 30 分钟 = 1 分钟/题；剩余时间复查标记题。' },
    { q: '关于"必背案例"，售前最有用的案例特征是？', options: ['同行业 + 同体量 + 同问题（且 3 年内）', '随便选一个', '只用海外案例', '只讲技术参数'], answer: 0, explanation: '案例三同：同行业、同体量、同问题；3 年内最具说服力；案例库是售前最值钱的"知识库"。' },
    { q: 'TOS 的可靠性常被表述为？', options: ['7 个 9', '11 个 9（99.999999999%）', '只 99%', '没有 SLA'], answer: 1, explanation: 'TOS 提供 11 个 9 数据可靠性，多 AZ 副本；这是行业主流对象存储水平的标杆。' },
    { q: '客户问"你们能不能 24×7 支持"，最专业的回答是？', options: ['当场答应所有要求', '说明合同 SLA 等级 + 工单响应时间 + 升级渠道，再确认是否符合预期', '说不知道', '把客户转给销售'], answer: 1, explanation: '专业回答：用合同条款（SLA 等级、工单响应、升级路径）说话，再确认是否符合客户预期；模糊承诺会变后期问题。' },
    { q: '关于"持续学习"，售前最有效的方式是？', options: ['只看官方 PPT', '每月 1 本经典书 + 1 个开源项目 + 季度复盘案例库', '只看友商发布会', '不学习也行'], answer: 1, explanation: '售前持续成长：每月 1 本经典书（架构/SRE）+ 1 个开源项目实操 + 季度复盘案例库；3-5 年成长成杀手锏。' },
    { q: '一个签单后立刻消失的售前会怎样？', options: ['客户更喜欢', '客户进交付期遇困难找不到你 → 续签丢', '没影响', '获得奖金'], answer: 1, explanation: '签单后 1 个月内是续签/扩单的最佳窗口；售前应"陪跑"交付前期，否则客户对你的信任会快速消失。' }
  ]
};

const FINAL_EXAM = [
  // ============ 云基础（15 题） ============
  { category: '云基础', q: '云计算 NIST 五大特征不包括以下哪一项？', options: ['按需自助服务', '资源池化', '物理硬件独占', '可计量服务'], answer: 2, explanation: 'NIST 五大特征：按需自助、广泛网络访问、资源池化、快速弹性、可计量服务；与"物理硬件独占"相反。' },
  { category: '云基础', q: '关于 IaaS 模式下的责任划分，下列正确的是？', options: ['IaaS 客户管 OS 及以上', 'IaaS 客户不管 OS', 'PaaS 客户管硬件', 'SaaS 客户管中间件'], answer: 0, explanation: 'IaaS 模式下云厂商管虚拟化及以下，客户管 OS 及以上（应用、补丁、IAM、加密）。' },
  { category: '云基础', q: '关于 6R 迁移策略，下列说法正确的是？', options: ['Refactor 是直接搬迁', 'Replatform 是替换为 SaaS', 'Retire 是退役不再使用', 'Rehost 是按云原生重写'], answer: 2, explanation: 'Retire：迁移评估后发现的不再使用应用，直接关停；通常占应用总数 10-20%。' },
  { category: '云基础', q: 'CIDR 表示法 10.0.0.0/24 表示多少 IP？', options: ['65536', '256（可用 251）', '1024', '与 IP 数无关'], answer: 1, explanation: '/24 = 2^(32-24) = 256 个 IP；扣除保留地址，可用约 251 个。' },
  { category: '云基础', q: '安全组与网络 ACL 的核心区别是？', options: ['二者完全相同', '安全组有状态、ACL 无状态', '安全组无状态、ACL 有状态', '都是有状态的'], answer: 1, explanation: '安全组有状态（出去自动允许返回，工作在 ECS/ENI）；网络 ACL 无状态（须配双向规则，工作在子网）。' },
  { category: '云基础', q: '电商详情页+API 类业务最适合使用？', options: ['普通 CDN（仅静态）', 'DCDN 全站加速', '只用 EIP', '不用加速'], answer: 1, explanation: 'DCDN 同时优化动态请求与静态缓存，适合电商详情页/API 类业务。' },
  { category: '云基础', q: '对象存储 Standard 与 Archive 的单价对比？', options: ['Archive 比 Standard 贵', 'Archive 单价仅 Standard 的 1/4-1/10', '相同', 'Archive 不存在'], answer: 1, explanation: 'Archive 单价远低于 Standard，约为 1/4-1/10；Deep Archive 更低；适合 1 年+ 合规留档。' },
  { category: '云基础', q: 'KMS 信封加密的核心原理是？', options: ['只用一把密钥', 'DEK 加密数据，CMK 加密 DEK', '不需要密钥', '客户暴露 CMK'], answer: 1, explanation: '信封加密：DEK 加密数据，CMK 加密 DEK；CMK 永不落地，性能好且安全。' },
  { category: '云基础', q: '关于 CAP 定理，分布式系统在网络分区时必须权衡？', options: ['一致性 C 与可用性 A', '原子性与一致性', '吞吐与延迟', '安全与性能'], answer: 0, explanation: '云上分布式系统必选 P，所以核心权衡在 C（一致性）vs A（可用性）。' },
  { category: '云基础', q: '关于 NewSQL（如 veDB、TiDB），下列说法正确的是？', options: ['不支持 ACID', '兼具 SQL + 分布式 + ACID 事务', '只支持 NoSQL', '不能水平扩展'], answer: 1, explanation: 'NewSQL 兼具关系 SQL + 分布式 + ACID，解决传统分库分表复杂度。' },
  { category: '云基础', q: 'Kafka 最适合的场景是？', options: ['强事务的金融下单', '高吞吐日志/数据管道（百万 TPS）', '取代关系数据库', '小消息只支持'], answer: 1, explanation: 'Kafka 高吞吐（百万 TPS+），适合日志、数据管道、流处理；事务性下单用 RocketMQ。' },
  { category: '云基础', q: 'K8s 控制面核心组件不包括？', options: ['API Server', 'etcd', 'kube-proxy', 'Scheduler'], answer: 2, explanation: 'kube-proxy 是 Node 上的数据面组件；控制面包括 API Server、etcd、Scheduler、Controller Manager。' },
  { category: '云基础', q: 'GitOps 的核心理念是？', options: ['代码必须 Git 管理', '生产状态完全声明在 Git，PR + 自动同步', '不允许人工干预', '取代 CI/CD'], answer: 1, explanation: 'GitOps：生产状态声明在 Git，变更靠 PR + 自动同步（Argo CD/Flux）。' },
  { category: '云基础', q: '关于零信任架构，下列说法正确的是？', options: ['内网即可信', '永不信任、始终验证', '不需要鉴权', '取代防火墙'], answer: 1, explanation: '零信任：每次访问都鉴权（身份+设备+上下文），不预设网络信任。' },
  { category: '云基础', q: '可观测性的三大支柱是？', options: ['CPU/内存/磁盘', 'Metrics/Logs/Traces', '前/中/后台', '开发/测试/运维'], answer: 1, explanation: '可观测三大支柱：Metrics（指标）、Logs（日志）、Traces（链路追踪）；OpenTelemetry 统一标准。' },

  // ============ 火山引擎产品（12 题） ============
  { category: '火山引擎', q: '火山引擎的差异化定位常被概括为？', options: ['只做政企云', '原生 AI + 字节同款基础设施', '只做海外', '只支持 Windows'], answer: 1, explanation: '火山引擎：豆包/方舟/Coze 一体的 AI + 抖音/TikTok 同款基础设施。' },
  { category: '火山引擎', q: 'ECS 通用型 g 系列的 CPU:内存比通常是？', options: ['1:1', '1:2', '1:4', '1:8'], answer: 2, explanation: 'g 系列通用型 1:4，c 计算型 1:2，r 内存型 1:8。' },
  { category: '火山引擎', q: 'VKE 提供的核心价值不包括？', options: ['托管 K8s 控制面', '兼容标准 Kubernetes', '需要自建 etcd', '与 CLB/TOS/CR 原生集成'], answer: 2, explanation: 'VKE 控制面（含 etcd）由火山引擎托管，客户无需自建；这是托管 K8s 的核心价值。' },
  { category: '火山引擎', q: 'TOS 的数据可靠性是？', options: ['7 个 9', '9 个 9', '11 个 9（99.999999999%）', '99.9%'], answer: 2, explanation: 'TOS 提供 11 个 9 数据可靠性，多 AZ 副本。' },
  { category: '火山引擎', q: 'PL3 云盘单盘 IOPS 大约可达？', options: ['1 万', '10 万', '100 万', '1000 万'], answer: 2, explanation: 'PL3 单盘 IOPS 约 100 万、吞吐 4 GB/s、延迟 0.2ms。' },
  { category: '火山引擎', q: 'vePFS 主要为什么场景设计？', options: ['通用 OA', 'AI 训练 / HPC 高吞吐', '冷归档', '日志收集'], answer: 1, explanation: 'vePFS 并行文件系统单系统 100 GB/s+ 吞吐，专为 AI/HPC 设计。' },
  { category: '火山引擎', q: 'veDB MySQL 的核心特点是？', options: ['100% 兼容 MySQL，应用零改造', '不兼容 MySQL', '只能备份', '不支持高可用'], answer: 0, explanation: 'veDB MySQL 100% 兼容 MySQL 5.7/8.0；存算分离、跨 AZ 自动高可用。' },
  { category: '火山引擎', q: 'ByteHouse 的典型用途是？', options: ['OLTP 高频写', 'OLAP 实时分析（毫秒级查询）', '替代 Redis', '只做备份'], answer: 1, explanation: 'ByteHouse 基于 ClickHouse 优化，单节点亿行毫秒返回；BI、广告归因、用户行为分析。' },
  { category: '火山引擎', q: 'LAS 湖仓一体的核心价值是？', options: ['查询最快', '存储成本低（约 60%）+ 一份数据多引擎查', '不支持事务', '不支持 SQL'], answer: 1, explanation: 'LAS 基于 Iceberg/Hudi，存储用 TOS 成本低 60%+；支持 Spark/Presto/ClickHouse 多引擎查。' },
  { category: '火山引擎', q: '电商直播带货必须的延迟指标是？', options: ['<10 秒', '<1.5 秒', '>5 秒越好', '不重要'], answer: 1, explanation: '电商直播必须 <1.5 秒延迟，否则连麦/抢购体验崩溃；火山 LSS 超低延迟可达 500ms。' },
  { category: '火山引擎', q: '关于 RTC 实时音视频的核心指标，下列正确的是？', options: ['延迟越高越好', '端到端 <400ms、丢包 50% 仍可通话', '只支持 1v1', '不支持移动端'], answer: 1, explanation: 'RTC：端到端延迟 <400ms、抗丢包 50%、单房间千人；用于会议、互动课堂。' },
  { category: '火山引擎', q: '智能审核的典型应用场景？', options: ['只用于直播', '识别色情/暴恐/政治敏感等违规内容（准确率 99%+）', '与人工无关', '只支持文本'], answer: 1, explanation: '智能审核 AI 识别违规内容，准确率 99%+；UGC 平台合规必备。' },

  // ============ AI 与大模型（10 题） ============
  { category: 'AI 大模型', q: '关于 AI、ML、DL、GenAI 的关系，下列正确的是？', options: ['四者独立', 'AI ⊃ ML ⊃ DL，GenAI 是 DL 的应用', 'GenAI 包含 AI', '无关系'], answer: 1, explanation: 'AI 是大概念，ML 是其分支，DL 是 ML 的子集，GenAI 是 DL 的应用。' },
  { category: 'AI 大模型', q: 'Transformer 的核心机制是？', options: ['循环连接', 'Self-Attention 自注意力', '池化', '卷积'], answer: 1, explanation: 'Transformer（2017）核心创新是 Self-Attention；并行性远超 RNN。' },
  { category: 'AI 大模型', q: '量化（FP16 → INT8/INT4）的主要价值是？', options: ['增加显存占用', '模型小 4-8x、速度 2-4x、精度损失通常 <2%', '降低性能', '与推理无关'], answer: 1, explanation: '量化让模型显存占用降至 1/2-1/4，速度提升 2-4x；现代量化精度损失通常 <2%。' },
  { category: 'AI 大模型', q: '关于 RAG（检索增强生成），下列正确的是？', options: ['取代大模型', '通过检索注入事实，幻觉率显著下降', '与向量库无关', '只是搜索'], answer: 1, explanation: 'RAG：文档切片 → Embedding → 向量库；查询时检索 Top-K → 拼到 Prompt → 大模型生成；幻觉率显著下降。' },
  { category: 'AI 大模型', q: 'LoRA 微调相比全参数 SFT 的优势是？', options: ['显存占用更高', '冻结主参数只训低秩适配器，省 90% 显存', '比 SFT 慢', '不能用于大模型'], answer: 1, explanation: 'LoRA / QLoRA 冻结主参数，只训低秩适配器，省 90% 显存；质量接近 SFT。' },
  { category: 'AI 大模型', q: 'KV Cache 的作用是？', options: ['存训练数据', '推理时缓存已计算 K/V，避免重复计算', '加速训练', '与显存无关'], answer: 1, explanation: 'KV Cache 把已计算的 Key/Value 缓存，减少重复计算；显存占用与窗口长度线性相关。' },
  { category: 'AI 大模型', q: 'MoE 模型相比同总参数 Dense 模型的优势？', options: ['激活所有参数', '稀疏激活，推理成本低 60-80%', '完全等价', '不支持大模型'], answer: 1, explanation: 'MoE 每次只激活部分专家；同总参数下推理成本低 60-80%；DeepSeek-V3、Mixtral 是代表。' },
  { category: 'AI 大模型', q: '豆包模型家族中，最适合端侧/低延迟的是？', options: ['豆包 Pro', '豆包通用', '豆包 Lite', '豆包视频'], answer: 2, explanation: '豆包 Lite 是轻量化版本，适合端侧、IoT、客服等低延迟场景。' },
  { category: 'AI 大模型', q: 'Coze 平台的核心能力？', options: ['只做模型 API', '低代码 Agent 搭建：可视化工作流 + 插件 + 知识库 + 多渠道发布', '取代 K8s', '只做存储'], answer: 1, explanation: 'Coze 提供低代码 Agent：图形化工作流 + 插件市场 + 知识库 + 一键发布到飞书/抖音/微信/API。' },
  { category: 'AI 大模型', q: 'Function Call 的核心能力是？', options: ['只能查天气', '模型自己决定何时调外部函数并把结果带回', '与 Agent 无关', '不能调 API'], answer: 1, explanation: 'Function Call 是 Agent 基础：模型决定何时调外部工具，是工具调用与多轮交互的关键。' },

  // ============ 售前技能（8 题） ============
  { category: '售前技能', q: 'SPIN 提问法的四个步骤是？', options: ['Status/Problem/Idea/Need', 'Situation/Problem/Implication/Need-Payoff', 'Sales/Plan/Issue/Note', 'Service/Process/Item/Number'], answer: 1, explanation: 'SPIN：Situation 状况、Problem 问题、Implication 影响、Need-Payoff 收益。' },
  { category: '售前技能', q: 'MEDDIC 中的 C 代表？', options: ['Challenge', 'Champion 内部支持者', 'Cost', 'Customer'], answer: 1, explanation: 'MEDDIC = Metrics、Economic Buyer、Decision Criteria、Decision Process、Identify Pain、Champion。' },
  { category: '售前技能', q: 'BANT 的 B 代表？', options: ['Brand', 'Budget 预算', 'Business', 'Bidding'], answer: 1, explanation: 'BANT：Budget（预算）、Authority（决策权）、Need（需求）、Timing（时间）。' },
  { category: '售前技能', q: 'SLA 99.95% 对应年不可用约？', options: ['8.7 小时', '4.4 小时', '52 分钟', '5 分钟'], answer: 1, explanation: '99.95% = 年不可用约 4.4 小时；99.99% = 52 分钟；99.999% = 5 分钟。' },
  { category: '售前技能', q: 'TCO 计算最常被忽略的科目是？', options: ['硬件', '电力', '迁移人力 + 培训 + 隐性机会成本', '云上账单'], answer: 2, explanation: 'TCO 常见错误是只算云端账单，忘记迁移人力、培训成本、停机机会成本。' },
  { category: '售前技能', q: '7 步异议处理法的第 1 步是？', options: ['立即反驳', '倾听', '降价', '放弃'], answer: 1, explanation: '7 步：倾听 → 复述 → 共情 → 澄清 → 举证 → 试探 → 跟进；很多异议在客户自己说时已解一半。' },
  { category: '售前技能', q: 'SCQA 结构由哪几部分组成？', options: ['Situation/Complication/Question/Answer', 'Story/Concept/Question/Action', 'Sales/Customer/Quote/Agree', 'Step/Check/Quality/Audit'], answer: 0, explanation: 'SCQA：现状 → 矛盾 → 问题 → 方案；麦肯锡咨询经典开场结构。' },
  { category: '售前技能', q: '客户问"火山和阿里云比怎么样"，最佳应对是？', options: ['抹黑友商', '正面比拼', '"看您最在意什么"，用 PoC 让数字说话', '放弃客户'], answer: 2, explanation: '不抹黑、不正面比拼；先确定客户最在意什么，再把战场拉到 AI/视频等差异化场景。' },

  // ============ 行业方案（5 题） ============
  { category: '行业方案', q: '"两地三中心"是哪个行业的灾备标配？', options: ['互联网', '银行业（监管要求）', '游戏', '物联网'], answer: 1, explanation: '"两地三中心"（同城两个 + 异地一个）是银行业 2010 后监管标配。' },
  { category: '行业方案', q: '汽车智驾的核心痛点不包括？', options: ['PB 级路测数据存储', '千卡 GPU 训练', '仿真平台', '游戏画质'], answer: 3, explanation: '智驾痛点：PB 级数据存储 + 千卡训练 + 标注 + 仿真平台。' },
  { category: '行业方案', q: '关于 GDPR，下列正确的是？', options: ['不存在罚款', '最高罚款全球营收 4%', '只针对中国', '已废止'], answer: 1, explanation: 'GDPR 罚款上限：全球营收 4% 或 2000 万欧（取高）。' },
  { category: '行业方案', q: '电商直播最重要的产品组合是？', options: ['VOD + 普通 CDN', 'LSS + 低延迟 + 连麦 SDK + 货品弹窗', '只用 RTC', '只用 OBS'], answer: 1, explanation: '电商直播：LSS 推流分发 + 低延迟（<1.5s）+ 连麦 SDK + 货品弹窗 + 实时数据看板。' },
  { category: '行业方案', q: '出海游戏关键的能力组合是？', options: ['只要服务器', '全球低延迟（Anycast）+ DDoS 高防 + 多 region', '只要 CDN', '只要数据库'], answer: 1, explanation: '游戏出海：Anycast 全球同 IP 低延迟 + DDoS 高防 + 多 region 数据中心。' }
];
