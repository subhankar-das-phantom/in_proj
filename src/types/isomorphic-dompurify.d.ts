declare module 'isomorphic-dompurify' {
  const DOMPurify: {
    sanitize: (html: string) => string;
  };
  export default DOMPurify;
} 