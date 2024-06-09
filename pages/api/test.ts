import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    return res.status(200).json({
      data: {
        ...req.body,
        message: "post success",
      },
    });
  } else if (req.method === "GET") {
    const query = req.query;
    return res.status(200).json({
      data: {
        ...query,
        message: "get success",
      },
    });
  } else if (req.method === "PUT") {
    return res.status(200).json({
      data: {
        ...req.body,
        message: "put success",
      },
    });
  } else if (req.method === "PATCH") {
    return res.status(200).json({
      data: {
        ...req.body,
        message: "patch success",
      },
    });
  } else if (req.method === "DELETE") {
    return res.status(200).json({
      data: {
        ...req.query,
        message: "delete success",
      },
    });
  }
  return res.status(405);
}
