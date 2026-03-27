import { ErrorCategory, TidewaysError } from '../types/index.js';
export declare class TidewaysAPIError extends Error implements TidewaysError {
    category: ErrorCategory;
    statusCode?: number;
    retryAfter?: number;
    constructor(message: string, category: ErrorCategory, statusCode?: number, retryAfter?: number);
}
export declare class ErrorHandler {
    static getJsonRpcErrorCode(error: TidewaysAPIError): number;
    static handleApiError(error: any): TidewaysAPIError;
    static handleValidationError(message: string): TidewaysAPIError;
    static formatErrorForUser(error: TidewaysAPIError): string;
    static handlePartialFailure(errors: TidewaysAPIError[], partialData?: any): string;
    static isRetryable(error: TidewaysAPIError): boolean;
    static getRetryDelay(error: TidewaysAPIError, attempt: number): number;
}
//# sourceMappingURL=errors.d.ts.map