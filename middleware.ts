import {ADMIN_ROLE} from "@/util/types";
import {NextFetchEvent, NextRequest, NextResponse} from "next/server";
import {NextRequestWithAuth, withAuth} from "next-auth/middleware";
import authMiddleware from "@/middlewares/authMiddleware";
import createMiddleware from 'next-intl/middleware';
import {locales, pathnames} from './i18n/navigation';


export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!_next/static|_next/image|favicon.ico).*)',
        '/(es|en)/:path*'
    ],
}

export default async function middleware(req: any, res: any) {
    const handleI18nRouting = createMiddleware({
        defaultLocale: 'en',
        locales,
        pathnames
    })


    if (req.nextUrl.pathname.startsWith('/api/beer') || req.nextUrl.pathname.startsWith('/api/cloudinary')) {
        const authResponse = await withAuth(authMiddleware, {
            callbacks: {
                // authorized: ({token}) => token?.role === ADMIN_ROLE
            }
        })(req, res)

        if (authResponse && authResponse.status !== 200) {
            return authResponse
        } else {
            return NextResponse.next();
        }
    } else {

        if (req.nextUrl.pathname === '/' || req.nextUrl.pathname.startsWith('/es') || req.nextUrl.pathname.startsWith('/en'))
            return handleI18nRouting(req);
    }

    return NextResponse.next();
}


