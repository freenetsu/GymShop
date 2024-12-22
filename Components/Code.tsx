import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef } from "react";

export const Code = ({
                         className,
                         ...props
                     }: ComponentPropsWithoutRef<"span">) => {
    return (
        <span
            className={cn(
                "bg-accent/30 border-accent m-0.5 px-1 py-0.5 rounded-sm border text-primary font-mono hover:bg-accent/50 transition-colors",
                className
            )}
            {...props}
        />
    );
};
