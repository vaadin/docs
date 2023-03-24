import { EndpointError } from '@hilla/frontend';

import { DataEndpoint } from 'Frontend/generated/endpoints.js';

export async function callEndpoint() {
  try {
    await DataEndpoint.getViewData();
  } catch (error) {
    if (error instanceof EndpointError) {
      console.warn((error as EndpointError).message); // "Not implemented"
      console.warn((error as EndpointError).type); // "dev.hilla.exception.EndpointException"
    }
  }
}
