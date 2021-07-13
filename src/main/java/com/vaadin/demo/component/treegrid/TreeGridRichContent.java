package com.vaadin.demo.component.treegrid;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.avatar.Avatar;
import com.vaadin.flow.component.html.Anchor;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.treegrid.TreeGrid;
import com.vaadin.flow.router.Route;

import java.util.List;

@Route("tree-grid-rich-content")
public class TreeGridRichContent extends Div {

    private List<Person> managers = DataService.getManagers();

    public TreeGridRichContent() {
        TreeGrid<Person> treeGrid = new TreeGrid<>();
        treeGrid.setItems(managers, this::getStaff);

        // tag::snippet[]
        treeGrid.addComponentHierarchyColumn(person -> {
            Avatar avatar = new Avatar();
            avatar.setName(person.getFullName());
            avatar.setImage(person.getPictureUrl());

            Span fullName = new Span(person.getFullName());

            Span profession = new Span(person.getProfession());
            profession.getStyle()
                    .set("color", "var(--lumo-secondary-text-color)")
                    .set("font-size", "var(--lumo-font-size-s)");;

            VerticalLayout column = new VerticalLayout(fullName, profession);
            column.getStyle()
                    .set("line-height", "var(--lumo-line-height-m)");
            column.setPadding(false);
            column.setSpacing(false);

            HorizontalLayout row = new HorizontalLayout(avatar, column);
            row.setAlignItems(FlexComponent.Alignment.CENTER);
            row.setSpacing(true);
            return row;
        }).setHeader("Employee");

        treeGrid.addComponentColumn(person -> {
            Icon emailIcon = createIcon(VaadinIcon.ENVELOPE);
            Span email = new Span(person.getEmail());

            Anchor emailLink = new Anchor();
            emailLink.add(emailIcon, email);
            emailLink.setHref("mailto:" + person.getEmail());
            emailLink.getStyle()
                    .set("align-items", "center")
                    .set("display", "flex");

            Icon phoneIcon = createIcon(VaadinIcon.PHONE);
            Span phone = new Span(person.getAddress().getPhone());

            Anchor phoneLink = new Anchor();
            phoneLink.add(phoneIcon, phone);
            phoneLink.setHref("tel:" + person.getAddress().getPhone());
            phoneLink.getStyle()
                    .set("align-items", "center")
                    .set("display", "flex");

            VerticalLayout column = new VerticalLayout(emailLink, phoneLink);
            column.getStyle()
                    .set("font-size", "var(--lumo-font-size-s)")
                    .set("line-height", "var(--lumo-line-height-m)");
            column.setPadding(false);
            column.setSpacing(false);
            return column;
        }).setHeader("Contact");
        // end::snippet[]

        add(treeGrid);
    }

    private Icon createIcon(VaadinIcon vaadinIcon) {
        Icon icon = vaadinIcon.create();
        icon.getStyle()
                .set("margin-inline-end", "var(--lumo-space-s)");
        icon.setSize("var(--lumo-icon-size-s)");
        return icon;
    }

    public List<Person> getStaff(Person manager) {
        return DataService.getPeople(manager.getId());
    }
    public static class Exporter extends DemoExporter<TreeGridRichContent> {} // hidden-source-line
}
