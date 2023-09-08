package com.vaadin.demo.component.upload;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.NativeLabel;
import com.vaadin.flow.component.upload.Upload;
import com.vaadin.flow.component.upload.receivers.MultiFileMemoryBuffer;
import com.vaadin.flow.router.Route;

@Route("upload-error-messages")
public class UploadErrorMessages extends Div {

    public UploadErrorMessages() {
        Div cautionExample = setupCautionExample();
        Div recommendedExample = setupRecommendedExample();

        FormLayout formLayout = new FormLayout(cautionExample,
                recommendedExample);
        formLayout.setResponsiveSteps(new FormLayout.ResponsiveStep("0", 1),
                new FormLayout.ResponsiveStep("540px", 2));

        add(formLayout);
    }

    private Div setupCautionExample() {
        MultiFileMemoryBuffer buffer = new MultiFileMemoryBuffer();
        Upload upload = new Upload(buffer);
        upload.setDropAllowed(false);

        UploadExamplesI18N i18N = new UploadExamplesI18N();
        i18N.getUploading().getError()
                .setUnexpectedServerError("Unexpected Server Error");
        upload.setI18n(i18N);

        NativeLabel label = new NativeLabel("Caution");
        label.getStyle().set("font-weight", "600");
        upload.setId("upload-caution");
        label.setFor(upload.getId().get());
        upload.getElement().callJsFunction("setupMockErrorResponse"); // hidden-source-line
        upload.getElement().executeJs( // hidden-source-line
                "this.files = this.createFakeFilesUploadErrorMessagesA()"); // hidden-source-line

        return new Div(label, upload);
    }

    private Div setupRecommendedExample() {
        MultiFileMemoryBuffer buffer = new MultiFileMemoryBuffer();
        // tag::snippet[]
        Upload upload = new Upload(buffer);
        upload.setDropAllowed(false);

        UploadExamplesI18N i18N = new UploadExamplesI18N();
        i18N.getUploading().getError().setUnexpectedServerError(
                "File couldn't be uploaded, please try again later");
        upload.setI18n(i18N);
        // end::snippet[]

        NativeLabel label = new NativeLabel("Recommended");
        label.getStyle().set("font-weight", "600");
        upload.setId("upload-recommended");
        label.setFor(upload.getId().get());
        upload.getElement().callJsFunction("setupMockErrorResponse"); // hidden-source-line
        upload.getElement().executeJs( // hidden-source-line
                "this.files = this.createFakeFilesUploadErrorMessagesB()"); // hidden-source-line

        return new Div(label, upload);
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<UploadErrorMessages> { // hidden-source-line
    } // hidden-source-line
}
