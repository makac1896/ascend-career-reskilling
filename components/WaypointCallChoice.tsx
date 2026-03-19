import React, { useState, useEffect } from "react";

interface WaypointCallChoiceProps {
  onChoice: (mode: "video" | "thread") => void;
  onBack: () => void;
  onGoToDashboard: () => void;
}

const KiraAvatar = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox='0 0 32 32' fill='none'>
    <circle cx='16' cy='16' r='16' fill='#FCA5A5' />
    <circle cx='16' cy='13' r='5.5' fill='#7F1D1D' />
    <ellipse cx='16' cy='26' rx='8.5' ry='6' fill='#7F1D1D' />
  </svg>
);

const DevAvatar = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox='0 0 32 32' fill='none'>
    <circle cx='16' cy='16' r='16' fill='#FDE68A' />
    <circle cx='16' cy='13' r='5.5' fill='#92400E' />
    <ellipse cx='16' cy='26' rx='8.5' ry='6' fill='#92400E' />
  </svg>
);

const WaypointCallChoice: React.FC<WaypointCallChoiceProps> = ({
  onChoice,
  onBack,
  onGoToDashboard,
}) => {
  const [visible, setVisible] = useState(false);
  const [messageVisible, setMessageVisible] = useState(false);
  const [buttonsVisible, setButtonsVisible] = useState(false);
  const [hovered, setHovered] = useState<"video" | "thread" | null>(null);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 120);
    const t2 = setTimeout(() => setMessageVisible(true), 600);
    const t3 = setTimeout(() => setButtonsVisible(true), 1400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const choose = (mode: "video" | "thread") => {
    onChoice(mode);
  };

  return (
    <>
      <style>{`
        @keyframes choice-in {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes msg-bubble-in {
          from { opacity: 0; transform: translateY(10px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes btns-in {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes typing-dot {
          0%, 80%, 100% { opacity: 0.25; transform: scale(0.85); }
          40% { opacity: 1; transform: scale(1); }
        }
      `}</style>
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
          boxSizing: "border-box",
        }}
      >
        {/* Waypoint logo */}
        <img src="/waypoint.png" alt="Waypoint" style={{ position: "absolute", top: 16, left: 20, height: 44, width: "auto", zIndex: 10, pointerEvents: "none" }} />

        {/* Back button */}
        <button
          onClick={onBack}
          style={{
            position: "absolute",
            top: "20px",
            left: "24px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            background: "none",
            border: "none",
            color: "rgba(255,255,255,0.38)",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "13px",
            fontWeight: 500,
            cursor: "pointer",
            padding: "4px 2px",
            borderRadius: "6px",
            transition: "color 0.15s ease",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.color =
              "rgba(255,255,255,0.75)")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.color =
              "rgba(255,255,255,0.38)")
          }
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
          Back
        </button>
        <button
          onClick={onGoToDashboard}
          style={{
            position: "absolute",
            top: "20px",
            right: "24px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            background: "none",
            border: "none",
            color: "rgba(255,255,255,0.38)",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "13px",
            fontWeight: 500,
            cursor: "pointer",
            padding: "4px 2px",
            borderRadius: "6px",
            transition: "color 0.15s ease",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.color =
              "rgba(255,255,255,0.75)")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.color =
              "rgba(255,255,255,0.38)")
          }
        >
          Go to dashboard
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
            <polyline points='9 18 15 12 9 6' />
          </svg>
        </button>
        {/* Ambient glow */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: "700px",
            height: "500px",
            background:
              "radial-gradient(ellipse at center, rgba(99,102,241,0.13) 0%, transparent 70%)",
            filter: "blur(60px)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            width: "100%",
            maxWidth: "440px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.45s ease, transform 0.45s ease",
          }}
        >
          {/* Header — looks like a group DM notification */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "20px",
            }}
          >
            {/* Overlapping avatars */}
            <div
              style={{
                position: "relative",
                width: "46px",
                height: "30px",
                flexShrink: 0,
              }}
            >
              <div style={{ position: "absolute", left: 0, top: 0 }}>
                <KiraAvatar size={30} />
              </div>
              <div style={{ position: "absolute", left: "16px", top: 0 }}>
                <DevAvatar size={30} />
              </div>
            </div>
            <div>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.9)",
                  margin: 0,
                  lineHeight: 1.2,
                }}
              >
                Kira &amp; Dev
              </p>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "11px",
                  fontWeight: 400,
                  color: "rgba(255,255,255,0.45)",
                  margin: "2px 0 0 0",
                }}
              >
                Clearwater team · now
              </p>
            </div>
          </div>

          {/* Chat card */}
          <div
            style={{
              backgroundColor: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.09)",
              borderRadius: "20px",
              overflow: "hidden",
              backdropFilter: "blur(8px)",
            }}
          >
            {/* Kira's message */}
            <div
              style={{
                padding: "24px 24px 0",
                opacity: messageVisible ? 1 : 0,
                animation: messageVisible
                  ? "msg-bubble-in 0.38s ease both"
                  : "none",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "10px",
                  marginBottom: "14px",
                }}
              >
                <KiraAvatar size={26} />
                <div>
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "rgba(255,255,255,0.5)",
                      display: "block",
                      marginBottom: "4px",
                    }}
                  >
                    Kira
                  </span>
                  <div
                    style={{
                      backgroundColor: "rgba(255,255,255,0.07)",
                      borderRadius: "4px 14px 14px 14px",
                      padding: "11px 14px",
                      maxWidth: "320px",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "14px",
                        fontWeight: 400,
                        color: "rgba(255,255,255,0.88)",
                        lineHeight: "1.6",
                        margin: 0,
                      }}
                    >
                      Hey! Before we jump in — easier if we just do this over
                      video, or would you rather keep it in the thread? Either
                      works for us.
                    </p>
                  </div>
                </div>
              </div>
              {/* Dev's reply */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "10px",
                  marginBottom: "24px",
                }}
              >
                <DevAvatar size={26} />
                <div>
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "rgba(255,255,255,0.5)",
                      display: "block",
                      marginBottom: "4px",
                    }}
                  >
                    Dev
                  </span>
                  <div
                    style={{
                      backgroundColor: "rgba(255,255,255,0.07)",
                      borderRadius: "4px 14px 14px 14px",
                      padding: "11px 14px",
                      maxWidth: "280px",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "14px",
                        fontWeight: 400,
                        color: "rgba(255,255,255,0.88)",
                        lineHeight: "1.6",
                        margin: 0,
                      }}
                    >
                      +1. Totally up to you.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div
              style={{
                height: "1px",
                backgroundColor: "rgba(255,255,255,0.07)",
                margin: "0 24px",
              }}
            />

            {/* Buttons */}
            <div
              style={{
                padding: "20px 24px 24px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                opacity: buttonsVisible ? 1 : 0,
                animation: buttonsVisible ? "btns-in 0.35s ease both" : "none",
              }}
            >
              <button
                onClick={() => choose("video")}
                onMouseEnter={() => setHovered("video")}
                onMouseLeave={() => setHovered(null)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "15px 20px",
                  borderRadius: "12px",
                  border: "1.5px solid",
                  borderColor:
                    hovered === "video" ? "#6366F1" : "rgba(255,255,255,0.15)",
                  backgroundColor:
                    hovered === "video"
                      ? "rgba(99,102,241,0.18)"
                      : "rgba(255,255,255,0.04)",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  textAlign: "left",
                  width: "100%",
                }}
              >
                {/* Video icon */}
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: "10px",
                    backgroundColor:
                      hovered === "video"
                        ? "rgba(99,102,241,0.25)"
                        : "rgba(255,255,255,0.07)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    transition: "background-color 0.15s ease",
                  }}
                >
                  <svg
                    width='18'
                    height='18'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke={
                      hovered === "video" ? "#818CF8" : "rgba(255,255,255,0.6)"
                    }
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <polygon points='23 7 16 12 23 17 23 7' />
                    <rect x='1' y='5' width='15' height='14' rx='2' ry='2' />
                  </svg>
                </div>
                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "14px",
                      fontWeight: 700,
                      color:
                        hovered === "video"
                          ? "#C7D2FE"
                          : "rgba(255,255,255,0.9)",
                      margin: 0,
                      lineHeight: 1.2,
                      transition: "color 0.15s ease",
                    }}
                  >
                    Join on video
                  </p>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "12px",
                      fontWeight: 400,
                      color: "rgba(255,255,255,0.4)",
                      margin: "3px 0 0 0",
                    }}
                  >
                    Camera + mic — you can still type in chat
                  </p>
                </div>
                <svg
                  width='14'
                  height='14'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='rgba(255,255,255,0.3)'
                  strokeWidth='2.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  style={{ flexShrink: 0 }}
                >
                  <polyline points='9 18 15 12 9 6' />
                </svg>
              </button>

              <button
                onClick={() => choose("thread")}
                onMouseEnter={() => setHovered("thread")}
                onMouseLeave={() => setHovered(null)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "15px 20px",
                  borderRadius: "12px",
                  border: "1.5px solid",
                  borderColor:
                    hovered === "thread" ? "#6366F1" : "rgba(255,255,255,0.15)",
                  backgroundColor:
                    hovered === "thread"
                      ? "rgba(99,102,241,0.18)"
                      : "rgba(255,255,255,0.04)",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  textAlign: "left",
                  width: "100%",
                }}
              >
                {/* Thread/Slack icon */}
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: "10px",
                    backgroundColor:
                      hovered === "thread"
                        ? "rgba(99,102,241,0.25)"
                        : "rgba(255,255,255,0.07)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    transition: "background-color 0.15s ease",
                  }}
                >
                  <svg
                    width='18'
                    height='18'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke={
                      hovered === "thread" ? "#818CF8" : "rgba(255,255,255,0.6)"
                    }
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <path d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z' />
                  </svg>
                </div>
                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "14px",
                      fontWeight: 700,
                      color:
                        hovered === "thread"
                          ? "#C7D2FE"
                          : "rgba(255,255,255,0.9)",
                      margin: 0,
                      lineHeight: 1.2,
                      transition: "color 0.15s ease",
                    }}
                  >
                    Keep it in the thread
                  </p>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "12px",
                      fontWeight: 400,
                      color: "rgba(255,255,255,0.4)",
                      margin: "3px 0 0 0",
                    }}
                  >
                    Text only — #annual-report-2025
                  </p>
                </div>
                <svg
                  width='14'
                  height='14'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='rgba(255,255,255,0.3)'
                  strokeWidth='2.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  style={{ flexShrink: 0 }}
                >
                  <polyline points='9 18 15 12 9 6' />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WaypointCallChoice;
