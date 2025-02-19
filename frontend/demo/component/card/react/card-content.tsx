import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react'; // hidden-source-line
import { Card } from '@vaadin/react-components/Card.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <Card>
        <p>
          Lapland is the northern-most region of Finland and an active outdoor destination that's
          known for its incredible, year-round light phenomena, vast arctic nature, and Santa Claus.
        </p>
        <p>
          The land of the indigenous Sámi people, known as Sámi homeland or Sápmi, also crosses the
          northern part of the region.
        </p>
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
