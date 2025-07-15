import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Grid, Scroll, Sparkles } from "lucide-react"

export default function HomePage() {
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
      style={{ fontFamily: "Inter, system-ui, -apple-system, sans-serif" }}
    >
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-indigo-200 bg-clip-text text-transparent mb-6">
            Fashion Store
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Descubre tu estilo perfecto con nuestros diseños únicos y modernos
          </p>
        </div>

        <div className="flex justify-center gap-8">
          <Card className="group hover:scale-105 transition-all duration-500 border-0 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm shadow-2xl hover:shadow-violet-500/25">
            <CardHeader className="text-center pb-6">
              <div className="w-24 h-22 mx-auto mb-6 bg-gradient-to-r from-violet-500 to-purple-500 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-500 shadow-lg">
                <Sparkles className="w-12 h-12 text-white" />
              </div>
              <CardTitle className="text-3xl text-white font-bold mb-4">Minimalista Premium</CardTitle>
              <CardDescription className="text-slate-300 text-lg leading-relaxed tracking-wide">
                Enfoque premium con producto destacado, swipe fluido y elementos flotantes
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="text-slate-100 mb-10 text-base space-y-4">
                <li className="flex items-center">
                  <div className=" text-2x1 w-2 h-2 bg-violet-400 rounded-full mr-3"></div>
                  Imagen destacada premium
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-violet-400 rounded-full mr-3"></div>
                  Swipe entre productos
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-violet-400 rounded-full mr-3"></div>
                  Elementos flotantes elegantes
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-violet-400 rounded-full mr-3"></div>
                  Diseño de marca premium
                </li>
              </ul>
              <Link href="/minimalist-premium">
                <Button className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-lg hover:shadow-violet-500/25 transition-all duration-300 py-3 text-lg font-medium">
                  Explorar Diseño
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
