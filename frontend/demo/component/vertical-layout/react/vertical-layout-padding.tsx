import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react'; // hidden-source-line
import { HorizontalLayout, VerticalLayout } from '@vaadin/react-components';

function Example() {
  return (
    <div className="basic-layouts-example">
      <HorizontalLayout theme="spacing" style={{ border: '0' }}>
        <div style={{ width: '100%' }}>
          <p>Vertical layout without padding:</p>
          <VerticalLayout theme="spacing" style={{ alignItems: 'stretch' }}>
            <div className="example-item">Item 1</div>
            <div className="example-item">Item 2</div>
            <div className="example-item">Item 3</div>
          </VerticalLayout>
        </div>
        <div style={{ width: '100%' }}>
          <p>Vertical layout with padding:</p>
          {/* tag::snippet[] */}
          <VerticalLayout theme="padding spacing" style={{ alignItems: 'stretch' }}>
            {/* end::snippet[] */}
            <div className="example-item">Item 1</div>
            <div className="example-item">Item 2</div>
            <div className="example-item">Item 3</div>
            {/* tag::snippet[] */}
          </VerticalLayout>
          {/* end::snippet[] */}
        </div>
      </HorizontalLayout>
    </div>
  );
}

export default reactExample(Example); // hidden-source-line
