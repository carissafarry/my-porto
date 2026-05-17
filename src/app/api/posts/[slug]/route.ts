import { NextRequest, NextResponse } from 'next/server';
import { getPostBySlug, getRelatedPosts } from '~/lib/sanity/queries';

export const revalidate = 60;

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const post = await getPostBySlug(slug);

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const relatedPosts = await getRelatedPosts(slug);

    return NextResponse.json({
      post,
      relatedPosts,
    });
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      { status: 500 }
    );
  }
}
