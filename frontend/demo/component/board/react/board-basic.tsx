import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Board } from '@hilla/react-components/Board.js';
import { BoardRow } from '@hilla/react-components/BoardRow.js';
import ExampleIndicator from './ExampleIndicator';
import ExampleChart from './ExampleChart';

function Example() {
  return (
    <Board className="basic-board">
      {/* tag::snippet[] */}
      <BoardRow>
        <ExampleIndicator current="745" change={+33.7} title="Current users" />
        <ExampleIndicator current="54.6k" change={-112.45} title="View events" />
        <ExampleIndicator current="18%" change={+3.9} title="Conversion rate" />
        <ExampleIndicator current="-123.45" title="Custom metric" />
      </BoardRow>
      <BoardRow>
        <ExampleChart />
      </BoardRow>
      {/* end::snippet[] */}
    </Board>
  );
}

export default reactExample(Example); // hidden-source-line
