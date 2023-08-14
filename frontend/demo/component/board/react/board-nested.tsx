import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Board } from '@hilla/react-components/Board.js';
import { BoardRow } from '@hilla/react-components/BoardRow.js';
import ExampleIndicator from './ExampleIndicator';
import ExampleStatistics from './ExampleStatistics';
import boardStyles from './board-styles';

function Example() {
  return (
    // tag::snippet[]
    <Board className="board-nested">
      <BoardRow>
        <div {...{ 'board-cols': 2 }}>
          <ExampleStatistics {...{ 'board-cols': 2 }} />
        </div>
        <BoardRow {...{ 'board-cols': 1 }}>
          <ExampleIndicator current="745" change={+33.7} title="Current users" />
          <ExampleIndicator current="18%" change={+3.9} title="Conversion rate" />
        </BoardRow>
      </BoardRow>
    </Board>
    // end::snippet[]
  );
}

export default reactExample(Example, boardStyles); // hidden-source-line
