package com.vaadin.demo.component.customfield;

import com.vaadin.flow.component.customfield.CustomField;
import com.vaadin.flow.component.customfield.CustomFieldVariant;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.select.Select;
import com.vaadin.flow.component.select.SelectVariant;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.component.textfield.TextFieldVariant;

// tag::snippet[]
public class MoneyField extends CustomField<Money> {

    private TextField amount;
    private Select<String> currency;

    public MoneyField(String label) {
        this();
        setLabel(label);
    }

    public MoneyField() {
        amount = new TextField();
        // Sets title for screen readers
        amount.getElement()
                .executeJs("this.focusElement.setAttribute('title', 'Amount')");

        currency = new Select<>();
        currency.setItems("AUD", "CAD", "CHF", "EUR", "GBP", "JPY", "USD");
        currency.setWidth("6em");
        currency.getElement().executeJs(
                "this.focusElement.setAttribute('title', 'Currency')");

        HorizontalLayout layout = new HorizontalLayout(amount, currency);
        // Removes default spacing
        layout.setSpacing(false);
        // Adds small amount of space between the components
        layout.getThemeList().add("spacing-s");

        add(layout);
    }

    public void addThemeVariant(CustomFieldVariant variant) {
        super.addThemeVariants(variant);
        amount.addThemeVariants(TextFieldVariant.valueOf(variant.name()));
        currency.addThemeVariants(SelectVariant.valueOf(variant.name()));
    }

    @Override
    protected Money generateModelValue() {
        return new Money(amount.getValue(), currency.getValue());
    }

    @Override
    protected void setPresentationValue(Money money) {
        amount.setValue(money.getAmount());
        currency.setValue(money.getCurrency());
    }
}
// end::snippet[]
