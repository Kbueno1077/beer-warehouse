'use client'

import React from "react";
import {BeerType} from "@/util/types";
import {useBeerStore} from "@/store/zustand";

import NextImage from "next/image";
import {Image} from "@nextui-org/react";
import FlagAvatar from "@/components/FlagAvatar/FlagAvatar";

interface BeerDetailsProps {
    beer: BeerType
}


function BeerDetails({beer}: BeerDetailsProps) {
    const {theme} = useBeerStore();

    console.log(beer)

    return (
        <div className='flex flex-col gap-5 m-3 md:m-10'>
            <h1 className="mb-2 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl">{beer.name}</h1>

            <div className='flex flex-col md:flex-row justify-evenly gap-5'>
                <Image
                    isZoomed={true}
                    as={NextImage}
                    width={500}
                    height={500}
                    quality={100}
                    alt="NextUI Fruit Image with Zoom"
                    src={beer.evidence_img || ""}
                />

                <div>
                    <p>ML: {beer.ml} </p>
                    <p>%: {beer.alcohol_percentage} </p>
                    <p>Impression: {beer.initial_impression} </p>


                    <FlagAvatar value={beer.country} withName={true}/>


                    <p>Bought In: {beer.bought_in} </p>

                </div>

            </div>

        </div>)
}

export default BeerDetails