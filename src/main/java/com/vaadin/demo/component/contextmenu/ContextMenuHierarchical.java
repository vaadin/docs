package com.vaadin.demo.component.contextmenu;

import com.vaadin.demo.DemoExporter; // hidden-full-source-line
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.grid.contextmenu.GridContextMenu;
import com.vaadin.flow.component.grid.contextmenu.GridMenuItem;
import com.vaadin.flow.component.grid.contextmenu.GridSubMenu;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Hr;
import com.vaadin.flow.router.Route;

import static org.apache.commons.io.FileUtils.byteCountToDisplaySize;

@Route("context-menu-hierarchical")
public class ContextMenuHierarchical extends Div {

  public ContextMenuHierarchical() {
    Grid<File> grid = new Grid();
    grid.setHeightByRows(true);
    grid.setItems(getFiles());

    grid.addColumn(File::getName)
        .setHeader("Name");
    grid.addColumn(File::getDisplaySize)
        .setHeader("Size");

    // tag::snippet[]
    GridContextMenu<File> menu = grid.addContextMenu();
    // end::snippet[]
    menu.addItem("Preview", event -> { /* event.getItem() */ });
    menu.addItem("Edit", event -> { /* event.getItem() */ });
    menu.add(new Hr());

    // tag::snippet[]
    GridMenuItem<File> export = menu.addItem("Export", event -> { /* event.getItem() */ });
    GridSubMenu<File> exportSubMenu = export.getSubMenu();
    exportSubMenu.addItem("Portable Document Format (.pdf)", event -> { /* event.getItem() */ });
    exportSubMenu.addItem("Rich Text Format (.rtf)", event -> { /* event.getItem() */ });
    exportSubMenu.addItem("Plain text (.txt)", event -> { /* event.getItem() */ });
    // end::snippet[]

    GridMenuItem<File> share = menu.addItem("Share", event -> { /* event.getItem() */ });
    GridSubMenu<File> shareSubMenu = share.getSubMenu();
    shareSubMenu.addItem("Copy link", event -> { /* event.getItem() */ });
    shareSubMenu.addItem("Email", event -> { /* event.getItem() */ });

    menu.add(new Hr());
    menu.addItem("Delete", event -> { /* event.getItem() */ });

    add(grid);
  }

  private File[] getFiles() {
    return new File[] {
      new File("Annual Report.docx", 25165824),
      new File("Financials.xlsx", 44040192)
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

  public static class Exporter extends DemoExporter<ContextMenuHierarchical> {} // hidden-full-source-line
}
