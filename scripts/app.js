// ============ 状态管理 ============
const STORAGE_KEY = 've-presales-learn';
const state = {
  view: 'dashboard',
  currentDay: null,
  currentInterview: null,   // 当前打开的面试培训章节 id
  currentCompetition: null, // 当前打开的竞品分析章节 id
  examState: null,
  progress: loadProgress()
};

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const p = JSON.parse(raw);
      // 向下兼容：补齐新字段
      if (!p.completedInterview) p.completedInterview = {};
      if (!p.completedCompetition) p.completedCompetition = {};
      return p;
    }
  } catch (e) {}
  return { completedDays: {}, dailyQuizScores: {}, examHistory: [], completedInterview: {}, completedCompetition: {} };
}
function saveProgress() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.progress));
}

// ============ 路由 ============
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.view = btn.dataset.view;
    state.currentDay = null;
    state.currentInterview = null;
    state.currentCompetition = null;
    state.examState = null;
    // 移动端：让被点击的 tab 滚到 nav 中央
    if (window.matchMedia('(max-width: 768px)').matches) {
      btn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
    render();
  });
});

document.getElementById('resetBtn').addEventListener('click', () => {
  if (confirm('确定要重置所有学习进度和考试记录吗？此操作不可恢复。')) {
    localStorage.removeItem(STORAGE_KEY);
    state.progress = loadProgress();
    render();
  }
});

// ============ 章节导航（下一章预览） ============
// 三个模块共用：传入数组、键名（day 或 id）、当前值、跳转回调
function renderNextNav({ list, key, current, theme, onGo, onBack, labelCurrent, labelNext, labelDone }) {
  const idx = list.findIndex(x => x[key] === current);
  const isLast = idx < 0 || idx >= list.length - 1;
  const totalText = `${idx + 1} / ${list.length}`;

  if (isLast) {
    return `
      <div class="next-nav done" style="--theme:${theme};">
        <div class="next-info">
          <span class="next-label">🎉 ${labelDone || '已是最后一章'}</span>
          <h4>恭喜，你已学完本模块全部 ${list.length} ${labelCurrent || '章'}</h4>
          <p>建议回到模块首页检查完成度，或开始下一个学习模块。</p>
        </div>
        <button class="btn btn-primary next-go" data-action="back" style="background:${theme};">回到模块首页 ↩</button>
      </div>`;
  }
  const next = list[idx + 1];
  const nextTitle = (next.title || `Day ${next.day} ${next.titleText || ''}`).trim();
  const nextCode = nextTitle.includes('·') ? nextTitle.split('·')[0].trim() : (next.day ? `Day ${next.day}` : '');
  const nextBody = nextTitle.includes('·') ? (nextTitle.split('·').slice(1).join('·')).trim() : (next.title || '');

  return `
    <div class="next-nav" style="--theme:${theme};">
      <div class="next-info">
        <span class="next-label">⏭ ${labelNext || '下一章'} · ${totalText}</span>
        <h4><span class="next-code">${nextCode}</span>${nextBody}</h4>
        <p>${next.summary || ''}</p>
      </div>
      <button class="btn btn-primary next-go" data-action="next" style="background:${theme};">前往学习 →</button>
    </div>`;
}

// ============ 主渲染 ============
function render() {
  const app = document.getElementById('app');
  if (state.currentDay) return renderLesson(app);
  if (state.currentInterview) return renderInterviewChapter(app);
  if (state.currentCompetition) return renderCompetitionChapter(app);
  if (state.view === 'dashboard') return renderDashboard(app);
  if (state.view === 'curriculum') return renderCurriculum(app);
  if (state.view === 'interview') return renderInterview(app);
  if (state.view === 'competition') return renderCompetition(app);
  if (state.view === 'exam') return renderExam(app);
  if (state.view === 'about') return renderAbout(app);
}

