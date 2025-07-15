"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, X, Minus, Plus, Trash2 } from "lucide-react"
import Image from "next/image"

interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
  size?: string
  color?: string
}

interface DraggableCartProps {
  items: CartItem[]
  onUpdateQuantity: (id: number, quantity: number) => void
  onRemoveItem: (id: number) => void
  onClose: () => void
}

export function DraggableCart({ items, onUpdateQuantity, onRemoveItem, onClose }: DraggableCartProps) {
  const [position, setPosition] = useState({ x: 20, y: 100 })
  const [isDragging, setIsDragging] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const dragRef = useRef<HTMLDivElement>(null)
  const dragStart = useRef({ x: 0, y: 0 })

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isExpanded) {
      setIsDragging(true)
      dragStart.current = {
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      }
    }
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const newX = Math.max(0, Math.min(window.innerWidth - 200, e.clientX - dragStart.current.x))
      const newY = Math.max(0, Math.min(window.innerHeight - 100, e.clientY - dragStart.current.y))
      setPosition({ x: newX, y: newY })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      return () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
      }
    }
  }, [isDragging])

  if (totalItems === 0) return null

  return (
    <div
      ref={dragRef}
      className="fixed z-50 transition-all duration-300"
      style={{
        left: position.x,
        top: position.y,
        cursor: isDragging ? "grabbing" : "grab",
      }}
    >
      {!isExpanded ? (
        // Collapsed Cart Button
        <Button
          className="rounded-full w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-xl relative"
          onMouseDown={handleMouseDown}
          onClick={() => setIsExpanded(true)}
        >
          <ShoppingCart className="w-6 h-6 text-white" />
          <Badge className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0 flex items-center justify-center text-xs bg-red-500">
            {totalItems}
          </Badge>
        </Button>
      ) : (
        // Expanded Cart
        <Card className="w-80 max-h-96 overflow-hidden shadow-2xl bg-white border-0">
          <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">Carrito ({totalItems})</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(false)}
                className="text-white hover:bg-white/20"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0 max-h-64 overflow-y-auto">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-3 p-3 border-b">
                <div className="w-12 h-12 relative rounded-md overflow-hidden">
                  <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm truncate">{item.name}</h4>
                  <p className="text-xs text-gray-500">L {item.price.toFixed(2)}</p>
                  {item.size && <p className="text-xs text-gray-400">Talla: {item.size}</p>}
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-6 h-6 p-0 bg-transparent"
                    onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                  <span className="w-6 text-center text-sm">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-6 h-6 p-0 bg-transparent"
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-6 h-6 p-0 text-red-500 hover:text-red-700"
                    onClick={() => onRemoveItem(item.id)}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
          <div className="p-4 bg-gray-50 border-t">
            <div className="flex justify-between items-center mb-3">
              <span className="font-semibold">Total:</span>
              <span className="font-bold text-lg text-purple-600">L {totalPrice.toFixed(2)}</span>
            </div>
            <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
              Proceder al Pago
            </Button>
          </div>
        </Card>
      )}
    </div>
  )
}
