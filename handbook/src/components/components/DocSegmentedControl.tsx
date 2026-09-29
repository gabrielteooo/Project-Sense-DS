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
            className={[
              'doc-segmented-control__option',
              selected ? 'doc-segmented-control__option--selected' : '',
              isFirst ? 'doc-segmented-control__option--first' : '',
              isLast ? 'doc-segmented-control__option--last' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
