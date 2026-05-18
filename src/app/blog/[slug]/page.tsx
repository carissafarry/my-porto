import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container, Box } from '@chakra-ui/react';
import {
  getPostBySlug,
  getAllPosts,
  getRelatedPosts,
} from '~/lib/sanity/queries';
import type { Post } from '~/lib/sanity/types';
import BlogPost from '~/lib/components/blog/BlogPost';
import AuthorBio from '~/lib/components/blog/AuthorBio';
import RelatedPosts from '~/lib/components/blog/RelatedPosts';
import NewsletterForm from '~/lib/components/blog/NewsletterForm';

export const revalidate = 60;

interface BlogPostPageProps {
  params: { slug: string };
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.seo?.title || post.title,
    description: post.seo?.description || post.excerpt,
    keywords: post.seo?.keywords,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.featuredImage?.asset?.url
        ? [{ url: post.featuredImage.asset.url }]
        : [],
      type: 'article',
      publishedTime: post.publishedAt,
      authors: post.author?.name ? [post.author.name] : [],
    },
  };
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post: Post) => ({
    slug: post.slug.current,
  }));
}

export default async function Page({ params }: BlogPostPageProps) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(params.slug);

  return (
    <Container maxW="3xl" py={12}>
      <Box mb={10}>
        <BlogPost post={post} />
      </Box>

      {post.author && (
        <Box mb={10}>
          <AuthorBio author={post.author} />
        </Box>
      )}

      {relatedPosts.length > 0 && (
        <Box mb={10}>
          <RelatedPosts posts={relatedPosts} />
        </Box>
      )}

      <Box>
        <NewsletterForm />
      </Box>
    </Container>
  );
}
