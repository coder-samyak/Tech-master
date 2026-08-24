import React, { useEffect, useRef, useState } from "react";

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [hoverText, setHoverText] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const cursorEl = cursorRef.current;
    if (!cursorEl) return;

    const onMouseMove = (e: MouseEvent) => {
      if (cursorEl) {
        cursorEl.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check if target or any parent has data-cursor attribute
      const cursorAttrTarget = target.closest("[data-cursor]");
      if (cursorAttrTarget) {
        const text = cursorAttrTarget.getAttribute("data-cursor") || "";
        if (text === "none") {
          setIsHovered(false);
          return;
        }
        setHoverText(text);
        setIsHovered(true);
        return;
      }

      // Default hover on interactive elements
      const isInteractive = target.closest("a, button, input, select, textarea, [role='button']");
      if (isInteractive) {
        const rawText = isInteractive.textContent?.trim() || "";
        let text = "VIEW";
        
        const textLower = rawText.toLowerCase();
        if (textLower.includes("talk") || textLower.includes("contact")) {
          text = "TALK";
        } else if (textLower.includes("read") || textLower.includes("article") || textLower.includes("blog")) {
          text = "READ";
        } else if (textLower.includes("subscribe")) {
          text = "JOIN";
        } else if (textLower.includes("faq")) {
          text = "FAQ";
        } else if (textLower.includes("career")) {
          text = "WORK";
        } else if (textLower.includes("work") || textLower.includes("portfolio")) {
          text = "WORK";
        } else if (textLower.includes("close") || textLower.includes("✕") || textLower.includes("x")) {
          text = "CLOSE";
        } else if (rawText.length > 0 && rawText.length <= 8) {
          text = rawText;
        }
        
        setHoverText(text);
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const onMouseOut = () => {
      setIsHovered(false);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onMouseOver);
    window.addEventListener("mouseout", onMouseOut);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("mouseout", onMouseOut);
    };
  }, []);

  // Don't render cursor on mobile/touch screens
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  useEffect(() => {
    setIsTouchDevice(
      "ontouchstart" in window || navigator.maxTouchPoints > 0
    );
  }, []);

  if (isTouchDevice) return null;

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor ${isHovered ? "hovered" : ""}`}
      style={{
        zIndex: 9999,
        position: "fixed",
        top: 0,
        left: 0,
        background: isHovered ? "rgba(10, 10, 10, 0.85)" : "transparent",
        border: "1.5px solid #D4AF37",
        boxShadow: isHovered ? "0 0 14px rgba(212, 175, 55, 0.6)" : "0 0 8px rgba(212, 175, 55, 0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none"
      }}
    >
      {isHovered && hoverText && (
        <span style={{
          color: "#D4AF37",
          fontFamily: "var(--font-sans)",
          fontSize: "9px",
          fontWeight: 700,
          letterSpacing: "1.5px",
          textTransform: "uppercase",
          userSelect: "none",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%"
        }}>
          {hoverText}
        </span>
      )}
    </div>
  );
};
