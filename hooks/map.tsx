import React, { useMemo, useCallback } from 'react'
import { useState, useRef, useEffect } from 'react'
import { useFetchIncidents, Incident } from 'hooks/incidents'
import { Map, LngLatBounds, Marker, LngLat, NavigationControl, Popup } from 'mapbox-gl'
import { MAPBOX_TOKEN, INCIDENTS_LIMIT } from 'const/api'
import { DEFAULT_COORDINATES } from 'const/coordinates'
import { throttle } from 'lodash'
import { useStopwatch } from 'react-timer-hook'
import { markerStyle } from 'styles/marker'
import { useRouter } from 'next/router'
import { useFetchStreams, Stream } from 'hooks/streams'

type MakeIncidentsMapProps = {
    searchTerm?: string
}

type MakeIncidentsMapResult = {
    mapContainer: React.MutableRefObject<any>
    map: React.MutableRefObject<any>
    bounds: LngLatBounds
    incidents: Incident[]
    streams: Stream[]
    incedentMarkerHoverId: string
    setIncedentMarkerHoverId: (id?: string) => void
}

export const useIncidentsMap = ({ searchTerm }: MakeIncidentsMapProps): MakeIncidentsMapResult => {
    const router = useRouter()

    const mapContainer = useRef(null)
    const map = useRef<Map>(null)
    const [incedentMarkerHoverId, setIncedentMarkerHoverId] = useState<string>(undefined)
    const [bounds, setBounds] = useState<LngLatBounds>(DEFAULT_COORDINATES)

    const { incidents, refetch } = useFetchIncidents({ params: { bounds }, searchTerm })

    const markerElements = useMemo(
        () =>
            typeof document !== 'undefined' &&
            Array.from({ length: INCIDENTS_LIMIT }, () => document.createElement('div')).map((element) => {
                return {
                    element,
                    marker: undefined,
                    key: undefined,
                }
            }),
        [],
    )

    const formatPopupContent = (title: string, address: string) => `
        <div>
            <div style="font-size: 14px; line-height: 17px; color: gray; font-weight: 800;">${title}</div>
            <div style="font-size: 12px; color: #4c5159; font-weight: 400;">${address}</div>
        </div>
    `

    const makeMarkers = useCallback(
        (incidents: Incident[]) => {
            for (let i = 0; i < INCIDENTS_LIMIT; i++) {
                markerElements[i]?.marker?.setPopup(undefined)
                markerElements[i]?.marker?.remove()
                const incident = incidents[i]
                if (incident) {
                    const { longitude, latitude, level, title, address, key } = incident
                    const markerElement = markerElements[i]
                    const { element } = markerElement
                    element.style.cssText = markerStyle(level)
                    const popup = new Popup({
                        closeButton: false,
                        closeOnClick: false,
                    }).setHTML(formatPopupContent(title, address))
                    const marker = new Marker({ element })
                        .setLngLat(new LngLat(longitude, latitude))
                        .setPopup(popup)
                        .addTo(map.current)
                    markerElement.marker = marker
                    markerElement.key = key
                    element.addEventListener('mouseenter', () => {
                        setIncedentMarkerHoverId(key)
                    })
                    element.addEventListener('mouseleave', () => {
                        setIncedentMarkerHoverId(undefined)
                    })
                    element.addEventListener('click', () => {
                        router.push(`/detail/${key}`)
                    })
                }
            }
        },
        [markerElements, router],
    )

    useEffect(() => {
        markerElements.forEach(({ marker, key }) => {
            if (incedentMarkerHoverId === key) {
                marker?.togglePopup()
            } else if (marker.getPopup()?.isOpen()) {
                marker?.togglePopup()
            }
        })
    }, [incedentMarkerHoverId, markerElements])

    useEffect(() => {
        if (map.current) return
        map.current = new Map({
            container: mapContainer.current,
            bounds: DEFAULT_COORDINATES,
            accessToken: MAPBOX_TOKEN,
            attributionControl: false,
            style: 'https://maps.sp0n.io/styles/citizen-app-dark/style.json',
        })
        map.current.addControl(new NavigationControl({ showCompass: false }))
    }, [])

    const throttledSetBounds = useRef(throttle(setBounds, 1000))
    map.current?.on('move', () => {
        throttledSetBounds.current(map.current?.getBounds())
    })

    const { seconds, reset } = useStopwatch({ autoStart: true })
    useEffect(() => {
        if (seconds >= 10) {
            refetch()
            reset(new Date(), true)
        }
    }, [refetch, reset, seconds])

    useEffect(() => {
        if (searchTerm !== undefined) {
            refetch()
        }
    }, [searchTerm])

    useEffect(() => {
        makeMarkers(incidents)
    }, [JSON.stringify(incidents), makeMarkers])

    const streamsIds = useMemo(() => incidents.flatMap(({ liveStreamersIds }) => liveStreamersIds), [incidents])

    const { streams } = useFetchStreams({ ids: streamsIds })

    return { mapContainer, map, bounds, incidents, incedentMarkerHoverId, setIncedentMarkerHoverId, streams }
}
