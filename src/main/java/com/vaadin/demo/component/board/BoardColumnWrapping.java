package com.vaadin.demo.component.board;

import com.vaadin.flow.component.board.Board;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.splitlayout.SplitLayout;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("board-column-wrapping")
public class BoardColumnWrapping extends Div {

    public BoardColumnWrapping() {
        // tag::snippet[]
        Board board = new Board();
        board.addRow(
                createCell("Cell 1"),
                createCell("Cell 2"),
                createCell("Cell 3"),
                createCell("Cell 4")
        );

        SplitLayout splitLayout = new SplitLayout(board, new Div());
        // end::snippet[]

        addClassName("board-column-wrapping");
        add(splitLayout);
    }

    private static Div createCell(String text) {
        Div div = new Div();
        div.setText(text);
        div.addClassNames("cell", "color");

        return div;
    }

    public static class Exporter extends DemoExporter<BoardColumnWrapping> { // hidden-source-line
    } // hidden-source-line
}
