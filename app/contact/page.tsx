"use client"

import { useState, useEffect, useRef } from "react"
import { Send, CheckCircle, AlertCircle } from "lucide-react"
import emailjs from "@emailjs/browser"
import ReCAPTCHA from "react-google-recaptcha"
import DOMPurify from "dompurify"
import { motion } from "framer-motion"
import { logger } from "@/lib/logger"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [recaptchaToken, setRecaptchaToken] = useState(null)
  const recaptchaRef = useRef(null)

  // Inicializar EmailJS

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target
    // Sanitização básica de entrada
    const sanitizedValue: string = DOMPurify.sanitize(value)
    setFormData((prev: typeof formData) => ({ ...prev, [name]: sanitizedValue }))
  }

  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token)
  }

  // Limitação de taxa para envios de formulário
  const [lastSubmissionTime, setLastSubmissionTime] = useState(0)

  interface FormData {
    name: string
    email: string
    subject: string
    message: string
  }

  interface RecaptchaRef {
    current: {
      reset: () => void
    } | null
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Verificar limitação de taxa (mínimo de 10 segundos entre envios)
    const now = Date.now()
    if (now - lastSubmissionTime < 10000) {
      setError("Por favor, aguarde um momento antes de enviar novamente.")
      return
    }

    // Validar reCAPTCHA
    if (!recaptchaToken) {
      setError("Por favor, complete a verificação do reCAPTCHA.")
      return
    }

    setIsSubmitting(true)
    setError("")

    try {
      // Enviar email usando EmailJS
      await emailjs.send(
        "service_d863e5b",
        "template_b78cc8u",
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject || "Mensagem do Portfólio",
          message: formData.message,
        },
        "u5vMmHUu8UIKRhuLZ" // Passe a chave pública aqui
      )

      logger.info("Formulário de contato enviado com sucesso", { email: formData.email })

      // Atualizar o tempo do último envio para limitação de taxa
      setLastSubmissionTime(now)

      // Resetar formulário
      setFormData({ name: "", email: "", subject: "", message: "" })
      setIsSubmitted(true)
      setRecaptchaToken(null)

      // Resetar reCAPTCHA
      if (recaptchaRef.current) {
        recaptchaRef.current.reset()
      }

      // Resetar mensagem de sucesso após 5 segundos
      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    } catch (err) {
      logger.error("Erro ao enviar formulário de contato", err)
      setError("Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.")
      console.error("Erro ao enviar formulário:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold mb-4 dark:text-white">Entre em Contato</h1>
            <p className="text-gray-600 dark:text-gray-300">
              Tem alguma pergunta ou interesse em encomendar uma obra? Envie-me uma mensagem e responderei o mais breve
              possível.
            </p>
          </motion.div>

          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg p-6 flex items-center gap-4"
            >
              <CheckCircle className="text-green-500 dark:text-green-400" size={24} />
              <p className="text-green-800 dark:text-green-300">
                Obrigado pela sua mensagem! Entrarei em contato em breve.
              </p>
            </motion.div>
          ) : (
            <motion.form
              onSubmit={handleSubmit}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {error && (
                <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6 flex items-start gap-3">
                  <AlertCircle className="text-red-500 dark:text-red-400 flex-shrink-0 mt-0.5" size={18} />
                  <p className="text-red-800 dark:text-red-300">{error}</p>
                </div>
              )}

              <div className="mb-6">
                <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  maxLength={100}
                  pattern="[A-Za-zÀ-ÿ\s]+"
                  title="O nome deve conter apenas letras, números e espaços"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Seu nome"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  maxLength={100}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="seu.email@exemplo.com"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="subject" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                  Assunto (opcional)
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  maxLength={200}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Assunto da mensagem"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                  Mensagem
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  maxLength={1000}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Sua mensagem aqui..."
                ></textarea>
              </div>

              <div className="mb-6">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={"6LdztwcrAAAAAH6VUKaM82U1X4q6cY75CS0fXmY1"}
                  onChange={handleRecaptchaChange}
                  theme="light"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !recaptchaToken}
                className={`w-full flex justify-center items-center gap-2 px-6 py-3 rounded-md font-medium text-white ${
                  isSubmitting || !recaptchaToken
                    ? "bg-blue-400 dark:bg-blue-600/50 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                } transition-colors`}
              >
                {isSubmitting ? (
                  "Enviando..."
                ) : (
                  <>
                    Enviar Mensagem <Send size={18} />
                  </>
                )}
              </button>
            </motion.form>
          )}

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-semibold mb-4 dark:text-white">Informações de Contato</h3>
              {/* SUBSTITUIR: Adicione suas informações de contato reais aqui */}
              <p className="text-gray-700 dark:text-gray-300 mb-2">Localização: Jacareí, São Paulo</p>
              <p className="text-gray-700 dark:text-gray-300">Disponível para encomendas e exposições.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-semibold mb-4 dark:text-white">Siga-me</h3>
              <div className="flex gap-4">
                {/* SUBSTITUIR: Adicione seus links de redes sociais reais aqui */}
                <a
                  href="https://www.instagram.com/eoallitrem/"
                  target="_blank"
                  className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <span className="sr-only">Instagram</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-700 dark:text-gray-300"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a
                  href="#"
                  className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <span className="sr-only">Twitter</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-700 dark:text-gray-300"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  )
}

