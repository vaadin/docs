import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { LoginOverlay } from '@hilla/react-components/LoginOverlay.js';

function Example() {
  return <LoginOverlay headerTitle="TaskMob" description="Built with ♥ by Vaadin" />;
}

export default reactExample(Example);
