import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const emailSchema = z
    .string()
    .trim()
    .min(1, "Please enter your email")
    .email("Please enter a valid email address")
    .max(255, "Email is too long");

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [sent, setSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const parsed = emailSchema.safeParse(email);
        if (!parsed.success) {
            toast.error(parsed.error.issues[0].message);
            return;
        }
        setIsLoading(true);
        const { error } = await supabase.auth.resetPasswordForEmail(parsed.data, {
            redirectTo: `${window.location.origin}/login`,
        });
        setIsLoading(false);
        if (error) {
            toast.error(error.message);
        } else {
            setSent(true);
            toast.success("Password reset email sent!");
        }
    };


    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
            <Helmet>
                <title>Forgot Password | Revio</title>
            </Helmet>
            <div className="w-full max-w-[400px] space-y-8">
                <div className="text-center space-y-2">
                    <h1 className="text-4xl font-semibold tracking-tight">Reset your password</h1>
                    <p className="text-muted-foreground text-sm">
                        Enter your email and we'll send you a reset link.
                    </p>
                </div>
                {sent ? (
                    <div className="text-center space-y-4">
                        <p className="text-white">Check your inbox at <strong>{email}</strong> for a reset link.</p>
                        <Link to="/login" className="text-primary hover:underline">Back to sign in</Link>
                    </div>
                ) : (
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                className="bg-black border-input h-12 rounded-xl focus:ring-primary"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={isLoading}
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-medium rounded-xl text-lg"
                            disabled={isLoading}
                        >
                            {isLoading ? "Sending..." : "Send reset link"}
                        </Button>
                        <div className="text-center text-sm">
                            <Link to="/login" className="text-muted-foreground hover:text-white">Back to sign in</Link>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;
