// pages/api/properties/[id].ts
import type { NextApiRequest, NextApiResponse } from "next";

const properties = [
  {
    id: "1",
    title: "Modern Apartment in Accra",
    location: "Accra, Ghana",
    price: 120,
    imageUrl: "/images/property1.jpg",
    rating: 4.8,
    description: "A cozy modern apartment in the heart of Accra."
  },
  {
    id: "2",
    title: "Beachfront Villa",
    location: "Cape Coast, Ghana",
    price: 250,
    imageUrl: "/images/property2.jpg",
    rating: 4.9,
    description: "Luxury villa right on the beach."
  },
  {
    id: "3",
    title: "Cozy Cabin in the Mountains",
    location: "Aburi, Ghana",
    price: 90,
    imageUrl: "/images/property3.jpg",
    rating: 4.6,
    description: "Peaceful cabin surrounded by nature."
  }
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const property = properties.find(p => p.id === id);
  
  if (req.method === "GET") {
    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }
    return res.status(200).json(property);
  }

  res.setHeader("Allow", ["GET"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}