import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { TextField } from '@hilla/react-components/TextField.js';
import { Icon } from '@hilla/react-components/Icon.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <TextField placeholder="Search" renderPrefix={() => <Icon icon="vaadin:search" />} />
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
