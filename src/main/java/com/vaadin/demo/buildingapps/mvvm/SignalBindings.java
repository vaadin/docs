package com.vaadin.demo.buildingapps.mvvm;

// tag::full[]
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.HasValidation;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.grid.GridMultiSelectionModel;
import com.vaadin.flow.component.grid.GridSelectionColumn;
import com.vaadin.flow.component.grid.dataview.GridLazyDataView;
import com.vaadin.flow.component.grid.dataview.GridListDataView;
import com.vaadin.flow.function.SerializableSupplier;
import com.vaadin.flow.signals.Signal;

/**
 * Binds ViewModel signals to components where Vaadin has no bind method yet.
 * Each binding is an effect owned by the component, so it ends when the
 * component is detached.
 */
public final class SignalBindings {

    /** Fetches one page of items. */
    @FunctionalInterface
    public interface PageFetch<T> extends Serializable {
        Stream<T> fetch(int offset, int limit);
    }

    private SignalBindings() {
    }

    /**
     * Shows the items of a list signal in a grid. The items are set once and
     * refreshed on every change, because setting them again would clear a bound
     * selection. In multi-select mode, set the selection mode first, so that
     * the select-all checkbox is kept right too. Remove this once Grid has its
     * own: https://github.com/vaadin/flow-components/issues/10577
     *
     * @return the data view, for example to set an identifier provider
     */
    public static <T> GridListDataView<T> bindItems(Grid<T> grid,
            Signal<List<T>> items) {
        List<T> rows = new ArrayList<>();
        GridListDataView<T> dataView = grid.setItems(rows);
        Signal.effect(grid, () -> {
            List<T> current = items.get();
            rows.clear();
            rows.addAll(current);
            dataView.refreshAll();
            updateSelectAllCheckbox(grid, rows);
        });
        if (grid.getSelectionModel() instanceof GridMultiSelectionModel<T>) {
            grid.addSelectionListener(e -> updateSelectAllCheckbox(grid, rows));
        }
        return dataView;
    }

    /**
     * Sets the select-all checkbox from the rows and the selection at the end
     * of the round trip, after Grid has set it. Grid sets it only when the
     * selection changes, so it goes stale when the rows change, and it shows an
     * empty grid with an empty selection as all selected. Remove this once Grid
     * keeps it right itself:
     * https://github.com/vaadin/flow-components/issues/10553
     */
    private static <T> void updateSelectAllCheckbox(Grid<T> grid,
            List<T> rows) {
        grid.getUI().ifPresent(ui -> ui.beforeClientResponse(grid, context -> {
            if (!(grid
                    .getSelectionModel() instanceof GridMultiSelectionModel<T> model)
                    || !model.isSelectAllCheckboxVisible()) {
                return;
            }
            long size = rows.size();
            long selected = rows.stream().filter(model::isSelected).count();
            grid.getChildren().filter(GridSelectionColumn.class::isInstance)
                    .map(GridSelectionColumn.class::cast).findFirst()
                    .ifPresent(column -> {
                        column.setSelectAllCheckboxState(
                                size > 0 && selected == size);
                        column.setSelectAllCheckboxIndeterminateState(
                                selected > 0 && selected < size);
                    });
        }));
    }

    /**
     * Shows items loaded page by page in a grid, and refreshes them whenever
     * the query signal changes. Remove this once Grid has its own:
     * https://github.com/vaadin/flow-components/issues/10577
     *
     * @return the data view, for example to set an identifier provider
     */
    public static <T> GridLazyDataView<T> bindItems(Grid<T> grid,
            Signal<?> query, PageFetch<T> fetch,
            SerializableSupplier<Integer> count) {
        GridLazyDataView<T> dataView = grid.setItems(
                page -> fetch.fetch(page.getOffset(), page.getLimit()),
                page -> count.get());
        Signal.effect(grid, () -> {
            query.get();
            dataView.refreshAll();
        });
        return dataView;
    }

    /**
     * Shows an error signal on a field; a null error means the value is valid.
     * Remove this once fields have their own:
     * https://github.com/vaadin/flow/issues/26829
     */
    public static <F extends Component & HasValidation> void bindError(F field,
            Signal<String> error) {
        field.setManualValidation(true);
        Signal.effect(field, () -> {
            String message = error.get();
            field.setInvalid(message != null);
            field.setErrorMessage(message);
        });
    }
}
// end::full[]
