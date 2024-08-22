import { NextResponse } from "next/server";

export default async function cookieMiddleWare(req: any, res: any) {
    let response = NextResponse.next();
    if (!response.cookies.has("cookieWarehouseOwner")) {
        response.cookies.set("cookieWarehouseOwner", "Kevin");
    }
    return response;
}
