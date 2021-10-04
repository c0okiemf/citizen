import React from 'react'
import 'mapbox-gl/dist/mapbox-gl.css'
import styled from 'styled-components'

const Title = styled.div`
    font-size: 14px;
    line-height: 17px;
    color: black;
    font-weight: 800;
`

const Address = styled.div`
    font-size: 12px;
    color: #4c5159;
    font-weight: 400;
    margin-top: 5px;
`

interface MapPopupProps {
    title: string
    address: string
}

export const MapPopup = ({ title, address }: MapPopupProps): JSX.Element => {
    return (
        <div>
            <Title>{title}</Title>
            <Address>{address}</Address>
        </div>
    )
}
