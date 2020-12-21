import { EndpointError } from '@vaadin/flow-frontend';

// import the remote endpoint
import * as dataEndpoint from '../../../generated/DataEndpoint';

// Wrap endpoint calls to return fallback data when offline
// @ts-ignore
async function getViewData() {
  try {
    return await dataEndpoint.getViewData();
  } catch (e) {
    if (!(e instanceof EndpointError)) {
      // network failure, return fallback data
      return [];
    }
  }
}
