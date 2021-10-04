import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const { lowerLatitude, lowerLongitude, upperLatitude, upperLongitude, q } = req.query

    const citizenRes = await axios.get('https://citizen.com/api/incident/search', {
        params: {
            'insideBoundingBox[0]': lowerLatitude,
            'insideBoundingBox[1]': lowerLongitude,
            'insideBoundingBox[2]': upperLatitude,
            'insideBoundingBox[3]': upperLongitude,
            q,
        },
    })

    res.status(200).json(citizenRes.data)
}

export default handler
