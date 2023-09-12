import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import '@vaadin/horizontal-layout';
import '@vaadin/icon';
import '@vaadin/icons';
import '@vaadin/button';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js';
import { Icon } from '@hilla/react-components/Icon.js';
import { Button } from '@hilla/react-components/Button.js';

function Example() {
  return (
    <HorizontalLayout theme="spacing" className="items-center">
      {/* // tag::snippet[] */}
      <Icon icon="vaadin:phone" />
      <Icon icon="vaadin:calendar" />
      <Icon icon="vaadin:alarm" />
      <Button>
        <Icon icon="vaadin:bell" />
      </Button>
      {/* // end::snippet[] */}
    </HorizontalLayout>
  );
}

export default reactExample(Example); // hidden-source-line
