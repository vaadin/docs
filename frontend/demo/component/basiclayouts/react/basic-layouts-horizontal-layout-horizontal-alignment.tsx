import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import { Button } from '@hilla/react-components/Button.js';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js';
import React from 'react';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <HorizontalLayout theme="spacing padding" style={{ justifyContent: 'center' }}>
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </HorizontalLayout>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
