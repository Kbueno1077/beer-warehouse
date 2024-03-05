import { extendVariants, Chip } from "@nextui-org/react";

export const CustomChip = extendVariants(Chip, {
    variants: {
        // <- modify/add variants
        color: {
            blank: "text-[#000] bg-[#adb5bd]",
            soft: "text-[#000] bg-[#00b4d8]",
            normal: "text-[#000] bg-[#43aa8b]",
            caution: "text-[#000] bg-[#f9c74f]",
            warning: "text-[#fff] bg-[#f3722c]",
            danger: "text-[#fff] bg-[#e63946]",
        },
    },
});
