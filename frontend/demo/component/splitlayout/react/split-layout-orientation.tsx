import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { SplitLayout } from '@hilla/react-components/SplitLayout.js';
import MasterContent from './master-content';
import DetailContent from './detail-content';

function Example() {
  return (
    <SplitLayout style={{ maxHeight: '350px' }} orientation="vertical">
      <MasterContent />
      <DetailContent />
    </SplitLayout>
  );
}

export default reactExample(Example);
