import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react'; // hidden-source-line
import { HorizontalLayout, VerticalLayout } from '@vaadin/react-components';
import layoutExampleStyle from './layoutExampleStyle'; // hidden-source-line

function Example() {
  return (
    <HorizontalLayout theme="spacing" style={{ border: '0' }}>
      <div style={{ width: '100%' }}>
        <p>Vertical layout without margin:</p>
        <div className="container">
          <VerticalLayout theme="spacing padding" style={{ alignItems: 'stretch' }}>
            <div className="example-item">Item 1</div>
            <div className="example-item">Item 2</div>
            <div className="example-item">Item 3</div>
          </VerticalLayout>
        </div>
      </div>
      <div style={{ width: '100%' }}>
        <p>Vertical layout with margin:</p>
        <div className="container">
          {/* tag::snippet[] */}
          <VerticalLayout theme="margin spacing padding" style={{ alignItems: 'stretch' }}>
            {/* end::snippet[] */}
            <div className="example-item">Item 1</div>
            <div className="example-item">Item 2</div>
            <div className="example-item">Item 3</div>
            {/* tag::snippet[] */}
          </VerticalLayout>
          {/* end::snippet[] */}
        </div>
      </div>
    </HorizontalLayout>
  );
}

export default reactExample(Example, layoutExampleStyle); // hidden-source-line
