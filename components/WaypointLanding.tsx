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
    title: "New Signal: Strategic Synthesis",
    description:
      "You connected nonprofit cash flow → customer empathy in one insight. Only 8% of your cohort demonstrates this skill consistently.",
    cta: "Unlock Masterclass",
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
    label: "Hub",
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
        <nav style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                  padding: "12px 14px",
                  borderRadius: "12px",
                  border:
                    "1px solid " +
                    (isActive
                      ? "rgba(255,255,255,0.2)"
                      : "rgba(255,255,255,0.08)"),
                  backgroundColor: isActive
                    ? "rgba(255,255,255,0.1)"
                    : "rgba(255,255,255,0.04)",
                  color: "#FFFFFF",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                  backdropFilter: "blur(10px)",
                  transition: "all 0.2s",
                  flexDirection: "column",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(255,255,255,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = isActive
                    ? "rgba(255,255,255,0.1)"
                    : "rgba(255,255,255,0.04)";
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </div>
                <p
                  style={{
                    fontSize: "10px",
                    margin: "2px 0 0 30px",
                    opacity: 0.6,
                    fontWeight: 500,
                  }}
                >
                  {item.subtitle}
                </p>
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
                margin: "0 0 16px",
                lineHeight: 1.6,
              }}
            >
              Ready to sharpen your resilience?
            </p>
            <p
              style={{
                fontSize: "14px",
                color: "rgba(255,255,255,0.6)",
                margin: 0,
              }}
            >
              You're in the middle of the Nonprofit Executive Briefing scenario.
            </p>
          </div>

          {/* HERO CARD - Active Scenario */}
          <div
            style={{
              borderRadius: "16px",
              border: "none",
              backgroundColor: "#FFFFFF",
              backdropFilter: "none",
              padding: "32px",
              marginBottom: "40px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div>
              <p
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "rgba(15, 29, 57, 0.5)",
                  margin: "0 0 8px",
                }}
              >
                Active Scenario
              </p>
              <h2
                style={{
                  fontSize: "24px",
                  fontWeight: 700,
                  color: "#0F1D39",
                  margin: "0 0 12px",
                  letterSpacing: "-0.02em",
                }}
              >
                {ACTIVE_SCENARIO.scenarioName}
              </h2>
              <p
                style={{
                  fontSize: "14px",
                  color: "rgba(15, 29, 57, 0.75)",
                  margin: 0,
                }}
              >
                Objective: {ACTIVE_SCENARIO.objective}
              </p>
            </div>
            <button
              onClick={onJoinCall}
              style={{
                alignSelf: "flex-start",
                padding: "14px 32px",
                borderRadius: "12px",
                border: "none",
                backgroundColor: "#4F46E5",
                color: "#FFFFFF",
                fontSize: "15px",
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                width: "100%",
                maxWidth: "280px",
                boxShadow: "0 4px 12px rgba(79, 70, 229, 0.3)",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 8px 16px rgba(79, 70, 229, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 4px 12px rgba(79, 70, 229, 0.3)";
              }}
            >
              <Play size={18} />
              RESUME SIMULATION
            </button>
            <button
              style={{
                alignSelf: "flex-start",
                marginTop: "8px",
                padding: "14px 32px",
                borderRadius: "12px",
                border: "1px solid rgba(15, 29, 57, 0.2)",
                backgroundColor: "rgba(15, 29, 57, 0.05)",
                color: "#0F1D39",
                fontSize: "15px",
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                width: "100%",
                maxWidth: "280px",
                transition: "all 0.2s",
                backdropFilter: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(15, 29, 57, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  "rgba(15, 29, 57, 0.05)";
              }}
            >
              <Play size={18} />
              START NEW SCENARIO
            </button>
          </div>

          {/* ALTERNATIVE PATHS - Quick-Win Cards */}
          <div style={{ marginTop: "48px" }}>
            <p
              style={{
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(15, 29, 57, 0.5)",
                margin: "0 0 20px",
              }}
            >
              Or explore other paths
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "16px",
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
          borderLeft: "2px solid rgba(79, 70, 229, 0.15)",
          background: "linear-gradient(180deg, #FFFFFF 0%, #F5F3FF 100%)",
          backdropFilter: "blur(8px)",
        }}
      >
        <p
          style={{
            fontSize: "14px",
            fontWeight: 900,
            letterSpacing: "0.02em",
            textTransform: "uppercase",
            color: "#0F1D39",
            margin: "0 0 24px",
          }}
        >
          Action Items
        </p>

        <div style={{ position: "relative", paddingLeft: "32px" }}>
          {/* Checkboxes for completed items */}
          {UNLOCKED_OUTCOMES.map((outcome, index) => (
            <div
              key={`checkbox-${outcome.id}`}
              style={{
                position: "absolute",
                left: "6px",
                top: `${16 + index * (20 + 16)}px`,
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                backgroundColor: outcome.completed ? "#4F46E5" : "transparent",
                border: outcome.completed
                  ? "none"
                  : "2px solid rgba(15, 29, 57, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "14px",
                color: "#FFFFFF",
                fontWeight: 700,
                zIndex: 3,
              }}
            >
              {outcome.completed && "✓"}
            </div>
          ))}
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
              backgroundColor: "rgba(15, 29, 57, 0.08)",
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
                  borderRadius: "16px",
                  border: "1px solid rgba(79, 70, 229, 0.1)",
                  backgroundColor: outcome.completed
                    ? "rgba(79, 70, 229, 0.08)"
                    : "rgba(255, 255, 255, 0.6)",
                  backdropFilter: "blur(4px)",
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
                }}
              >
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
                      color: "#0F1D39",
                      lineHeight: 1.4,
                    }}
                  >
                    {outcome.title}
                  </h4>
                </div>

                {/* Description - Always Visible */}
                <p
                  style={{
                    fontSize: "13px",
                    lineHeight: 1.6,
                    color: "rgba(15, 29, 57, 0.75)",
                    margin: "0 0 12px 22px",
                  }}
                >
                  {outcome.description}
                </p>

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
