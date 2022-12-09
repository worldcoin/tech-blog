import { NextApiRequest, NextApiResponse } from "next";

export type ApiSubscribeResponse = {
  status: string;
};

export const SUBSCRIBE_API_URL = "https://sendgrid.com/v3/contactdb/recipients";

/**
 * Just proxy for subscribe form for workaround with cors
 * @param req
 * @param res
 */
export default async function subscribe(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const result = await fetch(SUBSCRIBE_API_URL, {
      method: "POST",
      body: JSON.stringify(req.body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await result.json();

    if (result.ok) {
      return res.status(200).json(json);
    }

    throw new Error("Unexpected error");
  } catch (err) {
    console.warn(`[api/subscribe]: `, err);
    return res.status(500).json({ code: 500, message: "Something went wrong" });
  }
}
