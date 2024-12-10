import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react'; // hidden-source-line
import { Button, HorizontalLayout } from '@vaadin/react-components';
import layoutExampleStyle from './layoutExampleStyle'; // hidden-source-line

function Example() {
  return (
    <div>
      <p>Horizontal layout without spacing:</p>
      <HorizontalLayout theme="padding">
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </HorizontalLayout>

      <p>Horizontal layout with spacing:</p>
      {/* tag::snippet[] */}
      <HorizontalLayout theme="spacing padding">
        {/* end::snippet[] */}
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
        {/* tag::snippet[] */}
      </HorizontalLayout>
      {/* end::snippet[] */}
    </div>
  );
}

export default reactExample(Example, layoutExampleStyle); // hidden-source-line
