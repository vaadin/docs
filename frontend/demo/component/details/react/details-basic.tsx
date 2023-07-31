import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Details } from '@hilla/react-components/Details.js';
import { VerticalLayout } from '@hilla/react-components/VerticalLayout.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <Details summary="Contact information" opened>
        <VerticalLayout>
          <span>Sophia Williams</span>
          <span>sophia.williams@company.com</span>
          <span>(501) 555-9128</span>
        </VerticalLayout>
      </Details>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
