// pages/property/[id].tsx
"use client"

import { useRouter } from "next/router"
import axios from "axios"
import { useState, useEffect } from "react"

interface Property {
  id: string
  title: string
  location: string
  price: number
  imageUrl: string
  rating: number
  description: string
}

interface Review {
  id: string
  comment: string
  author: string
  rating: number
}

const PropertyDetailPage = () => {
  const router = useRouter()
  const { id } = router.query

  const [property, setProperty] = useState<Property | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return

      try {
        // Fetch property details
        const propResponse = await axios.get(`/api/properties/${id}`)
        setProperty(propResponse.data)

        // Fetch property reviews
        const revResponse = await axios.get(`/api/properties/${id}/reviews`)
        setReviews(revResponse.data)
      } catch (error) {
        console.error("Error fetching property or reviews:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  if (loading) {
    return <p className="text-center py-10">Loading...</p>
  }

  if (!property) {
    return <p className="text-center py-10">Property not found</p>
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <img
        src={property.imageUrl}
        alt={property.title}
        className="w-full h-96 object-cover rounded-xl shadow-md"
      />
      <h1 className="text-3xl font-bold mt-6">{property.title}</h1>
      <p className="text-gray-600">{property.location}</p>
      <p className="text-lg font-semibold mt-2">${property.price} / night</p>
      <p className="text-yellow-500 mt-1">⭐ {property.rating}</p>
      <p className="mt-4 text-gray-700">{property.description}</p>

      {/* Reviews Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          <ul className="space-y-4">
            {reviews.map((review) => (
              <li key={review.id} className="border p-4 rounded-lg shadow-sm">
                <p className="font-semibold">{review.author}</p>
                <p className="text-yellow-500">⭐ {review.rating}</p>
                <p className="mt-1">{review.comment}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default PropertyDetailPage