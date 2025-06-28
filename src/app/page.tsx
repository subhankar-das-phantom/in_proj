import { connectToDatabase } from "@/lib/mongodb"
import { Post } from "@/models/Post"
import PostCard from "@/components/PostCard"

export const dynamic = 'force-dynamic'

export default async function Home() {
  await connectToDatabase()
  const posts = await Post.find().sort({ createdAt: -1 })

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-4">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
          Welcome to Modern Blog
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover insightful articles about technology, development, and innovation. 
          Join us on a journey of continuous learning and exploration.
        </p>
      </section>

      {/* Posts Grid */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <PostCard key={post._id.toString()} post={post} />
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-900">No posts yet</h2>
            <p className="text-gray-600 mt-2">Check back soon for new content!</p>
          </div>
        )}
      </section>
    </div>
  )
}
