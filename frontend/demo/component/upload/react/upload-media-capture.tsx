import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Upload } from '@vaadin/react-components/Upload.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      {/* Take a photo with the back camera */}
      <Upload accept="image/*" capture="environment" />
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
