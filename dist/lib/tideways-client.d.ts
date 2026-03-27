import { TidewaysConfig, TidewaysPerformanceData, TidewaysPerformanceSummaryData, TidewaysIssuesResponse, TidewaysTracesResponse, TidewaysHistoryResponse, GetPerformanceMetricsParams, GetPerformanceSummaryParams } from '../types/index.js';
export declare class TidewaysClient {
    private client;
    private config;
    private rateLimiter;
    constructor(config: TidewaysConfig);
    private setupInterceptors;
    fetch<T>(endpoint: string, params?: Record<string, any>): Promise<T>;
    getPerformanceMetrics(params?: GetPerformanceMetricsParams): Promise<TidewaysPerformanceData>;
    getPerformanceSummary(params?: GetPerformanceSummaryParams): Promise<TidewaysPerformanceSummaryData>;
    getIssues(params?: {
        issue_type?: string;
        status?: string;
        page?: number;
    }): Promise<TidewaysIssuesResponse>;
    getTraces(params?: {
        env?: string;
        s?: string;
        transaction_name?: string;
        has_callgraph?: boolean;
        search?: string;
        min_date?: string;
        max_date?: string;
        min_response_time_ms?: number;
        max_response_time_ms?: number;
        sort_by?: string;
        sort_order?: string;
    }): Promise<TidewaysTracesResponse>;
    getHistoricalData(date: string, granularity?: string): Promise<TidewaysHistoryResponse>;
    healthCheck(): Promise<{
        status: 'healthy' | 'unhealthy';
        message: string;
        details?: any;
    }>;
}
//# sourceMappingURL=tideways-client.d.ts.map