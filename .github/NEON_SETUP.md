# Neon GitHub Actions Setup Guide

This workflow automatically creates a database branch for each pull request and deletes it when the PR is closed.

## 📋 Prerequisites

1. **Neon Account**: Sign up at [https://console.neon.tech](https://console.neon.tech)
2. **GitHub Repository**: Your code must be on GitHub
3. **Neon API Key**: Required for automation

---

## 🔑 Setting Up GitHub Secrets

You need to add the following secrets to your GitHub repository:

### Step 1: Get Your Neon Credentials

1. **Go to Neon Console**: [https://console.neon.tech](https://console.neon.tech)
2. **Select your project**
3. **Get Project ID**:
   - Click on "Project settings"
   - Copy the Project ID (starts with something like `steep-thunder-12345678`)

4. **Get API Key**:
   - Go to "Account settings" → "API keys"
   - Click "Generate new API key"
   - Copy and save it (you won't see it again!)

5. **Get Database Credentials**:
   - Go to your project dashboard
   - Click "Connection string"
   - Find your username (usually `neondb_owner`)
   - Find your password (in the connection string)

### Step 2: Add Secrets to GitHub

1. Go to your GitHub repository: **https://github.com/DocHarry22/water-nest-ecommerce**
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add these 4 secrets:

| Secret Name | Description | Example Value |
|------------|-------------|---------------|
| `NEON_PROJECT_ID` | Your Neon project ID | `steep-thunder-12345678` |
| `NEON_API_KEY` | Neon API key | `neon_api_aBcD1234...` |
| `NEON_DATABASE_USERNAME` | Database username | `neondb_owner` |
| `NEON_DATABASE_PASSWORD` | Database password | `npg_rxTVR86OyWDS` |

---

## 🚀 How It Works

### When You Open a PR:
1. ✅ GitHub Actions creates a new Neon database branch
2. ✅ Runs Prisma migrations on the new branch
3. ✅ Seeds the database with test data
4. ✅ Comments on the PR with connection details

### When You Close a PR:
1. ✅ GitHub Actions deletes the database branch
2. ✅ Comments on the PR confirming deletion
3. ✅ Cleans up resources automatically

---

## 🧪 Testing the Workflow

After setting up secrets:

1. Create a new branch:
   ```bash
   git checkout -b feature/test-neon-branch
   ```

2. Make a small change (any file)

3. Commit and push:
   ```bash
   git add .
   git commit -m "Test: Neon database branching"
   git push origin feature/test-neon-branch
   ```

4. Create a Pull Request on GitHub

5. Check the **Actions** tab to see the workflow running

6. Look for a comment on your PR with database details!

---

## 📊 Benefits

✅ **Isolated Testing**: Each PR gets its own database
✅ **Safe Migrations**: Test schema changes without affecting production
✅ **Automatic Cleanup**: Databases deleted when PRs close
✅ **Fast Setup**: Database ready in ~30 seconds
✅ **Cost Efficient**: Only pay for active branches

---

## 🔧 Customization

### Skip Seeding
If you don't want to seed data, remove these lines from the workflow:
```yaml
- name: Seed Database (Optional)
  env:
    DATABASE_URL: ${{ steps.create-branch.outputs.db_url }}
  run: npm run db:seed
  continue-on-error: true
```

### Change Branch Naming
Update the `branch_name` in the workflow:
```yaml
branch_name: preview/pr-${{ github.event.number }}-${{ github.head_ref }}
```

### Add Environment Variables
Deploy your preview database URL to Vercel/other services:
```yaml
- name: Deploy to Vercel Preview
  env:
    DATABASE_URL: ${{ steps.create-branch.outputs.db_url }}
  run: vercel deploy --env DATABASE_URL="$DATABASE_URL"
```

---

## ❓ Troubleshooting

### Workflow fails with "Invalid API Key"
- Check that `NEON_API_KEY` is correct in GitHub secrets
- Generate a new API key if needed

### Migrations fail
- Ensure your Prisma schema is valid: `npx prisma validate`
- Check that migrations exist: `prisma/migrations/`

### Branch not deleted
- GitHub Actions needs write permissions
- Check Settings → Actions → General → Workflow permissions

---

## 📚 Resources

- [Neon Branching Docs](https://neon.tech/docs/guides/branching)
- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Prisma Migrate](https://www.prisma.io/docs/concepts/components/prisma-migrate)

---

## 🎯 Next Steps

1. ✅ Add GitHub secrets (see above)
2. ✅ Create a test PR to verify workflow
3. ✅ Enjoy automatic database branching!

**Note**: This workflow requires a Neon account. The free tier includes database branching!
