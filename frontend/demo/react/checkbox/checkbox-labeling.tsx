import { reactExample } from 'Frontend/demo/react/react-example'; // hidden-source-line
export default reactExample(Example); // hidden-source-line
import React from 'react';
import { Checkbox } from '@hilla/react-components/Checkbox.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <Checkbox label="Yes, I agree"></Checkbox>
      {/* end::snippet[] */}
    </>
  );
}
