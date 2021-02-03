/**
 * Copyright (C) 2018 Vaadin Ltd
 *
 * This program is available under Commercial Vaadin Add-On License 3.0
 * (CVALv3).
 *
 * See the file licensing.txt distributed with this software for more
 * information about licensing.
 *
 * You should have received a copy of the license along with this program.
 * If not, see <http://vaadin.com/license/cval-3>.
 */
package com.vaadin.mpr.documentation;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import org.junit.Assert;
import org.junit.Test;

import com.vaadin.mpr.documentation.annotations.CodeFor;
import com.vaadin.mpr.documentation.annotations.Helper;

public class TestTutorialCodeCoverage {
    private static final String ASCII_DOC_EXTENSION = ".asciidoc";
    private static final String WEB_SOURCE_MARK = "tutorial::";

    private static final Path DOCS_ROOT = new File(".").toPath();
    private static final Path JAVA_LOCATION = DOCS_ROOT
            .resolve(Paths.get("src", "main", "java"));
    private static final Path HTML_LOCATION = DOCS_ROOT
            .resolve(Paths.get("src", "main", "html"));
    private static final Path CSS_LOCATION = DOCS_ROOT
            .resolve(Paths.get("src", "main", "css"));

    private static final String JAVA_BLOCK_IDENTIFIER = "[source,java]";
    private static final String HTML_BLOCK_IDENTIFIER = "[source,html]";
    private static final String CSS_BLOCK_IDENTIFIER = "[source,css]";

    private static final Path[] JAVA_LOCATIONS = new Path[] { JAVA_LOCATION };

    private final StringBuilder documentationErrors = new StringBuilder();
    private int documentationErrorsCount;

    @Test
    public void verifyTutorialCode() throws IOException {
        List<TutorialLineChecker> lineCheckers = Arrays.asList(
                new CodeFileChecker(JAVA_BLOCK_IDENTIFIER, gatherJavaCode()),
                new CodeFileChecker(CSS_BLOCK_IDENTIFIER,
                        gatherWebFilesCode("css", CSS_LOCATION)),
                new CodeFileChecker(HTML_BLOCK_IDENTIFIER,
                        gatherWebFilesCode("html", HTML_LOCATION)),
                new AsciiDocLinkWithDescriptionChecker("image:",
                        Pattern.compile("image:(.*?)\\[(.*?)]")),
                new AsciiDocLinkWithDescriptionChecker("#,",
                        Pattern.compile("<<(.*?)#,(.*?)>>"),
                        ASCII_DOC_EXTENSION));

        Files.walk(DOCS_ROOT)
                .filter(path -> path.toString().endsWith(ASCII_DOC_EXTENSION))
                .collect(Collectors.toSet())
                .forEach(tutorialPath -> verifyTutorial(tutorialPath,
                        lineCheckers));

        if (documentationErrorsCount > 0) {
            documentationErrors.insert(0,
                    String.format("%nFound %s problems with documentation",
                            documentationErrorsCount));
            Assert.fail(documentationErrors.toString());
        }
    }

    private void verifyTutorial(Path tutorialPath,
            List<TutorialLineChecker> lineCheckers) {
        String tutorialName = DOCS_ROOT.relativize(tutorialPath).toString();
        try {
            AtomicInteger lineCounter = new AtomicInteger();
            for (String line : Files.readAllLines(tutorialPath)) {
                int lineNumber = lineCounter.incrementAndGet();
                lineCheckers.stream()
                        .map(checker -> checker.verifyTutorialLine(tutorialPath,
                                tutorialName, line, lineNumber))
                        .filter(errorList -> !errorList.isEmpty())
                        .flatMap(Collection::stream)
                        .forEach(this::addDocumentationError);
            }
        } catch (IOException e) {
            throw new RuntimeException(
                    "An error during file read occurred, file = "
                            + tutorialPath.toAbsolutePath(),
                    e);
        }
    }

    private Map<String, Set<String>> gatherJavaCode() throws IOException {
        Map<String, Set<String>> codeFileMap = new HashMap<>();

        // Populate map based on @CodeFor annotations
        for (Path javaLocation : JAVA_LOCATIONS) {
            Files.walk(javaLocation)
                    .filter(path -> path.toString().endsWith(".java"))
                    .forEach(path -> extractJavaFiles(javaLocation, path,
                            codeFileMap));
        }

        return codeFileMap;
    }

    private Map<String, Set<String>> gatherWebFilesCode(String extension,
            Path... locations) throws IOException {
        Map<String, Set<String>> codeFileMap = new HashMap<>();

        for (Path location : locations) {
            if (!location.toFile().exists()) {
                continue;
            }
            Files.walk(location)
                    .filter(path -> path.toString().endsWith('.' + extension))
                    .forEach(path -> extractWebFiles(path, codeFileMap));
        }

        return codeFileMap;
    }

    private void extractJavaFiles(Path rootLocation, Path javaFile,
            Map<String, Set<String>> allowedLines) {
        String className = rootLocation.relativize(javaFile).toString()
                .replace(File.separatorChar, '.').replaceAll("\\.java$", "");

        try {
            Class<?> clazz = Class.forName(className, false,
                    getClass().getClassLoader());
            if (clazz == CodeFor.class || clazz == Helper.class) {
                // Ignore the annotation itself
                return;
            }

            CodeFor codeFor = clazz.getAnnotation(CodeFor.class);
            if (codeFor == null) {
                if (clazz.getAnnotation(Helper.class) == null) {
                    addDocumentationError(
                            "Java file without @CodeFor or @Helper: "
                                    + className);
                }
                return;
            }

            String tutorialName = codeFor.value();

            Files.lines(javaFile).forEach(
                    line -> addLineToAllowed(allowedLines, tutorialName, line));
        } catch (ClassNotFoundException | IOException e) {
            throw new RuntimeException(e);
        }
    }

    private void extractWebFiles(Path htmlFile,
            Map<String, Set<String>> allowedLines) {
        try {
            List<String> lines = Files.readAllLines(htmlFile);
            String idLine = lines.remove(0);
            if (idLine.startsWith(WEB_SOURCE_MARK)) {
                String tutorialName = idLine
                        .substring(WEB_SOURCE_MARK.length());
                lines.forEach(line -> addLineToAllowed(allowedLines,
                        tutorialName, line));
            } else {
                addDocumentationError(
                        "Html file with faulty tutorial header: " + htmlFile);
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    private static boolean addLineToAllowed(
            Map<String, Set<String>> allowedLines, String tutorialName,
            String line) {
        return allowedLines
                .computeIfAbsent(tutorialName.replace('/', File.separatorChar),
                        n -> new HashSet<>())
                .add(trimWhitespace(line));
    }

    static String trimWhitespace(String codeLine) {
        return codeLine.replaceAll("\\s", "");
    }

    private void addDocumentationError(String documentationError) {
        documentationErrorsCount++;

        documentationErrors.append(System.lineSeparator());
        documentationErrors
                .append(String.format("%s. ", documentationErrorsCount));
        documentationErrors.append(documentationError);
    }

}
