import { NextRequest, NextResponse } from "next/server";
import { getXataClient } from "@/xata/xata";

export async function POST(req: NextRequest, res: NextResponse) {
    const xata = getXataClient();
    const body = await req.json();

    const { name, email, password, salt } = body;

    try {
        const user: any = await xata.db.nextauth_users
            .filter({
                $any: [{ name: name }, { email: email }],
            })
            .getFirst();

        if (user) {
            return NextResponse.json({
                error: true,
                status: 409,
                errorMessage: "This user already exists",
            });
        }

        const record = await xata.db.nextauth_users.create({
            name,
            password,
            email,
            image: "",
            salt,
            // emailVerified: Date.now(),
            role: "Owner",
        });

        return NextResponse.json({ record });
    } catch (error) {
        console.error("Error Inserting into Xata User: ", error);
        return NextResponse.json({
            error,
            errorMessage: "Error Inserting into Xata User",
        });
    }
}

export async function PUT(req: NextRequest, res: NextResponse) {
    const xata = getXataClient();
    const body = await req.json();

    const { name, email, image, password } = body;

    try {
        return NextResponse.json({});
    } catch (error) {
        console.error("Error Updating in Xata: ", error);
        return NextResponse.json({
            error,
            errorMessage: "Error Updating in Xata",
        });
    }
}
