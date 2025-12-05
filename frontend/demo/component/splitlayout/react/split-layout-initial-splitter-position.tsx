import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { SplitLayout } from '@vaadin/react-components/SplitLayout.js';
import DetailContent from './detail-content';
import MasterContent from './master-content';

function Example() {
  return (
    // tag::snippet[]
    <SplitLayout style={{ maxHeight: '280px' }}>
      <MasterContent style={{ width: '70%' }} />
      <DetailContent style={{ width: '30%' }} />
    </SplitLayout>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
