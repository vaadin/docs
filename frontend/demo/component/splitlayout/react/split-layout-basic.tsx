import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { SplitLayout } from '@hilla/react-components/SplitLayout';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <SplitLayout style={{ maxHeight: '280px' }}>
        <MasterContent />
        <DetailContent />
      </SplitLayout>
      {/* end::snippet[] */}
    </>
  );
}

function MasterContent() {
  return <></>;
}

function DetailContent() {
  return <></>;
}

export default reactExample(Example);
