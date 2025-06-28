"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { connectToDatabase } from "@/lib/mongodb"
import { Post } from "@/models/Post"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"

interface Post {
  _id: string;
  title: string;
  slug: string;
  createdAt: string;
}

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/admin/login')
  }

  await connectToDatabase()
  const posts = await Post.find().sort({ createdAt: -1 })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <Link
          href="/admin/create"
          className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90 transition-opacity"
        >
          Create New Post
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-medium text-gray-600 mb-4">Total Posts</h3>
          <p className="text-4xl font-bold text-gray-900">{posts.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-medium text-gray-600 mb-4">Published This Month</h3>
          <p className="text-4xl font-bold text-gray-900">
            {posts.filter(post => {
              const postDate = new Date(post.createdAt!)
              const now = new Date()
              return postDate.getMonth() === now.getMonth() && 
                     postDate.getFullYear() === now.getFullYear()
            }).length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-medium text-gray-600 mb-4">Last Published</h3>
          <p className="text-lg font-medium text-gray-900">
            {posts[0]?.createdAt ? new Date(posts[0].createdAt).toLocaleDateString() : 'No posts yet'}
          </p>
        </div>
      </div>

      {/* Posts Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">Recent Posts</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Updated</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {posts.map((post) => (
                <tr key={post._id.toString()} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link 
                      href={`/admin/${post.slug}`}
                      className="text-gray-900 hover:text-blue-600 font-medium transition-colors"
                    >
                      {post.title}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(post.createdAt!).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(post.updatedAt!).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <Link
                      href={`/admin/${post.slug}`}
                      className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
              {posts.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                    No posts yet. Create your first post!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
} 