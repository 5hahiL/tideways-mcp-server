import { TidewaysClient } from '../../lib/tideways-client.js';
import { TidewaysAPIError, ErrorHandler } from '../../lib/errors.js';
import { GetErrorDetailParams } from '../../types/index.js';

export async function handleGetErrorDetail(
  client: TidewaysClient,
  params: GetErrorDetailParams
): Promise<string> {
  try {
    if (!params.error_id) {
      throw ErrorHandler.handleValidationError('error_id is required');
    }

    const errorDetail = await client.getErrorDetail(params.error_id);
    return JSON.stringify(errorDetail, null, 2);
  } catch (error) {
    if (error instanceof TidewaysAPIError) {
      if (error.statusCode === 404) {
        throw new TidewaysAPIError(
          `Error with ID "${params.error_id}" not found. Verify the ID from get_issues results.`,
          'api', 404
        );
      }
      throw error;
    }
    throw ErrorHandler.handleApiError(error);
  }
}
