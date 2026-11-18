// url=https://www.figma.com/design/eQ5MZ0P3yMk6SMjGtfBbmS/Project-Sense-Master-Design-System?node-id=376-26847
// source=packages/fms-ui/src/button/FmsButton.tsx
// component=FmsButton
import figma from 'figma';

const instance = figma.selectedInstance;

const variant = instance.getEnum('Type', {
  Primary: 'primary',
  Secondary: 'secondary',
  Tertiary: 'tertiary',
  Link: 'link',
});

const size = instance.getEnum('Size', {
  Base: 'base',
  Small: 'small',
  'X-Small': 'x-small',
});

const disabled = instance.getEnum('State', {
  Default: false,
  Hover: false,
  Pressed: false,
  Disabled: true,
});

const danger = instance.getEnum('Danger', {
  False: false,
  True: true,
});

const content = instance.getEnum('Content', {
  Basic: 'basic',
  'Icon Only': 'iconOnly',
});

const label = instance.getString('Button Text');
const hasIcon = instance.getBoolean('Icon');

const iconFrame = instance.findInstance('icon frame', { traverseInstances: true });
let iconClass = '';
if (iconFrame && iconFrame.type === 'INSTANCE') {
  const iconText = iconFrame.findText('icon', { traverseInstances: true });
  if (iconText && iconText.type !== 'ERROR' && 'textContent' in iconText) {
    const name = iconText.textContent.trim();
    if (name) {
      iconClass = `fa-regular fa-${name}`;
    }
  }
}

const sharedProps = figma.code`
  variant="${variant}"
  size="${size}"
  ${disabled ? 'disabled' : ''}
  ${danger ? 'danger' : ''}
`;

let example;
if (content === 'iconOnly') {
  example = figma.code`
    <FmsButton
      ${sharedProps}
      iconOnly
      iconClass="${iconClass || 'fa-regular fa-magnifying-glass'}"
      aria-label="${label || 'Action'}"
    />
  `;
} else {
  example = figma.code`
    <FmsButton
      ${sharedProps}
      ${hasIcon && iconClass ? figma.code`iconClass="${iconClass}"` : ''}
    >
      ${label || 'Button'}
    </FmsButton>
  `;
}

export default {
  example,
  imports: ['import { FmsButton } from "@fms/ui"'],
  id: 'fms-button',
  metadata: { nestable: true },
};