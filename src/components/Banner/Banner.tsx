import React, { useEffect, useState } from 'react'
import { fetchFire, type FirebaseProps } from '../../firebaseUtils'

interface BannerPayload {
    image: string
}

interface BannerProps extends FirebaseProps {
}

const Banner: React.FC<BannerProps> = ({ db, collectionName, orderByField, orderDirection }) => {
    const [banner, setBanner] = useState<BannerPayload | null>(null)

    useEffect(() => {
        void fetchFire<BannerPayload>(db, collectionName, orderByField, orderDirection).then((dataList: BannerPayload[]) => {
            if (dataList.length > 0) {
                setBanner(dataList[0])
            }
        })
    }, [])

    if (banner === null) {
        return null
    }

    const bannerStyle: React.CSSProperties = {
        backgroundImage: `url(${banner.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '35em'
    }

    return (
        <div style={bannerStyle} />
    )
}

export default Banner
