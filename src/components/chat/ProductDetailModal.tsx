
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card } from '@/components/ui/card';

interface Product {
  id: string;
  title: string;
  price: string;
  image: string;
  link: string;
  is_amazon_choice: boolean;
}

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

const ProductDetailModal = ({ product, isOpen, onClose, onAddToCart }: ProductDetailModalProps) => {
  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Product Details</DialogTitle>
        </DialogHeader>
        <Card className="p-6">
          <div className="flex gap-6">
            {product.image && (
              <img 
                src={product.image} 
                alt={product.title}
                className="w-48 h-48 object-cover rounded-lg flex-shrink-0"
              />
            )}
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900 mb-4">{product.title}</h2>
              <p className="text-2xl font-bold text-green-600 mb-4">{product.price}</p>
              
              {product.is_amazon_choice && (
                <div className="mb-4">
                  <span className="inline-block bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                    Amazon's Choice
                  </span>
                </div>
              )}
              
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    onAddToCart(product);
                    onClose();
                  }}
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Add to Cart
                </button>
                <a 
                  href={product.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors inline-block text-center"
                >
                  View on Amazon
                </a>
              </div>
            </div>
          </div>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailModal;
