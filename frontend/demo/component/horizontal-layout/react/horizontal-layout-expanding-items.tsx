import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react'; // hidden-source-line
import { HorizontalLayout } from '@vaadin/react-components';

function Example() {
  return (
    <div className="basic-layouts-example">
      {/* tag::snippet[] */}
      <HorizontalLayout theme="padding spacing">
        <div className="example-item" style={{ flexGrow: 1 }}>
          Item 1
        </div>
        <div className="example-item">Item 2</div>
        <div className="example-item">Item 3</div>
      </HorizontalLayout>
      {/* end::snippet[] */}
    </div>
  );
}

export default reactExample(Example); // hidden-source-line
