package com.vaadin.flow.tutorial.webcomponent.a;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.HtmlImport;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.tutorial.annotations.CodeFor;

@CodeFor("web-components/creating-java-api-for-a-web-component.asciidoc")
@Tag("paper-slider")
@HtmlImport("bower_components/paper-slider/paper-slider.html")
public class PaperSlider extends Component {

    public void setPin(boolean pin) {
        getElement().setProperty("pin", pin);
    }

    public boolean isPin() {
        return getElement().getProperty("pin", false);
    }

    public class DemoView extends VerticalLayout {
        public DemoView() {
            PaperSlider paperSlider = new PaperSlider();
            paperSlider.setPin(true);
            add(paperSlider);
        }

    }

}
