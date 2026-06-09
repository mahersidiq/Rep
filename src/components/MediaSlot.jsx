import { useState } from "react";

// A photo slot. Pass a `src` (e.g. /images/lifestyle-1.png). If the file is
// present it renders the photo; otherwise it shows a clean typographic panel
// so the layout never looks broken before real assets are added.
export default function MediaSlot({ src, label = "REP", alt = "", className = "" }) {
  const [hasPhoto, setHasPhoto] = useState(Boolean(src));

  return (
    <div className={`media-slot ${className}`}>
      {hasPhoto ? (
        <img
          alt={alt || label}
          loading="lazy"
          onError={() => setHasPhoto(false)}
          src={src}
        />
      ) : (
        <div className="media-slot__fallback">
          <span className="media-slot__word">{label}</span>
        </div>
      )}
    </div>
  );
}
