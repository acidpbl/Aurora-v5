import type { ReactNode } from "react";

interface CardRootProps {
  children?: ReactNode;
}

export function CardRoot({ children }: CardRootProps) {
  return (
    <div className="col-span-3 h-16 w-[calc(100%-18rem*2)] bg-card self-center rounded-md flex px-8 py-4 gap-4">
      <h1 className="min-h-6 max-h-6 font-poppins capitalize text-text font-medium self-center">
        Settings
      </h1>
      {children}
    </div>
  );
}
