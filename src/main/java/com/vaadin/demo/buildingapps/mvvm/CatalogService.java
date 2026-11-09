package com.vaadin.demo.buildingapps.mvvm;

// tag::full[]
import java.util.List;
import java.util.concurrent.CompletableFuture;

import org.springframework.core.task.TaskExecutor;
import org.springframework.stereotype.Service;

@Service
public class CatalogService {

    private static final List<String> PRODUCTS = List.of("Desk", "Desk lamp",
            "Monitor", "Monitor arm", "Office chair");

    private final TaskExecutor taskExecutor;

    public CatalogService(TaskExecutor taskExecutor) {
        this.taskExecutor = taskExecutor;
    }

    // In a real application, this would call a slow remote system
    public CompletableFuture<List<String>> search(String text) {
        return CompletableFuture
                .supplyAsync(
                        () -> PRODUCTS.stream()
                                .filter(p -> p.toLowerCase()
                                        .contains(text.toLowerCase()))
                                .toList(),
                        taskExecutor);
    }
}
// end::full[]
