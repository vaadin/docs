import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { HorizontalLayout } from '@vaadin/react-components';

function Example() {
  return (
    <div className="basic-layouts-example">
      {/* tag::snippet[] */}
      <HorizontalLayout
        theme="spacing padding"
        className="height-4xl"
        style={{ alignItems: 'stretch' }}
      >
        <div className="example-item" style={{ alignSelf: 'start' }}>
          Item 1
        </div>
        <div className="example-item">Item 2</div>
        <div className="example-item" style={{ alignSelf: 'end' }}>
          Item 3
        </div>
      </HorizontalLayout>
      {/* end::snippet[] */}
    </div>
  );
}

export default reactExample(Example); // hidden-source-line
