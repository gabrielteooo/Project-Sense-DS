// url=https://www.figma.com/design/eQ5MZ0P3yMk6SMjGtfBbmS/Project-Sense-Master-Design-System?node-id=446-26123
// source=packages/fms-ui/src/breadcrumbs/FmsBreadcrumbs.tsx
// component=FmsBreadcrumbs
import figma from 'figma';

export default {
  example: figma.code`
    <FmsBreadcrumbs
      items={[
        { label: 'Home', href: '/', icon: true, iconName: 'house' },
        { label: 'Breadcrumb Link', href: '/section' },
        { label: 'Breadcrumb Link', href: '/section/page' },
        { label: 'Breadcrumb Link', current: true },
      ]}
    />
  `,
  imports: ['import { FmsBreadcrumbs } from "@fms/ui"'],
  id: 'fms-breadcrumbs',
  metadata: { nestable: false },
};