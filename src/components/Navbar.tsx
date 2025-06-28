import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'

export default function Navbar() {
  const { data: session } = useSession()
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                BlogCMS
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/blog" 
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Blog
            </Link>
            {session ? (
              <>
                <Link 
                  href="/admin" 
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => signOut()}
                  className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link 
                href="/admin/login"
                className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90 transition-opacity"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
} 