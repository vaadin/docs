package com.vaadin.demo.buildingapps.mvvm;

// tag::full[]
import java.util.List;

import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.progressbar.ProgressBar;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.value.ValueChangeMode;
import com.vaadin.flow.router.AfterNavigationEvent;
import com.vaadin.flow.router.AfterNavigationObserver;
import com.vaadin.flow.router.Route;

@Route("building-apps/mvvm/catalog")
class CatalogView extends VerticalLayout implements AfterNavigationObserver {

    private final CatalogViewModel viewModel;

    public CatalogView(CatalogService catalogService) {
        viewModel = new CatalogViewModel(catalogService);

        TextField search = new TextField("Search");
        search.setValueChangeMode(ValueChangeMode.LAZY);
        search.bindValue(viewModel.searchText(), viewModel::search);

        ProgressBar progress = new ProgressBar();
        progress.setIndeterminate(true);
        progress.bindVisible(viewModel.loading());

        Span results = new Span(
                viewModel.results().map(state -> switch (state) {
                case AsyncState.Loading<List<String>> loading -> "Searching…";
                case AsyncState.Loaded<List<String>> loaded ->
                    String.join(", ", loaded.value());
                case AsyncState.Failed<List<String>> failed -> "Search failed";
                }));

        add(search, progress, results);
        addDetachListener(event -> viewModel.cancel());
    }

    @Override
    public void afterNavigation(AfterNavigationEvent event) {
        viewModel.refresh();
    }
}
// end::full[]
