import { EndpointError } from '@vaadin/fusion-frontend';

import { DataEndpoint } from 'Frontend/generated/endpoints';

export async function callEndpoint() {
  try {
    await DataEndpoint.getViewData();
  } catch (error: any) {
    if (error instanceof EndpointError) {
      console.warn(error.message); // "Not implemented"
      console.warn(error.type); // "com.vaadin.fusion.exception.EndpointException"
    }
  }
}
