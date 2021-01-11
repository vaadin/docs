/*
 * Copyright 2000-2020 Vaadin Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
package com.vaadin.flow.tutorial.theme;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.dependency.CssImport;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.component.html.Image;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.tutorial.annotations.CodeFor;

@CodeFor("../documentation-theme/styling-applications.asciidoc")
public class StylingApplications {

  // tag::MyView[]
  @CssImport("./styles/my-view.css")
  public class MyView extends VerticalLayout {
    public MyView() {
      addClassName("my-view");

      H1 heading = new H1("My View Title");
      heading.addClassName("heading");

      Paragraph text = new Paragraph("Thanks for stopping by. Not much to see here. Click the button below to go back to start.");

      Button backButton = new Button("Go Back");
      backButton.addClassName("back-button");

      add(heading, text, backButton);
    }
  }
  // end::MyView[]

  public class ImageView extends Div {
    // tag::Image[]
    Image image = new Image("context://my-image.png", "Alternative text");
    // end::Image[]
  }

  public void icons() {
    // tag::VaadinIcons[]
    Icon edit = new Icon(VaadinIcon.EDIT);
    Icon close = VaadinIcon.CLOSE.create();
    // end::VaadinIcons[]
    //
    // tag::LumoIcon[]
    Icon icon = new Icon("lumo", "clock");
    // end::LumoIcon[]
    new Button("Clock", icon);
  }

}
