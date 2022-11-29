import {NextApiRequest, NextApiResponse} from 'next'

export type ApiSubscribeResponse = {
  status: string
}

/**
 * Just proxy for subscribe form for workaround with cors
 * @param req
 * @param res
 */
export default async function subscribe(req: NextApiRequest, res: NextApiResponse) {
  const websiteUrl = process.env.NEXT_SERVER_WEBSITE_URL

  if (!websiteUrl) {
    console.warn('[api/subscribe]: you must specify NEXT_SERVER_WEBSITE_URL env')
    return res.status(500).json({code: 500, message: 'Something went wrong'})
  }

  try {
    const result = await fetch(`${websiteUrl}/api/subscribe`, {
      method: 'POST',
      body: JSON.stringify(req.body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const json = await result.json()

    if (result.ok) {
      return res.status(200).json(json)
    }

    throw new Error('Unexpected error')
  } catch (err) {
    console.warn(`[api/subscribe]: `, err)
    return res.status(500).json({code: 500, message: 'Something went wrong'})
  }
}
