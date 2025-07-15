"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Heart, ShoppingCart, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DraggableCart } from "@/components/draggable-cart"

const products = [
  {
    id: 1,
    name: "Camiseta Premium Algodón",
    price: 2250.0,
    offer: true,
    image: "/products/camisa.jpg",
    description: "Camiseta 100% algodón orgánico, suave y duradera.",
    colors: ["Negro", "Blanco", "Gris"],
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: 2,
    name: "Blazer",
    price: 6250.0,
    offer: false,
    image: "/products/camisa.jpg",
    description: "Blazer de corte impecable para cualquier ocasión.",
    colors: ["Negro", "Beige", "Azul Marino"],
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
    setSelectedSize(currentProduct.sizes[2])
  }, [currentProductIndex])

  const nextProduct = () => {
    setCurrentProductIndex((prev) => (prev + 1) % products.length)
  }

  const prevProduct = () => {
    setCurrentProductIndex((prev) => (prev - 1 + products.length) % products.length)
  }

  const addToCart = () => {
    const exists = cartItems.find(
      (item) =>
        item.id === currentProduct.id &&
        item.color === selectedColor &&
        item.size === selectedSize
    )
    if (exists) {
      setCartItems(
        cartItems.map((item) =>
          item.id === currentProduct.id &&
          item.color === selectedColor &&
          item.size === selectedSize
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
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

  const toggleFavorite = () => {
    setFavorites((prev) =>
      prev.includes(currentProduct.id)
        ? prev.filter((id) => id !== currentProduct.id)
        : [...prev, currentProduct.id]
    )
  }

  // Swipe touch logic
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.touches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const dist = touchStart - touchEnd
    if (dist > 50) nextProduct()
    if (dist < -50) prevProduct()
  }

  return (
    <div className="relative min-h-screen bg-white text-gray-900">
      {/* Back button */}
      <div className="absolute top-4 left-4 z-20">
        <Link href="/">
          <Button variant="ghost" size="icon" className="bg-white shadow-sm rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
      </div>

      {/* Image full screen */}
      <div
        className="h-[60vh] relative"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <Image
          src={currentProduct.image}
          alt={currentProduct.name}
          fill
          className="object-contain p-16"
        />

        {/* Oferta Badge */}
        {currentProduct.offer && (
          <div className="absolute top-4 right-4 bg-rose-600 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1 shadow-sm">
            <Tag className="w-4 h-4" />
            Oferta
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-start">
          <h1 className="text-2xl font-semibold">{currentProduct.name}</h1>
          <span className="text-xl font-medium">L {currentProduct.price.toFixed(2)}</span>
        </div>

        <p className="text-sm text-gray-500">{currentProduct.description}</p>

        {/* Color select */}
        <div>
          <h2 className="text-sm font-medium mb-1">Color</h2>
          <div className="flex gap-2">
            {currentProduct.colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`px-3 py-1 text-xs rounded-full border ${
                  selectedColor === color
                    ? "bg-black text-white"
                    : "border-gray-300 text-gray-700"
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        {/* Size select */}
        <div>
          <h2 className="text-3x-1 font-bg mb-1">Talla</h2>
          <div className="flex gap-2">
            {currentProduct.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-9 h-9 text-sm rounded-full border ${
                  selectedSize === size
                    ? "bg-black text-white"
                    : "border-gray-300 text-gray-700"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Add to cart */}
        <Button
          onClick={addToCart}
          className="w-full py-3 text-base bg-black hover:bg-gray-900 text-white rounded-lg"
        >
          Añadir al carrito
        </Button>
      </div>

      {/* Floating buttons */}
      <div className="fixed bottom-4 right-4 flex flex-col gap-3 z-20">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleFavorite}
          className="bg-white border border-gray-200 shadow rounded-full w-12 h-12"
        >
          <Heart
            className={`w-6 h-6 ${
              favorites.includes(currentProduct.id)
                ? "fill-red-500 text-red-500"
                : "text-gray-700"
            }`}
          />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="bg-white border border-gray-200 shadow rounded-full w-12 h-12"
        >
          <ShoppingCart className="w-6 h-6 text-gray-700" />
        </Button>
      </div>

      <DraggableCart
        items={cartItems}
        onUpdateQuantity={() => {}}
        onRemoveItem={() => {}}
        onClose={() => {}}
      />
    </div>
  )
}
