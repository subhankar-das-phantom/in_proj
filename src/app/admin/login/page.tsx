import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"

export default async function LoginPage() {
  const session = await getServerSession(authOptions)
  if (session) {
    redirect('/admin')
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-gray-600 mt-2">
            Sign in to access your dashboard
          </p>
        </div>

        <form action="/api/auth/signin/credentials" method="POST" className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                required
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                placeholder="Enter your username"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                required
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90 transition-opacity"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 