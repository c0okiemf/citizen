export type IncidentUpdate = {
    id: string
    displayLocation: string
    text: string
    time: string
}

export type Incident = {
    title: string
    address: string
    hasVod?: boolean
    key: string
    location: string
    neighborhood: string
    latitude: number
    longitude: number
    level: number
    previewImg: string
    updates: IncidentUpdate[]
    time: string
    liveStreamersIds?: string[]
}

export type RawIncidentUpdates = {
    [key in string]: {
        displayLocation: string
        text: string
        ts: number
    }
}

export type RawIncident = {
    title: string
    address: string
    hasVod: boolean
    key: string
    liveStreamers: {
        [key in string]: {
            videoStreamId: string
        }
    }
    location: string
    neighborhood: string
    updates: RawIncidentUpdates
    latitude: number
    longitude: number
    level: number
    placeholderImageURL?: string
    horizontalThumbnail?: string
    preferredStream?: {
        image?: string
    }
    ts: number
}

export type RawSearchIncident = {
    title: string
    address: string
    objectID: string
    location: string
    neighborhood: string
    updates: RawIncidentUpdates
    'ranking.level': number
    _geoloc: { lat: number; lng: number }[]
    created_at: number
}

export type IncidentStream = {
    incidentId: string
    hlsVodUrl: string
}
