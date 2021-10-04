import axios from 'axios'
import { useEffect, useState, useMemo } from 'react'
import { AppError } from 'types/error'
import { LngLatBounds } from 'mapbox-gl'
import { INCIDENTS_LIMIT, API_URL } from 'const/api'
import notFoundIcon from 'assets/not-found.svg'
import { Incident, RawIncidentUpdates, IncidentUpdate, RawIncident, RawSearchIncident } from 'types/incident'

const mapParams = (
    { bounds, limit = INCIDENTS_LIMIT, fullResponse = true }: FetchIncidentsQueryParams,
    searchTerm?: string,
): unknown => ({
    lowerLatitude: bounds.getSouth(),
    lowerLongitude: bounds.getWest(),
    upperLatitude: bounds.getNorth(),
    upperLongitude: bounds.getEast(),
    fullResponse,
    limit,
    ...(searchTerm && { q: searchTerm }),
})

const formatTime = (ts: number): string => new Date(ts).toLocaleTimeString()

const mapUpdates = (updates: RawIncidentUpdates): IncidentUpdate[] =>
    Object.keys(updates)
        .reverse()
        .map((id) => {
            const time = formatTime(updates[id].ts)
            return { ...updates[id], id, time }
        })

export const mapIncidents = (incidents: RawIncident[]): Incident[] =>
    incidents?.map((incident) => {
        const {
            horizontalThumbnail,
            preferredStream,
            placeholderImageURL,
            updates: rawUpdates,
            ts,
            liveStreamers,
        } = incident
        const previewImg = horizontalThumbnail || preferredStream?.image || placeholderImageURL
        const updates = mapUpdates(rawUpdates)
        const time = formatTime(ts)
        const liveStreamersIds = Object.keys(liveStreamers || {}).map(
            (streamer) => liveStreamers[streamer].videoStreamId,
        )
        return { ...incident, previewImg, updates, time, liveStreamersIds }
    }) || []

const mapSearchIncidents = (incidents: RawSearchIncident[]): Incident[] =>
    incidents?.map((incident) => {
        const { _geoloc, objectID: key, updates: rawUpdates, created_at } = incident
        const latitude = _geoloc[0].lat
        const longitude = _geoloc[0].lng
        const level = incident['ranking.level']
        const previewImg = notFoundIcon
        const updates = mapUpdates(rawUpdates)
        const time = formatTime(created_at)
        return { ...incident, latitude, longitude, key, level, previewImg, updates, time }
    }) || []

type FetchIncidentsQueryParams = {
    bounds?: LngLatBounds
    fullResponse?: boolean
    limit?: number
}

type FetchIncidentsProps = {
    params: FetchIncidentsQueryParams
    searchTerm?: string
}

type FerchIncidentsResult = {
    incidents: Incident[]
    loading: boolean
    error: AppError
    refetch: () => void
}

export const useFetchIncidents = ({ params, searchTerm }: FetchIncidentsProps): FerchIncidentsResult => {
    const [data, setData] = useState<{ response: any; type: 'search' | 'public' }>(undefined)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<AppError>(undefined)

    const fetchIncidents = async (params: FetchIncidentsQueryParams) => {
        try {
            setLoading(true)
            const apiUrl = searchTerm ? API_URL.SEARCH_GEO_INCIDENTS : API_URL.GEO_INCIDENTS
            const type = searchTerm ? 'search' : 'public'
            const res = await axios.get<any>(apiUrl, {
                params: mapParams(params, searchTerm),
            })
            setData({ response: res.data.results || res.data.hits, type })
        } catch (e) {
            setError({
                message: e.message,
                originalError: e,
            })
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchIncidents(params)
    }, [...Object.values(params)])

    const incidents = data?.type === 'search' ? mapSearchIncidents(data?.response) : mapIncidents(data?.response)
    const refetch = useMemo(() => () => fetchIncidents(params), [fetchIncidents])
    return { incidents, loading, error, refetch }
}
