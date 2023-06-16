import { reactExample } from 'Frontend/demo/react/react-example'; // hidden-source-line
export default reactExample(Example); // hidden-source-line
import React from 'react';
import './login-overlay-mockup';

function Example() {
  return (
    // @ts-ignore
    <login-overlay-mockup
        headerTitle="TaskMob"
        description="Built with ♥ by Vaadin"
    />
  );
}
