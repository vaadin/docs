import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import exampleStyles from './split-layout-example-styles'; // hidden-source-line
import React from 'react';
import { SplitLayout } from '@hilla/react-components/SplitLayout.js';
import MasterContent from './master-content';
import DetailContent from './detail-content';

function Example() {
  return (
    // tag::snippet[]
    <SplitLayout style={{ maxHeight: '350px' }} orientation="vertical">
      <MasterContent />
      <DetailContent />
    </SplitLayout>
    // end::snippet[]
  );
}

export default reactExample(Example, exampleStyles); // hidden-source-line
