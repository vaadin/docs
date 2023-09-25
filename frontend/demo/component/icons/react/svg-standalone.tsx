import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import codeBranchIcon from '../../../../../src/main/resources/icons/code-branch.svg';
import { Icon } from '@hilla/react-components/Icon.js';

function Example() {
  return (
    // tag::snippet[]
    <Icon src={codeBranchIcon} />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
