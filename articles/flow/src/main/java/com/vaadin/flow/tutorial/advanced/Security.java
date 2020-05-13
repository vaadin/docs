package com.vaadin.flow.tutorial.advanced;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import org.jsoup.Jsoup;
import org.jsoup.safety.Whitelist;

import com.vaadin.flow.component.Html;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.checkbox.Checkbox;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.PreserveOnRefresh;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.tutorial.annotations.CodeFor;
import com.vaadin.flow.tutorial.databinding.Person;

@CodeFor("advanced/framework-security.asciidoc")
@Route("myview")
@PreserveOnRefresh
public class Security extends VerticalLayout {

    Connection dbConnection = null;
    Person user = null;

    public Security() {
        Button button = new Button("Click me for effect!");
        button.setEnabled(false);
        button.addClickListener(e -> {
            // If the Button is disabled, this listener will not run,
            // even if an attacker enables the button client side.
        });

new TextField("Set new username:", valueChangeEvent -> {

    String value = valueChangeEvent.getValue();
    // ‘value’ can contain malicious content!

    // This is the correct way
    String sql = "UPDATE app_users WHERE id=? SET name=?";

    try {
        // Use prepared statement to safely call the DB
        PreparedStatement ps = dbConnection.prepareStatement(sql);

        ps.setLong(1, user.getId());
        ps.setString(2, value);
        ps.executeUpdate();
    } catch (SQLException e) {
        throw new RuntimeException(e);
    }

    // This is the INCORRECT way, DO NOT USE!
    // sql = "UPDATE app_users WHERE id="+ user.getId() +" SET name=\"" + value +
    // "\"";
});

        Div div = new Div();

        // These are safe as they treat the content as plain text
        div.setText("<b>This won't be bolded</b>");
        div.getElement().setText("<b>This won't be bolded either</b>");
        div.setTitle("<b>This won't be bolded either</b>");

        // These are NOT safe
        div.getElement().setProperty("innerHTML", "<b>This IS bolded</b>");
        div.add(new Html("<b>This IS bolded</b>"));

        new Checkbox().setLabelAsHtml("<b>This is bolded too</b>");

        String dangerousText = "";

        String safeHtml = Jsoup.clean(dangerousText, Whitelist.relaxed());
        new Checkbox().setLabelAsHtml(safeHtml);

        // The script below can do whatever it wants, use the method carefully!
        UI.getCurrent().getPage().executeJs("window.alert('This method is inherently unsafe');");

        // This is especially dangerous!
        // We can’t know what the script contains, nor can we make it safe.
        String script = getExternalScript();
        UI.getCurrent().getPage().executeJs(script);

    }

    private String getExternalScript() {
        // If the script is known:
        String script = "window.alert($0)";

        // These parameters are treated in a safe way
        String scriptParam = getScriptParamFromDB();
        UI.getCurrent().getPage().executeJs(script, scriptParam);
        
        return "";
    }

    private String getScriptParamFromDB() {
        return null;
    }
}
