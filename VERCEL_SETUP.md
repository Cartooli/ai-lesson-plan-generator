# Vercel Setup Guide

Quick reference for setting up the AI Lesson Generator on Vercel.

## Step 1: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"Add New"** → **"Project"**
3. Import your repository: `Cartooli/ai-lesson-plan-generator`
4. Click **"Import"**

## Step 2: Configure Build Settings

Vercel should auto-detect the settings, but verify:

- **Framework Preset**: Other (or leave blank)
- **Root Directory**: `./` (default)
- **Build Command**: Leave empty (or `npm run build` if needed)
- **Output Directory**: Leave empty (or `./` if needed)
- **Install Command**: `npm install`

## Step 3: Add Environment Variables

**⚠️ CRITICAL**: Add these environment variables in Vercel **BEFORE** deploying.

### Required Environment Variable

1. Go to **Settings** → **Environment Variables**
2. Click **"Add New"**
3. Add the following:

#### `ANTHROPIC_API_KEY` (Required)

- **Name**: `ANTHROPIC_API_KEY`
- **Value**: Your Anthropic API key (starts with `sk-ant-api03-...`)
- **Environment**: Select **Production**, **Preview**, and **Development** (or at least Production)
- Click **"Save"**

**How to get your API key:**
1. Go to [console.anthropic.com](https://console.anthropic.com/)
2. Sign in or create an account
3. Navigate to **API Keys**
4. Click **"Create Key"**
5. Copy the key (you won't see it again!)

### Optional Environment Variables

Add these if you want to enable additional features:

#### `ENABLE_ARCHIVE` (Optional)

- **Name**: `ENABLE_ARCHIVE`
- **Value**: `false` (or `true` if you want archiving)
- **Environment**: Production, Preview, Development
- **Default**: `false`

#### `ADMIN_PASSWORD` (Optional - Required if ENABLE_ARCHIVE=true)

- **Name**: `ADMIN_PASSWORD`
- **Value**: A strong password (12+ characters)
- **Environment**: Production, Preview, Development
- **Note**: Only needed if `ENABLE_ARCHIVE=true`
``
#### `NODE_ENV` (Optional)

- **Name**: `NODE_ENV`
- **Value**: `production`
- **Environment**: Production, Preview, Development
- **Default**: `production`

## Step 4: Deploy

1. After adding environment variables, go back to **Deployments**
2. Click **"Redeploy"** on your latest deployment (or trigger a new deployment)
3. Wait 1-3 minutes for deployment to complete
4. Your app will be live at: `https://your-project-name.vercel.app`

## Step 5: Verify Deployment

1. Visit your deployment URL
2. Try generating a lesson plan
3. Check the **Logs** tab in Vercel if there are any errors
4. Verify environment variables are loaded (check function logs)

## Environment Variables Checklist

Before deploying, ensure you have:

- [ ] `ANTHROPIC_API_KEY` - Your Anthropic API key (REQUIRED)
- [ ] `ENABLE_ARCHIVE` - Set to `false` or `true` (optional)
- [ ] `ADMIN_PASSWORD` - Only if `ENABLE_ARCHIVE=true` (optional)
- [ ] `NODE_ENV` - Set to `production` (optional, recommended)

## Quick Copy-Paste for Vercel Dashboard

### Minimum Required Setup

```
ANTHROPIC_API_KEY = sk-ant-api03-YOUR_KEY_HERE
```

### Full Setup (All Features)

```
ANTHROPIC_API_KEY = sk-ant-api03-YOUR_KEY_HERE
ENABLE_ARCHIVE = false
ADMIN_PASSWORD = your_secure_password_here
NODE_ENV = production
```

## Troubleshooting

### "API key not configured" Error

- **Problem**: `ANTHROPIC_API_KEY` not set or incorrect
- **Solution**: 
  1. Go to Vercel → Settings → Environment Variables
  2. Verify `ANTHROPIC_API_KEY` exists
  3. Check it's set for the correct environment (Production)
  4. Redeploy after adding/updating

### Environment Variables Not Loading

- **Problem**: Variables set but not working
- **Solution**:
  1. Ensure variables are set for the correct environment
  2. Redeploy after adding variables (they're read at build time)
  3. Check Vercel logs for errors

### Function Timeout

- **Problem**: API calls taking too long
- **Solution**:
  1. Check Anthropic API status
  2. Optimize prompts (shorter = faster)
  3. Consider upgrading Vercel plan for longer timeouts

## Security Best Practices

1. ✅ **Never commit API keys** - They're in `.gitignore` for a reason
2. ✅ **Use Vercel's environment variables** - Encrypted and secure
3. ✅ **Set different keys for different environments** - Production vs Preview
4. ✅ **Rotate keys regularly** - If compromised
5. ✅ **Monitor usage** - Check Vercel logs and Anthropic dashboard

## Next Steps

After successful deployment:

1. ✅ Update README.md with your live demo URL
2. ✅ Test all features
3. ✅ Set up custom domain (optional)
4. ✅ Configure rate limiting (if needed)
5. ✅ Monitor usage and costs

## Support

- 📖 See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for detailed instructions
- 🐛 Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for common issues
- 💬 Open a GitHub issue for help

---

**Remember**: Environment variables are encrypted in Vercel and never exposed in your code. Your API keys are safe! 🔒






