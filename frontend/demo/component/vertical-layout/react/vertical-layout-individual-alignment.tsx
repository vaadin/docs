import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { VerticalLayout } from '@vaadin/react-components';

function Example() {
  return (
    <div className="basic-layouts-example">
      {/* tag::snippet[] */}
      <VerticalLayout theme="spacing padding" style={{ alignItems: 'start' }}>
        <div className="example-item" style={{ alignSelf: 'end' }}>
          Item 1
        </div>
        <div className="example-item" style={{ alignSelf: 'center' }}>
          Item 2
        </div>
        <div className="example-item">Item 3</div>
      </VerticalLayout>
      {/* end::snippet[] */}
    </div>
  );
}

export default reactExample(Example); // hidden-source-line
