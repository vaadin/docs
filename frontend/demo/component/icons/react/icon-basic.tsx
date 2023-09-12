import React from 'react';

import '@vaadin/icons';
import '@vaadin/horizontal-layout'
import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import { Icon } from '@hilla/react-components/Icon.js';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js';

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
