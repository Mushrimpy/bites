import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Simple redirect handler that doesn't use Supabase
export async function GET(request: NextRequest) {
    // Redirect to home page
    return NextResponse.redirect(new URL('/', request.url))
} 