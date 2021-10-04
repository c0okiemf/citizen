import React from 'react'
import styled from 'styled-components'
import { SingleIncidentUpdate } from 'components/IncidentDetail/Update'
import { Incident } from 'types/incident'

const Title = styled.div`
    color: #ffffff;
    font-size: 24px;
    font-weight: 700;
    margin-top: 21px;
`

const Neighbourhood = styled.div`
    color: #aaadb3;
    font-size: 16px;
    font-weight: 400;
    margin-top: 7px;
`

const Address = styled.div`
    color: #4c5159;
    font-size: 14px;
    font-weight: 400;
    line-height: 130%;
    margin-top: 7px;
    margin-bottom: 29px;
`

const StyledIncidentDetail = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 24px 40px 0 40px;
`

const Updates = styled.ul`
    margin-bottom: 0;
    bottom: 0;
    position: relative;
`

interface IncidentDetailProps {
    incident: Incident
}

export const IncidentDetail = ({ incident }: IncidentDetailProps): JSX.Element => {
    const { title, neighborhood, address, updates } = incident
    return (
        <StyledIncidentDetail>
            <div>
                <Title>{title}</Title>
                <Neighbourhood>{neighborhood}</Neighbourhood>
                <Address>{address}</Address>
            </div>
            <Updates>
                {updates.map((update) => (
                    <SingleIncidentUpdate update={update} key={update.id} />
                ))}
            </Updates>
        </StyledIncidentDetail>
    )
}
