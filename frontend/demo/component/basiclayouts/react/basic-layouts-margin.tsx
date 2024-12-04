import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react'; // hidden-source-line
import { Button, HorizontalLayout, VerticalLayout } from '@vaadin/react-components';
import layoutExampleStyle from './layoutExampleStyle'; // hidden-source-line

function Example() {
  return (
    <HorizontalLayout theme="spacing" style={{ border: '0' }}>
      <div style={{ width: '100%' }}>
        <p>Vertical layout without margin:</p>
        <div className="container">
          <VerticalLayout theme="spacing padding" style={{ alignItems: 'stretch' }}>
            <Button>Button 1</Button>
            <Button>Button 2</Button>
            <Button>Button 3</Button>
          </VerticalLayout>
        </div>
      </div>
      <div style={{ width: '100%' }}>
        <p>Vertical layout with margin:</p>
        <div className="container">
          {/* tag::snippet[] */}
          <VerticalLayout theme="margin spacing padding" style={{ alignItems: 'stretch' }}>
            {/* end::snippet[] */}
            <Button>Button 1</Button>
            <Button>Button 2</Button>
            <Button>Button 3</Button>
            {/* tag::snippet[] */}
          </VerticalLayout>
          {/* end::snippet[] */}
        </div>
      </div>
    </HorizontalLayout>
  );
}

export default reactExample(Example, layoutExampleStyle); // hidden-source-line
