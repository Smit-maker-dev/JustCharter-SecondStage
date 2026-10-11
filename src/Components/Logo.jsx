import React, { useEffect, useRef, useState } from "react";
import { useSurface } from "../context/SurfaceContext";

export default function Logo({
  variant = "auto",
  markOnly = false,
  withTile = false,
  tileShape = "rounded", // "rounded" (22% radius) or "circle"
  className = "",
  style = {},
  alt = "JustCharter Logo",
  onClick,
  ...props
}) {
  const contextSurface = useSurface();
  const [detectedSurface, setDetectedSurface] = useState(contextSurface || "light");
  const logoRef = useRef(null);

  useEffect(() => {
    if (variant === "auto" && logoRef.current) {
      const closestDark = logoRef.current.closest('[data-surface="dark"]');
      if (closestDark) {
        setDetectedSurface("dark");
      } else {
        setDetectedSurface(contextSurface || "light");
      }
    }
  }, [variant, contextSurface]);

  const effectiveVariant = variant === "auto" ? detectedSurface : variant;
  const isDark = effectiveVariant === "dark";

  let src = "";
  if (markOnly) {
    if (withTile) {
      src = "/brand/logo-mark-tile.svg";
    } else {
      src = isDark ? "/brand/logo-mark-on-dark.svg" : "/brand/logo-mark.svg";
    }
  } else {
    src = isDark ? "/brand/logo-on-dark.svg" : "/brand/logo-on-light.svg";
  }

  if (markOnly && withTile) {
    const tileRadiusClass = tileShape === "circle" ? "rounded-full" : "rounded-[22%]";
    return (
      <div
        ref={logoRef}
        onClick={onClick}
        style={style}
        className={`inline-flex items-center justify-center p-[16%] ${tileRadiusClass} ${
          isDark
            ? "bg-white"
            : "bg-white border border-[#E5E5E5] shadow-[0_1px_3px_rgba(0,0,0,0.12)]"
        } ${className}`}
        {...props}
      >
        <img
          src="/brand/logo-mark.svg"
          alt={alt}
          className="w-full h-full object-contain pointer-events-none"
        />
      </div>
    );
  }

  return (
    <img
      ref={logoRef}
      src={src}
      alt={alt}
      onClick={onClick}
      style={style}
      className={`object-contain transition-opacity duration-200 ${className}`}
      {...props}
    />
  );
}
