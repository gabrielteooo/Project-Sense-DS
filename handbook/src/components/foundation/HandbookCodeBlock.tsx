type Props = {
  code: string;
};

/** Figma code snippet — dark panel, monospace */
export function HandbookCodeBlock({ code }: Props) {
  return (
    <pre className="handbook-code-block">
      <code>{code}</code>
    </pre>
  );
}
