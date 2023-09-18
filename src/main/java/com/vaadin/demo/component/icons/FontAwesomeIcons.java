package com.vaadin.demo.component.icons;

import com.vaadin.flow.component.icon.FontIcon;

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
