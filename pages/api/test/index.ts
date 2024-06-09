import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const body = JSON.parse(req.body);
    // Process a POST request
    return res.status(200).json({
      data: {
        ...body,
        message: 'post success',
      },
    });
  } else if (req.method === 'GET') {
    const query = req.query;
    // Handle any other HTTP method
    return res.status(200).json({
      data: {
        ...query,
        message: 'get success',
      },
    });
  } else if (req.method === 'PUT') {
    // Handle any other HTTP method
    return res.status(200).json({
      data: {
        message: 'put success',
      },
    });
  } else if (req.method === 'PATCH') {
    // Handle any other HTTP method
    const body = JSON.parse(req.body);
    return res.status(200).json({
      data: {
        ...body,
        message: 'patch success',
      },
    });
  }
  return res.status(405);
}
