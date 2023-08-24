import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { LoginOverlay } from '@hilla/react-components/LoginOverlay.js';
import { applyTheme } from 'Frontend/generated/theme';

function Example() {
  return (
    // tag::snippet[]
    <LoginOverlay title="TaskMob" description="Built with ♥ by Vaadin" opened autofocus />
    // end::snippet[]
  );
}

export default reactExample(Example, applyTheme); // hidden-source-line
