import { TidewaysAPIError, ErrorHandler } from '../../lib/errors.js';
export async function handleGetHistoricalData(client, params) {
    try {
        const { date, granularity = 'day' } = params;
        const historicalData = await client.getHistoricalData(date, granularity);
        return JSON.stringify(historicalData, null, 2);
    }
    catch (error) {
        if (error instanceof TidewaysAPIError)
            throw error;
        throw ErrorHandler.handleApiError(error);
    }
}
//# sourceMappingURL=historical-handler.js.map