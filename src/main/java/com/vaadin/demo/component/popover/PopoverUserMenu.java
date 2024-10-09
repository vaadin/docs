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
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.popover.Popover;
import com.vaadin.flow.component.popover.PopoverVariant;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.component.orderedlayout.FlexComponent;

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
        button.getStyle().set("margin", "var(--lumo-space-s)");
        button.getStyle().set("margin-inline-start", "auto");
        button.getStyle().set("border-radius", "50%");

        Popover popover = new Popover();
        popover.setModal(true);
        popover.setOverlayRole("menu");
        popover.setAriaLabel("User menu");
        popover.setTarget(button);
        popover.addThemeVariants(PopoverVariant.LUMO_NO_PADDING);
        // end::snippet[]

        HorizontalLayout userInfo = new HorizontalLayout();
        userInfo.setSpacing(false);
        userInfo.setAlignItems(FlexComponent.Alignment.CENTER);
        userInfo.getStyle().set("background", "var(--lumo-contrast-5pct)");
        userInfo.getStyle().set("padding", "var(--lumo-space-s)");
        userInfo.getStyle().set("padding-inline-end", "var(--lumo-space-l)");
        userInfo.getStyle().set("margin", "2px");
        userInfo.getStyle().set("gap", "var(--lumo-space-s)");

        Avatar userAvatar = new Avatar(name);
        userAvatar.setImage(pictureUrl);
        userAvatar.getStyle().set("align-self", "center");
        userAvatar.getElement().setAttribute("tabindex", "-1");
        userAvatar.addThemeVariants(AvatarVariant.LUMO_LARGE);

        VerticalLayout nameLayout = new VerticalLayout();
        nameLayout.setSpacing(false);
        nameLayout.setPadding(false);
        nameLayout.getStyle().set("line-height", "var(--lumo-line-height-s)");

        Div fullName = new Div(name);
        fullName.getStyle().set("font-weight", "bold");
        Div nickName = new Div("@" + person.getFirstName().toLowerCase()
                + person.getLastName().toLowerCase());
        nickName.getStyle().set("font-size", "var(--lumo-font-size-s)");
        nickName.getStyle().set("color", "var(--lumo-secondary-text-color)");
        nameLayout.add(fullName, nickName);

        userInfo.add(userAvatar, nameLayout);

        VerticalLayout linksLayout = new VerticalLayout();
        linksLayout.setSpacing(false);
        linksLayout.setPadding(false);
        linksLayout.getStyle().set("padding-bottom", "var(--lumo-space-xs)");
        linksLayout.getStyle().set("align-items", "stretch");
        linksLayout.getStyle().set("--lumo-primary-text-color", "var(--lumo-body-text-color)");

        Anchor profile = new Anchor("#", "User profile");
        profile.getElement().setAttribute("role", "menuitem");
        profile.getStyle().set("padding", "var(--lumo-space-xs) var(--lumo-space-m)");

        Anchor preferences = new Anchor("#", "Preferences");
        preferences.getElement().setAttribute("role", "menuitem");
        preferences.getStyle().set("padding", "var(--lumo-space-xs) var(--lumo-space-m)");

        Anchor signOut = new Anchor("#", "Sign out");
        signOut.getElement().setAttribute("role", "menuitem");
        signOut.getStyle().set("padding", "var(--lumo-space-xs) var(--lumo-space-m)");

        linksLayout.add(profile, preferences, signOut);

        popover.add(userInfo, linksLayout);

        add(button, popover);
    }

    public static class Exporter extends DemoExporter<PopoverUserMenu> { // hidden-source-line
    } // hidden-source-line
}
