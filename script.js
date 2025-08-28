// 配置项
const config = {
    // 在此处输入您的GitHub用户名
    githubUsername: "octocat", // 默认使用GitHub官方的octocat账号作为示例
    // 是否使用模拟数据（如果API请求受限）
    useMockData: true
};

// 模拟数据 - 当API请求失败或选择使用模拟数据时使用
const mockData = {
    user: {
        login: "octocat",
        name: "The Octocat",
        bio: "GitHub mascot and icon",
        avatar_url: "https://avatars.githubusercontent.com/u/583231?v=4",
        html_url: "https://github.com/octocat",
        public_repos: 8,
        followers: 8800,
        following: 9
    },
    repos: [
        {
            name: "hello-world",
            description: "My first repository on GitHub",
            html_url: "https://github.com/octocat/hello-world",
            language: "Python",
            stargazers_count: 1500,
            forks_count: 2300
        },
        {
            name: "Spoon-Knife",
            description: "This is a test repository for GitHub's features",
            html_url: "https://github.com/octocat/Spoon-Knife",
            language: "HTML",
            stargazers_count: 900,
            forks_count: 1200
        },
        {
            name: "octocat.github.io",
            description: "My personal GitHub Pages website",
            html_url: "https://github.com/octocat/octocat.github.io",
            language: "CSS",
            stargazers_count: 750,
            forks_count: 950
        }
    ]
};

// DOM加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 设置当前年份
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // 获取GitHub数据
    fetchGitHubData();
    
    // 为导航链接添加平滑滚动效果
    setupSmoothScroll();
    
    // 为联系表单添加提交处理
    setupContactForm();
    
    // 添加滚动动画
    setupScrollAnimations();
});

// 获取GitHub数据函数
async function fetchGitHubData() {
    try {
        let userData, reposData;
        
        if (config.useMockData) {
            // 使用模拟数据
            userData = mockData.user;
            reposData = mockData.repos;
        } else {
            // 从GitHub API获取真实数据
            const [userResponse, reposResponse] = await Promise.all([
                fetch(`https://api.github.com/users/${config.githubUsername}`),
                fetch(`https://api.github.com/users/${config.githubUsername}/repos?sort=updated&per_page=6`)
            ]);
            
            if (!userResponse.ok || !reposResponse.ok) {
                throw new Error("GitHub API 请求失败");
            }
            
            userData = await userResponse.json();
            reposData = await reposResponse.json();
        }
        
        // 渲染用户信息
        renderUserData(userData);
        
        // 渲染仓库信息
        renderReposData(reposData);
        
    } catch (error) {
        console.error("获取GitHub数据失败:", error);
        
        // 显示错误信息并使用模拟数据
        alert("获取GitHub数据失败，将使用示例数据。\n您可以修改 script.js 中的配置项来使用自己的GitHub用户名。");
        
        // 回退到模拟数据
        renderUserData(mockData.user);
        renderReposData(mockData.repos);
    }
}

// 渲染用户信息
function renderUserData(user) {
    // 设置头像
    const avatarElement = document.getElementById('github-avatar');
    avatarElement.src = user.avatar_url;
    avatarElement.alt = `${user.name || user.login} 的GitHub头像`;
    
    // 设置用户名
    document.getElementById('username').textContent = user.name || user.login;
    
    // 设置简介
    document.getElementById('bio').textContent = user.bio || '暂无简介';
    
    // 设置统计数据
    document.getElementById('repo-count').textContent = user.public_repos || 0;
    document.getElementById('follower-count').textContent = user.followers || 0;
    document.getElementById('following-count').textContent = user.following || 0;
    
    // 设置社交链接
    const githubLink = document.querySelector('.social-links a:first-child');
    githubLink.href = user.html_url || `https://github.com/${user.login}`;
    
    // 设置页脚社交链接
    const footerGithubLink = document.querySelector('footer .social-icons a:first-child');
    footerGithubLink.href = user.html_url || `https://github.com/${user.login}`;
}

