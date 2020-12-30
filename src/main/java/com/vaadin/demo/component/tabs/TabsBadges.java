package com.vaadin.demo.component.tabs;

import com.vaadin.demo.DemoExporter;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.dependency.CssImport;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.page.Page;
import com.vaadin.flow.component.tabs.Tab;
import com.vaadin.flow.component.tabs.Tabs;
import com.vaadin.flow.dom.Element;
import com.vaadin.flow.router.Route;

@Route("tabs-badges")
@JsModule("@vaadin/vaadin-lumo-styles/badge")
// TODO for some reason this import fails the docs-app build
// @CssImport(value = "./demo/component/tabs/styles.css", include =
// "lumo-badge")
public class TabsBadges extends Div {

  public TabsBadges() {
    // tag::snippet[]
    Tab open = new Tab(new Span("Open"), createBadge("24"));
    Tab completed = new Tab(new Span("Completed"), createBadge("439"));
    Tab cancelled = new Tab(new Span("Cancelled"), createBadge("5"));
    Tabs tabs = new Tabs(open, completed, cancelled);
    add(tabs);
    // end::snippet[]
    Page page = UI.getCurrent().getPage(); // hidden-full-source-line
    Element element = this.getElement(); // hidden-full-source-line
    page.executeJs( // hidden-full-source-line
        "const badgeModule = document.head.querySelector('dom-module#lumo-badge'); if (badgeModule) { const templateChild = badgeModule.querySelector('template').content.firstElementChild; if (templateChild) {$0.getRootNode().querySelector('style').innerHTML += templateChild.textContent; }}", // hidden-full-source-line
        element); // hidden-full-source-line
  }

  private Span createBadge(String text) {
    Span badge = new Span(text);
    badge.getElement().setAttribute("theme", "badge small");
    badge.getStyle().set("margin-inline-start", "var(--lumo-space-xs)");
    return badge;
  }

  public static class Exporter extends DemoExporter<TabsBadges> { // hidden-full-source-line
  } // hidden-full-source-line
}
