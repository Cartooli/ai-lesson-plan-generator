# Getting Started - For Beginners

Welcome! This guide is designed for people who are new to coding or web development. We'll walk you through everything step-by-step.

## What You'll Need

Before starting, make sure you have:

1. **A computer** (Windows, Mac, or Linux)
2. **Internet connection**
3. **A GitHub account** (free - sign up at [github.com](https://github.com))
4. **An Anthropic API key** (free to get - we'll show you how)

## Step 1: Install Required Software

### Install Node.js

Node.js is the software that runs the application.

1. Go to [https://nodejs.org/](https://nodejs.org/)
2. Download the "LTS" version (recommended)
3. Run the installer
4. Follow the installation wizard (click "Next" through all steps)
5. Restart your computer after installation

**Verify it worked:**
- Open Terminal (Mac/Linux) or Command Prompt (Windows)
- Type: `node --version`
- You should see a version number like `v18.17.0`
- If you see an error, Node.js isn't installed correctly

### Install Git (if not already installed)

Git helps you download and manage the code.

**On Mac:**
- Git usually comes pre-installed
- Check by typing `git --version` in Terminal

**On Windows:**
- Download from [https://git-scm.com/download/win](https://git-scm.com/download/win)
- Run the installer
- Use default settings (just click "Next")

**On Linux:**
- Usually pre-installed, or install via your package manager

## Step 2: Get Your API Key

An API key is like a password that lets the app use Anthropic's AI service.

1. Go to [https://console.anthropic.com/](https://console.anthropic.com/)
2. Click "Sign Up" (or "Log In" if you have an account)
3. Create an account (use your email)
4. Once logged in, look for "API Keys" in the menu
5. Click "Create Key"
6. Give it a name (like "My Lesson Generator")
7. **Copy the key immediately** - it looks like: `sk-ant-api03-...`
8. **Save it somewhere safe** - you won't be able to see it again!

> ⚠️ **Important**: Never share your API key with anyone or post it online!

## Step 3: Download the Code

### Option A: Using GitHub Desktop (Easiest for Beginners)

1. Download [GitHub Desktop](https://desktop.github.com/)
2. Install and sign in with your GitHub account
3. Click "File" → "Clone Repository"
4. Enter: `https://github.com/Cartooli/ai-lesson-plan-generator.git`
5. Choose where to save it on your computer
6. Click "Clone"

### Option B: Using Command Line

1. Open Terminal (Mac/Linux) or Command Prompt (Windows)
2. Navigate to where you want to save the project:
   ```bash
   cd Desktop  # or wherever you want it
   ```
3. Copy the code:
   ```bash
   git clone https://github.com/Cartooli/ai-lesson-plan-generator.git
   ```
4. Go into the folder:
   ```bash
   cd ai-lesson-generator
   ```

## Step 4: Set Up the Project

### Install Dependencies

Dependencies are like plugins that the app needs to work.

1. Open Terminal/Command Prompt
2. Navigate to the project folder:
   ```bash
   cd ai-lesson-generator
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Wait for it to finish (this might take 2-5 minutes)
5. You'll see "added X packages" when it's done

### Configure Environment Variables

Environment variables are settings the app needs (like your API key).

1. In the project folder, find the file called `.env.example`
2. **Copy** this file and name the copy `.env`
   - On Mac/Linux: `cp .env.example .env`
   - On Windows: Copy the file in File Explorer and rename it

3. Open the `.env` file in a text editor (Notepad, TextEdit, VS Code, etc.)

4. Find this line:
   ```
   ANTHROPIC_API_KEY=sk-ant-api03-YOUR_KEY_HERE
   ```

5. Replace `YOUR_KEY_HERE` with your actual API key from Step 2:
   ```
   ANTHROPIC_API_KEY=sk-ant-api03-abc123xyz...
   ```

6. Save the file

> 💡 **Tip**: Make sure there are no spaces around the `=` sign!

## Step 5: Run the Application

Now let's start the app!

1. Make sure you're in the project folder in Terminal/Command Prompt
2. Run:
   ```bash
   npm run dev
   ```
3. You should see something like:
   ```
   > Server running at http://localhost:3000
   ```
4. Open your web browser
5. Go to: `http://localhost:3000`
6. You should see the AI Lesson Generator!

## Step 6: Test It Out

1. Fill in the form on the page:
   - Enter a topic (e.g., "Photosynthesis")
   - Select a grade level
   - Add any special requirements
2. Click "Generate Lesson Plan"
3. Wait a few seconds...
4. Your lesson plan should appear!

## Common First-Time Issues

### "Command not found: npm"
- **Problem**: Node.js isn't installed or not in your PATH
- **Solution**: Reinstall Node.js and restart your computer

### "Cannot find module..."
- **Problem**: Dependencies aren't installed
- **Solution**: Run `npm install` again

### "API key invalid" or "401 error"
- **Problem**: API key is wrong or missing
- **Solution**: 
  1. Check your `.env` file has the correct key
  2. Make sure there are no extra spaces
  3. Verify the key works at [console.anthropic.com](https://console.anthropic.com/)

### "Port 3000 already in use"
- **Problem**: Another app is using that port
- **Solution**: 
  1. Close other applications
  2. Or change the port in your configuration

### Page won't load
- **Problem**: Server isn't running
- **Solution**: 
  1. Make sure `npm run dev` is still running
  2. Check the URL is exactly `http://localhost:3000`
  3. Try a different browser

## Next Steps

Once it's working:

1. ✅ **Read the [README.md](README.md)** - Learn about features
2. ✅ **Check [SETUP.md](SETUP.md)** - Advanced setup options
3. ✅ **See [TROUBLESHOOTING.md](TROUBLESHOOTING.md)** - If you have problems
4. ✅ **Read [FAQ.md](FAQ.md)** - Common questions

## Getting Help

If you're stuck:

1. **Check the error message** - It often tells you what's wrong
2. **Read [TROUBLESHOOTING.md](TROUBLESHOOTING.md)** - Common solutions
3. **Search GitHub Issues** - Someone might have had the same problem
4. **Ask for help** - Open a GitHub issue with:
   - What you're trying to do
   - What error you're seeing
   - What you've already tried

## What's Next?

Now that you have it running:

- **Customize it**: Change colors, add features
- **Deploy it**: Put it online so others can use it (see [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md))
- **Learn more**: Read the code and see how it works
- **Contribute**: Help improve the project!

## Quick Reference

**Start the app:**
```bash
npm run dev
```

**Stop the app:**
- Press `Ctrl + C` in Terminal/Command Prompt

**Update dependencies:**
```bash
npm install
```

**Check if everything is set up:**
```bash
node --version    # Should show v18 or higher
npm --version     # Should show a version number
git --version     # Should show a version number
```

---

**Congratulations!** 🎉 You've set up your first AI application! 

Need help? Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md) or open an issue on GitHub.




