import React, { useState, useEffect, useRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Sender = "kira" | "dev" | "student";
type CallMode = "video" | "thread";

interface Message {
  id: number;
  sender: Sender;
  text: string;
  viaVoice?: boolean;
}

interface WaypointSimulationProps {
  mode: CallMode;
  onComplete: () => void;
  onBack: () => void;
  onExit: () => void;
}

// ─── Conversation Script ──────────────────────────────────────────────────────

const OPENING: { sender: Sender; text: string; delay: number }[] = [
  {
    sender: "kira",
    delay: 1200,
    text: "Aiyana — glad you're here. I wanted a fresh set of eyes on this before we loop in the whole team. Dev sent over the annual report draft this morning. Have you had a chance to look at it yet?",
  },
  {
    sender: "dev",
    delay: 5500,
    text: "Hey Aiyana. Just to give you context — the numbers are accurate, 847 participants, 23% improvement year-over-year. I used an AI tool to pull it together. Kira flagged some language concerns, but I think it reads cleanly.",
  },
];

const RESPONSE_PHASES: Record<
  number,
  { sender: Sender; text: string; delay: number }[]
> = {
  1: [
    {
      sender: "kira",
      delay: 2200,
      text: "That's useful context, Aiyana. My concern is the last sentence — 'resource optimization across target demographics.' This report goes to families whose kids are in our programs. Does that phrase land right to you?",
    },
    {
      sender: "dev",
      delay: 6000,
      text: "I hear that. But funders are the primary readers here — that kind of language signals rigour to them. I'm not sure the community audience is parsing it the same way Kira is.",
    },
  ],
  2: [
    {
      sender: "dev",
      delay: 2000,
      text: "Okay but here's the practical issue — if we rewrite the tone from scratch, we miss the submission window. The draft is done. The numbers are solid.",
    },
    {
      sender: "kira",
      delay: 6500,
      text: "It's in our funding agreement that this goes to the community too, Dev — not just funders. Aiyana, you've worked with both sides of this. What do you think is actually at stake here?",
    },
  ],
  3: [
    {
      sender: "kira",
      delay: 2000,
      text: "Aiyana — you've heard both of us. If this were your call, what would you do with this draft?",
    },
    {
      sender: "dev",
      delay: 5000,
      text: "I'll be honest — I'm genuinely open to being wrong here. Take your time.",
    },
  ],
};

const CLOSING_MESSAGES: { sender: Sender; text: string; delay: number }[] = [
  {
    sender: "kira",
    delay: 1800,
    text: "That's exactly the kind of instinct I was hoping you'd bring. Thank you, Aiyana — seriously.",
  },
  {
    sender: "dev",
    delay: 4500,
    text: "Okay. Yeah. I think I can work with that. Let me pull the doc up and we can mark the sections together.",
  },
];

const NUDGES: Record<string, string> = {
  pause: "They're waiting for your take. There's no obvious right answer here.",
  disagree:
    "You pushed back a little there. Notice how they both responded to you.",
  closing: "They're asking you to make a call. What do you actually think?",
};

// ─── Micro-questions ──────────────────────────────────────────────────────────

interface MicroQuestion {
  id: string;
  question: string;
  options: { label: string; emoji: string; value: string }[];
}

const MICRO_QUESTIONS: MicroQuestion[] = [
  {
    id: "opening_feeling",
    question: "How are you feeling stepping into this?",
    options: [
      { emoji: "😰", label: "Uncertain", value: "uncertain" },
      { emoji: "😐", label: "Curious", value: "curious" },
      { emoji: "💪", label: "Ready", value: "ready" },
    ],
  },
  {
    id: "pressure_to_agree",
    question: "Did you feel pressure to take a side just now?",
    options: [
      { emoji: "✅", label: "Yes, immediately", value: "yes" },
      { emoji: "🤔", label: "A little", value: "a_little" },
      { emoji: "🙅", label: "Not really", value: "no" },
    ],
  },
  {
    id: "clarity_of_point",
    question: "How clearly did you state your position?",
    options: [
      { emoji: "😬", label: "Vague", value: "vague" },
      { emoji: "↔️", label: "Somewhat", value: "somewhat" },
      { emoji: "🎯", label: "Crystal clear", value: "clear" },
    ],
  },
  {
    id: "said_what_believed",
    question: "Did you say what you actually believed?",
    options: [
      { emoji: "💯", label: "Fully", value: "fully" },
      { emoji: "🙂", label: "Mostly", value: "mostly" },
      { emoji: "😶", label: "Held back", value: "held_back" },
    ],
  },
];

// ─── Avatars ──────────────────────────────────────────────────────────────────

const KiraAvatar = ({ size = 32 }: { size?: number }) => (
  <svg width={size} height={size} viewBox='0 0 32 32' fill='none'>
    <circle cx='16' cy='16' r='16' fill='#FCA5A5' />
    <circle cx='16' cy='13' r='5.5' fill='#7F1D1D' />
    <ellipse cx='16' cy='26' rx='8.5' ry='6' fill='#7F1D1D' />
  </svg>
);

const DevAvatar = ({ size = 32 }: { size?: number }) => (
  <svg width={size} height={size} viewBox='0 0 32 32' fill='none'>
    <circle cx='16' cy='16' r='16' fill='#FDE68A' />
    <circle cx='16' cy='13' r='5.5' fill='#92400E' />
    <ellipse cx='16' cy='26' rx='8.5' ry='6' fill='#92400E' />
  </svg>
);

const SelfAvatar = ({ size = 32 }: { size?: number }) => (
  <svg width={size} height={size} viewBox='0 0 32 32' fill='none'>
    <circle cx='16' cy='16' r='16' fill='#E0E7FF' />
    <circle cx='16' cy='13' r='5.5' fill='#4338CA' />
    <ellipse cx='16' cy='26' rx='8.5' ry='6' fill='#4338CA' />
  </svg>
);

const avatarFor = (sender: Sender, size = 32) => {
  if (sender === "kira") return <KiraAvatar size={size} />;
  if (sender === "dev") return <DevAvatar size={size} />;
  return <SelfAvatar size={size} />;
};

// ─── Shared Document ──────────────────────────────────────────────────────────

const TheDocument = ({ compact = false }: { compact?: boolean }) => (
  <div
    style={{
      backgroundColor: "#FFFEF7",
      borderRadius: compact ? "8px" : "12px",
      border: "1px solid #E8E0CC",
      padding: compact ? "14px 14px 14px 20px" : "22px 22px 22px 30px",
      position: "relative",
      fontFamily: "Georgia, serif",
    }}
  >
    <div
      style={{
        position: "absolute",
        top: 0,
        left: compact ? "14px" : "20px",
        bottom: 0,
        width: "1px",
        backgroundColor: "rgba(220,180,160,0.4)",
        pointerEvents: "none",
      }}
    />
    {!compact && (
      <div
        style={{
          position: "absolute",
          top: "-10px",
          right: "16px",
          backgroundColor: "#FEF9C3",
          padding: "7px 11px",
          borderRadius: "2px",
          boxShadow: "1px 2px 5px rgba(0,0,0,0.14)",
          transform: "rotate(2deg)",
          maxWidth: "130px",
          zIndex: 2,
        }}
      >
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "10px",
            fontStyle: "italic",
            color: "#3D2A00",
            lineHeight: "1.4",
            margin: 0,
          }}
        >
          Kira flagged this. Read before the call.
        </p>
      </div>
    )}
    <div
      style={{
        borderBottom: "1px solid #EDE9DF",
        paddingBottom: compact ? "10px" : "12px",
        marginBottom: compact ? "10px" : "14px",
      }}
    >
      <p
        style={{
          fontSize: compact ? "9px" : "10px",
          color: "#8B7355",
          letterSpacing: "0.07em",
          textTransform: "uppercase",
          margin: "0 0 3px 0",
        }}
      >
        Clearwater Indigenous Youth Foundation
      </p>
      <p
        style={{
          fontSize: compact ? "12px" : "15px",
          fontWeight: 700,
          color: "#1C1410",
          margin: 0,
        }}
      >
        Draft — Annual Community Impact Report 2025
      </p>
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "5px",
          backgroundColor: "#F0EBE0",
          border: "1px solid #D4C9A8",
          borderRadius: "50px",
          padding: "2px 8px",
          marginTop: "6px",
        }}
      >
        <div
          style={{
            width: 4,
            height: 4,
            borderRadius: "50%",
            backgroundColor: "#8B7355",
          }}
        />
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "10px",
            fontStyle: "italic",
            color: "#6B5B3E",
          }}
        >
          AI-generated first draft
        </span>
      </div>
    </div>
    <p
      style={{
        fontSize: compact ? "12px" : "13px",
        lineHeight: "1.9",
        color: "#2C2416",
        margin: 0,
      }}
    >
      The organization delivered programming to{" "}
      <strong>847 youth participants</strong> across{" "}
      <strong>12 community-based initiatives</strong> during the 2025 fiscal
      year. Engagement metrics improved by <strong>23% year-over-year</strong>,
      reflecting strengthened outreach capacity and increased program retention
      rates. Strategic partnerships with four regional stakeholders enabled
      expanded service delivery and resource optimization across{" "}
      <span
        style={{
          backgroundColor: "rgba(253,224,71,0.45)",
          borderRadius: "2px",
          padding: "0 2px",
        }}
      >
        target demographics
      </span>
      .
    </p>
  </div>
);

