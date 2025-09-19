import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { SplitLayout } from '@vaadin/react-components/SplitLayout.js';
import { Board } from '@vaadin/react-components-pro/Board.js';
import { BoardRow } from '@vaadin/react-components-pro/BoardRow.js';
import boardStyles from './board-styles';

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
