import { twMerge } from "tailwind-merge";

interface DividerProps {
  flow?: "horizontal" | "vertical";
}

export function Divider({ flow = "horizontal" }: DividerProps) {
  return (
    <div
      className={twMerge(
        flow === "horizontal" ? "w-full h-px" : "w-px h-full",
        "bg-accent"
      )}
    />
  );
}
