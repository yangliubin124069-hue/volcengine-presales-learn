# 🚀 部署到 GitHub Pages 的具体步骤（针对你的环境）

## 📊 当前状态（已完成）

✅ 本地 Git 仓库已初始化（`E:/ai/claude/火山引擎学习/.git`）
✅ 首次 commit 已完成（hash: `a365f95`）
✅ 分支：`main`（默认）
✅ 提交人身份（仅本仓库）：
   - email: `yangliubin124069@gmail.com`
   - name: `Yangwu Liu`

> 💡 如果你**不希望邮箱在公开仓库里被搜到**，可以改用 GitHub 提供的 noreply 邮箱（建好仓库后再改也行，见末尾的"邮箱隐私"段落）。

---

## ⚙️ 你需要做的事（10-20 分钟）

### 步骤 1 · 注册 GitHub 账号（已有可跳过）

打开 https://github.com → 右上 **Sign up**
- 用户名建议起个**短英文**（后面会出现在你的应用 URL 里）
- 邮箱用什么都行（创建仓库时还能改）

### 步骤 2 · 创建仓库

1. 登录后点右上角 **+ → New repository**
2. 填写：
   - **Repository name**：`volcengine-presales-learn`（建议这个，简短易记）
   - **Description**：`火山引擎售前 20 天学习 PWA`（可选）
   - **Public** ✅（必须公开，免费版 Pages 才能用）
   - **Add a README** ❌ **不要勾**（你本地已经有内容，勾了会冲突）
   - **.gitignore / license** 都不要勾
3. 点 **Create repository**

创建后会跳到一个空白仓库页面，**保持这个页面打开**，下面要复制 URL。

### 步骤 3 · 上传代码（二选一）

#### 方式 A · 命令行 Push（推荐，3 行命令搞定）

GitHub 仓库页面的灰色提示框里有个类似这样的 URL：

```
https://github.com/<你的用户名>/volcengine-presales-learn.git
```

打开 **Git Bash**（开始菜单搜索）或 **PowerShell**，复制下面三行替换 `<你的用户名>`：

```bash
cd "E:/ai/claude/火山引擎学习"
git remote add origin https://github.com/<你的用户名>/volcengine-presales-learn.git
git push -u origin main
```

第一次 push 会弹出登录窗口：
- **首选**：浏览器自动登录（GitHub Desktop / Git Credential Manager）
- **若让你输入密码**：
  - 别输 GitHub 密码（早就废了）
  - 去 https://github.com/settings/tokens → Generate new token (classic) → 勾 `repo` → Generate
  - 把生成的 token（`ghp_xxxx...`）粘贴进密码框

push 完成后命令行会显示 `Branch 'main' set up to track 'origin/main'`。刷新 GitHub 仓库页面就能看到所有文件。

#### 方式 B · 网页拖拽上传（不用命令行，但有点繁琐）

1. GitHub 仓库页面点 **uploading an existing file**（在灰色提示框里）
2. 把 `E:/ai/claude/火山引擎学习/` 里**除了 `_work` 和 `.git` 之外**的所有内容拖进去
   - 注意：要打开"显示隐藏文件"才能看到 `.gitignore`
3. 拖完之后填 commit message（随便写）→ **Commit changes**

> ⚠️ 拖拽方式有时会丢中文文件名编码，**优先用方式 A**。

### 步骤 4 · 启用 GitHub Pages

回到仓库主页：
1. 点 **Settings**（仓库导航最右）
2. 左边栏拉到 **Pages**
3. **Source** 选 `Deploy from a branch`
4. **Branch** 选 `main` + `/ (root)` → **Save**
5. 等 1-2 分钟，页面顶部会出现绿色对勾 + 你的应用网址：
   ```
   https://<你的用户名>.github.io/volcengine-presales-learn/
   ```

### 步骤 5 · 手机访问 + 安装

1. 用**华为浏览器** 或 **Chrome** 打开上面那个 URL
2. 浏览器底部/顶部弹出 **"安装应用"** 提示，点同意
3. 没自动弹？菜单 → "添加到主屏幕" / "安装"
4. 桌面出现蓝紫渐变 **VE** 图标
5. 点开就是**全屏无浏览器条**的应用
6. **长按图标**会看到 3 个快捷方式：仪表盘 / 竞品分析 / 面试培训

✅ 第一次访问后 Service Worker 会缓存所有资源，**之后断网也能学**。

---

## 🔄 后续怎么更新内容

每次想改内容（比如新增一章、修复 bug）：

```bash
cd "E:/ai/claude/火山引擎学习"
# 改完文件后
git add -A
git commit -m "你的改动说明"
git push
```

push 之后约 1 分钟，GitHub Pages 会自动重新部署。手机端 PWA 启动时 Service Worker 会后台拉新版本，**完全关闭并重启 App** 就能看到新内容。

如果想强制刷新看新版：浏览器里访问 URL → 长按刷新按钮 / 设置里清除站点数据。

---

## 🔒 邮箱隐私（如果你担心邮箱被搜到）

GitHub 公开仓库的 commit 历史会暴露提交人邮箱。如果想隐藏：

1. 去 https://github.com/settings/emails
2. 勾 **Keep my email addresses private** + **Block command line pushes that expose my email**
3. 复制页面上提示的 noreply 邮箱（类似 `12345678+你的用户名@users.noreply.github.com`）
4. 改本地 git 配置：

```bash
cd "E:/ai/claude/火山引擎学习"
git config --local user.email "12345678+你的用户名@users.noreply.github.com"
```

> 注意：这只对**之后**的提交生效；已经 push 的 commit 还会显示原邮箱。如果非常在意，可以在创建仓库前先做这步，或者用 `git filter-repo` 重写历史（进阶）。

---

## 🆘 常见问题

**Q：push 时提示 `support for password authentication was removed`？**
A：必须用 Personal Access Token 替代密码，看上面方式 A 的提示。

**Q：push 时提示 `error: failed to push some refs`？**
A：仓库不是空的（你创建仓库时不小心勾了 README）。两种处理：
- 删了仓库重新建（不勾 README）
- 或先 `git pull origin main --rebase` 再 push

**Q：Settings 里没有 Pages 选项？**
A：仓库必须是 Public 才有；私有仓库要 Pro 账号。

**Q：访问 Pages URL 报 404？**
A：等 1-2 分钟自动构建。还不行：Settings → Pages 看 build 状态。

**Q：访问能打开但图标/CSS 没加载？**
A：URL 末尾必须有斜杠：`/volcengine-presales-learn/`，不是 `/volcengine-presales-learn`。

**Q：手机访问没出现"安装应用"提示？**
A：① 确认是 HTTPS（GitHub Pages 默认 HTTPS）② 在浏览器菜单里手动选"添加到主屏幕"。

---

## 📌 总结：你现在的下一步

只剩 4 件事：

1. **去 GitHub 创建仓库**（5 分钟）
2. **复制 3 行 git 命令到本地终端跑**（2 分钟）
3. **Settings → Pages → main 分支 → Save**（1 分钟，等部署 1 分钟）
4. **手机访问 URL 添加到主屏幕**（1 分钟）

完成后可以告诉我你的 GitHub 用户名 / 仓库 URL，我可以帮你检查部署有没有问题、要不要补什么内容。
