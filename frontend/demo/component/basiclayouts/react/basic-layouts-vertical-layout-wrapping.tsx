import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react'; // hidden-source-line
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { Button, HorizontalLayout, VerticalLayout } from '@vaadin/react-components';
import layoutExampleStyle from './layoutExampleStyle'; // hidden-source-line

function Example() {
  useSignals(); // hidden-source-line

  return (
    <>
      <HorizontalLayout theme="spacing margin" style={{ border: 0, justifyContent: 'stretch' }}>
        <VerticalLayout
          theme="spacing padding"
          style={{ alignItems: 'stretch', height: '200px', width: '100%' }}
        >
          <Button>Button 1</Button>
          <Button>Button 2</Button>
          <Button>Button 3</Button>
          <Button>Button 4</Button>
        </VerticalLayout>
        {/* tag::snippet[] */}
        <VerticalLayout
          theme="wrap spacing padding"
          style={{ alignItems: 'stretch', height: '200px', width: '100%' }}
        >
          {/* end::snippet[] */}
          <Button>Button 1</Button>
          <Button>Button 2</Button>
          <Button>Button 3</Button>
          <Button>Button 4</Button>
          {/* tag::snippet[] */}
        </VerticalLayout>
        {/* end::snippet[] */}
      </HorizontalLayout>
    </>
  );
}

export default reactExample(Example, layoutExampleStyle); // hidden-source-line
