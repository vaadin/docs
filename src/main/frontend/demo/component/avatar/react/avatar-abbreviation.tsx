import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Avatar, HorizontalLayout } from '@vaadin/react-components';

function Example() {
  return (
    <HorizontalLayout theme="spacing">
      {/* tag::snippet[] */}
      <Avatar name="Augusta Ada King" />

      <Avatar name="Augusta Ada King" abbr="AK" />
      {/* end::snippet[] */}
    </HorizontalLayout>
  );
}

export default reactExample(Example); // hidden-source-line
