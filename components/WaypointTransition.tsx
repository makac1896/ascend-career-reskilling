import React, { useEffect, useState } from "react";

interface WaypointTransitionProps {
  onContinue: () => void;
  onGoToDashboard: () => void;
}

const WaypointTransition: React.FC<WaypointTransitionProps> = ({
  onContinue,
  onGoToDashboard,
}) => {
  const [line1Visible, setLine1Visible] = useState(false);
  const [line2Visible, setLine2Visible] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setLine1Visible(true), 600);
    const t2 = setTimeout(() => setLine2Visible(true), 2000);
    const t3 = setTimeout(() => setButtonVisible(true), 4200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(160deg, #0A0F1E 0%, #0F1829 60%, #0D1520 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'DM Sans', sans-serif",
        padding: "40px 24px",
        boxSizing: "border-box",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Waypoint logo */}
      <div style={{ position: "absolute", top: 12, left: 16, zIndex: 10, pointerEvents: "none", backgroundColor: "#FFFFFF", borderRadius: "12px", padding: "6px 12px", boxShadow: "0 2px 12px rgba(0,0,0,0.18)" }}>
        <img src="/waypoint.png" alt="Waypoint" style={{ height: 36, width: "auto", display: "block" }} />
      </div>

      {/* Subtle ambient glow */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "500px",
          height: "300px",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, rgba(79,70,229,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "28px",
          maxWidth: "520px",
          textAlign: "center",
        }}
      >
        {/* Line 1 */}
        <p
          style={{
            fontSize: "clamp(22px, 3vw, 30px)",
            fontWeight: 700,
            color: "#FFFFFF",
            margin: 0,
            letterSpacing: "-0.01em",
            opacity: line1Visible ? 1 : 0,
            transform: line1Visible ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 1.1s ease, transform 1.1s ease",
          }}
        >
          Simulation complete.
        </p>

        {/* Line 2 */}
        <p
          style={{
            fontSize: "clamp(15px, 1.8vw, 18px)",
            fontWeight: 400,
            color: "rgba(255,255,255,0.48)",
            margin: 0,
            lineHeight: "1.65",
            letterSpacing: "0.005em",
            opacity: line2Visible ? 1 : 0,
            transform: line2Visible ? "translateY(0)" : "translateY(10px)",
            transition: "opacity 1.2s ease, transform 1.2s ease",
          }}
        >
          Kira and Dev have sent you follow-up messages based on your
          conversation.
        </p>

        {/* Buttons */}
        <div
          style={{
            marginTop: "12px",
            opacity: buttonVisible ? 1 : 0,
            transform: buttonVisible ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 1s ease, transform 1s ease",
            pointerEvents: buttonVisible ? "auto" : "none",
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <button
            onClick={onContinue}
            style={{
              padding: "14px 36px",
              borderRadius: "10px",
              border: "1px solid rgba(255,255,255,0.12)",
              backgroundColor: "rgba(255,255,255,0.06)",
              color: "rgba(255,255,255,0.85)",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "15px",
              fontWeight: 600,
              cursor: "pointer",
              letterSpacing: "0.01em",
              backdropFilter: "blur(8px)",
              transition:
                "background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              const b = e.currentTarget;
              b.style.backgroundColor = "rgba(255,255,255,0.11)";
              b.style.borderColor = "rgba(255,255,255,0.22)";
              b.style.color = "#FFFFFF";
            }}
            onMouseLeave={(e) => {
              const b = e.currentTarget;
              b.style.backgroundColor = "rgba(255,255,255,0.06)";
              b.style.borderColor = "rgba(255,255,255,0.12)";
              b.style.color = "rgba(255,255,255,0.85)";
            }}
          >
            Open your messages
          </button>
          <button
            onClick={onGoToDashboard}
            style={{
              padding: "14px 28px",
              borderRadius: "10px",
              border: "1px solid rgba(255,255,255,0.12)",
              backgroundColor: "transparent",
              color: "rgba(255,255,255,0.62)",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "15px",
              fontWeight: 600,
              cursor: "pointer",
              letterSpacing: "0.01em",
              transition: "border-color 0.2s ease, color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              const b = e.currentTarget;
              b.style.borderColor = "rgba(255,255,255,0.22)";
              b.style.color = "rgba(255,255,255,0.9)";
            }}
            onMouseLeave={(e) => {
              const b = e.currentTarget;
              b.style.borderColor = "rgba(255,255,255,0.12)";
              b.style.color = "rgba(255,255,255,0.62)";
            }}
          >
            Go to dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default WaypointTransition;
