package com.vaadin.demo.component.grid;

import java.util.List;

import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.AttachEvent;
import com.vaadin.flow.component.DetachEvent;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.page.Page;
import com.vaadin.flow.data.renderer.LitRenderer;
import com.vaadin.flow.shared.Registration;

public class GridResponsiveColumns extends Div {

    // tag::snippet[]
    private static final int BREAKPOINT_PX = 800;

    private final Grid<Person> grid = new Grid<>(Person.class, false);
    private final Grid.Column<Person> combinedColumn;
    private final List<Grid.Column<Person>> wideColumns;
    private Registration resizeListener;

    public GridResponsiveColumns() {
        // A single column that combines the content for narrow screens
        String template = "<b>${item.name}</b><br><small>${item.email}</small>";
        combinedColumn = grid
                .addColumn(LitRenderer.<Person> of(template)
                        .withProperty("name", Person::getFullName)
                        .withProperty("email", Person::getEmail))
                .setHeader("Employee");
        // Separate columns for wide screens
        wideColumns = List.of(
                grid.addColumn(Person::getFullName).setHeader("Name"),
                grid.addColumn(Person::getProfession).setHeader("Profession"),
                grid.addColumn(Person::getEmail).setHeader("Email"));
        grid.setItems(DataService.getPeople()); // hidden-source-line
        add(grid);
    }

    @Override
    protected void onAttach(AttachEvent attachEvent) {
        super.onAttach(attachEvent);
        Page page = attachEvent.getUI().getPage();
        updateColumns(page.getExtendedClientDetails().getWindowInnerWidth());
        resizeListener = page.addBrowserWindowResizeListener(
                event -> updateColumns(event.getWidth()));
    }

    @Override
    protected void onDetach(DetachEvent detachEvent) {
        // Remove the listener to avoid a memory leak
        resizeListener.remove();
        super.onDetach(detachEvent);
    }

    private void updateColumns(int windowWidth) {
        boolean wide = windowWidth >= BREAKPOINT_PX;
        combinedColumn.setVisible(!wide);
        wideColumns.forEach(column -> column.setVisible(wide));
    }
    // end::snippet[]
}
