import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/charts"],
            },
        ],
        sitemap: `${process.env.BASE_URL}/sitemap.xml`,
    };
}
