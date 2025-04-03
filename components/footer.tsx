import Link from "next/link"
import { Instagram, Twitter, Linkedin, Mail, MapPin } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              {/* SUBSTITUIR: Adicione o nome real do seu site/marca aqui */}
              Alison Eleotério
            </h3>
            <p className="text-gray-400 mb-4">
              {/* SUBSTITUIR: Adicione uma descrição real do seu trabalho aqui */}
              Criando obras de arte únicas e significativas para clientes e exposições em todo o mundo.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                  Início
                </Link>
              </li>
              <li>
                <Link
                  href="/works"
                  className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                  Obras
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Indicações</h3>
            {/* SUBSTITUIR: Adicione suas informações de contato reais aqui */}
            <div className="flex items-start gap-2 mb-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">Artista 1</a>
            </div>
            <div className="flex items-start gap-2 mb-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">Artista 2</a>
            </div>
            <div className="flex items-start gap-2 mb-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">Artista 3</a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 mb-4 md:mb-0">
            © {currentYear} Portfólio Artístico. Todos os direitos reservados.
            {/* SUBSTITUIR: Adicione o nome real do seu site/marca aqui */}
          </p>

          <div className="flex space-x-4">
            {/* SUBSTITUIR: Adicione seus links de redes sociais reais aqui */}
            <a href="https://www.instagram.com/eoallitrem/" target="_blank" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
              <Instagram size={20} />
            </a>
            <a href="#" target="_blank" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
              <Twitter size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

