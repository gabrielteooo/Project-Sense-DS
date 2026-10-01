import buttonDoc from '../../content/components/button.json';
import dropdownDoc from '../../content/components/dropdown.json';
import radioDoc from '../../content/components/radio.json';

const RAW: Record<string, unknown> = {
  button: buttonDoc,
  dropdown: dropdownDoc,
  radio: radioDoc,
};

export function getComponentDocRaw(slug: string): unknown {
  return RAW[slug];
}
