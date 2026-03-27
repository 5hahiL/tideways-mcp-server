class ConsoleLogger {
    shouldLog(level) {
        const logLevel = process.env.LOG_LEVEL?.toLowerCase() || 'info';
        const levels = {
            debug: 0,
            info: 1,
            warn: 2,
            error: 3,
        };
        return levels[level] >= levels[logLevel];
    }
    formatMessage(level, message, context) {
        const timestamp = new Date().toISOString();
        const logEntry = {
            timestamp,
            level,
            message,
            ...(context && { context }),
        };
        return JSON.stringify(logEntry);
    }
    debug(message, context) {
        if (this.shouldLog('debug')) {
            process.stderr.write(this.formatMessage('debug', message, context) + '\n');
        }
    }
    info(message, context) {
        if (this.shouldLog('info')) {
            process.stderr.write(this.formatMessage('info', message, context) + '\n');
        }
    }
    warn(message, context) {
        if (this.shouldLog('warn')) {
            process.stderr.write(this.formatMessage('warn', message, context) + '\n');
        }
    }
    error(message, error, context) {
        if (this.shouldLog('error')) {
            const errorContext = {
                ...context,
                ...(error && {
                    error: {
                        message: error.message,
                        stack: error.stack,
                        name: error.name,
                    },
                }),
            };
            process.stderr.write(this.formatMessage('error', message, errorContext) + '\n');
        }
    }
}
export const logger = new ConsoleLogger();
//# sourceMappingURL=logger.js.map