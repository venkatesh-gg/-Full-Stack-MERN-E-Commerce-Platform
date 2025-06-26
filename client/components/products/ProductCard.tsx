'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Star, Heart } from 'lucide-react';
import { Product } from '@/lib/types';
import { useCart } from '@/lib/context/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <div className="card group overflow-hidden interactive">
      <Link href={`/product/${product._id}`}>
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.images[0] || 'https://via.placeholder.com/300'}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
          
          {/* Actions */}
          <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200">
              <Heart className="h-4 w-4 text-gray-600" />
            </button>
          </div>
          
          {/* Stock indicator */}
          {product.stock <= 5 && product.stock > 0 && (
            <div className="absolute top-3 left-3">
              <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                Only {product.stock} left
              </span>
            </div>
          )}
          
          {product.stock === 0 && (
            <div className="absolute top-3 left-3">
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                Out of stock
              </span>
            </div>
          )}
          
          {product.featured && (
            <div className="absolute top-3 left-3">
              <span className="bg-primary-500 text-white text-xs px-2 py-1 rounded-full">
                Featured
              </span>
            </div>
          )}
        </div>
        
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-primary-600 transition-colors duration-200">
              {product.title}
            </h3>
          </div>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
          
          <div className="flex items-center mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.ratings.average)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600 ml-2">
              ({product.ratings.count})
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
            </div>
            
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="btn-primary text-sm px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 group"
            >
              <ShoppingCart className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}