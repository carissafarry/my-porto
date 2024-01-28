import frontMatter from 'front-matter';
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

import type { BlogProps } from '~/app/blog/[slug]/page';
import type { TPostFrontMatter } from '~/lib/types';

const postsDirectory = path.join(process.cwd(), 'src/lib/pages/blog');

export const getPostSlugs = () => {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => fileName.replace(/\.mdx$/, ''));
};

export const getPostFrontMatter = (slug: string): TPostFrontMatter => {
  // read markdown file as string
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // use front-matter to parse the post metadata section
  const { attributes } = frontMatter<TPostFrontMatter>(fileContents);

  return attributes;
};

export const getSortedPosts = () => {
  const slugs = getPostSlugs();

  const allPostsData = slugs.map((slug) => {
    const data = getPostFrontMatter(slug);

    return {
      slug,
      frontMatter: data,
    };
  });

  // sort posts by date
  return allPostsData.sort(
    ({ frontMatter: { date: a } }, { frontMatter: { date: b } }) => {
      if (a < b) {
        return 1;
      }
      if (a > b) {
        return -1;
      }
      return 0;
    }
  );
};

export async function getPostData(slug: string): Promise<BlogProps> {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  const fileContent = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const { data: frontMatterData, content } = matter(fileContent);

  return {
    slug,
    frontMatter: frontMatterData,
    content,
  };
}
