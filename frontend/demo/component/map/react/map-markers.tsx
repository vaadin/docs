import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { Map } from '@hilla/react-components/Map.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <Map center={[37.7749, -122.4194]} zoom={12} style={{ width: '100%', height: '400px' }}></Map>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
