package com.vaadin.flow.tutorial.element;

import com.vaadin.flow.component.ClientCallable;
import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.page.Page;
import com.vaadin.flow.tutorial.annotations.CodeFor;

@CodeFor("element-api/client-server-rpc.asciidoc")
public class RPC extends Component {
    public RPC() {
        getElement().callJsFunction("remoteProcedure", "Hello", "World", 1.0);
        getElement().executeJs("$0.remoteProcedure($1,$2,$3);", getElement(),
                "Hello", "World", 1.0);
    }

    public void clearSelection() {
        getElement().callJsFunction("clearSelection");
    }

    public void setExpanded(Component component) {
        getElement().callJsFunction("expand",
                component.getElement());
    }

    public void complete() {
        // Previous Vaadin Platform versions
        Page page = UI.getCurrent().getPage();
        page.executeJs("$0.complete($1)", this, true);

        // Vaadin 12
        getElement().executeJs("this.complete($0)", true);
    }

    public void checkConstructableStylesheets() {
        getElement().executeJs(
                "return 'adoptedStyleSheets' in document")
                .then(Boolean.class, supported -> {
                    if (supported) {
                        System.out.println(
                                "Feature is supported");
                    } else {
                        System.out.println(
                                "Feature is not supported");
                    }
                });
    }

    @ClientCallable
    public String getGreeting(String name) {
        return "Hello " + name;
    }
}
