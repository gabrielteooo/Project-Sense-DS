// url=https://www.figma.com/design/eQ5MZ0P3yMk6SMjGtfBbmS/Project-Sense-Master-Design-System?node-id=399-66
// source=packages/fms-ui/src/badge/FmsBadge.tsx
// component=FmsBadge
import figma from 'figma';

const instance = figma.selectedInstance;

const type = instance.getEnum('Type', {
  Small: 'small',
  Dot: 'dot',
  'Base 99+': 'base-overflow',
  'Small 99+': 'small-overflow',
  Base: 'base',
});

const colorVariant = instance.getEnum('Colour', {
  Default: 'default',
  Primary: 'primary',
});

const dot = type === 'dot';
const size = type === 'small' || type === 'small-overflow' ? 'small' : 'base';

let count = 21;
if (type === 'base-overflow' || type === 'small-overflow') {
  count = 120;
} else if (!dot) {
  const countText = instance.findText('21', { traverseInstances: true });
  if (countText && countText.type !== 'ERROR' && 'textContent' in countText) {
    const parsed = Number.parseInt(countText.textContent.trim(), 10);
    if (!Number.isNaN(parsed)) {
      count = parsed;
    }
  }
}

const sharedProps = figma.code`
  colorVariant="${colorVariant}"
  size="${size}"
`;

const example = dot
  ? figma.code`<FmsBadge dot ${sharedProps} />`
  : figma.code`<FmsBadge ${sharedProps} count={${count}} />`;

export default {
  example,
  imports: ['import { FmsBadge } from "@fms/ui"'],
  id: 'fms-badge',
  metadata: { nestable: true },
};