
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const LoginPage = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signIn(formData.email, formData.password);
      toast({
        title: "Welcome Back!",
        description: "You have successfully signed in.",
      });
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Sign in error:", error);
      let errorMessage = "Something went wrong. Please try again.";
      
      if (error.message.includes("Invalid login credentials")) {
        errorMessage = "Invalid email or password. Please check your credentials.";
      } else if (error.message.includes("Email not confirmed")) {
        errorMessage = "Please check your email and confirm your account before signing in.";
      }
      
      toast({
        title: "Sign In Failed",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen page-gradient flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
      </div>

      <Button
        onClick={() => navigate("/")}
        variant="ghost"
        className="absolute top-6 left-6 text-white hover:bg-white/20 z-10"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Button>

      <Card className="w-full max-w-md bg-white/10 backdrop-blur-lg border-white/30 relative z-10">
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
                disabled={isLoading}
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
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 text-sm text-gray-700">
                <input type="checkbox" className="rounded" disabled={isLoading} />
                <span>Remember me</span>
              </label>
              <Button variant="link" className="text-[#6750A4] hover:text-[#5A09ED] p-0" disabled={isLoading}>
                Forgot password?
              </Button>
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                className="w-full h-[70px] mx-auto p-5 bg-[rgba(85.29,68.65,179.60,0.86)] rounded-[15px] text-white text-xl font-medium font-['Poppins'] hover:opacity-90 transition-opacity"
                disabled={isLoading}
              >
                {isLoading ? "Signing In..." : "Let's Get Started"}
              </Button>
            </div>

            <div className="text-center">
              <span className="text-gray-700">Don't have an account? </span>
              <Button
                variant="link"
                onClick={() => navigate("/signup")}
                className="text-[#6750A4] hover:text-[#5A09ED] p-0 font-medium"
                disabled={isLoading}
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
