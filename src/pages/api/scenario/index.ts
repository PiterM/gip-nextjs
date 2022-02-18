import type { NextApiRequest, NextApiResponse } from "next";
import {
  insertScenario,
  updateScenario,
  deleteScenario,
} from "../../../utils/db-scenario-handler";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      res = await post(req, res);
      break;
    case "PUT":
      res = await put(req, res);
      break;
    case "DELETE":
      res = await del(req, res);
      break;
  }
}

const post = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const result = insertScenario(req.body);
    res.status(200).json({ id: (await result).insertedId });
    return res;
  } catch (e) {
    res.status(500);
    return res;
  }
};

const put = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const body = JSON.parse(req.body);
    updateScenario(body);
    res.status(200).json({ message: "Saved" });
    return res;
  } catch (e) {
    res.status(500);
    return res;
  }
};

const del = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    deleteScenario(String(req.body));
    res.status(200).json({ message: "Deleted" });
    return res;
  } catch (e) {
    res.status(500);
    return res;
  }
};
