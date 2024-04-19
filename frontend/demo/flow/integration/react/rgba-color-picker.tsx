// tag::class[]
import {type ReactElement} from 'react';
import {type RgbaColor, RgbaColorPicker} from "react-colorful";
import {ReactAdapterElement, type RenderHooks} from "Frontend/generated/flow/ReactAdapter";

class RgbaColorPickerElement extends ReactAdapterElement {
  protected override render(hooks: RenderHooks): ReactElement | null { // <1>
    const [color, setColor] =
      hooks.useState<RgbaColor>("color"); // <2>

    return <RgbaColorPicker
      color={color}
      onChange={setColor}
    />; // <3>
  }
}

customElements.define(
  "rgba-color-picker",
  RgbaColorPickerElement
); // <4>
// end::class[]