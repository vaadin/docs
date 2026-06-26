import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { HorizontalLayout } from '@vaadin/react-components';

function Example() {
  return (
    <div className="basic-layouts-example">
      {/* tag::snippet[] */}
      <HorizontalLayout theme="spacing padding">
        <div className="example-item">Start</div>
        <div className="example-item" slot="middle">
          Middle
        </div>
        <div className="example-item" slot="end">
          End
        </div>
      </HorizontalLayout>
      {/* end::snippet[] */}
    </div>
  );
}

export default reactExample(Example); // hidden-source-line
