
const config = {
  "src/main/resources/vaadin-featureflags.properties": {
    target: "src/main/foo/bar/vaadin-featureflags.properties",
    find: "com.vaadin.experimental(.*)",
    replace: "foo$1"
  }
}

for (const file of ["LICENSE", "README.md", "node_modules", "package-lock.json"]) {
  config[file] = {ignore: true};
}

exports.config = config;