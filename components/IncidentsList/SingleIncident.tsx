import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import playIcon from 'assets/play.svg'
import Link from 'next/link'
import { Incident } from 'types/incident'

type StyledSingleIncidentProps = {
    $hover: boolean
}
const StyledSingleIncident = styled.div<StyledSingleIncidentProps>`
    max-height: 113px;
    padding: 17px;
    display: flex;
    cursor: pointer;
    position: relative;
    ${({ $hover }) => $hover && `background-color: #1c2026;`}
`

const IncidentTitle = styled.div`
    font-size: 14px;
    line-height: 17px;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding-top: 5px;
    color: #ffffff;
    font-weight: 800;
    width: 240px;
    overflow: hidden;
`

const IncidentNeighbourhood = styled.div`
    font-size: 12px;
    margin-top: 4px;
    color: #aaadb3;
`

const IncidentAddress = styled.div`
    font-size: 12px;
    color: #4c5159;
`

const ThumbnailContainer = styled.div`
    min-height: 80px;
    min-width: 80px;
    margin-right: 16px;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
`

const PlayImage = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
`

const IncidentTime = styled.div`
    position: absolute;
    font-size: 10px;
    padding-top: 14px;
    color: #4c5159;
    font-weight: 700;
    text-align: right;
    right: 26px;
`

interface IncidentProps {
    incident: Incident
    incedentMarkerHoverId?: string
    setIncedentMarkerHoverId: (id?: string) => void
}

export const SingleIncident = ({
    incident,
    incedentMarkerHoverId,
    setIncedentMarkerHoverId,
}: IncidentProps): JSX.Element => {
    const { title, neighborhood, address, key, previewImg, time } = incident
    const handleMouseEnter = () => setIncedentMarkerHoverId(key)
    const handleMouseLeave = () => setIncedentMarkerHoverId(undefined)
    return (
        <Link href={`/detail/${key}`} key={key} passHref>
            <StyledSingleIncident
                key={key}
                $hover={incedentMarkerHoverId === key}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <ThumbnailContainer>
                    <PlayImage>
                        <Image src={playIcon} alt="play" />
                    </PlayImage>
                    <Image src={previewImg} alt={title} layout="fill" objectFit="cover" unoptimized={true} />
                </ThumbnailContainer>
                <div>
                    <IncidentTitle>{title}</IncidentTitle>
                    <IncidentNeighbourhood>{neighborhood}</IncidentNeighbourhood>
                    <IncidentAddress>{address}</IncidentAddress>
                </div>
                {time && <IncidentTime>{time}</IncidentTime>}
            </StyledSingleIncident>
        </Link>
    )
}
