import { Board } from '@hilla/react-components/Board.js';
import React from 'react';
import { BoardRow } from '@hilla/react-components/BoardRow.js';
import { SplitLayout } from '@hilla/react-components/SplitLayout.js';
import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import boardStyles from './board-styles';

function Example() {
  // tag::snippet[]
  return (
    <SplitLayout className="board-breakpoints">
      <Board style={{ width: '100%' }}>
        <BoardRow>
          <div className="cell">Cell 1</div>
          <div className="cell">Cell 2</div>
          <div className="cell">Cell 3</div>
          <div className="cell">Cell 4</div>
        </BoardRow>
      </Board>
      <div></div>
    </SplitLayout>
  );
  // end::snippet[]
}

export default reactExample(Example, boardStyles); // hidden-source-line
