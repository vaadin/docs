import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { Board } from '@hilla/react-components/Board.js';

function Example() {
  return (
    <Board className="basic-board">
      {/* tag::snippet[] */}
      <Board.Row>
        <example-indicator current="745" change="+33.7" title="Current users" />
        <example-indicator current="54.6k" change="-112.45" title="View events" />
        <example-indicator current="18%" change="+3.9" title="Conversion rate" />
        <example-indicator current="-123.45" title="Custom metric" />
      </Board.Row>
      <Board.Row>
        <example-chart />
      </Board.Row>
      {/* end::snippet[] */}
    </Board>
  );
}

export default reactExample(Example);
