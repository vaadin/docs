React: import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { Map } from '@hilla/react-components/Map.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <Map
        latitude={37.7749}
        longitude={-122.4194}
        zoomLevel={12}
        apiKey="YOUR_API_KEY"
        staticMapUrlCallback={(latitude, longitude, zoomLevel) =>
          `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=${zoomLevel}&size=400x300&key=YOUR_API_KEY`
        }
      />
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
