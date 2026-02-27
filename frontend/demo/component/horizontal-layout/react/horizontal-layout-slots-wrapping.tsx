import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { HorizontalLayout } from '@vaadin/react-components';

function Example() {
  return (
    <div className="basic-layouts-example">
      {/* tag::snippet[] */}
      <HorizontalLayout theme="spacing padding wrap">
        <HorizontalLayout theme="spacing padding">
          <div className="example-item">Start</div>
          <div className="example-item">Start</div>
        </HorizontalLayout>
        <HorizontalLayout theme="spacing padding" slot="middle">
          <div className="example-item">Middle</div>
          <div className="example-item">Middle</div>
          <div className="example-item">Middle</div>
        </HorizontalLayout>
        <HorizontalLayout theme="spacing padding" slot="end">
          <div className="example-item">End</div>
          <div className="example-item">End</div>
        </HorizontalLayout>
      </HorizontalLayout>
      {/* end::snippet[] */}
    </div>
  );
}

export default reactExample(Example); // hidden-source-line
