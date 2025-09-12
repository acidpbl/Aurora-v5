import { twMerge } from "tailwind-merge";

interface DividerProps {
  float?: "horizontal" | "vertical";
}

export function Divider({ float = "horizontal" }: DividerProps) {
  return (
    <div
      className={twMerge(
        float == "horizontal" ? "w-full h-0.5" : "w-0.5 h-full",
        "bg-radial from-tertiary to-transparent"
      )}
    />
  );
}
