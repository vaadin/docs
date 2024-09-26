import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import { Button } from '@vaadin/react-components/Button.js';
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js';

function Example() {
  return (
    <HorizontalLayout theme="spacing">
      {/* tag::snippet[] */}
      <Button theme="primary contrast">Primary</Button>
      <Button theme="secondary contrast">Secondary</Button>
      <Button theme="tertiary contrast">Tertiary (avoid)</Button>
      {/* end::snippet[] */}
    </HorizontalLayout>
  );
}

export default reactExample(Example); // hidden-source-line
