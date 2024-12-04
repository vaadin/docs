import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react'; // hidden-source-line
import { Button, HorizontalLayout } from '@vaadin/react-components';
import layoutExampleStyle from './layoutExampleStyle'; // hidden-source-line

function Example() {
  return (
    <>
      <p>Horizontal layout without margin:</p>
      <div className="container">
        <HorizontalLayout theme="spacing padding">
          <Button>Button 1</Button>
          <Button>Button 2</Button>
          <Button>Button 3</Button>
        </HorizontalLayout>
      </div>

      <p>Horizontal layout with margin:</p>
      <div className="container">
        {/* tag::snippet[] */}
        <HorizontalLayout theme="margin spacing padding">
          {/* end::snippet[] */}
          <Button>Button 1</Button>
          <Button>Button 2</Button>
          <Button>Button 3</Button>
          {/* tag::snippet[] */}
        </HorizontalLayout>
        {/* end::snippet[] */}
      </div>
    </>
  );
}

export default reactExample(Example, layoutExampleStyle); // hidden-source-line