// ─── Icons ────────────────────────────────────────────────────────────────────

const MicIcon = ({
  muted = false,
  size = 18,
}: {
  muted?: boolean;
  size?: number;
}) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    {muted ? (
      <>
        <line x1='1' y1='1' x2='23' y2='23' />
        <path d='M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6' />
        <path d='M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23' />
        <line x1='12' y1='19' x2='12' y2='23' />
        <line x1='8' y1='23' x2='16' y2='23' />
      </>
    ) : (
      <>
        <path d='M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z' />
        <path d='M19 10v2a7 7 0 0 1-14 0v-2' />
        <line x1='12' y1='19' x2='12' y2='23' />
        <line x1='8' y1='23' x2='16' y2='23' />
      </>
    )}
  </svg>
);

const CameraIcon = ({
  off = false,
  size = 18,
}: {
  off?: boolean;
  size?: number;
}) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    {off ? (
      <>
        <line x1='1' y1='1' x2='23' y2='23' />
        <path d='M21 21H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3m3-3h6l2 3h4a2 2 0 0 1 2 2v9.34' />
        <circle cx='12' cy='13' r='3' />
      </>
    ) : (
      <>
        <polygon points='23 7 16 12 23 17 23 7' />
        <rect x='1' y='5' width='15' height='14' rx='2' ry='2' />
      </>
    )}
  </svg>
);

const SendIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2.2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <line x1='22' y1='2' x2='11' y2='13' />
    <polygon points='22 2 15 22 11 13 2 9 22 2' />
  </svg>
);

// ─── Micro Nudge Toast ────────────────────────────────────────────────────────

const MicroNudgeToast: React.FC<{
  question: MicroQuestion;
  onAnswer: (questionId: string, value: string) => void;
  onDismiss: () => void;
  visible: boolean;
}> = ({ question, onAnswer, onDismiss, visible }) => {
  const [answered, setAnswered] = useState<string | null>(null);

  const handleAnswer = (value: string) => {
    setAnswered(value);
    onAnswer(question.id, value);
    setTimeout(onDismiss, 900);
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: 28,
        right: 28,
        transform: `translateY(${visible ? 0 : 20}px)`,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.3s ease, transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
        zIndex: 9999,
        width: "320px",
        backgroundColor: "#1A1D2E",
        borderRadius: "14px",
        boxShadow: "0 12px 40px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.20)",
        border: "1px solid rgba(255,255,255,0.10)",
        overflow: "hidden",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Progress bar (auto-dismiss indicator) */}
      <div style={{ height: "2px", backgroundColor: "rgba(255,255,255,0.08)", position: "relative" }}>
        <div
          style={{
            position: "absolute", top: 0, left: 0, height: "100%",
            backgroundColor: "#6366F1", borderRadius: "2px",
            animation: visible ? "nudge-progress 12s linear forwards" : "none",
          }}
        />
      </div>

      <div style={{ padding: "14px 16px 16px" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
            <div style={{ width: "18px", height: "18px", borderRadius: "5px", backgroundColor: "rgba(99,102,241,0.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="10" height="10" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 11L14 29L20 11L26 29L32 11" stroke="#A5B4FC" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#A5B4FC" }}>Quick check-in</span>
          </div>
          <button onClick={onDismiss} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.35)", padding: "2px", lineHeight: 1, fontSize: "16px" }}>×</button>
        </div>

        {/* Question */}
        <p style={{ margin: "0 0 12px", fontSize: "13px", fontWeight: 600, color: "rgba(255,255,255,0.90)", lineHeight: 1.45 }}>
          {question.question}
        </p>

        {/* Options */}
        <div style={{ display: "flex", gap: "7px" }}>
          {question.options.map((opt) => {
            const isChosen = answered === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => !answered && handleAnswer(opt.value)}
                style={{
                  flex: 1, padding: "9px 4px", borderRadius: "10px",
                  border: `1.5px solid ${isChosen ? "rgba(99,102,241,0.70)" : "rgba(255,255,255,0.10)"}`,
                  backgroundColor: isChosen ? "rgba(99,102,241,0.25)" : "rgba(255,255,255,0.06)",
                  cursor: answered ? "default" : "pointer",
                  display: "flex", flexDirection: "column", alignItems: "center", gap: "4px",
                  transition: "all 0.18s",
                  transform: isChosen ? "scale(1.05)" : "none",
                }}
                onMouseEnter={(e) => { if (!answered && !isChosen) e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.11)"; }}
                onMouseLeave={(e) => { if (!answered && !isChosen) e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.06)"; }}
              >
                <span style={{ fontSize: "18px", lineHeight: 1 }}>{opt.emoji}</span>
                <span style={{ fontSize: "10px", fontWeight: 600, color: isChosen ? "#A5B4FC" : "rgba(255,255,255,0.50)" }}>{opt.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ─── Conversation Engine Hook ─────────────────────────────────────────────────

function useConversationEngine(onComplete: () => void) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isAgentTyping, setIsAgentTyping] = useState(false);
  const [studentTurnCount, setStudentTurnCount] = useState(0);
  const [conversationEnded, setConversationEnded] = useState(false);
  const [nudge, setNudge] = useState<string | null>(null);
  const [nudgeFading, setNudgeFading] = useState(false);
  const [inputMounted, setInputMounted] = useState(false);
  const [speakingAgent, setSpeakingAgent] = useState<
    "kira" | "dev" | "both" | null
  >(null);
  const [microQuestion, setMicroQuestion] = useState<MicroQuestion | null>(null);
  const [microVisible, setMicroVisible] = useState(false);
  const answeredMicro = useRef<Set<string>>(new Set());
  const msgIdRef = useRef(0);
  const pauseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const nudgeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const microTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openedRef = useRef(false);

  const showMicroQuestion = (id: string) => {
    if (answeredMicro.current.has(id)) return;
    const q = MICRO_QUESTIONS.find(q => q.id === id);
    if (!q) return;
    setTimeout(() => {
      setMicroQuestion(q);
      setMicroVisible(true);
      microTimerRef.current = setTimeout(() => dismissMicroQuestion(), 12000);
    }, 2500);
  };

  const dismissMicroQuestion = () => {
    setMicroVisible(false);
    setTimeout(() => setMicroQuestion(null), 400);
    if (microTimerRef.current) clearTimeout(microTimerRef.current);
  };

  const answerMicroQuestion = (id: string, value: string) => {
    answeredMicro.current.add(id);
    console.log(`[Waypoint data] ${id}: ${value}`);
  };

  const showNudge = (key: string) => {
    if (nudge) return;
    setNudgeFading(false);
    setNudge(NUDGES[key]);
    nudgeTimerRef.current = setTimeout(() => {
      setNudgeFading(true);
      setTimeout(() => setNudge(null), 500);
    }, 6000);
  };

  const queueMessages = (
    msgs: { sender: Sender; text: string; delay: number }[],
    onDone?: () => void,
  ) => {
    setIsAgentTyping(true);
    const speakers = [
      ...new Set(
        msgs
          .map((m) => m.sender)
          .filter((s): s is "kira" | "dev" => s !== "student"),
      ),
    ];
    setSpeakingAgent(speakers.length === 2 ? "both" : (speakers[0] ?? null));
    let cumulative = 0;
    msgs.forEach((msg, i) => {
      cumulative += msg.delay;
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { id: ++msgIdRef.current, sender: msg.sender, text: msg.text },
        ]);
        if (i === msgs.length - 1) {
          setIsAgentTyping(false);
          setSpeakingAgent(null);
          onDone?.();
        }
      }, cumulative);
    });
  };

  useEffect(() => {
    if (openedRef.current) return;
    openedRef.current = true;
    queueMessages(OPENING, () => {
      setInputMounted(true);
      pauseTimerRef.current = setTimeout(() => showNudge("pause"), 8000);
      showMicroQuestion("opening_feeling");
    });
    return () => {
      if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
      if (nudgeTimerRef.current) clearTimeout(nudgeTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitMessage = (text: string, viaVoice = false) => {
    if (!text.trim() || isAgentTyping || conversationEnded) return false;
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    setMessages((prev) => [
      ...prev,
      { id: ++msgIdRef.current, sender: "student", text, viaVoice },
    ]);
    const turn = studentTurnCount + 1;
    setStudentTurnCount(turn);

    // Show micro-question after she sends, while waiting for the agent to reply
    if (turn === 1) showMicroQuestion("pressure_to_agree");
    if (turn === 2) showMicroQuestion("clarity_of_point");
    if (turn === 3) showMicroQuestion("said_what_believed");

    if (turn === 3) {
      queueMessages(RESPONSE_PHASES[3], () => { showNudge("closing"); });
    } else if (turn > 3) {
      queueMessages(CLOSING_MESSAGES, () => {
        setConversationEnded(true);
        setTimeout(() => onComplete(), 2000);
      });
    } else {
      const lower = text.toLowerCase();
      const disagreed =
        lower.includes("disagree") ||
        lower.includes("but") ||
        lower.includes("however") ||
        lower.includes("kira") ||
        lower.includes("not sure");
      queueMessages(RESPONSE_PHASES[turn], () => {
        if (disagreed && turn === 2) showNudge("disagree");
        pauseTimerRef.current = setTimeout(() => showNudge("pause"), 10000);
      });
    }
    return true;
  };

  return {
    messages,
    isAgentTyping,
    conversationEnded,
    nudge,
    nudgeFading,
    inputMounted,
    speakingAgent,
    microQuestion,
    microVisible,
    answerMicroQuestion,
    dismissMicroQuestion,
    submitMessage,
  };
}

// ─── Message List (Slack style — thread mode only) ────────────────────────────

const MessageList: React.FC<{
  messages: Message[];
  isAgentTyping: boolean;
}> = ({ messages, isAgentTyping }) => {
  const nameFor = (s: Sender) =>
    s === "kira" ? "Kira Morningstar" : s === "dev" ? "Dev Sharma" : "You";
  const roleFor = (s: Sender) =>
    s === "kira"
      ? "Program Director"
      : s === "dev"
        ? "Communications Coordinator"
        : "Communications Intern";
  const now = new Date();
  const timeStr = `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")} ${now.getHours() >= 12 ? "PM" : "AM"}`;

  const grouped: {
    sender: Sender;
    texts: { text: string; viaVoice?: boolean }[];
  }[] = [];
  messages.forEach((m) => {
    const last = grouped[grouped.length - 1];
    if (last && last.sender === m.sender)
      last.texts.push({ text: m.text, viaVoice: m.viaVoice });
    else
      grouped.push({
        sender: m.sender,
        texts: [{ text: m.text, viaVoice: m.viaVoice }],
      });
  });

  return (
    <>
      {grouped.map((g, i) => (
        <div
          key={i}
          className='sim-bubble'
          style={{ display: "flex", gap: "12px", marginBottom: "18px" }}
        >
          {avatarFor(g.sender, 36)}
          <div style={{ flex: 1 }}>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "8px",
                marginBottom: "2px",
              }}
            >
              <span
                style={{ fontWeight: 800, fontSize: "14px", color: "#1D1C1D" }}
              >
                {nameFor(g.sender)}
              </span>
              <span style={{ fontSize: "11px", color: "#888" }}>{timeStr}</span>
            </div>
            <span
              style={{
                fontSize: "11px",
                color: "#888",
                display: "block",
                marginBottom: "5px",
              }}
            >
              {roleFor(g.sender)}
            </span>
            {g.texts.map((t, ti) => (
              <p
                key={ti}
                style={{
                  fontSize: "14px",
                  color: "#1D1C1D",
                  lineHeight: "1.65",
                  margin: ti === 0 ? 0 : "4px 0 0 0",
                }}
              >
                {t.text}
              </p>
            ))}
          </div>
        </div>
      ))}
      {isAgentTyping && (
        <div
          className='sim-bubble'
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "10px",
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              backgroundColor: "#F1F5F9",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: 4,
                  height: 4,
                  borderRadius: "50%",
                  backgroundColor: "#94A3B8",
                  animation: `typing-dot 1.2s ease ${i * 0.2}s infinite`,
                  margin: "0 1px",
                }}
              />
            ))}
          </div>
          <span style={{ fontSize: "12px", color: "#94A3B8" }}>
            Someone is typing…
          </span>
        </div>
      )}
    </>
  );
};

