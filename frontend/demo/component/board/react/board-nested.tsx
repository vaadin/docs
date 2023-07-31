import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { Board } from '@hilla/react-components/Board.js';
import { BoardRow } from '@hilla/react-components/BoardRow.js';
import { ExampleIndicator } from './ExampleIndicator.js';
import { ExampleStatistics } from './ExampleStatistics.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <Board>
        <BoardRow>
          <ExampleStatistics cols={2} />
          <BoardRow cols={1}>
            <ExampleIndicator current="745" change="+33.7" title="Current users" />
            <ExampleIndicator current="18%" change="+3.9" title="Conversion rate" />
          </BoardRow>
        </BoardRow>
      </Board>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
