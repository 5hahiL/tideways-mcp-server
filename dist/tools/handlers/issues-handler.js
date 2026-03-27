import { TidewaysAPIError, ErrorHandler } from '../../lib/errors.js';
export async function handleGetIssues(client, params) {
    try {
        const issuesData = await client.getIssues(params);
        return JSON.stringify(issuesData, null, 2);
    }
    catch (error) {
        if (error instanceof TidewaysAPIError)
            throw error;
        throw ErrorHandler.handleApiError(error);
    }
}
//# sourceMappingURL=issues-handler.js.map