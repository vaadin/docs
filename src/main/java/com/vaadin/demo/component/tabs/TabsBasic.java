package com.vaadin.demo.component.tabs;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.tabs.Tabs;
import com.vaadin.flow.component.tabs.Tab;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-full-source-line

@Route("tabs-basic")
public class TabsBasic extends Div {

  public TabsBasic() {
    // tag::snippet[]
    Tab tab1 = new Tab("Tab one");
    Tab tab2 = new Tab("Tab two");
    Tab tab3 = new Tab("Tab three");
    Tabs tabs = new Tabs(tab1, tab2, tab3);

    add(tabs);
    // end::snippet[]
  }

  public static class Exporter extends DemoExporter<TabsBasic> { // hidden-full-source-line
  } // hidden-full-source-line
}
