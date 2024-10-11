import BeerDetails from "@/modules/BeerDetails/BeerDetails";
import { getXataClient } from "@/xata/xata";

export default async function Page({ params }: { params: { beer: string } }) {
    const xata = getXataClient();
    const record = await xata.db.beers.read(params.beer);

    if (!record) {
        return null;
    }

    return (
        <>
            <BeerDetails beer={record} />
        </>
    );
}