// 渲染仓库数据
function renderReposData(repos) {
    const projectsContainer = document.getElementById('projects-container');
    
    // 清空容器
    projectsContainer.innerHTML = '';
    
    // 遍历仓库数据并创建项目卡片
    repos.forEach(repo => {
        const projectCard = document.createElement('div');
        projectCard.className = 'col-md-4 col-sm-6 fade-in';
        projectCard.innerHTML = `
            <div class="project-card h-100">
                <div class="project-img" style="background-color: #f8f9fa;">
                    <div class="d-flex align-items-center justify-content-center h-100">
                        <i class="fa fa-code fa-4x text-primary opacity-50"></i>
                    </div>
                </div>
                <div class="project-content">
                    <h3>${repo.name}</h3>
                    <p>${repo.description || '暂无描述'}</p>
                    <div class="d-flex justify-content-between items-center mb-3">
                        <span class="badge bg-primary">${repo.language || 'Unknown'}</span>
                        <div class="d-flex items-center gap-2">
                            <span class="text-muted"><i class="fa fa-star"></i> ${repo.stargazers_count || 0}</span>
                            <span class="text-muted"><i class="fa fa-code-fork"></i> ${repo.forks_count || 0}</span>
                        </div>
                    </div>
                    <div class="project-links">
                        <a href="${repo.html_url}" target="_blank">查看项目</a>
                        <a href="${repo.html_url}/archive/refs/heads/main.zip" target="_blank">下载</a>
                    </div>
                </div>
            </div>
        `;
        
        projectsContainer.appendChild(projectCard);
    });
}

// 设置平滑滚动
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // 减去导航栏高度
                    behavior: 'smooth'
                });
                
                // 关闭移动设备上的导航菜单
                const navbarToggler = document.querySelector('.navbar-toggler');
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            }
        });
    });
}

// 设置联系表单处理
function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 简单的表单验证
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !message) {
                alert('请填写完整信息');
                return;
            }
            
            // 这里是表单提交逻辑，实际项目中可以发送到后端API
            // 现在只做简单的提示
            alert('感谢您的留言！这是一个示例网站，表单暂未连接到后端服务器。');
            
            // 重置表单
            contactForm.reset();
        });
    }
}

// 设置滚动动画
function setupScrollAnimations() {
    // 监听滚动事件
    window.addEventListener('scroll', function() {
        const fadeElements = document.querySelectorAll('.fade-in');
        
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            // 当元素进入视口时添加动画类
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    });
    
    // 初始化动画状态
    document.querySelectorAll('.fade-in').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    });
    
    // 触发一次滚动事件以初始化可见元素
    setTimeout(() => {
        window.dispatchEvent(new Event('scroll'));
    }, 100);
}

// 添加一个配置面板，让用户可以轻松修改GitHub用户名
function addConfigPanel() {
    // 创建配置面板元素
    const configPanel = document.createElement('div');
    configPanel.className = 'fixed-bottom right-4 mb-4 bg-white p-3 rounded-lg shadow-lg z-50';
    configPanel.innerHTML = `
        <h4 class="text-sm font-bold mb-2">配置</h4>
        <div class="form-group mb-2">
            <label class="text-xs block mb-1">GitHub 用户名:</label>
            <input type="text" id="github-username-input" class="form-control text-sm" value="${config.githubUsername}">
        </div>
        <button id="apply-config" class="btn btn-primary btn-sm w-100">应用</button>
    `;
    
    // 添加到页面
    document.body.appendChild(configPanel);
    
    // 为应用按钮添加点击事件
    document.getElementById('apply-config').addEventListener('click', function() {
        const usernameInput = document.getElementById('github-username-input');
        const newUsername = usernameInput.value.trim();
        
        if (newUsername) {
            config.githubUsername = newUsername;
            config.useMockData = false; // 尝试获取真实数据
            
            // 显示加载提示
            alert('正在获取GitHub数据，请稍候...');
            
            // 重新获取数据
            fetchGitHubData();
        } else {
            alert('请输入有效的GitHub用户名');
        }
    });
}

// 在页面加载完成后延迟添加配置面板
setTimeout(addConfigPanel, 1000);