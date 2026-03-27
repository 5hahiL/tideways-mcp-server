export interface TidewaysPerformanceData {
    timestamp: string;
    summary: {
        total_requests: number;
        error_rate_percent: number;
        response_time_average: number;
        response_time_p95: number;
    };
    transactions: Array<{
        name: string;
        requests: number;
        response_time_average: number;
        error_rate: number;
    }>;
    downstream: {
        sql?: {
            average: number;
        };
        redis?: {
            average: number;
        };
        http?: {
            average: number;
        };
    };
}
export interface TidewaysPerformanceSummaryData {
    summary: {
        by_time: Record<string, {
            requests: number;
            errors: number;
            percentile_95p: number;
        }>;
        criteria: {
            service: string;
            environment: string;
            start: string;
            end: string;
        };
    };
}
export interface TidewaysIssue {
    id: string;
    exceptionType: string;
    lastMessage: string;
    occurrences: number;
    lastOccurred: string;
    source: string;
    environments: string[];
    transactions: string[];
    status: string;
    firstOccurred?: string;
    context?: Record<string, any>;
    lastStackTrace?: Array<{
        file: string;
        function?: string;
        line: number;
    }>;
}
export interface TidewaysIssuesResponse {
    issues: TidewaysIssue[];
    criteria: {
        page: number;
        status: string;
        environment?: string;
        organization: string;
        application: string;
        range?: {
            startDate: string;
            endDate: string;
            minutes: number;
        };
        service?: string;
    };
}
export interface TidewaysTrace {
    id: string;
    transaction_name: string;
    environment: string;
    date: string;
    response_time_ms: number;
    memory_kb?: number;
    has_callgraph: boolean;
    server: string;
    service: string;
    bottlenecks: string[];
    layers: TraceLayer[];
    http?: {
        status_code: number;
        url: string;
        method: string;
    };
    error_type?: string;
    _links: {
        html_url: string;
    };
}
export interface TraceLayer {
    name: string;
    perc: number;
    latency_sum_ms: number;
    count: number;
}
export interface TidewaysTracesResponse {
    traces: TidewaysTrace[];
}
export interface CallgraphSpan {
    id: string;
    parent_id?: string;
    name: string;
    category: string;
    duration_ms: number;
    annotations?: Record<string, string | number | boolean>;
    children?: CallgraphSpan[];
}
export interface TidewaysTraceDetail extends TidewaysTrace {
    callgraph?: {
        spans: CallgraphSpan[];
    };
    annotations?: Record<string, string | number | boolean>;
    sql_queries?: Array<{
        query: string;
        duration_ms: number;
        count?: number;
    }>;
    cache_calls?: Array<{
        command: string;
        duration_ms: number;
        count?: number;
    }>;
}
export interface TidewaysErrorDetail extends TidewaysIssue {
    stackTraces?: Array<{
        occurred_at: string;
        stack: Array<{
            file: string;
            function?: string;
            line: number;
            code?: string;
        }>;
    }>;
    affectedUsers?: number;
    httpRequests?: Array<{
        url: string;
        method: string;
        status_code: number;
    }>;
}
export interface TidewaysHistoryResponse {
    _links: {
        self: {
            href: string;
        };
        next?: {
            href: string;
        };
        previous?: {
            href: string;
        };
        chart: Array<{
            href: string;
            type: 'image/svg+xml' | 'image/png';
        }>;
    };
    date_range: {
        start: string;
        end: string;
        granularity: 'day' | 'week' | 'month';
    };
    report: {
        response_time_p95: number;
        total_requests: number;
        error_rate_percent: number;
    };
    history: {
        by_time: Record<string, {
            requests: number;
            errors: number;
            percentile_95p: number;
        }>;
    };
    transaction_report: HistoryTransactionReport[];
}
export interface HistoryTransactionReport {
    name: string;
    response_time_p95: number;
    response_time_worst: number;
    response_time_average: number;
    total_requests: number;
    memory_max: number;
    impact_percent: number;
}
//# sourceMappingURL=tideways-api.d.ts.map