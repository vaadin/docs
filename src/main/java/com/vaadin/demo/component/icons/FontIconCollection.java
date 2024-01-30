package com.vaadin.demo.component.icons;

import com.vaadin.flow.component.icon.FontIcon;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;

public class FontIconCollection extends VerticalLayout {
    // tag::snippet[]
    public enum FontAwesomeIcons {
        CODE_BRANCH("fa-code-branch"), USER("fa-user");

        private String iconClass;

        FontAwesomeIcons(String iconClass) {
            this.iconClass = iconClass;
        }

        public FontIcon create() {
            return new FontIcon("fa", iconClass);
        }
    }
    // end::snippet[]

    public FontIconCollection() {
        // tag::snippet1[]
        FontIcon codeBranch = FontAwesomeIcons.CODE_BRANCH.create();
        add(codeBranch);
        // end::snippet1[]
    }
}
