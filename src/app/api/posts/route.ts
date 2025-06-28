import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Post } from '@/models/Post';
import slugify from 'slugify';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { sanitize } from '@/lib/sanitize';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectToDatabase();
    const posts = await Post.find().sort({ createdAt: -1 });
    
    return NextResponse.json({ 
      success: true, 
      data: posts 
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions as any);
    if (!session) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { title, content } = await req.json();
    if (!title || !content) {
      return NextResponse.json(
        { success: false, message: 'Title and content are required' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    let slug = slugify(title, { lower: true, strict: true });

    // ensure uniqueness
    let existing = await Post.findOne({ slug });
    let suffix = 1;
    while (existing) {
      slug = `${slug}-${suffix}`;
      suffix += 1;
      existing = await Post.findOne({ slug });
    }

    const post = await Post.create({ title, content: sanitize(content), slug });
    return NextResponse.json({ success: true, data: post }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Something went wrong' },
      { status: 500 }
    );
  }
} 