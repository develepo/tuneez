import type { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";

type ButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
    children: ReactNode;
    variant?: ButtonVariant;
    loading?: boolean;
};
export function Button({ children, variant = "primary", loading = false, disabled, className="", ...props }: ButtonProps) {
    const variants: Record<ButtonVariant, string> = {
        primary: "bg-[#E1306C] text-white hover:opacity-90",
        secondary: "border border-black/[0.08] bg-white text-[#111111] hover:border-black/20",
        ghost: "text-[#737373] hover:text-[#111111]",
        outline: "border border-black/[0.08] bg-white text-[#111111] hover:border-black/20",};
        return (
            <button
            disabled={loading || disabled}
            className={` inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className} `} {...props} > {loading ? ( <span className="flex items-center gap-2"> <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" /> <span>Working...</span> </span> ) : ( children )} </button> ); }
