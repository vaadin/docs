import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js';
import { Icon } from '@vaadin/react-components/Icon.js';
import codeBranch from '../../../../../src/main/resources/META-INF/resources/icons/code-branch.svg?url';

function Example() {
  return (
    // tag::snippet[]
    <HorizontalLayout
      theme="spacing"
      className="icons-sizing-padding-example"
      style={{ alignItems: 'flex-end' }}
    >
      {/* tag::snippet[] */}
      <Icon src={codeBranch} style={{ '--vaadin-icon-size': '3rem' }} />
      <Icon
        src={codeBranch}
        style={{ '--vaadin-icon-size': '3rem', '--vaadin-icon-visual-size': '2rem' }}
      />
      <Icon
        src={codeBranch}
        style={{ '--vaadin-icon-size': '3rem', '--vaadin-icon-visual-size': '1rem' }}
      />
      {/* end::snippet[] */}
    </HorizontalLayout>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
