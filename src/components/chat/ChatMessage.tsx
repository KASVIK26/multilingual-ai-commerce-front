import React from 'react';
import { Card } from '@/components/ui/card';
import UserAvatar from '@/components/ui/UserAvatar';

interface Product {
  id: string;
  title: string;
  description?: string;
  specs?: string[];
  price: string;
  image: string;
  link: string;
  is_amazon_choice: boolean;
  rating?: string;
  review_count?: string;
}

interface ChatMessageProps {
  message: {
    id: string;
    content: string;
    sender: 'user' | 'ai';
    timestamp: Date;
    products?: Product[];
    extracted_features?: any; // Add this line
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
              <UserAvatar size="md" />
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
                
                {/* Display extracted features */}
                {message.extracted_features && (
                  <div className="w-full p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm font-semibold text-blue-800 mb-2">🤖 AI Analysis:</p>
                    <div className="flex flex-wrap gap-2">
                      {message.extracted_features.category && (
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                          Category: {message.extracted_features.category}
                        </span>
                      )}
                      {message.extracted_features.brand && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          Brand: {message.extracted_features.brand}
                        </span>
                      )}
                      {message.extracted_features.product_type && (
                        <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                          Type: {message.extracted_features.product_type}
                        </span>
                      )}
                      {message.extracted_features.max_price && (
                        <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                          Max Price: ₹{message.extracted_features.max_price}
                        </span>
                      )}
                      {message.extracted_features.min_price && (
                        <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                          Min Price: ₹{message.extracted_features.min_price}
                        </span>
                      )}
                    </div>
                  </div>
                )}
                
                {message.products && message.products.length > 0 && (
                  <div className="w-full space-y-4">
                    <p className="text-sm font-semibold text-gray-600">Found Products:</p>
                    <div className="grid gap-4">
                      {message.products.map((product) => (
                        <Card key={product.id} className="p-4 hover:shadow-lg transition-all duration-300 cursor-pointer bg-white border border-gray-200">
                          <div className="flex gap-4">
                            {product.image && (
                              <div className="flex-shrink-0">
                                <img 
                                  src={product.image} 
                                  alt={product.title}
                                  className="w-24 h-24 object-cover rounded-lg shadow-sm"
                                  onError={(e) => {
                                    e.currentTarget.src = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop';
                                  }}
                                />
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <h4 
                                className="font-semibold text-base text-gray-900 line-clamp-2 cursor-pointer hover:text-blue-600 transition-colors mb-2"
                                onClick={() => onProductClick(product)}
                              >
                                {product.title}
                              </h4>
                              
                              {product.description && (
                                <p className="text-sm text-gray-600 line-clamp-2 mb-2">{product.description}</p>
                              )}
                              
                              {product.specs && product.specs.length > 0 && (
                                <div className="mb-3">
                                  <div className="flex flex-wrap gap-1">
                                    {product.specs.slice(0, 3).map((spec, index) => (
                                      <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                                        {spec}
                                      </span>
                                    ))}
                                    {product.specs.length > 3 && (
                                      <span className="text-xs text-gray-500">+{product.specs.length - 3} more</span>
                                    )}
                                  </div>
                                </div>
                              )}
                              
                              <div className="flex items-center gap-3 mb-3">
                                <p className="text-xl font-bold text-green-600">{product.price}</p>
                                {product.rating && (
                                  <div className="flex items-center gap-1">
                                    <span className="text-yellow-400">★</span>
                                    <span className="text-sm font-medium">{product.rating}</span>
                                    {product.review_count && (
                                      <span className="text-xs text-gray-500">({product.review_count})</span>
                                    )}
                                  </div>
                                )}
                                {product.is_amazon_choice && (
                                  <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full font-medium">
                                    Amazon's Choice
                                  </span>
                                )}
                              </div>
                              
                              <div className="flex gap-2">
                                <button
                                  onClick={() => onAddToCart(product)}
                                  className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 transition-colors font-medium"
                                >
                                  Add to Cart
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    window.open(product.link, '_blank', 'noopener,noreferrer');
                                  }}
                                  className="bg-gray-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-600 transition-colors font-medium"
                                >
                                  View on Amazon
                                </button>
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
