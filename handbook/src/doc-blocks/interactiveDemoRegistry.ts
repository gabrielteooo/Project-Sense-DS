/** Allowlisted interactive demos — editors pick by id; no executable code in content. */

export type ButtonInteractiveDemoId =
  | 'button-primary-showcase'
  | 'button-secondary-showcase'
  | 'button-tertiary-showcase';

export type InteractiveDemoId = ButtonInteractiveDemoId;

export type InteractiveDemoDefinition = {
  id: InteractiveDemoId;
  label: string;
  componentSlug: 'button';
  /** Maps to `usage.variantShowcases[].id` in button.json */
  showcaseId: string;
};

export const INTERACTIVE_DEMO_REGISTRY: InteractiveDemoDefinition[] = [
  {
    id: 'button-primary-showcase',
    label: 'Primary button examples',
    componentSlug: 'button',
    showcaseId: 'primary',
  },
  {
    id: 'button-secondary-showcase',
    label: 'Secondary button examples',
    componentSlug: 'button',
    showcaseId: 'secondary',
  },
  {
    id: 'button-tertiary-showcase',
    label: 'Tertiary button examples',
    componentSlug: 'button',
    showcaseId: 'tertiary',
  },
];

const BY_ID = new Map(INTERACTIVE_DEMO_REGISTRY.map((entry) => [entry.id, entry]));

export function getInteractiveDemo(id: string): InteractiveDemoDefinition | undefined {
  return BY_ID.get(id as InteractiveDemoId);
}

export function isAllowlistedDemoId(id: string): id is InteractiveDemoId {
  return BY_ID.has(id as InteractiveDemoId);
}