// ============ 仪表盘 ============
function renderDashboard(app) {
  const total = COURSE.length;
  const done = Object.keys(state.progress.completedDays).length;
  const pct = Math.round((done / total) * 100);
  const examCount = state.progress.examHistory.length;
  const bestExam = state.progress.examHistory.reduce((m, e) => Math.max(m, e.score), 0);
  const dayQuizCount = Object.keys(state.progress.dailyQuizScores).length;

  app.innerHTML = `
    <section class="hero">
      <h2>欢迎来到火山引擎售前工程师 20 天深度营</h2>
      <p>为只有基础 IT 技能的工程师量身打造的深度学习路径，覆盖云基础、火山引擎产品矩阵、AI 与大模型、售前方法论与行业方案；每天 90-120 分钟，20 天达到合格售前水平。</p>
      <div class="hero-stats">
        <div class="stat-card"><div class="num">${done}/${total}</div><div class="lbl">已完成天数</div></div>
        <div class="stat-card"><div class="num">${pct}%</div><div class="lbl">总体进度</div></div>
        <div class="stat-card"><div class="num">${dayQuizCount}</div><div class="lbl">章节小测完成</div></div>
        <div class="stat-card"><div class="num">${bestExam || '—'}</div><div class="lbl">综合考试最佳</div></div>
      </div>
    </section>

    <div class="progress-section">
      <h3>学习进度</h3>
      <div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div>
      <div class="progress-text">
        ${done === 0 ? '还没开始？点击下方"Day 1"开启你的第一天学习吧。' : `已完成 ${done} 天，继续保持！${total - done} 天后你将完成全部课程。`}
        ${examCount > 0 ? ` · 已参加 ${examCount} 次综合考试` : ''}
      </div>
    </div>

    <div class="section-title">今日推荐</div>
    ${renderTodayCard()}

    <div class="section-title">面试培训（独立模块）</div>
    <div class="interview-banner" id="interviewBanner">
      <div>
        <h4>🎯 售前面试一站式准备</h4>
        <p>10 个章节涵盖简历、自我介绍、行为题、技术深问、Case 设计、角色扮演、反问、薪资谈判、50+ 模拟题；建议在 20 天课程同时或之后启动。</p>
      </div>
      <div>
        <button class="btn btn-primary" style="background:#7c3aed;">进入面试培训 →</button>
      </div>
    </div>

    <div class="section-title">竞品分析（独立模块）</div>
    <div class="competition-banner" id="competitionBanner">
      <div>
        <h4>⚔️ 竞品视角与对位策略 · 重点华为</h4>
        <p>6 个章节：竞品视角四层次 · 市场格局 · <b>华为云对位详解（产品级映射 + 5 个对话场景 + HCSP-Presales 政企打法）</b> · 阿里/腾讯 · 百度/AWS/国资云 · 话术四步法+面试高频题。</p>
      </div>
      <div>
        <button class="btn btn-primary" style="background:#dc2626;">进入竞品分析 →</button>
      </div>
    </div>

    <div class="section-title">学习日历</div>
    <div class="day-grid">
      ${COURSE.map(d => renderDayCard(d)).join('')}
    </div>
  `;
  bindDayCardEvents();
  const banner = document.getElementById('interviewBanner');
  if (banner) banner.addEventListener('click', () => {
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    const ivBtn = document.querySelector('.nav-btn[data-view="interview"]');
    if (ivBtn) ivBtn.classList.add('active');
    state.view = 'interview';
    state.currentDay = null;
    state.currentInterview = null;
    state.currentCompetition = null;
    render();
  });
  const cBanner = document.getElementById('competitionBanner');
  if (cBanner) cBanner.addEventListener('click', () => {
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    const cBtn = document.querySelector('.nav-btn[data-view="competition"]');
    if (cBtn) cBtn.classList.add('active');
    state.view = 'competition';
    state.currentDay = null;
    state.currentInterview = null;
    state.currentCompetition = null;
    render();
  });
}

function renderTodayCard() {
  const next = COURSE.find(d => !state.progress.completedDays[d.day]) || COURSE[COURSE.length - 1];
  const stage = STAGES.find(s => s.id === next.stage);
  return `
    <div class="day-card" data-day="${next.day}" style="background: linear-gradient(135deg,#eef2ff 0%,#fff 100%); border-color:${stage.color};">
      <span class="day-num">Day ${next.day} · 推荐学习</span>
      <h4>${next.title}</h4>
      <p>${next.summary}</p>
      <div class="stage" style="color:${stage.color}">${stage.name}</div>
    </div>`;
}

function renderDayCard(d) {
  const stage = STAGES.find(s => s.id === d.stage);
  const completed = state.progress.completedDays[d.day];
  return `
    <div class="day-card ${completed ? 'completed' : ''}" data-day="${d.day}" style="border-left:4px solid ${stage.color};">
      <div class="check">✓</div>
      <span class="day-num">Day ${d.day}</span>
      <h4>${d.title}</h4>
      <p>${d.summary}</p>
      <div class="stage" style="color:${stage.color}">${stage.name}</div>
    </div>`;
}

function bindDayCardEvents() {
  document.querySelectorAll('.day-card[data-day]').forEach(c => {
    c.addEventListener('click', () => {
      state.currentDay = parseInt(c.dataset.day, 10);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      render();
    });
  });
}

// ============ 课程目录 ============
function renderCurriculum(app) {
  app.innerHTML = `
    <div class="hero" style="padding:24px;">
      <h2>20 天深度课程目录</h2>
      <p>分 5 大阶段，覆盖云基础（深度版）→ 火山引擎产品 → AI 大模型 → 售前技能 → 行业方案。</p>
    </div>
    ${STAGES.map(s => {
      const days = COURSE.filter(d => d.stage === s.id);
      return `
        <div class="stage-block">
          <h3 style="--c:${s.color}">${s.name}</h3>
          <p class="desc">共 ${days.length} 天 · 每天 90-120 分钟</p>
          <div class="day-grid">${days.map(renderDayCard).join('')}</div>
        </div>`;
    }).join('')}
  `;
  bindDayCardEvents();
}

