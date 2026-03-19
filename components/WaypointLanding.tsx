import React, { useState } from "react";
import {
  Play,
  Briefcase,
  BookOpen,
  PenLine,
  ArrowRight,
  Sparkles,
  Users,
  Palette,
  BookMarked,
  ChevronRight,
} from "lucide-react";

interface WaypointLandingProps {
  onJoinCall: () => void;
  onSkipToDashboard?: () => void;
}

const ACTIVE_SCENARIO = {
  scenarioName: "Crisis at the Nonprofit",
  objective: "Practice Technical Assertiveness",
};

const EXPLORE_CARDS = [
  {
    id: "jobs",
    category: "Career",
    title: "Jobs",
    description: "Opportunities matched to your profile and superpowers.",
    cta: "Browse Jobs",
    icon: Briefcase,
    accent: "#4318FF",
    accentLight: "#EEF2FF",
  },
  {
    id: "skills",
    category: "Development",
    title: "Skills",
    description: "Build competencies that close the gap to your next role.",
    cta: "Learn Skills",
    icon: BookOpen,
    accent: "#7C3AED",
    accentLight: "#F5F3FF",
  },
  {
    id: "journal",
    category: "Reflection",
    title: "Journal",
    description: "Capture insights and track growth throughout your journey.",
    cta: "New Entry",
    icon: PenLine,
    accent: "#0EA5E9",
    accentLight: "#F0F9FF",
  },
];

const UNLOCKED_OUTCOMES = [
  {
    id: 1,
    title: "Role Match: Community Builder @ Microsoft",
    cta: "Quick Apply",
    accentColor: "#10B981",
    accentLight: "#ECFDF5",
    completed: true,
  },
  {
    id: 2,
    title: "Exclusive Access: AI-Native Leadership Session",
    cta: "Accept Invite",
    accentColor: "#3B82F6",
    accentLight: "#EFF6FF",
    completed: true,
  },
  {
    id: 3,
    title: "Next Step: Assertive Communication Lab",
    cta: "Reserve Spot",
    accentColor: "#8B5CF6",
    accentLight: "#F5F3FF",
    completed: false,
  },
];

const NAV_ITEMS = [
  { icon: Palette, label: "Canvas", id: "canvas" },
  { icon: Play, label: "Lab", id: "lab" },
  { icon: BookMarked, label: "Journal", id: "journal" },
  { icon: Users, label: "Connection Hub", id: "hub" },
];

