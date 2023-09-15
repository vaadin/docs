import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js';
import { Icon } from '@hilla/react-components/Icon.js';
import codeBranch from '../../../../../src/main/resources/icons/code-branch.svg';

function Example() {
  return (
    // tag::snippet[]
    <HorizontalLayout theme="spacing" className="items-end">
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
