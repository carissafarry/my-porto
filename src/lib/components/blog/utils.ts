// src/lib/components/blog/utils.ts

// Calculate reading time in minutes from word count
export function calculateReadingTime(content: any): number {
  if (!content) return 0;

  // Convert portable text blocks to plain text
  const plainText = contentToPlainText(content);
  const wordCount = plainText.split(/\s+/).length;
  const wordsPerMinute = 200;

  return Math.ceil(wordCount / wordsPerMinute);
}

// Convert Sanity portable text to plain text
function contentToPlainText(blocks: any[]): string {
  if (!Array.isArray(blocks)) return '';

  return blocks
    .map((block) => {
      if (block._type === 'block') {
        return block.children?.map((c: any) => c.text).join('') || '';
      }
      return '';
    })
    .join('\n');
}

// Format date for display
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Get Sanity image URL with builder
export function getSanityImageUrl(image: any): string {
  if (!image?.asset?.url) return '';
  return image.asset.url;
}

// Truncate text for excerpt preview
export function truncateText(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
}
