import React, { useState, useEffect } from "react";

interface WaypointPrepRoomProps {
  onReady: () => void;
  onSkipToDashboard: () => void;
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

const WaypointPrepRoom: React.FC<WaypointPrepRoomProps> = ({
  onReady,
  onSkipToDashboard,
}) => {
  const [q1, setQ1] = useState<string | null>(null);
  const [q2, setQ2] = useState<string | null>(null);
  const [preparing, setPreparing] = useState(true);
  const [connecting, setConnecting] = useState(false);

  const bothAnswered = q1 !== null && q2 !== null;

  useEffect(() => {
    const timer = setTimeout(() => setPreparing(false), 1600);
    return () => clearTimeout(timer);
  }, []);

  const handleReady = () => {
    if (!bothAnswered) return;
    setConnecting(true);
    setTimeout(() => onReady(), 1400);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background: "linear-gradient(180deg, #0D1F3C 0%, #1A3569 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "48px",
        paddingBottom: "64px",
        overflowY: "auto",
      }}
    >
      {/* Preparing indicator */}
      <div
        style={{
          height: "28px",
          marginBottom: "28px",
          transition: "opacity 0.6s ease",
          opacity: preparing ? 1 : 0,
        }}
      >
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "13px",
            fontWeight: 400,
            color: "#93C5FD",
            letterSpacing: "0.04em",
          }}
        >
          Preparing your session…
        </span>
      </div>

      {/* Content column */}
      <div
        style={{
          width: "100%",
          maxWidth: "620px",
          padding: "0 20px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {/* ── SECTION 1: Context Card ── */}
        <div
          style={{
            backgroundColor: "#FAFAF8",
            borderRadius: "14px",
            padding: "28px 32px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.28)",
          }}
        >
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "11px",
              fontWeight: 600,
              color: "#9CA3AF",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              margin: "0 0 12px 0",
            }}
          >
            The situation
          </p>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "16px",
              lineHeight: "1.7",
              color: "#1F2937",
              fontWeight: 400,
              margin: "0 0 14px 0",
            }}
          >
            The nonprofit runs programs for Indigenous youth in the community.
            Their annual report goes to funders, government partners, and the
            community itself.
          </p>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "16px",
              lineHeight: "1.7",
              color: "#1F2937",
              fontWeight: 400,
              margin: "0 0 14px 0",
            }}
          >
            Dev, the communications coordinator, used an AI tool to generate a
            draft. Kira, the program director, thinks the draft is missing
            something important. They disagree.
          </p>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "16px",
              lineHeight: "1.7",
              color: "#1F2937",
              fontWeight: 500,
              margin: 0,
            }}
          >
            You're the newest team member. They want your take before the call.
          </p>
        </div>

        {/* ── SECTION 2: Document Preview ── */}
        <div style={{ position: "relative" }}>
          {/* Sticky note — offset on top-right */}
          <div
            style={{
              position: "absolute",
              top: "-10px",
              right: "12px",
              zIndex: 2,
              backgroundColor: "#FEF9C3",
              boxShadow: "1px 2px 6px rgba(0,0,0,0.18)",
              padding: "10px 14px",
              maxWidth: "190px",
              borderRadius: "2px",
              transform: "rotate(1.5deg)",
            }}
          >
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "12.5px",
                fontWeight: 400,
                color: "#3D2A00",
                lineHeight: "1.5",
                margin: 0,
                fontStyle: "italic",
              }}
            >
              Kira flagged this draft. Read it before the call.
            </p>
          </div>

          {/* Document card */}
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "10px",
              border: "1px solid #E5E7EB",
              boxShadow:
                "0 4px 20px rgba(0,0,0,0.22), 0 1px 4px rgba(0,0,0,0.1)",
              overflow: "hidden",
            }}
          >
            {/* Document letterhead */}
            <div
              style={{
                borderBottom: "1px solid #E5E7EB",
                padding: "18px 28px 14px",
                backgroundColor: "#F9FAFB",
              }}
            >
              <p
                style={{
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  fontSize: "11px",
                  fontWeight: 400,
                  color: "#6B7280",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  margin: "0 0 4px 0",
                }}
              >
                Clearwater Indigenous Youth Foundation
              </p>
              <p
                style={{
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "#111827",
                  margin: "0 0 2px 0",
                  letterSpacing: "-0.01em",
                }}
              >
                Draft — Annual Community Impact Report 2025
              </p>
              <p
                style={{
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  fontSize: "11px",
                  color: "#9CA3AF",
                  margin: 0,
                }}
              >
                AI-generated draft · For internal review only
              </p>
            </div>

            {/* Document body */}
            <div style={{ padding: "22px 28px" }}>
              <p
                style={{
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  fontSize: "14.5px",
                  lineHeight: "1.75",
                  color: "#374151",
                  margin: 0,
                }}
              >
                "The organization delivered programming to{" "}
                <strong>847 youth participants</strong> across{" "}
                <strong>12 community-based initiatives</strong> during the 2025
                fiscal year. Engagement metrics improved by{" "}
                <strong>23% year-over-year</strong>, reflecting strengthened
                outreach capacity and increased program retention rates.
                Strategic partnerships with four regional stakeholders enabled
                expanded service delivery and resource optimization across{" "}
                <strong>target demographics</strong>."
              </p>
            </div>
          </div>
        </div>

        {/* ── SECTION 3: Baseline Questions ── */}
        <div
          style={{
            backgroundColor: "#FAFAF8",
            borderRadius: "14px",
            padding: "28px 32px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.28)",
          }}
        >
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "11px",
              fontWeight: 600,
              color: "#9CA3AF",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              margin: "0 0 20px 0",
            }}
          >
            Before you join the call —
          </p>

          {/* Question 1 */}
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "15px",
              fontWeight: 500,
              color: "#1F2937",
              margin: "0 0 12px 0",
              lineHeight: "1.5",
            }}
          >
            What kind of work sounds most like you right now?
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              marginBottom: "24px",
            }}
          >
            {Q1_OPTIONS.map((opt) => (
              <button
                key={opt}
                onClick={() => setQ1(opt)}
                style={{
                  padding: "9px 16px",
                  borderRadius: "50px",
                  border:
                    q1 === opt ? "1.5px solid #2563EB" : "1.5px solid #D1D5DB",
                  backgroundColor: q1 === opt ? "#EFF6FF" : "#FFFFFF",
                  color: q1 === opt ? "#1D4ED8" : "#374151",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "13.5px",
                  fontWeight: q1 === opt ? 500 : 400,
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  lineHeight: "1.3",
                }}
              >
                {opt}
              </button>
            ))}
          </div>

          {/* Question 2 */}
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "15px",
              fontWeight: 500,
              color: "#1F2937",
              margin: "0 0 12px 0",
              lineHeight: "1.5",
            }}
          >
            When you disagree with someone in a group, you usually…
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
            }}
          >
            {Q2_OPTIONS.map((opt) => (
              <button
                key={opt}
                onClick={() => setQ2(opt)}
                style={{
                  padding: "9px 16px",
                  borderRadius: "50px",
                  border:
                    q2 === opt ? "1.5px solid #2563EB" : "1.5px solid #D1D5DB",
                  backgroundColor: q2 === opt ? "#EFF6FF" : "#FFFFFF",
                  color: q2 === opt ? "#1D4ED8" : "#374151",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "13.5px",
                  fontWeight: q2 === opt ? 500 : 400,
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  lineHeight: "1.3",
                }}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <button
            onClick={handleReady}
            disabled={!bothAnswered || connecting}
            style={{
              width: "100%",
              padding: "16px 24px",
              borderRadius: "50px",
              border: "none",
              backgroundColor:
                bothAnswered && !connecting ? "#2563EB" : "#93C5FD",
              color: "#FFFFFF",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "17px",
              fontWeight: 600,
              letterSpacing: "-0.01em",
              cursor: bothAnswered && !connecting ? "pointer" : "default",
              transition: "background-color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              if (bothAnswered && !connecting)
                (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                  "#1D4ED8";
            }}
            onMouseLeave={(e) => {
              if (bothAnswered && !connecting)
                (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                  "#2563EB";
            }}
          >
            {connecting ? "Connecting you to the team…" : "Ready to join"}
          </button>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              onClick={onSkipToDashboard}
              style={{
                background: "none",
                border: "none",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "14px",
                fontWeight: 400,
                color: "#64748B",
                cursor: "pointer",
                padding: "8px 4px",
                transition: "color 0.15s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "#CBD5E1";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "#64748B";
              }}
            >
              Skip — go to my dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaypointPrepRoom;
