package com.vaadin.demo.component.menubar;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.ClickEvent;
import com.vaadin.flow.component.ComponentEventListener;
import com.vaadin.flow.component.Text;
import com.vaadin.flow.component.contextmenu.MenuItem;
import com.vaadin.flow.component.contextmenu.SubMenu;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.menubar.MenuBar;
import com.vaadin.flow.router.Route;

@Route("menu-bar-basic")
public class MenuBarCustomTheme extends Div {

  public MenuBarCustomTheme() {
    // tag::snippet[]
    MenuBar menuBar = new MenuBar();
    Text selected = new Text("");
    ComponentEventListener<ClickEvent<MenuItem>> listener = e -> selected.setText(e.getSource().getText());
    Div message = new Div(new Text("Clicked item: "), selected);

    MenuItem view = menuBar.addItem("View", listener);
    view.addThemeNames("custom-theme");

    menuBar.addItem("Edit", listener);

    MenuItem share = menuBar.addItem("Share");
    SubMenu shareSubMenu = share.getSubMenu();

    MenuItem onSocialMedia = shareSubMenu.addItem("On social media");
    onSocialMedia.addThemeNames("custom-theme");

    SubMenu socialMediaSubMenu = onSocialMedia.getSubMenu();
    socialMediaSubMenu.addItem("Facebook", listener);
    socialMediaSubMenu.addItem("Twitter", listener);
    socialMediaSubMenu.addItem("Instagram", listener);
    shareSubMenu.addItem("By email", listener);
    shareSubMenu.addItem("Get Link", listener);

    MenuItem move = menuBar.addItem("Move");
    SubMenu moveSubMenu = move.getSubMenu();
    moveSubMenu.addItem("To folder", listener);
    moveSubMenu.addItem("To trash", listener);

    menuBar.addItem("Duplicate", listener);
    // end::snippet[]

    add(menuBar, message);
  }

  public static class Exporter extends DemoExporter<MenuBarCustomTheme> { // hidden-source-line
  } // hidden-source-line
}
