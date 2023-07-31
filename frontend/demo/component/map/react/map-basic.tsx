import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Map } from '@hilla/react-components/Map.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <Map
        centerLat={37.7749}
        centerLng={-122.4194}
        zoomLevel={12}
        apiKey="YOUR-API-KEY"
        style={{ height: '100%' }}
      />
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
