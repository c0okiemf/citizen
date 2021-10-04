import React from 'react'
import { Incident } from 'hooks/incidents'
import styled from 'styled-components'
import Image from 'next/image'
import playIcon from 'assets/play.svg'
import Link from 'next/link'
import { StreamPlayer } from 'components/IncidentsList/StreamPlayer'

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
    font-size: 20px;
    padding-top: 12px;
    color: #ffffff;
    font-weight: 800;
`

const IncidentNeighbourhood = styled.div`
    font-size: 14px;
    margin-top: 6px;
    color: #aaadb3;
`

const IncidentAddress = styled.div`
    font-size: 14px;
    margin-top: 3px;
    color: #4c5159;
`

const IncidentTime = styled.div`
    position: absolute;
    font-size: 12px;
    padding-top: 20px;
    color: #4c5159;
    font-weight: 700;
    text-align: right;
    right: 26px;
`

interface IncidentProps {
    incident: Incident
    incedentMarkerHoverId?: string
    setIncedentMarkerHoverId: (id?: string) => void
    streamUrl: string
}

export const TopIncident = ({
    incident,
    incedentMarkerHoverId,
    setIncedentMarkerHoverId,
    streamUrl,
}: IncidentProps): JSX.Element => {
    const { title, neighborhood, address, key, time } = incident
    const handleMouseEnter = () => setIncedentMarkerHoverId(key)
    const handleMouseLeave = () => setIncedentMarkerHoverId(undefined)
    return (
        <>
            <StreamPlayer url={streamUrl} />
            <Link href={`/detail/${key}`} key={key} passHref>
                <StyledSingleIncident
                    key={key}
                    $hover={incedentMarkerHoverId === key}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <div>
                        <IncidentTitle>{title}</IncidentTitle>
                        <IncidentNeighbourhood>{neighborhood}</IncidentNeighbourhood>
                        <IncidentAddress>{address}</IncidentAddress>
                    </div>
                    <IncidentTime>{time}</IncidentTime>
                </StyledSingleIncident>
            </Link>
        </>
    )
}