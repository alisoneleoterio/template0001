"use client"

import { useState, useEffect } from "react"
import { Filter } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useSearchParams, useRouter } from "next/navigation"
import { artworks } from "@/data/artworks"
import { ArtworkCard } from "@/components/artwork-card"

export default function Works() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const initialCategory = searchParams.get("category") || "Todos"

  // Estado para rastrear o filtro atual
  const [activeFilter, setActiveFilter] = useState(initialCategory)
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false)

  // Atualizar a URL quando o filtro mudar
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    if (activeFilter === "Todos") {
      params.delete("category")
    } else {
      params.set("category", activeFilter)
    }

    router.push(`/works?${params.toString()}`)
  }, [activeFilter, router, searchParams])

  // Filtrar obras com base no filtro ativo
  const filteredArtworks =
    activeFilter === "Todos" ? artworks : artworks.filter((artwork) => artwork.category === activeFilter)

  // Extrair categorias únicas das obras
  const categories = ["Todos", ...Array.from(new Set(artworks.map((art) => art.category)))]

  return (
    <main className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 dark:text-white">Minhas Obras</h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore meu portfólio de obras de arte abrangendo várias técnicas e estilos
          </p>
        </div>

        {/* Filtro Mobile */}
        <div className="md:hidden mb-6">
          <button
            onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
            className="w-full flex items-center justify-between px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm"
          >
            <span className="text-gray-700 dark:text-gray-300">Filtrar por: {activeFilter}</span>
            <Filter size={18} className="text-gray-500 dark:text-gray-400" />
          </button>

          {isFilterMenuOpen && (
            <div className="mt-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-md overflow-hidden">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setActiveFilter(category)
                    setIsFilterMenuOpen(false)
                  }}
                  className={`w-full text-left px-4 py-2 ${
                    activeFilter === category
                      ? "bg-gray-100 dark:bg-gray-700 font-medium"
                      : "hover:bg-gray-50 dark:hover:bg-gray-700"
                  } transition-colors`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Filtro Desktop */}
        <div className="hidden md:flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-4 py-2 rounded-md transition-colors ${
                activeFilter === category
                  ? "bg-black dark:bg-white text-white dark:text-black"
                  : "bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grade de Obras com Animação */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredArtworks.length > 0 ? (
              filteredArtworks.map((artwork) => <ArtworkCard key={artwork.id} artwork={artwork} />)
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 dark:text-gray-400 text-lg">Nenhuma obra encontrada nesta categoria.</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Exibir contagem de resultados filtrados */}
        <div className="mt-8 text-center text-gray-600 dark:text-gray-400">
          Mostrando {filteredArtworks.length} de {artworks.length} obras
        </div>
      </div>
    </main>
  )
}

