package com.vaadin.demo.buildingapps.uistatemanagement;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class InvoiceService {

    public static final Invoice EMPTY_INVOICE = new Invoice("", "",
            LocalDate.now(), BigDecimal.ZERO, "");

    public static final InvoiceDetails EMPTY_DETAILS = new InvoiceDetails(
            EMPTY_INVOICE, "", "", List.of(), "");

    private int invoiceIdCounter = 1;
    private int lineItemIdCounter = 1;

    private final List<Invoice> invoices = new ArrayList<>();
    private final List<InvoiceDetails> invoiceDetails = new ArrayList<>();
    {
        invoices.addAll(loadInitialInvoices());
        invoices.forEach(inv -> invoiceDetails
                .add(loadInitialInvoiceDetails(inv.getId())));
    }

    private List<Invoice> loadInitialInvoices() {
        return List.of(
                new Invoice("INV-" + invoiceIdCounter++, "Acme Corp",
                        LocalDate.of(2025, 1, 15),
                        new BigDecimal("1250.00"), "Paid"),
                new Invoice("INV-" + invoiceIdCounter++, "TechStart Inc",
                        LocalDate.of(2025, 1, 16),
                        new BigDecimal("3400.50"), "Pending"),
                new Invoice("INV-" + invoiceIdCounter++, "Global Solutions",
                        LocalDate.of(2025, 1, 17), new BigDecimal("890.00"),
                        "Paid"),
                new Invoice("INV-" + invoiceIdCounter++, "Beta Corp",
                        LocalDate.of(2025, 1, 18),
                        new BigDecimal("2100.75"), "Overdue"));
    }

    private InvoiceDetails loadInitialInvoiceDetails(String invoiceId) {
        Invoice invoice = invoices.stream()
                .filter(inv -> invoiceId.equals(inv.getId())).findFirst()
                .orElseThrow();
        return switch (invoiceId) {
        case "INV-1" -> new InvoiceDetails(invoice, "contact@acmecorp.com",
                "123 Main St, New York, NY 10001",
                List.of(new LineItem(lineItemIdCounter++,
                        "Software License", 5, new BigDecimal("200.00"),
                        new BigDecimal("1000.00")),
                        new LineItem(lineItemIdCounter++, "Support Package",
                                1, new BigDecimal("250.00"),
                                new BigDecimal("250.00"))),
                "Paid on 2025-01-20");
        case "INV-2" -> new InvoiceDetails(invoice, "info@techstart.com",
                "456 Tech Ave, San Francisco, CA 94102",
                List.of(new LineItem(lineItemIdCounter++,
                        "Enterprise License", 10, new BigDecimal("300.00"),
                        new BigDecimal("3000.00")),
                        new LineItem(lineItemIdCounter++,
                                "Training Session", 2,
                                new BigDecimal("200.00"),
                                new BigDecimal("400.00")),
                        new LineItem(lineItemIdCounter++, "Setup Fee", 1,
                                new BigDecimal("0.50"),
                                new BigDecimal("0.50"))),
                "Payment pending - Due 2025-02-15");
        case "INV-3" -> new InvoiceDetails(invoice,
                "billing@globalsolutions.com",
                "789 Business Blvd, Boston, MA 02108",
                List.of(new LineItem(lineItemIdCounter++,
                        "Consulting Hours", 8, new BigDecimal("100.00"),
                        new BigDecimal("800.00")),
                        new LineItem(lineItemIdCounter++, "Travel Expenses",
                                1, new BigDecimal("90.00"),
                                new BigDecimal("90.00"))),
                "Paid on 2025-01-25");
        case "INV-4" -> new InvoiceDetails(invoice, "accounts@betacorp.com",
                "321 Commerce St, Chicago, IL 60601",
                List.of(new LineItem(lineItemIdCounter++,
                        "Annual Subscription", 1, new BigDecimal("2000.00"),
                        new BigDecimal("2000.00")),
                        new LineItem(lineItemIdCounter++, "Extra Storage",
                                1, new BigDecimal("100.75"),
                                new BigDecimal("100.75"))),
                "OVERDUE - Payment was due 2025-01-31");
        default -> null;
        };
    }

    public Invoice createNewEmptyInvoice() {
        var invoice = new Invoice("INV-" + invoiceIdCounter++, "",
                LocalDate.now(), BigDecimal.ZERO, "");
        invoices.add(invoice);
        invoiceDetails
                .add(new InvoiceDetails(invoice, "", "", List.of(), ""));
        return invoice;
    }

    public LineItem createNewEmptyLineItem(String invoiceId) {
        LineItem lineItem = new LineItem(lineItemIdCounter++, "", 0,
                BigDecimal.ZERO, BigDecimal.ZERO);
        invoiceDetails.stream().filter(
                details -> details.getInvoice().getId().equals(invoiceId))
                .findFirst().ifPresent(details -> {
                    List<LineItem> updatedLineItems = new ArrayList<>(
                            details.getLineItems());
                    updatedLineItems.add(lineItem);
                    details.setLineItems(updatedLineItems);
                    updateInvoiceTotal(details.getInvoice());
                });
        return lineItem;
    }

    public List<Invoice> fetchInvoices() {
        return new ArrayList<>(invoices);
    }

    public InvoiceDetails fetchInvoiceDetails(String invoiceId) {
        return invoiceDetails.stream().filter(
                details -> details.getInvoice().getId().equals(invoiceId))
                .findFirst().orElseThrow();
    }

    public void updateInvoice(Invoice invoice) {
        invoices.replaceAll(inv -> inv.getId().equals(invoice.getId()) ? invoice : inv);
        invoiceDetails.replaceAll(details -> {
            if (details.getInvoice().getId().equals(invoice.getId())) {
                return new InvoiceDetails(invoice,
                        details.getCustomerEmail(),
                        details.getCustomerAddress(),
                        details.getLineItems(), details.getPaymentStatus());
            }
            return details;
        });
    }

    public void updateDetails(InvoiceDetails details) {
        invoiceDetails.replaceAll(oldDetails -> {
            if (oldDetails.getInvoice().getId()
                    .equals(details.getInvoice().getId())) {
                return details;
            }
            return oldDetails;
        });
    }

    private void updateInvoiceTotal(Invoice invoice) {
        BigDecimal newTotal = invoiceDetails.stream()
                .filter(details -> details.getInvoice().getId()
                        .equals(invoice.getId()))
                .findFirst().map(InvoiceDetails::getLineItems)
                .orElse(List.of()).stream().map(LineItem::getTotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        invoice.setTotal(newTotal);
        updateInvoice(invoice);
    }

    public void removeLineItem(String id, LineItem lineItem) {
        InvoiceDetails details = fetchInvoiceDetails(id);
        List<LineItem> lineItems = new ArrayList<>(details.getLineItems());
        lineItems.removeIf(li -> li.getId() == lineItem.getId());
        details.setLineItems(Collections.unmodifiableList(lineItems));
        updateInvoiceTotal(details.getInvoice());
    }

    public Invoice fetchInvoice(String id) {
        return invoices.stream().filter(inv -> inv.getId().equals(id))
                .findFirst().orElseThrow();
    }
}
