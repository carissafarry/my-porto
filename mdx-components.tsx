import type { MDXComponents } from 'mdx/types';

// eslint-disable-next-line import/prefer-default-export
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
  };
}
