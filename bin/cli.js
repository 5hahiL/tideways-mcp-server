#!/usr/bin/env node

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import { TidewaysMCPServer } from '../dist/server.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const packageJson = JSON.parse(
  readFileSync(join(__dirname, '..', 'package.json'), 'utf8')
);

function showHelp() {
  console.log(`
${packageJson.name} v${packageJson.version}

${packageJson.description}

Usage:
  npx ${packageJson.name} [options]

Options:
  --help, -h       Show this help message
  --version, -v    Show version information

Environment Variables (required):
  TIDEWAYS_TOKEN     Your Tideways API token
  TIDEWAYS_ORG       Your Tideways organization name
  TIDEWAYS_PROJECT   Your Tideways project name

Environment Variables (optional):
  TIDEWAYS_RATE_LIMIT      API requests per hour limit (default: 2500)
  TIDEWAYS_MAX_RETRIES     Max retry attempts (default: 3)
  TIDEWAYS_REQUEST_TIMEOUT Request timeout in ms (default: 30000)
  TIDEWAYS_BASE_URL        API base URL
  LOG_LEVEL                Log level: debug, info, warn, error (default: info)

Examples:
  # Start MCP server
  npx ${packageJson.name}
  
  # Show version
  npx ${packageJson.name} --version

For more information, visit: ${packageJson.homepage}
`);
}

function showVersion() {
  console.log(`${packageJson.name} v${packageJson.version}`);
}

async function main() {
  const args = process.argv.slice(2);
  
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    switch (arg) {
      case '--help':
      case '-h':
        showHelp();
        process.exit(0);
        break;
        
      case '--version':
      case '-v':
        showVersion();
        process.exit(0);
        break;
        
        
      default:
        console.error(`Error: Unknown option '${arg}'`);
        console.error('Use --help for usage information');
        process.exit(1);
    }
  }
  
  try {
    const server = new TidewaysMCPServer();
    await server.start();
  } catch (error) {
    console.error('Error starting server:', error.message);
    process.exit(1);
  }
}

// Signal handlers are registered by server.ts for graceful shutdown.
// Do not duplicate them here — it races with the server's async teardown.

main().catch(error => {
  console.error('Fatal error:', error.message);
  process.exit(1);
});