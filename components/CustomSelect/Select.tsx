// @ts-nocheck

import React from 'react';
import Select, {components, MultiValueProps, OptionProps, SingleValueProps, StylesConfig} from 'react-select';
import AsyncSelect from "react-select/async";
import {DARK_MODE} from "@/util/types";

export interface OptionsType {
    readonly value: string;
    readonly label: string;
    readonly color?: string;
    readonly isFixed?: boolean;
    readonly isDisabled?: boolean;
}

export interface StateOption {
    readonly value: string;
    readonly label: string;
}

const customStyles: StylesConfig<OptionsType, true> = {
    clearIndicator: (styles, state) => ({...styles, display: 'none'}),
    container: (styles, state) => ({...styles}),
    control: (styles, state) => ({
        ...styles,
        backgroundColor: state.selectProps.theme === DARK_MODE ? '#27272A' : '#F4F4F5',
        minHeight: "56px",
        cursor: 'pointer',
        height: "max-content",
        borderRadius: "10px",
        border: 'none',

        ':hover': {'backgroundColor': state.selectProps.theme === DARK_MODE ? '#3F3F46' : '#E4E4E7'}
    }),


    dropdownIndicator: (styles, state) => ({
        ...styles,
        transition: '0.15s linear',
        rotate: state.isFocused ? '180deg' : "0deg"
    }),

    group: (styles, state) => ({...styles}),
    groupHeading: (styles, state) => ({...styles}),
    indicatorsContainer: (styles, state) => ({...styles}),
    indicatorSeparator: (styles, state) => ({...styles, display: 'none'}),
    input: (styles, state) => ({
        ...styles,
        color: state.selectProps.theme === DARK_MODE ? '#D4D4D8' : 'initial'
    }),
    loadingIndicator: (styles, state) => ({...styles}),
    loadingMessage: (styles, state) => ({...styles}),

    menu: (styles, state) => ({
        ...styles,
        borderRadius: "10px",

        backgroundColor: state.selectProps.theme === DARK_MODE ? '#27272A' : '#F4F4F5',
        zIndex: 100,
    }),
    menuList: (styles, state) => ({...styles, padding: '10px'}),
    menuPortal: (styles, state) => ({...styles}),

    multiValue: (styles, state) => ({
        ...styles,
        borderRadius: "10px",
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        gap: '2px',
        padding: '0px 2px 0px',

    }),
    multiValueLabel: (styles, state) => ({
        ...styles, color: state.selectProps.theme === DARK_MODE ? '#D4D4D8' : 'initial',
    }),
    multiValueRemove: (styles, state) => ({...styles, ':hover': {'backgroundColor': 'transparent'}}),

    noOptionsMessage: (styles, state) => ({
        ...styles,
        color: state.selectProps.theme === DARK_MODE ? '#D4D4D8' : 'initial'
    }),
    option: (styles, state) => ({
        ...styles,
        cursor: !state.isDisabled ? "pointer" : 'initial',
        backgroundColor: state.isFocused ? '#57595D' : 'initial',
        color: state.isDisabled ? '#CCCDCE' : state.isFocused ? 'white' : 'initial',
        borderRadius: '10px'
    }),

    placeholder: (styles, state) => ({
        ...styles,
        transition: '0.1s linear',
        marginBottom: state.isFocused ? '25px' : '0',
        marginLeft: '5px',
        color: state.selectProps.theme === DARK_MODE ? '#D4D4D8' : '#57595D',
        fontWeight: state.isFocused ? 600 : 400,
        fontSize: state.isFocused ? '12px' : '14px',
    }),
    singleValue: (styles, state) => ({
        ...styles,
        color: state.selectProps.theme === DARK_MODE ? '#D4D4D8' : 'initial',
    }),
    valueContainer: (styles, state) => ({...styles}),
};

const CustomOption = ({children, ...props}: OptionProps<OptionsType, false>) => {
    const {decoration, decorationPlacement = 'start'} = props.selectProps;
    const {data} = props;

    const newDecoration = {...decoration, props: {...decoration.props, src: `https://flagcdn.com/${data.value}.svg`}}

    return (
        <components.Option {...props} >
            <div className='flex align-middle items-center gap-2'>
                {decorationPlacement === 'start' && newDecoration}
                {children}
                {decorationPlacement === 'end' && newDecoration}
            </div>
        </components.Option>
    );
}

const CustomMultiValue = ({children, ...props}: MultiValueProps<OptionsType, false>) => {
    const {decoration, decorationPlacement = 'start', value} = props.selectProps;
    const {data} = props;

    const newDecoration = {...decoration, props: {...decoration.props, src: `https://flagcdn.com/${data.value}.svg`}}

    return (
        <components.MultiValue {...props} >
            <div className='flex align-middle items-center gap-2'>
                {decorationPlacement === 'start' && newDecoration}
                {children}
                {decorationPlacement === 'end' && newDecoration}
            </div>
        </components.MultiValue>
    )
        ;
}

const CustomSingleValue = ({children, ...props}: SingleValueProps<OptionsType, false>) => {
    const {decoration, decorationPlacement = 'start', value} = props.selectProps;
    const {data} = props;

    const newDecoration = {...decoration, props: {...decoration.props, src: `https://flagcdn.com/${data.value}.svg`}}

    return (
        <components.SingleValue {...props} >
            <div className='flex align-middle items-center gap-2'>
                {decorationPlacement === 'start' && newDecoration}
                {children}
                {decorationPlacement === 'end' && newDecoration}
            </div>
        </components.SingleValue>
    );
}


export function CustomSelect(props: any) {
    return (
        <Select
            {...props}
            components={{Option: CustomOption, MultiValue: CustomMultiValue, SingleValue: CustomSingleValue}}
            styles={customStyles}
        />
    )
}


export function CustomAsyncSelect(props: any) {
    return (
        <AsyncSelect
            {...props}
            components={{Option: CustomOption, MultiValue: CustomMultiValue, SingleValue: CustomSingleValue}}
            styles={customStyles}
        />
    )
}