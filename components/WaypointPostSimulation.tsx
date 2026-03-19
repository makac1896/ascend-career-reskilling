import React, { useState, useEffect, useRef } from "react";

interface WaypointPostSimulationProps {
  onContinue: () => void;
}

// ─── Journal Overlay ──────────────────────────────────────────────────────────

const JournalOverlay: React.FC<{ prompt: string; onClose: () => void }> = ({
  prompt,
  onClose,
}) => {
  const [text, setText] = useState("");
  const [visible, setVisible] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    setTimeout(() => textareaRef.current?.focus(), 300);
  }, []);

  const dismiss = () => {
    setVisible(false);
    setTimeout(onClose, 350);
  };

  return (
    <div
      onClick={dismiss}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        backgroundColor: "rgba(10,15,30,0.72)",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.35s ease",
        padding: "40px 24px",
        boxSizing: "border-box",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: "580px",
          backgroundColor: "#FAFAF9",
          borderRadius: "16px",
          padding: "36px 40px 32px",
          boxShadow: "0 40px 100px rgba(0,0,0,0.4)",
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "transform 0.35s ease",
          fontFamily: "'DM Sans', sans-serif",
          display: "flex",
          flexDirection: "column",
          gap: "22px",
        }}
      >
        {/* Prompt */}
        <p
          style={{
            fontSize: "16px",
            fontWeight: 600,
            color: "#1C1C1E",
            lineHeight: "1.6",
            margin: 0,
          }}
        >
          {prompt}
        </p>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder='Start typing — or just sit here for a minute.'
          rows={7}
          style={{
            width: "100%",
            resize: "none",
            border: "none",
            borderTop: "1px solid #EBEBEB",
            paddingTop: "20px",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "15px",
            color: "#1C1C1E",
            lineHeight: "1.75",
            backgroundColor: "transparent",
            outline: "none",
            boxSizing: "border-box",
            caretColor: "#4F46E5",
          }}
        />

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontSize: "11px",
              color: "#ADADAD",
              fontStyle: "italic",
            }}
          >
            {text.length > 0
              ? "Auto-saved"
              : "Nothing you write here is graded."}
          </span>
          <button
            onClick={dismiss}
            style={{
              background: "none",
              border: "none",
              fontSize: "13px",
              fontWeight: 600,
              color: "#ADADAD",
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              padding: "4px 0",
              transition: "color 0.15s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "#1C1C1E";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "#ADADAD";
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Shared Avatars ───────────────────────────────────────────────────────────

const KiraAvatar = ({ size = 36 }: { size?: number }) => (
  <svg width={size} height={size} viewBox='0 0 32 32' fill='none'>
    <circle cx='16' cy='16' r='16' fill='#FCA5A5' />
    <circle cx='16' cy='13' r='5.5' fill='#7F1D1D' />
    <ellipse cx='16' cy='26' rx='8.5' ry='6' fill='#7F1D1D' />
  </svg>
);

const DevAvatar = ({ size = 36 }: { size?: number }) => (
  <svg width={size} height={size} viewBox='0 0 32 32' fill='none'>
    <circle cx='16' cy='16' r='16' fill='#FDE68A' />
    <circle cx='16' cy='13' r='5.5' fill='#92400E' />
    <ellipse cx='16' cy='26' rx='8.5' ry='6' fill='#92400E' />
  </svg>
);

// ─── Resource Card ────────────────────────────────────────────────────────────

const ResourceCard: React.FC<{
  title: string;
  datetime: string;
  reason: string;
}> = ({ title, datetime, reason }) => (
  <div
    style={{
      marginTop: "16px",
      padding: "14px 16px",
      backgroundColor: "#F7F7FF",
      borderRadius: "10px",
      border: "1px solid #E5E4FF",
    }}
  >
    <p
      style={{
        fontSize: "10px",
        fontWeight: 700,
        color: "#9CA3AF",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        margin: "0 0 8px 0",
      }}
    >
      Recommended for you based on this conversation
    </p>
    <p
      style={{
        fontSize: "14px",
        fontWeight: 700,
        color: "#1C1C1E",
        margin: "0 0 3px 0",
      }}
    >
      {title}
    </p>
    <p style={{ fontSize: "12px", color: "#9CA3AF", margin: "0 0 8px 0" }}>
      {datetime}
    </p>
    <p
      style={{
        fontSize: "13px",
        color: "#6B7280",
        lineHeight: "1.55",
        margin: "0 0 12px 0",
      }}
    >
      {reason}
    </p>
    <button
      style={{
        fontSize: "12px",
        fontWeight: 700,
        color: "#4F46E5",
        background: "none",
        border: "1px solid #C7D2FE",
        borderRadius: "6px",
        padding: "5px 12px",
        cursor: "pointer",
        fontFamily: "'DM Sans', sans-serif",
        transition: "background-color 0.15s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor =
          "#EEF2FF";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor =
          "transparent";
      }}
    >
      See details
    </button>
  </div>
);

// ─── Journal Trigger ──────────────────────────────────────────────────────────

const JournalTrigger: React.FC<{ onOpen: () => void }> = ({ onOpen }) => (
  <button
    onClick={onOpen}
    style={{
      marginTop: "14px",
      background: "none",
      border: "none",
      padding: 0,
      cursor: "pointer",
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      fontFamily: "'DM Sans', sans-serif",
    }}
  >
    <span
      style={{
        fontSize: "13px",
        color: "#ADADAD",
        fontStyle: "italic",
        borderBottom: "1px solid #DFDEDE",
        transition: "color 0.15s ease, border-color 0.15s ease",
      }}
      onMouseEnter={(e) => {
        const s = e.currentTarget as HTMLSpanElement;
        s.style.color = "#6B7280";
        s.style.borderColor = "#9CA3AF";
      }}
      onMouseLeave={(e) => {
        const s = e.currentTarget as HTMLSpanElement;
        s.style.color = "#ADADAD";
        s.style.borderColor = "#DFDEDE";
      }}
    >
      Want to sit with that for a moment?
    </span>
  </button>
);

// ─── Section Divider ──────────────────────────────────────────────────────────

const SectionLabel: React.FC<{
  label: string;
  sub?: string;
}> = ({ label, sub }) => (
  <div style={{ marginBottom: "20px" }}>
    <p
      style={{
        fontSize: "11px",
        fontWeight: 700,
        color: "#ADADAD",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        margin: "0 0 4px 0",
      }}
    >
      {label}
    </p>
    {sub && (
      <p
        style={{
          fontSize: "12px",
          color: "#ADADAD",
          margin: 0,
          fontStyle: "italic",
          lineHeight: "1.5",
        }}
      >
        {sub}
      </p>
    )}
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

const WaypointPostSimulation: React.FC<WaypointPostSimulationProps> = ({
  onContinue,
}) => {
  const [journalPrompt, setJournalPrompt] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  const openJournal = (prompt: string) => setJournalPrompt(prompt);
  const closeJournal = () => setJournalPrompt(null);

  return (
    <>
      {journalPrompt && (
        <JournalOverlay prompt={journalPrompt} onClose={closeJournal} />
      )}

      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#FAFAF9",
          fontFamily: "'DM Sans', sans-serif",
          padding: "0 24px 80px",
          boxSizing: "border-box",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.6s ease",
        }}
      >
        {/* Top bar — first Waypoint reveal */}
        <div
          style={{
            maxWidth: "700px",
            margin: "0 auto",
            padding: "28px 0 40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Waypoint wordmark */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <svg
              width='22'
              height='22'
              viewBox='0 0 24 24'
              fill='none'
              style={{ flexShrink: 0 }}
            >
              <circle
                cx='12'
                cy='12'
                r='10'
                stroke='#4F46E5'
                strokeWidth='1.8'
              />
              <circle cx='12' cy='12' r='3.5' fill='#4F46E5' />
            </svg>
            <span
              style={{
                fontSize: "15px",
                fontWeight: 800,
                color: "#1C1C1E",
                letterSpacing: "-0.02em",
              }}
            >
              Waypoint
            </span>
          </div>
        </div>

        {/* ── Content ── */}
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          {/* ────────────────── Layer 1 — From the team ────────────────── */}
          <SectionLabel label='From the team' />

          {/* Kira's message */}
          <div
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #EBEBEB",
              borderRadius: "14px",
              padding: "28px 28px 22px",
              marginBottom: "16px",
              boxShadow: "0 1px 8px rgba(0,0,0,0.04)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "12px",
                marginBottom: "16px",
              }}
            >
              <KiraAvatar size={38} />
              <div>
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: 800,
                    color: "#1C1C1E",
                    margin: "0 0 2px 0",
                  }}
                >
                  Kira Morningstar
                </p>
                <p
                  style={{
                    fontSize: "12px",
                    color: "#ADADAD",
                    margin: 0,
                  }}
                >
                  Program Director
                </p>
              </div>
            </div>

            <p
              style={{
                fontSize: "14px",
                color: "#374151",
                lineHeight: "1.8",
                margin: 0,
              }}
            >
              I want to be honest with you — I wasn't sure how you'd handle
              that. You walked into a disagreement between me and a colleague
              and you didn't just pick a side. You actually read the document
              and named the thing that mattered. The phrase "target
              demographics" isn't just clunky writing — it signals a fundamental
              assumption about who the community is. You got that without me
              explaining it.
              <br />
              <br />
              What I'd invite you to notice is the moment when Dev pushed back
              on the timeline. You got quieter. Your instinct was right, but you
              let the pressure of the situation pull you back. That's the edge
              to work on — not whether you see clearly, but whether you trust
              what you see when someone with more experience is in the room.
            </p>

            <ResourceCard
              title='Navigating Conflict in Teams'
              datetime='Friday, March 13 · 2:00 PM'
              reason='You showed strong critical reading but held back under pressure. This session practices leading with your insight when the stakes feel high.'
            />
            <JournalTrigger
              onOpen={() =>
                openJournal(
                  "Kira noticed you knew the answer before you said it. Think about where else in your life you wait for permission to speak.",
                )
              }
            />
          </div>

          {/* Dev's message */}
          <div
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #EBEBEB",
              borderRadius: "14px",
              padding: "28px 28px 22px",
              marginBottom: "52px",
              boxShadow: "0 1px 8px rgba(0,0,0,0.04)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "12px",
                marginBottom: "16px",
              }}
            >
              <DevAvatar size={38} />
              <div>
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: 800,
                    color: "#1C1C1E",
                    margin: "0 0 2px 0",
                  }}
                >
                  Dev Sharma
                </p>
                <p
                  style={{
                    fontSize: "12px",
                    color: "#ADADAD",
                    margin: 0,
                  }}
                >
                  Communications Coordinator
                </p>
              </div>
            </div>

            <p
              style={{
                fontSize: "14px",
                color: "#374151",
                lineHeight: "1.8",
                margin: 0,
              }}
            >
              I'll be direct — I went into that conversation thinking I was
              right. And I still think the timeline concern was real. But the
              way you framed what was at stake made me see it differently. You
              didn't lecture. You just answered the question and let it land.
              <br />
              <br />
              That's actually a hard skill. Most people in your position either
              go quiet or overcorrect and try to make everyone happy. You did
              something different — you stayed in your own perspective. I think
              you'd work well in rooms where people disagree. You just need to
              learn to hold that ground a little longer before you check whether
              people are okay with what you said.
            </p>

            <ResourceCard
              title='Finding Your Voice in Professional Settings'
              datetime='Wednesday, March 18 · 12:00 PM'
              reason='You held your position briefly then softened when challenged. This workshop builds the skill of staying in your perspective under social pressure.'
            />
            <JournalTrigger
              onOpen={() =>
                openJournal(
                  "Dev said you stayed in your own perspective — but then you checked. What do you think you were looking for when you did that?",
                )
              }
            />
          </div>

          {/* ────────────────── Layer 2 — What showed up ────────────────── */}
          <SectionLabel
            label='What showed up'
            sub='Based on what you said and did — not a quiz. These evolve as you complete more simulations.'
          />

          {/* Strengths */}
          <div style={{ marginBottom: "12px" }}>
            <p
              style={{
                fontSize: "12px",
                fontWeight: 700,
                color: "#6B7280",
                margin: "0 0 10px 0",
                letterSpacing: "0.04em",
              }}
            >
              Strengths demonstrated
            </p>
            {[
              {
                label: "Critical Reading",
                evidence:
                  "You identified the gap between the report's language and the community it represents — before anyone prompted you to.",
                icon: "◎",
                color: "#ECFDF5",
                border: "#A7F3D0",
                iconColor: "#059669",
              },
              {
                label: "Constructive Positioning",
                evidence:
                  "When asked to take a side, you named the underlying tension instead. That reframing shifted the conversation.",
                icon: "◈",
                color: "#EFF6FF",
                border: "#BFDBFE",
                iconColor: "#2563EB",
              },
            ].map(({ label, evidence, icon, color, border, iconColor }) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  gap: "14px",
                  padding: "16px 18px",
                  backgroundColor: color,
                  border: `1px solid ${border}`,
                  borderRadius: "10px",
                  marginBottom: "8px",
                  alignItems: "flex-start",
                }}
              >
                <span
                  style={{
                    fontSize: "18px",
                    color: iconColor,
                    flexShrink: 0,
                    lineHeight: 1.3,
                  }}
                >
                  {icon}
                </span>
                <div>
                  <p
                    style={{
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "#1C1C1E",
                      margin: "0 0 4px 0",
                    }}
                  >
                    {label}
                  </p>
                  <p
                    style={{
                      fontSize: "13px",
                      color: "#6B7280",
                      margin: 0,
                      lineHeight: "1.55",
                    }}
                  >
                    {evidence}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Growth edges */}
          <div style={{ marginBottom: "52px" }}>
            <p
              style={{
                fontSize: "12px",
                fontWeight: 700,
                color: "#6B7280",
                margin: "0 0 10px 0",
                letterSpacing: "0.04em",
              }}
            >
              Growth edges
            </p>
            {[
              {
                label: "Assertiveness Under Pressure",
                evidence:
                  "You softened your position when Dev pushed back on the timeline. Your original point was stronger.",
                icon: "◇",
                color: "#FFFBEB",
                border: "#FDE68A",
                iconColor: "#D97706",
              },
              {
                label: "Speed of Conviction",
                evidence:
                  "There was a gap between when you formed your view and when you shared it. Practice closing that gap.",
                icon: "◇",
                color: "#FFFBEB",
                border: "#FDE68A",
                iconColor: "#D97706",
              },
            ].map(({ label, evidence, icon, color, border, iconColor }) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  gap: "14px",
                  padding: "16px 18px",
                  backgroundColor: color,
                  border: `1px solid ${border}`,
                  borderRadius: "10px",
                  marginBottom: "8px",
                  alignItems: "flex-start",
                }}
              >
                <span
                  style={{
                    fontSize: "18px",
                    color: iconColor,
                    flexShrink: 0,
                    lineHeight: 1.3,
                  }}
                >
                  {icon}
                </span>
                <div>
                  <p
                    style={{
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "#1C1C1E",
                      margin: "0 0 4px 0",
                    }}
                  >
                    {label}
                  </p>
                  <p
                    style={{
                      fontSize: "13px",
                      color: "#6B7280",
                      margin: 0,
                      lineHeight: "1.55",
                    }}
                  >
                    {evidence}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* ────────────────── Layer 3 — The Way ────────────────── */}
          <SectionLabel
            label='The Way'
            sub='Three things. Based on what you just did.'
          />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              marginBottom: "60px",
            }}
          >
            {/* Card 1 — Do this week */}
            <div
              style={{
                display: "flex",
                gap: "16px",
                padding: "20px 22px",
                backgroundColor: "#FFFFFF",
                border: "1px solid #EBEBEB",
                borderRadius: "12px",
                alignItems: "flex-start",
                boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "9px",
                  backgroundColor: "#EEF2FF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg
                  width='16'
                  height='16'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='#4F46E5'
                  strokeWidth='2.2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <rect x='3' y='4' width='18' height='18' rx='2' />
                  <line x1='16' y1='2' x2='16' y2='6' />
                  <line x1='8' y1='2' x2='8' y2='6' />
                  <line x1='3' y1='10' x2='21' y2='10' />
                </svg>
              </div>
              <div>
                <p
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "#ADADAD",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    margin: "0 0 6px 0",
                  }}
                >
                  One thing to do this week
                </p>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#374151",
                    lineHeight: "1.65",
                    margin: 0,
                  }}
                >
                  Attend <strong>Navigating Conflict in Teams</strong> — Friday
                  at 2 PM. You held back when Dev challenged you. This session
                  practices exactly that.
                </p>
              </div>
            </div>

            {/* Card 2 — Reflect */}
            <div
              onClick={() =>
                openJournal(
                  "Kira noticed you knew the answer before you said it. Think about where else in your life you wait for permission to speak.",
                )
              }
              style={{
                display: "flex",
                gap: "16px",
                padding: "20px 22px",
                backgroundColor: "#FFFFFF",
                border: "1px solid #EBEBEB",
                borderRadius: "12px",
                alignItems: "flex-start",
                boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
                cursor: "pointer",
                transition: "border-color 0.15s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor =
                  "#C7D2FE";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor =
                  "#EBEBEB";
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "9px",
                  backgroundColor: "#FFF7ED",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg
                  width='16'
                  height='16'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='#D97706'
                  strokeWidth='2.2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path d='M12 20h9' />
                  <path d='M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z' />
                </svg>
              </div>
              <div>
                <p
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "#ADADAD",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    margin: "0 0 6px 0",
                  }}
                >
                  One thing to reflect on
                </p>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#374151",
                    lineHeight: "1.65",
                    margin: "0 0 8px 0",
                  }}
                >
                  Kira noticed you knew the answer before you said it. Think
                  about where else in your life you wait for permission to
                  speak.
                </p>
                <span
                  style={{
                    fontSize: "12px",
                    color: "#ADADAD",
                    fontStyle: "italic",
                    borderBottom: "1px solid #DFDEDE",
                  }}
                >
                  Tap to open journal
                </span>
              </div>
            </div>

            {/* Card 3 — Try next */}
            <div
              style={{
                display: "flex",
                gap: "16px",
                padding: "20px 22px",
                backgroundColor: "#FFFFFF",
                border: "1px solid #EBEBEB",
                borderRadius: "12px",
                alignItems: "flex-start",
                boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "9px",
                  backgroundColor: "#F0FDF4",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg
                  width='16'
                  height='16'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='#16A34A'
                  strokeWidth='2.2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <polygon points='5 3 19 12 5 21 5 3' />
                </svg>
              </div>
              <div style={{ flex: 1 }}>
                <p
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "#ADADAD",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    margin: "0 0 6px 0",
                  }}
                >
                  One thing to try next
                </p>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#374151",
                    lineHeight: "1.65",
                    margin: "0 0 14px 0",
                  }}
                >
                  Ready to test yourself in a different scenario? This one puts
                  you in a team disagreement about project direction — a faster
                  room, higher stakes.
                </p>
                <button
                  onClick={onContinue}
                  style={{
                    padding: "9px 20px",
                    borderRadius: "8px",
                    border: "none",
                    backgroundColor: "#4F46E5",
                    color: "#FFFFFF",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "13px",
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "background-color 0.15s ease",
                  }}
                  onMouseEnter={(e) => {
                    (
                      e.currentTarget as HTMLButtonElement
                    ).style.backgroundColor = "#4338CA";
                  }}
                  onMouseLeave={(e) => {
                    (
                      e.currentTarget as HTMLButtonElement
                    ).style.backgroundColor = "#4F46E5";
                  }}
                >
                  Start next scenario
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WaypointPostSimulation;
