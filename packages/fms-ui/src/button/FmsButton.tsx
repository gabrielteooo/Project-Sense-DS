import { Button } from 'antd';
import type { ButtonProps } from 'antd';
import { forwardRef, isValidElement, type ReactNode } from 'react';
import { FmsIconFrame } from '../icon-frame/FmsIconFrame';
import styles from './FmsButton.module.css';

export type FmsButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'link';
export type FmsButtonSize = 'base' | 'small' | 'x-small';

const VARIANT_TO_TYPE: Record<FmsButtonVariant, ButtonProps['type']> = {
  primary: 'primary',
  secondary: 'default',
  tertiary: 'text',
  link: 'link',
};

const SIZE_TO_ANT: Record<FmsButtonSize, ButtonProps['size']> = {
  base: 'large',
  small: 'middle',
  'x-small': 'small',
};

export type FmsButtonProps = Omit<ButtonProps, 'type' | 'size' | 'variant' | 'icon' | 'shape'> & {
  /** Figma Type. Default `primary`. */
  variant?: FmsButtonVariant;
  /** Figma Size. Default `base` (40px). */
  size?: FmsButtonSize;
  /** Figma Content = Icon Only. Requires `icon`, `iconClass`, or `aria-label`. */
  iconOnly?: boolean;
  /** Leading icon (with label) or sole icon when `iconOnly`. */
  icon?: ReactNode;
  /** Font Awesome 6 class, e.g. `fa-regular fa-magnifying-glass`. Ignored if `icon` is set. */
  iconClass?: string;
};

/**
 * FMS Button — Ant Design `Button` with Figma Type / Size / Content / Danger names.
 * Hover and pressed are CSS (do not pass a `state` prop). Loading is Ant-native; not in the Figma set.
 */
export const FmsButton = forwardRef<HTMLAnchorElement | HTMLButtonElement, FmsButtonProps>(
  function FmsButton(
    {
      variant = 'primary',
      size = 'base',
      iconOnly = false,
      icon,
      iconClass,
      className,
      children,
      ...rest
    },
    ref,
  ) {
    const faClass = iconClass?.trim();
    const resolvedIcon = isValidElement(icon) ? (
      icon
    ) : faClass ? (
      <FmsIconFrame iconClass={faClass} tone="inherit" className={styles.icon} />
    ) : undefined;
    const ariaLabel =
      rest['aria-label'] ??
      (iconOnly && typeof children === 'string' ? children : undefined);

    return (
      <Button
        ref={ref}
        {...rest}
        type={VARIANT_TO_TYPE[variant]}
        size={SIZE_TO_ANT[size]}
        icon={resolvedIcon}
        aria-label={ariaLabel}
        className={[styles.fmsBtn, iconOnly ? styles.iconOnly : '', className].filter(Boolean).join(' ')}
      >
        {iconOnly ? undefined : children}
      </Button>
    );
  },
);
