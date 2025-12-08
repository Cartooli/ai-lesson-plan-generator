# Architecture Documentation

This document describes the architecture and design of the AI Lesson Generator.

## System Overview

The AI Lesson Generator is a web application that uses AI to generate educational lesson plans. It consists of:

- **Frontend**: HTML/JavaScript client interface
- **Backend**: Serverless API functions
- **AI Integration**: Anthropic Claude API for lesson generation
- **Optional Features**: Archive system, referral links

## Architecture Diagram

```
┌─────────────────┐
│   Web Browser   │
│  (Frontend UI)  │
└────────┬────────┘
         │
         │ HTTP Requests
         │
┌────────▼────────────────────────┐
│   Serverless Platform           │
│   (Vercel/Netlify/etc.)         │
│                                 │
│  ┌──────────────────────────┐  │
│  │  API Endpoints           │  │
│  │  - generate-lesson.js    │  │
│  │  - get-referral-*.js     │  │
│  └──────────┬───────────────┘  │
└─────────────┼──────────────────┘
              │
              │ API Calls
              │
┌─────────────▼──────────────┐
│   Anthropic Claude API     │
│   (AI Lesson Generation)   │
└────────────────────────────┘
```

## Components

### Frontend

**Location**: Root HTML files, `js/` directory

**Responsibilities**:
- User interface for lesson plan input
- Form handling and validation
- Display generated lesson plans
- Handle user interactions

**Technologies**:
- HTML5
- Vanilla JavaScript (or framework as applicable)
- CSS for styling

### API Layer

**Location**: `api/` directory

**Key Endpoints**:

1. **generate-lesson.js**
   - Main lesson generation endpoint
   - Accepts lesson parameters (topic, grade, etc.)
   - Calls Anthropic API
   - Returns formatted lesson plan
   - Handles errors gracefully

2. **get-elevenlabs-referral.js**
   - Returns ElevenLabs referral link (if configured)
   - Optional affiliate functionality

3. **get-videogen-referral.js**
   - Returns VideoGen referral code (if configured)
   - Optional affiliate functionality

**Characteristics**:
- Serverless functions
- Stateless design
- Environment variable configuration
- Error handling and validation

### AI Integration

**Service**: Anthropic Claude API

**Usage**:
- Lesson plan generation
- Content structuring
- Educational content creation

**Configuration**:
- API key via `ANTHROPIC_API_KEY` environment variable
- Rate limiting considerations
- Error handling for API failures

### Optional Features

#### Archive System

**Purpose**: Store and moderate generated lesson plans

**Components**:
- Archive storage (file system or database)
- Admin moderation panel
- Password protection

**Configuration**:
- Enabled via `ENABLE_ARCHIVE` environment variable
- Protected by `ADMIN_PASSWORD`

**Location**: `lessons-archive/` directory (gitignored)

#### Referral Links

**Purpose**: Optional affiliate/referral functionality

**Components**:
- ElevenLabs referral handler
- VideoGen referral handler

**Configuration**:
- Optional environment variables
- Can be disabled by leaving empty

## Data Flow

### Lesson Generation Flow

1. User submits lesson request (topic, grade, etc.)
2. Frontend validates input
3. Frontend calls `/api/generate-lesson`
4. API function:
   - Validates request
   - Checks for API key
   - Constructs prompt for AI
   - Calls Anthropic API
   - Processes response
   - Returns formatted lesson plan
5. Frontend displays lesson plan
6. (Optional) Lesson saved to archive if enabled

### Error Handling

- **Missing API Key**: Returns user-friendly error
- **API Failure**: Graceful degradation with error message
- **Invalid Input**: Validation errors returned to user
- **Rate Limiting**: Appropriate error messages

## Environment Configuration

### Required Variables

- `ANTHROPIC_API_KEY`: Anthropic API key for lesson generation

### Optional Variables

- `ENABLE_ARCHIVE`: Enable/disable archive system
- `ADMIN_PASSWORD`: Password for admin panel
- `ELEVEN_LABS_PARTNER_REFERRAL_LINK`: ElevenLabs referral
- `VIDEOGEN_PARTNER_REFFERAL_CODE`: VideoGen referral
- `NODE_ENV`: Environment mode (development/production)

## Security Considerations

### API Key Protection

- Keys stored in environment variables only
- Never exposed to client-side code
- Server-side validation required

### Input Validation

- All user inputs validated
- Sanitization to prevent injection
- Rate limiting on API endpoints

### Archive System Security

- Password-protected admin panel
- Secure storage of archived content
- Audit logging (recommended)

## Deployment Architecture

### Serverless Deployment

**Platform**: Vercel (recommended), Netlify, Railway, etc.

**Benefits**:
- Automatic scaling
- No server management
- Environment variable management
- Easy deployment from Git

**Configuration**:
- Environment variables set in platform dashboard
- Automatic builds on Git push
- Custom domain support

### File Storage

- **Generated Content**: Local file system or cloud storage
- **Archive**: `lessons-archive/` directory (gitignored)
- **Static Assets**: Served from CDN

## Rate Limiting

### Current Implementation

- In-memory rate limiting (per instance)
- Suitable for single-instance deployments

### Production Recommendations

- **Redis/Upstash**: For distributed rate limiting
- **Platform Limits**: Use platform-native rate limiting
- **API Limits**: Respect Anthropic API rate limits

## Scalability Considerations

### Current Design

- Stateless API functions
- Suitable for moderate traffic
- Scales with serverless platform

### Future Enhancements

- Database integration for archives
- Caching layer for common requests
- CDN for static assets
- Queue system for high-volume processing

## Monitoring and Logging

### Recommended Monitoring

- API response times
- Error rates
- API key usage
- User activity (anonymized)

### Logging Best Practices

- Log errors and warnings
- Avoid logging sensitive data
- Use structured logging
- Monitor for security events

## Technology Stack

- **Runtime**: Node.js
- **Platform**: Serverless (Vercel/Netlify)
- **AI Service**: Anthropic Claude API
- **Frontend**: HTML, JavaScript, CSS
- **Storage**: File system (or cloud storage)

## Future Considerations

### Potential Enhancements

- Database integration
- User authentication
- Lesson plan templates
- Export functionality (PDF, DOCX)
- Multi-language support
- Integration with LMS platforms

### Performance Optimizations

- Response caching
- CDN integration
- Image optimization
- Code splitting (if using frameworks)

## Development Workflow

1. Local development with `.env` file
2. Testing with placeholder API keys
3. Git-based deployment
4. Environment variables configured in platform
5. Automatic deployment on push

## Dependencies

Key dependencies (check `package.json` for complete list):

- Serverless function runtime
- HTTP client for API calls
- Environment variable handling

## Questions or Contributions

For questions about architecture or to propose improvements:

- Open a GitHub issue
- Check [CONTRIBUTING.md](CONTRIBUTING.md)
- Review [SETUP.md](SETUP.md) for development setup

