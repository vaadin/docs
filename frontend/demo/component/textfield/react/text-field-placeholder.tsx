import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { TextField } from '@hilla/react-components/TextField.js';
import { Icon } from '@hilla/react-components/Icon.js';
import '@vaadin/icons';

function Example() {
  return (
    // tag::snippet[]
    <TextField placeholder="Search">
      <Icon slot="prefix" icon="vaadin:search" />
    </TextField>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
