"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Moon, Sun, Monitor } from "lucide-react"

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // Evitar hidratação incorreta
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="w-9 h-9"></div>
  }

  return (
    <div className="flex items-center space-x-1">
      <button
        onClick={() => setTheme("light")}
        className={`p-2 rounded-full ${
          theme === "light"
            ? "bg-gray-200 text-gray-900"
            : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
        }`}
        aria-label="Modo claro"
      >
        <Sun size={18} />
      </button>

      <button
        onClick={() => setTheme("system")}
        className={`p-2 rounded-full ${
          theme === "system"
            ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
        }`}
        aria-label="Modo do sistema"
      >
        <Monitor size={18} />
      </button>

      <button
        onClick={() => setTheme("dark")}
        className={`p-2 rounded-full ${
          theme === "dark"
            ? "bg-gray-700 text-gray-100"
            : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
        }`}
        aria-label="Modo escuro"
      >
        <Moon size={18} />
      </button>
    </div>
  )
}

