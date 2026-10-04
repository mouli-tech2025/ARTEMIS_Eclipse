import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { LogOut, Upload } from "lucide-react";
import { toast } from "sonner";
import DemoBlogLayout from "@/components/demo/demo-blog-layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSeedData } from "@/demo/seed-data-provider";

const DemoProfileSettings = () => {
  const navigate = useNavigate();
  const { profile, updateProfile } = useSeedData();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [firstName, setFirstName] = useState(profile.first_name);
  const [lastName, setLastName] = useState(profile.last_name);
  const [phone, setPhone] = useState(profile.phone);

  useEffect(() => {
    setFirstName(profile.first_name);
    setLastName(profile.last_name);
    setPhone(profile.phone);
  }, [profile]);

  const handleSave = () => {
    updateProfile({ first_name: firstName, last_name: lastName, phone });
    toast.success("Profile updated (demo)");
  };

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image must be less than 2MB");
      return;
    }
    updateProfile({ avatar_url: URL.createObjectURL(file) });
    toast.success("Avatar updated (demo preview only)");
    event.target.value = "";
  };

  const initials =
    `${(firstName || "").charAt(0)}${(lastName || "").charAt(0)}`.toUpperCase() || "U";

  return (
    <DemoBlogLayout
      breadcrumbs={[{ label: "Demo", to: "/demo/dashboard/blog" }, { label: "Profile" }]}
    >
      <Helmet>
        <title>My Profile Demo | Revio</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-white">My Profile</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Sample profile — changes are local to this demo session.
        </p>
      </div>

      <div className="max-w-[800px] space-y-10">
        <div className="flex justify-end">
          <Button
            variant="outline"
            className="border-white/10 text-white hover:bg-white/5"
            onClick={() => navigate("/")}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign out
          </Button>
        </div>

        {/* Profile Photo */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-white">Profile Photo</h2>
          <div className="flex items-center gap-6">
            <Avatar className="w-24 h-24 border border-white/10">
              <AvatarImage src={profile.avatar_url || undefined} />
              <AvatarFallback className="bg-primary/20 text-primary text-2xl">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-wrap gap-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                className="hidden"
                id="demo-avatar-upload"
              />
              <Button onClick={() => fileInputRef.current?.click()} className="h-11 px-6">
                <span className="flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  Change photo
                </span>
              </Button>
              {profile.avatar_url && (
                <Button
                  variant="outline"
                  onClick={() => updateProfile({ avatar_url: null })}
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

        {/* Form */}
        <div className="grid gap-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-white">
                First Name
              </Label>
              <Input
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="bg-foreground border-white/10 h-12 focus:ring-primary text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-white">
                Last Name
              </Label>
              <Input
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="bg-foreground border-white/10 h-12 focus:ring-primary text-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              value={profile.email}
              readOnly
              className="bg-white/5 border-white/10 h-12 text-muted-foreground"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-white">
              Phone Number
            </Label>
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

        <div className="pt-6 border-t border-white/10 flex justify-end">
          <Button onClick={handleSave} className="h-12 px-8">
            Save Changes
          </Button>
        </div>
      </div>
    </DemoBlogLayout>
  );
};

export default DemoProfileSettings;
