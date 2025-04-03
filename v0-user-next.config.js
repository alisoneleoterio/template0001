/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["placeholder.com"], // Adicione outros domínios conforme necessário
    formats: ["image/avif", "image/webp"],
  },
  // Configurações de segurança adicionais
  poweredByHeader: false, // Remove o header X-Powered-By
  // Configurações de compressão
  compress: true,
  // Configurações de internacionalização
  i18n: {
    locales: ["pt-BR"],
    defaultLocale: "pt-BR",
  },
  // Configurações de análise de pacotes
  webpack(config, { isServer }) {
    // Você pode adicionar configurações personalizadas do webpack aqui
    return config
  },
}

module.exports = nextConfig

