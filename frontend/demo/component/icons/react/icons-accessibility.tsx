import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import { Button } from '@vaadin/react-components/Button.js';
import { Icon } from '@vaadin/react-components/Icon.js';

function Example() {
  return (
    // tag::snippet[]
    <Button aria-label="Close dialog" theme="icon">
      <Icon icon="vaadin:close" slot="prefix" />
    </Button>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
