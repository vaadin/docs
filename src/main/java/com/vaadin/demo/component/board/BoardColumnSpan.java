package com.vaadin.demo.component.board;

import com.vaadin.flow.component.board.Board;
import com.vaadin.flow.component.board.Row;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("board-column-span")
public class BoardColumnSpan extends Div {

    public BoardColumnSpan() {
        // tag::snippet[]
        Board board1 = createBoard1();
        Board board2 = createBoard2();
        Board board3 = createBoard3();
        // end::snippet[]

        addClassName("board-column-span");
        add(board1, board2, board3);
    }

    // tag::createBoard[]
    private static Board createBoard1() {
        Row row1 = new Row();
        row1.add(createCell("Span 2"), 2);
        row1.add(createCell("Span 1"));
        row1.add(createCell("Span 1"));

        Row row2 = new Row();
        row2.add(createCell("Span 1"));
        row2.add(createCell("Span 2"), 2);
        row2.add(createCell("Span 1"));

        Row row3 = new Row();
        row3.add(createCell("Span 1"));
        row3.add(createCell("Span 1"));
        row3.add(createCell("Span 2"), 2);

        Board board = new Board();
        board.add(row1, row2, row3);

        return board;
    }

    private static Board createBoard2() {
        Row row1 = new Row();
        row1.add(createCell("Span 3"), 3);
        row1.add(createCell("Span 1"));

        Row row2 = new Row();
        row2.add(createCell("Span 1"));
        row2.add(createCell("Span 3"), 3);

        Board board = new Board();
        board.add(row1, row2);

        return board;
    }

    private static Board createBoard3() {
        Row row1 = new Row();
        row1.add(createCell("Span 2"), 2);
        row1.add(createCell("Span 1"));

        Row row2 = new Row();
        row2.add(createCell("Span 1"));
        row2.add(createCell("Span 2"), 2);

        Board board = new Board();
        board.add(row1, row2);

        return board;
    }
    // end::createBoard[]

    private static Div createCell(String text) {
        Div div = new Div();
        div.setText(text);
        div.addClassNames("cell");

        return div;
    }

    public static class Exporter extends DemoExporter<BoardColumnSpan> { // hidden-source-line
    } // hidden-source-line
}
