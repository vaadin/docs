import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { SplitLayout } from '@hilla/react-components/SplitLayout.js';
import { Board } from '@hilla/react-components/Board.js';
import boardStyles from './board-styles';
import { BoardRow } from '@hilla/react-components/BoardRow.js';

function Example() {
  return (
    // tag::snippet[]
    <SplitLayout className="board-column-wrapping">
      <Board style={{ width: '100%' }}>
        <BoardRow className="row">
          <div className="cell color">Cell 1</div>
          <div className="cell color">Cell 2</div>
          <div className="cell color">Cell 3</div>
          <div className="cell color">Cell 4</div>
        </BoardRow>
      </Board>
      <div></div>
    </SplitLayout>
    // end::snippet[]
  );
}

export default reactExample(Example, boardStyles); // hidden-source-line
