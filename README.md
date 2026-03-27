# Tideways MCP Server

[![CI/CD Pipeline](https://github.com/5hahiL/tideways-mcp-server/actions/workflows/ci.yml/badge.svg)](https://github.com/5hahiL/tideways-mcp-server/actions/workflows/ci.yml)
[![Release](https://github.com/5hahiL/tideways-mcp-server/actions/workflows/release.yml/badge.svg)](https://github.com/5hahiL/tideways-mcp-server/actions/workflows/release.yml)
[![Security Pipeline](https://github.com/5hahiL/tideways-mcp-server/actions/workflows/security.yml/badge.svg)](https://github.com/5hahiL/tideways-mcp-server/actions/workflows/security.yml)

A Model Context Protocol (MCP) server that enables AI assistants to query [Tideways](https://tideways.com/) performance monitoring data and provide conversational performance insights for PHP applications.

> **About Tideways**: [Tideways](https://tideways.com/) is a powerful application performance monitoring (APM) platform designed specifically for PHP applications. For technical details, see the [REST API documentation](https://support.tideways.com/documentation/reference/index.html).

> **Forked from** [abuhamza/tideways-mcp-server](https://github.com/abuhamza/tideways-mcp-server) by [Mouhammed Diop](https://github.com/abuhamza).

## Features

- **Conversational Performance Insights**: Get performance data in natural language format optimized for AI assistants
- **AI Assistant Integration**: Works with Claude Desktop, Cursor, Claude Code, and other MCP-compatible tools
- **Real-time Performance Metrics**: Query current performance data with configurable rate limiting
- **Issue Analysis**: Retrieve and analyze errors, exceptions, and performance issues
- **Robust Error Handling**: Comprehensive error handling with user-friendly messages

**Repository**: [5hahiL/tideways-mcp-server](https://github.com/5hahiL/tideways-mcp-server)
**License**: MIT

## Prerequisites

- [Tideways](https://tideways.com/) account with a valid API token
- API token with appropriate scopes (`metrics`, `issues`, `traces`) - see [API documentation](https://support.tideways.com/documentation/reference/index.html)
- Access to a Tideways organization and project

## AI Integration Setup

**This is an MCP (Model Context Protocol) server designed exclusively for AI assistants. It cannot be used as a standalone CLI tool.**

The server integrates with AI assistants through MCP configuration using the npm package `tideways-mcp-server`.

### Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `TIDEWAYS_TOKEN` | ✅ | - | Tideways API access token (see Security section) |
| `TIDEWAYS_ORG` | ✅ | - | Tideways organization name |
| `TIDEWAYS_PROJECT` | ✅ | - | Tideways project name |
| `TIDEWAYS_BASE_URL` | ❌ | `https://app.tideways.io/apps/api` | Tideways API base URL |
| `TIDEWAYS_RATE_LIMIT` | ❌ | `2500` | API requests per hour — match to your plan (Team/Pro: 2500, Standard: 1000, Basic: 250) |
| `TIDEWAYS_MAX_RETRIES` | ❌ | `3` | Maximum API retry attempts |
| `TIDEWAYS_REQUEST_TIMEOUT` | ❌ | `30000` | API request timeout (ms) |
| `LOG_LEVEL` | ❌ | `info` | Log level (debug, info, warn, error) |

## AI Assistant Integration

**This server only works with MCP-compatible AI assistants. It uses stdio transport.**

#### Claude Desktop

Add to your Claude Desktop MCP configuration file:

**Location:**
- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`
- Linux: `~/.config/claude/claude_desktop_config.json`

**Configuration (Recommended - using npx):**
```json
{
  "mcpServers": {
    "tideways": {
      "command": "npx",
      "args": ["tideways-mcp-server"],
      "env": {
        "TIDEWAYS_TOKEN": "your_token",
        "TIDEWAYS_ORG": "your_org",
        "TIDEWAYS_PROJECT": "your_project"
      }
    }
  }
}
```

**Alternative (if installed globally):**
```json
{
  "mcpServers": {
    "tideways": {
      "command": "tideways-mcp-server",
      "env": {
        "TIDEWAYS_TOKEN": "your_token",
        "TIDEWAYS_ORG": "your_org",
        "TIDEWAYS_PROJECT": "your_project"
      }
    }
  }
}
```

#### Cursor IDE

Cursor supports MCP through its settings. Add the server configuration in Cursor's MCP settings:

1. Open Cursor Settings
2. Tools & Integration
3. Add a new server with:
```json
{
  "mcpServers": {
    "tideways": {
      "command": "tideways-mcp-server",
      "env": {
        "TIDEWAYS_TOKEN": "your_token",
        "TIDEWAYS_ORG": "your_org",
        "TIDEWAYS_PROJECT": "your_project"
      }
    }
  }
}
```

#### VS Code with MCP Extension

If using VS Code with an MCP-compatible extension:

```json
{
  "mcp.servers": {
    "tideways": {
      "command": "npx",
      "args": ["tideways-mcp-server"],
      "env": {
        "TIDEWAYS_TOKEN": "your_token",
        "TIDEWAYS_ORG": "your_org",
        "TIDEWAYS_PROJECT": "your_project"
      }
    }
  }
}
```

### Using with AI Assistants

Once configured, you can ask your AI assistant questions like:

#### Basic Performance Queries
- "What's the current performance of my application?"
- "Show me recent errors in the last 24 hours"
- "How is my API performing compared to yesterday?"
- "What are the slowest transactions right now?"

#### Advanced Trace Analysis & Optimization
- "Analyze the `/api/users/{id}` endpoint and identify bottlenecks"
- "Find the root cause of slow performance in my checkout process"
- "Detect N+1 queries in my product listing endpoint and suggest fixes"
- "Analyze traces for `/dashboard` and recommend code optimizations"
- "Identify database query bottlenecks in my user authentication flow"
- "Find memory leaks or inefficient code paths in my API endpoints"
- "Analyze dependency injection overhead in my application"
- "Detect redundant database calls and suggest caching strategies"

#### Performance Optimization Suggestions
- "Recommend performance improvements for my slowest endpoints"
- "Analyze my SQL queries and suggest indexing strategies"
- "Identify opportunities for query batching or lazy loading"
- "Find inefficient loops or recursive calls in my traces"
- "Suggest code refactoring based on performance bottlenecks"
- "Analyze memory usage patterns and recommend optimizations"

## Available MCP Tools

All tools return raw JSON from the Tideways API. The AI assistant (Claude, Cursor, etc.) performs the actual analysis and interpretation of this data.

### `get_performance_metrics`

Retrieve aggregate performance metrics and system-wide statistics.

**Parameters:**
- `ts` (optional): End timestamp in Y-m-d H:i format (e.g., "2025-08-12 18:30")
- `m` (optional): Number of minutes backward from timestamp (e.g., 60 for 1 hour, 1440 for 24 hours)
- `env` (optional): Filter by specific environment
- `s` (optional): Filter by specific service name

**Conversational Examples:**
```
"What's the current performance of my application?"
"Show me performance metrics for the last 6 hours"
"Get metrics for the API service in production"
"How is my web service performing in the staging environment?"
"Compare today's metrics with the last 24 hours"
```

**Returns:** Raw performance data from Tideways including response times, throughput, error rates, and transaction breakdowns.

### `get_performance_summary`

Retrieve time-series performance summary data in 15-minute intervals for trend analysis.

**Parameters:**
- `s` (optional): Service name to filter by (e.g., "web", "api", "worker"). Default: "web"

**Conversational Examples:**
```
"Show me performance trends over the last few hours"
"Get the performance summary for my API service"
"How has my web service been performing recently?"
"Display trends for the worker service"
"Show me response time patterns for today"
```

**Returns:** Raw time-series data with 15-minute intervals showing response times, request counts, and error rates.

### `get_issues`

Retrieve and analyze recent errors, exceptions, and performance issues.

**Parameters:**
- `issue_type` (optional): "error", "slowsql", "deprecated", "all" (default: "all")
- `status` (optional): "open", "new", "resolved", "not_error", "ignored", "all" (default: "open")
- `page` (optional): Page number for pagination (default: 1)

**Conversational Examples:**
```
"What errors are currently happening in my application?"
"Show me all open errors from the last 24 hours"
"Get slow SQL queries that need attention"
"Are there any new performance issues I should know about?"
"List all deprecated function calls in my code"
"Show me resolved errors to understand what was fixed"
```

**Returns:** Raw issue data from Tideways including error types, occurrence counts, affected endpoints, and stack traces where available.

### `get_traces`

Analyze individual trace samples for detailed bottleneck identification and performance debugging.

**Parameters:**
- `env` (optional): Environment name (e.g., "production", "staging")
- `s` (optional): Service name (e.g., "web", "api", "worker")
- `transaction_name` (optional): Filter by specific transaction/endpoint name
- `has_callgraph` (optional): Only return traces with detailed callgraph data
- `search` (optional): Word-based search on transaction_name, host, and URL
- `min_date` (optional): Minimal date in YYYY-MM-DD HH:MM format (requires max_date)
- `max_date` (optional): Maximal date in YYYY-MM-DD HH:MM format (requires min_date)
- `min_response_time_ms` (optional): Minimum response time filter
- `max_response_time_ms` (optional): Maximum response time filter
- `sort_by` (optional): "response_time", "date", "memory" (default: "response_time")
- `sort_order` (optional): "ASC", "DESC" (default: "DESC")

**Conversational Examples:**
```
"Analyze traces for the /api/products endpoint and find bottlenecks"
"Show me the slowest requests from the last hour with details"
"Find traces with callgraph data for the checkout process"
"What's causing slow response times in my user registration flow?"
"Detect N+1 query problems in my product listing page"
"Analyze memory usage patterns in my API endpoints"
"Find database bottlenecks in the /dashboard endpoint"
"Show me traces where response time is over 2 seconds"
```

**Returns:** Raw trace data from Tideways including per-request timing, layer breakdown (SQL, Redis, HTTP, etc.), bottleneck flags, and callgraph data when `has_callgraph: true` is set. Use `has_callgraph: true` for the deepest debugging detail.

### `get_historical_data`

Retrieve historical performance data for specific dates with configurable granularity.

**Parameters:**
- `date` (required): Date in YYYY-MM-DD format
- `granularity` (optional): "day", "week", "month" (default: "day")

**Conversational Examples:**
```
"Get historical performance data for August 1st, 2025"
"Show me weekly performance trends for last Monday"
"Compare this month's performance with last month"
"How did my application perform on 2025-07-15?"
"Get daily performance data for the past week"
"Show me monthly trends for the last quarter"
```

**Returns:** Raw historical performance data from Tideways for the specified date and granularity.

## Development

### Project Structure

```
├── src/
│   ├── config/           # Configuration management
│   ├── lib/              # Core libraries
│   │   ├── errors.ts     # Error handling utilities
│   │   ├── logger.ts     # Structured logging
│   │   └── tideways-client.ts  # Tideways API client
│   ├── tools/            # MCP tool implementations
│   │   ├── definitions.ts # Tool schema definitions
│   │   ├── registry.ts   # Tool execution registry
│   │   └── handlers/     # Individual tool handlers
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Utility functions
│   ├── server.ts         # Main MCP server implementation
│   └── index.ts          # Application entry point
├── tests/                # Test suites
└── dist/                 # Compiled JavaScript (generated)
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch

# Run type checking
npm run typecheck
```

### Building

```bash
# Build TypeScript to JavaScript
npm run build

# Clean build artifacts
npm run clean
```

### Code Quality

```bash
# Run linter
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format
```

## Architecture

### Core Components

1. **MCP Server** (`src/server.ts`): Main server implementing MCP protocol, handles tool definitions and routing
2. **Tideways API Client** (`src/lib/tideways-client.ts`): HTTP client with rate limiting, retry logic, and security measures
3. **Tool Registry** (`src/tools/`): Modular tool system with individual handlers for each MCP tool
4. **Error Handler** (`src/lib/errors.ts`): Centralized error handling with user-friendly messages
5. **Logger** (`src/lib/logger.ts`): Structured JSON logging for monitoring and debugging
6. **Configuration** (`src/config/index.ts`): Environment-based configuration management

### Data Flow

```
AI Assistant ←→ MCP Protocol (stdio) ←→ TidewaysMCPServer → TidewaysClient → Tideways API
                                               ↓
                                        Raw JSON Response → AI Assistant
```

### Response Format Philosophy

This server uses a **raw JSON approach** for optimal performance:
- **Direct API-to-LLM Pipeline**: Tools return `JSON.stringify(apiData, null, 2)` without formatting
- **Zero Processing Overhead**: No complex formatting, caching, or interpretation logic
- **Complete Data Preservation**: LLM receives all available data for flexible analysis
- **Minimal Maintenance**: No formatter or caching logic to maintain or debug

### Rate Limiting Strategy

- **Configurable Rate Limiter**: Set `TIDEWAYS_RATE_LIMIT` to match your Tideways plan (default: 2500/hr)
- **Direct API Calls**: All requests go directly to Tideways API without caching layer
- **Retry Logic**: Automatic retries for transient failures with exponential backoff

## 🛡️ Security

- API tokens stored securely in environment variables
- Authorization headers automatically redacted in logs as `Bearer [REDACTED]`
- Rate limiting to respect Tideways API constraints
- Input validation on all MCP function parameters
- No sensitive data logged or exposed in error messages
- Automated security scanning: CodeQL, Snyk, TruffleHog, GitLeaks

## 📊 Monitoring

The server provides structured JSON logs for monitoring:

```json
{
  "timestamp": "2025-08-09T10:00:00.000Z",
  "level": "info",
  "message": "Tool called",
  "context": {
    "toolName": "get_performance_metrics",
    "arguments": {"time_range": "24h"}
  }
}
```

## 🔧 Troubleshooting

### Common Issues

**Authentication Error**
```
Error: Authentication failed. Please check your API token.
```
- Verify `TIDEWAYS_TOKEN` is correct and has required scopes (`metrics`, `issues`, `traces`)
- Check token hasn't expired
- Ensure organization and project names are correct

**Rate Limit Exceeded**
```
Error: Rate limit exceeded. Please try again later.
```
- Set `TIDEWAYS_RATE_LIMIT` to match your actual plan limit
- Wait for rate limit reset (shown in error message)
- Built-in rate limiting respects your configured limit

**Connection Issues**
```
Error: Network error: Unable to connect to Tideways API.
```
- Check internet connection
- Verify Tideways API is accessible from your network
- Check if corporate firewall blocks API access to `app.tideways.io`
- Test with curl: `curl -H "Authorization: Bearer YOUR_TOKEN" https://app.tideways.io/apps/api/_token`

**MCP Integration Issues**
```
Error: MCP server not responding or connection failed
```
- Restart your AI assistant (Claude Desktop, Cursor, etc.)
- Verify MCP configuration file syntax is correct
- Check that the server command path is correct
- Ensure environment variables are properly set in MCP config
- Try running the server manually first: `npx tideways-mcp-server`

### Debug Mode

Enable debug logging for detailed troubleshooting:

```bash
# When running directly
LOG_LEVEL=debug npx tideways-mcp-server

# In MCP configuration, add to env:
{
  "env": {
    "LOG_LEVEL": "debug",
    "TIDEWAYS_TOKEN": "your_token",
    ...
  }
}
```

### Getting Help

1. **Check the logs**: Debug mode provides detailed information about requests and responses
2. **Verify configuration**: Double-check all environment variables and MCP settings
3. **Test API access**: Use curl to verify your Tideways API credentials work
4. **Report issues**: [GitHub Issues](https://github.com/5hahiL/tideways-mcp-server/issues) with debug logs and configuration details

## Contributing

Contributions welcome!

1. Create a feature branch: `git checkout -b your-feature`
2. Make changes and add tests: `npm test`
3. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
