import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Upload } from '@hilla/react-components/Upload.js';
import { Icon } from '@hilla/react-components/Icon.js';
import '@vaadin/icons';

function Example() {
  return (
    // tag::snippet[]
    <Upload>
      <Icon slot="drop-label-icon" icon="vaadin:cloud-upload-o" />
      <span slot="drop-label">
        Files will be uploaded to our cloud. See our
        <a href="https://vaadin.com/privacy-policy" target="_blank">
          privacy policy
        </a>
      </span>
    </Upload>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
