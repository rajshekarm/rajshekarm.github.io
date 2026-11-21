
import { useEffect, useState } from 'react';
import { codeToHtml } from 'shiki';

type CodeBlockProps = {
  code: string;
  language?: string;
};

export default function CodeBlock({
  code,
  language = 'text',
}: CodeBlockProps) {
  const [html, setHtml] = useState('');

  useEffect(() => {
    let active = true;

    codeToHtml(code, {
      lang: language === 'cuda' ? 'cpp' : language,
      theme: 'github-dark',
    })
      .then((result) => {
        if (active) setHtml(result);
      })
      .catch(() => {
        if (active) setHtml('');
      });

    return () => {
      active = false;
    };
  }, [code, language]);

  if (!html) {
    return <pre><code>{code}</code></pre>;
  }

  return (
    <div
      className="highlighted-code"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
