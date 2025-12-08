# Quick Setup Checklist

A simple checklist to help you get started quickly.

## Before You Start

- [ ] Computer with internet connection
- [ ] GitHub account (for downloading code)
- [ ] Anthropic account (for API key)

## Installation Steps

### 1. Install Software

- [ ] **Node.js installed**
  - Download from [nodejs.org](https://nodejs.org/)
  - Install LTS version
  - Restart computer
  - Verify: Open Terminal/Command Prompt, type `node --version` (should show v18+)

- [ ] **Git installed** (usually pre-installed)
  - Verify: Type `git --version` in Terminal/Command Prompt
  - If not found, download from [git-scm.com](https://git-scm.com/)

### 2. Get API Key

- [ ] **Anthropic account created**
  - Go to [console.anthropic.com](https://console.anthropic.com/)
  - Sign up or log in

- [ ] **API key created**
  - Go to API Keys section
  - Create new key
  - **Copy and save it somewhere safe!**
  - Key looks like: `sk-ant-api03-...`

### 3. Download Code

- [ ] **Repository cloned**
  - Using GitHub Desktop OR
  - Using command line: `git clone https://github.com/your-username/ai-lesson-generator.git`
  - Navigate to folder: `cd ai-lesson-generator`

### 4. Configure Project

- [ ] **Dependencies installed**
  - Run: `npm install`
  - Wait for completion (2-5 minutes)

- [ ] **Environment file created**
  - Copy `.env.example` to `.env`
  - Open `.env` in text editor
  - Replace `YOUR_KEY_HERE` with your actual API key
  - Save file

### 5. Test It

- [ ] **Server started**
  - Run: `npm run dev`
  - See "Server running" message

- [ ] **Application opens**
  - Open browser to `http://localhost:3000`
  - See the lesson generator interface

- [ ] **Lesson generated**
  - Fill out the form
  - Click "Generate Lesson Plan"
  - See a lesson plan appear!

## If Something Goes Wrong

- [ ] Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
- [ ] Check [FAQ.md](FAQ.md)
- [ ] Verify all steps above are completed
- [ ] Check error messages carefully
- [ ] Ask for help on GitHub

## Next Steps

- [ ] Read [GETTING_STARTED.md](GETTING_STARTED.md) for detailed instructions
- [ ] Explore the application
- [ ] Try generating different lesson plans
- [ ] Consider deploying online (see [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md))

## Quick Commands Reference

```bash
# Check if Node.js is installed
node --version

# Check if npm is installed
npm --version

# Navigate to project folder
cd ai-lesson-generator

# Install dependencies
npm install

# Start the application
npm run dev

# Stop the application
# Press Ctrl+C (Windows) or Cmd+C (Mac)
```

## Common First-Time Issues

| Issue | Quick Fix |
|-------|-----------|
| "node: command not found" | Install Node.js from nodejs.org |
| "npm: command not found" | Node.js includes npm - reinstall Node.js |
| "Cannot find module" | Run `npm install` again |
| "API key invalid" | Check `.env` file has correct key, no spaces |
| "Port 3000 in use" | Close other apps or change port |
| Page won't load | Make sure `npm run dev` is running |

---

**All checked?** You're ready to use the AI Lesson Generator! 🎉

**Stuck?** Check [GETTING_STARTED.md](GETTING_STARTED.md) for detailed help.

