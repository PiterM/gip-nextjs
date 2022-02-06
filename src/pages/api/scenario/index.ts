import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../utils/mongodb";
import {
  insertScenario,
  updateScenario,
  deleteScenario,
} from "../../../utils/mongodbHandler";

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
  const result = insertScenario(req.body);
  res.status(200).json({ id: (await result).insertedId });
  return res;
};

const put = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await clientPromise;
  const body = JSON.parse(req.body);
  updateScenario(body);

  res.status(200).json({ message: "Saved" });
  return res;
};

const del = async (req: NextApiRequest, res: NextApiResponse) => {
  deleteScenario(String(req.body));
  res.status(200).json({ message: "Deleted" });
  return res;
};
