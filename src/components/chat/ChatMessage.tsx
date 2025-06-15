
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
    <div className="w-full inline-flex flex-col justify-center items-center gap-7 mb-7">
      <div className="self-stretch inline-flex justify-start items-center gap-5">
        <div className="w-full flex justify-start items-start gap-5">
          {message.sender === 'user' ? (
            <>
              <img className="w-11 h-11 rounded-full" src="public\index_page\image.svg" />
              <div className="flex-1 p-5 bg-white rounded-2xl shadow-[0px_3px_10px_0px_rgba(0,0,0,0.10)] outline outline-[0.50px] outline-offset-[-0.50px] outline-gray-200 flex justify-start items-center gap-2.5">
                <div className="text-black text-base font-normal font-['Poppins']">{message.content}</div>
              </div>
            </>
          ) : (
            <>
              <div className="w-11 h-11 px-3.5 py-3 bg-gradient-to-b from-violet-700 via-purple-700 to-sky-800/75 rounded-[37px] inline-flex flex-col justify-center items-center gap-2.5">
                <div className="text-center justify-center text-white text-base font-bold font-['Poppins']">ML</div>
              </div>
              <div className="flex-1 p-5 bg-gradient-to-br from-violet-700/20 via-yellow-400/20 to-green-500/20 rounded-2xl shadow-[0px_3px_10px_0px_rgba(0,0,0,0.10)] flex flex-col justify-start items-start gap-4">
                <div className="text-black text-base font-normal font-['Poppins']">{message.content}</div>
                
                {message.products && message.products.length > 0 && (
                  <div className="w-full space-y-3">
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
