import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import { ProgressBar } from '@vaadin/react-components/ProgressBar.js';

function Example() {
  return (
    // tag::snippet[]
    <div>
      <ProgressBar value={0.5} />
    </div>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
