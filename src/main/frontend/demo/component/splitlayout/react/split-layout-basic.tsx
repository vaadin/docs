import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { SplitLayout } from '@vaadin/react-components/SplitLayout';
import DetailContent from './detail-content';
import MasterContent from './master-content';
import exampleStyles from './split-layout-example-styles'; // hidden-source-line

function Example() {
  return (
    // tag::snippet[]
    <SplitLayout style={{ maxHeight: '280px' }}>
      <MasterContent />
      <DetailContent />
    </SplitLayout>
    // end::snippet[]
  );
}

export default reactExample(Example, exampleStyles); // hidden-source-line
