import BlogPageContents from '~/lib/components/blog/BlogPageContents';
// import TableOfContents from '~/lib/components/blog/TableOfContents';
// import type { BlogContentsProps } from '~/lib/components/blog/BlogPageContents';
import { getSortedPosts } from '~/lib/queries/posts';

// type BlogProps = {
//   posts: BlogContentsProps['posts'];
// };

function Blog() {
  const posts = getSortedPosts();
  return <BlogPageContents posts={posts} />;
}

export default Blog;

// export default TableOfContents;
