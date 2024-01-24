import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import { Icon } from '@vaadin/react-components/Icon.js';
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js';
import React from 'react';
import spriteIcons from '../../../../../src/main/resources/icons/solid.svg';

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
