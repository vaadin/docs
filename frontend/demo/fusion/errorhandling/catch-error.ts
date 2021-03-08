import { EndpointError } from '@vaadin/flow-frontend';

import * as dataEndpoint from 'Frontend/generated/DataEndpoint';

export async function callEndpoint() {
  try {
    await dataEndpoint.getViewData();
  } catch (error) {
    console.warn(error.message); // "Not implemented"
    if (error instanceof EndpointError) {
      console.warn(error.type); // "com.vaadin.flow.server.connect.exception.EndpointException"
    }
  }
}
