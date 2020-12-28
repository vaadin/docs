import { EndpointError } from '@vaadin/flow-frontend';

// import the remote endpoint
import * as dataEndpoint from '../../../generated/DataEndpoint';

// wrap endpoint calls to return fallback data when offline
export async function getViewData() {
  try {
    return await dataEndpoint.getViewData();
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
