import '@vaadin/vaadin-lumo-styles/vaadin-iconset.js';
import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Button } from '@vaadin/react-components/Button.js';
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js';
import { Icon } from '@vaadin/react-components/Icon.js';

function Example() {
  return (
    <HorizontalLayout theme="spacing" className="items-center">
      {/* // tag::snippet[] */}
      <Icon icon="lumo:photo" />
      <Icon icon="lumo:calendar" />
      <Icon icon="lumo:clock" />
      <Button theme="icon">
        <Icon icon="lumo:bell" />
      </Button>
      {/* // end::snippet[] */}
    </HorizontalLayout>
  );
}

export default reactExample(Example); // hidden-source-line
