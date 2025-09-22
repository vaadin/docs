import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react'; // hidden-source-line
import { HorizontalLayout, VerticalLayout } from '@vaadin/react-components';
import layoutExampleStyle from './layoutExampleStyle';

function Example() {
  return (
    <HorizontalLayout theme="spacing" style={{ border: '0' }}>
      <div style={{ width: '100%' }}>
        <p>Vertical layout without spacing:</p>
        <VerticalLayout theme="padding" style={{ alignItems: 'stretch' }}>
          <div className="example-item">Item 1</div>
          <div className="example-item">Item 2</div>
          <div className="example-item">Item 3</div>
        </VerticalLayout>
      </div>
      <div style={{ width: '100%' }}>
        <p>Vertical layout with spacing:</p>
        {/* tag::snippet[] */}
        <VerticalLayout theme="spacing padding" style={{ alignItems: 'stretch' }}>
          {/* end::snippet[] */}
          <div className="example-item">Item 1</div>
          <div className="example-item">Item 2</div>
          <div className="example-item">Item 3</div>
          {/* tag::snippet[] */}
        </VerticalLayout>
        {/* end::snippet[] */}
      </div>
    </HorizontalLayout>
  );
}

export default reactExample(Example, layoutExampleStyle); // hidden-source-line
