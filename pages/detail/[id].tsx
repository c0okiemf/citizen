import React from 'react'
import { useRouter } from 'next/router'
import { useFetchIncident } from 'hooks/incident'
import { CommonPageStyle } from 'styles/globals'
import { IncidentDetail } from 'components/IncidentDetail/Detail'

const IncidentDetailPage = (): JSX.Element => {
    const router = useRouter()
    const { id } = router.query

    const { incident } = useFetchIncident({ id })

    return (
        <>
            <CommonPageStyle />
            {incident && <IncidentDetail incident={incident} />}
        </>
    )
}

export default IncidentDetailPage
