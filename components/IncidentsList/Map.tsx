import React from 'react'
import 'mapbox-gl/dist/mapbox-gl.css'
import styled from 'styled-components'

const MapContainer = styled.div`
    position: relative;
    height: 100%;
    width: 100%;
    outline: none;
`

interface IncidentsMapProps {
    mapContainer: React.MutableRefObject<any>
    className?: string
}

export const IncidentsMap = ({ mapContainer, className }: IncidentsMapProps): JSX.Element => {
    return (
        <div className={className}>
            <MapContainer ref={mapContainer} className="map-container" />
        </div>
    )
}
