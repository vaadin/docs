import { EndpointError } from '@vaadin/hilla-frontend';
import { DataEndpoint } from 'Frontend/generated/endpoints';

export async function callEndpoint() {
  try {
    await DataEndpoint.getViewData();
  } catch (error) {
    if (error instanceof EndpointError) {
      console.warn(error.message); // "Not implemented"
      console.warn(error.type); // "com.vaadin.hilla.exception.EndpointException"
    }
  }
}
