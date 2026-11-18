// url=https://www.figma.com/design/eQ5MZ0P3yMk6SMjGtfBbmS/Project-Sense-Master-Design-System?node-id=376-10769
// source=packages/fms-ui/src/breadcrumbs/FmsBreadcrumbLink.tsx
// component=FmsBreadcrumbLink
import figma from 'figma';

const instance = figma.selectedInstance;

const isCurrent = instance.getEnum('State', {
  Default: false,
  Hover: false,
  Current: true,
});

const hasIcon = instance.getBoolean('Icon');
const label = instance.getString('Text');

const iconProps = hasIcon ? figma.code` icon iconName="house"` : '';
const hrefOrCurrent = isCurrent
  ? figma.code` current`
  : figma.code` href="#"`;

export default {
  example: figma.code`
    <FmsBreadcrumbLink label="${label || 'Breadcrumb Link'}"${hrefOrCurrent}${iconProps} />
  `,
  imports: ['import { FmsBreadcrumbLink } from "@fms/ui"'],
  id: 'fms-breadcrumb-link',
  metadata: { nestable: true },
};