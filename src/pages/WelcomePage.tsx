
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { LogOut, MessageCircle, Globe, Zap } from "lucide-react";

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add logout logic here when Supabase is integrated
    navigate("/");
  };

  return (
    <div className="min-h-screen page-gradient relative overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-10">
        <div className="flex items-center space-x-4">
          <img 
            src="/lovable-uploads/4611ef25-3afc-4fab-878a-73148d92d35d.png" 
            alt="Profile" 
            className="w-11 h-11 rounded-full border-2 border-white/50 shadow-lg"
          />
          <h2 className="text-xl font-semibold text-white">Welcome back!</h2>
        </div>
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="text-white hover:bg-white/20"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center pt-20">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Hero Section */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold gradient-text leading-tight">
              Multilingual AI
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 font-medium max-w-3xl mx-auto">
              Your intelligent assistant for seamless multilingual communication and e-commerce support
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="glass-card p-6 rounded-2xl text-center space-y-4 hover:scale-105 transition-transform">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Smart Chat</h3>
              <p className="text-gray-600">AI-powered conversations that understand context and intent</p>
            </div>

            <div className="glass-card p-6 rounded-2xl text-center space-y-4 hover:scale-105 transition-transform">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Global Reach</h3>
              <p className="text-gray-600">Support for 100+ languages with real-time translation</p>
            </div>

            <div className="glass-card p-6 rounded-2xl text-center space-y-4 hover:scale-105 transition-transform">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Lightning Fast</h3>
              <p className="text-gray-600">Instant responses powered by cutting-edge AI technology</p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="space-y-6">
            <Button
              className="gradient-button text-white font-medium text-lg px-8 py-6 rounded-2xl hover:opacity-90 transition-all duration-300"
            >
              Start Your First Conversation
            </Button>
            <p className="text-sm text-gray-600">
              Experience the future of multilingual customer support
            </p>
          </div>
        </div>
      </div>

      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-400/5 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default WelcomePage;