// ─── VIDEO CALL MODE ──────────────────────────────────────────────────────────

const VideoCallMode: React.FC<{
  engine: ReturnType<typeof useConversationEngine>;
  onBack: () => void;
  onExit: () => void;
}> = ({ engine, onBack }) => {
  const { conversationEnded, nudge, nudgeFading, speakingAgent } = engine;
  const [micMuted, setMicMuted] = useState(false);
  const [cameraOff, setCameraOff] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const mm = String(Math.floor(elapsed / 60)).padStart(2, "0");
  const ss = String(elapsed % 60).padStart(2, "0");
  const kiraActive = speakingAgent === "kira" || speakingAgent === "both";
  const devActive = speakingAgent === "dev" || speakingAgent === "both";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        backgroundColor: "#F8F8F8",
        fontFamily: "'DM Sans', sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Top bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 18px",
          backgroundColor: "#FFFFFF",
          borderBottom: "1px solid #E8E8E8",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              backgroundColor: "#EF4444",
              animation: "live-pulse 1.6s ease infinite",
            }}
          />
          <span style={{ fontSize: "13px", fontWeight: 700, color: "#1D1C1D" }}>
            Clearwater Annual Report
          </span>
          <span
            style={{
              fontSize: "12px",
              color: "#868686",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {mm}:{ss}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          {(
            [
              { A: KiraAvatar, name: "Kira" },
              { A: DevAvatar, name: "Dev" },
            ] as const
          ).map(({ A, name }) => (
            <div key={name} title={name} style={{ position: "relative" }}>
              <A size={22} />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  backgroundColor: "#22C55E",
                  border: "1.5px solid #FFFFFF",
                }}
              />
            </div>
          ))}
          <span
            style={{ fontSize: "12px", color: "#868686", marginLeft: "4px" }}
          >
            +&nbsp;you · 3 total
          </span>
        </div>
      </div>

      {/* Body */}
      <div
        style={{
          display: "flex",
          flex: 1,
          overflow: "hidden",
          padding: "12px",
          gap: "10px",
        }}
      >
        {/* Screenshare */}
        <div
          style={{
            flex: "0 0 68%",
            backgroundColor: "#FFFFFF",
            borderRadius: "12px",
            border: "1px solid #E8E8E8",
            overflow: "hidden",
            position: "relative",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "7px",
              padding: "8px 14px",
              borderBottom: "1px solid #F0F0F0",
              flexShrink: 0,
            }}
          >
            <svg
              width='11'
              height='11'
              viewBox='0 0 24 24'
              fill='none'
              stroke='#868686'
              strokeWidth='2.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <rect x='2' y='3' width='20' height='14' rx='2' />
              <line x1='8' y1='21' x2='16' y2='21' />
              <line x1='12' y1='17' x2='12' y2='21' />
            </svg>
            <span
              style={{ fontSize: "11px", color: "#868686", fontWeight: 500 }}
            >
              Dev is sharing his screen
            </span>
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>
            <TheDocument />
          </div>
        </div>

        {/* Right: video tiles + nudge */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          {[
            {
              label: "Kira",
              role: "Program Director",
              A: KiraAvatar,
              speaking: kiraActive,
              muted: false,
              isSelf: false,
            },
            {
              label: "Dev",
              role: "Communications Coordinator",
              A: DevAvatar,
              speaking: devActive,
              muted: false,
              isSelf: false,
            },
            {
              label: "You",
              role: "Comms Intern",
              A: SelfAvatar,
              speaking: false,
              muted: micMuted,
              isSelf: true,
            },
          ].map(({ label, role, A, speaking, muted, isSelf }) => (
            <div
              key={label}
              style={{
                flex: 1,
                backgroundColor: "#FFFFFF",
                borderRadius: "10px",
                border: `2px solid ${speaking ? "#22C55E" : "#E8E8E8"}`,
                boxShadow: speaking ? "0 0 12px rgba(34,197,94,0.2)" : "none",
                transition: "border-color 0.25s ease, box-shadow 0.25s ease",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {isSelf && cameraOff ? (
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      backgroundColor: "#F1F5F9",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CameraIcon off size={16} />
                  </div>
                ) : (
                  <A size={38} />
                )}
              </div>
              {speaking && (
                <div
                  style={{
                    position: "absolute",
                    bottom: "26px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    display: "flex",
                    gap: "2px",
                    alignItems: "flex-end",
                  }}
                >
                  {[4, 7, 5, 9, 4].map((h, i) => (
                    <div
                      key={i}
                      style={{
                        width: 2,
                        height: `${h}px`,
                        backgroundColor: "#22C55E",
                        borderRadius: "2px",
                        animation: `speak-bar 0.6s ease ${i * 0.1}s infinite alternate`,
                      }}
                    />
                  ))}
                </div>
              )}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "4px 8px",
                  background: "linear-gradient(transparent, rgba(0,0,0,0.07))",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "#1D1C1D",
                    }}
                  >
                    {label}
                  </span>
                  <span
                    style={{
                      fontSize: "10px",
                      color: "#868686",
                      marginLeft: "5px",
                    }}
                  >
                    {role}
                  </span>
                </div>
                {muted && (
                  <svg
                    width='9'
                    height='9'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='#EF4444'
                    strokeWidth='2.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <line x1='1' y1='1' x2='23' y2='23' />
                    <path d='M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6' />
                  </svg>
                )}
              </div>
            </div>
          ))}

          {nudge && (
            <div
              style={{
                padding: "9px 12px",
                backgroundColor: "#EEF2FF",
                borderRadius: "8px",
                border: "1px solid #C7D2FE",
                opacity: nudgeFading ? 0 : 1,
                transition: "opacity 0.5s ease",
                flexShrink: 0,
              }}
            >
              <p
                style={{
                  fontSize: "12px",
                  fontStyle: "italic",
                  color: "#4338CA",
                  margin: 0,
                  lineHeight: "1.5",
                }}
              >
                {nudge}
              </p>
            </div>
          )}

          {conversationEnded && (
            <div
              style={{
                padding: "8px 12px",
                backgroundColor: "#F0FDF4",
                borderRadius: "8px",
                border: "1px solid #BBF7D0",
                flexShrink: 0,
              }}
            >
              <p
                style={{
                  fontSize: "12px",
                  color: "#15803D",
                  margin: 0,
                  fontWeight: 600,
                }}
              >
                Call ended
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Control bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          padding: "9px 24px",
          backgroundColor: "#FFFFFF",
          borderTop: "1px solid #E8E8E8",
          flexShrink: 0,
        }}
      >
        {[
          {
            label: micMuted ? "Unmute" : "Mute",
            icon: <MicIcon muted={micMuted} size={16} />,
            danger: micMuted,
            onClick: () => setMicMuted((v) => !v),
          },
          {
            label: cameraOff ? "Start video" : "Stop video",
            icon: <CameraIcon off={cameraOff} size={16} />,
            danger: cameraOff,
            onClick: () => setCameraOff((v) => !v),
          },
        ].map(({ label, icon, danger, onClick }) => (
          <button
            key={label}
            onClick={onClick}
            title={label}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "3px",
              padding: "7px 14px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: danger ? "#FEF2F2" : "#F4F4F4",
              color: danger ? "#EF4444" : "#4B5563",
              cursor: "pointer",
              transition: "all 0.15s ease",
              minWidth: "64px",
              fontFamily: "'DM Sans', sans-serif",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                danger ? "#FEE2E2" : "#EBEBEB";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                danger ? "#FEF2F2" : "#F4F4F4";
            }}
          >
            {icon}
            <span style={{ fontSize: "10px", fontWeight: 500 }}>{label}</span>
          </button>
        ))}
        <div style={{ flex: 1, maxWidth: "120px" }} />
        <button
          onClick={onBack}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "7px",
            padding: "8px 18px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#DC2626",
            color: "#fff",
            cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "13px",
            fontWeight: 700,
            transition: "background-color 0.15s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor =
              "#B91C1C";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor =
              "#DC2626";
          }}
        >
          <svg
            width='14'
            height='14'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path d='M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.42 19.42 0 0 1 4.43 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.34 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.32 9.91' />
            <line x1='23' y1='1' x2='1' y2='23' />
          </svg>
          Leave
        </button>
      </div>
    </div>
  );
};

