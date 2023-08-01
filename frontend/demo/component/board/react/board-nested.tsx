import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Board } from '@hilla/react-components/Board.js';
import { BoardRow } from '@hilla/react-components/BoardRow.js';
import ExampleIndicator from './ExampleIndicator';
import ExampleStatistics from './ExampleStatistics';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <Board>
        <BoardRow>
          <ExampleStatistics {...{ 'board-cols': 2 }} />
          <BoardRow {...{ 'board-cols': 1 }}>
            <ExampleIndicator current="745" change={+33.7} title="Current users" />
            <ExampleIndicator current="18%" change={+3.9} title="Conversion rate" />
          </BoardRow>
        </BoardRow>
      </Board>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
