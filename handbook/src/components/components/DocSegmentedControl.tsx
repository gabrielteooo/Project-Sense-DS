type Option<T extends string> = {
  value: T;
  label: string;
};

type Props<T extends string> = {
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
  ariaLabel: string;
  size?: 'md' | 'sm';
};

/** Figma *Radio Group* — segmented control for doc canvases (161:40201). */
export function DocSegmentedControl<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
  size = 'md',
}: Props<T>) {
  return (
    <div
      className={[
        'doc-segmented-control',
        size === 'sm' ? 'doc-segmented-control--sm' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      role="radiogroup"
      aria-label={ariaLabel}
    >
      {options.map((option, index) => {
        const selected = option.value === value;
        const isFirst = index === 0;
        const isLast = index === options.length - 1;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            tabIndex={selected ? 0 : -1}
            className={[
              'doc-segmented-control__option',
              selected ? 'doc-segmented-control__option--selected' : '',
              isFirst ? 'doc-segmented-control__option--first' : '',
              isLast ? 'doc-segmented-control__option--last' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            onClick={() => onChange(option.value)}
            onKeyDown={(event) => {
              if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') {
                return;
              }
              event.preventDefault();
              const delta = event.key === 'ArrowRight' ? 1 : -1;
              const nextIndex = (index + delta + options.length) % options.length;
              onChange(options[nextIndex].value);
              const group = event.currentTarget.parentElement;
              const buttons = group?.querySelectorAll<HTMLButtonElement>(
                '.doc-segmented-control__option',
              );
              buttons?.[nextIndex]?.focus();
            }}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
