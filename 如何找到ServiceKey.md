# 如何找到 Supabase Service Key

## Service Key 长什么样？

Service Key 是一个很长的字符串，大概长这样：

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFtYXN6eHNxZmJhZXNvb2d2eG1yIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5ODc1ODIwNywiZXhwIjoyMDE0MzM0MjA3fQ.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**特征：**
- 以 `eyJ` 开头
- 非常长（200+ 字符）
- 包含很多随机字母和数字
- 有两个点号 `.` 分隔成三部分

## 详细步骤

### 第1步：打开 Supabase 控制台

浏览器访问：https://supabase.com/dashboard

### 第2步：选择你的项目

点击你的项目名称进入

### 第3步：进入 Settings

在左侧菜单栏最下方，点击 **Settings**（齿轮图标）

### 第4步：点击 API

在 Settings 子菜单中，点击 **API**

### 第5步：找到 Project API keys

向下滚动页面，找到 **Project API keys** 部分

你会看到两个 key：

1. **anon public** ❌ 不是这个！
2. **service_role** ✅ 就是这个！

### 第6步：复制 service_role

点击 `service_role` 右边的 **复制按钮** 或者 **显示按钮**，然后全选复制

## 快速对比

```
✅ 正确的 Service Key:
service_role: eyJhbGciOiJIUz...(很长一串)

❌ 错误的（这是 anon key）:
anon: eyJhbGciOiJIUzI1NiI...(相对较短)
```

## 你已经有了！

其实你的 `.env.local` 文件里已经有 `VITE_SUPABASE_ANON_KEY`

但管理后台需要的是 **Service Key**，它有更高的权限。

在 Supabase 控制台，Service Key 会标注为：
- `service_role`
- `secret` 
- 可能有警告⚠️图标，提示这是私密密钥

复制后粘贴到终端即可！
