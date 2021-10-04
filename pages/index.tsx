import React, { createContext, useState } from 'react'
import { IncidentsMap } from 'components/IncidentsList/Map'
import { CommonPageStyle } from 'styles/globals'
import { IncidentsList } from 'components/IncidentsList/List'
import { useIncidentsMap } from 'hooks/map'
import styled from 'styled-components'
import { Incident } from 'hooks/incidents'
import { Stream } from 'hooks/streams'

const AppContainer = styled.div`
    display: flex;
    flex-direction: row;
`

const StyledIncidentsMap = styled(IncidentsMap)`
    position: relative;
    flex: 1;
    margin-left: 24px;
`

const StyledIncidentsList = styled(IncidentsList)`
    flex: 1;
    width: 512px;
    overflow-x: hidden;
    overflow-y: auto;
    height: calc(100vh - 72px);
`

type IncidentsContext = {
    incidents: Incident[]
    streams: Stream[]
    searchTerm?: string
    incedentMarkerHoverId?: string
    applySearchTerm?: (searchTerm?: string) => void
    setIncedentMarkerHoverId?: (id?: string) => void
}

export const IncidentsContext = createContext<IncidentsContext>({
    incidents: [],
    streams: [],
})

const IncidentsListPage = (): JSX.Element => {
    const [searchTerm, setSearchTerm] = useState<string>(undefined)

    const { mapContainer, incidents, incedentMarkerHoverId, setIncedentMarkerHoverId, streams } = useIncidentsMap({
        searchTerm,
    })

    const contextValue = {
        incidents,
        streams,
        searchTerm,
        applySearchTerm: setSearchTerm,
        incedentMarkerHoverId,
        setIncedentMarkerHoverId,
    }

    return (
        <IncidentsContext.Provider value={contextValue}>
            <CommonPageStyle />
            <AppContainer>
                <StyledIncidentsList />
                <StyledIncidentsMap mapContainer={mapContainer} />
            </AppContainer>
        </IncidentsContext.Provider>
    )
}

export default IncidentsListPage
