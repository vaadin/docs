import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Button, HorizontalLayout } from '@vaadin/react-components';

function Example() {
  return (
    <HorizontalLayout theme="spacing">
      {/* tag::snippet[] */}
      <Button theme="primary error">Primary</Button>
      <Button theme="secondary error">Secondary</Button>
      <Button theme="tertiary error">Tertiary</Button>
      {/* end::snippet[] */}
    </HorizontalLayout>
  );
}

export default reactExample(Example); // hidden-source-line
