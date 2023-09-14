package com.vaadin.demo.component.icons;

import com.vaadin.flow.component.icon.FontIcon;

public enum MyFontIcons {
    CODE_BRANCH("fa-code-branch"), USER("fa-user");

    private String iconClass;

    MyFontIcons(String iconClass) {
        this.iconClass = iconClass;
    }

    public FontIcon create() {
        return new FontIcon("fa", iconClass);
    }
}