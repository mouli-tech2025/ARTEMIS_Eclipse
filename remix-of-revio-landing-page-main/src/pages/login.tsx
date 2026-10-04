import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .min(1, "Please enter your email")
        .email("Please enter a valid email address")
        .max(255, "Email is too long"),
    password: z
        .string()
        .min(1, "Please enter your password")
        .max(72, "Password must be 72 characters or less"),
});

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { signIn, signInWithGoogle } = useAuth();

    const handleGoogleSignIn = async () => {
        setIsLoading(true);
        const { error } = await signInWithGoogle();
        if (error) {
            setIsLoading(false);
            toast.error(error.message);
        }
    };
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const parsed = loginSchema.safeParse({ email, password });
        if (!parsed.success) {
            toast.error(parsed.error.issues[0].message);
            return;
        }

        setIsLoading(true);
        const { error } = await signIn(parsed.data.email, parsed.data.password);
        setIsLoading(false);

        if (error) {
            toast.error(error.message);
        } else {
            toast.success("Signed in successfully!");
            navigate("/dashboard/profile");
        }
    };


    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
            <Helmet>
                <title>Sign In | Revio</title>
            </Helmet>

            <div className="w-full max-w-[400px] space-y-8">
                <div className="text-center space-y-2">
                    <h1 className="text-4xl font-semibold tracking-tight">Sign In to Your Account</h1>
                    <p className="text-muted-foreground text-sm">
                        Let's sign in to your account and start.
                    </p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="support@onixtheme.com"
                                className="bg-black border-input h-12 rounded-xl focus:ring-primary"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={isLoading}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                className="bg-black border-input h-12 rounded-xl focus:ring-primary"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Checkbox id="remember" className="border-muted-foreground data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
                            <label
                                htmlFor="remember"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-muted-foreground"
                            >
                                Remember for 30 days
                            </label>
                        </div>
                        <Link
                            to="/forgot-password"
                            className="text-sm font-medium text-muted-foreground hover:text-white transition-colors"
                        >
                            Forgot password
                        </Link>
                    </div>

                    <Button 
                        type="submit"
                        className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-medium rounded-xl text-lg"
                        disabled={isLoading}
                    >
                        {isLoading ? "Signing in..." : "Sign in"}
                    </Button>
                </form>

                <div className="flex items-center gap-4">
                    <span className="h-px flex-1 bg-white/10" />
                    <span className="text-xs uppercase tracking-wide text-muted-foreground">or</span>
                    <span className="h-px flex-1 bg-white/10" />
                </div>

                <Button
                    type="button"
                    variant="gray"
                    className="w-full h-12 rounded-xl text-base"
                    disabled={isLoading}
                    onClick={handleGoogleSignIn}
                >
                    Continue with Google
                </Button>

                <div className="text-center text-sm">
                    <span className="text-muted-foreground">Don't have an account? </span>
                    <Link
                        to="/signup"
                        className="font-medium text-primary hover:text-primary/90 transition-colors"
                    >
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