// ============ 单日课程 ============
function renderLesson(app) {
  const d = COURSE.find(x => x.day === state.currentDay);
  const stage = STAGES.find(s => s.id === d.stage);
  const completed = state.progress.completedDays[d.day];
  const score = state.progress.dailyQuizScores[d.day];

  app.innerHTML = `
    <div class="lesson-page">
      <div class="lesson-header">
        <div class="lesson-title">
          <div style="font-size:13px;color:${stage.color};font-weight:600;">${stage.name} · Day ${d.day}</div>
          <h2>${d.title}</h2>
          <p>${d.summary} · 建议学习时长 ${d.duration || '90 分钟'}</p>
        </div>
        <div>
          <button class="btn btn-ghost" id="backBtn">← 返回</button>
          ${completed ? `<span style="margin-left:10px;color:var(--success);font-weight:600;">✓ 已完成 ${score ? `(测验 ${score} 分)` : ''}</span>` : ''}
        </div>
      </div>

      <div class="lesson-section">
        <h3>学习目标</h3>
        <ul>${d.objectives.map(o => `<li>${o}</li>`).join('')}</ul>
      </div>

      ${d.sections.map(sec => `
        <div class="lesson-section">
          <h3>${sec.title}</h3>
          ${sec.keypoints.map(k => `
            <div class="keypoint">
              <b>${k.title}</b>
              ${k.body}
            </div>`).join('')}
        </div>
      `).join('')}

      <div class="lesson-section">
        <h3>关键术语</h3>
        <div>${d.terms.map(t => `<span class="term">${t}</span>`).join('')}</div>
      </div>

      <div class="lesson-section">
        <div class="tip"><b>售前要点：</b>${d.sellingPoint}</div>
      </div>

      ${d.caseStudy ? `
        <div class="lesson-section">
          <h3>案例剖析</h3>
          <div class="case-study">
            <div class="case-row"><b>场景：</b>${d.caseStudy.scenario}</div>
            <div class="case-row"><b>方案：</b>${d.caseStudy.solution}</div>
            <div class="case-row case-value"><b>价值：</b>${d.caseStudy.value}</div>
          </div>
        </div>
      ` : ''}

      ${d.commonPitfalls && d.commonPitfalls.length ? `
        <div class="lesson-section">
          <h3>常见踩坑</h3>
          <ul class="pitfalls">${d.commonPitfalls.map(p => `<li>${p}</li>`).join('')}</ul>
        </div>
      ` : ''}

      <div class="lesson-section">
        <h3>章节小测（${(DAILY_QUIZ[d.day]||[]).length} 题，80 分通过）</h3>
        <div id="quizContainer"></div>
      </div>

      ${renderNextNav({
        list: COURSE,
        key: 'day',
        current: d.day,
        theme: stage.color,
        labelCurrent: '天',
        labelNext: '下一天学习',
        labelDone: '已是最后一天'
      })}
    </div>
  `;
  document.getElementById('backBtn').addEventListener('click', () => {
    state.currentDay = null;
    render();
  });
  bindNextNavLesson();
  renderDailyQuiz(d.day);
}

function bindNextNavLesson() {
  document.querySelectorAll('.next-nav .next-go').forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.dataset.action;
      if (action === 'back') {
        state.currentDay = null;
        render();
        return;
      }
      const idx = COURSE.findIndex(x => x.day === state.currentDay);
      if (idx >= 0 && idx < COURSE.length - 1) {
        state.currentDay = COURSE[idx + 1].day;
        window.scrollTo({ top: 0, behavior: 'smooth' });
        render();
      }
    });
  });
}

// ============ 章节小测 ============
function renderDailyQuiz(day) {
  const questions = DAILY_QUIZ[day] || [];
  const container = document.getElementById('quizContainer');
  const answers = new Array(questions.length).fill(null);
  let submitted = false;

  function paint() {
    container.innerHTML = `
      <div class="quiz-box">
        ${questions.map((q, i) => `
          <div class="quiz-question">
            <div class="q-text"><span class="q-num">Q${i + 1}</span>${escapeHtml(q.q)}</div>
            <div class="options" data-q="${i}">
              ${q.options.map((opt, j) => {
                let cls = 'option';
                if (answers[i] === j) cls += ' selected';
                if (submitted) {
                  if (j === q.answer) cls += ' correct';
                  else if (answers[i] === j) cls += ' wrong';
                }
                return `<div class="${cls}" data-opt="${j}"><span class="option-key">${'ABCD'[j]}</span>${escapeHtml(opt)}</div>`;
              }).join('')}
            </div>
            <div class="explanation ${submitted ? 'show' : ''}">解析：${escapeHtml(q.explanation)}</div>
          </div>
        `).join('')}
        <div class="quiz-actions">
          ${submitted
            ? `<button class="btn btn-ghost" id="redoBtn">重做</button>
               <button class="btn btn-success" id="markDoneBtn">${state.progress.completedDays[day] ? '已完成本日' : '✓ 标记完成本日学习'}</button>`
            : `<button class="btn btn-primary" id="submitBtn">提交答案</button>`}
        </div>
        <div id="quizResult"></div>
      </div>
    `;
    bindQuizEvents();
  }

  function bindQuizEvents() {
    if (!submitted) {
      container.querySelectorAll('.options').forEach(g => {
        g.querySelectorAll('.option').forEach(opt => {
          opt.addEventListener('click', () => {
            const qi = parseInt(g.dataset.q, 10);
            answers[qi] = parseInt(opt.dataset.opt, 10);
            paint();
          });
        });
      });
      const submitBtn = container.querySelector('#submitBtn');
      if (submitBtn) submitBtn.addEventListener('click', () => {
        if (answers.includes(null)) {
          alert('请先回答所有题目再提交');
          return;
        }
        submitted = true;
        let correct = 0;
        questions.forEach((q, i) => { if (answers[i] === q.answer) correct++; });
        const score = Math.round((correct / questions.length) * 100);
        state.progress.dailyQuizScores[day] = score;
        saveProgress();
        paint();
        const result = container.querySelector('#quizResult');
        const pass = score >= 80;
        result.innerHTML = `<div class="quiz-result ${pass ? 'pass' : 'fail'}">${pass ? '🎉 通过！' : '继续加油'} 答对 ${correct} / ${questions.length} 题，得 ${score} 分。${pass ? '可以标记本日完成了。' : '建议复习重点后重做。'}</div>`;
      });
    } else {
      const redoBtn = container.querySelector('#redoBtn');
      if (redoBtn) redoBtn.addEventListener('click', () => {
        submitted = false;
        for (let i = 0; i < answers.length; i++) answers[i] = null;
        paint();
      });
      const markBtn = container.querySelector('#markDoneBtn');
      if (markBtn) markBtn.addEventListener('click', () => {
        state.progress.completedDays[day] = { at: Date.now() };
        saveProgress();
        alert(`Day ${day} 已标记完成！进度已保存。`);
        state.currentDay = null;
        render();
      });
    }
  }
  paint();
}

