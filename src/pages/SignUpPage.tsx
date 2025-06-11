
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const SignUpPage = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords don't match. Please try again.",
        variant: "destructive"
      });
      return;
    }

    if (formData.password.length < 6) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 6 characters long.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      await signUp(formData.email, formData.password, formData.fullName);
      toast({
        title: "Check Your Email",
        description: "We've sent you a confirmation link. Please check your email to verify your account.",
      });
      // Don't navigate immediately, let user verify email first
    } catch (error: any) {
      console.error("Sign up error:", error);
      toast({
        title: "Sign Up Failed",
        description: error.message || "Something went wrong. Please try again.",
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
          <CardTitle className="gradient-text text-4xl font-bold">
            Join Us
          </CardTitle>
          <CardDescription className="text-gray-700 text-lg">
            Create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignUp} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-gray-700 font-medium">
                Full Name
              </Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                className="bg-white/50 border-white/50 text-gray-800 placeholder:text-gray-600"
                required
                disabled={isLoading}
              />
            </div>

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
                  placeholder="Create a password"
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

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-700 font-medium">
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  className="bg-white/50 border-white/50 text-gray-800 placeholder:text-gray-600 pr-10"
                  required
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={isLoading}
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input type="checkbox" className="rounded" required disabled={isLoading} />
              <label className="text-sm text-gray-700">
                I agree to the <span className="text-[#6750A4] font-medium">Terms & Conditions</span>
              </label>
            </div>

            <Button
              type="submit"
              className="w-full gradient-button text-white font-medium text-lg hover:opacity-90 transition-all duration-300"
              style={{
                height: '50px',
                borderRadius: '15px'
              }}
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>

            <div className="text-center">
              <span className="text-gray-700">Already have an account? </span>
              <Button
                variant="link"
                onClick={() => navigate("/login")}
                className="text-[#6750A4] hover:text-[#5A09ED] p-0 font-medium"
                disabled={isLoading}
              >
                Sign in
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpPage;
