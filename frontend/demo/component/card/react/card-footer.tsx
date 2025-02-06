import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react'; // hidden-source-line
import { Button } from '@vaadin/react-components/Button.js';
import { Card } from '@vaadin/react-components/Card.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <Card style={{ height: '240px' }}>
        <div slot="title">Lapland</div>
        <div>Lapland is the northern-most region of Finland and an active outdoor destination.</div>
        {/* tag::[] */}
        <Button slot="footer">Book Vacation</Button>
        <Button slot="footer">Learn More</Button>
        {/* end::[] */}
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
