import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js';
import { Map } from '@hilla/react-components/Map.js';
import { RadioGroup } from '@hilla/react-components/RadioGroup.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <HorizontalLayout theme="spacing">
        <Map
          latitude={60.1733}
          longitude={24.941}
          zoom={12}
          maxZoom={18}
          minZoom={4}
          styles={{ height: '400px', width: '100%' }}
        />
        <RadioGroup label="Map view">
          <div>
            <input type="radio" id="roadmap" name="mapView" value="roadmap" checked />
            <label htmlFor="roadmap">Roadmap</label>
          </div>
          <div>
            <input type="radio" id="satellite" name="mapView" value="satellite" />
            <label htmlFor="satellite">Satellite</label>
          </div>
          <div>
            <input type="radio" id="hybrid" name="mapView" value="hybrid" />
            <label htmlFor="hybrid">Hybrid</label>
          </div>
        </RadioGroup>
      </HorizontalLayout>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
