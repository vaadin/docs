package com.vaadin.demo.fusion.upload;

import java.util.UUID;

import org.jspecify.annotations.NonNull;
import org.springframework.web.multipart.MultipartFile;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;

@BrowserCallable
@AnonymousAllowed
public class UploadService {

    /**
     * Simulates uploading a file.
     *
     * @param file
     *            the uploaded file
     * @return an identifier for the uploaded file
     */
    // tag::snippet[]
    @NonNull
    public String uploadFile(@NonNull MultipartFile file) {
        // handle the file as needed
        return file.getOriginalFilename() + '_' + file.getSize() + '_'
                + UUID.randomUUID();
    }
    // end::snippet[]
}
