export default function NotFound() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
        <h1 className="text-4xl font-bold mb-4">404 - Página não encontrada</h1>
        <p className="text-lg mb-6">Desculpe, a página que você está procurando não existe.</p>
        <a 
          href="/" 
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Voltar para página inicial
        </a>
      </div>
    );
  }