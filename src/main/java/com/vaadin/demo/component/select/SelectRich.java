package com.vaadin.demo.component.select;

import java.util.ArrayList;
import java.util.List;

import com.vaadin.demo.DemoExporter; // hidden-full-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Image;
import com.vaadin.flow.component.orderedlayout.FlexLayout;
import com.vaadin.flow.component.select.Select;
import com.vaadin.flow.data.renderer.ComponentRenderer;
import com.vaadin.flow.router.Route;

@Route("select-rich")
public class SelectRich extends Div {

	public SelectRich() {
	
	class Person {
	    private int id;
        private String name;
        private String title;
		public Person(int id, String name, String title) {
		    this.id = id;
            this.name = name;
            this.title = title;
		}
        public int getId() {
            return id;
        }
        public String getName() {
            return name;
        }
        public String getTitle() {
            return title;
        }
	}

    // Have some data
    List<Person> personnel = new ArrayList<Person>();
    personnel.add(new Person(45, "Leelah Leatherbarrow","Allergist"));
    personnel.add(new Person(43, "Gladys Kanyinda", "Dermatologist"));
    personnel.add(new Person(44, "Ogasawara Katsumi","Cardiologist"));
    personnel.add(new Person(42, "Yi Hanying", "Endocrinologist"));

    // tag::snippet[]
    // Create a Select component with some data
    Select<Person> select = new Select<>();
    select.setItems(personnel);
    
    select.setRenderer(new ComponentRenderer<>(person -> {
        FlexLayout wrapper = new FlexLayout();
        
        Image image = new Image();
        image.setSrc("https://randomuser.me/api/portraits/women/" +
                     person.getId() + ".jpg");
        image.setWidth("42px");
        
        Div info = new Div();
        info.setText(person.getName());
        info.getStyle().set("margin-left", "10px");
        
        Div title = new Div();
        title.setText(person.getTitle());
        title.getStyle().set("color", "gray");
        title.getStyle().set("font-size", "80%");
        info.add(title);

        wrapper.add(image, info);
        return wrapper;
    }));

    add(select);
    // end::snippet[]
  }

  public static class SelectRichExporter extends DemoExporter<SelectRich> { // hidden-full-source-line
  } // hidden-full-source-line
}
