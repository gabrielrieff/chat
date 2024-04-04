import React, { useEffect, useRef } from "react";
interface MainProps {
  children: React.ReactNode;
}

export function Main({ children }: MainProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [children]);
  return (
    <div
      ref={containerRef}
      className="overflow-y-auto overflow-x-hidden h-full px-5 flex flex-col gap-3"
    >
      {children}
    </div>
  );
}
