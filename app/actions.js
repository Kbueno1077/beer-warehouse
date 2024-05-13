"use server";

import { cookies } from "next/headers";

export default async function create(name, value) {
    "use server";

    cookies().set(name, value);
}
