import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Simple middleware that doesn't use authentication
export function middleware(request: NextRequest) {
    return NextResponse.next()
}

// Only match app routes, not auth routes
export const config = {
    matcher: [
        '/news/:path*',
        '/contacts/:path*',
        '/crm/:path*',
    ],
} 