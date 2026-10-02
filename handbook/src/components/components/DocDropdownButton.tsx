import { useEffect, useId, useRef, useState } from 'react';

export type DocDropdownOption<T extends string> = {
  value: T;
  label: string;
};

type Props<T extends string> = {
  options: DocDropdownOption<T>[];
  value: T;
  onChange: (value: T) => void;
  ariaLabel: string;
};

/** Handbook doc dropdown trigger (Figma 239:4826). */
export function DocDropdownButton<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
}: Props<T>) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const selected = options.find((o) => o.value === value) ?? options[0];

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, [open]);

  return (
    <div className="doc-dropdown-button" ref={rootRef}>
      <button
        type="button"
        className="doc-dropdown-button__trigger"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="doc-dropdown-button__value">{selected.label}</span>
        <i className="fa-regular fa-chevron-down doc-dropdown-button__chevron" aria-hidden />
      </button>
      {open ? (
        <ul className="doc-dropdown-button__menu" id={listId} role="listbox" aria-label={ariaLabel}>
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <li key={option.value} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  className={[
                    'doc-dropdown-button__option',
                    isSelected ? 'doc-dropdown-button__option--selected' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                >
                  {option.label}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
