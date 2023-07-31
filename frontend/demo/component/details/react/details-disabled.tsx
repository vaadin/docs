import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { Details } from '@hilla/react-components/Details.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <Details summary="Members (8)" disabled>
        <ul>
          <li>Blake Martin</li>
          <li>Caroline Clark</li>
          <li>Avery Torres</li>
          <li>Khloe Scott</li>
          <li>Camila Fisher</li>
          <li>Gavin Lewis</li>
          <li>Isabella Powell</li>
          <li>Zoe Wilson</li>
        </ul>
      </Details>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
