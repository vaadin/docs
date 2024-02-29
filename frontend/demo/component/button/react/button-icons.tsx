import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Button, HorizontalLayout, Icon, Tooltip } from '@vaadin/react-components';
import '@vaadin/icons';

function Example() {
  return (
    <HorizontalLayout theme="spacing">
      {/* tag::snippet[] */}
      {/* Icon button using an aria-label to provide a textual alternative
          to screen readers  */}
      <Button theme="icon" aria-label="Add item">
        <Icon icon="vaadin:plus" />
      </Button>

      {/* Icon button using a tooltip to provide a textual description of
          the action that it triggers */}
      <Button theme="icon" aria-label="Close">
        <Icon icon="vaadin:close-small" />
        <Tooltip slot="tooltip" text="Close the dialog" />
      </Button>

      <Button>
        <Icon icon="vaadin:arrow-left" slot={'prefix'} />
        Left
      </Button>

      <Button>
        Right
        <Icon icon="vaadin:arrow-right" slot={'suffix'} />
      </Button>
      {/* end::snippet[] */}
    </HorizontalLayout>
  );
}

export default reactExample(Example); // hidden-source-line
