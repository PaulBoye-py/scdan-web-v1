import { cn } from "@/lib/utils"

// The five tooth colours from the logo, used as a small signature beside section labels and in the footer.
const colors = ["bg-spectrum-blue", "bg-spectrum-red", "bg-spectrum-amber", "bg-spectrum-green", "bg-spectrum-teal"]

export default function SpectrumMark({ variant = "dots", className }: { variant?: "dots" | "bars"; className?: string }) {
  return (
    <span aria-hidden="true" className={cn("inline-flex shrink-0 items-center gap-[3px]", className)}>
      {colors.map((c) => (
        <span key={c} className={cn("block", c, variant === "dots" ? "size-[7px] rounded-full" : "h-[3px] w-3.5 rounded-full")} />
      ))}
    </span>
  )
}
