export interface GetPerformanceMetricsParams {
    ts?: string;
    m?: number;
    env?: string;
    s?: string;
}
export interface GetPerformanceSummaryParams {
    s?: string;
}
export interface GetIssuesParams {
    issue_type?: 'error' | 'slowsql' | 'deprecated' | 'all';
    status?: 'open' | 'new' | 'resolved' | 'not_error' | 'ignored' | 'all';
    page?: number;
}
export interface GetHistoricalDataParams {
    date: string;
    granularity?: 'day' | 'week' | 'month';
}
export interface GetTracesParams {
    env?: string;
    s?: string;
    transaction_name?: string;
    has_callgraph?: boolean;
    search?: string;
    min_date?: string;
    max_date?: string;
    min_response_time_ms?: number;
    max_response_time_ms?: number;
    sort_by?: 'response_time' | 'date' | 'memory';
    sort_order?: 'ASC' | 'DESC';
    annotation?: string;
}
//# sourceMappingURL=mcp.d.ts.map