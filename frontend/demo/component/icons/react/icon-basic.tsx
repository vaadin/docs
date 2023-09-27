import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Icon } from '@hilla/react-components/Icon.js';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js';
import '@vaadin/icons';

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
