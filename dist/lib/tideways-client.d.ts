import { TidewaysConfig, TidewaysPerformanceData, TidewaysPerformanceSummaryData, TidewaysIssuesResponse, TidewaysTracesResponse, TidewaysHistoryResponse, TidewaysTraceDetail, TidewaysErrorDetail, GetPerformanceMetricsParams, GetPerformanceSummaryParams, GetTracesParams, GetIssuesParams } from '../types/index.js';
export declare class TidewaysClient {
    private client;
    private config;
    private rateLimiter;
    constructor(config: TidewaysConfig);
    private setupInterceptors;
    fetch<T>(endpoint: string, params?: Record<string, any>): Promise<T>;
    getPerformanceMetrics(params?: GetPerformanceMetricsParams): Promise<TidewaysPerformanceData>;
    getPerformanceSummary(params?: GetPerformanceSummaryParams): Promise<TidewaysPerformanceSummaryData>;
    getIssues(params?: GetIssuesParams): Promise<TidewaysIssuesResponse>;
    getTraces(params?: GetTracesParams): Promise<TidewaysTracesResponse>;
    getTraceDetail(traceId: string): Promise<TidewaysTraceDetail>;
    getErrorDetail(errorId: string): Promise<TidewaysErrorDetail>;
    getHistoricalData(date: string, granularity?: string): Promise<TidewaysHistoryResponse>;
    healthCheck(): Promise<{
        status: 'healthy' | 'unhealthy';
        message: string;
        details?: any;
    }>;
}
//# sourceMappingURL=tideways-client.d.ts.map