// ─── SLACK THREAD MODE ────────────────────────────────────────────────────────

const ThreadMode: React.FC<{
  engine: ReturnType<typeof useConversationEngine>;
  onBack: () => void;
  onExit: () => void;
}> = ({ engine }) => {
  const {
    messages,
    isAgentTyping,
    conversationEnded,
    nudge,
    nudgeFading,
    inputMounted,
    submitMessage,
  } = engine;
  const [inputValue, setInputValue] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isAgentTyping]);

  const handleSend = () => {
    const t = inputValue.trim();
    if (!t) return;
    if (submitMessage(t, false)) setInputValue("");
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  const canSend =
    inputValue.trim().length > 0 && !isAgentTyping && !conversationEnded;

  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        backgroundColor: "#FFFFFF",
        fontFamily: "'DM Sans', sans-serif",
        overflow: "hidden",
      }}
    >
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
        <div
          style={{
            padding: "15px 16px 12px",
            borderBottom: "1px solid #E8E8E8",
          }}
        >
          <p
            style={{
              fontSize: "15px",
              fontWeight: 800,
              color: "#1D1C1D",
              margin: 0,
            }}
          >
            Clearwater
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              marginTop: "4px",
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                backgroundColor: "#22C55E",
              }}
            />
            <span style={{ fontSize: "11px", color: "#868686" }}>
              Aiyana Yerxa
            </span>
          </div>
        </div>

        <div style={{ padding: "12px 10px 0" }}>
          <p
            style={{
              fontSize: "11px",
              fontWeight: 700,
              color: "#868686",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              margin: "0 0 5px 8px",
            }}
          >
            Channels
          </p>
          {[
            { name: "general", active: false },
            { name: "annual-report-2025", active: true },
            { name: "programs", active: false },
            { name: "interns", active: false },
          ].map(({ name, active }) => (
            <div
              key={name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                padding: "5px 8px",
                borderRadius: "6px",
                backgroundColor: active ? "rgba(79,70,229,0.1)" : "transparent",
                marginBottom: "1px",
                cursor: "default",
              }}
            >
              <span
                style={{
                  fontSize: "14px",
                  color: active ? "#4F46E5" : "#868686",
                  lineHeight: 1,
                }}
              >
                #
              </span>
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: active ? 700 : 400,
                  color: active ? "#1D1C1D" : "#868686",
                }}
              >
                {name}
              </span>
            </div>
          ))}
        </div>

        <div style={{ padding: "14px 10px 0" }}>
          <p
            style={{
              fontSize: "11px",
              fontWeight: 700,
              color: "#868686",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              margin: "0 0 5px 8px",
            }}
          >
            Direct Messages
          </p>
          {(
            [
              { name: "Kira", A: KiraAvatar },
              { name: "Dev", A: DevAvatar },
            ] as const
          ).map(({ name, A }) => (
            <div
              key={name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "5px 8px",
                borderRadius: "6px",
                marginBottom: "1px",
                cursor: "default",
              }}
            >
              <A size={18} />
              <span style={{ fontSize: "13px", color: "#616061" }}>{name}</span>
              <div
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  backgroundColor: "#22C55E",
                  marginLeft: "auto",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Main channel */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "13px 24px 11px",
            borderBottom: "1px solid #E8E8E8",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            flexShrink: 0,
          }}
        >
          <span style={{ fontSize: "16px", fontWeight: 800, color: "#1D1C1D" }}>
            # annual-report-2025
          </span>
          <div style={{ width: 1, height: 16, backgroundColor: "#E8E8E8" }} />
          <span style={{ fontSize: "12px", color: "#868686" }}>3 members</span>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px 0" }}>
          {/* Pinned doc */}
          <div
            style={{
              marginBottom: "22px",
              padding: "12px 16px",
              backgroundColor: "#F8F8F8",
              borderRadius: "8px",
              border: "1px solid #E8E8E8",
              borderLeft: "3px solid #4F46E5",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                marginBottom: "8px",
              }}
            >
              <svg
                width='12'
                height='12'
                viewBox='0 0 24 24'
                fill='none'
                stroke='rgba(99,102,241,0.75)'
                strokeWidth='2.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <line x1='21' y1='10' x2='7' y2='10' />
                <line x1='21' y1='6' x2='3' y2='6' />
                <line x1='21' y1='14' x2='3' y2='14' />
                <line x1='21' y1='18' x2='7' y2='18' />
              </svg>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "rgba(99,102,241,0.75)",
                }}
              >
                Pinned · Draft for review
              </span>
            </div>
            <TheDocument compact />
          </div>

          <MessageList messages={messages} isAgentTyping={isAgentTyping} />

          {nudge && (
            <div
              style={{
                margin: "12px 0",
                padding: "10px 14px",
                backgroundColor: "rgba(99,102,241,0.06)",
                borderRadius: "8px",
                border: "1px solid rgba(99,102,241,0.14)",
                opacity: nudgeFading ? 0 : 1,
                transition: "opacity 0.5s ease",
              }}
            >
              <p
                style={{
                  fontSize: "13px",
                  fontStyle: "italic",
                  color: "#868686",
                  margin: 0,
                  lineHeight: "1.5",
                }}
              >
                {nudge}
              </p>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Slack input */}
        <div
          style={{
            padding: "10px 24px 20px",
            flexShrink: 0,
            opacity: inputMounted ? 1 : 0,
            transition: "opacity 0.4s ease",
          }}
        >
          <div
            style={{
              border: "1px solid #D4D4D4",
              borderRadius: "10px",
              backgroundColor: "#FFFFFF",
              overflow: "hidden",
            }}
            onFocus={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor =
                "rgba(99,102,241,0.55)";
            }}
            onBlur={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = "#D4D4D4";
            }}
          >
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={conversationEnded || !inputMounted}
              placeholder={
                conversationEnded
                  ? "Conversation ended."
                  : "Message #annual-report-2025 — Enter to send"
              }
              rows={2}
              style={{
                width: "100%",
                resize: "none",
                border: "none",
                padding: "13px 16px 6px",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "14px",
                color: "#1D1C1D",
                backgroundColor: "transparent",
                lineHeight: "1.55",
                outline: "none",
                boxSizing: "border-box",
                caretColor: "#4F46E5",
              }}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "6px 12px 10px",
              }}
            >
              <div style={{ display: "flex", gap: "4px" }}>
                {["😊", "@"].map((icon) => (
                  <button
                    key={icon}
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "6px",
                      border: "none",
                      backgroundColor: "transparent",
                      color: "#868686",
                      cursor: "pointer",
                      fontSize: icon === "@" ? "12px" : "14px",
                      fontWeight: icon === "@" ? 700 : 400,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {icon}
                  </button>
                ))}
              </div>
              <button
                onClick={handleSend}
                disabled={!canSend}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "6px 14px",
                  borderRadius: "7px",
                  border: "none",
                  backgroundColor: canSend ? "#4F46E5" : "#F4F4F4",
                  color: canSend ? "#fff" : "#868686",
                  cursor: canSend ? "pointer" : "default",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "12px",
                  fontWeight: 700,
                  transition: "all 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  if (canSend)
                    (
                      e.currentTarget as HTMLButtonElement
                    ).style.backgroundColor = "#4338CA";
                }}
                onMouseLeave={(e) => {
                  if (canSend)
                    (
                      e.currentTarget as HTMLButtonElement
                    ).style.backgroundColor = "#4F46E5";
                }}
              >
                <SendIcon size={12} /> Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Root ─────────────────────────────────────────────────────────────────────

