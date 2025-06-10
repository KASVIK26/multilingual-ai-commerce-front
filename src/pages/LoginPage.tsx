
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff, ArrowRight } from "lucide-react";

const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate directly to dashboard for development
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen page-gradient flex items-center justify-center p-6">
      <Button
        onClick={() => navigate("/")}
        variant="ghost"
        className="absolute top-6 left-6 text-white hover:bg-white/20"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Button>

      <Card className="w-full max-w-md bg-white/20 backdrop-blur-lg border-white/30">
        <CardHeader className="text-center">
          <CardTitle 
            className="gradient-text text-4xl font-bold"
            style={{ fontFamily: 'Poppins' }}
          >
            Welcome Back
          </CardTitle>
          <CardDescription className="text-gray-700 text-lg">
            Sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="bg-white/50 border-white/50 text-gray-800 placeholder:text-gray-600"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 font-medium">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="bg-white/50 border-white/50 text-gray-800 placeholder:text-gray-600 pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 text-sm text-gray-700">
                <input type="checkbox" className="rounded" />
                <span>Remember me</span>
              </label>
              <Button variant="link" className="text-[#6750A4] hover:text-[#5A09ED] p-0">
                Forgot password?
              </Button>
            </div>

            <Button
              type="submit"
              className="w-full gradient-button text-white font-medium text-lg px-8 py-6 rounded-2xl hover:opacity-90 transition-all duration-300 group"
            >
              <span className="mr-4">Let's Get Started</span>
              <div className="w-11 h-11 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <ArrowRight className="w-6 h-6 text-primary" />
              </div>
            </Button>

            <div className="text-center">
              <span className="text-gray-700">Don't have an account? </span>
              <Button
                variant="link"
                onClick={() => navigate("/signup")}
                className="text-[#6750A4] hover:text-[#5A09ED] p-0 font-medium"
              >
                Sign up
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
