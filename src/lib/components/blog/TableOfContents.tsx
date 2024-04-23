'use client';

import { Card, CardBody, Link } from '@chakra-ui/react';

import type { TTableOfContents, TTableOfContentsItem } from '~/lib/types';

// TableOfContentsLink
interface TableOfContentsLinkProps extends TTableOfContentsItem {
  // active?: boolean;
}

export function TableOfContentsLink({
  title,
  // depth,
  slug, // active = false,
}: TableOfContentsLinkProps) {
  return (
    <Link href={`#${slug}`} color="blackAlpha.600" _hover={{ color: 'black' }}>
      {title}
    </Link>
  );
}

// TableOfContensProps
interface TableOfContensProps {
  contents: TTableOfContents;
}

function TableOfContents({ contents }: TableOfContensProps) {
  return (
    <nav>
      <Card>
        <CardBody>
          {contents.map(({ title, depth, slug }) => {
            return (
              <li key={slug}>
                <TableOfContentsLink title={title} depth={depth} slug={slug} />
              </li>
            );
          })}
        </CardBody>
      </Card>
    </nav>
  );
}

export default TableOfContents;
