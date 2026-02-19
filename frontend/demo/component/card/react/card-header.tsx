import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react'; // hidden-source-line
import { Card } from '@vaadin/react-components/Card.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <Card>
        {/* tag::[] */}
        <div
          slot="header"
          style={{ display: 'flex', flexDirection: 'column-reverse', lineHeight: '1.25' }}
        >
          <h2>Lapland</h2>
          <div style={{ fontSize: '0.8125rem', textTransform: 'uppercase' }}>The Exotic North</div>
        </div>
        {/* end::[] */}
        <div>Lapland is the northern-most region of Finland and an active outdoor destination.</div>
      </Card>
      {/* end::snippet[] */}

      <style>{`
        vaadin-card {
          max-width: 300px;
        }
      `}</style>
    </>
  );
}

export default reactExample(Example); // hidden-source-line