const WaypointLanding: React.FC<WaypointLandingProps> = ({ onJoinCall }) => {
  const [activeNav, setActiveNav] = useState("canvas");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [hoveredAction, setHoveredAction] = useState<number | null>(null);

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background: "linear-gradient(145deg, #FFFFFF 0%, #F4F7FE 50%, #EEF2FF 100%)",
        fontFamily: "'DM Sans', sans-serif",
        display: "flex",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle decorative blobs */}
      <div style={{
        position: "absolute", top: "-80px", right: "20%", width: "500px", height: "500px",
        background: "radial-gradient(circle, rgba(67,24,255,0.05) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "-60px", left: "30%", width: "400px", height: "400px",
        background: "radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* LEFT SIDEBAR */}
      <aside style={{
        width: "220px",
        height: "100vh",
        padding: "28px 20px",
        display: "flex",
        flexDirection: "column",
        borderRight: "1px solid #E0E5F2",
        backgroundColor: "#FFFFFF",
        flexShrink: 0,
        position: "relative",
        zIndex: 10,
      }}>
        {/* Waypoint Logo */}
        <div style={{ marginBottom: "40px", paddingLeft: "4px" }}>
          <img src="/waypoint.png" alt="Waypoint" style={{ height: "56px", width: "auto" }} />
        </div>

        {/* Navigation */}
        <nav style={{ display: "flex", flexDirection: "column", gap: "4px", flex: 1 }}>
          {NAV_ITEMS.map((item) => {
            const isActive = activeNav === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 12px",
                  borderRadius: "10px",
                  border: "none",
                  backgroundColor: isActive ? "#EEF2FF" : "transparent",
                  color: isActive ? "#4318FF" : "#5A6A8A",
                  fontSize: "14px",
                  fontWeight: isActive ? 700 : 500,
                  cursor: "pointer",
                  transition: "all 0.15s",
                  textAlign: "left",
                  width: "100%",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = "#F4F7FE";
                    e.currentTarget.style.color = "#2B3674";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "#5A6A8A";
                  }
                }}
              >
                <Icon size={16} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* User info */}
        <div style={{
          paddingTop: "20px",
          borderTop: "1px solid #E0E5F2",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}>
          <div style={{
            width: "36px", height: "36px", borderRadius: "10px",
            background: "linear-gradient(135deg, #C7D2FE, #E9D5FF)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 700, fontSize: "14px", color: "#4318FF", flexShrink: 0,
          }}>A</div>
          <div>
            <p style={{ margin: 0, fontSize: "13px", fontWeight: 700, color: "#2B3674" }}>Aiyana</p>
            <p style={{ margin: "1px 0 0", fontSize: "11px", color: "#5A6A8A" }}>1st year</p>
          </div>
        </div>
      </aside>

      {/* CENTER — Main Content */}
      <main style={{
        flex: 1,
        padding: "36px 40px",
        overflowY: "auto",
        position: "relative",
        zIndex: 5,
        display: "flex",
        flexDirection: "column",
        gap: "36px",
      }}>
        {/* Greeting */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
            <Sparkles size={16} style={{ color: "#4318FF" }} />
            <p style={{ margin: 0, fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#4318FF" }}>
              Good morning
            </p>
          </div>
          <h1 style={{ margin: "0 0 6px", fontSize: "30px", fontWeight: 700, color: "#2B3674", letterSpacing: "-0.02em" }}>
            Welcome back, Aiyana.
          </h1>
          <p style={{ margin: 0, fontSize: "15px", color: "#5A6A8A", lineHeight: 1.5 }}>
            Ready to sharpen your resilience? You're 42% through your active scenario.
          </p>
        </div>

        {/* HERO CARD — Active Scenario */}
        <div style={{
          borderRadius: "20px",
          backgroundColor: "#FFFFFF",
          border: "1px solid #E0E5F2",
          boxShadow: "0 8px 32px rgba(67,24,255,0.10), 0 2px 8px rgba(0,0,0,0.04)",
          overflow: "hidden",
        }}>
          {/* Top accent bar */}
          <div style={{
            height: "4px",
            background: "linear-gradient(90deg, #4318FF 0%, #7C3AED 50%, #C084FC 100%)",
          }} />

          <div style={{ padding: "28px 32px" }}>
            {/* Header row */}
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "24px" }}>
              <div>
                <p style={{ margin: "0 0 6px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5A6A8A" }}>
                  Active Scenario
                </p>
                <h2 style={{ margin: "0 0 4px", fontSize: "26px", fontWeight: 700, color: "#2B3674", letterSpacing: "-0.02em" }}>
                  {ACTIVE_SCENARIO.scenarioName}
                </h2>
                <p style={{ margin: 0, fontSize: "14px", color: "#5A6A8A" }}>
                  Objective: {ACTIVE_SCENARIO.objective}
                </p>
              </div>
              <span style={{
                padding: "5px 12px", borderRadius: "999px",
                backgroundColor: "#ECFDF5", color: "#059669",
                fontSize: "12px", fontWeight: 700, flexShrink: 0,
                border: "1px solid #D1FAE5",
              }}>
                In progress
              </span>
            </div>

            {/* Stats row */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0", marginBottom: "20px" }}>
              {[
                { value: "42%", label: "Complete" },
                { value: "3", label: "Decisions made" },
                { value: "2", label: "Left" },
              ].map((stat, idx) => (
                <div key={stat.label} style={{
                  paddingRight: idx < 2 ? "24px" : 0,
                  paddingLeft: idx > 0 ? "24px" : 0,
                  borderRight: idx < 2 ? "1px solid #E0E5F2" : "none",
                }}>
                  <p style={{ margin: "0 0 2px", fontSize: "32px", fontWeight: 700, color: "#2B3674", letterSpacing: "-0.02em" }}>
                    {stat.value}
                  </p>
                  <p style={{ margin: 0, fontSize: "12px", color: "#5A6A8A", fontWeight: 500 }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Progress bar */}
            <div style={{ marginBottom: "24px" }}>
              <div style={{ height: "6px", backgroundColor: "#EEF2FF", borderRadius: "999px", overflow: "hidden" }}>
                <div style={{
                  width: "42%", height: "100%", borderRadius: "999px",
                  background: "linear-gradient(90deg, #4318FF, #7C3AED)",
                }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "6px" }}>
                <span style={{ fontSize: "11px", color: "#5A6A8A" }}>Progress</span>
                <span style={{ fontSize: "11px", fontWeight: 700, color: "#4318FF" }}>42%</span>
              </div>
            </div>

            {/* Action buttons */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <button
                onClick={onJoinCall}
                style={{
                  padding: "13px 20px", borderRadius: "12px", border: "none",
                  background: "linear-gradient(135deg, #4318FF, #7C3AED)",
                  color: "#FFFFFF", fontSize: "14px", fontWeight: 700,
                  cursor: "pointer", display: "flex", alignItems: "center",
                  justifyContent: "center", gap: "8px",
                  boxShadow: "0 4px 16px rgba(67,24,255,0.30)",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 6px 24px rgba(67,24,255,0.42)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 4px 16px rgba(67,24,255,0.30)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <Play size={15} />
                Resume simulation
              </button>
              <button
                onClick={onJoinCall}
                style={{
                  padding: "13px 20px", borderRadius: "12px",
                  border: "1.5px solid #E0E5F2", backgroundColor: "#FFFFFF",
                  color: "#2B3674", fontSize: "14px", fontWeight: 700,
                  cursor: "pointer", display: "flex", alignItems: "center",
                  justifyContent: "center", gap: "8px",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#F4F7FE";
                  e.currentTarget.style.borderColor = "#4318FF";
                  e.currentTarget.style.color = "#4318FF";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#FFFFFF";
                  e.currentTarget.style.borderColor = "#E0E5F2";
                  e.currentTarget.style.color = "#2B3674";
                }}
              >
                Start new
              </button>
            </div>
          </div>
        </div>

        {/* EXPLORE CARDS */}
        <div>
          <p style={{ margin: "0 0 16px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5A6A8A" }}>
            Or explore other paths
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
            {EXPLORE_CARDS.map((card) => {
              const Icon = card.icon;
              const isHovered = hoveredCard === card.id;
              return (
                <div
                  key={card.id}
                  onMouseEnter={() => setHoveredCard(card.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    borderRadius: "16px",
                    backgroundColor: "#FFFFFF",
                    border: `1.5px solid ${isHovered ? card.accent + "40" : "#E0E5F2"}`,
                    padding: "24px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    boxShadow: isHovered
                      ? `0 8px 24px ${card.accent}18`
                      : "0 2px 8px rgba(0,0,0,0.04)",
                    transform: isHovered ? "translateY(-3px)" : "none",
                  }}
                >
                  {/* Icon badge */}
                  <div style={{
                    width: "40px", height: "40px", borderRadius: "12px",
                    backgroundColor: card.accentLight,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <Icon size={18} style={{ color: card.accent }} />
                  </div>

                  <div style={{ flex: 1 }}>
                    <p style={{ margin: "0 0 4px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: card.accent }}>
                      {card.category}
                    </p>
                    <h4 style={{ margin: "0 0 8px", fontSize: "16px", fontWeight: 700, color: "#2B3674" }}>
                      {card.title}
                    </h4>
                    <p style={{ margin: 0, fontSize: "13px", color: "#5A6A8A", lineHeight: 1.5 }}>
                      {card.description}
                    </p>
                  </div>

                  <button style={{
                    padding: "10px 16px", borderRadius: "10px",
                    border: "none", backgroundColor: card.accentLight,
                    color: card.accent, fontSize: "13px", fontWeight: 700,
                    cursor: "pointer", display: "flex", alignItems: "center",
                    justifyContent: "center", gap: "6px",
                    transition: "all 0.2s",
                    width: "100%",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = card.accent;
                    e.currentTarget.style.color = "#FFFFFF";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = card.accentLight;
                    e.currentTarget.style.color = card.accent;
                  }}>
                    {card.cta}
                    <ChevronRight size={14} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* RIGHT SIDEBAR — Action Items */}
      <aside style={{
        width: "300px",
        height: "100vh",
        padding: "32px 24px",
        overflowY: "auto",
        borderLeft: "1px solid #E0E5F2",
        backgroundColor: "#FFFFFF",
        flexShrink: 0,
        position: "relative",
        zIndex: 5,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px" }}>
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#10B981", flexShrink: 0 }} />
          <p style={{ margin: 0, fontSize: "12px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#2B3674" }}>
            Action Items
          </p>
        </div>

        {/* Progress line + cards */}
        <div style={{ position: "relative", paddingLeft: "28px" }}>
          {/* Track */}
          <div style={{
            position: "absolute", left: "9px", top: "12px",
            width: "2px", height: "calc(100% - 24px)",
            backgroundColor: "#E0E5F2", borderRadius: "2px",
          }} />
          {/* Filled portion */}
          <div style={{
            position: "absolute", left: "9px", top: "12px",
            width: "2px",
            height: `${(UNLOCKED_OUTCOMES.filter(o => o.completed).length / UNLOCKED_OUTCOMES.length) * 100}%`,
            backgroundColor: "#4318FF", borderRadius: "2px",
            transition: "height 0.5s ease",
          }} />

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {UNLOCKED_OUTCOMES.map((outcome, idx) => {
              const isHov = hoveredAction === idx;
              return (
                <div key={outcome.id} style={{ position: "relative" }}>
                  {/* Timeline dot */}
                  <div style={{
                    position: "absolute",
                    left: "-24px",
                    top: "16px",
                    width: "16px", height: "16px",
                    borderRadius: "50%",
                    backgroundColor: outcome.completed ? "#4318FF" : "#FFFFFF",
                    border: `2px solid ${outcome.completed ? "#4318FF" : "#E0E5F2"}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "9px", color: "#FFFFFF", fontWeight: 700,
                    zIndex: 2,
                  }}>
                    {outcome.completed ? "✓" : ""}
                  </div>

                  <div
                    onMouseEnter={() => setHoveredAction(idx)}
                    onMouseLeave={() => setHoveredAction(null)}
                    style={{
                      borderRadius: "14px",
                      border: `1.5px solid ${isHov ? outcome.accentColor + "40" : "#E0E5F2"}`,
                      backgroundColor: isHov ? outcome.accentLight : "#FFFFFF",
                      padding: "16px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                      transition: "all 0.2s",
                      boxShadow: isHov ? `0 4px 16px ${outcome.accentColor}20` : "none",
                      cursor: "pointer",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                      <div style={{
                        width: "8px", height: "8px", borderRadius: "50%",
                        backgroundColor: outcome.accentColor,
                        marginTop: "5px", flexShrink: 0,
                      }} />
                      <p style={{ margin: 0, fontSize: "13px", fontWeight: 700, color: "#2B3674", lineHeight: 1.4, flex: 1 }}>
                        {outcome.title}
                      </p>
                    </div>

                    <button style={{
                      padding: "8px 14px", borderRadius: "8px",
                      border: "none", backgroundColor: outcome.accentColor,
                      color: "#FFFFFF", fontSize: "12px", fontWeight: 700,
                      cursor: "pointer", alignSelf: "flex-start",
                      display: "flex", alignItems: "center", gap: "5px",
                      boxShadow: `0 2px 8px ${outcome.accentColor}30`,
                      transition: "all 0.15s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-1px)";
                      e.currentTarget.style.boxShadow = `0 4px 12px ${outcome.accentColor}50`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = `0 2px 8px ${outcome.accentColor}30`;
                    }}>
                      {outcome.cta}
                      <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer hint */}
        <div style={{ marginTop: "32px", padding: "16px", borderRadius: "14px", backgroundColor: "#F4F7FE", border: "1px solid #E0E5F2" }}>
          <p style={{ margin: "0 0 4px", fontSize: "12px", fontWeight: 700, color: "#4318FF" }}>
            You're in the top 12%
          </p>
          <p style={{ margin: 0, fontSize: "12px", color: "#5A6A8A", lineHeight: 1.5 }}>
            Resilience under pressure compared to your cohort.
          </p>
        </div>
      </aside>
    </div>
  );
};

export default WaypointLanding;
