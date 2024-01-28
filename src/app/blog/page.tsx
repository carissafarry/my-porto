import type { Metadata } from 'next';

import BlogPage from '~/lib/components/blog/BlogPage';
// import type { BlogContentsProps } from '~/lib/components/blog/BlogPage';
import { getSortedPosts } from '~/lib/queries/blogs';

// type BlogProps = {
//   posts: BlogContentsProps['posts'];
// };

export const metadata: Metadata = {
  title: 'Blog',
};

function Blog() {
  const posts = getSortedPosts();
  return <BlogPage posts={posts} />;
}

export default Blog;
