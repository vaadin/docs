import { EndpointError } from '@hilla/frontend';

// import the remote endpoint
import { DataEndpoint } from 'Frontend/generated/endpoints';

// wrap endpoint calls to return fallback data when offline
export async function getViewData() {
  try {
    return await DataEndpoint.getViewData();
  } catch (e) {
    if (!(e instanceof EndpointError)) {
      // network failure: return fallback data
      return [];
    } else {
      // endpoint reached but returned abnormal status code:
      // pass exception on to caller
      throw e;
    }
  }
}
