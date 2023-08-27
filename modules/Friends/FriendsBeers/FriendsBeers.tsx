import React from "react";
import {Input} from "@nextui-org/react";
import {SearchIcon} from "@/modules/UI/TableUI/DataTable/TableIcons";
import SlideCard from "@/modules/Friends/SlideCard/SlideCard";
import {useTranslations} from "next-intl";

export default function FriendsBeers() {
    const t = useTranslations("table");

    return (
        <>
            <div className='max-w-[1920px] sm:px-5 pb-7' >

                <div className="px-5 py-5">
                    <Input
                        fullWidth={true}
                        isClearable
                        startContent={<SearchIcon className="text-default-300"/>}
                        placeholder={t("search.placeholder")}
                        // value={mlValue === "-1" ? "" : mlValue}
                        // onValueChange={(e) => handleActions(e, 'input')}
                    />
                </div>

                <div className="flex flex-wrap justify-between px-5 py-2 gap-5">
                    <SlideCard/>
                    <SlideCard/>
                    <SlideCard/>
                    <SlideCard/>
                    <SlideCard/>
                    <SlideCard/>
                    <SlideCard/>
                    <SlideCard/>
                    <SlideCard/>
                    <SlideCard/>
                    <SlideCard/>
                    <SlideCard/>
                    <SlideCard/>
                    <SlideCard/>
                    <SlideCard/>
                    <SlideCard/>
                    <SlideCard/>
                    <SlideCard/>
                    <SlideCard/>
                </div>

            </div>
        </>
    );
}
