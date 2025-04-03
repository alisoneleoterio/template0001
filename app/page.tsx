import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { Metadata } from "next"
import OptimizedImage from "@/components/optimized-image"
import { FeaturedWork } from "@/components/featured-work"
import Image from "next/image"

// Metadados da página para SEO
export const metadata: Metadata = {
  title: "Início | Portfólio Artístico",
  description: "Portfólio de obras de arte originais incluindo pinturas, arte digital e técnicas mistas.",
  keywords: "arte, pintura, artista, galeria, obras de arte, comprar arte",
}

export default function Home() {
  // Dados de obras em destaque - SUBSTITUIR com suas obras reais
  const featuredWorks = [
    {
      id: 1,
      title: "Jesus de Nazaré",
      medium: "Arte Digital",
      year: "2023",
      price: "R$170",
      category: "Digital",
      imagePath: "/placeholder.svg?height=500&width=500&text=Artwork 1",
    },
    {
      id: 2,
      title: "Paisagem Urbana",
      medium: "Acrílica sobre Tela",
      year: "2022",
      price: "R$650",
      category: "Pintura",
      imagePath: "/placeholder.svg?height=500&width=500&text=Artwork 2",
    },
    {
      id: 3,
      title: "Estudo de Retrato",
      medium: "Óleo sobre Tela",
      year: "2023",
      price: "R$800",
      category: "Pintura",
      imagePath: "/placeholder.svg?height=500&width=500&text=Artwork 3",
    },
  ]

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <OptimizedImage
            src="/background-home.png"
            alt="Imagem de fundo do portfólio"
            priority={true}
            className="brightness-50"
          />
          {/* SUBSTITUIR: Adicione sua própria imagem de fundo aqui */}
        </div>
        <div className="container mx-auto px-4 z-10 text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {/* SUBSTITUIR: Adicione seu nome ou título do portfólio aqui */}
            Alison Eleotério
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mb-8">
            {/* SUBSTITUIR: Adicione sua descrição pessoal aqui */}
            Criando obras de arte únicas e significativas para clientes e exposições.
          </p>
          <Link
            href="/works"
            className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-md font-medium hover:bg-opacity-90 transition-all"
          >
            Ver Meus Trabalhos <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <div className="relative w-full aspect-square max-w-md mx-auto">
                <br /><br />
                <Image
                  src="/profile.png"
                  alt="Artist portrait"
                  width={500}
                  height={500}
                  className="rounded-lg shadow-lg"
                />
                {/* SUBSTITUIR: Adicione sua foto de perfil aqui */}
              </div>
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6 dark:text-white">Sobre Mim</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {/* SUBSTITUIR: Adicione sua biografia aqui */}
                Bem-vindo ao meu portfólio! Sou um artista de Jacareí/SP com mais de 4 anos de experiência criando peças
                únicas que contam histórias e evocam emoções.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {/* SUBSTITUIR: Adicione mais detalhes sobre seu trabalho aqui */}
                Meu trabalho abrange múltiplas disciplinas, incluindo arte tradicional preto e cinza/colorida em diversos estilos e muralismo.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                {/* SUBSTITUIR: Adicione informações sobre sua experiência aqui */}
                 Cada projeto é uma oportunidade de criar algo significativo e impactante.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300 transition-all"
              >
                Entre em contato <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Works */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 dark:text-white">Trabalhos em Destaque</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Uma seleção dos meus projetos recentes e peças favoritas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredWorks.map((work) => (
              <FeaturedWork key={work.id} work={work} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/works"
              className="inline-flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-md font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-all"
            >
              Ver Todos os Trabalhos <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

