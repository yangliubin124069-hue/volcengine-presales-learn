// Service Worker · 火山引擎售前学习 PWA
// 策略：静态资源 cache-first；HTML 走 network-first（保证更新可见），离线回退 cache。
// 升级方式：改下面的 CACHE_VERSION，SW 自动清旧 cache。
const CACHE_VERSION = 'volcengine-presales-v24';
const RUNTIME_CACHE = 'volcengine-presales-runtime';

// 预缓存清单：首次安装即下载，离线立刻可用
const PRECACHE_URLS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './styles/main.css?v=24',
  './scripts/data.js?v=24',
  './scripts/quiz-data.js?v=24',
  './scripts/competition-data.js?v=24',
  './scripts/glossary.js?v=24',
  './scripts/app.js?v=24',
  './scripts/ai-chat.js?v=24',
  './lessons/_player.css?v=24',
  './lessons/_player.js?v=24',
  './lessons/day1-video.html?v=24',
  './lessons/day2-video.html?v=24',
  './lessons/day3-video.html?v=24',
  './lessons/day4-video.html?v=24',
  './lessons/day5-video.html?v=24',
  './lessons/day6-video.html?v=24',
  './lessons/day7-video.html?v=24',
  './lessons/day8-video.html?v=24',
  './lessons/day9-video.html?v=24',
  './lessons/day10-video.html?v=24',
  './lessons/day11-video.html?v=24',
  './lessons/day12-video.html?v=24',
  './lessons/day13-video.html?v=24',
  './lessons/day14-video.html?v=24',
  './lessons/day17-video.html?v=24',
  './lessons/comp03-video.html?v=24',
  './icons/icon-96.png',
  './icons/icon-144.png',
  './icons/icon-180.png',
  './icons/icon-192.png',
  './icons/icon-384.png',
  './icons/icon-512.png',
  './icons/icon-maskable-192.png',
  './icons/icon-maskable-512.png',
];

// ===== 安装：预缓存关键资源 =====
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())  // 立即激活新版本
  );
});

// ===== 激活：清理旧版本缓存 =====
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => k !== CACHE_VERSION && k !== RUNTIME_CACHE)
          .map((k) => caches.delete(k))
      )
    ).then(() => self.clients.claim())  // 接管所有打开的页面
  );
});

// ===== 拦截 fetch =====
self.addEventListener('fetch', (event) => {
  const req = event.request;
  // 仅处理同源 GET，跳过 chrome-extension/data/blob 等
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // HTML 文档：network-first（保证用户拿到最新版）
  if (req.mode === 'navigate' || req.destination === 'document') {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const clone = res.clone();
          caches.open(RUNTIME_CACHE).then((c) => c.put(req, clone));
          return res;
        })
        .catch(() => caches.match(req).then((m) => m || caches.match('./index.html')))
    );
    return;
  }

  // 静态资源：cache-first
  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req).then((res) => {
        // 只缓存正常 200 响应
        if (res && res.status === 200) {
          const clone = res.clone();
          caches.open(RUNTIME_CACHE).then((c) => c.put(req, clone));
        }
        return res;
      }).catch(() => cached); // 离线降级
    })
  );
});

// 收到主线程消息可强制更新
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
