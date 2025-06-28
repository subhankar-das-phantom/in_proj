"use client";
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import slugify from 'slugify';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
});
import 'react-quill/dist/quill.snow.css';

export default function CreatePostPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');

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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });
    if (res.ok) {
      router.push('/admin');
    } else {
      alert('Error creating post');
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Post</h1>
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
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Create Post
        </button>
      </form>
    </div>
  );
} 