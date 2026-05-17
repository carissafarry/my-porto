export interface SanityImage {
  _type: 'image';
  asset: {
    _id: string;
    url: string;
  };
  alt: string;
}

export interface Author {
  _id: string;
  _type: 'author';
  name: string;
  bio: string;
  image: SanityImage;
  email: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

export interface Tag {
  _id: string;
  _type: 'tag';
  name: string;
  slug: {
    current: string;
  };
}

export interface Category {
  _id: string;
  _type: 'category';
  name: string;
  slug: {
    current: string;
  };
}

export interface Post {
  _id: string;
  _type: 'post';
  title: string;
  slug: {
    current: string;
  };
  excerpt: string;
  publishedAt: string;
  featuredImage: SanityImage;
  author: Author;
  content: any; // PortableText - handled by renderer
  tags: Tag[];
  categories: Category[];
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
}
