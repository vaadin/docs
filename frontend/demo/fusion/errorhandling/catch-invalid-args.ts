import * as dataEndpoint from '../../../generated/DateEndpoint';
import { EndpointValidationError } from '@vaadin/flow-frontend';

export async function callEndpoint() {
  try {
    const tomorrow = await dataEndpoint.getTomorrow("illegal date");
    console.log(tomorrow);
    // handle result...
  } catch (error) {
    if (error instanceof EndpointValidationError) {
      error.validationErrorData.forEach(({parameterName, message}) => {
        console.warn(parameterName); // "date"
        console.warn(message); // "Unable to deserialize an endpoint method parameter into type 'java.time.LocalDate'"
      });
    } else {
      // handle other error types...
    }
  }
}
