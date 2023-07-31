import { reactExample } from 'Frontend/demo/react-example';
import React, { useState } from 'react';
import { VerticalLayout } from '@hilla/react-components/VerticalLayout.js';
import { Map } from '@hilla/react-components/Map.js';
import { RadioGroup } from '@hilla/react-components/RadioGroup.js';

function Example() {
  const [selectedLayer, setSelectedLayer] = useState('osm');

  return (
    <>
      {/* tag::snippet[] */}
      <VerticalLayout theme="spacing">
        <Map apiKey="YOUR_API_KEY" basemap-type={selectedLayer} />
        <RadioGroup
          label="Select basemap"
          value={selectedLayer}
          onValueChanged={(event) => setSelectedLayer(event.detail.value)}
        >
          <RadioGroup.Option value="osm" label="OpenStreetMap" />
          <RadioGroup.Option value="street" label="Streets" />
          <RadioGroup.Option value="satellite" label="Satellite" />
          <RadioGroup.Option value="hybrid" label="Hybrid" />
        </RadioGroup>
      </VerticalLayout>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
