package com.vaadin.demo.fusion.crud;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.BrowserCallable;
import dev.hilla.crud.ListService;
import dev.hilla.crud.filter.AndFilter;
import dev.hilla.crud.filter.Filter;
import dev.hilla.crud.filter.PropertyStringFilter;
import org.springframework.data.domain.Pageable;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

//tag::snippet[]
@BrowserCallable
@AnonymousAllowed
public class ProductApiListService implements ListService<ProductDto> {
    @Override
    public List<ProductDto> list(Pageable pageable, Filter filter) {
        Map<String, String> queryParams = new HashMap<>();

        // Pagination
        queryParams.put("offset", String.valueOf(pageable.getPageNumber()));
        queryParams.put("limit", String.valueOf(pageable.getPageSize()));

        // Sorting
        pageable.getSort().stream()
                .findFirst()
                .ifPresent(sortOrder -> {
                    queryParams.put("sort", sortOrder.getProperty());
                    queryParams.put("direction", sortOrder.getDirection().name());
                });

        // Filtering
        if (filter != null && filter instanceof AndFilter andFilter) {
            // Add a query param for each property filter
            // To keep the example simple, only support the equals matcher
            andFilter.getChildren().stream()
                    .filter(f -> f instanceof PropertyStringFilter)
                    .map(f -> (PropertyStringFilter)f)
                    .filter(f -> f.getMatcher() == PropertyStringFilter.Matcher.EQUALS)
                    .forEach(f -> queryParams.put(f.getPropertyId(), f.getFilterValue()));
        }

        // Execute request with query params
        return makeRequest(queryParams);
    }

    private List<ProductDto> makeRequest(Map<String, String> queryParams) {
        // Encode params into URL, call external API, map response...
        return List.of(); // hidden-source-line
    }
}
//end::snippet[]
