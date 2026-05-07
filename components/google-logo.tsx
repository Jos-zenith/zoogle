interface GoogleLogoProps {
  size?: "large" | "small"
}

export function GoogleLogo({ size = "large" }: GoogleLogoProps) {
  if (size === "large") {
    return (
      <div className="select-none leading-none">
        <div style={{ fontFamily: "'Times New Roman', Georgia, serif", fontSize: "96px", fontWeight: 700, letterSpacing: "-2px" }}>
          <span style={{ color: "#4285f4" }}>J</span>
          <span style={{ color: "#ea4335" }}>o</span>
          <span style={{ color: "#fbbc04" }}>s</span>
          <span style={{ color: "#4285f4" }}>_</span>
          <span style={{ color: "#34a853" }}>z</span>
          <span style={{ color: "#ea4335" }}>e</span>
          <span style={{ color: "#fbbc04" }}>n</span>
          <span style={{ color: "#34a853" }}>i</span>
          <span style={{ color: "#4285f4" }}>t</span>
          <span style={{ color: "#ea4335" }}>h</span>
        </div>
      </div>
    )
  }

  return (
    <div style={{ fontFamily: "'Times New Roman', Georgia, serif", fontSize: "32px", fontWeight: 700, letterSpacing: "-1px" }}>
      <span style={{ color: "#4285f4" }}>J</span>
      <span style={{ color: "#ea4335" }}>o</span>
      <span style={{ color: "#fbbc04" }}>s</span>
      <span style={{ color: "#4285f4" }}>_</span>
      <span style={{ color: "#34a853" }}>z</span>
      <span style={{ color: "#ea4335" }}>e</span>
      <span style={{ color: "#fbbc04" }}>n</span>
      <span style={{ color: "#34a853" }}>i</span>
      <span style={{ color: "#4285f4" }}>t</span>
      <span style={{ color: "#ea4335" }}>h</span>
    </div>
  )
}
