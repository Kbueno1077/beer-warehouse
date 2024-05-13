import { NextResponse } from "next/server";

export default async function cookieMiddleWare(req: any, res: any) {
    let response = NextResponse.next();
    if (!response.cookies.has("warehouseOwner")) {
        response.cookies.set("warehouseOwner", "Kevin");
    }
    return response;
}
