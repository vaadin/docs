import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react'; // hidden-source-line
import { Button, HorizontalLayout } from '@vaadin/react-components';
import layoutExampleStyle from './layoutExampleStyle'; // hidden-source-line

function Example() {
  return (
    <>
      <p>Horizontal layout without padding:</p>
      <HorizontalLayout theme="spacing">
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </HorizontalLayout>

      <p>Horizontal layout with padding:</p>
      {/* tag::snippet[] */}
      <HorizontalLayout theme="padding spacing">
        {/* end::snippet[] */}
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
        {/* tag::snippet[] */}
      </HorizontalLayout>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example, layoutExampleStyle); // hidden-source-line
