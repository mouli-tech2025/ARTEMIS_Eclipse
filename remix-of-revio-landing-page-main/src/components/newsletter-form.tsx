import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { VariantProps } from "class-variance-authority";
import { useRef, useState } from "react";
import { buttonVariants } from "./ui/button";

interface NewsletterFormProps {
  title?: string;
  description?: string;
  placeholder?: string;
  buttonText?: string;
  buttonVariant?: VariantProps<typeof buttonVariants>["variant"];
  buttonClassName?: string;
  inputClassName?: string;
  formClassName?: string;
  gap?: string;
  onSubmit?: (email: string) => void;
}

const NewsletterForm = ({
  title = "Stay Updated with Revio",
  description = "Get the latest insights on payments.",
  placeholder = "Your email",
  buttonText = "Subscribe",
  buttonVariant,
  buttonClassName,
  inputClassName,
  formClassName,
  gap,
  onSubmit,
}: NewsletterFormProps) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    
    // Call custom onSubmit if provided
    if (onSubmit) {
      onSubmit(email);
    }
    
    // Clear the form
    if (formRef.current) {
      formRef.current.reset();
    }
    
    // Show success state
    setIsSuccess(true);
    
    // Reset success state after 3 seconds
    setTimeout(() => {
      setIsSuccess(false);
    }, 3000);
  };

  const gapClass = gap || "gap-1 md:gap-2.5";

  return (
    <form ref={formRef} onSubmit={handleSubmit} className={cn("block", formClassName)}>
      <div className="flex flex-col">
        <div className={`flex ${gapClass}`}>
          <div className="w-full">
            <Input
              type="email"
              name="email"
              placeholder={placeholder}
              className={cn(
                "w-full text-white placeholder:text-muted-foreground focus:border-primary",
                isSuccess && "border-green-500 focus:border-green-500",
                inputClassName
              )}
              required
            />
          </div>
          <Button
            type="submit"
            variant={buttonVariant}
            className={buttonClassName}
          >
            {buttonText}
          </Button>
        </div>
        <p 
          className={cn(
            "text-sm mt-1 min-h-[20px] transition-opacity duration-200",
            isSuccess ? "text-green-500 opacity-100" : "opacity-0 invisible"
          )}
        >
          Successfully subscribed!
        </p>
      </div>
    </form>
  );
};

export default NewsletterForm;

