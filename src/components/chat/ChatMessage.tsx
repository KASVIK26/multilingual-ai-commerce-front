
import React from 'react';
import { Card } from '@/components/ui/card';

interface Product {
  id: string;
  title: string;
  price: string;
  image: string;
  link: string;
  is_amazon_choice: boolean;
}

interface ChatMessageProps {
  message: {
    id: string;
    content: string;
    sender: 'user' | 'ai';
    timestamp: Date;
    products?: Product[];
  };
  onAddToCart: (product: Product) => void;
  onProductClick: (product: Product) => void;
}

const ChatMessage = ({ message, onAddToCart, onProductClick }: ChatMessageProps) => {
  return (
    <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[80%] ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'} rounded-lg p-4`}>
        <p className="text-sm font-medium mb-2">{message.sender === 'user' ? 'You' : 'AI Assistant'}</p>
        <p className="mb-3">{message.content}</p>
        
        {message.products && message.products.length > 0 && (
          <div className="space-y-3">
            <p className="text-sm font-semibold text-gray-600">Found Products:</p>
            <div className="grid gap-3">
              {message.products.map((product) => (
                <Card key={product.id} className="p-3 hover:shadow-md transition-shadow cursor-pointer bg-white">
                  <div className="flex gap-3">
                    {product.image && (
                      <img 
                        src={product.image} 
                        alt={product.title}
                        className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <h4 
                        className="font-medium text-sm text-gray-900 line-clamp-2 cursor-pointer hover:text-blue-600"
                        onClick={() => onProductClick(product)}
                      >
                        {product.title}
                      </h4>
                      <p className="text-lg font-bold text-green-600 mt-1">{product.price}</p>
                      {product.is_amazon_choice && (
                        <span className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full mt-1">
                          Amazon's Choice
                        </span>
                      )}
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => onAddToCart(product)}
                          className="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600 transition-colors"
                        >
                          Add to Cart
                        </button>
                        <a 
                          href={product.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-gray-500 text-white px-3 py-1 rounded text-xs hover:bg-gray-600 transition-colors"
                        >
                          View on Amazon
                        </a>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
