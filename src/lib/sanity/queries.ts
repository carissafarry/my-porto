import { sanityClient } from './client';
import type { Post } from './types';

// Get all published posts, sorted by date DESC
export async function getAllPosts(): Promise<Post[]> {
  const query = `
    *[_type == "post" && publishedAt <= now()] | order(publishedAt desc) {
      _id,
      _type,
      title,
      slug,
      excerpt,
      publishedAt,
      featuredImage {
        asset->{ url },
        alt
      },
      author-> {
        _id,
        _type,
        name,
        bio,
        image { asset->{ url }, alt },
        email,
        social
      },
      content,
      tags[]-> { _id, _type, name, slug },
      categories[]-> { _id, _type, name, slug },
      seo
    }
  `;
  return sanityClient.fetch(query);
}

// Get single post by slug
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const query = `
    *[_type == "post" && slug.current == $slug && publishedAt <= now()][0] {
      _id,
      _type,
      title,
      slug,
      excerpt,
      publishedAt,
      featuredImage {
        asset->{ url },
        alt
      },
      author-> {
        _id,
        _type,
        name,
        bio,
        image { asset->{ url }, alt },
        email,
        social
      },
      content,
      tags[]-> { _id, _type, name, slug },
      categories[]-> { _id, _type, name, slug },
      seo
    }
  `;
  return sanityClient.fetch(query, { slug });
}

// Get posts filtered by category slug
export async function getPostsByCategory(
  categorySlug: string
): Promise<Post[]> {
  const query = `
    *[_type == "post" && $categorySlug in categories[]->.slug.current && publishedAt <= now()] | order(publishedAt desc) {
      _id,
      _type,
      title,
      slug,
      excerpt,
      publishedAt,
      featuredImage {
        asset->{ url },
        alt
      },
      author-> {
        _id,
        _type,
        name,
        bio,
        image { asset->{ url }, alt },
        email,
        social
      },
      content,
      tags[]-> { _id, _type, name, slug },
      categories[]-> { _id, _type, name, slug },
      seo
    }
  `;
  return sanityClient.fetch(query, { categorySlug });
}

// Get posts filtered by tag slug
export async function getPostsByTag(tagSlug: string): Promise<Post[]> {
  const query = `
    *[_type == "post" && $tagSlug in tags[]->.slug.current && publishedAt <= now()] | order(publishedAt desc) {
      _id,
      _type,
      title,
      slug,
      excerpt,
      publishedAt,
      featuredImage {
        asset->{ url },
        alt
      },
      author-> {
        _id,
        _type,
        name,
        bio,
        image { asset->{ url }, alt },
        email,
        social
      },
      content,
      tags[]-> { _id, _type, name, slug },
      categories[]-> { _id, _type, name, slug },
      seo
    }
  `;
  return sanityClient.fetch(query, { tagSlug });
}

// Get all tags for filtering
export async function getAllTags() {
  const query = `*[_type == "tag"] | order(name asc) { _id, name, slug }`;
  return sanityClient.fetch(query);
}

// Get all categories for filtering
export async function getAllCategories() {
  const query = `*[_type == "category"] | order(name asc) { _id, name, slug }`;
  return sanityClient.fetch(query);
}

// Get related posts (same tags, similar reading time)
export async function getRelatedPosts(
  slug: string,
  limit = 3
): Promise<Post[]> {
  const query = `
    *[_type == "post" && slug.current != $slug && publishedAt <= now()] {
      ...,
      author->,
      tags[]->,
      categories[]->
    } | order(publishedAt desc) [0..20] {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      featuredImage {
        asset->{ url },
        alt
      },
      author-> {
        _id,
        name,
        image { asset->{ url }, alt }
      },
      tags[]-> { _id, name, slug },
      categories[]-> { _id, name, slug }
    }
  `;
  const allPosts = await sanityClient.fetch(query, { slug });

  // Get current post to match tags
  const currentPost = await getPostBySlug(slug);
  if (!currentPost) return [];

  const currentTags = currentPost.tags?.map((t) => t._id) || [];

  // Filter: must have at least 1 matching tag
  const filtered = allPosts.filter((post: Post) => {
    const postTags = post.tags?.map((t) => t._id) || [];
    return postTags.some((t) => currentTags.includes(t));
  });

  return filtered.slice(0, limit);
}
