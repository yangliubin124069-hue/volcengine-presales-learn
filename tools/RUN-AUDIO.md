# 🎙 预生成视频朗读 MP3 操作说明

## 为什么要做这个

手机端（特别是鸿蒙 / Android / 出境易 Chrome）系统不带中文 TTS 语音包，
浏览器 Web Speech API 找不到中文 voice → 视频静音。

**预生成 MP3** 是最稳的方案：
- ✅ 用微软 Edge TTS（免费，高质量中文 voice：晓晓 / 云希等）
- ✅ 所有手机/电脑 100% 能听
- ✅ 离线可听（PWA 自动缓存）
- ✅ 跨平台一致体验（不再受系统 TTS 影响）

## 一、安装依赖

```bash
# 需要 Python 3.8+
pip install edge-tts
```

## 二、运行脚本

```bash
cd E:/ai/claude/火山引擎学习
python tools/generate-audio.py
```

**默认参数**：
- voice = `zh-CN-XiaoxiaoNeural`（晓晓·女声温柔，中文 SOTA）
- rate = `+0%`（正常语速）
- 处理所有 26 个视频
- 已生成的不重复（增量）

**预计耗时**：30-60 分钟（取决于网络）
**输出大小**：约 130 MB（lessons/audio/）

## 三、可选参数

```bash
# 用男声云希
python tools/generate-audio.py --voice zh-CN-YunxiNeural

# 语速加快 10%
python tools/generate-audio.py --rate +10%

# 只生成单个视频（调试）
python tools/generate-audio.py --only day13

# 强制重生成（覆盖已有 MP3）
python tools/generate-audio.py --force
```

**推荐 voice**：
| Voice | 性别 | 风格 | 备注 |
|---|---|---|---|
| `zh-CN-XiaoxiaoNeural` | 女 | 温柔 | **默认 · 中文 SOTA** |
| `zh-CN-XiaoyiNeural` | 女 | 活泼 | 适合年轻向 |
| `zh-CN-YunxiNeural` | 男 | 阳光 | 适合培训课 |
| `zh-CN-YunyangNeural` | 男 | 新闻 | 适合新闻播报感 |
| `zh-CN-YunjianNeural` | 男 | 浑厚 | 适合权威感 |

## 四、上传到 GitHub Pages

```bash
git add lessons/audio/
git commit -m "feat(audio): 预生成 MP3 朗读音频包（Edge TTS 晓晓）"
git push
```

GitHub 单 push 限 2GB / 单文件限 100MB，130MB 总量分布在 ~570 个 MP3 没问题。

## 五、验证

push 后等 GitHub Pages 构建（~1 分钟），打开手机访问任意视频：

1. 不需要任何配置
2. 自动播放真人级朗读
3. Console 有 `[Audio] 检测到预生成 MP3: dayN（X 段）` 日志

## 六、播放优先级（_player.js 已改）

```
预生成 MP3（manifest 检测到） → 优先播
    ↓ 失败/不可用
火山豆包 TTS（用户配了）       → 次选
    ↓ 失败/不可用
浏览器 Web Speech API（系统中文 voice） → 兜底
    ↓ 不可用
仅显示字幕（按 fallbackDuration 自动翻页）
```

## 七、想换 voice 重新生成

```bash
# 删除旧的
rm -rf lessons/audio/

# 用新 voice 重新生成
python tools/generate-audio.py --voice zh-CN-YunxiNeural
git add -A && git commit -m "chore(audio): 切换到云希男声" && git push
```
