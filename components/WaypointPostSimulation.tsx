import React, { useState, useEffect, useRef } from "react";

interface WaypointPostSimulationProps {
  onContinue: () => void;
}

// ─── Avatars (match simulation avatars exactly) ───────────────────────────────

const KiraAvatar = ({ size = 36 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="16" fill="#FCA5A5" />
    <circle cx="16" cy="13" r="5.5" fill="#7F1D1D" />
    <ellipse cx="16" cy="26" rx="8.5" ry="6" fill="#7F1D1D" />
  </svg>
);

const DevAvatar = ({ size = 36 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="16" fill="#FDE68A" />
    <circle cx="16" cy="13" r="5.5" fill="#92400E" />
    <ellipse cx="16" cy="26" rx="8.5" ry="6" fill="#92400E" />
  </svg>
);

const AiyanaAvatar = ({ size = 36 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="16" fill="#C7D2FE" />
    <circle cx="16" cy="13" r="5.5" fill="#3730A3" />
    <ellipse cx="16" cy="26" rx="8.5" ry="6" fill="#3730A3" />
  </svg>
);

// ─── Types ────────────────────────────────────────────────────────────────────

interface SlackMessage {
  id: string;
  from: "kira" | "dev" | "aiyana";
  text?: string;
  quote?: string;        // blockquote — sim evidence
  resource?: Resource;
  skillCard?: SkillCard;
  labCard?: LabCard;
  time: string;
}

interface Resource {
  domain: string;
  title: string;
  description: string;
  cta: string;
}

interface SkillCard {
  skills: { name: string; before: number; after: number; color: string }[];
}

interface LabCard {
  title: string;
  date: string;
  time: string;
  host: string;
  spots: number;
}

// ─── DM data ─────────────────────────────────────────────────────────────────

const KIRA_MESSAGES: SlackMessage[] = [
  {
    id: "k1",
    from: "kira",
    text: "Hey Aiyana 👋 Just hopped off the Zoom — wanted to reach out before I lost the thread. That was a really interesting session.",
    time: "3:47 PM",
  },
  {
    id: "k2",
    from: "kira",
    text: "I want to be honest with you — I wasn't sure how you'd handle that disagreement between me and Dev. You walked into the middle of it and you didn't just pick a side. You actually read the document and named what mattered.",
    time: "3:47 PM",
  },
  {
    id: "k3",
    from: "kira",
    quote: "\"The phrase 'target demographics' isn't clunky writing — it signals a fundamental assumption about who this community actually is.\"",
    text: "You said something close to this — and you were right. That's the kind of critical reading that takes most people years to develop. The fact that you caught it without prompting is significant.",
    time: "3:48 PM",
  },
  {
    id: "k4",
    from: "kira",
    text: "The one thing I'd invite you to sit with: when Dev pushed back on the timeline, you got quieter. Your instinct was right — but you let the pressure of the room pull you back. That's the edge to work on. Not whether you see clearly. Whether you trust what you see when someone with more experience is in the room.",
    time: "3:48 PM",
  },
  {
    id: "k5",
    from: "kira",
    skillCard: {
      skills: [
        { name: "Critical Reading", before: 44, after: 62, color: "#059669" },
        { name: "Assertive Advocacy", before: 34, after: 52, color: "#4318FF" },
        { name: "Resilience Under Pressure", before: 76, after: 87, color: "#7C3AED" },
      ],
    },
    time: "3:49 PM",
  },
  {
    id: "k6",
    from: "kira",
    resource: {
      domain: "waypoint.app · Workshop",
      title: "Navigating Conflict in Teams",
      description: "You held back when challenged by someone more senior. This session specifically practices leading with your insight when the stakes feel high — not retreating into agreement.",
      cta: "Reserve your spot",
    },
    time: "3:49 PM",
  },
  {
    id: "k7",
    from: "kira",
    labCard: {
      title: "In-Person Practice Lab: Hold Your Ground",
      date: "Friday, March 21",
      time: "2:00 PM – 3:30 PM",
      host: "Kira Morningstar",
      spots: 6,
    },
    time: "3:50 PM",
  },
];

const DEV_MESSAGES: SlackMessage[] = [
  {
    id: "d1",
    from: "dev",
    text: "Hey — Dev here. Kira said she was going to DM you, so figured I'd add my take separately since we saw it pretty differently.",
    time: "4:02 PM",
  },
  {
    id: "d2",
    from: "dev",
    text: "I'll be direct — I went into that conversation thinking I was right about the timeline. And I still think the concern was real. But the way you framed what was at stake made me see the document differently. You didn't lecture. You just answered the question and let it land.",
    time: "4:02 PM",
  },
  {
    id: "d3",
    from: "dev",
    quote: "\"I think we need to ask whether the timeline serves the community or just the organization's schedule.\"",
    text: "That's actually a hard framing to hold when someone pushes back. Most people in your position go quiet or try to make everyone happy. You did something different — you stayed in your own perspective. For a while, at least.",
    time: "4:03 PM",
  },
  {
    id: "d4",
    from: "dev",
    text: "The gap: you checked whether people were okay with what you said. That moment — right after you made your point — you softened. Learn to let things land before you rescue them.",
    time: "4:03 PM",
  },
  {
    id: "d5",
    from: "dev",
    skillCard: {
      skills: [
        { name: "Assertive Advocacy", before: 34, after: 52, color: "#4318FF" },
        { name: "Critical Thinking", before: 66, after: 74, color: "#0EA5E9" },
      ],
    },
    time: "4:04 PM",
  },
  {
    id: "d6",
    from: "dev",
    resource: {
      domain: "waypoint.app · Workshop",
      title: "Finding Your Voice in Professional Settings",
      description: "Builds the specific skill of staying in your perspective under social pressure — not abandoning your position the moment you sense discomfort in the room.",
      cta: "Reserve your spot",
    },
    time: "4:04 PM",
  },
  {
    id: "d7",
    from: "dev",
    labCard: {
      title: "In-Person Practice Lab: The Pressure Test",
      date: "Wednesday, March 19",
      time: "12:00 PM – 1:00 PM",
      host: "Dev Sharma",
      spots: 4,
    },
    time: "4:05 PM",
  },
];

// ─── Message renderer sub-components ─────────────────────────────────────────

const SlackLinkUnfurl: React.FC<{ resource: Resource }> = ({ resource }) => (
  <div
    style={{
      marginTop: "8px",
      borderLeft: "3px solid rgba(99,102,241,0.55)",
      backgroundColor: "#F8F8FF",
      borderRadius: "0 6px 6px 0",
      padding: "12px 14px",
      maxWidth: "420px",
    }}
  >
    <p style={{ margin: "0 0 4px", fontSize: "11px", color: "#868686" }}>{resource.domain}</p>
    <p style={{ margin: "0 0 5px", fontSize: "14px", fontWeight: 700, color: "#1D1C1D" }}>{resource.title}</p>
    <p style={{ margin: "0 0 10px", fontSize: "13px", color: "#616061", lineHeight: 1.55 }}>{resource.description}</p>
    <button
      style={{
        padding: "6px 14px",
        borderRadius: "6px",
        border: "1px solid rgba(99,102,241,0.40)",
        backgroundColor: "rgba(99,102,241,0.08)",
        color: "#4F46E5",
        fontSize: "12px",
        fontWeight: 700,
        cursor: "pointer",
        fontFamily: "'DM Sans', sans-serif",
        transition: "background-color 0.15s",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(99,102,241,0.16)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "rgba(99,102,241,0.08)"; }}
    >
      {resource.cta} →
    </button>
  </div>
);

const SlackSkillCard: React.FC<{ card: SkillCard }> = ({ card }) => (
  <div
    style={{
      marginTop: "8px",
      border: "1px solid #E8E8E8",
      borderRadius: "8px",
      backgroundColor: "#FAFAFA",
      padding: "12px 14px",
      maxWidth: "360px",
    }}
  >
    <p style={{ margin: "0 0 10px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "#868686" }}>
      Skills moved this session
    </p>
    {card.skills.map((sk) => (
      <div key={sk.name} style={{ marginBottom: "10px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px" }}>
          <span style={{ fontSize: "12px", fontWeight: 600, color: "#1D1C1D" }}>{sk.name}</span>
          <span style={{ fontSize: "11px", fontWeight: 700, color: sk.color }}>
            +{sk.after - sk.before} pts · now {sk.after}%
          </span>
        </div>
        <div style={{ height: "5px", backgroundColor: "#E8E8E8", borderRadius: "999px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${sk.before}%`, backgroundColor: "#D1D5DB", borderRadius: "999px" }} />
          <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${sk.after}%`, backgroundColor: sk.color, borderRadius: "999px", opacity: 0.8 }} />
        </div>
      </div>
    ))}
  </div>
);

const SlackLabCard: React.FC<{ card: LabCard }> = ({ card }) => (
  <div
    style={{
      marginTop: "8px",
      border: "1px solid #E8E8E8",
      borderRadius: "8px",
      backgroundColor: "#FFFFFF",
      padding: "12px 14px",
      maxWidth: "360px",
      boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
    }}
  >
    <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
      <div
        style={{
          width: 36, height: 36, borderRadius: "8px",
          backgroundColor: "#EEF2FF",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ margin: "0 0 2px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#868686" }}>In-person lab</p>
        <p style={{ margin: "0 0 3px", fontSize: "13px", fontWeight: 700, color: "#1D1C1D" }}>{card.title}</p>
        <p style={{ margin: "0 0 2px", fontSize: "12px", color: "#616061" }}>{card.date} · {card.time}</p>
        <p style={{ margin: "0 0 8px", fontSize: "12px", color: "#868686" }}>Hosted by {card.host}</p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: "11px", color: card.spots <= 5 ? "#D97706" : "#059669", fontWeight: 600 }}>
            {card.spots} spots left
          </span>
          <button
            style={{
              padding: "5px 12px",
              borderRadius: "6px",
              border: "none",
              backgroundColor: "#4F46E5",
              color: "#FFFFFF",
              fontSize: "11px",
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              transition: "background-color 0.15s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#4338CA"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#4F46E5"; }}
          >
            Reserve
          </button>
        </div>
      </div>
    </div>
  </div>
);

// ─── Single DM message row ────────────────────────────────────────────────────

const DmMessageRow: React.FC<{
  msg: SlackMessage;
  showHeader: boolean;
}> = ({ msg, showHeader }) => {
  const isAiyana = msg.from === "aiyana";
  const AvatarComp = msg.from === "kira" ? KiraAvatar : msg.from === "dev" ? DevAvatar : AiyanaAvatar;
  const displayName = msg.from === "kira" ? "Kira Morningstar" : msg.from === "dev" ? "Dev Sharma" : "Aiyana Yerxa";

  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        padding: showHeader ? "12px 0 2px" : "1px 0",
        alignItems: "flex-start",
      }}
    >
      {/* Avatar col */}
      <div style={{ width: 36, flexShrink: 0, paddingTop: showHeader ? 0 : 2 }}>
        {showHeader ? <AvatarComp size={36} /> : null}
      </div>

      {/* Content col */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {showHeader && (
          <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "4px" }}>
            <span style={{ fontSize: "14px", fontWeight: 700, color: isAiyana ? "#4F46E5" : "#1D1C1D" }}>
              {displayName}
            </span>
            <span style={{ fontSize: "11px", color: "#868686" }}>{msg.time}</span>
          </div>
        )}

        {/* Quote (sim evidence) */}
        {msg.quote && (
          <div
            style={{
              borderLeft: "3px solid #D1D5DB",
              paddingLeft: "12px",
              marginBottom: "6px",
              color: "#616061",
              fontSize: "13px",
              fontStyle: "italic",
              lineHeight: 1.55,
            }}
          >
            {msg.quote}
          </div>
        )}

        {/* Main text */}
        {msg.text && (
          <p style={{ margin: 0, fontSize: "14px", color: "#1D1C1D", lineHeight: 1.65 }}>
            {msg.text}
          </p>
        )}

        {/* Embeds */}
        {msg.skillCard && <SlackSkillCard card={msg.skillCard} />}
        {msg.resource && <SlackLinkUnfurl resource={msg.resource} />}
        {msg.labCard && <SlackLabCard card={msg.labCard} />}
      </div>
    </div>
  );
};

// ─── Typing indicator ─────────────────────────────────────────────────────────

const TypingIndicator: React.FC<{ name: string; AvatarComp: React.FC<{ size?: number }> }> = ({ name, AvatarComp }) => (
  <div style={{ display: "flex", gap: "10px", alignItems: "flex-start", padding: "12px 0 2px" }}>
    <div style={{ width: 36, flexShrink: 0 }}><AvatarComp size={36} /></div>
    <div>
      <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "6px" }}>
        <span style={{ fontSize: "14px", fontWeight: 700, color: "#1D1C1D" }}>{name}</span>
      </div>
      <div
        style={{
          display: "flex", gap: "4px", alignItems: "center",
          padding: "8px 12px",
          backgroundColor: "#F1F1F1",
          borderRadius: "18px",
          width: "fit-content",
        }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: 7, height: 7,
              borderRadius: "50%",
              backgroundColor: "#9CA3AF",
              animation: `slack-typing 1.3s ${i * 0.2}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>
    </div>
  </div>
);

// ─── DM Thread Panel ──────────────────────────────────────────────────────────

const DmThread: React.FC<{
  person: "kira" | "dev";
  AvatarComp: React.FC<{ size?: number }>;
  displayName: string;
  allMessages: SlackMessage[];
  onContinue: () => void;
}> = ({ person, AvatarComp, displayName, allMessages, onContinue }) => {
  const [revealed, setRevealed] = useState<SlackMessage[]>([]);
  const [typing, setTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [replies, setReplies] = useState<SlackMessage[]>([]);
  const [done, setDone] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    // Cancel any pending timeouts from a previous run (handles React StrictMode double-fire)
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];

    setRevealed([]);
    setTyping(false);
    setReplies([]);
    setDone(false);
    indexRef.current = 0;

    const schedule = (fn: () => void, ms: number) => {
      const id = setTimeout(fn, ms);
      timeoutsRef.current.push(id);
      return id;
    };

    const revealNext = () => {
      const i = indexRef.current;
      if (i >= allMessages.length) {
        setDone(true);
        return;
      }
      setTyping(true);
      const delay = allMessages[i].resource || allMessages[i].skillCard || allMessages[i].labCard ? 900 : 1100;
      schedule(() => {
        setTyping(false);
        setRevealed((prev) => [...prev, allMessages[i]]);
        indexRef.current = i + 1;
        schedule(revealNext, allMessages[i].text && allMessages[i].text!.length > 120 ? 600 : 350);
      }, delay);
    };

    schedule(revealNext, 500);

    return () => {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [person]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [revealed, typing, replies]);

  const send = () => {
    const t = inputValue.trim();
    if (!t) return;
    setReplies((prev) => [
      ...prev,
      { id: `r${Date.now()}`, from: "aiyana", text: t, time: "now" },
    ]);
    setInputValue("");
  };

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  // Group consecutive messages from same sender to suppress repeated headers
  const allVisible = [...revealed, ...replies];

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Channel header */}
      <div
        style={{
          padding: "13px 24px 11px",
          borderBottom: "1px solid #E8E8E8",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <AvatarComp size={24} />
          <span style={{ fontSize: "15px", fontWeight: 800, color: "#1D1C1D" }}>{displayName}</span>
          <div style={{ width: 1, height: 16, backgroundColor: "#E8E8E8" }} />
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", backgroundColor: "#22C55E" }} />
            <span style={{ fontSize: "12px", color: "#868686" }}>Active now</span>
          </div>
        </div>
        <button
          onClick={onContinue}
          style={{
            padding: "7px 16px",
            borderRadius: "7px",
            border: "1px solid #E8E8E8",
            backgroundColor: "transparent",
            color: "#616061",
            fontSize: "12px",
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
            transition: "all 0.15s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#F4F4F4"; e.currentTarget.style.color = "#1D1C1D"; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#616061"; }}
        >
          Go to dashboard →
        </button>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: "8px 24px 0" }}>
        {/* DM intro */}
        <div style={{ padding: "20px 0 8px", borderBottom: "1px solid #E8E8E8", marginBottom: "4px" }}>
          <div style={{ marginBottom: "8px" }}><AvatarComp size={48} /></div>
          <p style={{ margin: "0 0 2px", fontSize: "18px", fontWeight: 800, color: "#1D1C1D" }}>{displayName}</p>
          <p style={{ margin: 0, fontSize: "13px", color: "#868686" }}>
            This is a direct message between you and {displayName.split(" ")[0]}. Following up on today's Zoom session.
          </p>
        </div>

        {allVisible.map((msg, i) => {
          const prev = allVisible[i - 1];
          const showHeader = !prev || prev.from !== msg.from;
          return <DmMessageRow key={msg.id} msg={msg} showHeader={showHeader} />;
        })}

        {typing && <TypingIndicator name={displayName} AvatarComp={AvatarComp} />}
        <div ref={chatEndRef} style={{ height: 20 }} />
      </div>

      {/* Input */}
      <div style={{ padding: "10px 24px 20px", flexShrink: 0 }}>
        <div
          style={{
            border: "1px solid #D4D4D4",
            borderRadius: "10px",
            backgroundColor: "#FFFFFF",
            overflow: "hidden",
            transition: "border-color 0.15s",
          }}
          onFocus={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(99,102,241,0.55)"; }}
          onBlur={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "#D4D4D4"; }}
        >
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKey}
            placeholder={`Message ${displayName.split(" ")[0]} — Enter to send`}
            rows={2}
            style={{
              width: "100%", resize: "none", border: "none",
              padding: "13px 16px 6px",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "14px", color: "#1D1C1D",
              backgroundColor: "transparent",
              lineHeight: 1.55, outline: "none",
              boxSizing: "border-box", caretColor: "#4F46E5",
            }}
          />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", padding: "6px 12px 10px" }}>
            <button
              onClick={send}
              disabled={!inputValue.trim()}
              style={{
                padding: "6px 16px",
                borderRadius: "6px",
                border: "none",
                backgroundColor: inputValue.trim() ? "#4F46E5" : "#E8E8E8",
                color: inputValue.trim() ? "#FFFFFF" : "#9CA3AF",
                fontSize: "13px", fontWeight: 700,
                cursor: inputValue.trim() ? "pointer" : "default",
                fontFamily: "'DM Sans', sans-serif",
                transition: "all 0.15s",
              }}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const WaypointPostSimulation: React.FC<WaypointPostSimulationProps> = ({ onContinue }) => {
  const [activeDm, setActiveDm] = useState<"kira" | "dev">("kira");
  const [read, setRead] = useState<Record<string, boolean>>({ kira: false, dev: false });

  const openDm = (person: "kira" | "dev") => {
    setActiveDm(person);
    setRead((prev) => ({ ...prev, [person]: true }));
  };

  const DMS = [
    { id: "kira" as const, name: "Kira Morningstar", AvatarComp: KiraAvatar, messages: KIRA_MESSAGES },
    { id: "dev" as const, name: "Dev Sharma", AvatarComp: DevAvatar, messages: DEV_MESSAGES },
  ];

  const active = DMS.find((d) => d.id === activeDm)!;

  return (
    <>
      <style>{`
        @keyframes slack-typing {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-5px); opacity: 1; }
        }
      `}</style>

      {/* Same dark blue gradient shell as WaypointSimulation */}
      <div
        style={{
          width: "100vw",
          height: "100vh",
          background: "linear-gradient(135deg, #0D1F3C 0%, #1B3A6B 60%, #1A3569 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'DM Sans', sans-serif",
          padding: "16px 20px 20px",
          boxSizing: "border-box",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Ambient blobs */}
        <div style={{ position: "absolute", top: "-80px", left: "-80px", width: "340px", height: "340px", borderRadius: "50%", background: "rgba(99,102,241,0.08)", filter: "blur(60px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-60px", right: "-80px", width: "300px", height: "300px", borderRadius: "50%", background: "rgba(79,70,229,0.07)", filter: "blur(50px)", pointerEvents: "none" }} />

        {/* Waypoint logo */}
        <div style={{ position: "absolute", top: 12, left: 16, zIndex: 10, pointerEvents: "none", backgroundColor: "#FFFFFF", borderRadius: "12px", padding: "6px 12px", boxShadow: "0 2px 12px rgba(0,0,0,0.18)" }}>
          <img src="/waypoint.png" alt="Waypoint" style={{ height: 36, width: "auto", display: "block" }} />
        </div>

        {/* Nav row */}
        <div style={{ width: "min(900px, 88vw)", display: "flex", alignItems: "center", justifyContent: "flex-end", marginBottom: "10px", flexShrink: 0 }}>
          <button
            onClick={onContinue}
            style={{ display: "flex", alignItems: "center", gap: "5px", background: "none", border: "none", color: "rgba(255,255,255,0.3)", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 500, cursor: "pointer", padding: "4px 2px", transition: "color 0.15s ease" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.65)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.3)"; }}
          >
            Exit to dashboard
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* macOS window card — exact same size as simulation */}
        <div
          style={{
            width: "min(900px, 88vw)",
            height: "min(620px, 78vh)",
            flexShrink: 0,
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.06)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Titlebar */}
          <div
            style={{
              height: "34px",
              backgroundColor: "#EBEBEB",
              borderBottom: "1px solid #D0D0D0",
              display: "flex",
              alignItems: "center",
              padding: "0 14px",
              gap: "7px",
              flexShrink: 0,
              position: "relative",
            }}
          >
            {["#FF5F57", "#FEBC2E", "#28C840"].map((color, i) => (
              <div key={i} style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: color, flexShrink: 0 }} />
            ))}
            <span
              style={{
                position: "absolute", left: 0, right: 0, textAlign: "center",
                fontSize: "12px", fontWeight: 600, color: "#888888",
                pointerEvents: "none", whiteSpace: "nowrap", overflow: "hidden",
                textOverflow: "ellipsis", padding: "0 120px",
              }}
            >
              Slack — Direct Messages — Clearwater
            </span>
          </div>

          {/* Window content — flex row: sidebar + active DM */}
          <div style={{ flex: 1, minHeight: 0, display: "flex", overflow: "hidden", backgroundColor: "#FFFFFF" }}>

            {/* Sidebar */}
            <div
              style={{
                width: "216px",
                flexShrink: 0,
                backgroundColor: "#F4F4F4",
                borderRight: "1px solid #E8E8E8",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
              }}
            >
              <div style={{ padding: "15px 16px 12px", borderBottom: "1px solid #E8E8E8" }}>
                <p style={{ fontSize: "15px", fontWeight: 800, color: "#1D1C1D", margin: "0 0 1px" }}>Clearwater</p>
                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", backgroundColor: "#22C55E" }} />
                  <span style={{ fontSize: "11px", color: "#868686" }}>Aiyana Yerxa</span>
                </div>
              </div>

              {/* Channels (decorative) */}
              <div style={{ padding: "10px 10px 0" }}>
                <p style={{ fontSize: "11px", fontWeight: 700, color: "#868686", letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 4px 8px" }}>Channels</p>
                {["annual-report-2025", "general", "resources"].map((ch) => (
                  <div key={ch} style={{ display: "flex", alignItems: "center", gap: "7px", padding: "5px 8px", borderRadius: "6px", marginBottom: "1px", cursor: "default", opacity: 0.65 }}>
                    <span style={{ fontSize: "14px", color: "#868686" }}>#</span>
                    <span style={{ fontSize: "13px", color: "#616061" }}>{ch}</span>
                  </div>
                ))}
              </div>

              {/* Direct Messages */}
              <div style={{ padding: "14px 10px 0" }}>
                <p style={{ fontSize: "11px", fontWeight: 700, color: "#868686", letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 5px 8px" }}>Direct Messages</p>
                {DMS.map(({ id, name, AvatarComp }) => {
                  const isActive = activeDm === id;
                  const isUnread = !read[id];
                  return (
                    <button
                      key={id}
                      onClick={() => openDm(id)}
                      style={{
                        display: "flex", alignItems: "center", gap: "8px", width: "100%",
                        padding: "5px 8px", borderRadius: "6px", marginBottom: "2px",
                        border: "none", textAlign: "left", cursor: "pointer",
                        backgroundColor: isActive ? "rgba(99,102,241,0.12)" : "transparent",
                        transition: "background-color 0.12s", fontFamily: "'DM Sans', sans-serif",
                      }}
                      onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.backgroundColor = "#EBEBEB"; }}
                      onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.backgroundColor = "transparent"; }}
                    >
                      <AvatarComp size={18} />
                      <span style={{ fontSize: "13px", fontWeight: isUnread ? 700 : 400, color: isActive ? "#4F46E5" : isUnread ? "#1D1C1D" : "#616061", flex: 1 }}>
                        {name.split(" ")[0]}
                      </span>
                      {isUnread && (
                        <div style={{ minWidth: 18, height: 18, borderRadius: "999px", backgroundColor: "#4F46E5", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <span style={{ fontSize: "10px", fontWeight: 700, color: "#FFFFFF" }}>!</span>
                        </div>
                      )}
                    </button>
                  );
                })}
                <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "5px 8px", borderRadius: "6px", opacity: 0.55, cursor: "default" }}>
                  <AiyanaAvatar size={18} />
                  <span style={{ fontSize: "13px", color: "#616061" }}>Aiyana (you)</span>
                </div>
              </div>
            </div>

            {/* Active DM thread */}
            <DmThread
              key={activeDm}
              person={activeDm}
              AvatarComp={active.AvatarComp}
              displayName={active.name}
              allMessages={active.messages}
              onContinue={onContinue}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default WaypointPostSimulation;
