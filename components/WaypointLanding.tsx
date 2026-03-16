import React, { useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  Play,
  TrendingUp,
  Compass,
  Palette,
  Zap,
  BookMarked,
  Users,
} from "lucide-react";

interface WaypointLandingProps {
  onJoinCall: () => void;
  onSkipToDashboard?: () => void;
}

// Active Scenario Hero Card
const ACTIVE_SCENARIO = {
  scenarioName: "Crisis at the Nonprofit",
  objective: "Practice Technical Assertiveness",
};

// Focus Item Cards (replacements for PILLARS)
const FOCUS_ITEMS = [
  {
    id: "skill-sprint",
    category: "REFINE",
    title: "Explain with Clarity",
    justification:
      "Analysis was solid but didn't connect to business impact → Stakeholders defaulted to skepticism. 3-min precision drill closes this gap.",
    cta: "Start 3-Min Drill",
    icon: Zap,
    accentColor: "#F59E0B",
  },
  {
    id: "practice-session",
    category: "PRACTICE",
    title: "Navigating Corporate Pushback",
    justification:
      "Softened argument under pressure (observed 2 of 3 recent calls) → Costs credibility in high-stakes rounds. Practice bot recreates the exact scenario.",
    cta: "Launch Practice Bot",
    icon: Briefcase,
    accentColor: "#C084FC",
  },
];

// Unlocked Outcomes (Evidence-Based Action Feed)
const UNLOCKED_OUTCOMES = [
  {
    id: 1,
    type: "role",
    title: "Role Match: Product Manager @ Microsoft",
    description:
      "Your profile matches this role perfectly. Critical Thinking (87th percentile) + pressure resilience. Auto-apply now and track with recruiter.",
    cta: "Quick Apply",
    accentColor: "#10B981",
    completed: true,
  },
  {
    id: 2,
    type: "invite",
    title: "Exclusive Access: AI-Native Leadership Session",
    description:
      "Invitation-only, 25 participants. You're in the top 12% on resilience under pressure. Direct access to 3 Microsoft senior leaders.",
    cta: "Accept Invite",
    accentColor: "#3B82F6",
    completed: true,
  },
  {
    id: 3,
    type: "signal",
    title: "Next Step: Assertive Communication Lab",
    description:
      "You showed strong insight, but softened your point when challenged. Practice holding your stance clearly under pressure.",
    cta: "Reserve Spot",
    accentColor: "#8B5CF6",
    completed: false,
  },
];

const NAV_ITEMS = [
  {
    icon: Palette,
    label: "Canvas",
    id: "canvas",
    subtitle: "Profile & Signals",
  },
  {
    icon: Play,
    label: "Lab",
    id: "lab",
    subtitle: "Simulations",
  },
  {
    icon: BookMarked,
    label: "Journal",
    id: "journal",
    subtitle: "Reflection",
  },
  {
    icon: Users,
    label: "Connection Hub",
    id: "hub",
    subtitle: "10k Coffees",
  },
];

