export const dynamic = 'force-dynamic';

import { Metadata, ResolvingMetadata } from 'next';
import { connectToDatabase } from '@/lib/mongodb';
import { Post, IPost } from '@/models/Post';
import { notFound } from 'next/navigation';
import DOMPurify from 'isomorphic-dompurify';

interface Props {
  params: { slug: string };
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  if (!process.env.MONGODB_URI) {
    return { title: params.slug };
  }

  await connectToDatabase();
  const post = (await Post.findOne({ slug: params.slug }).lean()) as IPost | null;
  if (!post) return {};
  return {
    title: post.title,
    description: post.content.replace(/<[^>]+>/g, '').slice(0, 150),
    openGraph: {
      title: post.title,
      description: post.content.replace(/<[^>]+>/g, '').slice(0, 150),
    },
  };
}

export default async function BlogPost({ params }: Props) {
  await connectToDatabase();
  const post = (await Post.findOne({ slug: params.slug }).lean()) as IPost | null;
  if (!post) {
    notFound();
  }

  const safeHtml = DOMPurify.sanitize(post.content);

  return (
    <main className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <article
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: safeHtml }}
      />
    </main>
  );
} 