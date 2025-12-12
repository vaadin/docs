package com.vaadin.demo.component.grid;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.select.Select;
import com.vaadin.flow.component.select.SelectVariant;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.provider.DataProvider;
import com.vaadin.flow.data.renderer.LitRenderer;
import com.vaadin.flow.data.renderer.Renderer;
import com.vaadin.flow.data.value.ValueChangeMode;
import com.vaadin.flow.router.Route;
import org.jetbrains.annotations.NotNull;

import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

@SuppressWarnings("FieldCanBeLocal")
@Route("grid-manual-pagination")
public class GridManualPagination extends VerticalLayout {

    private final PaginationControls paginationControls = new PaginationControls();
    private final DataSource dataSource = new DataSource();

    // tag::snippet[]
    private final DataProvider<Person, String> pagingDataProvider = DataProvider
            .fromFilteringCallbacks(query -> {
                // We are implementing our own way of data pagination.
                // Unfortunately, the data provider contract requires these
                // two methods to be called during data fetch, otherwise
                // IllegalStateException is thrown
                // -> so we just call them but ignore their return values.
                query.getLimit();
                query.getOffset();

                // determine the offset and limit for the current page.
                var offset = paginationControls.calculateOffset();
                var limit = paginationControls.getPageSize();

                return dataSource.fetch(query.getFilter(), offset, limit);
            }, query -> {
                // Total count of filtered items
                var itemCount = dataSource.count(query.getFilter());

                // Recalculate page count here to avoid calling
                // dataSource.count twice
                paginationControls.recalculatePageCount(itemCount);

                var offset = paginationControls.calculateOffset();
                var limit = paginationControls.getPageSize();

                // Return the number of items for the current page, taking the
                // remaining items on the last page into consideration
                var remainingItemsCount = itemCount - offset;
                return Math.min(remainingItemsCount, limit);
            });

    public GridManualPagination() {
        setPadding(false);

        Grid<Person> grid = new Grid<>(Person.class, false);

        grid.addColumn(createPersonRenderer()).setHeader("Name").setFlexGrow(0)
                .setWidth("230px");
        grid.addColumn(Person::getEmail).setHeader("Email");
        grid.addColumn(Person::getProfession).setHeader("Profession");

        grid.setAllRowsVisible(true); // this will prevent scrolling in the grid
        var dataProvider = pagingDataProvider.withConfigurableFilter();
        grid.setDataProvider(dataProvider);

        paginationControls
                .onPageChanged(() -> grid.getDataProvider().refreshAll());

        final TextField searchField = createSearchField();
        searchField.addValueChangeListener(e -> {
            // setFilter will refresh the data provider and trigger data
            // provider fetch / count queries. As a side effect, the pagination
            // controls will be updated.
            dataProvider.setFilter(e.getValue());
        });

        add(searchField, wrapWithVerticalLayout(grid, paginationControls));
    }
    // end::snippet[]

    @NotNull
    private VerticalLayout wrapWithVerticalLayout(Component component1,
            Component component2) {
        var gridWithPaginationLayout = new VerticalLayout(component1,
                component2);
        gridWithPaginationLayout.setPadding(false);
        gridWithPaginationLayout.setSpacing(false);
        gridWithPaginationLayout.getThemeList().add("spacing-xs");
        return gridWithPaginationLayout;
    }

    @NotNull
    private TextField createSearchField() {
        TextField searchField = new TextField();
        searchField.setWidth("50%");
        searchField.setPlaceholder("Search");
        searchField.setPrefixComponent(new Icon(VaadinIcon.SEARCH));
        searchField.setValueChangeMode(ValueChangeMode.EAGER);
        return searchField;
    }

    public static class DataSource {
        private final List<Person> people = DataService.getPeople();

        public Stream<Person> fetch(Optional<String> searchTerm, int offset,
                int limit) {
            // emulate accessing the backend datasource - in a real application
            // this would call, for example, an SQL query, passing an offset and
            // a limit to the query
            return people.stream().filter(
                    person -> matchesSearchTerm(person, searchTerm.orElse("")))
                    .skip(offset).limit(limit);
        }

        public int count(Optional<String> searchTerm) {
            return (int) people.stream().filter(
                    person -> matchesSearchTerm(person, searchTerm.orElse("")))
                    .count();
        }

        public boolean matchesSearchTerm(Person person, String searchTerm) {
            return searchTerm == null || searchTerm.isEmpty()
                    || person.getFullName().toLowerCase()
                            .contains(searchTerm.toLowerCase())
                    || person.getEmail().toLowerCase()
                            .contains(searchTerm.toLowerCase())
                    || person.getProfession().toLowerCase()
                            .contains(searchTerm.toLowerCase());
        }
    }

    public static class PaginationControls extends HorizontalLayout {
        private int totalItemCount = 0;
        private int pageCount = 1;
        private int pageSize = 10;
        private int currentPage = 1;

