import Link from 'next/link'
import { Post } from '@/models/Post'

export default function PostCard({ post }: { post: Post }) {
  return (
    <article className="group relative bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100">
      <Link href={`/${post.slug}`} className="block">
        <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-purple-100 to-blue-50">
          {/* Placeholder for future featured image */}
          <div className="flex items-center justify-center text-4xl text-gray-300">
            📝
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
            <time dateTime={post.createdAt?.toString()}>
              {new Date(post.createdAt!).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </time>
            <span>•</span>
            <span>5 min read</span>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
            {post.title}
          </h3>

          <p className="text-gray-600 line-clamp-2">
            {post.content?.replace(/<[^>]*>/g, '').substring(0, 160)}...
          </p>
        </div>

        <div className="absolute bottom-6 right-6">
          <span className="inline-flex items-center text-sm font-medium text-blue-600 group-hover:text-blue-800 transition-colors">
            Read more
            <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </Link>
    </article>
  )
} 