import '@vaadin/icons';
import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Icon } from '@vaadin/react-components/Icon.js';
import { TextField } from '@vaadin/react-components/TextField.js';

function Example() {
  return (
    // tag::snippet[]
    <TextField label="Street Address" value="Ruukinkatu 2" clearButtonVisible>
      <Icon slot="prefix" icon="vaadin:map-marker" />
    </TextField>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
