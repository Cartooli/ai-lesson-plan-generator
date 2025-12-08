# AI Lesson Generator

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Cartooli/ai-lesson-plan-generator)

An AI-powered tool for generating comprehensive educational lesson plans using Anthropic's Claude API. This open-source project helps educators create structured, engaging lesson plans quickly and efficiently.

## 🚀 Live Demo

**Try it now**: [Live Demo](https://ai-lesson-plan-generator.vercel.app) *(Update with your actual Vercel URL)*

> **Note**: The live demo uses shared API keys and may have rate limits. For unlimited usage, [deploy your own instance](DEPLOYMENT_GUIDE.md) with your own API key.

## Features

- 🤖 **AI-Powered Generation**: Generate detailed lesson plans using advanced AI
- 📚 **Comprehensive Content**: Create structured lessons with objectives, activities, and assessments
- 🎯 **Customizable**: Tailor lessons to specific topics, grade levels, and learning objectives
- 📦 **Optional Archive System**: Store and moderate generated lesson plans
- 🔗 **Partner Integrations**: Optional referral links for educational tools
- 🚀 **Easy Deployment**: Deploy to Vercel, Netlify, or other serverless platforms

## Quick Start

### New to Coding?

👉 **Start here**: [GETTING_STARTED.md](GETTING_STARTED.md) - Step-by-step guide for beginners

### Already Familiar with Development?

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/ai-lesson-generator.git
   cd ai-lesson-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Anthropic API key:
   ```env
   ANTHROPIC_API_KEY=sk-ant-api03-YOUR_KEY_HERE
   ```

4. **Run locally**
   ```bash
   npm run dev
   ```

### Prerequisites

- Node.js (v18 or higher) - [Download here](https://nodejs.org/)
- npm or yarn (comes with Node.js)
- Anthropic API key - [Get one here](https://console.anthropic.com/)

For detailed setup instructions, see [SETUP.md](SETUP.md).

## Configuration

### Required Environment Variables

- `ANTHROPIC_API_KEY` - Your Anthropic API key (required)
  - Get your key from [https://console.anthropic.com/](https://console.anthropic.com/)
  - Required for lesson generation functionality

### Optional Environment Variables

- `ENABLE_ARCHIVE` - Enable lesson archiving system (default: `false`)
- `ADMIN_PASSWORD` - Admin password for moderation panel (required if `ENABLE_ARCHIVE=true`)
- `ELEVEN_LABS_PARTNER_REFERRAL_LINK` - Optional ElevenLabs referral link
- `VIDEOGEN_PARTNER_REFFERAL_CODE` - Optional VideoGen referral code
- `NODE_ENV` - Environment mode: `development` or `production` (default: `production`)

See [.env.example](.env.example) for a complete template with descriptions.

## Deployment

### Vercel (Recommended)

1. **Install Vercel CLI** (optional):
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```

3. **Set environment variables** in Vercel dashboard:
   - Go to Settings → Environment Variables
   - Add all variables from your `.env` file

4. **Redeploy** after adding environment variables

### Other Platforms

- **Netlify**: Connect GitHub repo, set build settings, add environment variables
- **Railway**: Connect GitHub repo, add environment variables, deploy
- **Other serverless platforms**: Follow platform-specific deployment guides

See [SETUP.md](SETUP.md) for detailed deployment instructions.

## Documentation

### For Beginners
- **[GETTING_STARTED.md](GETTING_STARTED.md)** - ⭐ Start here! Step-by-step guide for non-developers
- **[FAQ.md](FAQ.md)** - Frequently asked questions
- **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** - Common issues and solutions

### For Developers
- **[SETUP.md](SETUP.md)** - Detailed setup and installation guide
- **[VERCEL_SETUP.md](VERCEL_SETUP.md)** - ⚡ Quick Vercel deployment guide
- **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** - Deploy to Vercel, Netlify, etc.
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - System architecture documentation
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Guidelines for contributing
- **[SECURITY.md](SECURITY.md)** - Security policy and best practices

## Features in Detail

### Lesson Generation

Generate comprehensive lesson plans by providing:
- Topic or subject
- Grade level
- Learning objectives
- Duration

The AI creates structured lesson plans with:
- Learning objectives
- Materials needed
- Step-by-step activities
- Assessment methods
- Extension activities

### Archive System (Optional)

When enabled, the archive system allows you to:
- Store generated lesson plans
- Moderate content through admin panel
- Organize lessons by topic or date

**Security Note**: Use a strong password for the admin panel if enabling this feature.

### Partner Referrals (Optional)

Optional affiliate/referral links for:
- **ElevenLabs**: Text-to-speech and voice generation
- **VideoGen**: Video generation tools

These can be disabled by leaving the environment variables empty.

## Development

### Project Structure

```
ai-lesson-generator/
├── .github/          # GitHub workflows and templates
├── api/              # Serverless API functions
├── js/               # Frontend JavaScript
├── blog/             # Blog content
├── lessons-archive/  # Generated content (gitignored)
├── *.html            # Frontend pages
└── [config files]    # Configuration files
```

### Running Locally

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Edit .env with your API key

# Run development server
npm run dev
```

### Testing

- Test lesson generation with valid API key
- Verify error handling with missing/invalid keys
- Test archive system (if enabled)
- Verify referral links (if configured)

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add: amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Security

- **Never commit `.env` files** - They contain sensitive API keys
- **Use strong passwords** - Especially for admin panels
- **Rotate API keys regularly** - If compromised
- **Monitor API usage** - Check for unexpected activity

See [SECURITY.md](SECURITY.md) for our security policy and best practices.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Anthropic Claude API](https://www.anthropic.com/)
- Deployed on serverless platforms (Vercel, Netlify, etc.)

## Support

- 📖 Check the [documentation](SETUP.md)
- 🐛 [Report bugs](https://github.com/your-username/ai-lesson-generator/issues)
- 💬 [Ask questions](https://github.com/your-username/ai-lesson-generator/discussions)
- 🔒 [Security issues](SECURITY.md) - Please report privately

## Roadmap

- [ ] Enhanced lesson plan templates
- [ ] Multi-language support
- [ ] Export to PDF/DOCX
- [ ] Integration with LMS platforms
- [ ] User authentication system
- [ ] Lesson plan sharing

## Extension Ideas

Enhance your lesson plans with these powerful integrations:

### 🎥 Convert Lesson Plans to Video

Transform your generated lesson plans into engaging video content using [VideoGen](https://videogen.io?fpr=car70):

- **AI Video Generation**: Turn lesson plans into professional educational videos
- **Quick Production**: Create videos in minutes instead of hours
- **Multiple Formats**: Generate videos for TikTok, Instagram Reels, YouTube Shorts, and more
- **Educational Focus**: Perfect for creating tutorial videos, explainer content, and training materials

**Use Case**: Generate a lesson plan on "Photosynthesis", then use VideoGen to create a visual video explanation that students can watch before or after class.

### 🎙️ Convert Lesson Plans to Audio

Transform your lesson plans into audio content using [ElevenLabs](https://try.elevenlabs.io/cartooli):

- **AI Voice Generation**: Create natural-sounding voiceovers from your lesson content
- **Multiple Voices**: Choose from 200+ AI voices in 50+ languages
- **Audiobook Creation**: Convert entire lesson plans into audio format for accessibility
- **Podcast Generation**: Turn lesson plans into podcast-style educational content

**Use Case**: Generate a lesson plan, then use ElevenLabs to create an audio version for students who prefer listening, or for creating educational podcasts.

### Integration Ideas

- **Direct API Integration**: Connect VideoGen or ElevenLabs APIs to automatically convert generated lesson plans
- **Export Formats**: Add export buttons that format lesson plans for these platforms
- **Workflow Automation**: Create a complete pipeline: Generate → Convert to Video/Audio → Publish
- **Multi-format Distribution**: Generate once, distribute as text, video, and audio

**Note**: These integrations are optional and can be implemented as separate features or API endpoints. The referral links in the configuration are already set up to support these partnerships.

---

Made with ❤️ for educators worldwide
