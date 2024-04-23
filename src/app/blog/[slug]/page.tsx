import langJavaScript from 'highlight.js/lib/languages/javascript';
// eslint-disable-next-line import/order
import type { SerializeOptions } from 'next-mdx-remote/dist/types';
import { MDXRemote } from 'next-mdx-remote/rsc';
// eslint-disable-next-line import/no-extraneous-dependencies
import rehypeHighlight from 'rehype-highlight';

import DetailBlogPage from '~/lib/components/blog/DetailBlogPage';
import MDXButton from '~/lib/components/mdx/MDXButton';
import MDXComponents from '~/lib/components/mdx/MDXComponents';
import logToFile from '~/lib/helpers/log';
import { getPostData, getPostSlugs } from '~/lib/queries/blogs';
import type { TBlogContentsItem, TPostFrontMatter } from '~/lib/types';
import '~/lib/styles/highlight-js/dracula.css';

// import TableOfContents from '~/lib/components/blog/TableOfContents';

export interface BlogProps extends TBlogContentsItem {
  content: string;
}

const options: SerializeOptions = {
  mdxOptions: {
    remarkPlugins: [],
    rehypePlugins: [
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      [rehypeHighlight, { languages: { javascript: langJavaScript } }],
    ],
  },
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const blog: BlogProps = await getPostData(params.slug);

  return {
    title: (blog.frontMatter as TPostFrontMatter).title,
    description: (blog.frontMatter as TPostFrontMatter).description,
  };
}

export async function generateStaticParams() {
  const slugs = getPostSlugs();

  return slugs.map((slug) => ({
    slug,
  }));
}

export const dynamic = 'force-dynamic';

async function DetailBlog({ params }: { params: { slug: string } }) {
  const blog: BlogProps = await getPostData(params.slug);

  logToFile(`Paths: ${JSON.stringify(params.slug)}`);

  return (
    <DetailBlogPage>
      <MDXRemote
        source={blog.content}
        components={{ MDXComponents, MDXButton }}
        options={options}
      />
      {/* <TableOfContents /> */}
    </DetailBlogPage>
  );
}

export default DetailBlog;
