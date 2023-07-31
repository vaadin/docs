import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { SplitLayout } from '@hilla/react-components/SplitLayout.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <SplitLayout style={{ maxHeight: '280px' }} theme="small">
        <Header>Main Content</Header>
        <DetailContent>Detail Content</DetailContent>
      </SplitLayout>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
