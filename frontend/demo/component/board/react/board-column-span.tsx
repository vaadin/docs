import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Board } from '@hilla/react-components/Board.js';
import { BoardRow } from '@hilla/react-components/BoardRow.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <Board>
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
      <Board>
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
      <Board>
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

export default reactExample(Example); // hidden-source-line
