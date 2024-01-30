import { EndpointError } from '@vaadin/hilla-core';

import { DataEndpoint } from 'Frontend/generated/endpoints';

export async function callEndpoint() {
  try {
    await DataEndpoint.getViewData();
  } catch (error) {
    if (error instanceof EndpointError) {
      console.warn((error as EndpointError).message); // "Not implemented"
      console.warn((error as EndpointError).type); // "com.vaadin.hilla.exception.EndpointException"
    }
  }
}
