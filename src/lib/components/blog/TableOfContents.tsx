'use client';

import { Card, CardBody, Link } from '@chakra-ui/react';

import { blogContents } from '~/lib/database/blogContents';
import type { TTableOfContentsItem } from '~/lib/types';

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
  items: Array<TTableOfContentsItem>;
}

function TableOfContents({ items = blogContents }: TableOfContensProps) {
  return (
    <nav>
      <Card>
        <CardBody>
          {items.map(({ title, depth, slug }) => {
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
