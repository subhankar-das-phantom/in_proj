import { connectToDatabase } from "@/lib/mongodb"
import { Post } from "@/models/Post"
import { notFound } from "next/navigation"
import { sanitize } from "@/lib/sanitize"

export const dynamic = 'force-dynamic'

export default async function PostPage({
  params: { slug },
}: {
  params: { slug: string }
}) {
  await connectToDatabase()
  const post = await Post.findOne({ slug })

  if (!post) {
    notFound()
  }

  return (
    <article className="max-w-3xl mx-auto">
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          {post.title}
        </h1>
        <div className="flex items-center justify-center gap-2 text-gray-600">
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
      </header>

      {/* Content */}
      <div 
        className="prose prose-lg prose-blue mx-auto"
        dangerouslySetInnerHTML={{ __html: sanitize(post.content) }} 
      />

      {/* Footer */}
      <footer className="mt-12 pt-8 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Last updated: {new Date(post.updatedAt!).toLocaleDateString()}
          </div>
          <div className="flex items-center gap-4">
            <button className="text-gray-600 hover:text-blue-600 transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
            <button className="text-gray-600 hover:text-blue-600 transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </button>
          </div>
        </div>
      </footer>
    </article>
  )
} 