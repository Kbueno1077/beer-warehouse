import {ADMIN_ROLE} from "@/util/types";
import {NextResponse} from "next/server";

export default  async function authMiddleware(req: any, res: any) {
    if (req.nextauth.token && req.nextauth.token.role !== ADMIN_ROLE) {
        return NextResponse.json({error: true, errorMessage: "You are not authorized"}, {status: 401})
    } else {
        return NextResponse.json({ errorMessage: "Authorized"}, {status: 200})
    }
}
