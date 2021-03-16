import { EndpointError } from '@vaadin/flow-frontend';

import { DataEndpoint } from 'Frontend/generated/DataEndpoint';

export async function callEndpoint() {
  try {
    await DataEndpoint.getViewData();
  } catch (error) {
    console.warn(error.message); // "Not implemented"
    if (error instanceof EndpointError) {
      console.warn(error.type); // "com.vaadin.flow.server.connect.exception.EndpointException"
    }
  }
}
