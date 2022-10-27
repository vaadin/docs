import { EndpointError } from '@hilla/frontend';

// Import the remote endpoint
import { DataEndpoint } from 'Frontend/generated/endpoints';

// Wrap endpoint calls to return fallback data when offline
export async function getViewData() {
  try {
    return await DataEndpoint.getViewData();
  } catch (e) {
    if (!(e instanceof EndpointError)) {
      // Network failure: return fallback data
      return [];
    }

    // Endpoint reached but returned abnormal status code:
    // pass exception on to caller
    throw e;
  }
}
