import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js';
import { Icon } from '@hilla/react-components/Icon.js';
import { TextField } from '@hilla/react-components/TextField.js';
import '@vaadin/icons';

function Example() {
  return (
    <HorizontalLayout theme="spacing">
      {/* tag::snippet[] */}
      <TextField label="Username" placeholder="username" value="maverick">
        <Icon slot="prefix" icon="vaadin:user" />
      </TextField>

      <TextField
        label="Email Address"
        placeholder="name"
        value="michael"
        theme="align-right"
        maxlength={7}
      >
        <div slot="suffix">@example.com</div>
      </TextField>
      {/* end::snippet[] */}
    </HorizontalLayout>
  );
}

export default reactExample(Example); // hidden-source-line
