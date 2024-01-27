import React from 'react'

interface BannerProps {
    backgroundImageUrl: string
};

const Banner: React.FC<BannerProps> = ({ backgroundImageUrl }) => {
    const bannerStyle: React.CSSProperties = {
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '35em'
    }

    return (
        <div style={bannerStyle} />
    )
}

export default Banner
