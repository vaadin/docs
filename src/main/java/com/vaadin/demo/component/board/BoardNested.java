package com.vaadin.demo.component.board;

import com.vaadin.flow.component.board.Board;
import com.vaadin.flow.component.board.Row;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("board-nested")
public class BoardNested extends Div {
    public BoardNested() {
        // tag::snippet[]
        Row rootRow = new Row();
        rootRow.add(new ExampleStatistics(), 2);

        Row nestedRow = new Row(
                new ExampleIndicator("Current users", "745", "+33.7"),
                new ExampleIndicator("Conversion rate", "18%", "+3.9")
        );
        rootRow.addNestedRow(nestedRow);

        Board board = new Board();
        board.add(rootRow);
        // end::snippet[]

        add(board);
        this.setClassName("board-nested");
    }

    public static class Exporter extends DemoExporter<BoardNested> { // hidden-source-line
    } // hidden-source-line
}
