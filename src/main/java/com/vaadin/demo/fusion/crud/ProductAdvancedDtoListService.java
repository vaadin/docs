package com.vaadin.demo.fusion.crud;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.BrowserCallable;
import dev.hilla.Nullable;
import dev.hilla.crud.ListService;
import dev.hilla.crud.filter.AndFilter;
import dev.hilla.crud.filter.Filter;
import dev.hilla.crud.filter.OrFilter;
import dev.hilla.crud.filter.PropertyStringFilter;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;

//tag::snippet[]
@BrowserCallable
@AnonymousAllowed
public class ProductAdvancedDtoListService implements ListService<ProductAdvancedDto> {
    private final ProductRepository productRepository;

    public ProductAdvancedDtoListService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public List<ProductAdvancedDto> list(Pageable pageable, @Nullable Filter filter) {
        // Create page request with mapped sort properties
        pageable = createPageRequest(pageable);
        // Create JPA specification from Hilla filter
        Specification<Product> specification = createSpecification(filter);
        // Fetch data from JPA repository
        return productRepository.findAll(specification, pageable)
                .map(ProductAdvancedDto::fromEntity)
                .toList();
    }

    private Pageable createPageRequest(Pageable pageable) {
        List<Sort.Order> sortOrders = pageable.getSort().stream()
                .map(order -> {
                    // Map DTO property names to JPA property names
                    // For the computed supplierInfo property, just use the supplier name
                    String mappedProperty = switch (order.getProperty()) {
                        case "productName" -> "name";
                        case "productCategory" -> "category";
                        case "productPrice" -> "price";
                        case "supplierInfo" -> "supplier.supplierName";
                        default -> throw new IllegalArgumentException("Unknown sort property " + order.getProperty());
                    };
                    return order.isAscending()
                            ? Sort.Order.asc(mappedProperty)
                            : Sort.Order.desc(mappedProperty);
                }).toList();

        return PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by(sortOrders));
    }

    private Specification<Product> createSpecification(Filter filter) {
        if (filter == null) {
            return Specification.anyOf();
        }
        if (filter instanceof AndFilter andFilter) {
            return Specification.allOf(andFilter.getChildren().stream()
                    .map(this::createSpecification).toList());
        } else if (filter instanceof OrFilter orFilter) {
            return Specification.anyOf(orFilter.getChildren().stream()
                    .map(this::createSpecification).toList());
        } else if (filter instanceof PropertyStringFilter propertyFilter) {
            return filterProperty(propertyFilter);
        } else {
            throw new IllegalArgumentException("Unknown filter type " + filter.getClass().getName());
        }
    }

    private static Specification<Product> filterProperty(PropertyStringFilter filter) {
        String filterValue = filter.getFilterValue();

        // Create filter criteria for each filterable property
        // For the price property, handle the different matchers used by the default header filters
        // For the computed supplier info property, search by supplier name or city
        return (root, query, criteriaBuilder) -> {
            return switch (filter.getPropertyId()) {
                case "productName" -> criteriaBuilder.like(root.get("name"), "%" + filterValue + "%");
                case "productCategory" -> criteriaBuilder.like(root.get("category"), "%" + filterValue + "%");
                case "productPrice" -> switch (filter.getMatcher()) {
                    case EQUALS -> criteriaBuilder.equal(root.get("price"), filterValue);
                    case GREATER_THAN -> criteriaBuilder.greaterThan(root.get("price"), filterValue);
                    case LESS_THAN -> criteriaBuilder.lessThan(root.get("price"), filterValue);
                    default -> throw new IllegalArgumentException("Unsupported matcher: " + filter.getMatcher());
                };
                case "supplierInfo" -> criteriaBuilder.or(
                        criteriaBuilder.like(root.get("supplier").get("supplierName"), "%" + filterValue + "%"),
                        criteriaBuilder.like(root.get("supplier").get("headquarterCity"), "%" + filterValue + "%")
                );
                default -> throw new IllegalArgumentException("Unknown filter property " + filter.getPropertyId());
            };
        };
    }
}
//end::snippet[]
