import {NextRequest, NextResponse} from 'next/server'
import {getXataClient} from "@/xata/xata";
import {v2 as cloudinary} from 'cloudinary';


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUDNAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function POST(req: NextRequest, res: NextResponse) {
    const xata = getXataClient();
    const body = await req.json()

    const {
        name,
        alcohol_percentage,
        ml,
        country,
        initial_impression,
        bought_in,
        evidence_img,

        additional_comments,
    } = body

    try {
        const record = await xata.db.beers.create({
            name,
            alcohol_percentage,
            ml,
            country,
            initial_impression,
            bought_in,
            evidence_img,
            preview_img: "",
            additional_comments,
        });

        return NextResponse.json({record})

    } catch (error) {
        console.error('Error Inserting into Xata: ', error);
        return NextResponse.json({error, errorMessage: "Error Inserting into Xata"})
    }
}


export async function PUT(req: NextRequest, res: NextResponse) {
    const xata = getXataClient();
    const body = await req.json()

    const {
        id,
        name,
        alcohol_percentage,
        ml,
        country,
        initial_impression,
        bought_in,
        evidence_img,
        additional_comments,
        evidence_public_id
    } = body


    try {
        const record = await xata.db.beers.update(id, {
            name,
            alcohol_percentage,
            ml,
            country,
            initial_impression,
            bought_in,
            evidence_img,
            preview_img: "",
            additional_comments,
        });

        if (evidence_public_id) {
            const cloudinaryResponse = await cloudinary.api.delete_resources([evidence_public_id])
        }

        return NextResponse.json({record})
    } catch (error) {
        console.error('Error Updating into Xata: ', error);
        return NextResponse.json({error, errorMessage: "Error Updating into Xata"})
    }
}


export async function DELETE(req: NextRequest, res: NextResponse) {
    const xata = getXataClient();
    const id: string = req.nextUrl.searchParams.get('id') ?? ""
    const evidence_public_id: string = req.nextUrl.searchParams.get('evidence_public_id') ?? ""

    try {
        const record = await xata.db.beers.delete(id);

        if (evidence_public_id) {
            const cloudinaryResponse = await cloudinary.api.delete_resources([evidence_public_id])
        }


        return NextResponse.json({record})

    } catch
        (error) {
        console.error('Error Deleting beer in Xata: ', error);
        return NextResponse.json({error, errorMessage: "Error Deleting into Xata"})
    }

}
