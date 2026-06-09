export default function ProductVisual({
  line = "Original",
  flavor = "Citrus",
  size = "medium",
  showPouch = false,
  className = "",
}) {
  const isPlus = line === "Plus";

  return (
    <div
      aria-label={`REP ${line} ${flavor} pouch can`}
      className={`product-visual product-visual--${size} ${className}`}
      role="img"
    >
      <div className="can-shadow" />
      <div className={`rep-can ${isPlus ? "rep-can--plus" : ""}`}>
        <div className="can-wall">
          <span>15 PERFORMANCE POUCHES</span>
        </div>
        <div className="can-ring" />
        <div className="can-lid">
          <span className="can-kicker">{isPlus ? "AMPLIFIED" : "NICOTINE-FREE"}</span>
          <strong>REP</strong>
          <span className="can-flavor">{flavor}</span>
          <span className="can-dose">{isPlus ? "3MG NICOTINE" : "100MG CAFFEINE"}</span>
        </div>
      </div>
      {showPouch && (
        <div className="rep-pouch">
          <span>REP</span>
        </div>
      )}
    </div>
  );
}
