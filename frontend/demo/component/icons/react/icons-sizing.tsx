import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js';
import { Icon } from '@vaadin/react-components/Icon.js';
import codeBranch from '../../../../../src/main/resources/META-INF/resources/icons/code-branch.svg?url';

function Example() {
  return (
    // tag::snippet[]
    <HorizontalLayout theme="spacing" style={{ alignItems: 'flex-end' }}>
      {/* tag::snippet[] */}
      <Icon src={codeBranch} />
      <Icon
        src={codeBranch}
        style={{ height: 'var(--lumo-icon-size-l)', width: 'var(--lumo-icon-size-l)' }}
      />
      <Icon src={codeBranch} style={{ height: '48px', width: '48px' }} />
      {/* end::snippet[] */}
    </HorizontalLayout>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
