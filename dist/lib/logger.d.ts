import { Logger, LogContext } from '../types/index.js';
declare class ConsoleLogger implements Logger {
    private shouldLog;
    private formatMessage;
    debug(message: string, context?: LogContext): void;
    info(message: string, context?: LogContext): void;
    warn(message: string, context?: LogContext): void;
    error(message: string, error?: Error, context?: LogContext): void;
}
export declare const logger: ConsoleLogger;
export {};
//# sourceMappingURL=logger.d.ts.map