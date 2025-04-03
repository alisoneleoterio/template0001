"use client"

import Link from "next/link"
import { MessageCircle } from "lucide-react"
import { motion } from "framer-motion"
import OptimizedImage from "./optimized-image"
import { createWhatsAppLink } from "@/lib/utils"

interface ArtworkCardProps {
  artwork: {
    id: number
    title: string
    medium: string
    year: string
    price: string
    category: string
    imagePath: string
    description?: string
  }
}

export function ArtworkCard({ artwork }: ArtworkCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      <Link href={`/works/${artwork.id}`} className="block relative h-80 overflow-hidden">
        <OptimizedImage
          src={artwork.imagePath}
          alt={artwork.title}
          className="transition-transform duration-300 group-hover:scale-105"
        />
      </Link>
      <div className="p-4">
        <Link href={`/works/${artwork.id}`}>
          <h3 className="text-xl font-semibold hover:text-blue-600 dark:text-white dark:hover:text-blue-400 transition-colors">
            {artwork.title}
          </h3>
        </Link>
        <p className="text-gray-600 dark:text-gray-400">
          {artwork.medium}, {artwork.year}
        </p>
        <div className="flex items-center justify-between mt-3">
          <p className="text-blue-600 dark:text-blue-400 font-medium">{artwork.price}</p>
          <a
            href={createWhatsAppLink(artwork)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            <MessageCircle size={16} />
            Comprar
          </a>
        </div>
      </div>
    </motion.div>
  )
}

