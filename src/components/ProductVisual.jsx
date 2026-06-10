export default function ProductVisual({
  line = "Original",
  flavor = "Citrus",
  size = "medium",
  className = "",
}) {
  return (
    <div
      className={`product-visual product-visual--${size} product-visual--${flavor.toLowerCase()} ${className}`}
    >
      <img
        alt={`REP ${line} ${flavor} performance pouch can with pouch`}
        loading="lazy"
        src="/images/rep-can.webp"
      />
    </div>
  );
}
