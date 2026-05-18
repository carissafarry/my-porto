import { NextRequest, NextResponse } from 'next/server';
import {
  getAllPosts,
  getPostsByCategory,
  getPostsByTag,
} from '~/lib/sanity/queries';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const tag = searchParams.get('tag');

    let posts;
    if (category) {
      posts = await getPostsByCategory(category);
    } else if (tag) {
      posts = await getPostsByTag(tag);
    } else {
      posts = await getAllPosts();
    }

    return NextResponse.json({
      posts,
      total: posts.length,
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}
