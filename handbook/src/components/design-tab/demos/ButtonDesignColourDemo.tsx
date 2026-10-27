import { useMemo, useState } from 'react';
import { DocDropdownButton } from '../../components/DocDropdownButton';
import { FmsDocButton, type FmsDocButtonState } from '../../components/FmsDocButton';
import { ButtonColourSpecTable } from '../blocks/ButtonColourSpecTable';
import { DesignTabPreviewPanel } from '../blocks/DesignTabPreviewPanel';
import {
  BUTTON_COLOUR_CANVAS_STATES,
  BUTTON_COLOUR_TYPE_OPTIONS,
  getButtonColourTableRows,
  type ButtonColourCanvasState,
  type ButtonColourVariant,
} from './buttonColourSpec';

/** Colour specification — type dropdown, state canvas (Figma 246:7974), token table (246:7978). */
export function ButtonDesignColourDemo() {
  const [variant, setVariant] = useState<ButtonColourVariant>('primary');

  const tableRows = useMemo(() => getButtonColourTableRows(variant), [variant]);

  return (
    <div className="design-tab-controlled-example design-tab-controlled-example--colour">
      <div className="design-tab-controlled-example__controls design-tab-controlled-example__controls--dropdowns">
        <DocDropdownButton
          ariaLabel="Button type for colour specification"
          options={BUTTON_COLOUR_TYPE_OPTIONS}
          value={variant}
          onChange={setVariant}
        />
      </div>
      <DesignTabPreviewPanel label="Button colour preview">
        <div className="design-tab-colour-state-canvas">
          {BUTTON_COLOUR_CANVAS_STATES.map((state) => (
            <div key={state.id} className="design-tab-colour-state-canvas__cell">
              <ColourStateButton variant={variant} state={state.id} label={state.label} />
            </div>
          ))}
        </div>
      </DesignTabPreviewPanel>
      <ButtonColourSpecTable rows={tableRows} />
    </div>
  );
}

function ColourStateButton({
  variant,
  state,
  label,
}: {
  variant: ButtonColourVariant;
  state: ButtonColourCanvasState;
  label: string;
}) {
  const demoHover = state === 'hover';
  const isDanger = state === 'danger';
  let buttonState: FmsDocButtonState = 'default';
  if (state === 'disabled') buttonState = 'disabled';
  if (state === 'pressed') buttonState = 'active';

  const useDangerProp = isDanger && (variant === 'primary' || variant === 'secondary');

  return (
    <FmsDocButton
      variant={variant}
      size="base"
      state={buttonState}
      label={label}
      danger={useDangerProp}
      static
      className={[
        demoHover ? 'fms-doc-btn--demo-visual-hover' : '',
        isDanger && variant === 'tertiary' ? 'fms-doc-btn--colour-danger-tertiary' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    />
  );
}
