#!/bin/bash
# 一键推送所有 migrations + seeds 到生产 Supabase
# 用法: ./scripts/seed-production.sh
# 首次使用需要: chmod +x scripts/seed-production.sh

set -e

DIR="$(cd "$(dirname "$0")/.." && pwd)"

# ── 连接字符串 ──
if [ -z "$DATABASE_URL" ]; then
  echo "🔐 请输入 Supabase Session Pooler 连接字符串："
  echo "   (格式: postgresql://postgres.xxx:密码@aws-xxx.pooler.supabase.com:5432/postgres)"
  read -r DATABASE_URL
fi

echo ""
echo "🔍 测试连接..."
if ! psql "$DATABASE_URL" -c "SELECT 1;" > /dev/null 2>&1; then
  echo "❌ 连接失败，请检查连接字符串"
  exit 1
fi
echo "✅ 连接成功"

# ── Migrations（按顺序，幂等） ──
echo ""
echo "📦 执行 migrations..."
for f in "$DIR"/supabase/migrations/*.sql; do
  fname=$(basename "$f")
  echo "   ▸ $fname"
  psql "$DATABASE_URL" -f "$f" -q 2>&1 | grep -v "^$" | head -3 || true
done
echo "✅ Migrations 完成"

# ── Seeds（按顺序） ──
echo ""
echo "🌱 执行 seeds..."
for f in "$DIR"/supabase/seed/*.sql; do
  fname=$(basename "$f")
  echo "   ▸ $fname"
  result=$(psql "$DATABASE_URL" -f "$f" 2>&1)
  inserts=$(echo "$result" | grep -c "INSERT 0 1" || true)
  errors=$(echo "$result" | grep -ci "error" || true)
  if [ "$errors" -gt 0 ]; then
    echo "     ⚠️  有错误，详情："
    echo "$result" | grep -i "error" | head -5
  else
    echo "     ✅ $inserts 条记录"
  fi
done

# ── 验证 ──
echo ""
echo "📊 验证数据..."
psql "$DATABASE_URL" -c "
  SELECT
    (SELECT COUNT(*) FROM schools) AS schools,
    (SELECT COUNT(*) FROM vacancies) AS vacancies,
    (SELECT COUNT(*) FROM schools WHERE session_type IS NOT NULL) AS has_session,
    (SELECT COUNT(*) FROM schools WHERE latitude IS NOT NULL) AS has_geo;
"

echo ""
echo "🎉 全部完成！"
