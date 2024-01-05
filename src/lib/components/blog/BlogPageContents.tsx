'use client';

import { Link } from '@chakra-ui/react';

import type { TBlogContentsItem } from '~/lib/types';

export type BlogContentsProps = {
  posts: Array<TBlogContentsItem>;
};

function BlogPageContents({ posts }: BlogContentsProps) {
  return (
    <nav>
      <h1>Daftar Artikel</h1>

      {posts.map(({ slug, frontMatter }) => {
        return (
          <li key={slug}>
            <Link
              href={`/blog-test/${slug}`}
              color="blackAlpha.600"
              _hover={{ color: 'black' }}
            >
              {frontMatter.title}
            </Link>
          </li>
        );
      })}
    </nav>
  );
}

export default BlogPageContents;
