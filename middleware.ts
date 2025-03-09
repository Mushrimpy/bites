import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This middleware replaces any previous auth middleware
// It simply allows all requests to proceed without authentication
export function middleware(request: NextRequest) {
    return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        // Add paths that would have required authentication
        '/news/:path*',
        '/contacts/:path*',
        '/crm/:path*',
    ],
} 