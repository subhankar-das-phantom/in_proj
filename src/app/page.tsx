import Link from 'next/link';
import { connectToDatabase } from '@/lib/mongodb';
import { Post, IPost } from '@/models/Post';

async function getPosts() {
  await connectToDatabase();
  const posts = (await Post.find()
    .sort({ createdAt: -1 })
    .lean()) as unknown as IPost[];
  return posts;
}

export default async function HomePage() {
  const posts = await getPosts();

  return (
    <main className="max-w-4xl mx-auto p-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          The Blog
        </h1>
        <p className="mt-4 text-lg text-gray-500">
          Welcome to our collection of thoughts and stories.
        </p>
      </div>

      <div className="space-y-8">
        {posts.map((post) => (
          <article key={post.slug} className="border-b pb-8">
            <h2 className="text-3xl font-bold mb-2">
              <Link
                href={`/${post.slug}`}
                className="text-gray-900 hover:text-blue-600 transition-colors"
              >
                {post.title}
              </Link>
            </h2>
            <p className="text-gray-600 mb-4">
              Published on {new Date(post.createdAt).toLocaleDateString()}
            </p>
            <div
              className="prose max-w-none text-gray-500 line-clamp-3"
              dangerouslySetInnerHTML={{
                __html: post.content.replace(/<[^>]+>/g, ''),
              }}
            />
            <Link
              href={`/${post.slug}`}
              className="text-blue-600 hover:underline mt-4 inline-block"
            >
              Read more →
            </Link>
          </article>
        ))}
        {posts.length === 0 && (
          <p className="text-center text-gray-500">
            No posts yet. Check back soon!
          </p>
        )}
      </div>
    </main>
  );
}
