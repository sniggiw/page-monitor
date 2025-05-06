# Page Monitor - 网页内容监控 Chrome 插件

-   Page Monitor 是一个用于监控网页特定元素内容或数值变化的 Chrome 插件。通过可视化界面选择要监控的元素，生成 XPath 路径，实现对网页内容的自动追踪和监控。

## 📋 功能特性

-   🔍 可视化元素选择 - 直观地选择要监控的页面元素
-   📊 多类型监控 - 支持内容监控和价格监控两种模式
-   🔄 XPath 路径生成 - 自动生成精确的 XPath 路径
-   💼 自定义配置 - 灵活设置监控名称、URL 和类型
-   🚀 Vue3 前端集成 - 简洁易用的配置管理界面
-   🔧 技术栈
    -   Chrome Extension API (Manifest V3)
    -   JavaScript / TypeScript
    -   Vue 3 + Composition API
    -   Element Plus UI 框架
    -   CustomEvent 通信机制

## ⚙️ 安装指南

### 注意点

-   开发时使用的 node 版本为 v18.18.0，如果安装依赖不成功，可以尝试切换 node 版本再次尝试；

### 插件安装

1. 克隆仓库到本地

```bash
git clone https://github.com/sniggiw/page-monitor.git
```

2. 在 Chrome 浏览器中打开扩展程序页面

```text
chrome://extensions/
```

3. 开启开发者模式
4. 点击"加载已解压的扩展程序"，选择仓库中的 plugin 目录

### 前端应用运行

1. 进入 demo-using 目录

```bash
cd demo-using
```

2. 安装依赖

```bash
pnpm install
```

3. 运行开发服务器

```bash
pnpm run dev
```

## 📝 使用指南

1. 在前端页面填写监控配置

    - 监控名称
    - 监控 URL
    - 监控类型（内容/价格）

2. 点击"立即监控"按钮
3. 在新打开的页面中，选择要监控的元素
    - 内容监控：可选择多个元素
    - 价格监控：只能选择一个元素
4. 点击"保存监控任务"按钮
5. 返回前端页面，查看获取到的 XPath 路径

## 🔍 项目结构

```text
|- plugin/                    # Chrome插件部分
|  |- manifest.json           # 插件配置
|  |- content/                # 内容脚本
|  |  |- index.js             # 内容脚本主入口
|  |  |- monitor/             # 监控模块
|  |     |- monitor.js        # 监控核心类
|  |     |- monitor.css       # 监控样式
|  |- background/             # 后台脚本
|     |- index.js             # 后台脚本主入口
|
|- demo-using/                # 前端应用部分
   |- src/
      |- App.vue              # 应用入口
      |- components/          # 组件
      |  |- demo-using.vue    # 主界面组件
      |- composables/         # 组合式API
         |- useCustomEvent.ts # 通信工具
```

## 🔌 核心工作流程

-   配置阶段：用户配置监控参数
-   触发监控：发送消息到 Chrome 插件
-   打开页面：插件在新标签页打开目标 URL
-   元素选择：用户选择要监控的元素
-   保存数据：生成 XPath 路径并返回
-   结果展示：前端展示获取到的 XPath 数据

## 📚 关键代码示例

### 前端与插件通信

```js
// useCustomEvent.ts
export default () => {
    const EventFromWebPage = "EventFromWebPage";
    const EventFromChrome = "EventFromChrome";

    const sendMessageToExtend = (params: object) => {
        const eventFromWeb = new CustomEvent(EventFromWebPage, {
            detail: params,
        });
        document.dispatchEvent(eventFromWeb);
    };

    const onMessageExtend = (cb: Function) => {
        document.addEventListener(EventFromChrome, (e) => cb(e));
    };

    return { sendMessageToExtend, onMessageExtend };
};
```

### XPath 路径生成

```js
getXPath(element) {
  if (element === document.body) return element.tagName.toLowerCase()

  let ix = 0
  const siblings = element.parentNode.childNodes

  for (let i = 0; i < siblings.length; i++) {
    const sibling = siblings[i]

    if (sibling.nodeType === 1 && sibling.tagName === element.tagName) ix++

    if (sibling === element) {
      return this.getXPath(element.parentNode) +
             '/' +
             element.tagName.toLowerCase() +
             '[' + (ix + 1) + ']'
    }
  }
}
```

## 🛠️ 开发指南

### 添加新的监控类型

1. 修改前端配置表单，添加新的监控类型选项
2. 在 monitor.js 中的 initSelectPanel 方法中添加相应的处理逻辑
3. 根据需要修改元素选择行为和样式

## 🐱 样式隔离方案

-   使用命名空间

```css
.monitor_panel,
.monitor_btn {
    /* styles */
}
```

-   使用 Shadow DOM

```js
const shadow = element.attachShadow({ mode: "open" });
const style = document.createElement("style");
shadow.appendChild(style);
```

## 🔗 相关链接

-   Chrome 插件开发文档
-   Vue 3 文档
-   Element Plus 文档

## 👨‍💻 贡献指南

欢迎提交 Issue 和 Pull Request，共同改进这个项目！
