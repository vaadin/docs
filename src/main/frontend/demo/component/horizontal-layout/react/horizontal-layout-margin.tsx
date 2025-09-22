import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react'; // hidden-source-line
import { HorizontalLayout } from '@vaadin/react-components';
import layoutExampleStyle from './layoutExampleStyle'; // hidden-source-line

function Example() {
  return (
    <>
      <p>Horizontal layout without margin:</p>
      <div className="container">
        <HorizontalLayout theme="spacing padding">
          <div className="example-item">Item 1</div>
          <div className="example-item">Item 2</div>
          <div className="example-item">Item 3</div>
        </HorizontalLayout>
      </div>

      <p>Horizontal layout with margin:</p>
      <div className="container">
        {/* tag::snippet[] */}
        <HorizontalLayout theme="margin spacing padding">
          {/* end::snippet[] */}
          <div className="example-item">Item 1</div>
          <div className="example-item">Item 2</div>
          <div className="example-item">Item 3</div>
          {/* tag::snippet[] */}
        </HorizontalLayout>
        {/* end::snippet[] */}
      </div>
    </>
  );
}

export default reactExample(Example, layoutExampleStyle); // hidden-source-line
