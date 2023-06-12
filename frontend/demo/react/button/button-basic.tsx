import React, { useState } from 'react';
import { Button } from '@hilla/react-components/Button.js';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js';

function ButtonBasic() {
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

import { reactExample } from 'Frontend/demo/react/react-example'; // hidden-source-line
export default reactExample(ButtonBasic); // hidden-source-line
