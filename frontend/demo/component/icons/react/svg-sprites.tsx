import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Icon } from '@vaadin/react-components/Icon.js';
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js';
import spriteIcons from '../../../../../src/main/resources/icons/solid.svg?url';

function Example() {
  return (
    <HorizontalLayout theme="spacing" className="items-center">
      {/* tag::snippet[] */}
      <Icon src={spriteIcons} symbol="code-branch" />
      <Icon src={spriteIcons} symbol="user" />
      {/* end::snippet[] */}
    </HorizontalLayout>
  );
}

export default reactExample(Example); // hidden-source-line
