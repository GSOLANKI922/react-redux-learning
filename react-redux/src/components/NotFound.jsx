import React from "react";
import "./NotFound.css";
import { useNavigate } from "react-router";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <main className="nf-page" role="main">
      <div className="nf-card">
        <div className="nf-media" aria-hidden>
          {/* decorative SVG illustration - lightweight and scalable */}
          <svg
            width="240"
            height="180"
            viewBox="0 0 240 180"
            xmlns="http://www.w3.org/2000/svg"
            className="nf-illustration"
            focusable="false"
            aria-hidden="true"
          >
            <g fill="none" fillRule="evenodd">
              <rect width="240" height="180" rx="12" fill="#f5f7fa" />
              <g transform="translate(28,30)">
                <path d="M24 6h56v6H24z" fill="#e9eef6" />
                <circle cx="60" cy="60" r="40" fill="#fff" stroke="#e6eef9" />
                <path
                  d="M40 60c6-8 22-8 28 0"
                  stroke="#c6d7f0"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                <rect
                  x="10"
                  y="100"
                  width="120"
                  height="12"
                  rx="6"
                  fill="#e9eef6"
                />
              </g>
            </g>
          </svg>
        </div>

        <div className="nf-body">
          <h1 className="nf-title">404 — Page not found</h1>
          <p className="nf-sub">
            Sorry, we couldn’t find the page you’re looking for. It might have
            been moved or removed, or maybe the link is incorrect.
          </p>

          <div className="nf-actions">
            <button
              className="btn primary"
              onClick={() => navigate("/")}
              aria-label="Go to homepage"
            >
              ← Go home
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
