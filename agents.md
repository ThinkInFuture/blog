大把的html是正常的，不要一遇到事情就是mermaid本地化

## 博客维护规则（必须遵守）

1. **每篇文章必须记录发布时间**：新文章入库时在首页对应专区列表标注发布日期（YYYY-MM-DD），专区列表按发布时间倒序（新的在前）。
2. **首页轮播（carousel）固定 5 张**：取发布时间最新的 5 篇文章，最新的一篇放第一位；新文章发布后必须同步更新轮播，不能只加专区列表。**例外（2026-10-21 立）**：「DeepSeek 推理」（dsinfer）专题的文章只进专区列表，不上轮播 banner（用户点名）；同此前的「灵魂拷问」专题一样处理。
3. **新文章发布流程**：文章 HTML 放对应专区目录（学习html/实验html/模型html）→ 首页专区列表加条目（带日期）→ 更新轮播（如进入最新5篇）→ 同步更新 metrics 数字 → 推 Gitee master 触发部署。
4. **提交规则**：统一推 Gitee（conanfans/blog）的 master 分支触发 ESA 部署，GitHub（ThinkInFuture/blog）main 同步备份。
6. **灵魂拷问（学习专区的专题 chip，不是独立版块/板块）**：放项目相关的**拷问式问题**，立意是拓展思维（被人挑战、避免思维局限）。实现方式：学习专区 chips 里加「灵魂拷问」专题（`data-topic="soul"`），拷问内容作为**普通文章条目**进学习列表（带日期、不上轮播 banner），chip 计数随之更新。发布流程：加条目（data-topic="soul"）→ chip 计数 +1 → 推送；跳过轮播步骤。
7. **代码检视（实验专区内板块）**：同一实验反复迭代会触发多次检视。**检视文章标题必须带上时间**（日期 + 轮次，如「Tequila 三值量化训练 · 代码检视 2026-09-19（第 1 轮）」，文件名同带日期与轮次后缀 R1/R2/R3…）。板块条目结构：检视日期为 li-date，标题 tag 里带「日期 · 轮次」。发布流程：改造文章（返回首页/meta/favicon/分享/页脚）→ 加条目到代码检视板块 → 轮播按最新 5 篇规则更新 → metrics 计数 → 推送。
7. **代码块和图**：页面里放 shell/代码要用 HTML 转义；mermaid 节点文本必须用双引号包裹，特殊字符才不会被解析截断。

## 部署通道技巧（重要）

- **一键发布（凡改动必走，零记忆依赖，2026-10-15 立规）**：`python 功能代码/publish_all.py "提交说明" [--new "学习html/新文章.html"]` —— 自动串全链：site_sweep 自检 → dom_fig_audit 体检改动页 → `git add -u`（**仅已跟踪文件，草稿永远上不去**）→ 提交 → 推 gitee main:master → **线上逐 html 与本地整文件字节比对**（轮询至一致，不是抽特征）→ sync_gh → 邮件 + mail/timely 归档；任何一环失败即停并发告警邮件。新文章首次发布用 `--new` 显式点名；无改动时自动空载退出零副作用。禁止再手工分步走发布链（起因：算子地图重画版漏提交部署，线上挂旧图数轮——模板 v3.15 坑 12）。
- **GitHub 固定走 API 补文件（用户拍板的固定策略）**：GitHub main 的 git 历史已与本地分叉，**不要再尝试 `git push origin main`**。凡 GitHub 需要同步的文件，一律用仓库根目录的 `sync_gh.py`：`python sync_gh.py <相对路径1> [路径2...] [-m "说明"]`（Contents API PUT，base64 + sha，二进制通用，自动重试）。Gitee master 仍正常 git push 触发部署。
- GitHub API 上传与本地 git 历史各自独立（文件内容保持一致即可，不追求 commit 历史对齐）。

## mermaid 实战技巧

- mermaid CDN 引用固定版本号（如 `mermaid@11.4.1`），页面加载慢属正常，**不要本地化**。
- subgraph/cluster 标题过长会**被节点框遮挡**（不是裁剪）：方案 = 标题用 `<br/>` 换行拆短 + CSS `svg{overflow:visible}` + `.cluster-label foreignObject{overflow:visible;white-space:nowrap}` + 渲染后 JS 把 `.cluster-label` 的 transform 上移约 30px，同时图容器顶部留 padding≥48px 承接上移的标题。`subGraphTitleMargin` 在 v11.4.1 不生效，别指望。
- flowchart 配置参考（效果好）：`themeVariables` 里 `fontSize:'22px'`、`nodePadding:'14px'`、primaryColor 蓝系；配 CSS `.mermaid svg text{font-size:20px !important}`。
- 判断 mermaid 是否渲染成功：看 `.mermaid` 里有无 `svg` 和 `.node` 数量；svg 内嵌样式含 `.error-icon` 字样属正常，别误判成语法错误。

## 前端与验证技巧

- **Web Share**：手机端分享面板用 `navigator.share`（用户仍需在系统面板里手动点微信，这是无认证网站的上限）；必须加 `matchMedia('(pointer: coarse)')` 限制，否则桌面 Edge/Chrome（Windows 也实现了 share）会弹出没有微信的系统面板。
- **favicon 制作**：SVG 手写（浏览器优先用）+ Python PIL 按同样布局画多尺寸 ico（16/32/48/64）兜底；浅色 logo 必须加浅灰描边，否则浅色标签栏里没边界。预览用内联 SVG/base64 data URI，file:// 跨目录引用会被 Edge 拦。
- **Playwright 截图**：元素级 `locator.screenshot()` 会裁掉溢出内容，验证溢出场景用全页或 `clip` 区域截图。
- **MiniMax 图像理解有幻觉**：读图结论（尤其文字细节）必须用 DOM 实测（`querySelectorAll` 取文本/尺寸）或亲自看图交叉确认，不能只信它。
- **PowerShell 里写 `python -c "..."` 引号转义极易翻车**：复杂逻辑一律写成 .py 脚本文件再执行。
