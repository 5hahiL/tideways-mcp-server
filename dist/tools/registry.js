import { handleGetPerformanceMetrics } from './handlers/performance-handler.js';
import { handleGetPerformanceSummary } from './handlers/performance-summary-handler.js';
import { handleGetIssues } from './handlers/issues-handler.js';
import { handleGetTraces } from './handlers/traces-handler.js';
import { handleGetHistoricalData } from './handlers/historical-handler.js';
import { handleGetTraceDetail } from './handlers/trace-detail-handler.js';
import { handleGetErrorDetail } from './handlers/error-detail-handler.js';
const TOOL_HANDLERS = {
    get_performance_metrics: (client, params) => handleGetPerformanceMetrics(client, params),
    get_performance_summary: (client, params) => handleGetPerformanceSummary(client, params),
    get_issues: (client, params) => handleGetIssues(client, params),
    get_traces: (client, params) => handleGetTraces(client, params),
    get_historical_data: (client, params) => handleGetHistoricalData(client, params),
    get_trace_detail: (client, params) => handleGetTraceDetail(client, params),
    get_error_detail: (client, params) => handleGetErrorDetail(client, params),
};
export async function executeTool(toolName, params, client) {
    const handler = TOOL_HANDLERS[toolName];
    if (!handler) {
        throw new Error(`Unknown tool: ${toolName}`);
    }
    return handler(client, params);
}
//# sourceMappingURL=registry.js.map