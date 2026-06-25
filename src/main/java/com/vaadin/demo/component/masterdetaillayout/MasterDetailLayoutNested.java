package com.vaadin.demo.component.masterdetaillayout;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.grid.GridVariant;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.masterdetaillayout.MasterDetailLayout;
import com.vaadin.flow.component.textfield.EmailField;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.signals.Signal;
import com.vaadin.flow.signals.local.ValueSignal;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("master-detail-layout-nested")
public class MasterDetailLayoutNested extends Div {

    private Map<String, List<Person>> peopleByProfession = DataService
            .getPeople().stream()
            .collect(Collectors.groupingBy(Person::getProfession));
    private List<String> professions = peopleByProfession.keySet().stream()
            .sorted().limit(4).toList();

    // Signals for selected profession and person
    private ValueSignal<String> selectedProfession = new ValueSignal<>(
            professions.getFirst());
    private ValueSignal<Person> selectedPerson = new ValueSignal<>(null);

    // Computed signal for people in the selected profession
    private Signal<List<Person>> people = Signal.computed(() -> {
        String profession = selectedProfession.get();
        return profession != null
                ? peopleByProfession.getOrDefault(profession, List.of())
                : List.of();
    });

    public MasterDetailLayoutNested() {
        // tag::snippet[]
        // Outer layout: professions → people
        MasterDetailLayout outerLayout = new MasterDetailLayout();
        outerLayout.setMasterSize("300px");
        outerLayout.setExpandDetail(true);

        // Inner layout: people → person details
        MasterDetailLayout innerLayout = new MasterDetailLayout();
        innerLayout.setMasterSize("500px");
        innerLayout.setExpandDetail(true);

        // Profession grid (outer master)
        Grid<String> professionGrid = new Grid<>();
        professionGrid.addColumn(p -> p).setHeader("Profession");
        professionGrid.setItems(professions);
        professionGrid.asSingleSelect().bindValue(selectedProfession,
                selectedProfession::set);
        professionGrid.setHeightFull();
        professionGrid.addThemeVariants(GridVariant.NO_BORDER);
        outerLayout.setMaster(professionGrid);

        // Person grid (inner master)
        Grid<Person> personGrid = new Grid<>();
        personGrid.addColumn(Person::getFirstName).setHeader("First Name");
        personGrid.addColumn(Person::getLastName).setHeader("Last Name");
        personGrid.addColumn(Person::getEmail).setHeader("Email");
        personGrid.asSingleSelect().bindValue(selectedPerson,
                selectedPerson::set);
        personGrid.setHeightFull();
        personGrid.addThemeVariants(GridVariant.NO_BORDER);
        innerLayout.setMaster(personGrid);

        // Person detail form (inner detail)
        TextField firstNameField = new TextField("First Name");
        firstNameField.setReadOnly(true);
        firstNameField.bindValue(
                selectedPerson.map((p) -> p != null ? p.getFirstName() : ""),
                null);

        TextField lastNameField = new TextField("Last Name");
        lastNameField.setReadOnly(true);
        lastNameField.bindValue(
                selectedPerson.map((p) -> p != null ? p.getLastName() : ""),
                null);

        EmailField emailField = new EmailField("Email");
        emailField.setReadOnly(true);
        emailField.bindValue(
                selectedPerson.map((p) -> p != null ? p.getEmail() : ""), null);

        Button closeButton = new Button("Close",
                event -> selectedPerson.set(null));

        FormLayout formLayout = new FormLayout();
        formLayout.setAutoResponsive(true);
        formLayout.getStyle().set("padding-inline", "var(--vaadin-gap-m)");
        formLayout.add(firstNameField, lastNameField, emailField, closeButton);

        Signal.effect(personGrid, () -> {
            personGrid.setItems(people.get());
            selectedPerson.set(null);
        });

        Signal.effect(outerLayout, () -> {
            outerLayout.setDetail(
                    selectedProfession.get() != null ? innerLayout : null);
        });

        Signal.effect(innerLayout, () -> {
            innerLayout.setDetail(
                    selectedPerson.get() != null ? formLayout : null);
        });

        // Close detail on backdrop click or Escape
        outerLayout.addBackdropClickListener(
                event -> selectedProfession.set(null));
        outerLayout.addDetailEscapePressListener(
                event -> selectedProfession.set(null));
        innerLayout.addBackdropClickListener(event -> selectedPerson.set(null));
        innerLayout.addDetailEscapePressListener(
                event -> selectedPerson.set(null));
        add(outerLayout);
        // end::snippet[]
        setHeightFull();
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<MasterDetailLayoutNested> { // hidden-source-line
    } // hidden-source-line
}
