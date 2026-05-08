// ============================================================
// 智能问答浮窗 · 学习助手
// 流式调用 OpenAI 兼容的 LLM API（火山方舟 / DeepSeek / 通义 等）
// API Key 仅存本地 localStorage，不上传任何服务器
// ============================================================

(function () {
  const SETTINGS_KEY = 've-ai-settings';
  const HISTORY_KEY = 've-ai-history';

  // 服务预设：endpoint + 默认 model
  const PRESETS = {
    ark: {
      label: '火山方舟 / 豆包',
      endpoint: 'https://ark.cn-beijing.volces.com/api/v3/chat/completions',
      model: '',  // 火山方舟需要用户填 endpoint id (ep-xxx)
      placeholder: '在火山方舟控制台 → 在线推理创建后的 endpoint id'
    },
    deepseek: {
      label: 'DeepSeek',
      endpoint: 'https://api.deepseek.com/chat/completions',
      model: 'deepseek-chat',
      placeholder: 'deepseek-chat 或 deepseek-reasoner'
    },
    qwen: {
      label: '通义千问',
      endpoint: 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions',
      model: 'qwen-plus',
      placeholder: '如 qwen-plus / qwen-turbo / qwen-max'
    },
    custom: {
      label: '自定义',
      endpoint: '',
      model: '',
      placeholder: '兼容 OpenAI Chat Completions 协议'
    }
  };

  // ====================== state ======================
  let settings = loadSettings();
  let history = loadHistory();
  let abortController = null;

  function loadSettings() {
    try {
      return JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}');
    } catch (e) { return {}; }
  }
  function saveSettings(s) {
    settings = s;
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(s));
  }
  function loadHistory() {
    try {
      const arr = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
      return Array.isArray(arr) ? arr : [];
    } catch (e) { return []; }
  }
  function saveHistory() {
    // 只保留最近 30 条，避免 localStorage 撑爆
    const tail = history.slice(-30);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(tail));
  }

  // ====================== 上下文抓取 ======================
  // 拿用户当前正在看的章节内容，作为提问上下文
  function getContext() {
    if (typeof window.appState === 'undefined') return null;
    const s = window.appState;

    // 1) 课程章节（Day N）
    if (s.currentDay && typeof COURSE !== 'undefined') {
      const d = COURSE.find(x => x.day === s.currentDay);
      if (d) return packCourse(d);
    }
    // 2) 面试培训
    if (s.currentInterview && typeof INTERVIEW !== 'undefined') {
      const c = INTERVIEW.find(x => x.id === s.currentInterview);
      if (c) return packGeneric(c, '面试培训');
    }
    // 3) 竞品分析
    if (s.currentCompetition && typeof COMPETITION !== 'undefined') {
      const c = COMPETITION.find(x => x.id === s.currentCompetition);
      if (c) return packGeneric(c, '竞品分析');
    }
    // 4) 顶层模块
    return { label: viewLabel(s.view), content: '' };
  }

  function viewLabel(view) {
    return ({
      dashboard: '学习仪表盘',
      curriculum: '课程目录',
      interview: '面试培训首页',
      competition: '竞品分析首页',
      exam: '综合考试',
      about: '学习指南'
    })[view] || '学习平台';
  }

  function packCourse(d) {
    const sections = (d.sections || []).map(sec => {
      const kps = (sec.keypoints || []).map(k => `  - ${k.title}：${k.body}`).join('\n');
      return `${sec.title}\n${kps}`;
    }).join('\n\n');
    const tip = d.sellingPoint ? `\n\n【售前要点】${d.sellingPoint}` : '';
    return {
      label: `Day ${d.day} · ${d.title}`,
      content: `# Day ${d.day} · ${d.title}\n\n${d.summary}\n\n${sections}${tip}`
    };
  }
  function packGeneric(c, prefix) {
    const sections = (c.sections || []).map(sec => {
      const kps = (sec.keypoints || []).map(k => `  - ${k.title}：${k.body}`).join('\n');
      return `${sec.title}\n${kps}`;
    }).join('\n\n');
    const tips = c.tips ? `\n\n【关键心法】${c.tips}` : '';
    return {
      label: `${prefix} · ${c.title.replace(/^[A-Z0-9-]+\s*·\s*/, '')}`,
      content: `# ${c.title}\n\n${c.summary || ''}\n\n${sections}${tips}`
    };
  }

  // ====================== 消息渲染 ======================
  const $ = (id) => document.getElementById(id);

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[c]);
  }
  // 极简 markdown：**bold**、`code`、换行、列表
  function renderMarkdown(text) {
    let s = escapeHtml(text);
    s = s.replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>');
    s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
    // 列表（行首 - 或 1.）
    s = s.replace(/(^|\n)(\d+\.\s|-\s)([^\n]+)/g, (m, br, mark, txt) => {
      return `${br}<div class="ai-li">${mark.trim() === '-' ? '•' : mark.trim()} ${txt}</div>`;
    });
    s = s.replace(/\n/g, '<br>');
    return s;
  }

  function renderMessages() {
    const box = $('aiMessages');
    if (!box) return;
    if (!history.length) {
      box.innerHTML = `
        <div class="ai-msg ai-msg-bot">
          <div class="ai-bubble">嗨！我是你的<b>火山引擎售前学习助手</b>。
看不懂的内容直接问我，我会基于<b>当前章节</b>回答。<br><br>
👉 第一次使用请先点右上角 <b>⚙</b> 配置 AI 服务（推荐火山方舟或 DeepSeek）。<br><br>
试试问我：<br>
• "豆包 Pro 和 Lite 怎么选？"<br>
• "和华为云对比，火山引擎在政企怎么破局？"<br>
• "RAG 七层架构是什么？"</div>
        </div>`;
      return;
    }
    box.innerHTML = history.map(m => `
      <div class="ai-msg ${m.role === 'user' ? 'ai-msg-user' : 'ai-msg-bot'}">
        <div class="ai-bubble">${renderMarkdown(m.content)}</div>
      </div>
    `).join('');
    box.scrollTop = box.scrollHeight;
  }

  function pushMessage(role, content) {
    history.push({ role, content });
    saveHistory();
    renderMessages();
  }

  function updateLastBotMessage(content) {
    if (history.length && history[history.length - 1].role === 'assistant') {
      history[history.length - 1].content = content;
    } else {
      history.push({ role: 'assistant', content });
    }
    renderMessages();
  }

  // ====================== 流式调用 API ======================
  function buildSystemPrompt(ctx) {
    const base = `你是「火山引擎售前学习助手」。学习者是售前工程师，正在学习火山引擎产品体系、AI 大模型、售前方法论与竞品分析（重点华为云）。

回答风格：
- 精炼、专业、像售前训练教练一样直接给出可操作的话术或观点
- 平均 3-6 句话；列表式回答最多 5 条
- 必要时给"对位话术"（先承认对手优势，再迁移维度，最后给可验证 POC）
- 如果问题与学习内容无关，礼貌引导回学习场景`;

    if (ctx && ctx.content) {
      return base + `\n\n当前学习者正在看的章节：\n----\n${ctx.content}\n----\n\n请优先基于上述内容回答；超出范围时可以扩展回答。`;
    }
    return base;
  }

  async function sendMessage(userText, withContext) {
    if (!settings.endpoint || !settings.apiKey) {
      pushMessage('assistant', '⚠️ 还没配置 AI 服务。请点右上角 **⚙** 设置。');
      openSettings();
      return;
    }

    pushMessage('user', userText);
    const ctx = withContext ? getContext() : null;

    // 构造对话消息（保留近 8 轮历史）
    const messages = [{ role: 'system', content: buildSystemPrompt(ctx) }];
    const recent = history.slice(-16); // 最多 8 轮 user+assistant
    for (const m of recent) {
      messages.push({ role: m.role, content: m.content });
    }

    // 占位 bot 消息
    pushMessage('assistant', '…');

    abortController = new AbortController();
    const sendBtn = $('aiSendBtn');
    if (sendBtn) sendBtn.textContent = '停止';

    try {
      const resp = await fetch(settings.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + settings.apiKey
        },
        body: JSON.stringify({
          model: settings.model || 'gpt-3.5-turbo',
          messages,
          stream: true,
          temperature: 0.6
        }),
        signal: abortController.signal
      });
      if (!resp.ok) {
        const err = await resp.text().catch(() => '');
        throw new Error(`HTTP ${resp.status}：${err.slice(0, 200) || resp.statusText}`);
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let buf = '';
      let acc = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        const lines = buf.split('\n');
        buf = lines.pop(); // 留最后未完整一行
        for (const line of lines) {
          const t = line.trim();
          if (!t || !t.startsWith('data:')) continue;
          const payload = t.slice(5).trim();
          if (payload === '[DONE]') continue;
          try {
            const j = JSON.parse(payload);
            const delta = j.choices?.[0]?.delta?.content || '';
            if (delta) {
              acc += delta;
              updateLastBotMessage(acc);
            }
          } catch (e) { /* 忽略未完整 JSON */ }
        }
      }
      if (!acc) updateLastBotMessage('（API 没返回内容；可能是模型ID错误或额度耗尽）');
    } catch (err) {
      const msg = err.name === 'AbortError' ? '⏹ 已停止' : `❌ 请求失败：${err.message}`;
      updateLastBotMessage(msg);
    } finally {
      abortController = null;
      if (sendBtn) sendBtn.textContent = '发送';
    }
  }

  // ====================== UI 控制 ======================
  function openPanel() {
    const p = $('aiPanel');
    if (p) { p.hidden = false; p.style.display = ''; }
    refreshContextLabel();
    renderMessages();
    setTimeout(() => $('aiInput')?.focus(), 100);
  }
  function closePanel() {
    const p = $('aiPanel');
    if (p) { p.hidden = true; p.style.display = 'none'; }
    if (abortController) abortController.abort();
  }
  function openSettings() {
    const s = $('aiSettings');
    if (s) { s.hidden = false; s.style.display = ''; }
    fillSettingsForm();
  }
  function closeSettings() {
    const s = $('aiSettings');
    if (s) { s.hidden = true; s.style.display = 'none'; }
  }

  function refreshContextLabel() {
    const ctx = getContext();
    const lbl = $('aiContextLabel');
    if (lbl && ctx) lbl.textContent = ctx.content ? `📍 ${ctx.label}` : ctx.label;
  }

  function fillSettingsForm() {
    $('aiPreset').value = settings.preset || 'ark';
    $('aiEndpoint').value = settings.endpoint || PRESETS[$('aiPreset').value].endpoint;
    $('aiKey').value = settings.apiKey || '';
    $('aiModel').value = settings.model || PRESETS[$('aiPreset').value].model;
    $('aiModel').placeholder = PRESETS[$('aiPreset').value].placeholder;
  }

  function applyPreset(key) {
    const p = PRESETS[key];
    $('aiEndpoint').value = p.endpoint;
    $('aiModel').value = p.model;
    $('aiModel').placeholder = p.placeholder;
  }

  async function testConnection() {
    const result = $('aiTestResult');
    const endpoint = $('aiEndpoint').value.trim();
    const key = $('aiKey').value.trim();
    const model = $('aiModel').value.trim();
    if (!endpoint || !key || !model) {
      result.innerHTML = '<span class="ai-test-fail">❌ 请先填完 Endpoint / Key / Model</span>';
      return;
    }
    result.innerHTML = '⏳ 测试中…';
    try {
      const resp = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + key },
        body: JSON.stringify({
          model, stream: false, max_tokens: 16,
          messages: [{ role: 'user', content: '只回复"OK"两个字' }]
        })
      });
      if (!resp.ok) {
        const t = await resp.text().catch(() => '');
        throw new Error(`${resp.status} ${t.slice(0, 200)}`);
      }
      const j = await resp.json();
      const txt = j.choices?.[0]?.message?.content || '(无内容)';
      result.innerHTML = `<span class="ai-test-ok">✅ 连接成功，模型回复：${escapeHtml(txt)}</span>`;
    } catch (e) {
      result.innerHTML = `<span class="ai-test-fail">❌ ${escapeHtml(e.message)}</span>`;
    }
  }

  function saveAndClose() {
    const s = {
      preset: $('aiPreset').value,
      endpoint: $('aiEndpoint').value.trim(),
      apiKey: $('aiKey').value.trim(),
      model: $('aiModel').value.trim()
    };
    if (!s.endpoint || !s.apiKey || !s.model) {
      $('aiTestResult').innerHTML = '<span class="ai-test-fail">❌ 三个字段都不能为空</span>';
      return;
    }
    saveSettings(s);
    closeSettings();
    pushMessage('assistant', '✅ 配置已保存。问我任何关于学习内容的问题吧。');
  }

  function clearHistory() {
    if (!confirm('确定清空所有对话历史吗？')) return;
    history = [];
    saveHistory();
    renderMessages();
  }

  // ====================== 事件绑定 ======================
  function init() {
    const fab = $('aiFab');
    if (!fab) return;

    fab.addEventListener('click', openPanel);

    $('aiSettingsBtn')?.addEventListener('click', openSettings);

    $('aiPreset')?.addEventListener('change', (e) => applyPreset(e.target.value));
    $('aiTestBtn')?.addEventListener('click', testConnection);
    $('aiSaveBtn')?.addEventListener('click', saveAndClose);

    // 输入与发送
    const input = $('aiInput');
    const sendBtn = $('aiSendBtn');
    const ctxBtn = $('aiContextBtn');
    let withContext = true;
    if (ctxBtn) {
      ctxBtn.classList.add('on');
      ctxBtn.addEventListener('click', () => {
        withContext = !withContext;
        ctxBtn.classList.toggle('on', withContext);
        ctxBtn.title = withContext ? '已附加当前章节内容' : '不附加当前章节';
      });
    }
    if (input) {
      // textarea autosize
      input.addEventListener('input', () => {
        input.style.height = 'auto';
        input.style.height = Math.min(120, input.scrollHeight) + 'px';
      });
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) {
          e.preventDefault();
          sendBtn?.click();
        }
      });
    }
    if (sendBtn) {
      sendBtn.addEventListener('click', () => {
        if (abortController) {
          abortController.abort();
          return;
        }
        const text = input?.value.trim();
        if (!text) return;
        input.value = '';
        input.style.height = 'auto';
        sendMessage(text, withContext);
      });
    }

    // ESC 关闭浮窗
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if ($('aiSettings') && !$('aiSettings').hidden) closeSettings();
        else if ($('aiPanel') && !$('aiPanel').hidden) closePanel();
      }
    });

    // 长按 fab 触发清空（额外功能）
    let pressTimer = null;
    fab.addEventListener('pointerdown', () => {
      pressTimer = setTimeout(clearHistory, 1500);
    });
    fab.addEventListener('pointerup', () => clearTimeout(pressTimer));
    fab.addEventListener('pointerleave', () => clearTimeout(pressTimer));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