// ============ 综合考试 ============
function renderExam(app) {
  if (!state.examState) {
    const last = state.progress.examHistory[state.progress.examHistory.length - 1];
    app.innerHTML = `
      <div class="exam-intro">
        <h2>火山引擎售前工程师 · 综合认证考试</h2>
        <p>本次考试覆盖云基础、火山引擎产品、AI 与大模型、售前技能、行业方案五大模块，共 50 道单选题，限时 50 分钟，80 分及以上视为通过。</p>
        <ul class="exam-rules">
          <li>📝 题数：50 道单选题（从题库中随机抽取）</li>
          <li>⏱ 时长：50 分钟（自动倒计时）</li>
          <li>✅ 通过标准：≥ 80 分</li>
          <li>🔁 可无限次重考，每次得分记录在历史中</li>
          <li>💡 交卷后可以查看每题正确答案和解析</li>
        </ul>
        <button class="btn btn-primary" id="startExamBtn">🎯 开始考试</button>

        ${state.progress.examHistory.length > 0 ? `
          <div style="margin-top:32px;text-align:left;">
            <div class="section-title">考试历史</div>
            ${state.progress.examHistory.slice().reverse().map((h, i) => `
              <div class="review-item ${h.score >= 80 ? 'correct' : 'wrong'}">
                <div class="q">第 ${state.progress.examHistory.length - i} 次 · 得分 <b>${h.score}</b> · ${h.score >= 80 ? '✅ 通过' : '未通过'}</div>
                <div class="a">${new Date(h.at).toLocaleString('zh-CN')} · 答对 ${h.correct}/${h.total}</div>
              </div>
            `).join('')}
          </div>
        ` : ''}
      </div>
    `;
    document.getElementById('startExamBtn').addEventListener('click', startExam);
    return;
  }
  if (state.examState.finished) return renderExamResult(app);
  renderExamInProgress(app);
}

function startExam() {
  const shuffled = [...FINAL_EXAM].sort(() => Math.random() - 0.5);
  state.examState = {
    questions: shuffled,
    answers: new Array(shuffled.length).fill(null),
    startedAt: Date.now(),
    duration: 50 * 60 * 1000,
    finished: false
  };
  render();
  startExamTimer();
}

