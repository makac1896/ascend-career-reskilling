import React from "react";
import { GraduationCap, ShieldCheck } from "lucide-react";

interface LandingPageProps {
  onEnterAdmin: () => void;
  onEnterStudent: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({
  onEnterAdmin,
  onEnterStudent,
}) => {
  return (
    <div className="min-h-screen bg-ascend-bg font-sans flex flex-col">
      {/* Main content — vertically centered */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        {/* Logo */}
        <img
          src="/waypoint.png"
          alt="Waypoint"
          className="h-28 w-auto mb-12"
        />

        {/* Login cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl mb-10">
          {/* Student */}
          <div className="bg-white rounded-card shadow-soft p-8 flex flex-col items-center text-center gap-5">
            <div className="w-14 h-14 rounded-full bg-indigo-50 flex items-center justify-center">
              <GraduationCap className="w-7 h-7 text-ascend-blue" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-ascend-text mb-1">Student</h2>
              <p className="text-sm text-ascend-subtext leading-relaxed">
                Access your simulations, discover your superpowers, and explore
                career pathways.
              </p>
            </div>
            <button
              onClick={onEnterStudent}
              className="w-full flex items-center justify-center gap-2 bg-ascend-blue hover:bg-indigo-700 text-white font-bold px-6 py-3 rounded-pill shadow-glow transition-all hover:scale-105 text-sm"
            >
              <svg
                className="w-4 h-4 flex-shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              Sign in with University SSO
            </button>
          </div>

          {/* Admin / Advisor */}
          <div className="bg-white rounded-card shadow-soft p-8 flex flex-col items-center text-center gap-5">
            <div className="w-14 h-14 rounded-full bg-purple-50 flex items-center justify-center">
              <ShieldCheck className="w-7 h-7 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-ascend-text mb-1">Admin</h2>
              <p className="text-sm text-ascend-subtext leading-relaxed">
                Manage simulations, review student insights, and optimise your
                career centre resources.
              </p>
            </div>
            <button
              onClick={onEnterAdmin}
              className="w-full flex items-center justify-center gap-2 bg-white border-2 border-ascend-blue text-ascend-blue hover:bg-indigo-50 font-bold px-6 py-3 rounded-pill transition-all hover:scale-105 text-sm"
            >
              <svg
                className="w-4 h-4 flex-shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              Sign in with University SSO
            </button>
          </div>
        </div>

        {/* Help text */}
        <p className="text-xs text-ascend-subtext text-center max-w-sm leading-relaxed">
          Use your university credentials to sign in. If you're having trouble
          accessing your account, contact your institution's IT helpdesk.
        </p>
      </main>

      {/* Footer */}
      <footer className="py-6 px-6 text-center border-t border-ascend-border">
        <p className="text-xs text-ascend-subtext">
          © {new Date().getFullYear()} Waypoint · An Ascend Careers Platform ·
          All rights reserved
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
