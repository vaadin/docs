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

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Ascii dock link checker.
 */
class AsciiDocLinkWithDescriptionChecker implements TutorialLineChecker {
    private final String linkSyntaxFragment;
    private final Pattern linkPattern;
    private final String fileExtension;

    AsciiDocLinkWithDescriptionChecker(String linkSyntaxFragment,
            Pattern linkPattern) {
        this(linkSyntaxFragment, linkPattern, null);
    }

    AsciiDocLinkWithDescriptionChecker(String linkSyntaxFragment,
            Pattern linkPattern, String linkFileExtension) {
        this.linkSyntaxFragment = linkSyntaxFragment;
        this.linkPattern = linkPattern;
        this.fileExtension = linkFileExtension == null ? "" : linkFileExtension;
    }

    @Override
    public Collection<String> verifyTutorialLine(Path tutorialPath,
            String tutorialName, String line, int lineNumber) {
        if (!line.contains(linkSyntaxFragment)) {
            return Collections.emptyList();
        }

        List<String> validationErrors = new ArrayList<>();

        Matcher matcher = linkPattern.matcher(line);
        while (matcher.find()) {
            if (matchedCorrectValue(matcher)) {
                validateAsciiDocLink(tutorialPath, tutorialName,
                        matcher.group(1), lineNumber).ifPresent(validationErrors::add);
            } else {
                validationErrors.add(String.format(
                        "Received malformed asciidoc link, tutorial = %s, line = %s",
                        tutorialName, line));
            }
        }
        return validationErrors;
    }

    private Optional<String> validateAsciiDocLink(Path tutorialPath,
            String tutorialName, String asciiDocLink, int lineNumber) {
        Path externalTutorialPath = Paths.get(
                tutorialPath.getParent().toString(),
                asciiDocLink + fileExtension);
        if (!Files.isRegularFile(externalTutorialPath)) {
            return Optional.of(String.format(
                    "Could not locate file '%s' referenced in tutorial %s L:%s",
                    asciiDocLink, tutorialName, lineNumber));
        } else {
            return Optional.empty();
        }
    }

    private boolean matchedCorrectValue(Matcher matcher) {
        return matcher.groupCount() == 2 && stringIsNotEmpty(matcher.group(1))
                && stringIsNotEmpty(matcher.group(2));
    }

    private boolean stringIsNotEmpty(String string) {
        return string != null && !string.isEmpty();
    }
}
