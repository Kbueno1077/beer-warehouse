'use client'

import React from "react";
import {Button} from "@nextui-org/react";
import {useTranslations} from "next-intl";

export default function GroupByComponent({handleGroupBy, selectedGroupBy}: any) {
    const t = useTranslations('cards.groupBy');


    return (<>
        <Button onPress={() => {
            handleGroupBy('name')
        }}
                color='primary'
                variant={selectedGroupBy === 'name' ? 'bordered' : 'faded'}
                aria-label={t('name-aria')}>
            {t('name')}
        </Button>

        <Button onPress={() => {
            handleGroupBy('country')
        }}
                color='primary'
                variant={selectedGroupBy === 'country' ? 'bordered' : 'faded'}
                aria-label={t('country-aria')}>
            {t('country')}
        </Button>


        <Button onPress={() => {
            handleGroupBy("")
        }} color='primary' variant='faded'
                aria-label={t('clear-aria')}>
            {t('clear')}
        </Button>
    </>)

}
