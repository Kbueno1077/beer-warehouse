import {ChipProps} from "@nextui-org/react";

const columns = [
    {name: "NAME", uid: "name", sortable: true},
    {name: "ML", uid: "ml", sortable: true},
    {name: "ALCOHOL %", uid: "alcohol_percentage", sortable: true},
    {name: "BOUGHT IN", uid: "bought_in", sortable: true},
    // {name: "IMPRESSION", uid: "initial_impression", sortable: true},
    {name: "COUNTRY", uid: "country", sortable: true},
    {name: "EVIDENCE", uid: "evidence_img"},
    {name: "ACTIONS", uid: "actions"},
];

const alcoholOptions = [
    {name: "soft", uid: "soft"},
    {name: "normal", uid: "normal"},
    {name: "high", uid: "high"},
    {name: "extra", uid: "extra"},
    {name: "hardcore", uid: "hardcore"},
];

const filterOptions = [
    {name: "Alcohol %", uid: "soft", filter: 'alcohol'},
    {name: "Impression", uid: "normal", filter: 'alcohol'},
    {name: "Ml", uid: "high", filter: 'alcohol'},
]

const mapPercentToString = (percent: number) => {
    if (percent < 0) return 'default';
    if (percent < 4) return 'soft'
    if (percent < 5 && percent >= 4) return 'normal'
    if (percent >= 5 && percent < 6.2) return 'high'
    if (percent >= 6.2 && percent < 8) return 'extra'
    if (percent >= 8) return 'hardcore'

    return ""
}

const mapImpressionToColor = (impression: string) => {
    switch (impression) {
        case 'good' :
            return "success";
        case 'bad':
            return 'danger';
        default:
            return "default"
    }
}

//Extend this well done
//const alcoholColorMap: Record<string, CustomChipProps["color"]> = {
const alcoholColorMap: Record<string, any> = {
    default: 'blank',
    soft: "soft",
    normal: "normal",
    high: "caution",
    extra: "warning",
    hardcore: "danger",
};

const mapOperands = (operand: string, value: number, beerValue: number) => {


    switch (operand) {
        case "GET":
            return beerValue >= value
        case "GT":
            return beerValue > value
        case "LET":
            return beerValue <= value
        case "LT":
            return beerValue < value
        case "EQ":
            return beerValue === value

    }
}

// const INITIAL_VISIBLE_COLUMNS = ["name", "ml", "alcohol_percentage", "country", "bought_in", "initial_impression", "evidence_img", "actions"];
const INITIAL_VISIBLE_COLUMNS = ["name", "ml", "alcohol_percentage", "country", "bought_in", "evidence_img", "actions"];


export {
    columns,
    alcoholOptions,
    filterOptions,
    alcoholColorMap,
    INITIAL_VISIBLE_COLUMNS,
    mapPercentToString,
    mapOperands
};
