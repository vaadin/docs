/**
 * Unit tests for the parsing in sync-versions.mjs: reading the versions out of
 * pom.xml and the Maven dependency tree, and rewriting the AsciiDoc attributes.
 *
 * Run with `npm test` from the repository root.
 */
import assert from 'node:assert/strict';
import test from 'node:test';
import {
  extractPomVersion,
  extractTreeVersion,
  MAPPINGS,
  readAdocAttribute,
  resolveExpected,
  toStartPlatformVersion,
  updateAdocAttribute,
} from './sync-versions.mjs';

const POM = `<project>
  <properties>
    <!-- tag::vaadin-version[] -->
    <vaadin.version>25.3.0-beta3</vaadin.version>
    <!-- end::vaadin-version[] -->
    <spotless.plugin.version>3.3.0</spotless.plugin.version>
  </properties>

  <!-- tag::spring-version[] -->
  <parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>4.1.0</version>
  </parent>
  <!-- end::spring-version[] -->

  <dependencies>
    <dependency>
      <groupId>com.example</groupId>
      <artifactId>unrelated</artifactId>
      <version>1.2.3</version>
    </dependency>
  </dependencies>
</project>
`;

const ADOC = `:vaadin-version: 25.2.0
:vaadin-start-platform-version: v25.2
:vaadin-start-java-version: 21
:vaadin-flow-version: 25.2.0
:spring-boot-version: 4.1.0
:swing-bridge-version: 1.3.0
`;

// Trimmed `mvn dependency:tree -DoutputType=text -Dincludes=com.vaadin:flow-server`
// output. Flow is a transitive dependency, so it's always nested.
const TREE = `[INFO] --- dependency:3.9.0:tree (default-cli) @ docs ---
[INFO] com.vaadin.demo:docs:jar:2.0-SNAPSHOT
[INFO] \\- com.vaadin:vaadin:jar:25.3.0-beta3:compile
[INFO]    \\- com.vaadin:flow-server:jar:25.3.0-beta4:compile
[INFO] BUILD SUCCESS
`;

const vaadin = MAPPINGS.find((m) => m.attribute === 'vaadin-version').source;
const springBoot = MAPPINGS.find((m) => m.attribute === 'spring-boot-version').source;

test('reads the Vaadin version from its tagged region', () => {
  assert.equal(extractPomVersion(POM, vaadin), '25.3.0-beta3');
});

test('reads the Spring Boot version from the parent, not from another dependency', () => {
  assert.equal(extractPomVersion(POM, springBoot), '4.1.0');
});

test('fails loudly when the tag comments are gone', () => {
  assert.throws(
    () => extractPomVersion(POM.replace(/<!--.*?-->/gs, ''), vaadin),
    /no tag::vaadin-version\[\] region/
  );
});

test('fails loudly when the tagged region no longer holds the version', () => {
  const pom = POM.replace('<vaadin.version>25.3.0-beta3</vaadin.version>', '');
  assert.throws(() => extractPomVersion(pom, vaadin), /No <vaadin.version> element/);
});

test('reads an attribute without matching a longer attribute name', () => {
  assert.equal(readAdocAttribute(ADOC, 'vaadin-version'), '25.2.0');
  assert.equal(readAdocAttribute(ADOC, 'spring-boot-version'), '4.1.0');
  assert.equal(readAdocAttribute(ADOC, 'nonexistent-version'), null);
});

test('rewrites only the targeted attribute', () => {
  const updated = updateAdocAttribute(ADOC, 'vaadin-version', '25.3.0-beta3');
  assert.equal(readAdocAttribute(updated, 'vaadin-version'), '25.3.0-beta3');
  assert.equal(readAdocAttribute(updated, 'vaadin-flow-version'), '25.2.0');
  assert.equal(readAdocAttribute(updated, 'vaadin-start-platform-version'), 'v25.2');
  assert.equal(updated.split('\n').length, ADOC.split('\n').length);
});

test('keeps comments and blank lines around the attributes', () => {
  const adoc = `// Generated from pom.xml.\n\n${ADOC}`;
  const updated = updateAdocAttribute(adoc, 'spring-boot-version', '4.2.0');
  assert.ok(updated.startsWith('// Generated from pom.xml.\n\n'));
  assert.equal(readAdocAttribute(updated, 'spring-boot-version'), '4.2.0');
});

test('refuses to add a missing attribute', () => {
  assert.throws(
    () => updateAdocAttribute(ADOC, 'nonexistent-version', '1.0.0'),
    /no :nonexistent-version: attribute/
  );
});

test('picks the Flow version out of the dependency tree', () => {
  // Flow drifts from the platform version -- 25.0.6 shipped Flow 25.0.7 -- so it
  // has to be resolved rather than assumed to match.
  assert.equal(extractTreeVersion(TREE, 'com.vaadin:flow-server'), '25.3.0-beta4');
});

test('fails when the artifact is missing from the dependency tree', () => {
  assert.throws(
    () => extractTreeVersion(TREE, 'com.vaadin:flow-data'),
    /isn't in the Maven dependency tree/
  );
});

test('derives the start.vaadin.com version from the release train', () => {
  assert.equal(toStartPlatformVersion('25.3.0-beta3'), 'v25.3');
  assert.equal(toStartPlatformVersion('25.2.0'), 'v25.2');
  assert.equal(toStartPlatformVersion('24.10.15'), 'v24.10');
  assert.throws(() => toStartPlatformVersion('nonsense'), /Can't derive/);
});

test('resolves every mapped attribute from its own source', () => {
  const expected = resolveExpected(MAPPINGS, {
    pom: POM,
    resolveMaven: (artifact) => extractTreeVersion(TREE, artifact),
  });
  assert.deepEqual(Object.fromEntries(expected), {
    'vaadin-version': '25.3.0-beta3',
    'spring-boot-version': '4.1.0',
    'vaadin-flow-version': '25.3.0-beta4',
    'vaadin-start-platform-version': 'v25.3',
  });
});

test('a derived attribute has to come after the one it derives from', () => {
  const reversed = [...MAPPINGS].reverse();
  assert.throws(
    () => resolveExpected(reversed, { pom: POM, resolveMaven: () => '25.3.0-beta4' }),
    /which isn't resolved yet/
  );
});
