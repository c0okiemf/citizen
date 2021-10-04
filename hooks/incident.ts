import axios from 'axios'
import { useEffect, useState } from 'react'
import { AppError } from 'types/error'
import { Incident, RawIncident, mapIncidents } from './incidents'
import { API_URL } from 'const/api'

type FetchIncidentProps = {
    id: string
}

type FerchIncidentResult = {
    incident?: Incident
    loading: boolean
    error?: AppError
}

export const useFetchIncident = ({ id }: FetchIncidentProps): FerchIncidentResult => {
    const [incident, setIncident] = useState<Incident>(undefined)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<AppError>(undefined)

    const fetchIncident = async (id: string) => {
        if (id) {
            try {
                setLoading(true)
                const response = await axios.get<RawIncident>(`${API_URL.SINGLE_INCIDENT}/${id}`)
                setIncident(mapIncidents([response.data])[0])
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
        fetchIncident(id)
    }, [id])

    return { incident, loading, error }
}
