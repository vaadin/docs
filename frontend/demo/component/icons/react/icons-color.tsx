import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js';
import { Icon } from '@vaadin/react-components/Icon.js';
import codeBranch from '../../../../../src/main/resources/META-INF/resources/icons/code-branch.svg?url';

function Example() {
  return (
    <HorizontalLayout theme="spacing" className="items-center">
      {/* tag::snippet[] */}
      <Icon src={codeBranch} style={{ color: 'red' }} />
      <Icon iconClass="fa fa-user" style={{ color: 'red' }} />
      {/* end::snippet[] */}
    </HorizontalLayout>
  );
}

export default reactExample(Example); // hidden-source-line
