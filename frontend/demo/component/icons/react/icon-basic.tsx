import '@vaadin/icons';
import React from 'react';
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js';
import { Icon } from '@vaadin/react-components/Icon.js';
import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line

function Example() {
  return (
    <HorizontalLayout theme="spacing" className="items-center">
      {/* tag::snippet[] */}
      <Icon icon="lumo:photo" />
      <Icon icon="vaadin:phone" />
      {/* end::snippet[] */}
    </HorizontalLayout>
  );
}

export default reactExample(Example); // hidden-source-line
