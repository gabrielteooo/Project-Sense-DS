import buttonDoc from '../../content/components/button.json';
import dropdownDoc from '../../content/components/dropdown.json';
import radioDoc from '../../content/components/radio.json';
import type { ComponentDocContent } from '../types/componentDoc';

const DOCS: Record<string, ComponentDocContent> = {
  button: buttonDoc as ComponentDocContent,
  dropdown: dropdownDoc as ComponentDocContent,
  radio: radioDoc as ComponentDocContent,
};

export function getComponentDoc(slug: string): ComponentDocContent | undefined {
  return DOCS[slug];
}

export function documentedComponentSlugs(): string[] {
  return Object.keys(DOCS);
}
