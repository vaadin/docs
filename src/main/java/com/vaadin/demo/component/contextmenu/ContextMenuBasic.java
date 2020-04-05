package com.vaadin.demo.component.contextmenu;

import com.vaadin.flow.component.Text;
import com.vaadin.flow.component.charts.model.Label;
import com.vaadin.flow.component.contextmenu.ContextMenu;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-full-source-line

@Route("context-menu-basic")
public class ContextMenuBasic extends Div {

  public ContextMenuBasic() {
    // tag::snippet[]
    Text selected = new Text("");
    Div message = new Div(new Text("Selected: "), selected);

    ContextMenu contextMenu = new ContextMenu();
    contextMenu.addItem("Menu Item 1", e -> selected.setText(e.getSource().getText()));
    contextMenu.addItem("Menu Item 2", e -> selected.setText(e.getSource().getText()));

    Paragraph target = new Paragraph("Right click (or long touch on mobile) this text to open the context menu.");
    contextMenu.setTarget(target);

    add(contextMenu, target, message);
    // end::snippet[]
  }

  public static class GridEditorExporter extends DemoExporter<ContextMenuBasic> { // hidden-full-source-line
  } // hidden-full-source-line
}
