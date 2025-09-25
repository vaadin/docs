import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Icon } from '@vaadin/react-components/Icon.js';
import codeBranchIcon from '../../../../../src/main/resources/icons/code-branch.svg?url';

function Example() {
  return (
    // As an alternative to importing the SVG file, you can set the src property to be any relative or absolute URL.
    // For example, if you have the icons in your "myapp" application theme, you could set the value to "/themes/myapp/code-branch.svg"
    // tag::snippet[]
    <Icon src={codeBranchIcon} />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