let examTimerId = null;
function startExamTimer() {
  if (examTimerId) clearInterval(examTimerId);
  examTimerId = setInterval(() => {
    if (!state.examState || state.examState.finished) {
      clearInterval(examTimerId); return;
    }
    const remain = state.examState.duration - (Date.now() - state.examState.startedAt);
    const el = document.getElementById('examTimer');
    if (el) {
      if (remain <= 0) {
        clearInterval(examTimerId);
        finishExam(true);
      } else {
        const m = Math.floor(remain / 60000);
        const s = Math.floor((remain % 60000) / 1000);
        el.textContent = `⏱ ${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
      }
    }
  }, 1000);
}

function renderExamInProgress(app) {
  const e = state.examState;
  const answered = e.answers.filter(a => a !== null).length;
  const pct = Math.round((answered / e.questions.length) * 100);
  app.innerHTML = `
    <div class="exam-progress-bar">
      <span style="font-weight:600;">综合考试进行中</span>
      <div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div>
      <span style="font-size:13px;color:var(--muted);">已答 ${answered}/${e.questions.length}</span>
      <span class="timer" id="examTimer">⏱ 50:00</span>
    </div>
    <div class="lesson-page">
      ${e.questions.map((q, i) => `
        <div class="quiz-question" style="padding:14px 0;border-bottom:1px solid var(--border);">
          <div class="q-text"><span class="q-num">Q${i + 1}</span><span style="color:var(--muted);font-size:12px;">[${q.category}]</span> ${escapeHtml(q.q)}</div>
          <div class="options" data-q="${i}">
            ${q.options.map((opt, j) => {
              const sel = e.answers[i] === j ? 'selected' : '';
              return `<div class="option ${sel}" data-opt="${j}"><span class="option-key">${'ABCD'[j]}</span>${escapeHtml(opt)}</div>`;
            }).join('')}
          </div>
        </div>
      `).join('')}
      <div class="quiz-actions" style="margin-top:24px;">
        <button class="btn btn-ghost" id="exitExamBtn">放弃考试</button>
        <button class="btn btn-primary" id="submitExamBtn">提交试卷</button>
      </div>
    </div>
  `;
  document.querySelectorAll('.options').forEach(g => {
    g.querySelectorAll('.option').forEach(opt => {
      opt.addEventListener('click', () => {
        const qi = parseInt(g.dataset.q, 10);
        e.answers[qi] = parseInt(opt.dataset.opt, 10);
        g.querySelectorAll('.option').forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
        document.querySelector('.exam-progress-bar .progress-fill').style.width =
          Math.round((e.answers.filter(a => a !== null).length / e.questions.length) * 100) + '%';
        document.querySelector('.exam-progress-bar span:nth-child(3)').textContent =
          `已答 ${e.answers.filter(a => a !== null).length}/${e.questions.length}`;
      });
    });
  });
  document.getElementById('submitExamBtn').addEventListener('click', () => {
    const unanswered = e.answers.filter(a => a === null).length;
    if (unanswered > 0 && !confirm(`你还有 ${unanswered} 题未作答，确定要提交吗？`)) return;
    finishExam(false);
  });
  document.getElementById('exitExamBtn').addEventListener('click', () => {
    if (confirm('确定要放弃本次考试吗？已作答的内容不会保存。')) {
      state.examState = null;
      if (examTimerId) clearInterval(examTimerId);
      render();
    }
  });
  startExamTimer();
}

function finishExam(timeUp) {
  const e = state.examState;
  let correct = 0;
  e.questions.forEach((q, i) => { if (e.answers[i] === q.answer) correct++; });
  const score = Math.round((correct / e.questions.length) * 100);
  e.finished = true;
  e.correct = correct;
  e.score = score;
  e.timeUp = timeUp;
  state.progress.examHistory.push({
    at: Date.now(),
    score, correct,
    total: e.questions.length
  });
  saveProgress();
  if (examTimerId) clearInterval(examTimerId);
  render();
}

function renderExamResult(app) {
  const e = state.examState;
  const pass = e.score >= 80;
  app.innerHTML = `
    <div class="result-card">
      <h2>${pass ? '🎉 恭喜通过认证考试' : '继续努力，再接再厉'}</h2>
      ${e.timeUp ? `<p style="color:var(--warning);">⏰ 考试时间到，已自动交卷</p>` : ''}
      <div class="score-circle ${pass ? 'pass' : ''}" style="--p:${e.score};">
        <span class="score-text">${e.score}</span>
      </div>
      <p>共 ${e.questions.length} 题，答对 <b>${e.correct}</b> 题，得 <b>${e.score}</b> 分</p>
      <p style="color:var(--muted);">${pass ? '已具备火山引擎售前工程师基础认证水平 ✓' : '建议回到对应模块复习重点知识后再战。'}</p>
      <div style="margin-top:20px;display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
        <button class="btn btn-ghost" id="backExamBtn">回到考试中心</button>
        <button class="btn btn-primary" id="retakeExamBtn">🔁 再考一次</button>
      </div>
      <div class="review-list">
        <div class="section-title" style="margin-top:32px;">题目回顾</div>
        ${e.questions.map((q, i) => {
          const my = e.answers[i];
          const ok = my === q.answer;
          return `
            <div class="review-item ${ok ? 'correct' : 'wrong'}">
              <div class="q">${ok ? '✓' : '✗'} Q${i + 1} <span style="color:var(--muted);font-size:12px;">[${q.category}]</span> ${escapeHtml(q.q)}</div>
              <div class="a">
                <b>你的答案：</b>${my === null ? '未作答' : `${'ABCD'[my]} ${escapeHtml(q.options[my])}`}<br>
                <b>正确答案：</b>${'ABCD'[q.answer]} ${escapeHtml(q.options[q.answer])}<br>
                <b>解析：</b>${escapeHtml(q.explanation)}
              </div>
            </div>`;
        }).join('')}
      </div>
    </div>
  `;
  document.getElementById('backExamBtn').addEventListener('click', () => {
    state.examState = null;
    render();
  });
  document.getElementById('retakeExamBtn').addEventListener('click', () => {
    state.examState = null;
    startExam();
  });
}

// ============ 面试培训 ============
function renderInterview(app) {
  const total = (typeof INTERVIEW !== 'undefined' && INTERVIEW.length) || 0;
  const done = Object.keys(state.progress.completedInterview || {}).length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  app.innerHTML = `
    <div class="hero" style="background: linear-gradient(135deg,#7c3aed 0%,#ec4899 50%,#f59e0b 100%); padding:32px;">
      <h2>面试培训 · 售前面试一站式准备</h2>
      <p>10 个章节按面试旅程线性拆分：从简历到自我介绍、行为题、技术深问、Case 设计、角色扮演、反问、薪资谈判到 50+ 模拟题库；建议每天 1-2 章，1-2 周完成全部。</p>
      <div class="hero-stats">
        <div class="stat-card"><div class="num">${total}</div><div class="lbl">总章节数</div></div>
        <div class="stat-card"><div class="num">${done}/${total}</div><div class="lbl">已完成</div></div>
        <div class="stat-card"><div class="num">${pct}%</div><div class="lbl">完成度</div></div>
        <div class="stat-card"><div class="num">${total > 0 ? '约 4 小时' : '—'}</div><div class="lbl">总时长</div></div>
      </div>
    </div>

    <div class="progress-section">
      <h3>面试培训进度</h3>
      <div class="progress-bar"><div class="progress-fill" style="width:${pct}%; background: linear-gradient(135deg,#7c3aed,#ec4899);"></div></div>
      <div class="progress-text">
        ${done === 0 ? '从 C01 开始你的面试备战吧。' : `已完成 ${done} 章，继续保持！${total - done} 章后你将完成全部面试培训。`}
      </div>
    </div>

    <div class="section-title">面试章节</div>
    <div class="day-grid">
      ${(INTERVIEW || []).map(c => renderInterviewCard(c)).join('')}
    </div>
  `;
  bindInterviewCardEvents();
}

function renderInterviewCard(c) {
  const completed = !!(state.progress.completedInterview && state.progress.completedInterview[c.id]);
  return `
    <div class="day-card interview-card ${completed ? 'completed' : ''}" data-iv="${c.id}" style="border-left:4px solid #7c3aed;">
      <div class="check">✓</div>
      <span class="day-num" style="background:#f3e8ff;color:#7c3aed;">${c.title.split('·')[0].trim()}</span>
      <h4>${(c.title.split('·')[1] || c.title).trim()}</h4>
      <p>${c.summary}</p>
      <div class="stage" style="color:#7c3aed">${c.duration || ''}</div>
    </div>`;
}

function bindInterviewCardEvents() {
  document.querySelectorAll('.interview-card[data-iv]').forEach(el => {
    el.addEventListener('click', () => {
      state.currentInterview = el.dataset.iv;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      render();
    });
  });
}

function renderInterviewChapter(app) {
  const c = (INTERVIEW || []).find(x => x.id === state.currentInterview);
  if (!c) {
    state.currentInterview = null;
    return render();
  }
  const completed = !!(state.progress.completedInterview && state.progress.completedInterview[c.id]);

  app.innerHTML = `
    <div class="lesson-page">
      <div class="lesson-header">
        <div class="lesson-title">
          <div style="font-size:13px;color:#7c3aed;font-weight:600;">面试培训 · ${c.title.split('·')[0].trim()}</div>
          <h2>${(c.title.split('·')[1] || c.title).trim()}</h2>
          <p>${c.summary} · 建议学习时长 ${c.duration || '20 分钟'}</p>
        </div>
        <div>
          <button class="btn btn-ghost" id="backBtn">← 返回</button>
          ${completed ? `<span style="margin-left:10px;color:var(--success);font-weight:600;">✓ 已完成</span>` : ''}
        </div>
      </div>

      ${c.objectives ? `
        <div class="lesson-section">
          <h3>本章目标</h3>
          <ul>${c.objectives.map(o => `<li>${o}</li>`).join('')}</ul>
        </div>
      ` : ''}

      ${c.sections.map(sec => `
        <div class="lesson-section">
          <h3>${sec.title}</h3>
          ${sec.keypoints.map(k => `
            <div class="keypoint" style="background:#f5f3ff;border-left-color:#7c3aed;">
              <b style="color:#7c3aed;">${k.title}</b>
              ${k.body}
            </div>`).join('')}
        </div>
      `).join('')}

      ${c.tips ? `
        <div class="lesson-section">
          <div class="tip" style="background:#fdf4ff;border-left-color:#a855f7;"><b style="color:#7c3aed;">关键心法：</b>${c.tips}</div>
        </div>
      ` : ''}

      <div class="lesson-section" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
        <button class="btn btn-ghost" id="ivBackBtn">← 返回章节列表</button>
        <button class="btn btn-success" id="ivMarkBtn">${completed ? '✓ 已完成（再次确认）' : '✓ 标记本章完成'}</button>
      </div>

      ${renderNextNav({
        list: INTERVIEW || [],
        key: 'id',
        current: c.id,
        theme: '#7c3aed',
        labelCurrent: '章',
        labelNext: '下一章',
        labelDone: '已是最后一章'
      })}
    </div>
  `;

  document.getElementById('backBtn').addEventListener('click', () => {
    state.currentInterview = null;
    render();
  });
  document.getElementById('ivBackBtn').addEventListener('click', () => {
    state.currentInterview = null;
    render();
  });
  document.getElementById('ivMarkBtn').addEventListener('click', () => {
    if (!state.progress.completedInterview) state.progress.completedInterview = {};
    state.progress.completedInterview[c.id] = { at: Date.now() };
    saveProgress();
    alert(`${c.title} 已标记完成！`);
    state.currentInterview = null;
    render();
  });
  // next-nav 跳转
  document.querySelectorAll('.next-nav .next-go').forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.dataset.action;
      if (action === 'back') {
        state.currentInterview = null;
        render();
        return;
      }
      const list = INTERVIEW || [];
      const idx = list.findIndex(x => x.id === state.currentInterview);
      if (idx >= 0 && idx < list.length - 1) {
        state.currentInterview = list[idx + 1].id;
        window.scrollTo({ top: 0, behavior: 'smooth' });
        render();
      }
    });
  });
}

// ============ 竞品分析模块 ============
function renderCompetition(app) {
  const list = (typeof COMPETITION !== 'undefined' && COMPETITION) || [];
  const total = list.length;
  const done = Object.keys(state.progress.completedCompetition || {}).length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  app.innerHTML = `
    <div class="hero" style="background: linear-gradient(135deg,#dc2626 0%,#f59e0b 50%,#fbbf24 100%); padding:32px;">
      <h2>⚔️ 竞品分析 · 对位策略与话术（重点：华为云）</h2>
      <p>6 个章节系统建立"竞品视角"：从客户画像到维度迁移，从产品级对位到 5 个典型对话场景。<b>第 3 章「华为云对位详解」按 HCSP-Presales 政企方向知识体系组织</b>，是整个模块的核心。</p>
      <div class="hero-stats">
        <div class="stat-card"><div class="num">${total}</div><div class="lbl">总章节数</div></div>
        <div class="stat-card"><div class="num">${done}/${total}</div><div class="lbl">已完成</div></div>
        <div class="stat-card"><div class="num">${pct}%</div><div class="lbl">完成度</div></div>
        <div class="stat-card"><div class="num">${total > 0 ? '约 2.5 小时' : '—'}</div><div class="lbl">总时长</div></div>
      </div>
    </div>

    <div class="progress-section">
      <h3>竞品分析进度</h3>
      <div class="progress-bar"><div class="progress-fill" style="width:${pct}%; background: linear-gradient(135deg,#dc2626,#f59e0b);"></div></div>
      <div class="progress-text">
        ${done === 0 ? '建议先看 COMP-01 建立方法论，再直接跳到 COMP-03（华为重点）。' : `已完成 ${done} 章，继续保持！${total - done} 章后你将完成全部竞品分析。`}
      </div>
    </div>

    <div class="section-title">竞品章节</div>
    <div class="day-grid">
      ${list.map(c => renderCompetitionCard(c)).join('')}
    </div>
  `;
  bindCompetitionCardEvents();
}

function renderCompetitionCard(c) {
  const completed = !!(state.progress.completedCompetition && state.progress.completedCompetition[c.id]);
  // 给 COMP-03 华为重点章加一个特殊标记
  const isFocus = c.id === 'comp03';
  const codeBadge = c.title.split('·')[0].trim();
  const titleBody = (c.title.split('·')[1] || c.title).trim();
  return `
    <div class="day-card competition-card ${completed ? 'completed' : ''} ${isFocus ? 'focus' : ''}" data-cp="${c.id}" style="border-left:4px solid #dc2626;">
      <div class="check">✓</div>
      ${isFocus ? '<div class="focus-flag">★ 核心重点</div>' : ''}
      <span class="day-num" style="background:#fee2e2;color:#dc2626;">${codeBadge}</span>
      <h4>${titleBody}</h4>
      <p>${c.summary}</p>
      <div class="stage" style="color:#dc2626">${c.duration || ''}</div>
    </div>`;
}

function bindCompetitionCardEvents() {
  document.querySelectorAll('.competition-card[data-cp]').forEach(el => {
    el.addEventListener('click', () => {
      state.currentCompetition = el.dataset.cp;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      render();
    });
  });
}

function renderCompetitionChapter(app) {
  const list = (typeof COMPETITION !== 'undefined' && COMPETITION) || [];
  const c = list.find(x => x.id === state.currentCompetition);
  if (!c) {
    state.currentCompetition = null;
    return render();
  }
  const completed = !!(state.progress.completedCompetition && state.progress.completedCompetition[c.id]);
  const codeBadge = c.title.split('·')[0].trim();
  const titleBody = (c.title.split('·')[1] || c.title).trim();

  app.innerHTML = `
    <div class="lesson-page">
      <div class="lesson-header">
        <div class="lesson-title">
          <div style="font-size:13px;color:#dc2626;font-weight:600;">竞品分析 · ${codeBadge}</div>
          <h2>${titleBody}</h2>
          <p>${c.summary} · 建议学习时长 ${c.duration || '20 分钟'}</p>
        </div>
        <div>
          <button class="btn btn-ghost" id="backBtn">← 返回</button>
          ${completed ? `<span style="margin-left:10px;color:var(--success);font-weight:600;">✓ 已完成</span>` : ''}
        </div>
      </div>

      ${c.objectives ? `
        <div class="lesson-section">
          <h3>本章目标</h3>
          <ul>${c.objectives.map(o => `<li>${o}</li>`).join('')}</ul>
        </div>
      ` : ''}

      ${c.sections.map(sec => `
        <div class="lesson-section">
          <h3>${sec.title}</h3>
          ${sec.keypoints.map(k => `
            <div class="keypoint" style="background:#fef2f2;border-left-color:#dc2626;">
              <b style="color:#dc2626;">${k.title}</b>
              ${k.body}
            </div>`).join('')}
        </div>
      `).join('')}

      ${c.tips ? `
        <div class="lesson-section">
          <div class="tip" style="background:#fff7ed;border-left-color:#f59e0b;"><b style="color:#dc2626;">关键心法：</b>${c.tips}</div>
        </div>
      ` : ''}

      <div class="lesson-section" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
        <button class="btn btn-ghost" id="cpBackBtn">← 返回章节列表</button>
        <button class="btn btn-success" id="cpMarkBtn">${completed ? '✓ 已完成（再次确认）' : '✓ 标记本章完成'}</button>
      </div>

      ${renderNextNav({
        list,
        key: 'id',
        current: c.id,
        theme: '#dc2626',
        labelCurrent: '章',
        labelNext: '下一章',
        labelDone: '已是最后一章'
      })}
    </div>
  `;

  document.getElementById('backBtn').addEventListener('click', () => {
    state.currentCompetition = null;
    render();
  });
  document.getElementById('cpBackBtn').addEventListener('click', () => {
    state.currentCompetition = null;
    render();
  });
  document.getElementById('cpMarkBtn').addEventListener('click', () => {
    if (!state.progress.completedCompetition) state.progress.completedCompetition = {};
    state.progress.completedCompetition[c.id] = { at: Date.now() };
    saveProgress();
    alert(`${c.title} 已标记完成！`);
    state.currentCompetition = null;
    render();
  });
  // next-nav 跳转
  document.querySelectorAll('.next-nav .next-go').forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.dataset.action;
      if (action === 'back') {
        state.currentCompetition = null;
        render();
        return;
      }
      const idx = list.findIndex(x => x.id === state.currentCompetition);
      if (idx >= 0 && idx < list.length - 1) {
        state.currentCompetition = list[idx + 1].id;
        window.scrollTo({ top: 0, behavior: 'smooth' });
        render();
      }
    });
  });
}

// ============ 学习指南 ============
function renderAbout(app) {
  app.innerHTML = `
    <div class="about-page">
      <h2>学习指南：怎样用好这 20 天</h2>

      <h3>🎯 学习目标</h3>
      <p>把一个只有基础 IT 技能的工程师，转化为能独立完成需求调研、解决方案设计、技术宣讲、招投标应答的火山引擎售前工程师。本版相比 15 天速成版，云基础扩到 7 天、每天内容深度翻倍，同时新增"案例剖析"与"常见踩坑"。</p>

      <h3>📅 每日 90-120 分钟怎么用</h3>
      <ul>
        <li><b>0-50 分钟</b>：精读"学习目标"+"知识章节"+"案例剖析"，圈出陌生术语；对照火山引擎官网产品页阅读</li>
        <li><b>50-75 分钟</b>：复述训练——合上页面，把当天章节用自己的话讲一遍；不流畅的地方回看</li>
        <li><b>75-95 分钟</b>：完成"章节小测"（8 题/天），错题查"解析"；3 天累积错题做错题本</li>
        <li><b>95-120 分钟</b>：默写"售前要点"+"常见踩坑"；尝试用售前要点中的话术讲给一个虚构客户</li>
      </ul>

      <h3>🧠 推荐学习方法</h3>
      <ul>
        <li><b>主动复述</b>：每读完一节，合上页面用自己的话复述一次</li>
        <li><b>场景化记忆</b>：每个产品想象 1 个客户场景，"什么样的客户、什么诉求、为什么选它"</li>
        <li><b>累积案例库</b>：随手记下你听到的每一个真实案例（同事、群、媒体），售前讲故事比讲产品有效 10 倍</li>
        <li><b>错题本</b>：综合考试错题反复看 3 次以上</li>
      </ul>

      <h3>🚀 20 天后要达到的标准</h3>
      <ul>
        <li>✅ 能默写出火山引擎 8 大产品族 + 每族的旗舰产品</li>
        <li>✅ 能用 SPIN 提问法主导 1 次客户访谈</li>
        <li>✅ 能用 FFAB 句式介绍任意 3 个核心产品</li>
        <li>✅ 能画 1 张完整的方案架构图</li>
        <li>✅ 能流畅讲 3 个客户成功故事（互联网/金融/汽车）</li>
        <li>✅ 综合考试 ≥ 80 分通过</li>
      </ul>

      <h3>🔗 推荐拓展资源（学习中可对照查阅）</h3>
      <ul>
        <li>火山引擎官网：volcengine.com</li>
        <li>火山引擎产品文档中心（每个产品对应 doc）</li>
        <li>豆包大模型 / 火山方舟体验</li>
        <li>Coze 扣子平台：coze.cn</li>
        <li>飞书知识库 + 字节技术博客（搜索"ByteHouse / DataLeap / 推荐系统"）</li>
      </ul>

      <h3>⚠️ 一个重要心态</h3>
      <p>售前不是讲产品，是<b>"用产品语言把客户的业务问题翻译成解决方案"</b>。功能背后总要回答 3 个问题：客户为什么需要、解决什么问题、能赚到/省到多少。带着这个意识完成 20 天，你的成长会远超只背产品手册。</p>
    </div>
  `;
}

// ============ 工具 ============
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[c]);
}

// ============ 启动 ============
render();

// 暴露 state 给 ai-chat.js 取当前章节上下文
window.appState = state;
