import React, { useState, useRef, useEffect } from "react";
import { LogOut, User, Settings, HelpCircle, ChevronDown } from "lucide-react";

interface StudentTopBarProps {
  onLogout: () => void;
  userName?: string;
}

const StudentTopBar: React.FC<StudentTopBarProps> = ({
  onLogout,
  userName = "Student",
}) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        zIndex: 1000,
        padding: "12px 20px",
      }}
    >
      <div ref={menuRef} style={{ position: "relative" }}>
        {/* Avatar button */}
        <button
          onClick={() => setOpen((v) => !v)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.25)",
            borderRadius: "999px",
            padding: "6px 12px 6px 6px",
            cursor: "pointer",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.background =
              "rgba(255,255,255,0.25)")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.background =
              "rgba(255,255,255,0.15)")
          }
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #4318FF, #7551FF)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <User size={16} color="#fff" />
          </div>
          <span
            style={{
              fontSize: "13px",
              fontWeight: 600,
              color: "#fff",
              maxWidth: 100,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {userName}
          </span>
          <ChevronDown
            size={14}
            color="rgba(255,255,255,0.8)"
            style={{
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s",
            }}
          />
        </button>

        {/* Dropdown */}
        {open && (
          <div
            style={{
              position: "absolute",
              top: "calc(100% + 8px)",
              right: 0,
              background: "#fff",
              borderRadius: 16,
              boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
              border: "1px solid #E0E5F2",
              minWidth: 200,
              overflow: "hidden",
              animation: "fadeIn 0.15s ease",
            }}
          >
            {/* User info header */}
            <div
              style={{
                padding: "14px 16px",
                borderBottom: "1px solid #E0E5F2",
                background: "#F4F7FE",
              }}
            >
              <p
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#2B3674",
                  margin: 0,
                }}
              >
                {userName}
              </p>
              <p
                style={{
                  fontSize: 11,
                  color: "#5A6A8A",
                  margin: "2px 0 0",
                }}
              >
                Student Portal
              </p>
            </div>

            {/* Menu items */}
            {[
              { icon: <User size={14} />, label: "My Profile" },
              { icon: <Settings size={14} />, label: "Settings" },
              { icon: <HelpCircle size={14} />, label: "Help & Support" },
            ].map(({ icon, label }) => (
              <button
                key={label}
                onClick={() => setOpen(false)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "11px 16px",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: 500,
                  color: "#2B3674",
                  textAlign: "left",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.background =
                    "#F4F7FE")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.background =
                    "transparent")
                }
              >
                <span style={{ color: "#5A6A8A" }}>{icon}</span>
                {label}
              </button>
            ))}

            {/* Divider + logout */}
            <div style={{ borderTop: "1px solid #E0E5F2" }}>
              <button
                onClick={() => {
                  setOpen(false);
                  onLogout();
                }}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "11px 16px",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#E53E3E",
                  textAlign: "left",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.background =
                    "#FFF5F5")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.background =
                    "transparent")
                }
              >
                <LogOut size={14} />
                Sign out
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentTopBar;
