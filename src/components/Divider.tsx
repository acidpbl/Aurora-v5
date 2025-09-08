import { twMerge } from "tailwind-merge";

interface DividerProps {
  float?: "horizontal" | "vertical";
}

export function Divider({ float = "horizontal" }: DividerProps) {
  return (
    <div
      className={twMerge(
        float == "horizontal" ? "w-full h-px" : "w-px h-full",
        "bg-radial from-tertiary to-transparent"
      )}
    />
  );
}
