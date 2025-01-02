import { NextApiRequest, NextApiResponse } from "next";

const currentVersion = "1.1_02.01.2025"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    return res.status(200).json(currentVersion);
}