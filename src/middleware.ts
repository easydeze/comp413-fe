import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {

    if (request.nextUrl.pathname.startsWith('/about')) {
        return NextResponse.rewrite(new URL('/about-2', request.url))
    }
    return NextResponse.redirect(new URL('/home', request.url))
}

/*
Middleware will be invoked for every route in your project.
Given this, it's crucial to use matchers to precisely target or exclude specific routes. The following is the execution order:
1. headers from next.config.js
2. redirects from next.config.js
3. Middleware (rewrites, redirects, etc.)
4. beforeFiles (rewrites) from next.config.js
5. Filesystem routes (public/, _next/static/, pages/, app/, etc.)
6. afterFiles (rewrites) from next.config.js
7. Dynamic Routes (/blog/[slug])
8. fallback (rewrites) from next.config.js
 */
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         */

        /*
        Configured matchers:
        - MUST start with /
        - Can include named parameters: /about/:path matches /about/a and /about/b but not /about/a/c
        - Can have modifiers on named parameters (starting with :): /about/:path* matches /about/a/b/c because * is zero or more. ? is zero or one and + one or more
        - Can use regular expression enclosed in parenthesis: /about/(.*) is the same as /about/:path*
         */
        ['/about/:path*',
            '/dashboard/:path*'
        ],
    ],
}