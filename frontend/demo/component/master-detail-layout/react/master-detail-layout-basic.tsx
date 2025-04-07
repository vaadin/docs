import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { MasterDetailLayout } from '@vaadin/react-components';

function Example() {
  return (
    <MasterDetailLayout>
      <MasterDetailLayout.Master></MasterDetailLayout.Master>
      <MasterDetailLayout.Detail></MasterDetailLayout.Detail>
    </MasterDetailLayout>
  );
}

export default reactExample(Example); // hidden-source-line
