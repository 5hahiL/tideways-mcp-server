import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema, McpError, } from '@modelcontextprotocol/sdk/types.js';
import { TidewaysClient } from './lib/tideways-client.js';
import { logger } from './lib/logger.js';
import { loadConfig } from './config/index.js';
import { ErrorHandler, TidewaysAPIError } from './lib/errors.js';
import { getToolDefinitions } from './tools/definitions.js';
import { executeTool } from './tools/registry.js';
import packageJson from '../package.json' with { type: 'json' };
const SERVER_VERSION = packageJson.version;
export class TidewaysMCPServer {
    server;
    tidewaysClient;
    config;
    constructor() {
        this.config = loadConfig();
        this.tidewaysClient = new TidewaysClient(this.config);
        this.server = new Server({
            name: 'tideways-mcp-server',
            version: SERVER_VERSION,
        }, {
            capabilities: {
                tools: {},
            },
        });
        this.setupHandlers();
    }
    setupHandlers() {
        this.server.setRequestHandler(ListToolsRequestSchema, async () => {
            return {
                tools: getToolDefinitions(),
            };
        });
        this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
            const { name, arguments: args } = request.params;
            logger.info('Tool called', { toolName: name, arguments: args });
            try {
                const result = await executeTool(name, args, this.tidewaysClient);
                return {
                    content: [
                        {
                            type: 'text',
                            text: result,
                        },
                    ],
                };
            }
            catch (error) {
                logger.error('Tool execution failed', error, { toolName: name, arguments: args });
                const tidewaysError = error instanceof TidewaysAPIError
                    ? error
                    : ErrorHandler.handleApiError(error);
                throw new McpError(ErrorHandler.getJsonRpcErrorCode(tidewaysError), ErrorHandler.formatErrorForUser(tidewaysError), {
                    category: tidewaysError.category,
                    statusCode: tidewaysError.statusCode,
                    retryAfter: tidewaysError.retryAfter
                });
            }
        });
    }
    async start() {
        logger.info('Starting Tideways MCP Server', {
            version: SERVER_VERSION,
            organization: this.config.organization,
            project: this.config.project,
        });
        try {
            const health = await this.tidewaysClient.healthCheck();
            if (health.status === 'healthy') {
                logger.info('Tideways API connection verified');
            }
            else {
                logger.warn('Tideways API health check failed, but starting server anyway', health);
            }
        }
        catch (error) {
            logger.warn('Tideways API health check failed, but starting server anyway', {
                error: error.message,
            });
        }
        const transport = new StdioServerTransport();
        await this.server.connect(transport);
        logger.info('Tideways MCP Server started successfully');
        process.on('SIGINT', () => this.shutdown());
        process.on('SIGTERM', () => this.shutdown());
    }
    async shutdown() {
        logger.info('Shutting down Tideways MCP Server');
        await this.server.close();
        process.exit(0);
    }
}
//# sourceMappingURL=server.js.map