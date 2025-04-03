"use client"

import { useState, useEffect } from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, MessageCircle, Share2, Heart } from "lucide-react"
import { motion } from "framer-motion"
import OptimizedImage from "@/components/optimized-image"
import { artworks } from "@/data/artworks"
import { ArtworkCard } from "@/components/artwork-card"
import { createWhatsAppLink } from "@/lib/utils"

export default function ArtworkDetail({ params }) {
  const [artwork, setArtwork] = useState(null)
  const [loading, setLoading] = useState(true)
  const [liked, setLiked] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)
  const [relatedWorks, setRelatedWorks] = useState([])

  useEffect(() => {
    // Buscar a obra específica
    const fetchArtwork = () => {
      const found = artworks.find((art) => art.id === Number.parseInt(params.id))

      if (found) {
        setArtwork(found)

        // Verificar se esta obra já foi curtida (armazenado no localStorage)
        const likedArtworks = JSON.parse(localStorage.getItem("likedArtworks") || "[]")
        setLiked(likedArtworks.includes(found.id))

        // Encontrar obras relacionadas (mesma categoria)
        const related = artworks.filter((art) => art.category === found.category && art.id !== found.id).slice(0, 3)
        setRelatedWorks(related)
      }
      setLoading(false)
    }

    fetchArtwork()

    // Rolar para o topo quando o ID mudar
    window.scrollTo(0, 0)
  }, [params.id])

  const handleLike = () => {
    if (!artwork) return

    const likedArtworks = JSON.parse(localStorage.getItem("likedArtworks") || "[]")

    if (liked) {
      // Remover da lista de curtidas
      const updatedLikes = likedArtworks.filter((id) => id !== artwork.id)
      localStorage.setItem("likedArtworks", JSON.stringify(updatedLikes))
    } else {
      // Adicionar à lista de curtidas
      likedArtworks.push(artwork.id)
      localStorage.setItem("likedArtworks", JSON.stringify(likedArtworks))
    }

    setLiked(!liked)
  }

  const handleShare = async () => {
    if (!artwork) return

    // Verificar se a API de compartilhamento está disponível
    if (navigator.share) {
      try {
        await navigator.share({
          title: artwork.title,
          text: `Confira esta obra de arte: ${artwork.title}`,
          url: window.location.href,
        })
      } catch (error) {
        console.error("Erro ao compartilhar:", error)
      }
    } else {
      // Fallback: copiar URL para a área de transferência
      navigator.clipboard.writeText(window.location.href)
      alert("Link copiado para a área de transferência!")
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 flex justify-center">
        <p className="dark:text-white">Carregando...</p>
      </div>
    )
  }

  if (!artwork) {
    notFound()
  }

  // Preparar imagens para exibição
  const allImages = [artwork.imagePath, ...(artwork.moreImages || [])]

  return (
    <main className="py-20">
      <div className="container mx-auto px-4">
        <Link
          href="/works"
          className="inline-flex items-center gap-2 mb-8 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
        >
          <ArrowLeft size={16} />
          Voltar para Obras
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          <div className="space-y-6">
            {/* Imagem principal */}
            <div className="relative h-[500px] rounded-lg overflow-hidden shadow-lg">
              <OptimizedImage
                src={allImages[selectedImage]}
                alt={artwork.title}
                className="object-contain bg-gray-100 dark:bg-gray-800"
              />
            </div>

            {/* Miniaturas de imagens */}
            {allImages.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2">
                {allImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0 ${
                      selectedImage === index ? "ring-2 ring-blue-500" : ""
                    }`}
                  >
                    <OptimizedImage
                      src={img}
                      alt={`${artwork.title} - Miniatura ${index + 1}`}
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <h1 className="text-3xl font-bold mb-2 dark:text-white">{artwork.title}</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {artwork.medium}, {artwork.year}
            </p>
            <p className="text-blue-600 dark:text-blue-400 font-medium text-xl mb-6">{artwork.price}</p>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-2 dark:text-white">Sobre esta obra</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">{artwork.description}</p>
              <p className="text-gray-700 dark:text-gray-300">Dimensões: {artwork.dimensions}</p>
            </div>

            <div className="flex flex-wrap gap-4 mb-8">
              <a
                href={createWhatsAppLink(artwork)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-grow sm:flex-grow-0 inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md font-medium transition-colors"
              >
                <MessageCircle size={18} />
                Comprar esta obra
              </a>

              <button
                onClick={handleLike}
                className={`inline-flex items-center justify-center gap-2 px-4 py-3 rounded-md font-medium transition-colors ${
                  liked
                    ? "bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                }`}
                aria-label={liked ? "Remover dos favoritos" : "Adicionar aos favoritos"}
              >
                <Heart size={18} fill={liked ? "currentColor" : "none"} />
              </button>

              <button
                onClick={handleShare}
                className="inline-flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-4 py-3 rounded-md font-medium transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
                aria-label="Compartilhar"
              >
                <Share2 size={18} />
              </button>
            </div>

            {/* Tags/Categorias */}
            <div className="mb-8">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Categorias</h3>
              <div className="flex flex-wrap gap-2">
                <span className="inline-block bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm">
                  {artwork.category}
                </span>
                {/* Você pode adicionar mais tags aqui se necessário */}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Obras relacionadas */}
        {relatedWorks.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-bold mb-8 dark:text-white">Obras Relacionadas</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedWorks.map((relatedArtwork) => (
                <ArtworkCard key={relatedArtwork.id} artwork={relatedArtwork} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

