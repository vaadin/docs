package com.vaadin.demo.component.richtexteditor;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.richtexteditor.RichTextEditor;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;

@Route("rich-text-editor-basic")
public class RichTextEditorBasic extends Div {

    public RichTextEditorBasic() {
        // tag::snippet[]
        RichTextEditor rte = new RichTextEditor();
        rte.setMaxHeight("400px");
        String valueAsHtml = DataService.getTemplates().getRichTextHtml();
        rte.setValue(valueAsHtml);
        add(rte);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<RichTextEditorBasic> { // hidden-source-line
    } // hidden-source-line
}
