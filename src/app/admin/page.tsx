"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

interface Post {
  _id: string;
  title: string;
  slug: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status !== 'authenticated') return;
    setLoading(true);
    fetch('/api/posts')
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.data || []);
      })
      .finally(() => setLoading(false));
  }, [status]);

  async function handleDelete(slug: string) {
    if (!confirm('Delete this post?')) return;
    await fetch(`/api/posts/${slug}`, { method: 'DELETE' });
    setPosts((prev) => prev.filter((p) => p.slug !== slug));
  }

  if (status === 'loading') return <p className="p-4">Checking auth...</p>;
  if (!session) {
    if (typeof window !== 'undefined') {
      window.location.href = '/admin/login';
    }
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <Link
        href="/admin/create"
        className="px-4 py-2 bg-blue-600 text-white rounded mb-4 inline-block"
      >
        + New Post
      </Link>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border mt-4 text-left">
          <thead>
            <tr>
              <th className="border p-2">Title</th>
              <th className="border p-2">Slug</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post._id}>
                <td className="border p-2">{post.title}</td>
                <td className="border p-2">{post.slug}</td>
                <td className="border p-2 space-x-2">
                  <Link
                    className="text-blue-600 underline"
                    href={`/admin/${post.slug}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="text-red-600"
                    onClick={() => handleDelete(post.slug)}
                  >
                    Delete
                  </button>
                  <Link
                    className="text-green-600 underline"
                    href={`/${post.slug}`}
                    target="_blank"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
} 