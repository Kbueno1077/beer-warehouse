'use client'

import React from "react";
import {Button, Input, Select, Selection, SelectItem} from "@nextui-org/react";
import {useBeerStore} from "@/store/zustand";
import {AiOutlineClose} from "react-icons/ai";
import {useTranslations} from "next-intl";
import {string} from "zod";

export default function MlFilter({handleFilters}: any) {
    const {filters} = useBeerStore();
    const t = useTranslations('filters');

    const set: Selection = new Set();
    set.add(filters.mlFilters.operand);

    const [operand, setOperand] = React.useState<Iterable<any> | string>(set);
    const [mlValue, setMlValue] = React.useState<string>(filters.mlFilters.mlValue.toString());

    const handleActions = (e: any, tag: string) => {
        if (tag === 'select') {
            setOperand(e)
            handleFilters('mlFilters', {
                mlValue: parseFloat(mlValue),
                operand: e.values().next().value
            })
        } else {
            setMlValue(e)

            handleFilters('mlFilters', {
                operand: operand instanceof Set ? operand?.values().next().value : operand,
                mlValue: parseFloat(e)
            })
        }
    }


    const removeFilter = () => {
        let resetSet: Selection = new Set();
        resetSet.add("GET");
        setMlValue("")

        setOperand(resetSet)
        handleFilters('mlFilters', {
            operand: resetSet?.values().next().value,
            mlValue: ""
        })
    }

    return (
        <div className='mt-4'>
            <div className='flex justify-between'>
                <h4 className='text-gray-500'>{t('ml')}</h4>
                <Button size={'sm'} onClick={removeFilter} isIconOnly variant={'light'} aria-label="Default ML Filters">
                    <AiOutlineClose/>
                </Button>
            </div>

            <div className="flex w-full gap-2 mt-2">
                <Select
                    fullWidth={true}
                    disableSelectorIconRotation={false}
                    disableAnimation={false}
                    color={'default'}
                    label={t('operand')}
                    placeholder={t('operandPlaceholder')}
                    selectedKeys={operand}
                    className="max-w-xs"
                    onSelectionChange={(e) => handleActions(e, 'select')}
                >
                    <SelectItem key={"GET"} value={"GET"}>
                        {'>='}
                    </SelectItem>
                    <SelectItem key={"GT"} value={"GT"}>
                        {'>'}
                    </SelectItem>
                    <SelectItem key={"LET"} value={'LET'}>
                        {"<="}
                    </SelectItem>
                    <SelectItem key={"LT"} value={'LT'}>
                        {'<'}
                    </SelectItem>
                    <SelectItem key={"EQ"} value={'EQ'}>
                        {'='}
                    </SelectItem>
                </Select>

                <Input fullWidth={true}
                       type="number" label="ML" placeholder={t('mlPlaceholder')}
                       value={mlValue === "-1" ? "" : mlValue}
                       onValueChange={(e) => handleActions(e, 'input')}/>

            </div>
        </div>
    );
}
