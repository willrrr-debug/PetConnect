#!/bin/bash

echo "🚀 一键启动 PetConnect 管理后台"
echo ""

# 进入项目目录
cd "$(dirname "$0")"

# 1. 检查并安装后端依赖
echo "📦 检查后端依赖..."
if ! python3 -c "import fastapi" 2>/dev/null; then
    echo "安装后端依赖..."
    python3 -m pip install --user fastapi uvicorn python-dotenv supabase boto3 python-multipart
fi

# 2. 检查并安装前端依赖
echo "📦 检查前端依赖..."
cd admin-portal
if [ ! -d "node_modules" ]; then
    echo "安装前端依赖..."
    npm install
fi
cd ..

# 3. 检查配置
echo "⚙️  检查配置..."
if ! grep -q "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9" admin-backend/.env 2>/dev/null; then
    echo ""
    echo "⚠️  首次使用需要配置 Supabase Service Key："
    echo ""
    echo "1. 访问: https://supabase.com/dashboard"
    echo "2. 选择项目 > Settings > API"
    echo "3. 复制 'service_role' 的 secret key"
    echo "4. 粘贴到下面："
    echo ""
    read -p "请粘贴 Service Key: " SERVICE_KEY
    
    # 创建 .env 文件
    cat > admin-backend/.env << EOF
SUPABASE_URL=https://amaszxsqfbaesoogvxmr.supabase.co
SUPABASE_SERVICE_KEY=$SERVICE_KEY
PORT=8000
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
EOF
    
    echo "✅ 配置已保存"
fi

echo ""
echo "🎯 启动服务..."
echo ""

# 4. 后台启动后端
cd admin-backend
python3 main.py > /tmp/petconnect-backend.log 2>&1 &
BACKEND_PID=$!
cd ..

# 等待后端启动
sleep 2

# 5. 启动前端
cd admin-portal
npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo "✅ 启动成功！"
echo ""
echo "🌐 管理后台: http://localhost:5173"
echo "📚 API文档: http://localhost:8000/docs"
echo ""
echo "💡 提示: 按 Ctrl+C 停止服务"
echo ""

# 等待用户中断
trap "echo ''; echo '停止服务...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT TERM
wait
