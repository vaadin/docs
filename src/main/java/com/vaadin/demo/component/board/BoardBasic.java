package com.vaadin.demo.component.board;

import com.vaadin.flow.component.HasStyle;
import com.vaadin.flow.component.board.Board;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.dom.Style;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("board-basic")
public class BoardBasic extends Div {

  public BoardBasic() {
    // tag::snippet[]
    Board board = new Board();
    Div cell1 = createCell("Cell 1");
    Div cell2 = createCell("Cell 2");
    Div cell3 = createCell("Cell 3");
    Div cell4 = createCell("Cell 4");

    board.addRow(cell1, cell2, cell3, cell4);
    add(board);
    // end::snippet[]

    setStyles(cell1, cell2, cell3, cell4);
  }

  private Div createCell(String text) {
    Div div = new Div();
    div.setText(text);
    return div;
  }

  private static void setStyles(HasStyle... components) {
    String[] cellColors = new String[] { "#003E53", "#00506B", "#006C90", "#0090C0"};
    for (int i = 0; i < components.length; i++) {
      Style style = components[i].getStyle();
      style.set("padding", "1em");
      style.set("text-align", "center");
      style.set("background-color", cellColors[i]);

      if (i < 5) {
        style.set("color", "white");
      }
    }

  }

  public static class Exporter extends DemoExporter<BoardBasic> { // hidden-source-line
  } // hidden-source-line
}
