import { type ReactNode, useState } from "react";
import { createPortal } from "react-dom";

interface TooltipProps {
  children: ReactNode;
  content: ReactNode;
  position?: "top" | "bottom" | "left" | "right";
}

export function Tooltip({ children, content, position = "top" }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });

  const positionOffsets = {
    top: (rect: DOMRect) => ({
      top: rect.top - 4,
      left: rect.left + rect.width / 2,
      transform: "translate(-50%, -100%)",
    }),
    bottom: (rect: DOMRect) => ({
      top: rect.bottom + 4,
      left: rect.left + rect.width / 2,
      transform: "translate(-50%, 0)",
    }),
    left: (rect: DOMRect) => ({
      top: rect.top + rect.height / 2,
      left: rect.left - 4,
      transform: "translate(-100%, -50%)",
    }),
    right: (rect: DOMRect) => ({
      top: rect.top + rect.height / 2,
      left: rect.right + 4,
      transform: "translate(0, -50%)",
    }),
  };

  function showTooltip(e: React.MouseEvent) {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const pos = positionOffsets[position](rect);
    setCoords({ top: pos.top, left: pos.left });
    setVisible(true);
  }

  return (
    <div
      className="relative"
      onMouseEnter={showTooltip}
      onMouseLeave={() => setVisible(false)}
    >
      {children}

      {visible &&
        createPortal(
          <div
            className="absolute z-[9999] bg-background border-2 border-tertiary rounded-lg px-2 py-1 text-text-primary transition-all ease-linear whitespace-pre-line text-center"
            style={{
              top: coords.top,
              left: coords.left,
              position: "fixed",
              transform: positionOffsets[position](
                (
                  document.querySelector("body") as HTMLElement
                ).getBoundingClientRect()
              ).transform,
            }}
          >
            {content}
          </div>,
          document.body
        )}
    </div>
  );
}
