import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { Map } from '@hilla/react-components/Map';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <Map
        style={{ width: '100%', height: '400px' }}
        latitude={52.379189}
        longitude={4.899431}
        zoom={13}
        apiKey="YOUR_API_KEY"
      ></Map>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
