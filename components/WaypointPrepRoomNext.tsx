import React, { useState, useEffect } from "react";

interface WaypointPrepRoomProps {
  onReady: (q1: string, q2: string) => void;
  onSkipToDashboard: () => void;
  onBack: () => void;
}

const Q1_OPTIONS = [
  "Writing, storytelling, and understanding people",
  "Solving problems and working with data",
  "Organizing, planning, and keeping things moving",
  "I'm still figuring that out",
];

const Q2_OPTIONS = [
  "Say it directly",
  "Find a careful way to bring it up",
  "Keep it to myself unless asked",
  "Depends on the situation",
];

const TOTAL_STEPS = 4;

const WaypointPrepRoom: React.FC<WaypointPrepRoomProps> = ({
  onReady,
  onSkipToDashboard,
  onBack,
}) => {
  const [step, setStep] = useState(0);
  const [phase, setPhase] = useState<"entering" | "idle" | "exiting">(
    "entering",
  );
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const [q1, setQ1] = useState<string | null>(null);
  const [q2, setQ2] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);
  const [pulsingPill, setPulsingPill] = useState<string | null>(null);
  const [interstitial, setInterstitial] = useState(false);

  // Trigger entrance animation on every step change
  useEffect(() => {
    setPhase("entering");
    const t = setTimeout(() => setPhase("idle"), 40);
    return () => clearTimeout(t);
  }, [step]);

  const advance = () => {
    if (phase !== "idle") return;
    setDirection("forward");
    setPhase("exiting");
    setTimeout(() => setStep((s) => s + 1), 380);
  };

  const goBack = () => {
    if (step === 0 || phase !== "idle") return;
    setDirection("back");
    setPhase("exiting");
    setTimeout(() => setStep((s) => s - 1), 380);
  };

  const handleReady = () => {
    if (!q1 || !q2 || connecting) return;
    setConnecting(true);
    setPhase("exiting");
    setTimeout(() => setInterstitial(true), 400);
    setTimeout(() => onReady(q1!, q2!), 1900);
  };

  // How many "peeking" cards sit underneath the active one
  const peekCount = Math.max(0, TOTAL_STEPS - 1 - step);

  // Active card animation styles — slides up and rotates away, new one rises from below
  const cardStyle: React.CSSProperties = {
    position: "relative",
    width: "100%",
    backgroundColor: step === 1 ? "#FFFEF7" : "#F8F7F3",
    borderRadius: step === 1 ? "16px 0 16px 16px" : "16px",
    overflow: step === 1 ? undefined : "hidden",
    boxShadow:
      step === 1
        ? "0 20px 60px rgba(0,0,0,0.45), 4px 4px 0 rgba(180,160,120,0.15), 0 4px 16px rgba(0,0,0,0.22)"
        : "0 16px 56px rgba(0,0,0,0.42), 0 4px 16px rgba(0,0,0,0.22)",
    zIndex: 10,
    transition:
      phase === "entering"
        ? "none"
        : "transform 0.38s cubic-bezier(0.4,0,0.2,1), opacity 0.38s ease",
    transform:
      phase === "entering"
        ? direction === "back"
          ? "translateY(-24px) rotate(1.5deg) scale(0.97)"
          : "translateY(24px) rotate(-1.5deg) scale(0.97)"
        : phase === "exiting"
          ? direction === "back"
            ? "translateY(56px) rotate(-5deg) scale(0.94)"
            : "translateY(-56px) rotate(5deg) scale(0.94)"
          : "translateY(0) rotate(0deg) scale(1)",
    opacity: phase === "entering" ? 0 : phase === "exiting" ? 0 : 1,
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background: [
          "radial-gradient(ellipse 220px 160px at 0% 0%, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.55) 40%, rgba(255,255,255,0) 68%)",
          "linear-gradient(180deg, #0D1F3C 0%, #1A3569 100%)",
        ].join(", "),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        position: "relative",
      }}
    >
      {/* Waypoint logo */}
      <img src="/waypoint.png" alt="Waypoint" style={{ position: "absolute", top: 16, left: 20, height: 44, width: "auto", zIndex: 10, pointerEvents: "none" }} />

      {/* ── keyframes ── */}
      <style>{`
        @keyframes pill-pulse {
          0%   { transform: scale(1);    box-shadow: 0 0 0 0   rgba(79,70,229,0); }
          45%  { transform: scale(1.07); box-shadow: 0 0 0 6px rgba(79,70,229,0.18); }
          100% { transform: scale(1);    box-shadow: 0 0 0 0   rgba(79,70,229,0); }
        }
        @keyframes interstitial-in {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes live-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.85); }
        }
      `}</style>

      {/* Ambient depth — warm radial glow + accent blobs */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "860px",
          height: "580px",
          background:
            "radial-gradient(ellipse at center, rgba(99,102,241,0.14) 0%, rgba(79,70,229,0.05) 45%, transparent 70%)",
          filter: "blur(52px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "22%",
          right: "10%",
          width: "300px",
          height: "300px",
          background:
            "radial-gradient(circle, rgba(251,191,36,0.08) 0%, transparent 70%)",
          filter: "blur(70px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "20%",
          left: "6%",
          width: "260px",
          height: "260px",
          background:
            "radial-gradient(circle, rgba(139,92,246,0.09) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {interstitial ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 20,
            minHeight: "40vh",
          }}
        >
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "26px",
              fontWeight: 300,
              color: "rgba(255,255,255,0.90)",
              letterSpacing: "0.01em",
              margin: 0,
              textAlign: "center",
              animation: "interstitial-in 0.65s ease both",
            }}
          >
            Kira and Dev are waiting.
          </p>
        </div>
      ) : (
        <>
          {/* Card column */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              maxWidth: "621px",
              zIndex: 20,
            }}
          >
            {/* Back button */}
            <div
              style={{
                height: "36px",
                marginBottom: "8px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <button
                onClick={step === 0 ? onBack : goBack}
                style={{
                  background: "none",
                  border: "none",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.55)",
                  cursor: "pointer",
                  padding: "4px 0",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  transition: "color 0.15s ease",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.color =
                    "rgba(255,255,255,0.9)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.color =
                    "rgba(255,255,255,0.55)")
                }
              >
                ← Back
              </button>
            </div>

            {/* Step indicator dots */}
            <div
              style={{
                display: "flex",
                gap: "8px",
                marginBottom: "24px",
              }}
            >
              {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: i === step ? "20px" : "6px",
                    height: "6px",
                    borderRadius: "3px",
                    backgroundColor:
                      i === step ? "#FFFFFF" : "rgba(255,255,255,0.3)",
                    transition: "all 0.3s ease",
                  }}
                />
              ))}
            </div>

            {/* Card stack */}
            <div
              style={{
                position: "relative",
                width: "100%",
              }}
            >
              {/* Bottom peeking card (furthest back) */}
              {peekCount >= 2 && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "20px",
                    right: "20px",
                    bottom: 0,
                    backgroundColor: "#F2EFE9",
                    borderRadius: "16px",
                    transform: "rotate(3deg) translateY(10px)",
                    zIndex: 6,
                    boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
                  }}
                />
              )}
              {/* Middle peeking card */}
              {peekCount >= 1 && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "10px",
                    right: "10px",
                    bottom: 0,
                    backgroundColor: "#F7F4EF",
                    borderRadius: "16px",
                    transform: "rotate(1.5deg) translateY(6px)",
                    zIndex: 8,
                    boxShadow: "0 8px 24px rgba(0,0,0,0.22)",
                  }}
                />
              )}

              {/* Active card */}
              <div style={cardStyle}>
                {/* ── CARD 0: The Situation ── */}
                {step === 0 && (
                  <div style={{ padding: "40px 40px 36px" }}>
                    {/* Paper grain texture */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E")`,
                        backgroundRepeat: "repeat",
                        backgroundSize: "300px 300px",
                        pointerEvents: "none",
                        zIndex: 0,
                        borderRadius: "inherit",
                      }}
                    />

                    {/* Beat 0 — Header */}
                    <p
                      style={{
                        position: "relative",
                        zIndex: 1,
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "11px",
                        fontWeight: 500,
                        color: "#9CA3AF",
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        margin: "0 0 20px 0",
                      }}
                    >
                      What’s happening
                    </p>

                    {/* Beat 1 — Context (orient quickly) */}
                    <p
                      style={{
                        position: "relative",
                        zIndex: 1,
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "19px",
                        lineHeight: "1.72",
                        color: "#6B7280",
                        fontWeight: 400,
                        margin: "0 0 28px 0",
                      }}
                    >
                      The nonprofit runs programs for Indigenous youth in the
                      community. Their annual report goes to funders, government
                      partners, and the community itself.
                    </p>

                    {/* Beat 2 — Tension (left border accent) */}
                    <div
                      style={{
                        position: "relative",
                        zIndex: 1,
                        borderLeft: "3px solid #D97706",
                        paddingLeft: "16px",
                        marginBottom: "36px",
                      }}
                    >
                      {/* Dev avatar + name row */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          marginBottom: "10px",
                        }}
                      >
                        {/* Dev avatar */}
                        <svg
                          width='26'
                          height='26'
                          viewBox='0 0 26 26'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                          style={{ flexShrink: 0 }}
                        >
                          <circle cx='13' cy='13' r='13' fill='#FDE68A' />
                          <circle cx='13' cy='10.5' r='4.5' fill='#92400E' />
                          <ellipse
                            cx='13'
                            cy='21'
                            rx='7'
                            ry='5'
                            fill='#92400E'
                          />
                        </svg>
                        {/* Kira avatar */}
                        <svg
                          width='26'
                          height='26'
                          viewBox='0 0 26 26'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                          style={{ flexShrink: 0, marginLeft: "-8px" }}
                        >
                          <circle cx='13' cy='13' r='13' fill='#FCA5A5' />
                          <circle cx='13' cy='10.5' r='4.5' fill='#7F1D1D' />
                          <ellipse
                            cx='13'
                            cy='21'
                            rx='7'
                            ry='5'
                            fill='#7F1D1D'
                          />
                        </svg>
                        <span
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "13px",
                            color: "#6B7280",
                            fontWeight: 500,
                          }}
                        >
                          Dev &amp; Kira
                        </span>
                      </div>
                      <p
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "20px",
                          lineHeight: "1.68",
                          color: "#1F2937",
                          fontWeight: 400,
                          margin: 0,
                        }}
                      >
                        Dev used an AI tool to draft the report. Kira thinks
                        something important is missing.{" "}
                        <span style={{ fontWeight: 600, color: "#111827" }}>
                          They disagree.
                        </span>
                      </p>
                    </div>

                    {/* Beat 3 — The invitation (personal hook) */}
                    <p
                      style={{
                        position: "relative",
                        zIndex: 1,
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "20px",
                        lineHeight: "1.68",
                        color: "#4F46E5",
                        fontWeight: 600,
                        margin: "0 0 36px 0",
                      }}
                    >
                      You’re the newest team member. They want your take before
                      the call.
                    </p>

                    {/* CTA — narrower, centered */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        position: "relative",
                        zIndex: 1,
                      }}
                    >
                      <button
                        onClick={advance}
                        style={{
                          width: "72%",
                          padding: "16px 28px",
                          borderRadius: "50px",
                          border: "none",
                          backgroundColor: "#4F46E5",
                          color: "#FFFFFF",
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "18px",
                          fontWeight: 600,
                          cursor: "pointer",
                          transition: "background-color 0.15s ease",
                        }}
                        onMouseEnter={(e) =>
                          ((
                            e.currentTarget as HTMLButtonElement
                          ).style.backgroundColor = "#4338CA")
                        }
                        onMouseLeave={(e) =>
                          ((
                            e.currentTarget as HTMLButtonElement
                          ).style.backgroundColor = "#4F46E5")
                        }
                      >
                        See what they sent you →
                      </button>
                    </div>
                  </div>
                )}

                {/* ── CARD 1: The Document ── */}
                {step === 1 && (
                  <div style={{ position: "relative" }}>
                    {/* Sticky note */}
                    <div
                      style={{
                        position: "absolute",
                        top: "-16px",
                        right: "32px",
                        zIndex: 20,
                        backgroundColor: "#FEF9C3",
                        boxShadow: "1px 3px 8px rgba(0,0,0,0.18)",
                        padding: "12px 16px",
                        maxWidth: "196px",
                        borderRadius: "2px",
                        transform: "rotate(2deg)",
                      }}
                    >
                      <p
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "14px",
                          fontWeight: 400,
                          color: "#3D2A00",
                          lineHeight: "1.5",
                          margin: 0,
                          fontStyle: "italic",
                        }}
                      >
                        Kira flagged this. Read before the call.
                      </p>
                    </div>

                    {/* Paper sheet */}
                    <div
                      style={{
                        position: "relative",
                        backgroundColor: "#FFFEF7",
                        borderRadius: "16px 0 16px 16px",
                        overflow: "hidden",
                      }}
                    >
                      {/* Paper grain texture overlay */}
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)' opacity='0.035'/%3E%3C/svg%3E")`,
                          backgroundRepeat: "repeat",
                          backgroundSize: "300px 300px",
                          pointerEvents: "none",
                          zIndex: 1,
                          borderRadius: "inherit",
                        }}
                      />

                      {/* Folded corner — top right */}
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          width: 0,
                          height: 0,
                          borderStyle: "solid",
                          borderWidth: "0 41px 41px 0",
                          borderColor: `transparent #D1C9A8 transparent transparent`,
                          zIndex: 3,
                        }}
                      />
                      {/* Fold shadow triangle */}
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          width: 0,
                          height: 0,
                          borderStyle: "solid",
                          borderWidth: "41px 0 0 41px",
                          borderColor: `transparent transparent transparent rgba(0,0,0,0.08)`,
                          zIndex: 2,
                        }}
                      />

                      {/* Left margin rule */}
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          left: "60px",
                          bottom: 0,
                          width: "1px",
                          backgroundColor: "rgba(220, 180, 160, 0.35)",
                          zIndex: 1,
                          pointerEvents: "none",
                        }}
                      />

                      {/* Paper content */}
                      <div
                        style={{
                          position: "relative",
                          zIndex: 2,
                          padding: "32px 32px 32px 74px",
                        }}
                      >
                        {/* Letterhead */}
                        <div
                          style={{
                            borderBottom: "1.5px solid #E8E0CC",
                            paddingBottom: "16px",
                            marginBottom: "22px",
                          }}
                        >
                          <p
                            style={{
                              fontFamily: "Georgia, serif",
                              fontSize: "12px",
                              color: "#8B7355",
                              letterSpacing: "0.08em",
                              textTransform: "uppercase",
                              margin: "0 0 4px 0",
                            }}
                          >
                            Clearwater Indigenous Youth Foundation
                          </p>
                          <p
                            style={{
                              fontFamily: "Georgia, serif",
                              fontSize: "18px",
                              fontWeight: 700,
                              color: "#1C1410",
                              margin: "0 0 4px 0",
                              letterSpacing: "-0.01em",
                            }}
                          >
                            Draft — Annual Community Impact Report 2025
                          </p>
                          <div
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "6px",
                              backgroundColor: "#F0EBE0",
                              border: "1px solid #D4C9A8",
                              borderRadius: "50px",
                              padding: "3px 10px",
                              marginTop: "2px",
                            }}
                          >
                            <div
                              style={{
                                width: "5px",
                                height: "5px",
                                borderRadius: "50%",
                                backgroundColor: "#8B7355",
                                flexShrink: 0,
                              }}
                            />
                            <span
                              style={{
                                fontFamily: "Georgia, serif",
                                fontSize: "11px",
                                color: "#6B5A3A",
                                letterSpacing: "0.04em",
                                fontStyle: "italic",
                              }}
                            >
                              AI-generated · Internal review only
                            </span>
                          </div>
                        </div>

                        {/* Body text */}
                        <p
                          style={{
                            fontFamily: "Georgia, serif",
                            fontSize: "16px",
                            lineHeight: "1.85",
                            color: "#2C2416",
                            margin: "0 0 32px 0",
                          }}
                        >
                          The organization delivered programming to{" "}
                          <strong>847 youth participants</strong> across{" "}
                          <strong>12 community-based initiatives</strong> during
                          the 2025 fiscal year. Engagement metrics improved by{" "}
                          <strong>23% year-over-year</strong>, reflecting
                          strengthened outreach capacity and increased program
                          retention rates. Strategic partnerships with four
                          regional stakeholders enabled expanded service
                          delivery and resource optimization across{" "}
                          <strong>target demographics</strong>.
                        </p>

                        {/* Faint ruled lines behind text — decorative */}
                        <div
                          style={{
                            position: "absolute",
                            inset: "80px 0 0 0",
                            zIndex: -1,
                            pointerEvents: "none",
                          }}
                        >
                          {Array.from({ length: 12 }).map((_, i) => (
                            <div
                              key={i}
                              style={{
                                height: "1px",
                                backgroundColor: "rgba(180, 160, 120, 0.12)",
                                marginBottom: "25.9px",
                              }}
                            />
                          ))}
                        </div>

                        <button
                          onClick={advance}
                          style={{
                            width: "100%",
                            padding: "16px 28px",
                            borderRadius: "50px",
                            border: "none",
                            backgroundColor: "#4F46E5",
                            color: "#FFFFFF",
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "18px",
                            fontWeight: 600,
                            cursor: "pointer",
                            transition: "background-color 0.15s ease",
                          }}
                          onMouseEnter={(e) =>
                            ((
                              e.currentTarget as HTMLButtonElement
                            ).style.backgroundColor = "#4338CA")
                          }
                          onMouseLeave={(e) =>
                            ((
                              e.currentTarget as HTMLButtonElement
                            ).style.backgroundColor = "#4F46E5")
                          }
                        >
                          Two quick questions →
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── CARD 2: Q1 ── */}
                {step === 2 && (
                  <div style={{ padding: "41px 41px 37px" }}>
                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "13px",
                        fontWeight: 700,
                        color: "#4B5563",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        margin: "0 0 24px 0",
                      }}
                    >
                      Before you join —
                    </p>
                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "18px",
                        fontWeight: 600,
                        color: "#111827",
                        margin: "0 0 18px 0",
                        lineHeight: "1.5",
                      }}
                    >
                      What kind of work sounds most like you right now?
                    </p>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "12px",
                        marginBottom: "37px",
                      }}
                    >
                      {Q1_OPTIONS.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => {
                            setQ1(opt);
                            setPulsingPill(opt);
                            setTimeout(() => setPulsingPill(null), 450);
                          }}
                          style={{
                            padding: "10px 18px",
                            borderRadius: "50px",
                            border:
                              q1 === opt
                                ? "2px solid #4F46E5"
                                : opt === "I'm still figuring that out"
                                  ? "2px dashed #9CA3AF"
                                  : "2px solid #9CA3AF",
                            backgroundColor: q1 === opt ? "#EEF2FF" : "#FFFFFF",
                            color:
                              q1 === opt
                                ? "#4338CA"
                                : opt === "I'm still figuring that out"
                                  ? "#6B7280"
                                  : "#1F2937",
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "16px",
                            fontWeight: q1 === opt ? 600 : 400,
                            cursor: "pointer",
                            transition: "all 0.15s ease",
                            lineHeight: "1.4",
                            animation:
                              pulsingPill === opt
                                ? "pill-pulse 0.42s ease"
                                : "none",
                          }}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={advance}
                      disabled={!q1}
                      style={{
                        width: "100%",
                        padding: "16px 28px",
                        borderRadius: "50px",
                        border: "none",
                        backgroundColor: q1 ? "#4F46E5" : "#C7D2FE",
                        color: "#FFFFFF",
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "18px",
                        fontWeight: 600,
                        cursor: q1 ? "pointer" : "default",
                        transition: "background-color 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        if (q1)
                          (
                            e.currentTarget as HTMLButtonElement
                          ).style.backgroundColor = "#4338CA";
                      }}
                      onMouseLeave={(e) => {
                        if (q1)
                          (
                            e.currentTarget as HTMLButtonElement
                          ).style.backgroundColor = "#4F46E5";
                      }}
                    >
                      Next →
                    </button>
                  </div>
                )}

                {/* ── CARD 3: Q2 ── */}
                {step === 3 && (
                  <div style={{ padding: "41px 41px 37px" }}>
                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "13px",
                        fontWeight: 700,
                        color: "#4B5563",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        margin: "0 0 24px 0",
                      }}
                    >
                      Almost there —
                    </p>
                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "18px",
                        fontWeight: 600,
                        color: "#111827",
                        margin: "0 0 18px 0",
                        lineHeight: "1.5",
                      }}
                    >
                      When you disagree with someone in a group, you usually…
                    </p>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "12px",
                        marginBottom: "37px",
                      }}
                    >
                      {Q2_OPTIONS.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => {
                            setQ2(opt);
                            setPulsingPill(opt);
                            setTimeout(() => setPulsingPill(null), 450);
                          }}
                          style={{
                            padding: "10px 18px",
                            borderRadius: "50px",
                            border:
                              q2 === opt
                                ? "2px solid #4F46E5"
                                : "2px solid #9CA3AF",
                            backgroundColor: q2 === opt ? "#EEF2FF" : "#FFFFFF",
                            color: q2 === opt ? "#4338CA" : "#1F2937",
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "16px",
                            fontWeight: q2 === opt ? 600 : 400,
                            cursor: "pointer",
                            transition: "all 0.15s ease",
                            lineHeight: "1.4",
                            animation:
                              pulsingPill === opt
                                ? "pill-pulse 0.42s ease"
                                : "none",
                          }}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={handleReady}
                      disabled={!q2 || connecting}
                      style={{
                        width: "100%",
                        padding: "16px 28px",
                        borderRadius: "50px",
                        border: "none",
                        backgroundColor:
                          q2 && !connecting ? "#4F46E5" : "#C7D2FE",
                        color: "#FFFFFF",
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "18px",
                        fontWeight: 600,
                        cursor: q2 && !connecting ? "pointer" : "default",
                        transition: "background-color 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        if (q2 && !connecting)
                          (
                            e.currentTarget as HTMLButtonElement
                          ).style.backgroundColor = "#4338CA";
                      }}
                      onMouseLeave={(e) => {
                        if (q2 && !connecting)
                          (
                            e.currentTarget as HTMLButtonElement
                          ).style.backgroundColor = "#4F46E5";
                      }}
                    >
                      {connecting
                        ? "Connecting you to the team…"
                        : "Ready to join"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Skip */}
      <button
        onClick={onSkipToDashboard}
        style={{
          marginTop: "36px",
          background: "none",
          border: "none",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "15px",
          fontWeight: 400,
          color: "rgba(255,255,255,0.35)",
          cursor: "pointer",
          padding: "8px",
          transition: "color 0.15s ease",
          zIndex: 20,
        }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLButtonElement).style.color =
            "rgba(255,255,255,0.65)")
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLButtonElement).style.color =
            "rgba(255,255,255,0.35)")
        }
      >
        Skip — go to my dashboard
      </button>
    </div>
  );
};

export default WaypointPrepRoom;
