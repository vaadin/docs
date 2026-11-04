package com.vaadin.demo.buildingapps.mvvm;

// tag::full[]
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.atomic.AtomicLong;

import com.vaadin.flow.signals.Signal;
import com.vaadin.flow.signals.local.ValueSignal;

class CatalogViewModel {

    private final CatalogService catalogService;

    private final ValueSignal<String> searchText = new ValueSignal<>("");
    private final ValueSignal<AsyncState<List<String>>> results = new ValueSignal<>(
            new AsyncState.Loading<>());

    // Not state that the view shows: bookkeeping for the background work
    private final AtomicLong latestRequest = new AtomicLong();
    private volatile CompletableFuture<List<String>> running;

    CatalogViewModel(CatalogService catalogService) {
        this.catalogService = catalogService;
    }

    Signal<String> searchText() {
        return searchText.asReadonly();
    }

    Signal<AsyncState<List<String>>> results() {
        return results.asReadonly();
    }

    Signal<Boolean> loading() {
        return results.map(r -> r instanceof AsyncState.Loading);
    }

    void refresh() {
        load();
    }

    void search(String text) {
        searchText.set(text == null ? "" : text);
        load();
    }

    // Ignores the answer of the running request, and cancels its future
    void cancel() {
        latestRequest.incrementAndGet();
        CompletableFuture<?> future = running;
        if (future != null) {
            future.cancel(false);
        }
    }

    private void load() {
        long request = latestRequest.incrementAndGet();
        results.set(new AsyncState.Loading<>());
        CompletableFuture<List<String>> future = catalogService
                .search(searchText.peek());
        running = future;
        // Runs on the thread that completes the future
        future.whenComplete((value, error) -> {
            if (request != latestRequest.get()) {
                return; // A newer request or a cancel made this answer stale
            }
            results.set(error == null ? new AsyncState.Loaded<>(value)
                    : new AsyncState.Failed<>(error));
        });
    }
}
// end::full[]
