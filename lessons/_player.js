/* ============================================================
   互动教学视频 · 共用播放器
   依赖：页面里需要预定义 window.META = { day, title, subtitle, intro }
          和 window.SLIDES = [...]
   ============================================================ */
(function () {
  const META = window.META || { title: '教学视频', subtitle: '', intro: '点击开始 · 互动幻灯片' };
  const SLIDES = window.SLIDES || [];
  if (!SLIDES.length) {
    document.body.innerHTML = '<div style="color:#fff;padding:24px">无 SLIDES 数据</div>';
    return;
  }

  // ===================== 构造 UI 骨架 =====================
  document.body.innerHTML = `
    <div class="topbar">
      <div class="progress" id="progress"></div>
      <div class="chapter-marks" id="chapterMarks"></div>
    </div>
    <div class="stage" id="stage">
      <div class="captions" id="captions"></div>
      <div class="toc" id="toc"></div>
      <div class="splash" id="splash">
        <div class="splash-icon">🎬</div>
        <div class="splash-title">${META.title}</div>
        <div class="splash-sub">${META.intro || '点击开始'}</div>
        <button class="splash-btn" id="splashBtn">▶ 开始播放</button>
        <div style="margin-top:18px;font-size:11px;color:#7a8db5;text-align:center;line-height:1.7;">
          💡 提示：支持暂停（空格）· 上一张/下一张（←/→）· 朗读结束才进入下一张<br>
          🎙 想要真人级朗读？点右下角 ⚙ 配置火山引擎 TTS（豆包语音）
        </div>
      </div>
    </div>
    <div class="controls">
      <button class="ctrl-btn" id="prevBtn" title="上一页 ←">⏮</button>
      <button class="ctrl-btn play" id="playBtn" title="播放/暂停 (空格)">▶</button>
      <button class="ctrl-btn" id="nextBtn" title="下一页 →">⏭</button>
      <div class="ctrl-info">
        <div class="ctrl-title" id="ctrlTitle">${META.title}</div>
        <div class="ctrl-meta" id="ctrlMeta">点击 ▶ 开始</div>
      </div>
      <select class="ctrl-select" id="voiceSel" title="选语音"></select>
      <select class="ctrl-select" id="speedSel" title="语速">
        <option value="0.85">慢 0.85×</option>
        <option value="1" selected>1×</option>
        <option value="1.15">略快 1.15×</option>
        <option value="1.3">快 1.3×</option>
        <option value="1.5">超快 1.5×</option>
      </select>
      <span class="ctrl-toggle on" id="voiceBtn" title="语音朗读开关">🔊</span>
      <span class="ctrl-toggle on" id="capBtn" title="字幕开关">字幕</span>
      <span class="ctrl-toggle" id="ttsCfgBtn" title="火山 TTS 设置（豆包语音）"><span class="tts-badge"></span>⚙</span>
      <button class="ctrl-btn" id="tocBtn" title="章节列表">☰</button>
    </div>

    <!-- 火山 TTS 设置浮窗 -->
    <div class="tts-modal" id="ttsModal">
      <div class="tts-card">
        <h3>🎙 火山引擎 TTS（豆包语音）</h3>
        <p class="sub">配置后用真人级中文播音朗读，免费额度足够日常学习。<br>未配置时降级到浏览器内置 TTS。</p>

        <label>App ID</label>
        <input id="arkAppId" placeholder="如 1234567890" autocomplete="off">

        <label>Access Token</label>
        <input id="arkToken" type="password" placeholder="火山控制台获取" autocomplete="off">

        <label>Cluster（集群）</label>
        <input id="arkCluster" placeholder="如 volcano_tts" value="volcano_tts">

        <label>Voice Type（音色）</label>
        <select id="arkVoice">
          <optgroup label="常用音色（免费）">
            <option value="BV001_streaming">通用女声 · BV001</option>
            <option value="BV002_streaming">通用男声 · BV002</option>
            <option value="BV700_streaming">擎苍 · 沉稳男声</option>
            <option value="BV705_streaming">炀炀 · 知性女声</option>
          </optgroup>
          <optgroup label="情感音色（需购买）">
            <option value="BV064_streaming">情感女声 · BV064</option>
            <option value="BV407_streaming">魅力女声 · BV407</option>
            <option value="BV701_streaming">擎苍-多情感 · BV701</option>
          </optgroup>
        </select>

        <p class="help">🔒 配置只保存在浏览器本地，不上传任何服务器。<br>
        申请地址：<a href="https://console.volcengine.com/speech/app" target="_blank">火山引擎语音技术控制台</a> → 创建应用 → 复制 App ID 与 Access Token。<br>
        ⚠️ 浏览器直连可能被火山 CORS 拦截。如失败，可选自建代理（告诉 Claude 帮你做）。</p>

        <div class="actions">
          <button class="tts-test" id="ttsTestBtn">🔉 测试朗读</button>
          <button class="tts-save" id="ttsSaveBtn">保存</button>
        </div>
        <div class="tts-result" id="ttsResult"></div>
      </div>
    </div>
  `;

  // ===================== 元素引用 =====================
  const stage = document.getElementById('stage');
  const captions = document.getElementById('captions');
  const progress = document.getElementById('progress');
  const chapterMarks = document.getElementById('chapterMarks');
  const playBtn = document.getElementById('playBtn');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const ctrlTitle = document.getElementById('ctrlTitle');
  const ctrlMeta = document.getElementById('ctrlMeta');
  const speedSel = document.getElementById('speedSel');
  const voiceSel = document.getElementById('voiceSel');
  const voiceBtn = document.getElementById('voiceBtn');
  const capBtn = document.getElementById('capBtn');
  const tocBtn = document.getElementById('tocBtn');
  const toc = document.getElementById('toc');
  const splash = document.getElementById('splash');
  const splashBtn = document.getElementById('splashBtn');
  const ttsCfgBtn = document.getElementById('ttsCfgBtn');
  const ttsModal = document.getElementById('ttsModal');

  // ===================== 状态 =====================
  let idx = 0;
  let playing = false;
  let speed = 1;
  let voiceOn = true;
  let capOn = true;
  let currentUtter = null;
  let currentAudio = null;
  let captionTimer = null;
  let advanceTimer = null;
  let preferredVoiceName = null;

  // 预生成 MP3（最高优先级，跨平台稳定）
  let pregenAvailable = false;
  let pregenVideoId = null;
  function initPregenAudio() {
    const filename = (location.pathname.split('/').pop() || '').toLowerCase();
    const m = filename.match(/^(.+?)-video\.html$/);
    if (!m) return;
    pregenVideoId = m[1];
    // 加载 audio manifest（cache-bust 用版本号）
    const ver = (document.querySelector('link[href*="_player.css"]')?.href.match(/v=(\d+)/) || ['', '0'])[1];
    fetch(`./audio/manifest.json?v=${ver}`, { cache: 'no-cache' })
      .then(r => r.ok ? r.json() : null)
      .then(manifest => {
        if (manifest && manifest.videos && manifest.videos[pregenVideoId]) {
          pregenAvailable = true;
          console.log(`[Audio] 检测到预生成 MP3: ${pregenVideoId}（${manifest.videos[pregenVideoId].count} 段）`);
          // 刷新 voice 选择器提示文案
          if (typeof fillVoiceSelector === 'function') fillVoiceSelector();
        }
      })
      .catch(() => {});
  }
  initPregenAudio();

  // 火山 TTS 配置
  const ARK_KEY = 've-ark-tts';
  function loadArkConfig() {
    try { return JSON.parse(localStorage.getItem(ARK_KEY) || '{}'); }
    catch (e) { return {}; }
  }
  function saveArkConfig(c) {
    localStorage.setItem(ARK_KEY, JSON.stringify(c));
  }
  let arkConfig = loadArkConfig();
  function isArkReady() {
    return !!(arkConfig.appid && arkConfig.token && arkConfig.cluster && arkConfig.voice);
  }
  function updateArkBadge() {
    ttsCfgBtn.classList.toggle('tts-ark', isArkReady());
    ttsCfgBtn.title = isArkReady()
      ? `已配置火山 TTS · ${arkConfig.voice}（真人级朗读）`
      : '火山 TTS 设置（豆包语音）';
  }
  updateArkBadge();

  const totalDuration = SLIDES.reduce((s, x) => s + (x.fallbackDuration || 10000), 0);

  // ===================== 渲染所有幻灯片 =====================
  SLIDES.forEach((s, i) => {
    const div = document.createElement('div');
    div.className = 'slide';
    div.dataset.idx = i;
    div.innerHTML = `
      ${s.eyebrow ? `<div class="slide-eyebrow">${s.eyebrow}</div>` : ''}
      ${s.title ? `<div class="slide-title">${s.title}</div>` : ''}
      ${s.visual ? `<div class="visual">${s.visual}</div>` : ''}
      ${s.body ? `<div class="slide-body">${s.body}</div>` : ''}
    `;
    stage.insertBefore(div, captions);
  });

  // TOC + 章节标记
  let cumDuration = 0;
  const seenCh = new Set();
  const chapterStarts = [];
  SLIDES.forEach((s, i) => {
    if (!seenCh.has(s.chapter)) {
      seenCh.add(s.chapter);
      chapterStarts.push({ idx: i, t: cumDuration, name: s.chapter });
    }
    cumDuration += (s.fallbackDuration || 10000);
  });
  chapterStarts.forEach((c, n) => {
    const mark = document.createElement('div');
    mark.className = 'chapter-mark';
    mark.style.left = (c.t / totalDuration * 100) + '%';
    chapterMarks.appendChild(mark);
    const item = document.createElement('div');
    item.className = 'toc-item';
    item.dataset.idx = c.idx;
    item.innerHTML = `<span class="toc-num">${String(n + 1).padStart(2, '0')}</span><span>${c.name}</span>`;
    item.addEventListener('click', () => { goTo(c.idx); toc.classList.remove('show'); });
    toc.appendChild(item);
  });

  function updateToc() {
    document.querySelectorAll('.toc-item').forEach(el => {
      el.classList.toggle('active', SLIDES[idx].chapter === SLIDES[+el.dataset.idx].chapter);
    });
  }

  // ===================== 字幕（逐字） =====================
  function showCaption(text) {
    if (captionTimer) { clearInterval(captionTimer); captionTimer = null; }
    captions.classList.remove('done');
    if (!capOn || !text) { captions.classList.remove('show'); return; }
    captions.textContent = '';
    captions.classList.add('show');
    let i = 0;
    const step = Math.max(40, 90 - speed * 30);
    captionTimer = setInterval(() => {
      if (i < text.length) { captions.textContent = text.slice(0, i + 1); i++; }
      else { clearInterval(captionTimer); captionTimer = null; captions.classList.add('done'); }
    }, step);
  }

  // ===================== Web Speech 选择最佳中文 voice =====================
  function pickBestVoice() {
    if (!window.speechSynthesis) return null;
    const voices = window.speechSynthesis.getVoices();
    if (!voices.length) return null;
    const preferred = [
      /Microsoft Xiaoxiao/i, /Microsoft Yunxi/i, /Microsoft Yunyang/i,
      /Microsoft Xiaoyi/i, /Microsoft Xiaoxuan/i, /Microsoft Huihui/i,
      /Microsoft Yaoyao/i, /Microsoft Kangkang/i,
      /Tingting/i, /Sin-ji/i, /^Google.*[Zz]h[-_]CN/, /Mei-Jia/i
    ];
    if (preferredVoiceName) {
      const v = voices.find(x => x.name === preferredVoiceName);
      if (v) return v;
    }
    for (const re of preferred) {
      const v = voices.find(x => x.lang.startsWith('zh') && re.test(x.name));
      if (v) return v;
    }
    return voices.find(x => x.lang.startsWith('zh')) || voices[0];
  }
  function fillVoiceSelector() {
    if (!window.speechSynthesis) return;
    const voices = window.speechSynthesis.getVoices().filter(v => v.lang.startsWith('zh'));
    if (!voices.length) {
      // 没系统中文 voice：提示用户预生成 MP3 或火山 TTS
      const hint = pregenAvailable
        ? '✅ 已用预生成 MP3'
        : '⚠️ 系统无中文语音 · 点 ⚙ 配置火山 TTS 或加载 MP3 包';
      voiceSel.innerHTML = `<option>${hint}</option>`;
      return;
    }
    const best = pickBestVoice();
    voiceSel.innerHTML = '';
    voices.forEach(v => {
      const opt = document.createElement('option');
      opt.value = v.name;
      opt.textContent = '🌐 ' + v.name.replace(/Microsoft\s+/, '').replace(/\s*\(.*\)$/, '');
      if (best && v.name === best.name) opt.selected = true;
      voiceSel.appendChild(opt);
    });
  }
  if (window.speechSynthesis) {
    window.speechSynthesis.onvoiceschanged = fillVoiceSelector;
    fillVoiceSelector();
  }
  voiceSel.addEventListener('change', () => {
    preferredVoiceName = voiceSel.value;
    if (playing && currentUtter) showSlide(idx);
  });

  // ===================== 预生成 MP3 播放（最高优先级）=====================
  function speakWithPregen(slideIdx, onEnd, onError) {
    if (!pregenAvailable || !pregenVideoId) return null;
    const url = `./audio/${pregenVideoId}/${slideIdx}.mp3`;
    try {
      const audio = new Audio(url);
      audio.playbackRate = Math.max(0.5, Math.min(speed, 4));
      audio.onended = () => { if (onEnd) onEnd(); };
      audio.onerror = () => { if (onError) onError(new Error('预生成 MP3 加载失败：' + url)); };
      currentAudio = audio;
      audio.play().catch(e => { if (onError) onError(e); });
      return audio;
    } catch (e) {
      if (onError) onError(e);
      return null;
    }
  }

  // ===================== 火山 TTS 调用 =====================
  async function speakWithArk(text, onEnd, onError) {
    if (!isArkReady()) return null;
    const reqid = 'r' + Math.random().toString(36).slice(2);
    const body = {
      app: { appid: arkConfig.appid, token: arkConfig.token, cluster: arkConfig.cluster },
      user: { uid: 'learn-' + reqid },
      audio: {
        voice_type: arkConfig.voice,
        encoding: 'mp3',
        speed_ratio: speed,
        volume_ratio: 1.0,
        pitch_ratio: 1.0
      },
      request: { reqid, text, operation: 'query' }
    };
    try {
      const resp = await fetch('https://openspeech.bytedance.com/api/v1/tts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer;' + arkConfig.token
        },
        body: JSON.stringify(body)
      });
      const data = await resp.json();
      if (data.code !== 3000 || !data.data) {
        throw new Error(`code=${data.code} msg=${data.message || ''}`);
      }
      // base64 mp3 → Blob → audio.src
      const bin = atob(data.data);
      const arr = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
      const blob = new Blob([arr], { type: 'audio/mp3' });
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audio.onended = () => { URL.revokeObjectURL(url); if (onEnd) onEnd(); };
      audio.onerror = () => { URL.revokeObjectURL(url); if (onError) onError(new Error('audio play failed')); };
      currentAudio = audio;
      audio.play().catch(e => { if (onError) onError(e); });
      return audio;
    } catch (e) {
      if (onError) onError(e);
      return null;
    }
  }

  // ===================== 主播放循环 =====================
  function stopAllAudio() {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    if (currentAudio) {
      try { currentAudio.pause(); } catch (e) {}
      currentAudio = null;
    }
    currentUtter = null;
  }

  function showSlide(i) {
    if (advanceTimer) { clearTimeout(advanceTimer); advanceTimer = null; }
    stopAllAudio();

    document.querySelectorAll('.slide').forEach(s => s.classList.toggle('active', +s.dataset.idx === i));
    const s = SLIDES[i];

    ctrlTitle.textContent = s.title || s.chapter;
    ctrlMeta.textContent = `第 ${i + 1} / ${SLIDES.length} 张 · ${s.chapter}`;
    let elapsed = 0;
    for (let k = 0; k < i; k++) elapsed += (SLIDES[k].fallbackDuration || 10000);
    progress.style.width = (elapsed / totalDuration * 100) + '%';
    updateToc();
    showCaption(s.voice);

    if (!voiceOn || !s.voice) {
      // 没朗读 → fallback duration
      if (playing) {
        advanceTimer = setTimeout(() => {
          if (playing && idx < SLIDES.length - 1) { idx++; showSlide(idx); }
          else pause();
        }, (s.fallbackDuration || 10000) / speed);
      }
      return;
    }

    // 优先级 1：预生成 MP3（最稳，跨平台一致）
    const onPregenEnd = () => {
      if (!playing) return;
      advanceTimer = setTimeout(() => {
        if (playing && idx < SLIDES.length - 1) { idx++; showSlide(idx); }
        else pause();
      }, 600);
    };
    const onPregenErr = (err) => {
      console.warn('[Audio] 预生成 MP3 不可用，降级:', err && err.message);
      // 降到优先级 2：火山 TTS
      if (isArkReady()) {
        speakWithArk(s.voice, onPregenEnd, () => fallbackToWebSpeech(s));
      } else {
        fallbackToWebSpeech(s);
      }
    };
    if (pregenAvailable) {
      const ok = speakWithPregen(i, onPregenEnd, onPregenErr);
      if (ok) return;
    }

    // 优先级 2：火山 TTS
    if (isArkReady()) {
      speakWithArk(s.voice,
        () => {
          if (!playing) return;
          advanceTimer = setTimeout(() => {
            if (playing && idx < SLIDES.length - 1) { idx++; showSlide(idx); }
            else pause();
          }, 1000);
        },
        (err) => {
          console.warn('Ark TTS 失败，降级到 Web Speech:', err.message);
          fallbackToWebSpeech(s);
        }
      );
    } else {
      // 优先级 3：浏览器 Web Speech
      fallbackToWebSpeech(s);
    }
  }

  function fallbackToWebSpeech(s) {
    if (!window.speechSynthesis) {
      advanceTimer = setTimeout(() => {
        if (playing && idx < SLIDES.length - 1) { idx++; showSlide(idx); }
        else pause();
      }, (s.fallbackDuration || 10000) / speed);
      return;
    }
    const u = new SpeechSynthesisUtterance(s.voice);
    u.lang = 'zh-CN';
    u.rate = speed * 0.92;
    u.pitch = 1.08;
    const voice = pickBestVoice();
    if (voice) u.voice = voice;
    currentUtter = u;
    u.onend = () => {
      if (!playing || currentUtter !== u) return;
      advanceTimer = setTimeout(() => {
        if (playing && currentUtter === u) {
          if (idx < SLIDES.length - 1) { idx++; showSlide(idx); }
          else pause();
        }
      }, 1200);
    };
    u.onerror = () => {
      if (!playing || currentUtter !== u) return;
      advanceTimer = setTimeout(() => {
        if (playing && idx < SLIDES.length - 1) { idx++; showSlide(idx); }
        else pause();
      }, (s.fallbackDuration || 10000) / speed);
    };
    window.speechSynthesis.speak(u);
  }

  function play() { playing = true; playBtn.textContent = '⏸'; showSlide(idx); }
  function pause() {
    playing = false;
    playBtn.textContent = '▶';
    if (advanceTimer) { clearTimeout(advanceTimer); advanceTimer = null; }
    stopAllAudio();
  }
  function goTo(i) {
    if (i < 0 || i >= SLIDES.length) return;
    idx = i;
    showSlide(idx);
  }

  // ===================== 事件绑定 =====================
  playBtn.addEventListener('click', () => playing ? pause() : play());
  prevBtn.addEventListener('click', () => goTo(idx - 1));
  nextBtn.addEventListener('click', () => goTo(idx + 1));
  speedSel.addEventListener('change', (e) => {
    speed = parseFloat(e.target.value);
    if (playing) showSlide(idx);
  });
  voiceBtn.addEventListener('click', () => {
    voiceOn = !voiceOn;
    voiceBtn.classList.toggle('on', voiceOn);
    voiceBtn.textContent = voiceOn ? '🔊' : '🔇';
    if (!voiceOn) stopAllAudio();
    if (playing) showSlide(idx);
  });
  capBtn.addEventListener('click', () => {
    capOn = !capOn;
    capBtn.classList.toggle('on', capOn);
    if (!capOn) { captions.classList.remove('show'); if (captionTimer) clearInterval(captionTimer); }
    else if (SLIDES[idx].voice) showCaption(SLIDES[idx].voice);
  });
  tocBtn.addEventListener('click', () => toc.classList.toggle('show'));

  // TTS 设置面板
  ttsCfgBtn.addEventListener('click', () => {
    document.getElementById('arkAppId').value = arkConfig.appid || '';
    document.getElementById('arkToken').value = arkConfig.token || '';
    document.getElementById('arkCluster').value = arkConfig.cluster || 'volcano_tts';
    if (arkConfig.voice) document.getElementById('arkVoice').value = arkConfig.voice;
    ttsModal.classList.add('show');
  });
  ttsModal.addEventListener('click', (e) => {
    if (e.target === ttsModal) ttsModal.classList.remove('show');
  });
  document.getElementById('ttsTestBtn').addEventListener('click', async () => {
    const cfg = {
      appid: document.getElementById('arkAppId').value.trim(),
      token: document.getElementById('arkToken').value.trim(),
      cluster: document.getElementById('arkCluster').value.trim() || 'volcano_tts',
      voice: document.getElementById('arkVoice').value
    };
    const result = document.getElementById('ttsResult');
    if (!cfg.appid || !cfg.token) {
      result.innerHTML = '<span class="tts-fail">❌ 请先填 App ID 和 Token</span>';
      return;
    }
    result.innerHTML = '⏳ 测试中…';
    // 临时用这个 cfg 试调
    const backup = arkConfig;
    arkConfig = cfg;
    await speakWithArk('你好，这是火山引擎语音合成测试。',
      () => { result.innerHTML = '<span class="tts-ok">✅ 朗读成功！可以保存了。</span>'; },
      (err) => {
        arkConfig = backup;
        const msg = err.message || '';
        let hint = '';
        if (/Failed to fetch|CORS/.test(msg)) {
          hint = '<br>⚠️ 浏览器被 CORS 拦截。火山 TTS 不开放跨域，需要走服务端代理。<br>解决：让 Claude 帮你做一个免费的 Cloudflare Worker 代理。';
        } else if (/code=4/.test(msg)) {
          hint = '<br>⚠️ Token / AppID 验证失败，检查火山控制台。';
        }
        result.innerHTML = `<span class="tts-fail">❌ ${msg}</span>${hint}`;
      }
    );
  });
  document.getElementById('ttsSaveBtn').addEventListener('click', () => {
    arkConfig = {
      appid: document.getElementById('arkAppId').value.trim(),
      token: document.getElementById('arkToken').value.trim(),
      cluster: document.getElementById('arkCluster').value.trim() || 'volcano_tts',
      voice: document.getElementById('arkVoice').value
    };
    saveArkConfig(arkConfig);
    updateArkBadge();
    ttsModal.classList.remove('show');
    if (playing) showSlide(idx);
  });

  document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'SELECT' || e.target.tagName === 'INPUT') return;
    if (ttsModal.classList.contains('show')) {
      if (e.key === 'Escape') ttsModal.classList.remove('show');
      return;
    }
    if (e.key === ' ') { e.preventDefault(); playing ? pause() : play(); }
    else if (e.key === 'ArrowRight') goTo(idx + 1);
    else if (e.key === 'ArrowLeft') goTo(idx - 1);
    else if (e.key === 'Escape' && toc.classList.contains('show')) toc.classList.remove('show');
  });

  function startPlayback() {
    splash.classList.add('hide');
    setTimeout(() => splash.style.display = 'none', 500);
    if (window.speechSynthesis) {
      const warm = new SpeechSynthesisUtterance('');
      warm.volume = 0;
      window.speechSynthesis.speak(warm);
    }
    setTimeout(() => play(), 200);
  }
  splashBtn.addEventListener('click', startPlayback);
  splash.addEventListener('click', (e) => { if (e.target === splash) startPlayback(); });

  showSlide(0);
})();
