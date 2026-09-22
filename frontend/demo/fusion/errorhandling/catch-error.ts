import { EndpointError } from '@vaadin/hilla-frontend';
import { DataService } from 'Frontend/generated/endpoints';

export async function callService() {
  try {
    await DataService.getViewData();
  } catch (error) {
    if (error instanceof EndpointError) {
      console.warn(error.message); // "Not implemented"
      console.warn(error.type); // "com.vaadin.hilla.exception.EndpointException"
    }
  }
}
