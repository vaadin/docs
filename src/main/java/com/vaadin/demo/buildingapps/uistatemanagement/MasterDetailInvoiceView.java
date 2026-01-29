package com.vaadin.demo.buildingapps.uistatemanagement;

import com.vaadin.flow.component.ComponentEffect;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.datepicker.DatePicker;
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.H2;
import com.vaadin.flow.component.html.H3;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.EmailField;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.binder.Binder;
import com.vaadin.flow.data.validator.EmailValidator;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import com.vaadin.signals.Signal;
import com.vaadin.signals.WritableSignal;
import com.vaadin.signals.local.ValueSignal;
import com.vaadin.signals.shared.SharedListSignal;
import com.vaadin.signals.shared.SharedValueSignal;

import static com.vaadin.demo.buildingapps.uistatemanagement.InvoiceService.EMPTY_DETAILS;
import static com.vaadin.demo.buildingapps.uistatemanagement.InvoiceService.EMPTY_INVOICE;

@Route("building-apps/ui-state-management/master-detail")
@PageTitle("Master-Detail View")
public class MasterDetailInvoiceView extends VerticalLayout {

    private final InvoiceService invoiceService;
    private final SharedListSignal<Invoice> invoiceListSignal = new SharedListSignal<>(Invoice.class);
    private final SharedListSignal<LineItem> lineItemsSignal = new SharedListSignal<>(LineItem.class);
    private final Grid<Invoice> invoiceGrid = new Grid<>(Invoice.class);

    public MasterDetailInvoiceView(InvoiceService invoiceService) {
        this.invoiceService = invoiceService;

        H2 title = new H2("Master-Detail Invoice View");
        Paragraph description = new Paragraph("Select an invoice to view and edit details.");

        invoiceService.fetchInvoices().forEach(invoiceListSignal::insertLast);

        WritableSignal<Invoice> selectedInvoiceSignal = new ValueSignal<>(EMPTY_INVOICE);

        Signal<InvoiceDetails> invoiceDetailsSignal = Signal.computed(() -> {
            Invoice selected = selectedInvoiceSignal.value();
            return (selected != null && !selected.getId().isEmpty())
                    ? invoiceService.fetchInvoiceDetails(selected.getId())
                    : EMPTY_DETAILS;
        });

        // Master Grid
        invoiceGrid.setColumns("id", "customerName", "dueDate", "total", "status");
        ComponentEffect.bind(invoiceGrid, invoiceListSignal, (grid, items) -> {
            var invoices = invoiceListSignal.value().stream()
                    .map(SharedValueSignal::peek).toList();
            grid.setItems(invoices);
            invoiceListSignal.value().forEach(signal -> ComponentEffect.bind(grid, signal, (g, inv) -> g.getDataProvider().refreshItem(inv)));
        });
        invoiceGrid.asSingleSelect().addValueChangeListener(e -> selectedInvoiceSignal.value(e.getValue() != null ? e.getValue() : EMPTY_INVOICE));

        // Detail Panel
        VerticalLayout detailsPanel = createDetailPanel(invoiceDetailsSignal);

        HorizontalLayout layout = new HorizontalLayout(invoiceGrid, detailsPanel);
        layout.setWidthFull();
        invoiceGrid.setWidth("60%");
        detailsPanel.setWidth("40%");

        add(title, description, new Button("New Invoice", e -> addNewInvoice()), layout);
    }

    private VerticalLayout createDetailPanel(Signal<InvoiceDetails> detailsSignal) {
        VerticalLayout panel = new VerticalLayout();
        panel.add(new H3("Invoice Details"));

        TextField name = new TextField("Customer");
        EmailField email = new EmailField("Email");
        DatePicker due = new DatePicker("Due Date");
        FormLayout form = new FormLayout(name, email, due);

        Binder<Invoice> invoiceBinder = new Binder<>(Invoice.class);
        invoiceBinder.bind(name, Invoice::getCustomerName, Invoice::setCustomerName);
        invoiceBinder.bind(due, Invoice::getDueDate, Invoice::setDueDate);

        Binder<InvoiceDetails> detailsBinder = new Binder<>(InvoiceDetails.class);
        detailsBinder.forField(email).withValidator(new EmailValidator("Invalid email")).bind(InvoiceDetails::getCustomerEmail, InvoiceDetails::setCustomerEmail);

        ComponentEffect.effect(this, () -> {
            InvoiceDetails details = detailsSignal.value();
            invoiceBinder.setBean(details.getInvoice());
            detailsBinder.setBean(details);
        });

        invoiceBinder.addValueChangeListener(e -> saveInvoice(invoiceBinder.getBean()));
        detailsBinder.addValueChangeListener(e -> invoiceService.updateDetails(detailsBinder.getBean()));

        Grid<LineItem> itemsGrid = new Grid<>(LineItem.class);
        itemsGrid.setColumns("description", "quantity", "unitPrice", "total");
        itemsGrid.addComponentColumn(item -> new Button(VaadinIcon.CLOSE.create(), e -> removeLineItem(detailsSignal.value(), item)));

        ComponentEffect.bind(itemsGrid, lineItemsSignal, (grid, items) -> {
            grid.setItems(lineItemsSignal.value().stream().map(SharedValueSignal::peek).toList());
            lineItemsSignal.value().forEach(s -> ComponentEffect.bind(grid, s, (g, i) -> g.getDataProvider().refreshItem(i)));
        });

        ComponentEffect.effect(this, () -> {
            lineItemsSignal.clear();
            detailsSignal.value().getLineItems().forEach(lineItemsSignal::insertLast);
        });

        Span status = new Span();
        status.bindText(detailsSignal.map(d -> "Status: " + d.getPaymentStatus()));

        panel.add(form, new H3("Line Items"), new Button("Add Item", e -> addNewLineItem(detailsSignal.value())), itemsGrid, status);
        panel.bindVisible(detailsSignal.map(d -> d != null && !d.getInvoice().getId().isEmpty()));

        return panel;
    }

    private void addNewInvoice() {
        Invoice inv = invoiceService.createNewEmptyInvoice();
        invoiceListSignal.insertLast(inv);
        invoiceGrid.select(inv);
    }

    private void saveInvoice(Invoice inv) {
        invoiceService.updateInvoice(inv);
        updateInvoiceInList(inv);
    }

    private void updateInvoiceInList(Invoice inv) {
        invoiceListSignal.peek().stream()
                .filter(s -> s.peek().getId().equals(inv.getId()))
                .findFirst().ifPresent(s -> s.value(inv));
    }

    private void addNewLineItem(InvoiceDetails details) {
        LineItem item = invoiceService.createNewEmptyLineItem(details.getInvoice().getId());
        lineItemsSignal.insertLast(item);
    }

    private void removeLineItem(InvoiceDetails details, LineItem item) {
        invoiceService.removeLineItem(details.getInvoice().getId(), item);
        lineItemsSignal.value().stream().filter(v -> v.peek().equals(item))
                .findFirst().ifPresent(lineItemsSignal::remove);
        updateInvoiceInList(invoiceService.fetchInvoice(details.getInvoice().getId()));
    }
}
