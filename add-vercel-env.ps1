# Add all environment variables to Vercel
# Run this after deployment completes: .\add-vercel-env.ps1

$envVars = @{
    "DATABASE_URL" = "postgresql://postgres.rgfloeshqjbjfdarwdxn:XXAMXzUXKAIUVY40@aws-1-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=10"
    "DIRECT_URL" = "postgresql://postgres.rgfloeshqjbjfdarwdxn:XXAMXzUXKAIUVY40@aws-1-eu-west-1.pooler.supabase.com:5432/postgres?connect_timeout=30"
    "NEXTAUTH_SECRET" = "development-secret-change-in-production"
    "NEXT_PUBLIC_STACK_PROJECT_ID" = "befb86d9-9387-4a49-8ee2-a1671d985fb6"
    "NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY" = "pck_ydzc1h3h1w4280h521z3ytdq1613k2fb4bh1cz24xm3e8"
    "STACK_SECRET_SERVER_KEY" = "ssk_srvh1q6wr1wr2970g20k0g8g4fj8q4dm36ebs2byab1s0"
    "NEXT_PUBLIC_APP_NAME" = "Water Nest"
}

foreach ($key in $envVars.Keys) {
    Write-Host "Adding $key to Vercel..." -ForegroundColor Cyan
    vercel env add $key production --force
    $envVars[$key] | vercel env add $key production --force
}

Write-Host "`n✅ All environment variables added!" -ForegroundColor Green
Write-Host "Next step: Run 'npx prisma db push' to apply database migration" -ForegroundColor Yellow
