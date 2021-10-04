import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const citizenRes = await axios.get('https://data.sp0n.io/v1/video_streams/batch/', {
        params: req.query,
    })

    res.status(200).json(citizenRes.data)
}

export default handler
