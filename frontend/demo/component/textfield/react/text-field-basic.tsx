import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { TextField } from '@hilla/react-components/TextField.js';
import { Icon } from '@hilla/react-components/Icon.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <TextField label="Street Address" value="Ruukinkatu 2" clearButtonVisible>
        <Icon slot="prefix" icon="vaadin:map-marker" />
      </TextField>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
