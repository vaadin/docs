import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import '@vaadin/horizontal-layout';
import '@vaadin/icon';
import '@vaadin/vaadin-lumo-styles/vaadin-iconset.js';
import '@vaadin/button';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js';
import { Icon } from '@hilla/react-components/Icon.js';
import { Button } from '@hilla/react-components/Button.js';

function Example() {
  return (
    <HorizontalLayout theme="spacing" className="items-center">
      {/* // tag::snippet[] */}
      <Icon icon="lumo:photo" />
      <Icon icon="lumo:calendar" />
      <Icon icon="lumo:clock" />
      <Button>
        <Icon icon="lumo:bell" />
      </Button>
      {/* // end::snippet[] */}
    </HorizontalLayout>
  );
}

export default reactExample(Example); // hidden-source-line
