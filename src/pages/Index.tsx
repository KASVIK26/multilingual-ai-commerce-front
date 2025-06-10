
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen page-gradient relative overflow-hidden">
      {/* Profile Avatar */}
      <div className="absolute top-5 right-5 z-10">
        <img 
          src="/lovable-uploads/4611ef25-3afc-4fab-878a-73148d92d35d.png" 
          alt="Profile" 
          className="w-11 h-11 rounded-full border-2 border-white/50 shadow-lg hover:scale-105 transition-transform cursor-pointer"
        />
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-10">
          {/* Hero Text */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-primary">
                Welcome to
              </h1>
              <h1 className="text-6xl md:text-7xl lg:text-9xl font-bold gradient-text leading-tight">
                Multilingual AI
              </h1>
            </div>
            
            <p className="text-xl md:text-2xl lg:text-3xl text-gray-700 font-medium italic max-w-3xl mx-auto leading-relaxed">
              "Technology that listens. Support that understands."
            </p>
          </div>

          {/* CTA Button */}
          <div className="pt-8">
            <Button
              onClick={() => navigate("/login")}
              className="gradient-button text-white font-medium text-lg md:text-xl px-8 py-6 rounded-2xl hover:opacity-90 transition-all duration-300 group"
            >
              <span className="mr-4">Let's Get Started</span>
              <div className="w-11 h-11 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <ArrowRight className="w-6 h-6 text-primary" />
              </div>
            </Button>
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <p className="text-sm text-gray-600 font-light">
            Powered by Multilingual AI
          </p>
        </div>
      </div>

      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default Index;
