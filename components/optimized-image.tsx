"use client"

import Image from "next/image"
import { useState } from "react"

interface OptimizedImageProps {
  src: string
  alt: string
  className?: string
  priority?: boolean
}

export default function OptimizedImage({ src, alt, className, priority = false }: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="relative w-full h-full">
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className={`object-cover duration-700 ease-in-out ${
          isLoading ? "scale-105 blur-sm" : "scale-100 blur-0"
        } ${className || ""}`}
        loading={priority ? "eager" : "lazy"}
        priority={priority}
        onLoadingComplete={() => setIsLoading(false)}
      />
    </div>
  )
}

