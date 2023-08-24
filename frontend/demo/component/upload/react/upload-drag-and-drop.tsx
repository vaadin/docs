import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { FormLayout, type FormLayoutResponsiveStep } from '@hilla/react-components/FormLayout.js';
import { Upload } from '@hilla/react-components/Upload.js';

const layoutSteps: FormLayoutResponsiveStep[] = [
  { minWidth: 0, columns: 1, labelsPosition: 'top' },
  { minWidth: '520px', columns: 2, labelsPosition: 'top' },
];

function Example() {
  return (
    <FormLayout responsiveSteps={layoutSteps}>
      <div>
        <label htmlFor="upload-drop-enabled">Drag and drop enabled</label>
        <Upload id="upload-drop-enabled" />
      </div>
      <div>
        <label htmlFor="upload-drop-disabled">Drag and drop disabled</label>
        {/* tag::snippet[] */}
        <Upload id="upload-drop-disabled" nodrop />
        {/* end::snippet[] */}
      </div>
    </FormLayout>
  );
}

export default reactExample(Example); // hidden-source-line
