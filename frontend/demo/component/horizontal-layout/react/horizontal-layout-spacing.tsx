import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react'; // hidden-source-line
import { HorizontalLayout } from '@vaadin/react-components';
import layoutExampleStyle from './layoutExampleStyle'; // hidden-source-line

function Example() {
  return (
    <div>
      <p>Horizontal layout without spacing:</p>
      <HorizontalLayout theme="padding">
        <div className="example-item">Item 1</div>
        <div className="example-item">Item 2</div>
        <div className="example-item">Item 3</div>
      </HorizontalLayout>

      <p>Horizontal layout with spacing:</p>
      {/* tag::snippet[] */}
      <HorizontalLayout theme="spacing padding">
        {/* end::snippet[] */}
        <div className="example-item">Item 1</div>
        <div className="example-item">Item 2</div>
        <div className="example-item">Item 3</div>
        {/* tag::snippet[] */}
      </HorizontalLayout>
      {/* end::snippet[] */}
    </div>
  );
}

export default reactExample(Example, layoutExampleStyle); // hidden-source-line
