import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { SplitLayout } from '@hilla/react-components/SplitLayout.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <SplitLayout style={{ maxHeight: '280px' }}>
        <div style={{ width: '70%' }}>
          <MasterContent />
        </div>
        <div style={{ width: '30%' }}>
          <DetailContent />
        </div>
      </SplitLayout>
      {/* end::snippet[] */}
    </>
  );
}

const MasterContent = () => {
  return <div className="master-content" />;
};

const DetailContent = () => {
  return <div className="detail-content" />;
};

export default reactExample(Example); // hidden-source-line
