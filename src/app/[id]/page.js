'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import Head from 'next/head'

export default function page() {

    const [id, setId] = useState(1)

    const router = ""


    useEffect(() => {
        const data = router
        //setId(data)
        console.log(data)
    }, [])

    return (

        <div className='flex justify center'>
            {id != 0 && (
                <Image src={"https://d9emswcmuvawb.cloudfront.net/2.png"} alt={'mingle'} width={500} height={500} />
            )
            }
        </div>

    )
}
