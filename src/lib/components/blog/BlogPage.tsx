'use client';

import { Link } from '@chakra-ui/react';

import type { TBlogContentsItem, TPostFrontMatter } from '~/lib/types';

export type BlogContentsProps = {
  posts: Array<TBlogContentsItem>;
};

function BlogPage({ posts }: BlogContentsProps) {
  return (
    <nav>
      <h1>Daftar Artikel</h1>

      {posts.map(({ slug, frontMatter }) => {
        return (
          <li key={slug}>
            <Link
              href={`/blog/${slug}`}
              color="blackAlpha.600"
              _hover={{ color: 'black' }}
            >
              {(frontMatter as TPostFrontMatter).title}
            </Link>
          </li>
        );
      })}
    </nav>
  );
}

export default BlogPage;
