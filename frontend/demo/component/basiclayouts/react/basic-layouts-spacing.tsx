import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react'; // hidden-source-line
import { Button, HorizontalLayout, VerticalLayout } from '@vaadin/react-components';
import layoutExampleStyle from './layoutExampleStyle';

function Example() {
  return (
    <HorizontalLayout theme="spacing" style={{ border: '0' }}>
      <div style={{ width: '100%' }}>
        <p>Vertical layout without spacing:</p>
        <VerticalLayout theme="padding" style={{ alignItems: 'stretch' }}>
          <Button>Button 1</Button>
          <Button>Button 2</Button>
          <Button>Button 3</Button>
        </VerticalLayout>
      </div>
      <div style={{ width: '100%' }}>
        <p>Vertical layout with spacing:</p>
        {/* tag::snippet[] */}
        <VerticalLayout theme="spacing padding" style={{ alignItems: 'stretch' }}>
          {/* end::snippet[] */}
          <Button>Button 1</Button>
          <Button>Button 2</Button>
          <Button>Button 3</Button>
          {/* tag::snippet[] */}
        </VerticalLayout>
        {/* end::snippet[] */}
      </div>
    </HorizontalLayout>
  );
}

export default reactExample(Example, layoutExampleStyle); // hidden-source-line
