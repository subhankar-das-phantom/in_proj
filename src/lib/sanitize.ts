import sanitizeHtml from 'sanitize-html';

export function sanitize(content: string) {
  const cleaned = sanitizeHtml(content, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'h1', 'h2']),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ['src', 'alt', 'width', 'height'],
    },
    allowedSchemes: ['http', 'https', 'data'],
  });

  // Trim leading/trailing <br> tags that Quill sometimes inserts
  return cleaned
    .replace(/^(<br\s*\/?>\s*)+/i, '') // leading
    .replace(/(\s*<br\s*\/?>)+$/i, ''); // trailing
} 