import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Board } from '@hilla/react-components/Board.js';
import { BoardRow } from '@hilla/react-components/BoardRow.js';
import boardStyles from './board-styles';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <Board className="board-column-span">
        <BoardRow>
          <div className="cell" {...{ 'board-cols': '2' }}>
            Span 2
          </div>
          <div className="cell">Span 1</div>
          <div className="cell">Span 1</div>
        </BoardRow>
        <BoardRow>
          <div className="cell">Span 1</div>
          <div className="cell" {...{ 'board-cols': '2' }}>
            Span 2
          </div>
          <div className="cell">Span 1</div>
        </BoardRow>
        <BoardRow>
          <div className="cell">Span 1</div>
          <div className="cell">Span 1</div>
          <div className="cell" {...{ 'board-cols': '2' }}>
            Span 2
          </div>
        </BoardRow>
      </Board>

      <Board className="board-column-span">
        <BoardRow>
          <div className="cell" {...{ 'board-cols': '3' }}>
            Span 3
          </div>
          <div className="cell">Span 1</div>
        </BoardRow>
        <BoardRow>
          <div className="cell">Span 1</div>
          <div className="cell" {...{ 'board-cols': '3' }}>
            Span 3
          </div>
        </BoardRow>
      </Board>

      <Board className="board-column-span">
        <BoardRow>
          <div className="cell" {...{ 'board-cols': '2' }}>
            Span 2
          </div>
          <div className="cell">Span 1</div>
        </BoardRow>
        <BoardRow>
          <div className="cell">Span 1</div>
          <div className="cell" {...{ 'board-cols': '2' }}>
            Span 2
          </div>
        </BoardRow>
      </Board>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example, boardStyles); // hidden-source-line
