import type { DocRichTextFormat } from '../types/docBlocks';

const ALLOWED_HTML_TAGS = new Set([
  'p',
  'br',
  'strong',
  'b',
  'em',
  'i',
  'ul',
  'ol',
  'li',
  'a',
  'h2',
  'h3',
  'h4',
  'code',
  'pre',
  'blockquote',
]);

/** Pages CMS rich-text defaults to Markdown; `format: html` is opt-in per field docs. */
export function inferRichTextFormat(body: string, explicit?: DocRichTextFormat): DocRichTextFormat {
  if (explicit === 'markdown' || explicit === 'html') return explicit;
  const trimmed = body.trim();
  if (trimmed.startsWith('<') && trimmed.includes('>')) return 'html';
  return 'markdown';
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function sanitizeHtml(html: string): string {
  if (typeof DOMParser === 'undefined') {
    return escapeHtml(html);
  }

  const doc = new DOMParser().parseFromString(html, 'text/html');
  const walk = (node: Node): string => {
    if (node.nodeType === Node.TEXT_NODE) {
      return escapeHtml(node.textContent ?? '');
    }
    if (node.nodeType !== Node.ELEMENT_NODE) return '';

    const el = node as HTMLElement;
    const tag = el.tagName.toLowerCase();
    if (!ALLOWED_HTML_TAGS.has(tag)) {
      return Array.from(el.childNodes).map(walk).join('');
    }

    const inner = Array.from(el.childNodes).map(walk).join('');
    if (tag === 'a') {
      const href = el.getAttribute('href') ?? '';
      if (!/^https?:\/\//i.test(href) && !/^mailto:/i.test(href) && !/^\//.test(href)) {
        return inner;
      }
      const safeHref = href.replace(/"/g, '&quot;');
      return `<a href="${safeHref}" rel="noopener noreferrer">${inner}</a>`;
    }
    if (tag === 'br') return '<br />';
    return `<${tag}>${inner}</${tag}>`;
  };

  return Array.from(doc.body.childNodes).map(walk).join('');
}

function inlineMarkdown(text: string): string {
  let out = escapeHtml(text);
  out = out.replace(/`([^`]+)`/g, '<code>$1</code>');
  out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  out = out.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  out = out.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_m, label: string, url: string) => {
    if (!/^https?:\/\//i.test(url) && !/^mailto:/i.test(url) && !/^\//.test(url)) {
      return escapeHtml(label);
    }
    const safeUrl = url.replace(/"/g, '&quot;');
    return `<a href="${safeUrl}" rel="noopener noreferrer">${escapeHtml(label)}</a>`;
  });
  return out;
}

function markdownToHtml(markdown: string): string {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const html: string[] = [];
  let inUl = false;
  let inOl = false;

  const closeLists = () => {
    if (inUl) {
      html.push('</ul>');
      inUl = false;
    }
    if (inOl) {
      html.push('</ol>');
      inOl = false;
    }
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    const trimmed = line.trim();

    if (!trimmed) {
      closeLists();
      continue;
    }

    const ul = /^[-*]\s+(.+)$/.exec(trimmed);
    if (ul) {
      if (inOl) {
        html.push('</ol>');
        inOl = false;
      }
      if (!inUl) {
        html.push('<ul>');
        inUl = true;
      }
      html.push(`<li>${inlineMarkdown(ul[1])}</li>`);
      continue;
    }

    const ol = /^\d+\.\s+(.+)$/.exec(trimmed);
    if (ol) {
      if (inUl) {
        html.push('</ul>');
        inUl = false;
      }
      if (!inOl) {
        html.push('<ol>');
        inOl = true;
      }
      html.push(`<li>${inlineMarkdown(ol[1])}</li>`);
      continue;
    }

    closeLists();

    if (trimmed.startsWith('### ')) {
      html.push(`<h4>${inlineMarkdown(trimmed.slice(4))}</h4>`);
    } else if (trimmed.startsWith('## ')) {
      html.push(`<h3>${inlineMarkdown(trimmed.slice(3))}</h3>`);
    } else if (trimmed.startsWith('# ')) {
      html.push(`<h2>${inlineMarkdown(trimmed.slice(2))}</h2>`);
    } else {
      html.push(`<p>${inlineMarkdown(trimmed)}</p>`);
    }
  }

  closeLists();
  return html.join('');
}

type Props = {
  body: string;
  format?: DocRichTextFormat;
  className?: string;
};

export function SafeRichText({ body, format, className }: Props) {
  const resolved = inferRichTextFormat(body, format);
  const html =
    resolved === 'html' ? sanitizeHtml(body) : sanitizeHtml(markdownToHtml(body));

  return (
    <div
      className={['doc-block-rich-text', 'writing-guidelines__paragraph', className]
        .filter(Boolean)
        .join(' ')}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
