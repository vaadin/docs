package com.vaadin.demo.component.grid;

import com.vaadin.flow.component.WebComponentExporter;
import com.vaadin.flow.component.webcomponent.WebComponent;

public class GridEditorExporter extends WebComponentExporter<GridEditor> {
  public GridEditorExporter() {
    super("grid-editor");
    System.out.println("regristered");
  }

  @Override
  protected void configureInstance(WebComponent<GridEditor> webComponent, GridEditor demo) {
    System.out.println("demo:"+ demo);
  }
}
