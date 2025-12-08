# Contributing to AI Lesson Generator

Thank you for your interest in contributing to the AI Lesson Generator! This document provides guidelines and instructions for contributing to the project.

## How to Contribute

### Reporting Issues

If you find a bug or have a feature request, please open an issue on GitHub. When reporting bugs, please include:

- A clear description of the issue
- Steps to reproduce the problem
- Expected behavior
- Actual behavior
- Your environment (OS, Node.js version, etc.)
- Any relevant error messages or logs

### Submitting Pull Requests

1. **Fork the repository** and clone your fork
   ```bash
   git clone https://github.com/your-username/ai-lesson-generator.git
   cd ai-lesson-generator
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow the code style guidelines below
   - Add tests if applicable
   - Update documentation as needed

4. **Commit your changes**
   ```bash
   git commit -m "Add: Description of your changes"
   ```
   Use clear, descriptive commit messages following the format:
   - `Add:` for new features
   - `Fix:` for bug fixes
   - `Update:` for updates to existing features
   - `Docs:` for documentation changes
   - `Refactor:` for code refactoring

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Open a Pull Request**
   - Provide a clear description of your changes
   - Reference any related issues
   - Ensure all tests pass (if applicable)

## Development Guidelines

### Code Style

- Use consistent indentation (2 spaces for JavaScript)
- Follow existing code patterns and conventions
- Write clear, self-documenting code
- Add comments for complex logic
- Keep functions focused and single-purpose

### Testing

- Test your changes locally before submitting
- Verify all environment variables are properly handled
- Test error cases and edge conditions
- Ensure no sensitive data is exposed in error messages

### Project Structure

```
ai-lesson-generator/
├── .github/          # GitHub workflows and templates
├── api/              # Serverless API functions
├── js/               # Frontend JavaScript
├── blog/             # Blog content
├── lessons-archive/  # Generated content (gitignored)
└── *.html            # Frontend pages
```

### Key Files

- `api/generate-lesson.js` - Main lesson generation endpoint
- `api/get-elevenlabs-referral.js` - ElevenLabs referral handler
- `api/get-videogen-referral.js` - VideoGen referral handler
- `README.md` - Main project documentation
- `SETUP.md` - Detailed setup instructions

## Development Setup

See [SETUP.md](SETUP.md) for detailed instructions on setting up your development environment.

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers and help them get started
- Focus on constructive feedback
- Respect different viewpoints and experiences

## Questions?

If you have questions about contributing, feel free to:
- Open an issue with the `question` label
- Check existing documentation in the repository

Thank you for contributing to the AI Lesson Generator! 🎓



