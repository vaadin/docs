import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Button, Popover, TextField } from '@vaadin/react-components';

function Example() {
  return (
    <>
      <Button id="target">Discount</Button>
      {/* tag::snippet[] */}
      <Popover for="target" modal withBackdrop>
        <TextField label="Discount code" />
        <Button>Apply</Button>
      </Popover>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
