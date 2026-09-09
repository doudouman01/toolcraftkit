"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

interface PremiumGateProps {
  toolName: string;
  toolDescription: string;
  features: string[];
  children: React.ReactNode;
}

export default function PremiumGate({ toolName, toolDescription, features, children }: PremiumGateProps) {
  const { user, isPro, loading } = useAuth();

  // Loading state
  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 400 }}>
        <div style={{ fontSize: "1rem", color: "#888" }}>Loading...</div>
      </div>
    );
  }

  // Pro user — show the tool
  if (isPro) {
    return <>{children}</>;
  }

  // Not Pro — show sales page
  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: "3rem 1rem", fontFamily: "'Inter', -apple-system, sans-serif" }}>

      {/* Premium Badge */}
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <div style={{
          display: "inline-block", background: "linear-gradient(135deg, #C4A265, #D4A843)",
          color: "#fff", padding: "5px 16px", borderRadius: 20,
          fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.5px", marginBottom: "1rem",
        }}>
          PREMIUM TOOL
        </div>
        <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "#1a1a2e", marginBottom: "0.5rem" }}>
          {toolName}
        </h1>
        <p style={{ fontSize: "1.05rem", color: "#666", maxWidth: 500, margin: "0 auto" }}>
          {toolDescription}
        </p>
      </div>

      {/* Feature List */}
      <div style={{
        background: "#fff", borderRadius: 16, padding: "2rem",
        boxShadow: "0 2px 12px rgba(0,0,0,0.08)", border: "1px solid #e8e8e8",
        marginBottom: "1.5rem",
      }}>
        <h2 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#1a1a2e", marginBottom: "1rem" }}>
          What you get with this tool:
        </h2>
        {features.map((feature, i) => (
          <div key={i} style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start", marginBottom: "0.8rem" }}>
            <span style={{ color: "#0D9488", fontSize: "1.1rem", lineHeight: 1.4 }}>✓</span>
            <span style={{ fontSize: "0.95rem", color: "#444", lineHeight: 1.5 }}>{feature}</span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
        borderRadius: 16, padding: "2rem", textAlign: "center", color: "#fff",
        marginBottom: "1.5rem",
      }}>
        <h3 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "0.5rem" }}>
          Unlock all Premium Tools
        </h3>
        <p style={{ fontSize: "0.95rem", opacity: 0.8, marginBottom: "1.5rem", maxWidth: 400, margin: "0 auto 1.5rem" }}>
          Get unlimited access to every premium tool on ToolCraftKit. Cancel anytime.
        </p>

        {user ? (
          // Logged in but not Pro — show upgrade button
          <Link href="/pricing" style={{
            display: "inline-block", background: "linear-gradient(135deg, #C4A265, #D4A843)",
            color: "#fff", padding: "0.9rem 2.5rem", borderRadius: 10,
            textDecoration: "none", fontWeight: 600, fontSize: "1.05rem",
            boxShadow: "0 4px 12px rgba(196, 162, 101, 0.3)",
          }}>
            Upgrade to Pro →
          </Link>
        ) : (
          // Not logged in — show sign in + sign up
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/login" style={{
              display: "inline-block", background: "linear-gradient(135deg, #C4A265, #D4A843)",
              color: "#fff", padding: "0.9rem 2rem", borderRadius: 10,
              textDecoration: "none", fontWeight: 600, fontSize: "1rem",
              boxShadow: "0 4px 12px rgba(196, 162, 101, 0.3)",
            }}>
              Sign In
            </Link>
            <Link href="/login" style={{
              display: "inline-block", background: "rgba(255,255,255,0.1)",
              color: "#fff", padding: "0.9rem 2rem", borderRadius: 10,
              textDecoration: "none", fontWeight: 500, fontSize: "1rem",
              border: "1px solid rgba(255,255,255,0.2)",
            }}>
              Create Account →
            </Link>
          </div>
        )}
      </div>

      {/* Free tools mention */}
      <p style={{ textAlign: "center", fontSize: "0.85rem", color: "#999" }}>
        Looking for free tools?{" "}
        <Link href="/tools/kdp-royalty-calculator" style={{ color: "#0D9488" }}>KDP Royalty Calculator</Link> and{" "}
        <Link href="/tools/book-description-formatter" style={{ color: "#0D9488" }}>Book Description Formatter</Link> are free to use.
      </p>
    </div>
  );
}
