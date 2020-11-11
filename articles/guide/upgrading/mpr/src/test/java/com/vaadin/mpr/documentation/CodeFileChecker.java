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

import java.nio.file.Path;
import java.util.Collection;
import java.util.Collections;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

/**
 * Code file checker. Checks that blocks have compiling code samples.
 */
class CodeFileChecker implements TutorialLineChecker {
    private static final String CODE_DECLARATION_LINE = "----";

    private final String codeBlockIdentifier;
    private final Map<String, Set<String>> allowedLinesMap;

    private boolean blockStarted;
    private boolean inBlock;

    CodeFileChecker(String codeBlockIdentifier,
                    Map<String, Set<String>> allowedLinesMap) {
        this.codeBlockIdentifier = codeBlockIdentifier;
        this.allowedLinesMap = allowedLinesMap;
    }

    @Override
    public Collection<String> verifyTutorialLine(Path tutorialPath,
                                                 String tutorialName, String line, int lineNumber) {
        Optional<String> validationResult = Optional.empty();
        if (blockStarted) {
            validationResult = validateBlockStart(tutorialName, line, lineNumber);
        } else if (inBlock) {
            validationResult = validateBlockLine(tutorialName, line, lineNumber);
        } else if (isCodeBlockIdentifier(line)) {
            blockStarted = true;
        }
        return validationResult.map(Collections::singletonList)
                .orElse(Collections.emptyList());
    }

    private boolean isCodeBlockIdentifier(String line) {
        return codeBlockIdentifier.equals(line.replace(" ", ""));
    }

    private Optional<String> validateBlockLine(String tutorialName,
                                               String line, int lineNumber) {
        if (line.equals(CODE_DECLARATION_LINE)) {
            inBlock = false;
        } else {
            Set<String> allowedLines = allowedLinesMap.get(tutorialName);
            if (allowedLines == null) {
                return Optional.of(String.format(
                        "Tutorial %s L:%s has the code block, but has no "
                                + "corresponding code files for code block "
                                + codeBlockIdentifier,
                        tutorialName, lineNumber));
            }

            if (!allowedLines
                    .contains(TestTutorialCodeCoverage.trimWhitespace(line))) {
                return Optional.of(String.format(
                        "Tutorial %s L:%s contains the code line '%s' that is not present in any of the corresponding code files",
                        tutorialName, lineNumber, line));
            }
        }
        return Optional.empty();
    }

    private Optional<String> validateBlockStart(String tutorialName,
                                                String line, int lineNumber) {
        if (!CODE_DECLARATION_LINE.equals(line)) {
            return Optional.of(String.format(
                    "Tutorial %s L:%s has incorrect code block declaration: code block should be surrounded with '%s', got '%s' instead",
                    tutorialName, lineNumber, CODE_DECLARATION_LINE, line));
        }
        blockStarted = false;
        inBlock = true;
        return Optional.empty();
    }
}
