import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    // Match all routes except for static files and Next.js internals
    '/((?!_next/static|_next/image|favicon.ico).*)',
    // Include API routes
    '/api/(.*)',
  ],
};