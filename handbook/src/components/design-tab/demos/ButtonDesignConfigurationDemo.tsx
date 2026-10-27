import { useMemo, useState } from 'react';
import type { ComponentDocButtonVariant } from '../../../types/componentDoc';
import { DocDropdownButton } from '../../components/DocDropdownButton';
import { FmsDocButton, type FmsDocButtonSize } from '../../components/FmsDocButton';
import { DesignTabPreviewPanel } from '../blocks/DesignTabPreviewPanel';

export type ConfigButtonLayout = 'basic' | 'withIcon' | 'iconOnly';

type ConfigSizeId = 'base' | 'small' | 'xSmall';

const SIZE_OPTIONS: { value: ConfigSizeId; label: string }[] = [
  { value: 'base', label: 'Base size' },
  { value: 'small', label: 'Small size' },
  { value: 'xSmall', label: 'X-Small size' },
];

const LAYOUT_OPTIONS: { value: ConfigButtonLayout; label: string }[] = [
  { value: 'basic', label: 'Basic' },
  { value: 'withIcon', label: 'With Icon' },
  { value: 'iconOnly', label: 'Icon only' },
];

const CANVAS_VARIANTS: {
  id: ComponentDocButtonVariant;
  caption: string;
}[] = [
  { id: 'primary', caption: 'Primary' },
  { id: 'secondary', caption: 'Secondary' },
  { id: 'tertiary', caption: 'Tertiary' },
  { id: 'link', caption: 'Link' },
];

const ICON_CLASS = 'fa-regular fa-magnifying-glass';

function sizeToButton(size: ConfigSizeId): FmsDocButtonSize {
  if (size === 'small') return 'sm';
  if (size === 'xSmall') return 'xs';
  return 'base';
}

function isVisibleOnCanvas(variant: ComponentDocButtonVariant, layout: ConfigButtonLayout): boolean {
  if (layout === 'basic') return true;
  if (layout === 'iconOnly') {
    return variant === 'primary' || variant === 'secondary' || variant === 'tertiary';
  }
  return variant === 'primary' || variant === 'secondary';
}

/** Configuration section — size + layout dropdowns; canvas shows hierarchy variants (Figma 154:38773). */
export function ButtonDesignConfigurationDemo() {
  const [size, setSize] = useState<ConfigSizeId>('base');
  const [layout, setLayout] = useState<ConfigButtonLayout>('basic');

  const buttonSize = sizeToButton(size);

  const visibleVariants = useMemo(
    () => CANVAS_VARIANTS.filter((entry) => isVisibleOnCanvas(entry.id, layout)),
    [layout],
  );

  return (
    <div className="design-tab-controlled-example design-tab-controlled-example--configuration">
      <div className="design-tab-controlled-example__controls design-tab-controlled-example__controls--dropdowns">
        <DocDropdownButton
          ariaLabel="Button size"
          options={SIZE_OPTIONS}
          value={size}
          onChange={setSize}
        />
        <DocDropdownButton
          ariaLabel="Button layout"
          options={LAYOUT_OPTIONS}
          value={layout}
          onChange={setLayout}
        />
      </div>
      <DesignTabPreviewPanel label="Button configuration preview">
        <div
          className={[
            'design-tab-config-canvas',
            visibleVariants.length === 2
              ? 'design-tab-config-canvas--two'
              : visibleVariants.length === 3
                ? 'design-tab-config-canvas--three'
                : '',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {visibleVariants.map((entry) => (
            <div key={entry.id} className="design-tab-config-canvas__cell">
              <ConfigurationCanvasButton
                hierarchyVariant={entry.id}
                layout={layout}
                size={buttonSize}
                label={entry.caption}
              />
            </div>
          ))}
        </div>
      </DesignTabPreviewPanel>
    </div>
  );
}

function ConfigurationCanvasButton({
  hierarchyVariant,
  layout,
  size,
  label,
}: {
  hierarchyVariant: ComponentDocButtonVariant;
  layout: ConfigButtonLayout;
  size: FmsDocButtonSize;
  label: string;
}) {
  if (layout === 'iconOnly') {
    return (
      <FmsDocButton
        variant="icon-only"
        size={size}
        label={label}
        iconClass={ICON_CLASS}
        className={`fms-doc-btn--${hierarchyVariant}`}
      />
    );
  }

  const leadingIconClass = layout === 'withIcon' ? ICON_CLASS : undefined;

  return (
    <FmsDocButton
      variant={hierarchyVariant}
      size={size}
      label={label}
      leadingIconClass={leadingIconClass}
    />
  );
}
