import axios from 'axios'
import { useEffect, useState } from 'react'
import { AppError } from 'types/error'
import { API_URL } from 'const/api'

export type Stream = {
    incidentId: string
    hlsVodUrl: string
}

type FetchStreamsProps = {
    ids: string[]
}

type FerchStreamsResult = {
    streams: Stream[]
    loading: boolean
    error?: AppError
}

export const useFetchStreams = ({ ids }: FetchStreamsProps): FerchStreamsResult => {
    const [streams, setStreams] = useState<Stream[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<AppError>(undefined)

    const fetchStreams = async (ids: string[]) => {
        if (ids) {
            try {
                setLoading(true)
                const response = await axios.get<Stream[]>(API_URL.LIVE_STREAMS, {
                    params: {
                        video_stream_ids: ids.slice(10).join(','),
                        check_for_trim: true,
                        only_valid: true,
                    },
                })
                setStreams(response.data)
            } catch (e) {
                setError({
                    message: e.message,
                    originalError: e,
                })
            } finally {
                setLoading(false)
            }
        }
    }

    useEffect(() => {
        fetchStreams(ids)
    }, [JSON.stringify(ids)])

    return { streams, loading, error }
}
