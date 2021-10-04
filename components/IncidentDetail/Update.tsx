import React from 'react'
import { IncidentUpdate } from 'hooks/incidents'
import styled from 'styled-components'

const DateContainer = styled.div`
    display: flex;
    align-items: center;
`

const Bullet = styled.div`
    margin-right: 10px;
    background: #4c5159;
    border-radius: 50%;
    height: 10px;
    width: 10px;
`

const Time = styled.div`
    color: #4c5159;
    font-size: 14px;
    font-weight: 400;
    width: 100%;
`

const UpdateText = styled.div`
    border-left: 4px solid #1c2026;
    padding-left: 13px;
    padding-right: 13px;
    margin-left: 3px;
    padding-top: 7px;
    padding-bottom: 36px;
    color: #ffffff;
`

interface IncidentUpdateProps {
    update: IncidentUpdate
}

export const SingleIncidentUpdate = ({ update }: IncidentUpdateProps): JSX.Element => {
    const { text, time } = update
    return (
        <li>
            <DateContainer>
                <Bullet />
                <Time>{time}</Time>
            </DateContainer>
            <UpdateText>{text}</UpdateText>
        </li>
    )
}
