'use client';

import { Flex, Button } from '@chakra-ui/react';
import Link from 'next/link';

interface Category {
  _id: string;
  name: string;
  slug: { current: string };
}

interface CategoryFilterProps {
  categories: Category[];
  activeCategory?: string;
}

export default function CategoryFilter({
  categories,
  activeCategory,
}: CategoryFilterProps) {
  return (
    <Flex gap={2} wrap="wrap" mb={6}>
      <Link href="/blog">
        <Button
          size="sm"
          variant={!activeCategory ? 'solid' : 'outline'}
          colorScheme="blue"
        >
          All
        </Button>
      </Link>
      {categories.map((category) => (
        <Link
          key={category._id}
          href={`/blog?category=${category.slug.current}`}
        >
          <Button
            size="sm"
            variant={
              activeCategory === category.slug.current ? 'solid' : 'outline'
            }
            colorScheme="blue"
          >
            {category.name}
          </Button>
        </Link>
      ))}
    </Flex>
  );
}
