import { EndpointError } from '@vaadin/hilla-frontend';
// Import the remote service
import { DataService } from 'Frontend/generated/endpoints';

// Wrap service calls to return fallback data when offline
export async function getViewData() {
  try {
    return await DataService.getViewData();
  } catch (e) {
    if (!(e instanceof EndpointError)) {
      // Network failure: return fallback data
      return [];
    }

    // Service reached but returned abnormal status code:
    // pass exception on to caller
    throw e;
  }
}
