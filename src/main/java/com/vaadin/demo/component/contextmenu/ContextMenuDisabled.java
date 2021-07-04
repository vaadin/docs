package com.vaadin.demo.component.contextmenu;

import com.vaadin.demo.DemoExporter;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.grid.contextmenu.GridContextMenu;
import com.vaadin.flow.component.grid.contextmenu.GridMenuItem;
import com.vaadin.flow.component.grid.contextmenu.GridSubMenu;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Hr;
import com.vaadin.flow.router.Route;

import static org.apache.commons.io.FileUtils.byteCountToDisplaySize;

@Route("context-menu-disabled")
public class ContextMenuDisabled extends Div {

  public ContextMenuDisabled() {
    Grid<File> grid = new Grid();
    grid.setAllRowsVisible(true);
    grid.setItems(getFiles());

    grid.addColumn(File::getName)
        .setHeader("Name");
    grid.addColumn(File::getDisplaySize)
        .setHeader("Size");

    // tag::snippet1[]
    GridContextMenu<File> menu = grid.addContextMenu();
    // end::snippet1[]
    menu.addItem("Preview", event -> {});
    menu.addItem("Edit", event -> {});
    menu.add(new Hr());

    // tag::snippet2[]
    GridMenuItem<File> export = menu.addItem("Export");
    GridSubMenu<File> exportSubMenu = export.getSubMenu();
    GridMenuItem<File> exportPDF = exportSubMenu.addItem("Portable Document Format (.pdf)", event -> {});
    exportPDF.setEnabled(false);
    // end::snippet2[]
    exportSubMenu.addItem("Rich Text Format (.rtf)", event -> {});
    exportSubMenu.addItem("Plain text (.txt)", event -> {});

    GridMenuItem<File> share = menu.addItem("Share");
    GridSubMenu<File> shareSubMenu = share.getSubMenu();
    shareSubMenu.addItem("Copy link", event -> {});
    shareSubMenu.addItem("Email", event -> {});
    menu.add(new Hr());

    // tag::snippet3[]
    GridMenuItem<File> delete = menu.addItem("Delete", event -> {});
    delete.setEnabled(false);
    // end::snippet3[]

    add(grid);
  }

  private File[] getFiles() {
    return new File[] {
      new File("Annual Report.pdf", 25165824),
      new File("Financials.pdf", 44040192)
    };
  }

  private class File {

    private String name;
    private long size;

    File(String name, long size) {
      this.name = name;
      this.size = size;
    }

    public String getName() {
      return name;
    }

    public long getSize() {
      return size;
    }

    public String getDisplaySize() {
      return byteCountToDisplaySize(size);
    }
  }
  public static class Exporter extends DemoExporter<ContextMenuDisabled> {} // hidden-source-line
}