const WaypointSimulation: React.FC<WaypointSimulationProps> = ({
  mode,
  onComplete,
  onBack,
  onExit,
}) => {
  const engine = useConversationEngine(onComplete);
  const isVideo = mode === "video";
  const titlebarBg = isVideo ? "#E8E8E8" : "#EBEBEB";
  const titlebarBorder = "#D0D0D0";
  const windowTitle = isVideo
    ? "Clearwater · Video Call — annual-report-2025"
    : "Slack — #annual-report-2025 — Clearwater";

  return (
    <>
      <style>{`
        @keyframes sim-bubble-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes typing-dot { 0%, 80%, 100% { opacity: 0.25; transform: scale(0.85); } 40% { opacity: 1; transform: scale(1); } }
        @keyframes live-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        @keyframes speak-bar { from { transform: scaleY(0.4); } to { transform: scaleY(1.5); } }
        @keyframes nudge-progress { from { width: 0%; } to { width: 100%; } }
        .sim-bubble { animation: sim-bubble-in 0.28s ease both; }
      `}</style>

      {/* Blue gradient shell */}
      <div
        style={{
          width: "100vw",
          height: "100vh",
          background:
            "linear-gradient(135deg, #0D1F3C 0%, #1B3A6B 60%, #1A3569 100%)",
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
        <div
          style={{
            position: "absolute",
            top: "-80px",
            left: "-80px",
            width: "340px",
            height: "340px",
            borderRadius: "50%",
            background: "rgba(99,102,241,0.08)",
            filter: "blur(60px)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-60px",
            right: "-80px",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "rgba(79,70,229,0.07)",
            filter: "blur(50px)",
            pointerEvents: "none",
          }}
        />

        {/* Nav row */}
        <div
          style={{
            width: "min(900px, 88vw)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "10px",
            flexShrink: 0,
          }}
        >
          <button
            onClick={onBack}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              background: "none",
              border: "none",
              color: "rgba(255,255,255,0.45)",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "13px",
              fontWeight: 500,
              cursor: "pointer",
              padding: "4px 2px",
              transition: "color 0.15s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color =
                "rgba(255,255,255,0.85)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color =
                "rgba(255,255,255,0.45)";
            }}
          >
            <svg
              width='14'
              height='14'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2.2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <polyline points='15 18 9 12 15 6' />
            </svg>
            Back to options
          </button>
          <button
            onClick={onExit}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              background: "none",
              border: "none",
              color: "rgba(255,255,255,0.3)",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "12px",
              fontWeight: 500,
              cursor: "pointer",
              padding: "4px 2px",
              transition: "color 0.15s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color =
                "rgba(255,255,255,0.65)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color =
                "rgba(255,255,255,0.3)";
            }}
          >
            Exit to dashboard
            <svg
              width='12'
              height='12'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2.2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <line x1='18' y1='6' x2='6' y2='18' />
              <line x1='6' y1='6' x2='18' y2='18' />
            </svg>
          </button>
        </div>

        {/* macOS window card */}
        <div
          style={{
            width: "min(900px, 88vw)",
            height: "min(620px, 78vh)",
            flexShrink: 0,
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow:
              "0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.06)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Titlebar */}
          <div
            style={{
              height: "34px",
              backgroundColor: titlebarBg,
              borderBottom: `1px solid ${titlebarBorder}`,
              display: "flex",
              alignItems: "center",
              padding: "0 14px",
              gap: "7px",
              flexShrink: 0,
              position: "relative",
            }}
          >
            {["#FF5F57", "#FEBC2E", "#28C840"].map((color, i) => (
              <div
                key={i}
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  backgroundColor: color,
                  flexShrink: 0,
                }}
              />
            ))}
            <span
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                textAlign: "center",
                fontSize: "12px",
                fontWeight: 600,
                color: "#888888",
                pointerEvents: "none",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                padding: "0 120px",
              }}
            >
              {windowTitle}
            </span>
          </div>

          {/* Content */}
          <div
            style={{
              flex: 1,
              minHeight: 0,
              display: "flex",
              overflow: "hidden",
            }}
          >
            {isVideo ? (
              <VideoCallMode engine={engine} onBack={onBack} onExit={onExit} />
            ) : (
              <ThreadMode engine={engine} onBack={onBack} onExit={onExit} />
            )}
          </div>
        </div>
      </div>

      {/* Micro-nudge toast — fixed bottom-center over everything */}
      {engine.microQuestion && (
        <MicroNudgeToast
          question={engine.microQuestion}
          visible={engine.microVisible}
          onAnswer={engine.answerMicroQuestion}
          onDismiss={engine.dismissMicroQuestion}
        />
      )}
    </>
  );
};

export default WaypointSimulation;
