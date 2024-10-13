import { getSession } from "next-auth/react";

export const countryFlagsToTheLeft = ["cu", "pr"];

export function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export async function checkSession() {
    const session = await getSession();

    if (session) return session;
    throw {
        error: true,
        response: { data: { errorMessage: "Log in to do this operation" } },
    };
}

export function groupByMethod(array: any, property: any = "") {
    let result = array.reduce((result: any, item: any) => {
        let key = "all";
        if (item[property]) {
            if (property === "name") {
                key = item[property][0].match(/[0-9]/)
                    ? "#"
                    : item[property][0];
            } else if (
                property === "country" &&
                item[property] === "TBD" &&
                item[property] === ""
            ) {
                key = "zzzTBD"; // This will ensure 'TBD' sorts last
            } else {
                key = item[property];
            }
        }
        (result[key] = result[key] || []).push(item);
        return result;
    }, {});

    result.total = array.length;

    // If 'TBD' group exists, rename 'zzzTBD' to 'TBD'
    if (result["zzzTBD"]) {
        result["TBD"] = result["zzzTBD"];
        delete result["zzzTBD"];
    }

    // Assign order of appearance number to each item
    let order = 1;
    let resultWithOrder = { ...result };

    for (let key in result) {
        if (key !== "total") {
            resultWithOrder[key] = result[key].map((item: any) => {
                let newItem = { ...item, order: order++ };
                return newItem;
            });
        }
    }

    return resultWithOrder;
}

const mapImpressionToValue = (impression: string) => {
    const impressionValues = {
        Excellent: 10,
        Amazing: 8,
        Good: 6,
        Average: 5,
        Bad: 4,
        Awful: 2,
        Horrible: 0,
    };
    return impressionValues[impression as keyof typeof impressionValues] || 0;
};

export const sortBy = (array: any, sortProp: string, direction: string) => {
    if (direction === "up") {
        return array.sort((a: any, b: any) => {
            if (sortProp === "initial_impression") {
                return (
                    mapImpressionToValue(a[sortProp]) -
                    mapImpressionToValue(b[sortProp])
                );
            } else {
                if (a[sortProp] < b[sortProp]) {
                    return -1;
                }
                if (a[sortProp] > b[sortProp]) {
                    return 1;
                }
                return 0;
            }
        });
    } else {
        return array.sort((a: any, b: any) => {
            if (sortProp === "initial_impression") {
                return (
                    mapImpressionToValue(b[sortProp]) -
                    mapImpressionToValue(a[sortProp])
                );
            } else {
                if (a[sortProp] < b[sortProp]) {
                    return 1;
                }
                if (a[sortProp] > b[sortProp]) {
                    return -1;
                }
                return 0;
            }
        });
    }
};
