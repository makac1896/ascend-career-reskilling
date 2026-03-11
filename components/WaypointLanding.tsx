import React from "react";

interface WaypointLandingProps {
  onJoinCall: () => void;
  onSkipToDashboard: () => void;
}

const WaypointLanding: React.FC<WaypointLandingProps> = ({
  onJoinCall,
  onSkipToDashboard,
}) => {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(180deg, #0D1F3C 0%, #1A3569 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient depth — warm radial glow + accent blobs */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "900px",
          height: "600px",
          background:
            "radial-gradient(ellipse at center, rgba(99,102,241,0.15) 0%, rgba(79,70,229,0.05) 45%, transparent 70%)",
          filter: "blur(56px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "20%",
          right: "8%",
          width: "320px",
          height: "320px",
          background:
            "radial-gradient(circle, rgba(251,191,36,0.08) 0%, transparent 70%)",
          filter: "blur(72px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "18%",
          left: "5%",
          width: "280px",
          height: "280px",
          background:
            "radial-gradient(circle, rgba(139,92,246,0.09) 0%, transparent 70%)",
          filter: "blur(64px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Card */}
      <div
        style={{
          width: "100%",
          maxWidth: "600px",
          margin: "0 24px",
          backgroundColor: "#FFFFFF",
          borderRadius: "22px",
          padding: "48px 56px 44px",
          boxShadow:
            "0 8px 48px rgba(0, 0, 0, 0.36), 0 2px 8px rgba(0, 0, 0, 0.18)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Video call illustration */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "28px",
          }}
        >
          <svg
            width='162'
            height='129'
            viewBox='0 0 140 112'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            {/* Monitor bezel */}
            <rect
              x='3'
              y='3'
              width='134'
              height='86'
              rx='9'
              fill='#EFF6FF'
              stroke='#BFDBFE'
              strokeWidth='1.5'
            />
            {/* Screen area — dark call bg */}
            <rect x='8' y='8' width='124' height='76' rx='5' fill='#0D1F3C' />
            {/* Left participant tile */}
            <rect
              x='9'
              y='9'
              width='60'
              height='74'
              rx='3'
              fill='#1E3A8A'
              opacity='0.8'
            />
            {/* Left person — head */}
            <circle cx='39' cy='32' r='12' fill='#93C5FD' />
            {/* Left person — shoulders */}
            <ellipse cx='39' cy='59' rx='18' ry='14' fill='#3B82F6' />
            {/* Left name chip */}
            <rect
              x='12'
              y='72'
              width='22'
              height='6'
              rx='3'
              fill='#2563EB'
              opacity='0.9'
            />
            {/* Right participant tile */}
            <rect
              x='71'
              y='9'
              width='60'
              height='74'
              rx='3'
              fill='#172554'
              opacity='0.9'
            />
            {/* Right person — head */}
            <circle cx='101' cy='32' r='12' fill='#BFDBFE' />
            {/* Right person — shoulders */}
            <ellipse cx='101' cy='59' rx='18' ry='14' fill='#60A5FA' />
            {/* Right name chip */}
            <rect
              x='74'
              y='72'
              width='22'
              height='6'
              rx='3'
              fill='#1D4ED8'
              opacity='0.7'
            />
            {/* Bottom call toolbar */}
            <rect
              x='8'
              y='72'
              width='124'
              height='13'
              rx='0'
              fill='#030712'
              opacity='0.75'
            />
            <rect
              x='8'
              y='79'
              width='124'
              height='5'
              rx='0'
              fill='#030712'
              opacity='0.75'
            />
            {/* Toolbar rounded bottom */}
            <path
              d='M8 79 L8 84 Q8 84 13 84 L127 84 Q132 84 132 79 L132 72 L8 72 Z'
              fill='#030712'
              opacity='0.75'
            />
            {/* Video camera icon — toolbar left */}
            <rect
              x='47'
              y='74'
              width='10'
              height='7'
              rx='1.5'
              fill='white'
              opacity='0.85'
            />
            <path
              d='M57 75.5 L62 73.5 L62 79.5 L57 77.5 Z'
              fill='white'
              opacity='0.85'
            />
            {/* Mic icon — toolbar center */}
            <rect
              x='68'
              y='73.5'
              width='5'
              height='7'
              rx='2.5'
              fill='white'
              opacity='0.85'
            />
            <path
              d='M65.5 78.5 Q65.5 83 70.5 83 Q75.5 83 75.5 78.5'
              stroke='white'
              strokeWidth='1.2'
              fill='none'
              opacity='0.85'
            />
            <line
              x1='70.5'
              y1='83'
              x2='70.5'
              y2='85'
              stroke='white'
              strokeWidth='1.2'
              opacity='0.85'
            />
            {/* Red end-call button — toolbar right */}
            <circle cx='101' cy='77.5' r='5.5' fill='#EF4444' />
            <rect
              x='97.5'
              y='76.5'
              width='7'
              height='2.5'
              rx='1.25'
              fill='white'
              transform='rotate(-30 101 77.5)'
            />
            {/* Active call green dot */}
            <circle cx='127' cy='13' r='4' fill='#22C55E' />
            <circle cx='127' cy='13' r='2.2' fill='#4ADE80' />
            {/* Camera notch top bezel */}
            <circle cx='70' cy='5.5' r='1.8' fill='#BFDBFE' />
            {/* Monitor stand neck */}
            <rect x='64' y='89' width='12' height='11' rx='1' fill='#BFDBFE' />
            {/* Monitor base */}
            <rect
              x='50'
              y='100'
              width='40'
              height='5'
              rx='2.5'
              fill='#BFDBFE'
            />
          </svg>
        </div>

        {/* Eyebrow */}
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "13px",
            fontWeight: 600,
            color: "#2563EB",
            letterSpacing: "0.09em",
            textTransform: "uppercase",
            margin: "0 0 14px 0",
          }}
        >
          Live simulation
        </p>

        {/* Header */}
        <h1
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "32px",
            fontWeight: 700,
            color: "#111827",
            lineHeight: "1.2",
            letterSpacing: "-0.02em",
            margin: "0 0 28px 0",
          }}
        >
          Before you step in.
        </h1>

        {/* Scenario block — bordered */}
        <div
          style={{
            borderLeft: "4px solid #93C5FD",
            backgroundColor: "#F8FAFF",
            borderRadius: "0 12px 12px 0",
            padding: "24px 24px 8px 24px",
            marginBottom: "28px",
          }}
        >
          {/* Paragraph 1 — sets the scene */}
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "19px",
              lineHeight: "1.7",
              color: "#111827",
              fontWeight: 400,
              margin: "0 0 20px 0",
            }}
          >
            You've just joined a small nonprofit team. They used AI to write
            their annual community report — the one that goes to funders and
            community partners.
          </p>

          {/* Paragraph 2 — creates tension */}
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "19px",
              lineHeight: "1.7",
              color: "#111827",
              fontWeight: 500,
              letterSpacing: "-0.01em",
              margin: "0 0 20px 0",
            }}
          >
            Something doesn't feel right. The team is meeting now to figure out
            what to do.
          </p>

          {/* Paragraph 3 — the emotional peak */}
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "21px",
              lineHeight: "1.65",
              color: "#111827",
              fontWeight: 400,
              margin: "0 0 20px 0",
            }}
          >
            They asked for a fresh perspective.{" "}
            <strong style={{ fontWeight: 700 }}>You're it.</strong>
          </p>
        </div>

        {/* Simulation context note */}
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "16px",
            lineHeight: "1.6",
            color: "#6B7280",
            fontWeight: 400,
            margin: "0 0 32px 0",
          }}
        >
          Takes about 5 minutes.
        </p>

        {/* Primary CTA */}
        <button
          onClick={onJoinCall}
          style={{
            width: "100%",
            padding: "18px 28px",
            backgroundColor: "#4F46E5",
            color: "#FFFFFF",
            border: "none",
            borderRadius: "50px",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "19px",
            fontWeight: 600,
            letterSpacing: "-0.01em",
            cursor: "pointer",
            transition: "background-color 0.2s ease",
            marginBottom: "16px",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor =
              "#4338CA";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor =
              "#4F46E5";
          }}
        >
          Join the call
        </button>

        {/* Skip escape hatch */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            paddingTop: "4px",
          }}
        >
          <button
            onClick={onSkipToDashboard}
            style={{
              background: "none",
              border: "none",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "15px",
              fontWeight: 400,
              color: "#9CA3AF",
              cursor: "pointer",
              padding: "8px 4px",
              transition: "color 0.15s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "#374151";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "#9CA3AF";
            }}
          >
            Skip — go to my dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default WaypointLanding;
