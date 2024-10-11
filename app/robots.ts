import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/charts", "/private"],
            },
            {
                userAgent: "Googlebot",
                allow: "/public",
                disallow: ["/private"],
            },
        ],
        sitemap: `${process.env.BASE_URL}/sitemap.xml`,
    };
}
