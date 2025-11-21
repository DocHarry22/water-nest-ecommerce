# Script to update Vercel environment variables
# Run this script to update all critical environment variables in Vercel

Write-Host "Updating Vercel Environment Variables..." -ForegroundColor Cyan

# Update NEXTAUTH_SECRET
Write-Host "`nUpdating NEXTAUTH_SECRET..." -ForegroundColor Yellow
$env:NEXTAUTH_SECRET = "R38gltsYpHE6DX0vTSJoicZABVkmOLnN"
echo $env:NEXTAUTH_SECRET | vercel env add NEXTAUTH_SECRET production --force

# Update DATABASE_URL
Write-Host "`nUpdating DATABASE_URL..." -ForegroundColor Yellow
$env:DATABASE_URL = "postgresql://postgres.rgfloeshqjbjfdarwdxn:XXAMXzUXKAIUVY40@aws-1-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
echo $env:DATABASE_URL | vercel env add DATABASE_URL production --force

# Update DIRECT_URL
Write-Host "`nUpdating DIRECT_URL..." -ForegroundColor Yellow
$env:DIRECT_URL = "postgresql://postgres:XXAMXzUXKAIUVY40@db.rgfloeshqjbjfdarwdxn.supabase.co:5432/postgres"
echo $env:DIRECT_URL | vercel env add DIRECT_URL production --force

Write-Host "`nAll environment variables updated successfully!" -ForegroundColor Green
Write-Host "Triggering new deployment..." -ForegroundColor Cyan

# Trigger new deployment
vercel --prod --yes

Write-Host "`nDeployment triggered! Check https://vercel.com/docharry22s-projects/water-nest-ecommerce" -ForegroundColor Green
