import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { Tabs } from '@hilla/react-components/Tabs.js';
import { VerticalLayout } from '@hilla/react-components/VerticalLayout.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <Tabs>
        <VerticalLayout slot="tab1">Content for tab 1</VerticalLayout>
        <VerticalLayout slot="tab2">Content for tab 2</VerticalLayout>
        <VerticalLayout slot="tab3">Content for tab 3</VerticalLayout>
      </Tabs>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
