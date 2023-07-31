import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { SplitLayout } from '@hilla/react-components/SplitLayout.js';
import './master-content';
import './detail-content';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <SplitLayout style={{ maxHeight: '280px' }} theme="minimal">
        <MasterContent />
        <DetailContent />
      </SplitLayout>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
