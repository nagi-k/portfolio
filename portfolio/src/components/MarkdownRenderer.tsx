interface MarkdownRendererProps {
  html: string;
}

export function MarkdownRenderer({ html }: MarkdownRendererProps) {
  return (
    <div
      className="prose-custom max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