        private final Span currentPageLabel = currentPageLabel();
        private final Button firstPageButton = firstPageButton();
        private final Button lastPageButton = lastPageButton();
        private final Button goToPreviousPageButton = goToPreviousPageButton();
        private final Button goToNextPageButton = goToNextPageButton();

        private Component createPageSizeField() {
            Select<Integer> select = new Select<>();
            select.addThemeVariants(SelectVariant.LUMO_SMALL);
            select.getStyle().set("--vaadin-input-field-value-font-size",
                    "0.875rem");
            select.setWidth("4.8rem");
            select.setItems(10, 15, 25, 50, 100);
            select.setValue(pageSize);
            select.addValueChangeListener(e -> {
                pageSize = e.getValue();
                updatePageCount();
            });
            var label = new Span("Page size");
            label.setId("page-size-label");
            label.getStyle().set("font-size", "0.875rem");
            select.setAriaLabelledBy("page-size-label");
            final HorizontalLayout layout = new HorizontalLayout(
                    Alignment.CENTER, label, select);
            layout.setSpacing(false);
            layout.getThemeList().add("spacing-s");
            return layout;
        }

        private Runnable pageChangedListener;

        public PaginationControls() {
            setDefaultVerticalComponentAlignment(Alignment.CENTER);
            setSpacing("0.3rem");
            setWidthFull();
            addToStart(createPageSizeField());
            addToEnd(firstPageButton, goToPreviousPageButton, currentPageLabel,
                    goToNextPageButton, lastPageButton);
        }

        private void recalculatePageCount(int totalItemCount) {
            this.totalItemCount = totalItemCount;
            updatePageCount();
        }

        private void updatePageCount() {
            if (totalItemCount == 0) {
                this.pageCount = 1; // we still want to display one page even
                                    // though there are no items
            } else {
                this.pageCount = (int) Math
                        .ceil((double) totalItemCount / pageSize);
            }
            if (currentPage > pageCount) {
                currentPage = pageCount;
            }
            updateControls();
            firePageChangedEvent();
        }

        public int getPageSize() {
            return pageSize;
        }

        public int calculateOffset() {
            return (currentPage - 1) * pageSize;
        }

        private void updateControls() {
            currentPageLabel.setText(
                    String.format("Page %d of %d", currentPage, pageCount));
            firstPageButton.setEnabled(currentPage > 1);
            lastPageButton.setEnabled(currentPage < pageCount);
            goToPreviousPageButton.setEnabled(currentPage > 1);
            goToNextPageButton.setEnabled(currentPage < pageCount);
        }

        private Button firstPageButton() {
            return createIconButton(VaadinIcon.ANGLE_DOUBLE_LEFT,
                    "Go to first page", () -> currentPage = 1);
        }

        private Button lastPageButton() {
            return createIconButton(VaadinIcon.ANGLE_DOUBLE_RIGHT,
                    "Go to last page", () -> currentPage = pageCount);
        }

        private Button goToNextPageButton() {
            return createIconButton(VaadinIcon.ANGLE_RIGHT, "Go to next page",
                    () -> currentPage++);
        }

        private Button goToPreviousPageButton() {
            return createIconButton(VaadinIcon.ANGLE_LEFT,
                    "Go to previous page", () -> currentPage--);
        }

        private Span currentPageLabel() {
            var label = new Span();
            label.getStyle().set("font-size", "0.875rem").set("padding",
                    "0 0.5rem");
            return label;
        }

        private Button createIconButton(VaadinIcon icon, String ariaLabel,
                Runnable onClickListener) {
            Button button = new Button(new Icon(icon));
            button.addThemeVariants(ButtonVariant.LUMO_ICON,
                    ButtonVariant.LUMO_SMALL);
            button.addClickListener(e -> {
                onClickListener.run();
                updateControls();
                firePageChangedEvent();
            });
            button.setAriaLabel(ariaLabel);
            return button;
        }

        private void firePageChangedEvent() {
            if (pageChangedListener != null) {
                pageChangedListener.run();
            }
        }

        public void onPageChanged(Runnable pageChangedListener) {
            this.pageChangedListener = pageChangedListener;
        }
    }

    private static Renderer<Person> createPersonRenderer() {
        return LitRenderer
                .<Person> of(
                        """
                                <vaadin-horizontal-layout style="align-items: center;" theme="spacing">
                                  <vaadin-avatar img="${item.pictureUrl}" name="${item.fullName}"></vaadin-avatar>
                                  <span> ${item.fullName} </span>
                                </vaadin-horizontal-layout>
                                """)
                .withProperty("pictureUrl", Person::getPictureUrl)
                .withProperty("fullName", Person::getFullName);
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<GridManualPagination> { // hidden-source-line
    } // hidden-source-line
}
