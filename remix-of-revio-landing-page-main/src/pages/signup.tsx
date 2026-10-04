import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const signUpSchema = z.object({
    fullName: z.string().trim().min(1, "Please enter your full name").max(100, "Name is too long"),
    email: z.string().trim().email("Please enter a valid email address").max(255, "Email is too long"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(72, "Password must be 72 characters or less")
        .regex(/[a-z]/, "Password must include a lowercase letter")
        .regex(/[A-Z]/, "Password must include an uppercase letter")
        .regex(/[0-9]/, "Password must include a number")
        .regex(/[^A-Za-z0-9]/, "Password must include a symbol"),
});

const SignUp = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { signUp, signInWithGoogle } = useAuth();
    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
        setIsLoading(true);
        const { error } = await signInWithGoogle();
        if (error) {
            setIsLoading(false);
            toast.error(error.message);
        }
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const parsed = signUpSchema.safeParse({ fullName, email, password });
        if (!parsed.success) {
            toast.error(parsed.error.issues[0].message);
            return;
        }


        setIsLoading(true);
        const { error } = await signUp(parsed.data.email, parsed.data.password, parsed.data.fullName);
        setIsLoading(false);

        if (error) {
            toast.error(error.message);
        } else {
            toast.success("Account created successfully!");
            navigate("/dashboard/profile");
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
            <Helmet>
                <title>Create Account | Revio</title>
            </Helmet>

            <div className="w-full max-w-[400px] space-y-8">
                <div className="text-center space-y-2">
                    <h1 className="text-4xl font-semibold tracking-tight">Create an Account</h1>
                    <p className="text-muted-foreground text-sm">
                        Join us and start your journey today.
                    </p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="John Doe"
                                className="bg-black border-input h-12 rounded-xl focus:ring-primary"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                disabled={isLoading}
                            />
                        </div>
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

                    <Button 
                        type="submit"
                        className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-medium rounded-xl text-lg"
                        disabled={isLoading}
                    >
                        {isLoading ? "Creating account..." : "Create Account"}
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
                    <span className="text-muted-foreground">Already have an account? </span>
                    <Link
                        to="/login"
                        className="font-medium text-primary hover:text-primary/90 transition-colors"
                    >
                        Sign In
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
