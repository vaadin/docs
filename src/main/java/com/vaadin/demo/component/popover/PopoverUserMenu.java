package com.vaadin.demo.component.popover;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.avatar.Avatar;
import com.vaadin.flow.component.avatar.AvatarVariant;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.html.Anchor;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.popover.Popover;
import com.vaadin.flow.component.popover.PopoverPosition;
import com.vaadin.flow.component.popover.PopoverVariant;
import com.vaadin.flow.router.Route;

@Route("popover-user-menu")
public class PopoverUserMenu extends HorizontalLayout {

    private Person person = DataService.getPeople(1).get(0);

    public PopoverUserMenu() {
        setSpacing(false);
        getStyle().set("background", "var(--lumo-contrast-5pct)");

        // tag::snippet[]
        String name = person.getFirstName() + " " + person.getLastName();
        String pictureUrl = person.getPictureUrl();

        Avatar avatar = new Avatar(name);
        avatar.setImage(pictureUrl);
        avatar.getStyle().set("display", "block");
        avatar.getStyle().set("cursor", "pointer");
        avatar.getElement().setAttribute("tabindex", "-1");

        Button button = new Button(avatar);
        button.addThemeVariants(ButtonVariant.LUMO_ICON,
                ButtonVariant.LUMO_TERTIARY_INLINE);
        button.getStyle().set("margin", "var(--vaadin-gap-s)");
        button.getStyle().set("margin-inline-start", "auto");
        button.getStyle().set("border-radius", "50%");

        Popover popover = new Popover();
        popover.setModal(true);
        popover.setRole("menu");
        popover.setAriaLabel("User menu");
        popover.setTarget(button);
        popover.setPosition(PopoverPosition.BOTTOM_END);
        popover.addThemeVariants(PopoverVariant.LUMO_NO_PADDING);
        // end::snippet[]

        HorizontalLayout userInfo = new HorizontalLayout();
        userInfo.addClassName("userMenuHeader");
        userInfo.setSpacing(false);

        Avatar userAvatar = new Avatar(name);
        userAvatar.setImage(pictureUrl);
        userAvatar.getElement().setAttribute("tabindex", "-1");
        userAvatar.addThemeVariants(AvatarVariant.LUMO_LARGE);

        VerticalLayout nameLayout = new VerticalLayout();
        nameLayout.setSpacing(false);
        nameLayout.setPadding(false);

        Div fullName = new Div(name);
        fullName.getStyle().set("font-weight", "bold");
        Div nickName = new Div("@" + person.getFirstName().toLowerCase()
                + person.getLastName().toLowerCase());
        nickName.addClassName("userMenuNickname");
        nameLayout.add(fullName, nickName);

        userInfo.add(userAvatar, nameLayout);

        VerticalLayout linksLayout = new VerticalLayout();
        linksLayout.setSpacing(false);
        linksLayout.setPadding(false);
        linksLayout.addClassName("userMenuLinks");

        Anchor profile = new Anchor("#", "User profile");
        profile.getElement().setAttribute("role", "menuitem");

        Anchor preferences = new Anchor("#", "Preferences");
        preferences.getElement().setAttribute("role", "menuitem");

        Anchor signOut = new Anchor("#", "Sign out");
        signOut.getElement().setAttribute("role", "menuitem");

        linksLayout.add(profile, preferences, signOut);

        popover.add(userInfo, linksLayout);

        add(button, popover);
    }

    public static class Exporter extends DemoExporter<PopoverUserMenu> { // hidden-source-line
    } // hidden-source-line
}
