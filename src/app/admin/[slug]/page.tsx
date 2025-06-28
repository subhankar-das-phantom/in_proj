"use client";
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import slugify from 'slugify';
import { useSession } from 'next-auth/react';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams();
  const slugParam = params?.slug as string;
  const { data: session, status } = useSession();

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState(slugParam);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      const res = await fetch(`/api/posts/${slugParam}`);
      const data = await res.json();
      if (data.success) {
        setTitle(data.data.title);
        setContent(data.data.content);
        setSlug(data.data.slug);
      }
      setLoading(false);
    }
    fetchPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slugParam]);

  useEffect(() => {
    setSlug(slugify(title, { lower: true, strict: true }));
  }, [title]);

  if (status === 'loading') return <p className="p-4">Checking auth...</p>;
  if (!session) {
    if (typeof window !== 'undefined') {
      router.replace('/admin/login');
    }
    return null;
  }

  if (loading) return <div className="p-4">Loading...</div>;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch(`/api/posts/${slugParam}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });
    if (res.ok) {
      router.push('/admin');
    } else {
      alert('Error updating post');
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Slug</label>
          <input
            type="text"
            value={slug}
            readOnly
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Content</label>
          <ReactQuill value={content} onChange={setContent} theme="snow" />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
          Update Post
        </button>
      </form>
    </div>
  );
} 