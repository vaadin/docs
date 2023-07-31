import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { Map } from '@hilla/react-components/Map.js';
import { TextArea } from '@hilla/react-components/TextArea.js';
import { VerticalLayout } from '@hilla/react-components/VerticalLayout.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <Map
        latitude={51.505}
        longitude={-0.09}
        zoom={13}
        style={{ width: '100%', height: '400px' }}
      />

      <VerticalLayout theme="spacing">
        <TextArea label="Address" helperText="Enter your address" />
        <TextArea
          label="Comments"
          helperText="Enter any additional comments or instructions"
          style={{ minHeight: '200px' }}
        />
      </VerticalLayout>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