const WaypointLanding: React.FC<WaypointLandingProps> = ({ onJoinCall }) => {
  const [activeNav, setActiveNav] = useState("canvas");

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background:
          "linear-gradient(180deg, #0D1F3C 0%, #132A54 52%, #18376D 100%)",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'DM Sans', sans-serif",
        display: "flex",
      }}
    >
      {/* Background Blurs */}
      <div
        style={{
          position: "absolute",
          top: "8%",
          left: "10%",
          width: "460px",
          height: "460px",
          background:
            "radial-gradient(circle, rgba(99,102,241,0.18) 0%, rgba(99,102,241,0.03) 62%, transparent 72%)",
          filter: "blur(32px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "18%",
          right: "4%",
          width: "340px",
          height: "340px",
          background:
            "radial-gradient(circle, rgba(251,191,36,0.12) 0%, transparent 72%)",
          filter: "blur(44px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          left: "32%",
          width: "420px",
          height: "420px",
          background:
            "radial-gradient(circle, rgba(56,189,248,0.11) 0%, transparent 72%)",
          filter: "blur(50px)",
          pointerEvents: "none",
        }}
      />

      {/* LEFT SIDEBAR - Glassy Navigation */}
      <aside
        style={{
          width: "240px",
          height: "100vh",
          padding: "24px",
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          borderRight: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "12px",
              backgroundColor: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(14px)",
            }}
          >
            <Compass size={20} style={{ color: "#FFFFFF" }} />
          </div>
          <p
            style={{
              fontSize: "14px",
              fontWeight: 700,
              color: "rgba(255,255,255,0.9)",
              margin: 0,
            }}
          >
            Waypoint
          </p>
        </div>

        {/* Navigation Items */}
        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            marginTop: "32px",
          }}
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeNav === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                style={{
                  display: "block",
                  padding: "0",
                  border: "none",
                  backgroundColor: "transparent",
                  color: isActive ? "#FFFFFF" : "rgba(255,255,255,0.7)",
                  fontSize: "22px",
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all 0.2s",
                  position: "relative",
                  textAlign: "left",
                  letterSpacing: "-0.01em",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#FFFFFF";
                  if (!isActive) {
                    e.currentTarget.style.opacity = "0.85";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = isActive
                    ? "#FFFFFF"
                    : "rgba(255,255,255,0.7)";
                  if (!isActive) {
                    e.currentTarget.style.opacity = "1";
                  }
                }}
              >
                {item.label}
                {isActive && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: "-4px",
                      left: "0",
                      height: "2px",
                      width: "100%",
                      backgroundColor: "#4F46E5",
                      borderRadius: "1px",
                    }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* User Info */}
        <div
          style={{
            marginTop: "auto",
            paddingTop: "24px",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              background: "linear-gradient(145deg, #C7D2FE 0%, #E9D5FF 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: "16px",
              color: "#312E81",
            }}
          >
            A
          </div>
          <div>
            <p
              style={{
                margin: 0,
                fontSize: "13px",
                fontWeight: 600,
                color: "#FFFFFF",
              }}
            >
              Aiyana
            </p>
            <p
              style={{
                margin: "2px 0 0",
                fontSize: "11px",
                color: "rgba(255,255,255,0.6)",
              }}
            >
              3rd year
            </p>
          </div>
        </div>
      </aside>

      {/* CENTER - Active Scenario Hero & Focus Items */}
      <main
        style={{
          flex: 1,
          padding: "32px",
          overflowY: "auto",
          position: "relative",
          zIndex: 5,
        }}
      >
        <div style={{ maxWidth: "600px" }}>
          {/* GREETING HEADER */}
          <div style={{ marginBottom: "32px" }}>
            <h1
              style={{
                fontSize: "32px",
                fontWeight: 700,
                color: "#FFFFFF",
                margin: "0 0 12px",
                letterSpacing: "-0.02em",
              }}
            >
              Welcome back, Aiyana.
            </h1>
            <p
              style={{
                fontSize: "16px",
                color: "rgba(255,255,255,0.75)",
                margin: 0,
                lineHeight: 1.6,
              }}
            >
              Ready to sharpen your resilience?
            </p>
          </div>

          {/* HERO CARD - Active Scenario */}
          <div
            style={{
              borderRadius: "16px",
              border: "1px solid rgba(255,255,255,0.16)",
              backgroundColor: "#173A6F",
              backgroundImage:
                "radial-gradient(circle at 74% 18%, rgba(120,120,130,0.3) 0%, rgba(120,120,130,0) 35%), radial-gradient(circle at 90% 14%, rgba(125,125,135,0.26) 0%, rgba(125,125,135,0) 30%), linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
              backgroundSize: "auto, auto, 28px 28px, 28px 28px",
              backdropFilter: "blur(8px)",
              padding: "20px",
              marginBottom: "40px",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
              boxShadow: "0 10px 26px rgba(0, 0, 0, 0.28)",
            }}
          >
            <div style={{ position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  top: "-2px",
                  right: "-4px",
                  padding: "6px 12px",
                  borderRadius: "999px",
                  border: "1px solid rgba(255,255,255,0.25)",
                  backgroundColor: "rgba(122,124,215,0.3)",
                  color: "rgba(255,255,255,0.9)",
                  fontSize: "12px",
                  fontWeight: 600,
                }}
              >
                In progress
              </div>
              <p
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.62)",
                  margin: "0 0 8px",
                }}
              >
                Active Scenario
              </p>
              <h2
                style={{
                  fontSize: "38px",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  margin: "0 0 6px",
                  letterSpacing: "-0.02em",
                }}
              >
                {ACTIVE_SCENARIO.scenarioName}
              </h2>
              <p
                style={{
                  fontSize: "20px",
                  color: "rgba(255,255,255,0.8)",
                  margin: 0,
                }}
              >
                Objective: {ACTIVE_SCENARIO.objective}
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                gap: "12px",
                alignItems: "end",
              }}
            >
              {[
                { value: "42%", label: "Complete" },
                { value: "3", label: "Decisions made" },
                { value: "2", label: "Left" },
              ].map((stat, idx) => (
                <div
                  key={stat.label}
                  style={{
                    paddingRight: idx < 2 ? "10px" : 0,
                    borderRight:
                      idx < 2 ? "1px solid rgba(255,255,255,0.14)" : "none",
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      color: "#FFFFFF",
                      fontSize: "31px",
                      fontWeight: 700,
                      lineHeight: 1.1,
                    }}
                  >
                    {stat.value}
                  </p>
                  <p
                    style={{
                      margin: "2px 0 0",
                      color: "rgba(255,255,255,0.65)",
                      fontSize: "14px",
                      fontWeight: 600,
                    }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <div style={{ marginTop: "2px" }}>
              <div
                style={{
                  height: "6px",
                  width: "100%",
                  borderRadius: "999px",
                  backgroundColor: "rgba(255,255,255,0.2)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: "42%",
                    height: "100%",
                    backgroundColor: "#6366F1",
                    borderRadius: "999px",
                  }}
                />
              </div>
              <p
                style={{
                  margin: "6px 0 0",
                  textAlign: "right",
                  fontSize: "12px",
                  color: "rgba(255,255,255,0.62)",
                  fontWeight: 600,
                }}
              >
                42%
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
              }}
            >
              <button
                onClick={onJoinCall}
                style={{
                  padding: "12px 18px",
                  borderRadius: "12px",
                  border: "1px solid rgba(255,255,255,0.28)",
                  backgroundColor: "rgba(10,15,28,0.28)",
                  color: "#FFFFFF",
                  fontSize: "16px",
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(10,15,28,0.38)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(10,15,28,0.28)";
                }}
              >
                <Play size={16} />
                Resume simulation
              </button>
              <button
                onClick={onJoinCall}
                style={{
                  padding: "12px 18px",
                  borderRadius: "12px",
                  border: "1px solid rgba(255,255,255,0.28)",
                  backgroundColor: "rgba(10,15,28,0.2)",
                  color: "#FFFFFF",
                  fontSize: "16px",
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(10,15,28,0.32)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(10,15,28,0.2)";
                }}
              >
                Start new
              </button>
            </div>
          </div>

          {/* ALTERNATIVE PATHS - Quick-Win Cards */}
          <div style={{ marginTop: "48px" }}>
            <p
              style={{
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#FFFFFF",
                margin: "0 0 20px",
              }}
            >
              Or explore other paths
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "24px",
                maxWidth: "900px",
                width: "100%",
                justifyItems: "center",
              }}
            >
              {/* Jobs Card */}
              <div
                style={{
                  borderRadius: "16px",
                  border: "none",
                  backgroundColor: "#3B5BDB",
                  backdropFilter: "none",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  height: "100%",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.12)",
                }}
              >
                <div>
                  <p
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "rgba(255, 255, 255, 0.7)",
                      margin: "0 0 8px",
                    }}
                  >
                    Career
                  </p>
                  <h4
                    style={{
                      fontSize: "16px",
                      fontWeight: 700,
                      color: "#FFFFFF",
                      margin: 0,
                      lineHeight: 1.3,
                    }}
                  >
                    Jobs
                  </h4>
                </div>
                <p
                  style={{
                    fontSize: "13px",
                    color: "rgba(255, 255, 255, 0.85)",
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  Explore opportunities matched to your profile and career
                  goals.
                </p>
                <button
                  style={{
                    marginTop: "auto",
                    padding: "12px 20px",
                    borderRadius: "8px",
                    border: "none",
                    backgroundColor: "#FFFFFF",
                    color: "#3B5BDB",
                    fontSize: "13px",
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all 0.2s",
                    width: "100%",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 12px rgba(0, 0, 0, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 2px 8px rgba(0, 0, 0, 0.15)";
                  }}
                >
                  Browse Jobs
                </button>
              </div>

              {/* Skills Card */}
              <div
                style={{
                  borderRadius: "16px",
                  border: "none",
                  backgroundColor: "#3B5BDB",
                  backdropFilter: "none",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  height: "100%",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.12)",
                }}
              >
                <div>
                  <p
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "rgba(255, 255, 255, 0.7)",
                      margin: "0 0 8px",
                    }}
                  >
                    Development
                  </p>
                  <h4
                    style={{
                      fontSize: "16px",
                      fontWeight: 700,
                      color: "#FFFFFF",
                      margin: 0,
                      lineHeight: 1.3,
                    }}
                  >
                    Skills
                  </h4>
                </div>
                <p
                  style={{
                    fontSize: "13px",
                    color: "rgba(255, 255, 255, 0.85)",
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  Master new abilities and build competencies for your next
                  role.
                </p>
                <button
                  style={{
                    marginTop: "auto",
                    padding: "12px 20px",
                    borderRadius: "8px",
                    border: "none",
                    backgroundColor: "#FFFFFF",
                    color: "#3B5BDB",
                    fontSize: "13px",
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all 0.2s",
                    width: "100%",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 12px rgba(0, 0, 0, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 2px 8px rgba(0, 0, 0, 0.15)";
                  }}
                >
                  Learn Skills
                </button>
              </div>

              {/* Journal Card */}
              <div
                style={{
                  borderRadius: "16px",
                  border: "none",
                  backgroundColor: "#3B5BDB",
                  backdropFilter: "none",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  height: "100%",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.12)",
                }}
              >
                <div>
                  <p
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "rgba(255, 255, 255, 0.7)",
                      margin: "0 0 8px",
                    }}
                  >
                    Reflection
                  </p>
                  <h4
                    style={{
                      fontSize: "16px",
                      fontWeight: 700,
                      color: "#FFFFFF",
                      margin: 0,
                      lineHeight: 1.3,
                    }}
                  >
                    Journal
                  </h4>
                </div>
                <p
                  style={{
                    fontSize: "13px",
                    color: "rgba(255, 255, 255, 0.85)",
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  Capture insights and track your growth throughout your
                  journey.
                </p>
                <button
                  style={{
                    marginTop: "auto",
                    padding: "12px 20px",
                    borderRadius: "8px",
                    border: "none",
                    backgroundColor: "#FFFFFF",
                    color: "#3B5BDB",
                    fontSize: "13px",
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all 0.2s",
                    width: "100%",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 12px rgba(0, 0, 0, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 2px 8px rgba(0, 0, 0, 0.15)";
                  }}
                >
                  New Entry
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* RIGHT - Unlocked Outcomes Feed (Always Visible) */}
      <aside
        style={{
          width: "340px",
          height: "100vh",
          padding: "32px 28px",
          overflowY: "auto",
          position: "relative",
          zIndex: 5,
          borderLeft: "1px solid rgba(255,255,255,0.14)",
          background:
            "linear-gradient(180deg, rgba(12,24,47,0.72) 0%, rgba(16,31,58,0.52) 100%)",
          backdropFilter: "blur(8px)",
        }}
      >
        <p
          style={{
            fontSize: "14px",
            fontWeight: 900,
            letterSpacing: "0.02em",
            textTransform: "uppercase",
            color: "#FFFFFF",
            margin: "0 0 24px",
          }}
        >
          Action Items
        </p>

        <div style={{ position: "relative", paddingLeft: "32px" }}>
          {/* Vertical Progress Bar */}
          <div
            style={{
              position: "absolute",
              left: "14px",
              top: "0",
              width: "3px",
              height: `calc(${(UNLOCKED_OUTCOMES.filter((item) => item.completed).length / UNLOCKED_OUTCOMES.length) * 100}% + ${UNLOCKED_OUTCOMES.filter((item) => item.completed).length * 16}px)`,
              backgroundColor: "#4F46E5",
              borderRadius: "2px",
              transition: "height 0.4s ease",
              zIndex: 1,
              boxShadow: "0 0 8px rgba(79, 70, 229, 0.3)",
            }}
          />
          {/* Background track for progress bar */}
          <div
            style={{
              position: "absolute",
              left: "14px",
              top: "0",
              width: "3px",
              height: "100%",
              backgroundColor: "rgba(255,255,255,0.18)",
              borderRadius: "2px",
              zIndex: 0,
            }}
          />

          <div
            style={{
              display: "grid",
              gap: "16px",
              position: "relative",
              zIndex: 2,
            }}
          >
            {UNLOCKED_OUTCOMES.map((outcome) => (
              <div
                key={outcome.id}
                style={{
                  position: "relative",
                  borderRadius: "16px",
                  border: "1px solid rgba(255,255,255,0.14)",
                  backgroundColor: "transparent",
                  backdropFilter: "blur(4px)",
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
                }}
              >
                {/* Checkbox anchored to each card center */}
                <div
                  style={{
                    position: "absolute",
                    left: "-26px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    backgroundColor: outcome.completed
                      ? "#4F46E5"
                      : "rgba(15, 29, 57, 0.24)",
                    border: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "14px",
                    color: outcome.completed
                      ? "#FFFFFF"
                      : "rgba(255, 255, 255, 0.88)",
                    fontWeight: 700,
                    zIndex: 3,
                  }}
                >
                  {outcome.completed ? "✓" : "•"}
                </div>

                {/* Dot + Title */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                  }}
                >
                  <div
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      backgroundColor: outcome.accentColor,
                      marginTop: "6px",
                      flexShrink: 0,
                    }}
                  />
                  <h4
                    style={{
                      fontSize: "14px",
                      fontWeight: 700,
                      margin: 0,
                      color: "rgba(255,255,255,0.92)",
                      lineHeight: 1.4,
                    }}
                  >
                    {outcome.title}
                  </h4>
                </div>

                {/* CTA Button */}
                <button
                  style={{
                    marginLeft: "22px",
                    padding: "10px 16px",
                    borderRadius: "8px",
                    border: "none",
                    backgroundColor: outcome.accentColor,
                    color: "#FFFFFF",
                    fontSize: "12px",
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all 0.2s",
                    alignSelf: "flex-start",
                    boxShadow: "0 2px 6px " + outcome.accentColor + "40",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-1px)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 10px " + outcome.accentColor + "50";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 2px 6px " + outcome.accentColor + "40";
                  }}
                >
                  {outcome.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
};

export default WaypointLanding;
