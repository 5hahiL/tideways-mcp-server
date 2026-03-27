import { TidewaysAPIError, ErrorHandler } from '../../lib/errors.js';
export async function handleGetPerformanceSummary(client, params) {
    try {
        const summaryData = await client.getPerformanceSummary(params);
        return JSON.stringify(summaryData, null, 2);
    }
    catch (error) {
        if (error instanceof TidewaysAPIError)
            throw error;
        throw ErrorHandler.handleApiError(error);
    }
}
//# sourceMappingURL=performance-summary-handler.js.map