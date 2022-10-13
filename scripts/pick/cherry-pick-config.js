
const config = {
  "main/resources/vaadin-featureflags.properties": {
    target: "main/pepe/pepe/vaadin-featureflags.properties",
    find: "com.vaadin.experimental(.*)",
    replace: "foo.$1"
  }
}

for (const f of ["LICENSE", "README.md", "node_modules", "package-lock.json"]) {
  config[f] = {ignore: true};
}

exports.config = config;