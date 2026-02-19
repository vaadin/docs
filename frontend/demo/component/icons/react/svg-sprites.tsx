import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js';
import { Icon } from '@vaadin/react-components/Icon.js';
import spriteIcons from '../../../../../src/main/resources/META-INF/resources/icons/solid.svg?url';

function Example() {
  return (
    <HorizontalLayout theme="spacing" style={{ alignItems: 'center' }}>
      {/* tag::snippet[] */}
      <Icon src={spriteIcons} symbol="code-branch" />
      <Icon src={spriteIcons} symbol="user" />
      {/* end::snippet[] */}
    </HorizontalLayout>
  );
}

export default reactExample(Example); // hidden-source-line
