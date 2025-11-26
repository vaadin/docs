import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react'; // hidden-source-line
import { Card } from '@vaadin/react-components/Card.js';

function Example() {
  return (
    <>
      <div className="card-variant-layout">
        {/* tag::snippet[] */}
        <Card cardTitle="Default">
          <div>This is the default card style.</div>
        </Card>

        <Card cardTitle="Outlined" theme="outlined">
          <div>Adds a solid outline around the card.</div>
        </Card>

        <Card cardTitle="Elevated" theme="elevated">
          <div>This variant works better on a shaded background.</div>
        </Card>
        {/* end::snippet[] */}
      </div>

      <style>{`
        .card-variant-layout {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(12ch, 1fr));
          gap: 1rem;
        }
      `}</style>
    </>
  );
}

export default reactExample(Example); // hidden-source-line
