import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import { LoginOverlay } from '@vaadin/react-components/LoginOverlay.js';

// tag::snippet[]
function Example() {
  return <LoginOverlay opened error no-autofocus />;
}
// end::snippet[]

export default reactExample(Example); // hidden-source-line
