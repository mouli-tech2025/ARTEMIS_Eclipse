import BlogLayout from "@/components/dashboard/blog-layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { LogOut, Upload } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const passwordSchema = z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(72, "Password must be 72 characters or less")
    .regex(/[a-z]/, "Password must include a lowercase letter")
    .regex(/[A-Z]/, "Password must include an uppercase letter")
    .regex(/[0-9]/, "Password must include a number")
    .regex(/[^A-Za-z0-9]/, "Password must include a symbol");

const profileSchema = z.object({
    first_name: z.string().trim().max(50, "First name is too long"),
    last_name: z.string().trim().max(50, "Last name is too long"),
    phone: z
        .string()
        .trim()
        .max(20, "Phone number is too long")
        .refine(
            (val) => val === "" || /^[+]?[0-9()\-\s.]{7,20}$/.test(val),
            "Please enter a valid phone number"
        ),
});


const ProfileSettings = () => {
    const { user, profile, updateProfile, signOut, loading, refreshProfile } = useAuth();
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isChangingPassword, setIsChangingPassword] = useState(false);

    const handleChangePassword = async () => {
        const parsed = passwordSchema.safeParse(newPassword);
        if (!parsed.success) {
            toast.error(parsed.error.issues[0].message);
            return;
        }
        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        setIsChangingPassword(true);
        const { error } = await supabase.auth.updateUser({ password: parsed.data });
        setIsChangingPassword(false);
        if (error) {
            toast.error(error.message);
        } else {
            toast.success("Password updated successfully!");
            setNewPassword("");
            setConfirmPassword("");
        }
    };

    useEffect(() => {
        if (profile) {
            setFirstName(profile.first_name || "");
            setLastName(profile.last_name || "");
            setPhone(profile.phone || "");
        }
    }, [profile]);

    const handleSave = async () => {
        const parsed = profileSchema.safeParse({
            first_name: firstName,
            last_name: lastName,
            phone: phone,
        });
        if (!parsed.success) {
            toast.error(parsed.error.issues[0].message);
            return;
        }

        setIsSaving(true);
        const { error } = await updateProfile(parsed.data);
        setIsSaving(false);

        if (error) {
            toast.error("Failed to save changes");
        } else {
            toast.success("Profile updated successfully!");
        }
    };


    const handleSignOut = async () => {
        await signOut();
        toast.success("Signed out successfully");
        navigate("/");
    };

    const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file || !user) return;

        if (!file.type.startsWith("image/")) {
            toast.error("Please upload an image file");
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            toast.error("Image must be less than 2MB");
            return;
        }

        setIsUploading(true);

        try {
            const fileExt = file.name.split(".").pop();
            const filePath = `${user.id}/avatar.${fileExt}`;

            if (profile?.avatar_url && profile.avatar_url.includes("/avatars/")) {
                const oldPath = profile.avatar_url.split("/avatars/")[1];
                if (oldPath) {
                    await supabase.storage.from("avatars").remove([oldPath]);
                }
            }

            const { error: uploadError } = await supabase.storage
                .from("avatars")
                .upload(filePath, file, { upsert: true });

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from("avatars")
                .getPublicUrl(filePath);

            const { error: updateError } = await updateProfile({
                avatar_url: publicUrl,
            });

            if (updateError) throw updateError;

            await refreshProfile();
            toast.success("Avatar updated successfully!");
        } catch (error: any) {
            toast.error(error.message || "Failed to upload avatar");
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };

    const handleRemoveAvatar = async () => {
        if (!user || !profile?.avatar_url) return;

        setIsUploading(true);

        try {
            const urlParts = profile.avatar_url.split("/avatars/");
            if (urlParts.length > 1) {
                await supabase.storage.from("avatars").remove([urlParts[1]]);
            }

            const { error } = await updateProfile({
                avatar_url: null,
            });

            if (error) throw error;

            await refreshProfile();
            toast.success("Avatar removed successfully!");
        } catch (error: any) {
            toast.error(error.message || "Failed to remove avatar");
        } finally {
            setIsUploading(false);
        }
    };

    const getInitials = () => {
        const first = firstName || profile?.first_name || "";
        const last = lastName || profile?.last_name || "";
        if (first || last) {
            return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase();
        }
        return user?.email?.charAt(0).toUpperCase() || "U";
    };

    return (
        <BlogLayout
            breadcrumbs={[
                { label: "Dashboard", to: "/dashboard/blog" },
                { label: "Profile" },
            ]}
        >
            <Helmet>
                <title>My Profile | Revio</title>
            </Helmet>

            <div className="mb-8">
                <h1 className="text-2xl font-semibold text-white">My Profile</h1>
                <p className="mt-1 text-sm text-muted-foreground">Manage your profile settings</p>
            </div>

            {loading ? (
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                </div>
            ) : (
                <div className="max-w-[800px] space-y-10">
                    <div className="flex justify-end">
                        <Button
                            variant="outline"
                            className="border-white/10 text-white hover:bg-white/5"
                            onClick={handleSignOut}
                        >
                            <LogOut className="w-4 h-4 mr-2" />
                            Sign out
                        </Button>
                    </div>

                    {/* Profile Photo Section */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-white">Profile Photo</h2>
                        <div className="flex items-center gap-6">
                            <Avatar className="w-24 h-24 border border-white/10">
                                <AvatarImage src={profile?.avatar_url || undefined} />
                                <AvatarFallback className="bg-primary/20 text-primary text-2xl">
                                    {getInitials()}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-wrap gap-3">
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleAvatarUpload}
                                    className="hidden"
                                    id="avatar-upload"
                                />
                                <Button
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={isUploading}
                                    className="h-11 px-6"
                                >
                                    {isUploading ? (
                                        <span className="flex items-center gap-2">
                                            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                                            Uploading...
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-2">
                                            <Upload className="w-4 h-4" />
                                            Change photo
                                        </span>
                                    )}
                                </Button>
                                {profile?.avatar_url && (
                                    <Button
                                        variant="outline"
                                        onClick={handleRemoveAvatar}
                                        disabled={isUploading}
                                        className="border-white/10 h-11 px-6 hover:bg-white/5 text-white transition-colors"
                                    >
                                        Remove
                                    </Button>
                                )}
                            </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Add your photo. Recommended size is 256×256px. Max 2MB.
                        </p>
                    </div>

                    {/* Form Section */}
                    <div className="grid gap-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="firstName" className="text-white">First Name</Label>
                                <Input
                                    id="firstName"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="bg-foreground border-white/10 h-12 focus:ring-primary text-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName" className="text-white">Last Name</Label>
                                <Input
                                    id="lastName"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="bg-foreground border-white/10 h-12 focus:ring-primary text-white"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-white">Email Address</Label>
                            <Input
                                id="email"
                                type="email"
                                value={user?.email || ""}
                                readOnly
                                className="bg-white/5 border-white/10 h-12 text-muted-foreground"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone" className="text-white">Phone Number</Label>
                            <Input
                                id="phone"
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="Enter your phone number"
                                className="bg-foreground border-white/10 h-12 focus:ring-primary text-white"
                            />
                        </div>
                    </div>

                    {/* Save Button */}
                    <div className="pt-6 border-t border-white/10 flex justify-end">
                        <Button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="h-12 px-8"
                        >
                            {isSaving ? "Saving..." : "Save Changes"}
                        </Button>
                    </div>

                    {/* Change Password */}
                    <div className="pt-6 border-t border-white/10 space-y-4">
                        <h2 className="text-lg font-semibold text-white">Change Password</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="newPassword" className="text-white">New Password</Label>
                                <Input
                                    id="newPassword"
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="At least 8 characters"
                                    className="bg-foreground border-white/10 h-12 focus:ring-primary text-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword" className="text-white">Confirm Password</Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Repeat new password"
                                    className="bg-foreground border-white/10 h-12 focus:ring-primary text-white"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Button
                                onClick={handleChangePassword}
                                disabled={isChangingPassword}
                                className="h-11 px-6"
                            >
                                {isChangingPassword ? "Updating..." : "Update Password"}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </BlogLayout>
    );
};

export default ProfileSettings;
