import React from 'react';

import '@vaadin/icons';
import '@vaadin/horizontal-layout'
import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import { Icon } from '@hilla/react-components/Icon.js';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js';
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
