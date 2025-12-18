``# Deployment Guide

This guide shows you how to deploy the AI Lesson Generator to the internet so others can use it.

## Quick Deploy Options

### One-Click Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Cartooli/ai-lesson-plan-generator)

1. Click the button above (or [use this link](https://vercel.com/new))
2. Sign in with GitHub
3. Import your repository
4. Add environment variables (see below)
5. Click "Deploy"
6. Done! You'll get a URL like `your-app.vercel.app`

### One-Click Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/Cartooli/ai-lesson-plan-generator)

1. Click the button above
2. Sign in with GitHub
3. Configure build settings (usually auto-detected)
4. Add environment variables
5. Click "Deploy site"
6. Done!

## Prerequisites

Before deploying, make sure:

- ✅ Your code is pushed to GitHub
- ✅ You have an Anthropic API key
- ✅ You've tested it locally and it works
- ✅ You have an account on your chosen platform

## Platform-Specific Guides

### Vercel (Recommended)

**Why Vercel?**
- Free tier with generous limits
- Automatic deployments from GitHub
- Easy environment variable management
- Great for serverless functions
- Custom domains included

**Step-by-Step:**

1. **Sign up/Sign in**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub

2. **Import Project**
   - Click "Add New" → "Project"
   - Select your repository
   - Click "Import"

3. **Configure Project**
   - **Framework Preset**: Auto-detected (or select your framework)
   - **Root Directory**: `./` (usually)
   - **Build Command**: `npm run build` (if needed)
   - **Output Directory**: `dist` or `build` (if applicable)
   - **Install Command**: `npm install`

4. **Add Environment Variables**
   - Click "Environment Variables"
   - Add each variable:
     - `ANTHROPIC_API_KEY` = `your-api-key-here`
     - `ENABLE_ARCHIVE` = `false` (or `true` if enabled)
     - `ADMIN_PASSWORD` = `your-password` (if archive enabled)
     - `NODE_ENV` = `production`
   - Select environment: Production, Preview, Development (or all)

5. **Deploy**
   - Click "Deploy"
   - Wait 1-3 minutes
   - You'll get a URL like `your-app.vercel.app`

6. **Custom Domain (Optional)**
   - Go to Settings → Domains
   - Add your domain
   - Follow DNS configuration instructions

**Vercel Settings to Check:**
- **Functions**: Should auto-detect serverless functions in `/api`
- **Node.js Version**: Set in `package.json` or Vercel settings
- **Environment Variables**: Must be set for each environment

### Netlify

**Why Netlify?**
- Free tier available
- Easy GitHub integration
- Good for static sites + functions
- Custom domains

**Step-by-Step:**

1. **Sign up/Sign in**
   - Go to [netlify.com](https://netlify.com)
   - Sign in with GitHub

2. **New Site from Git**
   - Click "Add new site" → "Import an existing project"
   - Choose GitHub
   - Select your repository

3. **Build Settings**
   - **Build command**: `npm run build` (or leave empty if no build)
   - **Publish directory**: `dist` or `.` (depending on your setup)
   - **Base directory**: `./` (usually)

4. **Environment Variables**
   - Go to Site settings → Environment variables
   - Click "Add variable"
   - Add each variable (same as Vercel)
   - Set scope: All scopes, or specific to Production/Deploy previews

5. **Deploy**
   - Click "Deploy site"
   - Wait for build to complete
   - You'll get a URL like `your-app.netlify.app`

6. **Functions (if using)**
   - Netlify auto-detects functions in `/netlify/functions` or `/api`
   - May need to configure in `netlify.toml`

**Netlify Configuration File (`netlify.toml`):**
```toml
[build]
  command = "npm run build"
  publish = "dist"

[functions]
  directory = "api"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200
```

### Railway

**Why Railway?**
- Simple deployment
- Good free tier
- Automatic deployments
- Easy database integration (if needed later)

**Step-by-Step:**

1. **Sign up**
   - Go to [railway.app](https://railway.com?referralCode=u38bdj)
   - Sign in with GitHub

2. **New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Configure**
   - Railway auto-detects Node.js projects
   - May need to set start command: `npm start` or `npm run dev`

4. **Environment Variables**
   - Go to Variables tab
   - Add each environment variable
   - Click "Add" for each

5. **Deploy**
   - Railway automatically deploys
   - You'll get a URL like `your-app.up.railway.app`

6. **Custom Domain**
   - Go to Settings → Networking
   - Add custom domain
   - Configure DNS

### Render

**Why Render?**
- Free tier available
- Simple setup
- Good documentation

**Step-by-Step:**

1. **Sign up**
   - Go to [render.com](https://render.com)
   - Sign in with GitHub

2. **New Web Service**
   - Click "New" → "Web Service"
   - Connect your repository

3. **Configure**
   - **Name**: Your app name
   - **Environment**: Node
   - **Build Command**: `npm install && npm run build` (if needed)
   - **Start Command**: `npm start` or your start command

4. **Environment Variables**
   - Go to Environment section
   - Add each variable
   - Click "Save Changes"

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment
   - You'll get a URL like `your-app.onrender.com`

## Environment Variables Setup

For all platforms, you need to set these environment variables:

### Required
- `ANTHROPIC_API_KEY` - Your Anthropic API key

### Optional
- `ENABLE_ARCHIVE` - `true` or `false`
- `ADMIN_PASSWORD` - If archive enabled
- `NODE_ENV` - `production`

**Important Notes:**
- Never commit these to GitHub
- Set them in your platform's dashboard
- Redeploy after adding/changing variables
- Some platforms need variables set before first deploy

## Post-Deployment Checklist

After deploying, verify:

- [ ] Application loads at the provided URL
- [ ] API endpoints work (test lesson generation)
- [ ] Environment variables are set correctly
- [ ] No errors in browser console
- [ ] No errors in platform logs
- [ ] Custom domain works (if configured)
- [ ] HTTPS is enabled (should be automatic)

## Testing Your Deployment

1. **Visit your URL**
   - Should load the application
   - No 404 or 500 errors

2. **Test Lesson Generation**
   - Fill out the form
   - Submit a lesson request
   - Should generate a lesson plan

3. **Check Browser Console**
   - Open DevTools (F12)
   - Look for errors in Console tab
   - Check Network tab for failed requests

4. **Check Platform Logs**
   - Vercel: Deployments → View Function Logs
   - Netlify: Functions → View logs
   - Railway: View logs in dashboard
   - Look for errors or warnings

## Common Deployment Issues

### "Build failed"

**Solutions:**
- Check build logs for specific errors
- Ensure `package.json` has correct scripts
- Test build locally first: `npm run build`
- Check Node.js version compatibility

### "Function not found" or 404 on API routes

**Solutions:**
- Verify API functions are in correct directory (`/api`)
- Check platform-specific function requirements
- Verify routing configuration
- Check function file names match routes

### Environment variables not working

**Solutions:**
- Verify variables are set in platform dashboard
- Check variable names match exactly (case-sensitive)
- Redeploy after adding variables
- Check variable visibility (Production vs Preview)

### "Timeout" errors

**Solutions:**
- Check function timeout limits
- Optimize API calls
- Use streaming for long responses
- Consider upgrading platform tier

## Updating Your Deployment

### Automatic Updates (Recommended)

Most platforms auto-deploy when you push to GitHub:
- Push to `main` branch → Deploys to production
- Push to other branches → Creates preview deployment

### Manual Updates

1. **Trigger redeploy**:
   - Vercel: Deployments → Redeploy
   - Netlify: Deploys → Trigger deploy
   - Railway: Deployments → Redeploy

2. **Or push a new commit**:
   ```bash
   git commit --allow-empty -m "Trigger deployment"
   git push
   ```

## Custom Domains

### Getting a Domain

- **Free options**: Freenom, GitHub Student Pack
- **Paid options**: Namecheap, Google Domains, Cloudflare

### Setting Up DNS

1. **Get your platform's DNS settings**:
   - Vercel: Settings → Domains → Add domain
   - Netlify: Domain settings → Add custom domain
   - They'll give you DNS records to add

2. **Add DNS records** at your domain provider:
   - Usually a CNAME record
   - Point to your platform's URL

3. **Wait for DNS propagation** (5 minutes to 48 hours)

4. **SSL Certificate**: Usually automatic (Let's Encrypt)

## Monitoring & Analytics

### Platform Logs
- Monitor function logs for errors
- Check deployment logs
- Set up alerts for failures

### Application Monitoring
- Add error tracking (Sentry, etc.)
- Monitor API usage
- Track response times

### Analytics (Optional)
- Google Analytics
- Plausible Analytics
- Custom analytics

## Cost Considerations

### Free Tiers (as of 2024)

- **Vercel**: 
  - 100GB bandwidth/month
  - Unlimited deployments
  - Serverless function execution time limits

- **Netlify**:
  - 100GB bandwidth/month
  - 300 build minutes/month
  - Function execution limits

- **Railway**:
  - $5 credit/month (free tier)
  - Pay-as-you-go after

- **Render**:
  - Free tier with limitations
  - Spins down after inactivity

### When You Might Need to Pay

- High traffic (exceeds free tier)
- Long-running functions
- Custom domains (some platforms)
- Additional features

## Security Best Practices

1. **Environment Variables**:
   - Never commit to Git
   - Use platform's secure variable storage
   - Rotate keys regularly

2. **HTTPS**:
   - Should be automatic
   - Verify SSL certificate is active

3. **Rate Limiting**:
   - Implement to prevent abuse
   - Use platform features or custom code

4. **CORS**:
   - Configure properly
   - Don't allow all origins in production

## Next Steps

After successful deployment:

1. ✅ Share your URL with others
2. ✅ Monitor usage and errors
3. ✅ Set up custom domain (optional)
4. ✅ Add analytics (optional)
5. ✅ Consider adding authentication (if needed)

## Getting Help

If deployment fails:

1. Check platform-specific documentation
2. Review [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
3. Check platform status pages
4. Review build/deployment logs
5. Open a GitHub issue with details

---

**Congratulations!** 🎉 Your AI Lesson Generator is now live on the internet!




