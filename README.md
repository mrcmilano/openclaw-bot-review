# OpenClaw Bot Dashboard

A lightweight web dashboard for viewing all your [OpenClaw](https://github.com/openclaw/openclaw) Bots/Agents/Models/Sessions status at a glance.

![Dashboard Preview](docs/bot_dashboard.png)
![Pixel Office](docs/pixel-office.png)
## Background

When running multiple OpenClaw agents across different platforms (Feishu, Discord, etc.), managing and monitoring them becomes increasingly complex — which bot uses which model? Are the platforms connected? Is the gateway healthy? How are tokens being consumed?

This dashboard reads your local OpenClaw configuration and session data, providing a unified web UI to monitor and test all your agents, models, platforms, and sessions in real time. No database required — everything is derived directly from `~/.openclaw/openclaw.json` and local session files. Plus, a fun pixel-art office brings your agents to life as animated characters walking around, sitting at desks, and interacting with furniture.

## Features

- **Bot Overview** — Card wall showing all agents with name, emoji, model, platform bindings, session stats, and gateway health status
- **Model List** — View all configured providers and models with context window, max output, reasoning support, and per-model test
- **Session Management** — Browse all sessions per agent with type detection (DM, group, cron), token usage, and connectivity test
- **Statistics** — Token consumption and average response time trends with daily/weekly/monthly views and SVG charts
- **Skill Management** — View all installed skills (built-in, extension, custom) with search and filter
- **Alert Center** — Configure alert rules (model unavailable, bot no response) with Feishu notification delivery
- **Gateway Health** — Real-time gateway status indicator with 10s auto-polling and one-click jump to OpenClaw web UI
- **Platform Test** — One-click connectivity test for all Feishu/Discord bindings and DM sessions
- **Auto Refresh** — Configurable refresh interval (manual, 10s, 30s, 1min, 5min, 10min)
- **English UI** — Clean, English-only interface
- **Dark/Light Theme** — Theme switcher in sidebar
- **Pixel Office** — Animated pixel-art office where agents appear as characters that walk, sit, and interact with furniture in real time (inspired by Pixel Agents)
- **Live Config** — Reads directly from `~/.openclaw/openclaw.json` and local session files, no database needed

## Preview

![Dashboard Preview](docs/bot_dashboard.png)

![Models Preview](docs/models-preview.png)

![Sessions Preview](docs/sessions-preview.png)

![Pixel Office](docs/pixel-office.png)

## Getting Started

See [Quick Start Guide](quick_start.md) for prompt/git/skill startup options.

```bash
# Clone the repo
git clone https://github.com/xmanrui/OpenClaw-bot-review.git
cd OpenClaw-bot-review

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- **Next.js 16.2.3** + TypeScript (security-patched)
- **React 19.1.0** + Tailwind CSS
- **Jest** + React Testing Library + Playwright (testing framework)
- No database — reads config file directly

## Requirements

- **Node.js 18+** (tested with Node.js 22)
- **OpenClaw** installed with config at `~/.openclaw/openclaw.json`
- **Testing** (optional): Playwright browsers for E2E tests

## Configuration

By default, the dashboard reads config from `~/.openclaw/openclaw.json`. To use a custom path, set the `OPENCLAW_HOME` environment variable:

```bash
OPENCLAW_HOME=/opt/openclaw
npm run start
```

## Authentication

For security, the dashboard now requires HTTP Basic Authentication by default. Create a `.env.local` file based on `.env.example`:

```bash
# Copy the example file
cp .env.example .env.local

# Edit with your credentials
AUTH_USERNAME=admin
AUTH_PASSWORD=your-secure-password-here
```

### Authentication Options

- **AUTH_USERNAME**: Username for basic authentication (required unless disabled)
- **AUTH_PASSWORD**: Password for basic authentication (required unless disabled)
- **AUTH_DISABLED=true**: Disable authentication completely (for local-only use behind IAP or firewall)

### When to Disable Authentication

Set `AUTH_DISABLED=true` if you are:
- Running locally behind Google IAP tunneling (as described in deployment scenarios)
- Using the dashboard only on trusted networks with firewall protection
- Deploying in isolated environments where network access is already restricted

### Docker Authentication

When running in Docker, pass authentication environment variables:

```bash
docker run -d -p 3000:3000 \
  -e AUTH_USERNAME=admin \
  -e AUTH_PASSWORD=your-password \
  openclaw-dashboard
```

## Testing

This project includes comprehensive testing with Jest, React Testing Library, and Playwright for E2E tests.

```bash
# Run unit and integration tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run E2E tests (requires Playwright browsers)
npx playwright install
npx playwright test
```

### Test Coverage

- **Unit Tests**: Core utilities, API routes, and security functions
- **Component Tests**: React components with user interaction testing
- **E2E Tests**: Full user workflows and integration testing
- **Security Tests**: Authentication, input validation, and vulnerability testing

See [TESTING_REPORT.md](TESTING_REPORT.md) for detailed information about bugs found, fixes applied, and security improvements.

## Security

This dashboard implements several security measures to protect against common web vulnerabilities:

### 🔒 Security Features

- **HTTP Basic Authentication** - Configurable username/password protection
- **Input Validation** - Path traversal protection on all API endpoints
- **Security-Patched Dependencies** - Next.js 16.2.3 and React 19.1.0 with latest security fixes
- **Environment-Based Configuration** - Sensitive settings via environment variables
- **Error Handling** - Secure error responses without information disclosure

### 🛡️ Vulnerability Fixes

- **Path Traversal (Critical)**: Fixed in session API endpoints
- **Dependency Vulnerabilities**: Updated Next.js/React to patch 6+ CVEs
- **Input Sanitization**: All user inputs validated before file operations

### 🔐 Authentication Options

- **Production**: Use HTTP Basic Auth with strong credentials
- **Development**: Set `AUTH_DISABLED=true` for local development
- **IAP Protected**: Disable auth when behind Google Identity-Aware Proxy

## Docker Deployment

You can also deploy the dashboard using Docker:

### Build Docker Image

```bash
docker build -t openclaw-dashboard .
```

### Run Container

```bash
# Basic run
docker run -d -p 3000:3000 openclaw-dashboard

# With custom OpenClaw config path
docker run -d --name openclaw-dashboard -p 3000:3000 -e OPENCLAW_HOME=/opt/openclaw -v /path/to/openclaw:/opt/openclaw openclaw-dashboard
```

## Development

### Code Quality

- **TypeScript**: Strict type checking enabled
- **ESLint**: Code linting (via Next.js)
- **Testing**: Comprehensive test suite with 80%+ coverage target
- **Security**: Regular dependency updates and security audits

### Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Run tests (`npm test`) and ensure they pass
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### Testing Your Changes

```bash
# Run all tests
npm test

# Run specific test file
npm test -- __tests__/lib/json.test.ts

# Run E2E tests
npx playwright test

# Generate coverage report
npm run test:coverage
```

