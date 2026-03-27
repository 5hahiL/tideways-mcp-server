import { TidewaysAPIError, ErrorHandler } from '../../lib/errors.js';
export async function handleGetPerformanceMetrics(client, params) {
    try {
        const performanceData = await client.getPerformanceMetrics(params);
        return JSON.stringify(performanceData, null, 2);
    }
    catch (error) {
        if (error instanceof TidewaysAPIError)
            throw error;
        throw ErrorHandler.handleApiError(error);
    }
}
//# sourceMappingURL=performance-handler.js.map