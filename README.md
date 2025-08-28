# GitHub 个人网页

这是一个美观、现代化的GitHub个人网页模板，能够展示您的GitHub头像、个人信息、项目和技能。这个页面使用纯HTML、CSS和JavaScript构建，无需复杂的构建工具。

## 功能特点

- 📸 **GitHub头像展示** - 自动获取并显示您的GitHub头像
- 📝 **个人信息** - 显示您的用户名、简介和统计数据（仓库数、粉丝数、关注数）
- 📚 **项目展示** - 展示您的GitHub仓库，包括描述、语言、星标数和分叉数
- 🛠️ **技能展示** - 展示您的技术技能水平
- 📱 **响应式设计** - 适配各种屏幕尺寸，从手机到桌面电脑
- ✨ **动画效果** - 平滑滚动、淡入动画等增强用户体验的效果
- 🎨 **现代UI设计** - 使用Bootstrap和自定义CSS构建的美观界面

## 快速开始

1. 克隆或下载本仓库到您的本地计算机

2. 修改`script.js`文件中的GitHub用户名配置：
   ```javascript
   const config = {
       // 在此处输入您的GitHub用户名
       githubUsername: "您的GitHub用户名",
       // 是否使用模拟数据（如果API请求受限）
       useMockData: false
   };
   ```

3. 启动本地服务器来预览页面：
   - 方法1：使用Python（如果已安装）
     ```bash
     python -m http.server 8000
     ```
   - 方法2：使用Node.js的http-server（如果已安装）
     ```bash
     npm install -g http-server
     http-server
     ```
   - 方法3：使用提供的PowerShell脚本（Windows系统）
     ```powershell
     powershell.exe -ExecutionPolicy Bypass -File start-server.ps1
     ```

4. 打开浏览器，访问 `http://localhost:8000` 查看效果

## 自定义选项

### 修改GitHub用户名

您可以通过以下两种方式修改GitHub用户名：

1. 直接编辑`script.js`文件中的`githubUsername`配置项
2. 在页面底部的配置面板中输入新的用户名并点击"应用"按钮

### 自定义样式

- 修改`styles.css`文件来自定义页面的外观和样式
- 您可以更改颜色、字体、布局等各个方面

### 更新技能信息

- 在`index.html`文件中找到技能部分，修改技能名称和百分比
- 示例：
  ```html
  <div class="skill-bar mb-4">
      <div class="skill-info d-flex justify-content-between mb-1">
          <span>JavaScript</span>
          <span>90%</span>
      </div>
      <div class="progress">
          <div class="progress-bar" style="width: 90%" role="progressbar" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"></div>
      </div>
  </div>
  ```

## GitHub API 限制

请注意，GitHub API有请求限制（每小时60个请求），如果超过限制，页面将自动切换到使用模拟数据。如果您需要更多的请求配额，可以考虑使用GitHub API令牌。

## 部署到GitHub Pages

要将这个页面部署到GitHub Pages：

1. 将所有文件提交到您的GitHub仓库
2. 前往仓库的"Settings" > "Pages" > "Build and deployment"
3. 在"Source"下选择"Deploy from a branch"
4. 选择您的主分支（通常是`main`或`master`）
5. 点击"Save"，等待几分钟，GitHub Pages会自动为您部署页面

## 技术栈

- HTML5
- CSS3 (使用Bootstrap 5)
- JavaScript
- Font Awesome 图标

## 许可证

本项目采用MIT许可证 - 查看[LICENSE](LICENSE)文件了解更多详情

## 致谢

- 感谢Bootstrap提供的响应式UI框架
- 感谢Font Awesome提供的图标库
- 感谢GitHub API提供的用户数据

## 注意事项

- 联系表单目前仅作为前端示例，不连接到实际的后端服务
- 如果您想使联系表单功能生效，需要自行添加后端代码来处理表单提交