package com.vaadin.demo.component.badge;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.domain.UserPermissions;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.router.Route;

import java.util.List;

@Route("badge-icons-only-table")
public class BadgeIconsOnlyTable extends Div {

    public BadgeIconsOnlyTable() {
        Grid<UserPermissions> grid = new Grid<>(UserPermissions.class, false);

        // tag::snippet1[]
        grid.addColumn(UserPermissions::getName).setHeader("Name");
        grid.addComponentColumn(userPermissions ->
                createPermissionIcon(userPermissions.getView()))
                .setHeader("View");
        grid.addComponentColumn(userPermissions ->
                createPermissionIcon(userPermissions.getComment()))
                .setHeader("Comment");
        grid.addComponentColumn(userPermissions ->
                createPermissionIcon(userPermissions.getEdit()))
                .setHeader("Edit");
        // end::snippet1[]

        List<UserPermissions> userPermissions = DataService.getUserPermissions();
        grid.setItems(userPermissions);

        add(grid);
    }

    // tag::snippet2[]
    private Icon createPermissionIcon(boolean hasPermission) {
        Icon icon;
        if (hasPermission) {
            icon = createIcon(VaadinIcon.CHECK, "Yes");
            icon.getElement().getThemeList().add("badge success");
        } else {
            icon = createIcon(VaadinIcon.CLOSE_SMALL, "No");
            icon.getElement().getThemeList().add("badge error");
        }
        return icon;
    }

    private Icon createIcon(VaadinIcon vaadinIcon, String label) {
        Icon icon = vaadinIcon.create();
        icon.getStyle().set("padding", "var(--lumo-space-xs");
        // Accessible label
        icon.getElement().setAttribute("aria-label", label);
        // Tooltip
        icon.getElement().setAttribute("title", label);
        return icon;
    }
    // end::snippet2[]
    public static class Exporter extends DemoExporter<BadgeIconsOnlyTable> { // hidden-source-line
    } // hidden-source-line
}
