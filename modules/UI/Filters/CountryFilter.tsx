'use client'

import React from "react";
import {useBeerStore} from "@/store/zustand";
import countriesJson from '../../../util/countries.json'
import {Avatar, Button} from "@nextui-org/react";
import {AiOutlineClose} from 'react-icons/ai'

import {CustomSelect, StateOption} from '@/components/CustomSelect/Select'
import {OnChangeValue} from 'react-select'
import {useTranslations} from "next-intl";

export default function CountryFilter({handleFilters}: any) {
    const {theme, filters} = useBeerStore();
    const [selected, setSelected] = React.useState<any>(filters.countryFilters);
    const t = useTranslations('filters');
    const tcountries = useTranslations('countries');

    const handleActions = (selectedOptions: OnChangeValue<StateOption, true>) => {
        setSelected(selectedOptions);
        handleFilters('countryFilters', selectedOptions)
    }

    const removeFilter = () => {
        setSelected([])
        handleFilters('countryFilters', [])
    }

    return (
        <div className='mt-4'>
            <div className='flex justify-between'>
                <h4 className='text-gray-500'>{t('country')} </h4>
                <Button size={'sm'} onClick={removeFilter} isIconOnly variant={'light'}
                        aria-label="Default Country Filter">
                    <AiOutlineClose/>
                </Button>
            </div>

            <CustomSelect
                theme={theme}
                placeholder={t('countryPlaceholder')}
                decorationPlacement='start'
                className="mt-2"
                menuPlacement="top"
                decoration={
                    <Avatar alt="Argentina" className="w-6 h-6"
                            src={`https://flagcdn.com/us.svg`}/>
                }
                options={Object.entries(countriesJson).map((entry) => {
                    return {
                        value: entry[0], label: tcountries(entry[1])
                    }
                })}
                value={selected}
                onChange={handleActions}
                closeMenuOnSelect={false}
                isMulti
            />


        </div>
    )
        ;
}
