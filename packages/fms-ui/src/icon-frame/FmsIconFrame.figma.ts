// url=https://www.figma.com/design/eQ5MZ0P3yMk6SMjGtfBbmS/Project-Sense-Master-Design-System?node-id=472-11122
// source=packages/fms-ui/src/icon-frame/FmsIconFrame.tsx
// component=FmsIconFrame
import figma from 'figma';

const instance = figma.selectedInstance;

const type = instance.getEnum('Type', {
  Solid: 'solid',
  Regular: 'regular',
  Brand: 'brand',
});

const tone = instance.getEnum('Primary', {
  False: 'default',
  True: 'primary',
});

let name = instance.getString('Icon name');
if (type === 'brand') {
  const brandName = instance.getString('Brand icon name');
  if (brandName?.trim()) {
    name = brandName;
  }
}

const toneProp =
  tone === 'primary' ? figma.code` tone="primary"` : tone === 'onDark' ? figma.code` tone="onDark"` : '';

export default {
  example: figma.code`<FmsIconFrame name="${name || 'envelope'}" type="${type}"${toneProp} />`,
  imports: ['import { FmsIconFrame } from "@fms/ui"'],
  id: 'fms-icon-frame',
  metadata: { nestable: true },
};