#!/bin/bash

# PetConnect 管理后台启动脚本

echo "🚀 正在启动 PetConnect 管理后台..."

# 检查 node_modules 是否存在
if [ ! -d "pc-admin/node_modules" ]; then
    echo "📦 正在安装依赖..."
    cd pc-admin && npm install
    cd ..
fi

# 检查 .env 是否存在
if [ ! -f "pc-admin/.env" ]; then
    echo "⚠️  未发现 .env 文件，正在从模板创建..."
    echo "VITE_SUPABASE_URL=https://amaszxsqfbaesoogvxmr.supabase.co" > pc-admin/.env
    echo "VITE_SUPABASE_ANON_KEY=sb_publishable_dQ3BMCCRdSpxTSshkkBPoA_oR1Itv9D" >> pc-admin/.env
    echo "VITE_SUPABASE_SERVICE_ROLE_KEY=" >> pc-admin/.env
    echo "R2_ACCESS_KEY_ID=" >> pc-admin/.env
    echo "R2_SECRET_ACCESS_KEY=" >> pc-admin/.env
    echo "R2_BUCKET_NAME=" >> pc-admin/.env
    echo "R2_ACCOUNT_ID=" >> pc-admin/.env
    echo "R2_PUBLIC_URL=" >> pc-admin/.env
fi

echo "✨ 启动 Vite 开发服务器..."
cd pc-admin && npm run dev
