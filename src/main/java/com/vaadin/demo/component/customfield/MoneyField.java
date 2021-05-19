package com.vaadin.demo.component.customfield;

import com.vaadin.flow.component.customfield.CustomField;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.select.Select;
import com.vaadin.flow.component.textfield.TextField;

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

    currency = new Select();
    currency.setItems("AUD", "CAD", "CHF", "EUR", "GBP", "JPY", "USD");
    currency.setWidth("6em");

    // aria-label for screen readers
    amount.getElement()
      .executeJs("const amount = this.shadowRoot.querySelector('[part=\"value\"]');" +
        "amount.setAttribute('aria-label', 'Amount');" +
        "amount.removeAttribute('aria-labelledby');");
    currency.getElement()
      .executeJs("const currency = this.shadowRoot.querySelector('vaadin-select-text-field').shadowRoot.querySelector('[part=\"input-field\"]');" +
        "currency.setAttribute('aria-label', 'Currency');" +
        "currency.removeAttribute('aria-labelledby');");

    HorizontalLayout layout = new HorizontalLayout(amount, currency);
    // Removes default spacing
    layout.setSpacing(false);
    // Adds small amount of space between the components
    layout.getThemeList().add("spacing-s");

    add(layout);
  }

  public void addThemeVariant(String theme) {
    getElement().getThemeList().add(theme);
    amount.addThemeName(theme);
    currency.getElement().getThemeList().add(theme);
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
