# Setup Guide

This guide will help you set up the AI Lesson Generator for local development and deployment.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher recommended)
- **npm** or **yarn** package manager
- **Git**
- An **Anthropic API key** (get one from [https://console.anthropic.com/](https://console.anthropic.com/))

## Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/ai-lesson-generator.git
cd ai-lesson-generator
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` with your actual values:

```bash
# On macOS/Linux
nano .env

# On Windows
notepad .env
```

**Required Configuration:**

1. **ANTHROPIC_API_KEY** - Your Anthropic API key
   - Sign up at [https://console.anthropic.com/](https://console.anthropic.com/)
   - Create an API key in your account settings
   - Copy the key and paste it in `.env`

**Optional Configuration:**

- `ENABLE_ARCHIVE` - Set to `true` to enable lesson archiving (default: `false`)
- `ADMIN_PASSWORD` - Required if `ENABLE_ARCHIVE=true`, use a strong password
- `ELEVEN_LABS_PARTNER_REFERRAL_LINK` - Optional affiliate link
- `VIDEOGEN_PARTNER_REFFERAL_CODE` - Optional affiliate code
- `NODE_ENV` - Set to `development` for detailed errors (default: `production`)

### 4. Run Local Development Server

```bash
npm run dev
```

The application should now be running locally. Check the console output for the local URL (typically `http://localhost:3000` or similar).

## Environment Variables Setup

### Required Variables

#### ANTHROPIC_API_KEY

**Purpose:** Required for AI lesson generation functionality.

**How to obtain:**
1. Visit [https://console.anthropic.com/](https://console.anthropic.com/)
2. Sign up or log in to your account
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key (starts with `sk-ant-api03-`)
6. Paste it in your `.env` file

**Security Note:** Never share your API key or commit it to version control.

### Optional Variables

#### ENABLE_ARCHIVE

Enable the lesson archiving and moderation system.

- `false` (default) - Archiving disabled
- `true` - Archiving enabled (requires `ADMIN_PASSWORD`)

#### ADMIN_PASSWORD

Required when `ENABLE_ARCHIVE=true`. Use a strong password (12+ characters recommended) for the admin moderation panel.

#### ELEVEN_LABS_PARTNER_REFERRAL_LINK

Optional affiliate referral link for ElevenLabs. Leave empty to disable.

#### VIDEOGEN_PARTNER_REFFERAL_CODE

Optional affiliate referral code for VideoGen. Leave empty to disable.

#### NODE_ENV

Environment mode:
- `production` (default) - Standard error messages
- `development` - Detailed error messages for debugging

## Testing

### Test Locally

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open your browser to the local URL

3. Test the lesson generation:
   - Enter a topic or subject
   - Submit the form
   - Verify the lesson is generated correctly

### Test API Endpoints

If you have API endpoints, test them using:

```bash
# Example: Test lesson generation endpoint
curl -X POST http://localhost:3000/api/generate-lesson \
  -H "Content-Type: application/json" \
  -d '{"topic": "Mathematics", "grade": "5th"}'
```

### Verify Functionality

- [ ] Lesson generation works with valid API key
- [ ] Error handling works when API key is missing
- [ ] Archive system works (if enabled)
- [ ] Admin panel accessible (if archive enabled)
- [ ] Referral links work (if configured)

## Deployment

### Vercel Deployment

1. **Install Vercel CLI** (optional):
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Set Environment Variables:**
   - Go to your Vercel project dashboard
   - Navigate to Settings → Environment Variables
   - Add each variable from your `.env` file:
     - `ANTHROPIC_API_KEY`
     - `ENABLE_ARCHIVE` (if needed)
     - `ADMIN_PASSWORD` (if archive enabled)
     - `ELEVEN_LABS_PARTNER_REFERRAL_LINK` (optional)
     - `VIDEOGEN_PARTNER_REFFERAL_CODE` (optional)
     - `NODE_ENV` (optional)

4. **Redeploy** after adding environment variables

### Other Platforms

#### Netlify

1. Connect your GitHub repository
2. Set build command: `npm run build` (or as configured)
3. Set publish directory: `dist` (or as configured)
4. Add environment variables in Netlify dashboard

#### Railway

1. Connect your GitHub repository
2. Add environment variables in Railway dashboard
3. Deploy automatically on push

### Production Checklist

Before deploying to production:

- [ ] All environment variables are set
- [ ] `NODE_ENV` is set to `production`
- [ ] API keys are valid and have appropriate rate limits
- [ ] Admin password is strong (if archive enabled)
- [ ] Error handling is tested
- [ ] No sensitive data in code or logs
- [ ] CORS settings are configured (if needed)
- [ ] Rate limiting is configured (if needed)

## Troubleshooting

### Common Issues

**Issue: API key not working**
- Verify the key is correct in `.env`
- Check for extra spaces or newlines
- Ensure the key starts with `sk-ant-api03-`
- Verify your Anthropic account has credits

**Issue: Environment variables not loading**
- Ensure `.env` file is in the root directory
- Restart the development server after changing `.env`
- Check that variable names match exactly (case-sensitive)

**Issue: Port already in use**
- Change the port in your configuration
- Or stop the process using the port

**Issue: Dependencies not installing**
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

## Security Best Practices

1. **Never commit `.env` files** - They are in `.gitignore` for a reason
2. **Use strong passwords** - Especially for admin panels
3. **Rotate API keys regularly** - If a key is compromised
4. **Limit API key permissions** - Use keys with minimal required permissions
5. **Monitor usage** - Check API usage regularly for unexpected activity
6. **Use environment-specific keys** - Different keys for dev/staging/production

## Next Steps

- Read the [README.md](README.md) for project overview
- Check [CONTRIBUTING.md](CONTRIBUTING.md) if you want to contribute
- Review [ARCHITECTURE.md](ARCHITECTURE.md) for system design (if available)

## Getting Help

If you encounter issues:

1. Check this documentation
2. Search existing GitHub issues
3. Open a new issue with details about your problem
4. Include your environment details (OS, Node.js version, etc.)

