import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react'; // hidden-source-line
import { HorizontalLayout } from '@vaadin/react-components';
import layoutExampleStyle from './layoutExampleStyle'; // hidden-source-line

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <HorizontalLayout theme="padding spacing">
        <div className="example-item" style={{ flexGrow: 1 }}>Item 1</div>
        <div className="example-item">Item 2</div>
        <div className="example-item">Item 3</div>
      </HorizontalLayout>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example, layoutExampleStyle); // hidden-source-line
