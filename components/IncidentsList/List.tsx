import React, { useContext, useMemo } from 'react'
import styled from 'styled-components'
import { IncidentsSearch } from 'components/IncidentsList/Search'
import { SingleIncident } from 'components/IncidentsList/SingleIncident'
import { IncidentsContext } from 'pages'
import { TopIncident } from 'components/IncidentsList/TopIncident'

const IncidentsContainer = styled.div`
    display: flex;
    flex-direction: column;
`

interface IncidentsListProps {
    className?: string
}

export const IncidentsList = ({ className }: IncidentsListProps): JSX.Element => {
    const { incidents, incedentMarkerHoverId, setIncedentMarkerHoverId, streams } = useContext(IncidentsContext)
    const selectedStream = useMemo(() => streams?.[0], [streams])
    const streamIncident = useMemo(
        () => incidents.find(({ key }) => key === selectedStream?.incidentId),
        [incidents, selectedStream?.incidentId],
    )
    return (
        <div className={className}>
            <IncidentsSearch />
            {selectedStream && streamIncident && (
                <TopIncident
                    incident={streamIncident}
                    incedentMarkerHoverId={incedentMarkerHoverId}
                    setIncedentMarkerHoverId={setIncedentMarkerHoverId}
                    streamUrl={selectedStream.hlsVodUrl}
                />
            )}
            <IncidentsContainer>
                {incidents.flatMap((incident) =>
                    selectedStream?.incidentId !== incident.key
                        ? [
                              <SingleIncident
                                  key={incident.key}
                                  incident={incident}
                                  incedentMarkerHoverId={incedentMarkerHoverId}
                                  setIncedentMarkerHoverId={setIncedentMarkerHoverId}
                              />,
                          ]
                        : [],
                )}
            </IncidentsContainer>
        </div>
    )
}
