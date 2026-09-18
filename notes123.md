# Agent 守则（规范+技能）

> 本文件只保留规则；所有代码示例统一放在同级 `examples/` 子目录，使用时按下方索引读取对应文件。
> 若当前机器没有 `examples/`（如仅拷贝了本文件），缺哪个示例直接找用户要，不要凭记忆臆造代码。

## 0. 最高优先级守则

1. **讲中文**：全程使用中文与用户交流。
2. **防挂死**：
   - 长任务（训练/数据生成等）一律 `Start-Process` 后台运行，严禁前台直跑；
   - 检查进度只发轻量命令（`Get-Content -Tail`、`tasklist`），严禁命令里加 `Start-Sleep` 串联；
   - 多个独立检查并行发多个工具调用，不用 `;` 串成长命令。
3. **进展邮件三分类**：任何进展先发邮件，发完邮件再进行下一步；附件名必须英文（否则收不到）。按用途分三类：
   - **及时类（默认）**：操作完成、状态变化、中间结论，正文讲清楚即可，多发勤发，任何进展都发。
     例：服务启动完成、依赖装好、某页截图校验通过——正文一段话说清，不发附件；
   - **评审类**：方案/进展/源码需要其他 AI 审视的 → 汇总为**一个 `.txt` 纯文本附件**（方案+进展+源码全放进去），正文只放摘要。
     例：完成登录接口设计 → 正文写摘要+3 条关键决策，附件 `20260915_150501_login_api_review.txt` 含完整方案与源码；
   - **学习类**：供用户本人学习审视的 → 排版为**一个 `.html` 附件**（卡片式、单列），正文放要点导读。
     例：讲解本次用到的设计模式 → 正文列 3 个要点，附件 `20260915_150501_设计模式讲解.html`；
   - 无论哪类，进展都归档项目 `mail\` 目录（见「邮件规范」），文件名带时间戳；
   - **若发现历史进展不在 `mail\`，及时补归档**，注意别丢东西。
4. **HTML 讲解要求**：多用 mermaid 配合源码/文件结构讲解，浅色背景，mermaid 用 TD 布局，一个图不放多个子图，每个图有编号，字体大小正常。
5. **GPU 环境**：本机已装 CUDA（RTX 4070 Ti SUPER，`torch.cuda.is_available()=True`），训练/推理直接用 GPU，不要退化为 CPU。

## 一、规范要求

### 1. 自验证规范
- 后端验证：调用后端接口后，自行验证返回结果是否正确。
- 前端验证：前端改动后必须截图，并调用大模型图片理解接口（MiniMax）验证截图内容；不正确则重截直至正确。
- 邮件验证：发送前确认邮件内容、收件人及附件（若有）无遗漏、无错误。
- 所有自验证需先输出验证用例（目标/步骤/预期）；用例归档项目 `tests/doc/`，结果归档 `tests/result/`，文件名带时间戳（YYYYMMDD_HHMMSS）。

### 2. 设计规范
- 任何需求（接口调用、爬取、功能开发等）先输出设计文档（目标/思路/步骤/注意事项），归档至项目 `docs/`，命名「特性+时间.md」。

### 3. 执行要求
- 结果不满足预期时：先全面收集信息（错误日志、截图、接口返回），再与用户协同定位根源；不得擅自修改方案逻辑、参数或代码。

### 4. 定时任务规范
- **必须经 bat 文件启动，严禁直接调 python**；bat 内 Python、脚本均用绝对路径，先 `cd /d` 切到脚本目录。
- schtasks 创建必带参数：`/ru "Administrator" /rl highest /it`。
- 脚本**禁止 print**，必须用 logging（含时间、级别、文件名:行号、完整异常栈）。
- 失败排查顺序：脚本日志 → bat 文件内容 → 执行权限参数 → 命令格式。
- 无效任务及时删除（`/f` 强制）；创建/修改/删除操作需记录到设计文档。
- 模板与命令：`examples/scheduler_task_template.bat`、`examples/task_logging_template.py`、`examples/schtasks_commands.md`。

### 5. 前端规范
- 前端开发完成后，必须先执行基础语法检查（HTML/CSS/JS），通过后再截图验证、提交。
- 检查脚本：`examples/frontend_syntax_check.js`（node 运行，按需修改检查目录）。

## 二、核心技能索引

| 技能 | 要点 | 示例文件 |
|------|------|----------|
| 图片理解 | 用 MiniMax-M3 | `examples/minimax_image_understand.py` |
| 秘塔搜索 | 企业信息搜索、文本分析 | `examples/metta_search.py` |
| Playwright 爬取 | 无Cookie优先、带Cookie备用；单次访问停留必须超过30秒；Edge 路径 `C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe` | `examples/playwright_no_cookie.py`（优先）、`examples/playwright_with_cookie.py`（备用，先杀 Edge 进程）、`examples/playwright_popup_check.py`（弹框检测实战） |
| 发送邮件 | SMTP（163），纯文本/HTML/带附件（`html=True` 发 HTML）；附件名必须英文 | `examples/send_email.py` |
| 邮件模板 | HTML 卡片式布局 | `examples/email_template.html` |

### 爬取排错速查
- 浏览器起不来：核对浏览器路径；带Cookie方案确认 Edge 数据目录存在。
- 页面加载超时：加 `timeout=30000` 或 `wait_until='networkidle'`。
- 元素找不到：`page.wait_for_selector('#element-id', timeout=5000)`；带Cookie需先手动登录目标站。
- 截图空白：先 `page.wait_for_timeout(2000)` 再截；停留时间严格超过30秒。
- 被反爬：延长停留、启用 `slow_mo`、加随机停留间隔。

### 邮件规范（必须遵守）
- HTML 美化格式、卡片式布局；**每张卡片只有行、没有列**（一列式布局），禁用多列表格，用行式列表替代。
- 发送前检查清单：① 内容/收件人/附件无遗漏；② HTML 为卡片式布局且无多列表格；③ 编码 UTF-8；④ HTML 正文必须以 text/html 类型发送（`send_email.py` 传 `html=True`），严禁把 HTML 塞进纯文本正文。
- 自动化任务关键结果必须发邮件（爬取完成、分析结果、任务失败告警），确保可追溯、可通知。
- **进展归档**：附件在项目 `mail\` 下按类生成，即发即归档：
  `mail\timely\`（及时类 .md）、`mail\review\`（评审类 .txt）、`mail\learn\`（学习类 .html）；
  命名 `YYYYMMDD_HHMMSS_主题.扩展名`，如 `20260915_150501_登录接口评审.txt`；目录不存在自动创建。
- **历史补归档**：若发现历史进展不在 `mail\`（如散落在 `output\`、`tests\result\` 的旧报告），及时按三类复制进对应目录，不等提醒；
  只复制不移动，时间戳取原文件修改时间，保证原文件一个不少。
  例：`output\homework_checklist_20260914.png` → `mail\timely\20260914_181000_作业清单.png`。



mermaid文字框里换行被上面框挡住解决经验：
标题被节点挡：mermaid 渲染完，JS 把每个分组框标题（.cluster-label）整体上移 30px，抬到 cluster 框顶边之上
上移后被裁：SVG 默认裁掉画布外内容，加了 svg { overflow: visible }，同时图容器顶部 padding 从 19px 加到 48px，给标题留出落点