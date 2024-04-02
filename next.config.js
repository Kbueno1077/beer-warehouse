/** @type {import('next').NextConfig} */

const withNextIntl = require("next-intl/plugin")("./i18n/i18n.ts");

const nextConfig = withNextIntl({
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
                pathname: "**",
            },
            {
                protocol: "https",
                hostname: "source.unsplash.com",
                pathname: "**",
            },
            {
                protocol: "https",
                hostname: "images.hdqwalls.com",
                pathname: "**",
            },
        ],
    },
    env: {
        BASE_URL: "https://beer-warehouse/",
        XATA_BRANCH: "main",
        XATA_API_KEY: "xau_0I1txF4W10ujyhpbjiqpNKazZNqpKymk0",
        XATA_DB_URL:
            "https://Kevin-Bueno-s-workspace-8l3c94.us-east-1.xata.sh/db/beer-warehouse",
        NEXTAUTH_SECRET: "G1QHiq6qcmxRkpwfxd7lAC+Tu70F8plZ0Uy6qguRTe0:",
        CLOUDINARTY_URL: "https://api.cloudinary.com/v1_1/dub477vzt/upload",
        CLOUDINARY_CLOUDNAME: "dub477vzt",
        CLOUDINARY_API_KEY: "763641954252769",
        CLOUDINARY_API_SECRET: "Qs2_7_dklt-9I8yskgkoSqELxhA",
        CLOUDINARY_BEER_FOLDER: "beers-warehouse",
        CLOUDINARY_UPLOAD_PRESET: "ul1f0lm9",
    },
});

module.exports = nextConfig;
