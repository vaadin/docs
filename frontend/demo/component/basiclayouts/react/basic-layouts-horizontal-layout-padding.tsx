import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react'; // hidden-source-line
import { HorizontalLayout } from '@vaadin/react-components';
import layoutExampleStyle from './layoutExampleStyle'; // hidden-source-line

function Example() {
  return (
    <>
      <p>Horizontal layout without padding:</p>
      <HorizontalLayout theme="spacing">
        <div className="layout-item">Item 1</div>
        <div className="layout-item">Item 2</div>
        <div className="layout-item">Item 3</div>
      </HorizontalLayout>

      <p>Horizontal layout with padding:</p>
      {/* tag::snippet[] */}
      <HorizontalLayout theme="padding spacing">
        {/* end::snippet[] */}
        <div className="layout-item">Item 1</div>
        <div className="layout-item">Item 2</div>
        <div className="layout-item">Item 3</div>
        {/* tag::snippet[] */}
      </HorizontalLayout>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example, layoutExampleStyle); // hidden-source-line
