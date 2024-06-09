import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const query = req.query;
    // Handle any other HTTP method
    return res.status(200).json({
      data: {
        ...query,
        message: 'get success',
      },
    });
  } else if (req.method === 'DELETE') {
    // Handle any other HTTP method
    const id = req.query;
    return res.status(200).json({
      data: {
        ...id,
        message: 'delete success',
      },
    });
  }
  return res.status(405);
}
