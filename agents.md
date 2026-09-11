大把的html是正常的，不要一遇到事情就是mermaid本地化

## 博客维护规则（必须遵守）

1. **每篇文章必须记录发布时间**：新文章入库时在首页对应专区列表标注发布日期（YYYY-MM-DD），专区列表按发布时间倒序（新的在前）。
2. **首页轮播（carousel）固定 5 张**：取发布时间最新的 5 篇文章，最新的一篇放第一位；新文章发布后必须同步更新轮播，不能只加专区列表。
3. **新文章发布流程**：文章 HTML 放对应专区目录（学习html/实验html/模型html）→ 首页专区列表加条目（带日期）→ 更新轮播（如进入最新5篇）→ 同步更新 metrics 数字 → 推 Gitee master 触发部署。
4. **提交规则**：统一推 Gitee（conanfans/blog）的 master 分支触发 ESA 部署，GitHub（ThinkInFuture/blog）main 同步备份。
5. **代码块和图**：页面里放 shell/代码要用 HTML 转义；mermaid 节点文本必须用双引号包裹，特殊字符才不会被解析截断。

## 部署通道技巧（重要）

- **ESA 只监听 Gitee 的 master 分支**（conanfans/blog，默认分支必须是 master）：推送命令 `git push gitee main:master`。推 main 分支不会触发部署，这是踩过的坑。
- **GitHub 443 经常被墙，api.github.com 基本一直通**：git push 失败时改用 GitHub Contents API 补推——`PUT /repos/{owner}/{repo}/contents/{path}`，body 传 base64 内容 + 原文件 sha（GET 先查），二进制文件同样适用。API 上传会自动在默认分支生成 commit，与 git push 等效。
- GitHub API 上传与本地 git 历史会分叉（文件内容一致），后续 git push 前先 `git fetch` 对齐，必要时本地 reset。

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
