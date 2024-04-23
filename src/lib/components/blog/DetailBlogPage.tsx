'use client';

import type { ReactNode } from 'react';
import { renderToString } from 'react-dom/server';

export default function DetailBlogPage({
  children,
}: {
  children: React.ReactNode;
}) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const contentString = renderToString(children);

  const getHeadings = (source: string) => {
    const regex = /<h2>(.*?)<\/h2>/g;

    if (source.match(regex)) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return source.match(regex).map((heading: string) => {
        const headingText = heading.replace('<h2>', '').replace('</h2>', '');

        const link = `#${headingText.replace(/ /g, '_').toLowerCase()}`;

        return {
          text: headingText,
          link,
        };
      });
    }

    return [];
  };

  const headings = getHeadings(contentString);

  return (
    <div className="mdx-prose" style={{ marginBottom: '5px' }}>
      <div className="flex">
        {headings.length > 0 ? (
          <ol>
            {headings.map((heading) => (
              <li key={heading.text}>
                <a href={heading.link}>{heading.text}</a>
              </li>
            ))}
          </ol>
        ) : null}

        <div className="pb-5">{children}</div>
      </div>
    </div>
  );
}
