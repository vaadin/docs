package com.vaadin.demo;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/connect/_download")
public class DownloadController {

    // Keep it simple security-wise and only allow downloading specific files by assigning them a name
    private static final Map<String, FileInfo> ALLOWED_FILES = Map.of(
            "product-data.sql", new FileInfo("files/product-data.sql", "data.sql")
    );

    @GetMapping
    public ResponseEntity<Resource> downloadFile(@RequestParam("file") String fileName) {
        FileInfo fileInfo = ALLOWED_FILES.get(fileName);
        if (fileInfo == null) {
            return ResponseEntity.notFound().build();
        }

        Resource resource = new ClassPathResource(fileInfo.resourcePath);
        if (resource.exists()) {
            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + fileInfo.fileName);

            return ResponseEntity.ok()
                    .headers(headers)
                    .body(resource);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    private record FileInfo(String resourcePath, String fileName) {}
}
