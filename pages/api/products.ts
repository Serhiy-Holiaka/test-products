import type { NextApiRequest, NextApiResponse } from 'next';
import { PRODUCTS_LIST } from "@/data/products";

type Data = {
  id: number;
  name: string;
  price: number;
  description: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const items: Data[] = PRODUCTS_LIST.map((item, i) => ({ id: i, ...item }))
  res.status(200).json({items})
}