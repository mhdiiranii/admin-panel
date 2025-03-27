import { NextRequest, NextResponse } from "next/server";

export async function middleware(request : NextRequest) {
    const token = request.cookies.get('authjs.session-token');
    if(!token){
        const url = new URL('/sign-in',request.url);
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher:['/panel/:path*','/products','/profile'],
}