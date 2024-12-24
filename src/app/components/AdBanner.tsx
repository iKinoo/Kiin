'use client'
import React, { useEffect } from 'react'

interface AdBannerProps {
    dataAdSlot: string
    dataAdFormat: string
    dataFullWidthResponsive: boolean
    dataAdLayoutKey?: string
}
const AdBanner: React.FC<AdBannerProps> = ({ dataAdSlot, dataAdFormat, dataFullWidthResponsive, dataAdLayoutKey }) => {
    const pId: string = '2263575229671406'
    useEffect(() => {
        try {
            ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({})

        } catch (error) {
            console.error(error)
        }
    }, [])
    return (
        <ins
            className='adsbygoogle'
            style={{ display: 'block' }}
            data-ad-client={`ca-pub-${pId}`}
            data-ad-slot={dataAdSlot}
            data-ad-format={dataAdFormat}
            data-full-width-responsive={dataFullWidthResponsive.toString()}
            data-ad-layout-key={dataAdLayoutKey}
        >

        </ins>
    )
}

export default AdBanner