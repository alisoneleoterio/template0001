"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import OptimizedImage from "./optimized-image"

interface WorkProps {
  work: {
    id: number
    title: string
    medium: string
    year: string
    price: string
    category: string
    imagePath: string
  }
}

export function FeaturedWork({ work }: WorkProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
    >
      <Link href={`/works/${work.id}`} className="block relative h-64 overflow-hidden img-hover-zoom">
        <OptimizedImage src={work.imagePath} alt={work.title} className="" />
      </Link>
      <div className="p-6">
        <Link href={`/works/${work.id}`}>
          <h3 className="text-xl font-semibold mb-2 hover:text-blue-600 dark:text-white dark:hover:text-blue-400 transition-colors">
            {work.title}
          </h3>
        </Link>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {work.medium}, {work.year}
        </p>
        <p className="text-blue-600 dark:text-blue-400 font-medium">{work.price}</p>
      </div>
    </motion.div>
  )
}

