import { useState } from "react";

// Resolve the expected photo path for a SKU. Drop a matching PNG into
// /public/images using this name and it appears automatically — no code
// change required. e.g. REP Plus Berry -> /images/can-plus-berry.png
function imagePath(line, flavor) {
  return (
    "/images/can-" +
    `${line}-${flavor}`.toLowerCase().trim().replace(/\s+/g, "-") +
    ".png"
  );
}

export default function ProductVisual({
  line = "Original",
  flavor = "Citrus",
  size = "medium",
  showPouch = false,
  className = "",
}) {
  const isPlus = line === "Plus";
  // Optimistically try the real photo; fall back to the flat label on error.
  const [hasPhoto, setHasPhoto] = useState(true);
  const src = imagePath(line, flavor);

  return (
    <div
      aria-label={`REP ${line} ${flavor} pouch can`}
      className={`product-visual product-visual--${size} ${className}`}
      role="img"
    >
      {hasPhoto ? (
        <img
          alt={`REP ${line} ${flavor} can`}
          className="product-shot"
          loading="lazy"
          onError={() => setHasPhoto(false)}
          src={src}
        />
      ) : (
        <div className={`flat-can ${isPlus ? "flat-can--plus" : ""}`}>
          <div className="flat-can__cap">
            <span className="flat-can__kicker">
              {isPlus ? "Amplified" : "Nicotine-Free"}
            </span>
            <strong className="flat-can__brand">REP</strong>
          </div>
          <div className="flat-can__body">
            <span className="flat-can__line">{line}</span>
            <span className="flat-can__flavor">{flavor}</span>
            <span className="flat-can__dose">
              {isPlus ? "3MG NICOTINE · 100MG CAFFEINE" : "100MG CAFFEINE"}
            </span>
            <span className="flat-can__count">15 PERFORMANCE POUCHES</span>
          </div>
        </div>
      )}

      {showPouch && (
        <div className="flat-pouch" aria-hidden="true">
          <span>REP</span>
        </div>
      )}
    </div>
  );
}
