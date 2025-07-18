"use client"

import Link from "next/link"
import { Button } from "@components/ui/button"
import { Home, ArrowLeft, Search, RefreshCw } from "lucide-react"
import { useEffect, useState } from "react"

export default function Custom404Page() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-pink-400/20 to-yellow-600/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-400/10 to-blue-600/10 rounded-full blur-3xl"></div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
      <div className="absolute top-40 right-32 w-1 h-1 bg-purple-400 rounded-full animate-ping"></div>
      <div className="absolute bottom-32 left-40 w-3 h-3 bg-pink-400 rounded-full animate-bounce"></div>
      <div className="absolute bottom-20 right-20 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        {/* 404 Number with animation */}
        <div
          className={`transition-all duration-1000 ${mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          <h1 className="text-9xl md:text-[12rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 leading-none mb-4 select-none">
            404
          </h1>
        </div>

        {/* Main content */}
        <div
          className={`transition-all duration-1000 delay-300 ${mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          {/* Error icon */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
                <Search className="w-10 h-10 text-white animate-pulse" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">!</span>
              </div>
            </div>
          </div>

          {/* Title and description */}
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">¡Oops! Página no encontrada</h2>
          <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
            La página que estás buscando parece haber desaparecido en el ciberespacio.
            <br className="hidden md:block" />
            No te preocupes, te ayudamos a encontrar el camino de vuelta.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link href="/">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Home className="w-5 h-5 mr-2" />
                Volver al inicio
              </Button>
            </Link>

            <Button
              variant="outline"
              size="lg"
              onClick={() => window.history.back()}
              className="border-2 border-gray-300 hover:border-gray-400 px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Página anterior
            </Button>
          </div>

          {/* Additional help */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">¿Necesitas ayuda?</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
              <Link
                href="/contact"
                className="text-blue-600 hover:text-blue-800 transition-colors duration-200 hover:underline"
              >
                📧 Contactar soporte
              </Link>
              <Link
                href="/sitemap"
                className="text-blue-600 hover:text-blue-800 transition-colors duration-200 hover:underline"
              >
                🗺️ Mapa del sitio
              </Link>
              <Link
                href="/search"
                className="text-blue-600 hover:text-blue-800 transition-colors duration-200 hover:underline"
              >
                🔍 Buscar contenido
              </Link>
            </div>
          </div>
        </div>

        {/* Refresh suggestion */}
        <div
          className={`mt-8 transition-all duration-1000 delay-500 ${mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          <button
            onClick={() => window.location.reload()}
            className="text-gray-500 hover:text-gray-700 transition-colors duration-200 flex items-center justify-center mx-auto group"
          >
            <RefreshCw className="w-4 h-4 mr-2 group-hover:rotate-180 transition-transform duration-500" />
            <span className="text-sm">¿Problema temporal? Intenta recargar la página</span>
          </button>
        </div>
      </div>

      {/* Decorative grid */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10"></div>
    </div>
  )
}
