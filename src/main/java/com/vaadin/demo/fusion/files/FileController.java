package com.vaadin.demo.fusion.files;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.context.annotation.Profile;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

// tag::snippet[]
@Profile("this-is-just-a-demo-class") // hidden-source-line
@RestController
@RequestMapping("/api/files")
public class FileController {

    record StoredFile(String name, MediaType type, byte[] content) {
    }

    // Keeps the files in memory. Use a database or a file store instead.
    private final Map<String, StoredFile> files = new ConcurrentHashMap<>();

    // tag::upload[]
    @PostMapping
    public String upload(@RequestParam("file") MultipartFile file)
            throws IOException {
        var type = file.getContentType() == null
                ? MediaType.APPLICATION_OCTET_STREAM
                : MediaType.parseMediaType(file.getContentType());
        var id = UUID.randomUUID().toString();
        files.put(id, new StoredFile(file.getOriginalFilename(), type,
                file.getBytes()));
        return id;
    }
    // end::upload[]

    // tag::download[]
    @GetMapping("/{id}")
    public ResponseEntity<byte[]> download(@PathVariable String id) {
        var file = files.get(id);
        if (file == null) {
            return ResponseEntity.notFound().build();
        }
        var disposition = ContentDisposition.attachment()
                .filename(file.name(), StandardCharsets.UTF_8).build();
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, disposition.toString())
                .contentType(file.type()).body(file.content());
    }
    // end::download[]
}
// end::snippet[]
