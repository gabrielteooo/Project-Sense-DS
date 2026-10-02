import type { ComponentDocButtonVariant } from '../../types/componentDoc';

export type FmsDocButtonSize = 'base' | 'sm' | 'xs';
export type FmsDocButtonState = 'default' | 'disabled' | 'loading' | 'active';

type Props = {
  variant: ComponentDocButtonVariant;
  size?: FmsDocButtonSize;
  state?: FmsDocButtonState;
  label?: string;
  iconClass?: string;
  leadingIconClass?: string;
  /** Primary fill or secondary outline — Figma danger variants */
  danger?: boolean;
  /** Non-interactive preview (e.g. colour state canvas) */
  static?: boolean;
  className?: string;
};

/**
 * Token-aligned button for handbook doc previews.
 * Visual source: Figma `154:13254` (text) / `154:13400` (icon-only); Design tab frame `115:606`.
 */
export function FmsDocButton({
  variant,
  size = 'base',
  state = 'default',
  label = 'Button',
  iconClass = 'fa-regular fa-magnifying-glass',
  leadingIconClass,
  danger = false,
  static: isStatic = false,
  className,
}: Props) {
  const isIconOnly = variant === 'icon-only';
  const disabled = state === 'disabled';
  const loading = state === 'loading';
  const pressed = state === 'active';
  const resolvedState = pressed ? 'active' : state;

  const classNames = [
    'fms-doc-btn',
    `fms-doc-btn--${variant}`,
    `fms-doc-btn--${size}`,
    isIconOnly ? 'fms-doc-btn--icon-only' : '',
    loading ? 'fms-doc-btn--loading' : '',
    pressed ? 'fms-doc-btn--pressed' : '',
    danger ? 'fms-doc-btn--danger' : '',
    isStatic ? 'fms-doc-btn--static' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = loading ? (
    <i className="fa-regular fa-spinner fa-spin fms-doc-btn__icon" aria-hidden />
  ) : isIconOnly ? (
    <i className={`${iconClass} fms-doc-btn__icon`} aria-hidden />
  ) : (
    <>
      {leadingIconClass ? (
        <i className={`${leadingIconClass} fms-doc-btn__icon`} aria-hidden />
      ) : null}
      <span className="fms-doc-btn__label">{label}</span>
    </>
  );

  if (isStatic) {
    return (
      <div className={classNames} data-state={resolvedState} aria-hidden>
        {content}
      </div>
    );
  }

  return (
    <button
      type="button"
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      data-state={resolvedState}
      className={classNames}
      aria-label={isIconOnly ? label : undefined}
    >
      {content}
    </button>
  );
}
