package com.vaadin.demo.component.masterdetaillayout;

import com.vaadin.demo.domain.Person;
import com.vaadin.demo.domain.DataService;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.masterdetaillayout.MasterDetailLayout;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("master-detail-layout-vertical")
public class MasterDetailLayoutVertical extends Div {

    public MasterDetailLayoutVertical() {
        // tag::snippet[]
        MasterDetailLayout layout = new MasterDetailLayout();
        layout.setOrientation(MasterDetailLayout.Orientation.VERTICAL);
        // end::snippet[]
        layout.setMasterMinSize("150px");
        layout.setDetailSize("250px");

        PersonList personList = new PersonList(DataService.getPeople());
        layout.setMaster(personList);

        PersonDetail personDetail = new PersonDetail();

        personList.getGrid().asSingleSelect().addValueChangeListener(event -> {
            Person selectedPerson = event.getValue();
            if (selectedPerson != null) {
                personDetail.setPerson(selectedPerson);
                layout.setDetail(personDetail);
            } else {
                layout.setDetail(null);
            }
        });

        personDetail
                .addCloseListener(event -> personList.getGrid().deselectAll());

        add(layout);
        setHeightFull();
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<MasterDetailLayoutVertical> { // hidden-source-line
    } // hidden-source-line
}
