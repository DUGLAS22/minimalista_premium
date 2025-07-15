"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Heart, ChevronLeft, ChevronRight, Star } from "lucide-react"
import Link from "next/link"
import { DraggableCart } from "@/components/draggable-cart"

const products = [
  {
    id: 1,
    name: "Camiseta Premium Algodón",
    price: 2250.0,
    image: "/products/camiseta_basica.jpg?",
    description:
      "Confeccionada en algodón 100% orgánico, esta camiseta premium ofrece comodidad excepcional y durabilidad.",
    colors: ["Negro", "Blanco", "Gris"],
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: 2,
    name: "Blazer",
    price: 6250.0,
    image: "/products/blazer.jpg?height=600&width=400",
    description:
      "Blazer de corte impecable diseñado para la mujer moderna. Perfecto para ocasiones formales y casuales.",
    colors: ["Negro", "Beige", "Azul Marino"],
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: 3,
    name: "Vestido Elegante",
    price: 4500.0,
    image: "/products/vestido.jpg?height=600&width=400",
    description: "Vestido de líneas limpias y silueta favorecedora. Ideal para eventos especiales y cenas elegantes.",
    colors: ["Negro", "Blanco", "Rojo"],
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: 4,
    name: "Falda",
    price: 3250.0,
    image: "/products/falda.jpg?height=600&width=400",
    description: "Falda de corte con acabados de lujo. Combina perfectamente con cualquier blusa.",
    colors: ["Negro", "Gris", "Azul Marino"],
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: 5,
    name: "Chaqueta Denim Vintage",
    price: 10000.0,
    image: "/products/chaqueta.jpg?height=600&width=400",
    description: "Abrigo de cachemira pura con diseño atemporal. Una inversión en elegancia y calidad.",
    colors: ["Camel", "Negro", "Gris"],
    sizes: ["XS", "S", "M", "L", "XL"],
  },
]

export default function MinimalistPremiumPage() {
  const [currentProductIndex, setCurrentProductIndex] = useState(0)
  const [cartItems, setCartItems] = useState<any[]>([])
  const [favorites, setFavorites] = useState<number[]>([])
  const [selectedColor, setSelectedColor] = useState("")
  const [selectedSize, setSelectedSize] = useState("")

  const currentProduct = products[currentProductIndex]

  useEffect(() => {
    setSelectedColor(currentProduct.colors[0])
    setSelectedSize(currentProduct.sizes[2]) // Default to M
  }, [currentProductIndex, currentProduct])

  const nextProduct = () => {
    setCurrentProductIndex((prev) => (prev + 1) % products.length)
  }

  const prevProduct = () => {
    setCurrentProductIndex((prev) => (prev - 1 + products.length) % products.length)
  }

  const addToCart = () => {
    const existingItem = cartItems.find(
      (item) => item.id === currentProduct.id && item.size === selectedSize && item.color === selectedColor,
    )

    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === currentProduct.id && item.size === selectedSize && item.color === selectedColor
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      )
    } else {
      setCartItems([
        ...cartItems,
        {
          id: currentProduct.id,
          name: currentProduct.name,
          price: currentProduct.price,
          image: currentProduct.image,
          quantity: 1,
          size: selectedSize,
          color: selectedColor,
        },
      ])
    }
  }

  const updateCartQuantity = (id: number, quantity: number) => {
    if (quantity === 0) {
      setCartItems(cartItems.filter((item) => item.id !== id))
    } else {
      setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity } : item)))
    }
  }

  const removeFromCart = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const toggleFavorite = () => {
    setFavorites((prev) =>
      prev.includes(currentProduct.id) ? prev.filter((id) => id !== currentProduct.id) : [...prev, currentProduct.id],
    )
  }

  // Touch/swipe handlers
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      nextProduct()
    }
    if (isRightSwipe) {
      prevProduct()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4">
        <div className="flex justify-between items-center">
          <Link href="/">
            <Button variant="ghost" size="sm" className="bg-white/80 hover:bg-white backdrop-blur-sm">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex gap-2">
            {products.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentProductIndex ? "bg-rose-500" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Product Display */}
      <div className="relative h-screen">
        {/* Product Image */}
        <div
          className=" relative w-full aspect-[3/4] overflow-hidden flex justify-center "
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <Image
            src={currentProduct.image}
            alt={currentProduct.name}
            width={600} 
            height={800}
            className="object-cover rounded-lg"
          />

          {/* Navigation Arrows */}
          <Button
            variant="ghost"
            size="sm"
            onClick={prevProduct}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white backdrop-blur-sm rounded-full w-10 h-10 p-0"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={nextProduct}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white backdrop-blur-sm rounded-full w-10 h-10 p-0"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Product Details */}
        <div className="h-2/5 p-6 flex flex-col justify-between bg-white/90 backdrop-blur-sm">
          <div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-2xl font-light mb-2 text-gray-800">{currentProduct.name}</h1>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-rose-400 text-rose-400" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">(4.9)</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-light bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                  L {currentProduct.price.toFixed(2)}
                </div>
                <Badge variant="outline" className="mt-1 border-rose-200 text-rose-700">
                  Premium
                </Badge>
              </div>
            </div>

            <p className="text-gray-600 mb-6 leading-relaxed">{currentProduct.description}</p>

            {/* Color Selection */}
            <div className="mb-4">
              <h3 className="text-sm font-medium mb-2 text-gray-800">Color</h3>
              <div className="flex gap-2">
                {currentProduct.colors.map((color) => (
                  <Button
                    key={color}
                    variant={selectedColor === color ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedColor(color)}
                    className={`text-xs ${
                      selectedColor === color
                        ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white"
                        : "hover:bg-rose-50 hover:border-rose-300"
                    }`}
                  >
                    {color}
                  </Button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2 text-gray-800">Talla</h3>
              <div className="flex gap-2">
                {currentProduct.sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedSize(size)}
                    className={`w-10 h-10 p-0 ${
                      selectedSize === size
                        ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white"
                        : "hover:bg-rose-50 hover:border-rose-300"
                    }`}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Add to Cart Button */}
          <Button
            onClick={addToCart}
            className="w-full py-3 text-lg font-light bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white shadow-lg"
          >
            Añadir al Carrito
          </Button>
        </div>
      </div>

      {/* Floating Favorites */}
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleFavorite}
        className="fixed top-20 right-4 bg-white/80 hover:bg-white backdrop-blur-sm rounded-full w-12 h-12 p-0 shadow-lg"
      >
        <Heart
          className={`w-6 h-6 ${favorites.includes(currentProduct.id) ? "fill-red-500 text-red-500" : "text-gray-600"}`}
        />
      </Button>

      <DraggableCart
        items={cartItems}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeFromCart}
        onClose={() => {}}
      />
    </div>
  )
}
