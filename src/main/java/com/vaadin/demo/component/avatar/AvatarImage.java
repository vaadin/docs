package com.vaadin.demo.component.avatar;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.avatar.Avatar;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.streams.DownloadHandler;

@Route("avatar-image")
public class AvatarImage extends HorizontalLayout {

    private Person person = DataService.getPeople(1).get(0);

    public AvatarImage() {
        String name = person.getFirstName() + " " + person.getLastName();
        String pictureUrl = person.getPictureUrl();

        // tag::snippet[]
        Avatar user = new Avatar(name);
        user.setImage(pictureUrl);

        Avatar company = new Avatar("Company Inc.");
        DownloadHandler imageHandler = DownloadHandler.forClassResource(
                getClass(), "/images/company-logo.png", "company-logo.png");
        company.setImageHandler(imageHandler);
        // end::snippet[]

        add(user, company);
    }

    public static class Exporter extends DemoExporter<AvatarImage> { // hidden-source-line
    } // hidden-source-line
}
