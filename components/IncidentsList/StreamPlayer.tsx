import React from 'react'
import styled from 'styled-components'
import ReactPlayer from 'react-player'

const StreamPlayerContainer = styled.div`
    position: relative;
`

interface StreamPlayerProps {
    url?: string
}

export const StreamPlayer = ({ url }: StreamPlayerProps): JSX.Element => {
    return url ? (
        <StreamPlayerContainer>
            <ReactPlayer url={url} playing={true} volume={0} />
        </StreamPlayerContainer>
    ) : (
        <></>
    )
}
