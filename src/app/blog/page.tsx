import { connectToDatabase } from "@/lib/mongodb"
import { Post } from "@/models/Post"
import Link from "next/link"

export const dynamic = 'force-dynamic'

export default async function BlogPage() {
  await connectToDatabase()
  const posts = await Post.find().sort({ createdAt: -1 })

  return (
    <div className="space-y-12">
      {/* Header */}
      <section className="text-center space-y-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900">Our Blog</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Explore our latest articles and insights
        </p>
      </section>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <article key={post._id.toString()} 
            className="group bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border border-gray-100">
            <Link href={`/${post.slug}`}>
              <div className="relative aspect-[16/9] bg-gradient-to-br from-purple-100 to-blue-50">
                <div className="absolute inset-0 flex items-center justify-center text-4xl text-gray-300">
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

                <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                  {post.title}
                </h2>

                <p className="text-gray-600 line-clamp-2">
                  {post.content?.replace(/<[^>]*>/g, '').substring(0, 160)}...
                </p>
              </div>
            </Link>
          </article>
        ))}

        {posts.length === 0 && (
          <div className="col-span-full text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-900">No posts yet</h2>
            <p className="text-gray-600 mt-2">Check back soon for new content!</p>
          </div>
        )}
      </div>
    </div>
  )
} 