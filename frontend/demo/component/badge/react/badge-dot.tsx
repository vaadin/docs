import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import '@vaadin/vaadin-lumo-styles/vaadin-iconset.js';
import { Badge, HorizontalLayout, Button, Icon } from '@vaadin/react-components';

function Example() {
  return (
    <HorizontalLayout theme="spacing" style={{ alignItems: 'center' }}>
      {/* tag::snippet[] */}
      <Badge theme="dot">Pending</Badge>
      <Badge theme="dot success">Confirmed</Badge>
      <Badge theme="dot warning">Warning</Badge>
      <Badge theme="dot error">Denied</Badge>

      <Button theme="icon" aria-label="Downloads">
        <Icon icon="lumo:download" />
        <Badge
          slot="suffix"
          theme="dot success"
          number={3}
          style={{ position: 'absolute', top: '0.3em', right: '0.3em' }}
        >
          completed
        </Badge>
      </Button>
      {/* end::snippet[] */}
    </HorizontalLayout>
  );
}

export default reactExample(Example); // hidden-source-line
