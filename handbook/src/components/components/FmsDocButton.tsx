import type { ComponentDocButtonVariant } from '../../types/componentDoc';

export type FmsDocButtonSize = 'sm' | 'md' | 'lg';

type Props = {
  variant: ComponentDocButtonVariant;
  size?: FmsDocButtonSize;
  disabled?: boolean;
  label?: string;
  iconClass?: string;
  className?: string;
};

/** Token-aligned button for component doc canvases (designer preview, not production API). */
export function FmsDocButton({
  variant,
  size = 'md',
  disabled = false,
  label = 'Button',
  iconClass = 'fa-solid fa-plus',
  className,
}: Props) {
  const isIconOnly = variant === 'icon-only';

  return (
    <button
      type="button"
      disabled={disabled}
      className={[
        'fms-doc-btn',
        `fms-doc-btn--${variant}`,
        `fms-doc-btn--${size}`,
        isIconOnly ? 'fms-doc-btn--icon-only' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      aria-label={isIconOnly ? label : undefined}
    >
      {isIconOnly ? (
        <i className={iconClass} aria-hidden />
      ) : (
        <>
          <span className="fms-doc-btn__label">{label}</span>
        </>
      )}
    </button>
  );
}
