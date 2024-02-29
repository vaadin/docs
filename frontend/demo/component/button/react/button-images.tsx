import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Button } from '@vaadin/react-components';
import img from '../../../../../src/main/resources/images/vaadin-logo-dark.png';

function Example() {
  return (
    // tag::snippet[]
    <Button theme="icon">
      <img src={img} width="100" alt="Vaadin logo" />
    </Button>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
