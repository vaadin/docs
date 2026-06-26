package com.vaadin.demo.component.badge;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.domain.UserPermissions;
import com.vaadin.flow.component.badge.Badge;
import com.vaadin.flow.component.badge.BadgeVariant;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.router.Route;

import java.util.List;

@Route("badge-icons-only-table")
public class BadgeIconsOnlyTable extends Div {

    public BadgeIconsOnlyTable() {
        Grid<UserPermissions> grid = new Grid<>(UserPermissions.class, false);

        // tag::snippet1[]
        grid.addColumn(UserPermissions::getName).setHeader("Name");
        grid.addComponentColumn(userPermissions -> createPermissionBadge(
                userPermissions.getView())).setHeader("View");
        grid.addComponentColumn(userPermissions -> createPermissionBadge(
                userPermissions.getComment())).setHeader("Comment");
        grid.addComponentColumn(userPermissions -> createPermissionBadge(
                userPermissions.getEdit())).setHeader("Edit");
        // end::snippet1[]

        List<UserPermissions> userPermissions = DataService
                .getUserPermissions();
        grid.setItems(userPermissions);

        add(grid);
    }

    // tag::snippet2[]
    private Badge createPermissionBadge(boolean hasPermission) {
        Badge badge;
        if (hasPermission) {
            badge = new Badge("Yes", VaadinIcon.CHECK.create());
            badge.addThemeVariants(BadgeVariant.SUCCESS,
                    BadgeVariant.ICON_ONLY);
        } else {
            badge = new Badge("No", VaadinIcon.CLOSE_SMALL.create());
            badge.addThemeVariants(BadgeVariant.ERROR, BadgeVariant.ICON_ONLY);
        }
        return badge;
    }

    // end::snippet2[]
    public static class Exporter extends DemoExporter<BadgeIconsOnlyTable> { // hidden-source-line
    } // hidden-source-line
}
