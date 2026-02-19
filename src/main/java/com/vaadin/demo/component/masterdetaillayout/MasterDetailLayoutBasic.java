package com.vaadin.demo.component.masterdetaillayout;

import com.vaadin.demo.domain.Person;
import com.vaadin.demo.domain.DataService;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.masterdetaillayout.MasterDetailLayout;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("master-detail-layout-basic")
public class MasterDetailLayoutBasic extends Div {

    public MasterDetailLayoutBasic() {
        // tag::snippet[]
        MasterDetailLayout layout = new MasterDetailLayout();
        /*
         * Sets the minimum size of the flexible master area to 450px, below
         * which the detail area will be rendered as an overlay:
         */
        layout.setMasterMinSize("450px");
        /* Sets the detail area size to a static size: */
        layout.setDetailSize("250px");
        // end::snippet[]

        PersonList personList = new PersonList(DataService.getPeople());
        layout.setMaster(personList);

        PersonDetail personDetail = new PersonDetail();

        // tag::snippet[]
        /*
         * The detail area is revealed when it's populated with a component, and
         * hidden when the component is removed:
         */
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
        // end::snippet[]

        add(layout);
        setHeightFull();
    }

    public static class Exporter extends DemoExporter<MasterDetailLayoutBasic> { // hidden-source-line
    } // hidden-source-line
}
