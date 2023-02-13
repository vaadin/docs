export const convertToEnumName = (s: string) => {
  let name = s.toUpperCase().replace(/-/g, '_');
  // Java enums can't start with a number. Prefix with underscore
  if (/^\d/.test(name)) {
    name = `_${name}`;
  }
  return name;
};

async function getText(file: File): Promise<string> {
  const reader = new FileReader();
  return new Promise((resolve) => {
    reader.onload = (e) => {
      const target = e.target!;
      resolve(target.result as string);
    };
    reader.readAsText(file);
  });
}

async function fileListToText(fileList: File[]): Promise<Array<{ name: string; txt: string }>> {
  const list = await Promise.all(
    fileList.map(async (file) => {
      const txt = await getText(file);
      const name = file.name.split('.')[0];
      return { name, txt };
    })
  );

  return list;
}

export async function generateVaadinIconset(
  set: File[],
  jsName: string,
  enumName: string
): Promise<{ js: string; java: string }> {
  const files = await fileListToText(set);
  let size: number | string | undefined;
  const svgs = files.map((f) => {
    // Get the viewbox size
    if (!size && /viewbox/i.test(f.txt)) {
      const viewbox = /viewbox=["']0 0 (.*?) (.*?)["']/i.exec(f.txt);
      if (!viewbox) {
        console.warn('Unusual viewBox definition. Ignoring icon', f.name, f.txt);
      } else if (viewbox[1] !== viewbox[2]) {
        size = Math.max(parseInt(viewbox[1]), parseInt(viewbox[2]));
        console.warn('Icons are not square. Using the largest value.', size);
      }
    }

    return `<g id="${jsName}:${f.name}">${f.txt}</g>`;
  });

  if (!size) {
    size = '24'; // Default if not defined by any icon
  }

  const enums = files.map((f) => convertToEnumName(f.name));

  const output = { js: '', java: '' };

  output.js = `import '@vaadin/icon/vaadin-iconset.js';

const template = document.createElement('template');

template.innerHTML = \`<vaadin-iconset name="${jsName}" size="${size}">
  <svg><defs>
    ${svgs.join('\n    ')}
  </defs></svg>
</vaadin-iconset>\`;

document.head.appendChild(template.content);
`;

  output.java = `import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.icon.IconFactory;
import java.util.Locale;

@JsModule("./icons/${jsName}.js")
public enum ${enumName} implements IconFactory {
    ${enums.join(', ')};

    public Icon create() {
        return new Icon(this.name().toLowerCase(Locale.ENGLISH).replace('_', '-').replaceAll("^-", ""));
    }

    public static final class Icon extends com.vaadin.flow.component.icon.Icon {
        Icon(String icon) {
            super("${jsName}", icon);
        }
    }
}`;

  return output;
}
