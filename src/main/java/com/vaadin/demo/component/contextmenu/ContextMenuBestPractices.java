package com.vaadin.demo.component.contextmenu;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.contextmenu.MenuItem;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.grid.contextmenu.GridContextMenu;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.menubar.MenuBar;
import com.vaadin.flow.component.menubar.MenuBarVariant;
import com.vaadin.flow.router.Route;

import static org.apache.commons.io.FileUtils.byteCountToDisplaySize;

@Route("context-menu-best-practices")
public class ContextMenuBestPractices extends Div {

  public ContextMenuBestPractices() {
    Grid<File> grid = new Grid();
    grid.setAllRowsVisible(true);
    grid.setItems(getFiles());

    grid.addColumn(File::getName)
      .setHeader("Name");
    grid.addColumn(File::getDisplaySize)
      .setHeader("Size");
    // tag::snippet[]
    grid.addComponentColumn(file -> {
      MenuBar menuBar = new MenuBar();
      menuBar.addThemeVariants(MenuBarVariant.LUMO_TERTIARY_INLINE);
      MenuItem menuItem = menuBar.addItem("•••");
      menuItem.getElement().setAttribute("aria-label", "More options");
      return menuBar;
    })
      .setAutoWidth(true)
      .setFlexGrow(0);

    GridContextMenu<File> menu = grid.addContextMenu();
    menu.addItem("Preview", event -> {});
    menu.addItem("Edit", event -> {});
    menu.addItem("Delete", event -> {});
    // end::snippet[]

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
  public static class Exporter extends DemoExporter<ContextMenuBestPractices> {} // hidden-source-line
}
