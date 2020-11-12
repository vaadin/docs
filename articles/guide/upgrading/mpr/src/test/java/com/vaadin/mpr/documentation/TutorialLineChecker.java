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

/**
 * Tutorial check interface.
 */
interface TutorialLineChecker {

    /**
     * Verifies the given tutorial line.
     *
     * @param tutorialPath the path of the tutorial to verify
     * @param tutorialName the name of the tutorial to verify
     * @param line         the tutorial line to verify
     * @param lineNumber   the number of the line in the file
     * @return list of error messages, if any validation error occurred, empty list otherwise.
     */
    Collection<String> verifyTutorialLine(Path tutorialPath,
                                          String tutorialName, String line, int lineNumber);
}
