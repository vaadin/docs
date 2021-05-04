package com.vaadin.demo.component.avatar;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.avatar.Avatar;
import com.vaadin.flow.component.contextmenu.MenuItem;
import com.vaadin.flow.component.contextmenu.SubMenu;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.menubar.MenuBar;
import com.vaadin.flow.component.menubar.MenuBarVariant;
import com.vaadin.flow.router.Route;

@Route("avatar-menu-bar")
public class AvatarMenuBar extends Div {

  private Person person = DataService.getPeople(1).get(0);

  public AvatarMenuBar() {
    String name = person.getFirstName() + " " + person.getLastName();
    String pictureUrl = person.getPictureUrl();

    // tag::snippet[]
    Avatar avatar = new Avatar(name);
    avatar.setImage(pictureUrl);

    MenuBar menuBar = new MenuBar();
    menuBar.addThemeVariants(MenuBarVariant.LUMO_TERTIARY_INLINE);

    MenuItem menuItem = menuBar.addItem(avatar);
    SubMenu subMenu = menuItem.getSubMenu();
    subMenu.addItem("Profile");
    subMenu.addItem("Settings");
    subMenu.addItem("Help");
    subMenu.addItem("Sign out");
    // end::snippet[]

    add(menuBar);
  }

  public static class Exporter extends DemoExporter<AvatarMenuBar> { // hidden-source-line
  } // hidden-source-line
}
