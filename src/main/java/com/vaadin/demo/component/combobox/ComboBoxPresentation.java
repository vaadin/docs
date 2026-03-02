package com.vaadin.demo.component.combobox;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.combobox.ComboBox.ItemFilter;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.data.renderer.LitRenderer;
import com.vaadin.flow.data.renderer.Renderer;
import com.vaadin.flow.router.Route;

@Route("combo-box-presentation")
public class ComboBoxPresentation extends Div {

    public ComboBoxPresentation() {
        ItemFilter<Person> filter = (person,
                filterString) -> (person.getFirstName() + " "
                        + person.getLastName() + " " + person.getProfession())
                        .toLowerCase().indexOf(filterString.toLowerCase()) > -1;

        // tag::combobox[]
        ComboBox<Person> comboBox = new ComboBox<>("Choose doctor");
        comboBox.setItems(filter, DataService.getPeople());
        comboBox.setItemLabelGenerator(
                person -> person.getFirstName() + " " + person.getLastName());
        comboBox.setRenderer(createRenderer());
        comboBox.getStyle().set("--vaadin-combo-box-overlay-width", "16em");
        add(comboBox);
        // end::combobox[]
    }

    // tag::renderer[]
    private Renderer<Person> createRenderer() {
        return LitRenderer
                .<Person>of(
                        """
                                <div class="person-item">
                                  <img src="${item.pictureUrl}" alt="Portrait of ${item.firstName} ${item.lastName}" style="width: 2.25rem;" />
                                  <span>${item.firstName} ${item.lastName}</span>
                                  <span>${item.profession}</span>
                                </div>
                                """)
                .withProperty("pictureUrl", Person::getPictureUrl)
                .withProperty("firstName", Person::getFirstName)
                .withProperty("lastName", Person::getLastName)
                .withProperty("profession", Person::getProfession);
    }
    // end::renderer[]

    public static class Exporter extends DemoExporter<ComboBoxPresentation> { // hidden-source-line
    } // hidden-source-line
}
