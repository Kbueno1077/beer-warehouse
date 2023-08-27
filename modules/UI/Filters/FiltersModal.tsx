'use client'

import React from "react";
import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure} from "@nextui-org/react";
import AlcoholFilter from "@/modules/UI/Filters/AlcoholFilter";
import {useBeerStore} from "@/store/zustand";
import MlFilter from "@/modules/UI/Filters/MlFilter";
import CountryFilter from "@/modules/UI/Filters/CountryFilter";
import {useTranslations} from "next-intl";
import {PiSortAscendingBold} from "react-icons/pi";
import {TABLE_MODE} from "@/util/types";

export default function FiltersModal() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const t = useTranslations('filters');

    const {filters, changeFilters, mode} = useBeerStore();
    const [tempFilters, setTempFilters] = React.useState(filters);


    const handleFilters = (filterName: string, newFilter: any) => {
        const newFilters = {...tempFilters, [filterName]: newFilter}
        setTempFilters(newFilters)
    }

    const cancelFilters = (onClose: Function) => {
        setTempFilters(filters)
        onClose()
    }

    const applyFilters = (onClose: Function) => {
        changeFilters(tempFilters)
        onClose()
    }


    return (
        <>
            <Button color={mode === TABLE_MODE ? 'default' : 'primary'} size={mode === TABLE_MODE ? "sm" : 'md'}
                    variant={mode === TABLE_MODE ? 'flat' : 'faded'} onPress={onOpen} aria-label={t('btn-aria')}>
                {t('modalBtn')}
                {filters.alcoholFilters.length !== 5 || filters.mlFilters.mlValue > 0 || filters.countryFilters.length ? " *" : ""}
            </Button>


            <Modal size='4xl' isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1"> {t('modalBtn')}</ModalHeader>
                            <ModalBody>
                                <AlcoholFilter handleFilters={handleFilters}/>
                                <MlFilter handleFilters={handleFilters}/>
                                <CountryFilter handleFilters={handleFilters}/>


                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={() => cancelFilters(onClose)}>
                                    {t('cancel')}
                                </Button>
                                <Button color="primary" onPress={() => applyFilters(onClose)}>
                                    {t('apply')}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
