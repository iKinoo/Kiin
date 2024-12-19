import { NextApiRequest, NextApiResponse } from "next";

const currentVersion = "1.0_19.12.2024"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    return res.status(200).json(currentVersion);
}