import { ADMIN_ROLE, OWNER_ROLE } from "@/util/types";
import { NextResponse } from "next/server";

export default async function authMiddleware(req: any, res: any) {
    if (
        (req.nextauth.token && req.nextauth.token.role === ADMIN_ROLE) ||
        req.nextauth.token.role === OWNER_ROLE
    ) {
        return NextResponse.json(
            { errorMessage: "Authorized" },
            { status: 200 }
        );
    } else {
        return NextResponse.json(
            { error: true, errorMessage: "You are not authorized" },
            { status: 401 }
        );
    }
}
