import { NextApiRequest, NextApiResponse } from "next";

const currentVersion = "1.1_20.05.2025"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    return res.status(200).json(currentVersion);
}