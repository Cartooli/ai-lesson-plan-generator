# Troubleshooting Guide

Having problems? This guide covers common issues and how to fix them.

## Table of Contents

- [Installation Issues](#installation-issues)
- [API Key Problems](#api-key-problems)
- [Running the Application](#running-the-application)
- [Deployment Issues](#deployment-issues)
- [Performance Problems](#performance-problems)
- [Still Stuck?](#still-stuck)

## Installation Issues

### "node: command not found" or "npm: command not found"

**Problem**: Node.js isn't installed or not in your system PATH.

**Solutions**:
1. **Install Node.js**:
   - Download from [nodejs.org](https://nodejs.org/)
   - Install the LTS version
   - Restart your computer after installation

2. **Verify installation**:
   ```bash
   node --version
   npm --version
   ```
   Both should show version numbers.

3. **If still not working**:
   - **Windows**: Add Node.js to your PATH manually
   - **Mac/Linux**: Check if Node.js is in `/usr/local/bin` or use a version manager like `nvm`

### "npm ERR! code EACCES" (Permission Error)

**Problem**: You don't have permission to install packages.

**Solutions**:
1. **Don't use sudo** (Mac/Linux) - This can cause more problems
2. **Fix npm permissions**:
   ```bash
   mkdir ~/.npm-global
   npm config set prefix '~/.npm-global'
   ```
   Then add to your `~/.bashrc` or `~/.zshrc`:
   ```bash
   export PATH=~/.npm-global/bin:$PATH
   ```

3. **Use a Node version manager** (recommended):
   - Install `nvm` (Node Version Manager)
   - This avoids permission issues

### "npm ERR! network" or Connection Timeout

**Problem**: Network issues or firewall blocking npm.

**Solutions**:
1. **Check internet connection**
2. **Try a different network** (switch WiFi, use mobile hotspot)
3. **Clear npm cache**:
   ```bash
   npm cache clean --force
   ```
4. **Use a different registry** (if in restricted network):
   ```bash
   npm config set registry https://registry.npmjs.org/
   ```
5. **Check firewall/antivirus** - May be blocking npm

### "Cannot find module" after npm install

**Problem**: Dependencies didn't install correctly.

**Solutions**:
1. **Delete and reinstall**:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Check Node.js version**:
   - Ensure you're using Node.js v18 or higher
   - Some packages require specific versions

3. **Clear cache and reinstall**:
   ```bash
   npm cache clean --force
   rm -rf node_modules
   npm install
   ```

## API Key Problems

### "Invalid API key" or "401 Unauthorized"

**Problem**: API key is incorrect, missing, or expired.

**Solutions**:
1. **Verify the key format**:
   - Should start with `sk-ant-api03-`
   - Should be about 50+ characters long
   - No spaces or line breaks

2. **Check your `.env` file**:
   ```env
   ANTHROPIC_API_KEY=sk-ant-api03-YOUR_ACTUAL_KEY_HERE
   ```
   - No quotes around the key
   - No spaces around the `=` sign
   - Key is on one line

3. **Verify key is active**:
   - Log into [console.anthropic.com](https://console.anthropic.com/)
   - Check if the key exists and is active
   - Check if you have credits/usage remaining

4. **Create a new key**:
   - If the key was exposed or compromised, create a new one
   - Update your `.env` file with the new key

5. **Restart the application** after changing `.env`

### "API key not found" or Environment Variable Not Loading

**Problem**: The application can't read your `.env` file.

**Solutions**:
1. **Check file location**:
   - `.env` must be in the root directory (same folder as `package.json`)
   - Not in a subfolder

2. **Check file name**:
   - Must be exactly `.env` (not `.env.txt` or `env`)
   - On Windows, make sure it's not `.env.txt` (hide file extensions to check)

3. **Check file format**:
   ```env
   ANTHROPIC_API_KEY=your-key-here
   ```
   - No spaces before variable name
   - One variable per line
   - No trailing spaces

4. **Restart the server** after changing `.env`

5. **Check if `.env` is gitignored** (it should be):
   - If you see `.env` in git, remove it immediately
   - Never commit `.env` files!

### "Rate limit exceeded" or "429 error"

**Problem**: Too many API requests.

**Solutions**:
1. **Wait a few minutes** - Rate limits reset
2. **Check your Anthropic account**:
   - Free tier has usage limits
   - Upgrade if you need more
3. **Implement rate limiting** in your code
4. **Cache responses** for repeated requests

## Running the Application

### "Port 3000 already in use"

**Problem**: Another application is using port 3000.

**Solutions**:
1. **Find and close the other application**:
   ```bash
   # Mac/Linux
   lsof -ti:3000 | xargs kill
   
   # Windows
   netstat -ano | findstr :3000
   taskkill /PID <PID> /F
   ```

2. **Use a different port**:
   - Change port in your configuration
   - Or set `PORT=3001` in `.env`

3. **Check if you have another terminal running the app**

### "Cannot GET /" or 404 errors

**Problem**: Routes not configured correctly or server not running properly.

**Solutions**:
1. **Check server is running**:
   - Look for "Server running" message in terminal
   - Check the correct URL (usually `http://localhost:3000`)

2. **Check file structure**:
   - Ensure `index.html` or main file exists
   - Check routing configuration

3. **Clear browser cache**:
   - Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

4. **Try a different browser**

### Application loads but nothing happens

**Problem**: JavaScript errors or API not responding.

**Solutions**:
1. **Open browser console** (F12):
   - Look for red error messages
   - Check the "Console" and "Network" tabs

2. **Check API endpoint**:
   - Verify `/api/generate-lesson` exists
   - Test with a tool like Postman or curl

3. **Check environment variables**:
   - Ensure API key is set
   - Restart server after changes

4. **Check network requests**:
   - Open browser DevTools → Network tab
   - See if requests are failing

### "CORS error" in browser console

**Problem**: Cross-Origin Resource Sharing issue.

**Solutions**:
1. **Configure CORS** in your API:
   - Add CORS headers to API responses
   - Allow your frontend domain

2. **Development workaround**:
   - Use a proxy
   - Or run frontend and backend on same origin

3. **Check deployment settings**:
   - Ensure CORS is configured for production domain

## Deployment Issues

### "Build failed" on Vercel/Netlify

**Problem**: Build process encountering errors.

**Solutions**:
1. **Check build logs**:
   - Look for specific error messages
   - Common: missing dependencies, syntax errors

2. **Test build locally**:
   ```bash
   npm run build
   ```
   Fix any errors before deploying

3. **Check environment variables**:
   - Ensure all required variables are set in deployment platform
   - Check variable names match exactly

4. **Check Node.js version**:
   - Some platforms need version specified
   - Add `engines` to `package.json`:
     ```json
     "engines": {
       "node": ">=18.0.0"
     }
     ```

### Environment variables not working in production

**Problem**: Variables not set or not loading in deployed environment.

**Solutions**:
1. **Set variables in platform dashboard**:
   - Vercel: Settings → Environment Variables
   - Netlify: Site settings → Environment variables
   - Add each variable individually

2. **Check variable names**:
   - Must match exactly (case-sensitive)
   - No typos

3. **Redeploy after adding variables**:
   - Variables are read at build/deploy time
   - Need to redeploy to pick up new variables

4. **Check variable visibility**:
   - Ensure variables are set for correct environment (Production, Preview, Development)

### "Function timeout" on serverless platform

**Problem**: API function taking too long to execute.

**Solutions**:
1. **Optimize API calls**:
   - Reduce response size
   - Stream responses if possible

2. **Increase timeout** (if platform allows):
   - Vercel: 10s default, can increase to 60s on Pro
   - Netlify: Check function timeout settings

3. **Optimize AI prompts**:
   - Shorter prompts = faster responses
   - Use streaming for long responses

## Performance Problems

### Slow response times

**Problem**: Application or API responding slowly.

**Solutions**:
1. **Check API key limits**:
   - Free tier may have slower responses
   - Check Anthropic status page

2. **Optimize prompts**:
   - Shorter, more focused prompts
   - Use appropriate model (faster vs. more capable)

3. **Add caching**:
   - Cache common requests
   - Use CDN for static assets

4. **Check network**:
   - Slow internet connection
   - Geographic distance to API servers

### High API costs

**Problem**: Using too much of API quota.

**Solutions**:
1. **Monitor usage**:
   - Check Anthropic dashboard regularly
   - Set up usage alerts

2. **Optimize requests**:
   - Cache responses
   - Batch requests when possible
   - Use appropriate model tier

3. **Implement rate limiting**:
   - Limit requests per user
   - Add delays between requests

## Still Stuck?

If none of these solutions work:

1. **Gather information**:
   - Error messages (full text)
   - Steps you took
   - Your environment (OS, Node version, etc.)
   - What you've already tried

2. **Check existing issues**:
   - Search GitHub issues for similar problems
   - Check if it's a known issue

3. **Ask for help**:
   - Open a GitHub issue with:
     - Clear title
     - Description of problem
     - Steps to reproduce
     - Error messages
     - What you've tried
     - Your environment details

4. **Useful information to include**:
   ```bash
   node --version
   npm --version
   git --version
   ```
   - OS and version
   - Browser and version (if frontend issue)
   - Full error stack trace

## Quick Diagnostic Commands

Run these to check your setup:

```bash
# Check Node.js and npm
node --version
npm --version

# Check if dependencies are installed
ls node_modules

# Check if .env exists
ls -la .env

# Test API key format (don't show full key!)
grep ANTHROPIC_API_KEY .env

# Check for syntax errors
npm run build  # or npm run dev
```

---

**Remember**: Most problems have solutions! Take it step by step, and don't hesitate to ask for help.








