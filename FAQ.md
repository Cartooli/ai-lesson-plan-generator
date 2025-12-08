# Frequently Asked Questions (FAQ)

Common questions and answers about the AI Lesson Generator.

## General Questions

### What is this project?

The AI Lesson Generator is a web application that uses artificial intelligence (specifically Anthropic's Claude API) to automatically create comprehensive educational lesson plans. You provide a topic, and it generates a structured lesson plan with objectives, activities, and assessments.

### Do I need to know how to code?

**Basic setup**: No coding required! Just follow the [GETTING_STARTED.md](GETTING_STARTED.md) guide step-by-step.

**Customization**: Some basic HTML/CSS/JavaScript knowledge helps if you want to modify the appearance or add features, but it's not required to use the tool.

### Is it free to use?

**The software**: Yes, it's open source and free (MIT License).

**The AI service**: Anthropic offers free tier with usage limits. Check [anthropic.com/pricing](https://www.anthropic.com/pricing) for current pricing. You'll need an API key, which may have usage limits or costs depending on your usage.

### What can I use it for?

- Creating lesson plans for any subject or grade level
- Generating educational content
- Planning curriculum
- Creating teaching materials
- Educational research

## Technical Questions

### What programming languages does it use?

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js (JavaScript)
- **Deployment**: Serverless functions (works on Vercel, Netlify, etc.)

### Do I need a server?

No! This uses serverless functions, which means:
- No server to manage
- Scales automatically
- Free hosting options available (Vercel, Netlify free tiers)
- Pay only for what you use

### What's the difference between local and deployed?

- **Local**: Runs on your computer at `http://localhost:3000` - only you can access it
- **Deployed**: Runs on the internet - anyone with the URL can access it

### Can I use it offline?

No, it requires an internet connection because:
- It needs to call the Anthropic API
- The AI processing happens on Anthropic's servers

## Setup Questions

### I've never used Terminal/Command Prompt. Is that a problem?

Not at all! The [GETTING_STARTED.md](GETTING_STARTED.md) guide includes step-by-step instructions. You'll mostly copy and paste commands.

### How long does setup take?

- **First time**: 30-60 minutes (installing software, getting API key, setting up)
- **Subsequent times**: 5-10 minutes (just clone and configure)

### Do I need a GitHub account?

**For downloading**: Not strictly required, but recommended. You can download as ZIP instead.

**For contributing**: Yes, if you want to contribute code or report issues.

### What if I don't have an Anthropic API key?

You need one to use the application. Get it free at [console.anthropic.com](https://console.anthropic.com/). The signup process is straightforward.

## API Key Questions

### Is my API key safe?

**In the code**: Yes, if you follow best practices:
- Never commit `.env` files (they're in `.gitignore`)
- Never share your API key
- Use environment variables (not hardcoded)

**In production**: Set API keys in your hosting platform's environment variable settings, not in code.

### What happens if I share my API key?

Someone could use your API key and:
- Use up your API credits/quota
- Make requests on your account
- Potentially incur costs

**If exposed**: Immediately revoke the key and create a new one at [console.anthropic.com](https://console.anthropic.com/).

### Can I use the same API key for multiple projects?

Yes, but consider:
- **Security**: If one project is compromised, all are affected
- **Tracking**: Harder to track usage per project
- **Best practice**: Use separate keys for different projects/environments

### How much does the API cost?

Check [anthropic.com/pricing](https://www.anthropic.com/pricing) for current pricing. They often have:
- Free tier with usage limits
- Pay-as-you-go pricing
- Different rates for different models

## Deployment Questions

### Where can I deploy this?

Popular free options:
- **Vercel** (recommended) - Easy setup, great for serverless
- **Netlify** - Similar to Vercel
- **Railway** - Simple deployment
- **Render** - Free tier available

### Is deployment free?

Many platforms offer free tiers that are sufficient for personal/small projects:
- Vercel: Free tier with generous limits
- Netlify: Free tier available
- Check each platform's current free tier limits

### How do I deploy?

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for detailed instructions. Most platforms:
1. Connect your GitHub account
2. Select the repository
3. Add environment variables
4. Click "Deploy"

### Can I use a custom domain?

Yes! Most hosting platforms allow custom domains:
- Vercel: Free custom domains
- Netlify: Custom domains supported
- You'll need to configure DNS settings

## Feature Questions

### Can I customize the lesson plan format?

Yes! The code is open source, so you can:
- Modify the AI prompts to change output format
- Change the frontend to display differently
- Add your own fields or sections

### Can I save lesson plans?

**Option 1**: Copy/paste the generated lesson plan
**Option 2**: Enable the archive system (see [SETUP.md](SETUP.md))
**Option 3**: Export to file (feature you could add)

### Can multiple people use it?

**Local version**: Only people on your network can access it
**Deployed version**: Anyone with the URL can use it (unless you add authentication)

### Does it work for all subjects?

Yes! The AI can generate lesson plans for:
- Any academic subject (Math, Science, History, etc.)
- Any grade level
- Any topic within those subjects

The quality depends on:
- How clear your prompt is
- The complexity of the topic
- The AI model's knowledge

## Troubleshooting Questions

### It's not working. Where do I start?

1. **Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md)** - Common issues and solutions
2. **Check browser console** (F12) - Look for error messages
3. **Verify API key** - Make sure it's correct in `.env`
4. **Check server is running** - Look for "Server running" message
5. **Read error messages** - They often tell you what's wrong

### I get an error. What should I do?

1. **Read the full error message** - Don't just read the first line
2. **Search for the error** - Google the exact error text
3. **Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md)** - Common solutions
4. **Check GitHub issues** - Someone might have had the same problem
5. **Ask for help** - Open a GitHub issue with details

### Why is it slow?

Possible reasons:
- **API response time** - AI processing takes time (usually 5-30 seconds)
- **Network speed** - Slow internet connection
- **API rate limits** - Free tier may be slower
- **Large prompts** - Longer prompts take more time

**Solutions**:
- Be patient (AI generation takes time)
- Check your internet connection
- Optimize your prompts
- Consider upgrading API tier

## Contribution Questions

### Can I contribute even if I'm a beginner?

Absolutely! There are many ways to contribute:
- **Documentation**: Fix typos, improve guides, add examples
- **Testing**: Try it out and report bugs
- **Design**: Improve the UI/UX
- **Features**: Add new features (start small!)
- **Questions**: Ask questions that help improve docs

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### How do I report a bug?

1. **Check if it's already reported** - Search GitHub issues
2. **Open a new issue** - Use the bug report template
3. **Include details**:
   - What you were trying to do
   - What happened vs. what you expected
   - Steps to reproduce
   - Your environment (OS, Node version, etc.)
   - Error messages

### Can I suggest a feature?

Yes! Open a feature request issue:
1. Use the feature request template
2. Describe what you want
3. Explain why it would be useful
4. Suggest how it might work

## Security Questions

### Is it safe to use?

**The code**: Yes, it's open source - you can review it yourself.

**Your data**: 
- API keys: Keep them secret (use environment variables)
- Generated content: Stored locally or in your chosen storage
- No data is sent to us (the maintainers)

### What data is collected?

**By this project**: None. We don't collect any data.

**By Anthropic**: Check their privacy policy at [anthropic.com](https://www.anthropic.com/). They process your prompts to generate responses.

**By hosting platform**: Check your hosting provider's privacy policy (Vercel, Netlify, etc.)

### Can I use this in a school/organization?

Yes, but consider:
- **API costs**: May increase with many users
- **Rate limiting**: Implement if needed
- **Authentication**: Add if you want to restrict access
- **Data privacy**: Review what data is sent to Anthropic
- **Compliance**: Ensure it meets your organization's requirements

## Advanced Questions

### Can I use a different AI model?

The code is designed for Anthropic's Claude API, but you could:
- Modify the API calls to use a different provider
- Add support for multiple providers
- Create an abstraction layer

### Can I add user authentication?

Yes! You can add:
- Basic auth
- OAuth (Google, GitHub, etc.)
- Custom authentication
- JWT tokens

This requires additional code and setup.

### Can I integrate with an LMS (Learning Management System)?

Not built-in, but you could:
- Export lesson plans in LMS-compatible formats
- Create an API endpoint for LMS integration
- Add export functionality (PDF, SCORM, etc.)

### How do I scale this for many users?

Consider:
- **Rate limiting**: Prevent abuse
- **Caching**: Cache common requests
- **Database**: Store lessons instead of file system
- **CDN**: For static assets
- **Monitoring**: Track usage and errors
- **Load balancing**: If using traditional servers

## Still Have Questions?

- 📖 Check the [documentation](README.md)
- 🐛 [Report bugs](https://github.com/your-username/ai-lesson-generator/issues)
- 💬 [Ask questions](https://github.com/your-username/ai-lesson-generator/discussions)
- 🔒 [Security issues](SECURITY.md) - Report privately

---

**Don't see your question?** Open a GitHub issue with the `question` label!



