import React from 'react';
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js';
import { Icon } from '@vaadin/react-components/Icon.js';
import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line

function Example() {
  return (
    <HorizontalLayout theme="spacing" className="items-center">
      {/* tag::snippet[] */}
      <Icon iconClass="fa fa-code-branch" />
      <Icon iconClass="fa fa-user" />
      {/* end::snippet[] */}
    </HorizontalLayout>
  );
}

export default reactExample(Example); // hidden-source-line
