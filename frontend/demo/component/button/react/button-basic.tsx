import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
export default reactExample(Example); // hidden-source-line
import React, { useState } from 'react';
import { Button } from '@hilla/react-components/Button.js';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js';

function Example() {
  const [counter, setCounter] = useState(0);

  return (
    <>
      {/* tag::snippet[] */}
      <HorizontalLayout theme="spacing" style={{ alignItems: 'baseline' }}>
        <Button onClick={() => setCounter(counter + 1)}>Button</Button>
        <p>Clicked {counter} times</p>
      </HorizontalLayout>
      {/* end::snippet[] */}
    </>
  );
}
