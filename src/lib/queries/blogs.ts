// src/lib/queries/blogs.ts
// DISABLED: Using Sanity blog instead
// Keep file for reference only - do not use

import type { TPostFrontMatter } from '~/lib/types';
import type { Post } from '~/lib/sanity/types';

// DEPRECATED: Use Sanity queries instead
export const getPostSlugs = () => {
  // MDX disabled - return empty
  return [];
};

export const getPostFrontMatter = (slug: string): TPostFrontMatter => {
  throw new Error('MDX blog disabled. Use Sanity instead.');
};

export const getSortedPosts = () => {
  // MDX disabled - return empty
  return [];
};

export async function getPostData(slug: string): Promise<Post> {
  throw new Error('MDX blog disabled. Use Sanity instead.');
}
