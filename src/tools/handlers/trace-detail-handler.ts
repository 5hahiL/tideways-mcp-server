import { TidewaysClient } from '../../lib/tideways-client.js';
import { TidewaysAPIError, ErrorHandler } from '../../lib/errors.js';
import { GetTraceDetailParams } from '../../types/index.js';

export async function handleGetTraceDetail(
  client: TidewaysClient,
  params: GetTraceDetailParams
): Promise<string> {
  try {
    if (!params.trace_id) {
      throw ErrorHandler.handleValidationError('trace_id is required');
    }

    const traceDetail = await client.getTraceDetail(params.trace_id);
    return JSON.stringify(traceDetail, null, 2);
  } catch (error) {
    if (error instanceof TidewaysAPIError) {
      if (error.statusCode === 404) {
        throw new TidewaysAPIError(
          `Trace with ID "${params.trace_id}" not found. Verify the ID from get_traces results.`,
          'api', 404
        );
      }
      throw error;
    }
    throw ErrorHandler.handleApiError(error);
  }
}
