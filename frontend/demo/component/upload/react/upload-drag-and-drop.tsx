import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { FormLayout } from '@hilla/react-components/FormLayout.js';
import { Upload } from '@hilla/react-components/Upload.js';

const layoutSteps = [
  { minWidth: 0, columns: 1, labelsPosition: 'top' },
  { minWidth: '520px', columns: 2, labelsPosition: 'top' },
];

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <FormLayout responsiveSteps={layoutSteps}>
        <div>
          <label htmlFor="upload-drop-enabled">Drag and drop enabled</label>
          <Upload id="upload-drop-enabled" />
        </div>
        <div>
          <label htmlFor="upload-drop-disabled">Drag and drop disabled</label>
          <Upload id="upload-drop-disabled" nodrop />
        </div>
      </FormLayout>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
