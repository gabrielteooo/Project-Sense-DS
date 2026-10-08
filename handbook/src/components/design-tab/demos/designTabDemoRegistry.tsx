import type { ComponentType } from 'react';
import { ButtonAnatomyExample } from '../../components/ButtonAnatomyExample';
import { ButtonStructureExample } from '../../components/ButtonStructureExample';
import { ButtonDesignColourDemo } from './ButtonDesignColourDemo';
import { ButtonDesignConfigurationDemo } from './ButtonDesignConfigurationDemo';
import { ButtonDesignStructureDemo } from './ButtonDesignStructureDemo';
import { ButtonDesignSizeDemo } from './ButtonDesignSizeDemo';
import { ButtonDesignTypographyDemo } from './ButtonDesignTypographyDemo';

export type DesignTabDemoId =
  | 'button-design-configuration'
  | 'button-design-colour'
  | 'button-design-anatomy-canvas'
  | 'button-design-structure'
  | 'button-design-size'
  | 'button-design-typography'
  | 'button-design-structure-canvas';

export type DesignTabDemoDefinition = {
  id: DesignTabDemoId;
  label: string;
  componentSlug: 'button';
  Component: ComponentType;
};

export const DESIGN_TAB_DEMO_REGISTRY: DesignTabDemoDefinition[] = [
  {
    id: 'button-design-configuration',
    label: 'Button configuration',
    componentSlug: 'button',
    Component: ButtonDesignConfigurationDemo,
  },
  {
    id: 'button-design-colour',
    label: 'Button colour specification',
    componentSlug: 'button',
    Component: ButtonDesignColourDemo,
  },
  {
    id: 'button-design-anatomy-canvas',
    label: 'Button anatomy diagram',
    componentSlug: 'button',
    Component: () => (
      <ButtonAnatomyExample ariaLabel="Button anatomy diagram showing container, label, and icon callouts" />
    ),
  },
  {
    id: 'button-design-structure',
    label: 'Button structure specification',
    componentSlug: 'button',
    Component: ButtonDesignStructureDemo,
  },
  {
    id: 'button-design-size',
    label: 'Button size specification',
    componentSlug: 'button',
    Component: ButtonDesignSizeDemo,
  },
  {
    id: 'button-design-typography',
    label: 'Button typography specification',
    componentSlug: 'button',
    Component: ButtonDesignTypographyDemo,
  },
  {
    id: 'button-design-structure-canvas',
    label: 'Button structure diagram',
    componentSlug: 'button',
    Component: () => (
      <ButtonStructureExample ariaLabel="Button structure diagram with padding, gap, and width annotations for Base size" />
    ),
  },
];

const BY_ID = new Map(DESIGN_TAB_DEMO_REGISTRY.map((entry) => [entry.id, entry]));

export function getDesignTabDemo(id: string): DesignTabDemoDefinition | undefined {
  return BY_ID.get(id as DesignTabDemoId);
}
