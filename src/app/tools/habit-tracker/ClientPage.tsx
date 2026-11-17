"use client";
import { useState, useEffect } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";
import SeoContent from "./SeoContent";
import { useToolUI } from "@/app/components/ToolUIProvider";
import { useTranslation } from "@/lib/i18n/useTranslation";

interface Habit {
  id: string;
  name: string;
  completedDates: string[]; // ISO date strings
}

function getWeekDates(): { date: string; label: string; dayName: string }[] {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const monday = new Date(today);
  monday.setDate(today.getDate() - ((dayOfWeek + 6) % 7));
  const days = [];
  const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    days.push({
      date: d.toISOString().split("T")[0],
      label: d.getDate().toString(),
      dayName: dayNames[i],
    });
  }
  return days;
}

function getStreak(completedDates: string[]): number {
  if (completedDates.length === 0) return 0;
  const sorted = [...completedDates].sort().reverse();
  const today = new Date().toISOString().split("T")[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
  if (sorted[0] !== today && sorted[0] !== yesterday) return 0;
  let streak = 1;
  for (let i = 1; i < sorted.length; i++) {
    const prev = new Date(sorted[i - 1]);
    const curr = new Date(sorted[i]);
    const diff = (prev.getTime() - curr.getTime()) / 86400000;
    if (diff === 1) streak++;
    else break;
  }
  return streak;
}

const STORAGE_KEY = "tck-habit-tracker";

export default function ClientPage() {
  const toolUI = useToolUI();
  const { t } = useTranslation();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [newName, setNewName] = useState("");
  const [loaded, setLoaded] = useState(false);
  const weekDates = getWeekDates();
  const todayStr = new Date().toISOString().split("T")[0];

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setHabits(JSON.parse(saved));
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(habits)); } catch {}
  }, [habits, loaded]);

  const addHabit = () => {
    const name = newName.trim();
    if (!name) return;
    setHabits([...habits, { id: Date.now().toString(), name, completedDates: [] }]);
    setNewName("");
  };

  const toggleDay = (habitId: string, date: string) => {
    setHabits(habits.map((h) => {
      if (h.id !== habitId) return h;
      const has = h.completedDates.includes(date);
      return { ...h, completedDates: has ? h.completedDates.filter((d) => d !== date) : [...h.completedDates, date] };
    }));
  };

  const removeHabit = (id: string) => setHabits(habits.filter((h) => h.id !== id));

  const cardStyle: React.CSSProperties = { background: "#fff", border: "1px solid #E7E5E4", borderRadius: "12px", padding: "20px", marginBottom: "12px" };

  return (
    <>
      <ToolSchema name="Habit Tracker" description="Track daily habits with a weekly grid. Build streaks. Stored locally." slug="habit-tracker" category="UtilitiesApplication" />
      <BreadcrumbSchema items={[{ name: "Home", url: "/" }, { name: "Productivity Tools", url: "/#productivity-tools" }, { name: "Habit Tracker", url: "/tools/habit-tracker" }]} />
      <div style={{ maxWidth: "700px", margin: "0 auto", padding: "32px 20px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: 800, color: "#1C1917", marginBottom: "6px" }}>{t(`tools./tools/habit-tracker.name`) !== `tools./tools/habit-tracker.name` ? t(`tools./tools/habit-tracker.name`) : "Habit Tracker"}</h1>
        <p style={{ color: "#78716C", fontSize: "15px", marginBottom: "28px" }}>Add habits, check off days, build streaks. Saved in your browser.</p>

        {/* Add Habit */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addHabit()}
            placeholder="New habit name..."
            style={{ flex: 1, padding: "10px 14px", border: "1px solid #E7E5E4", borderRadius: "8px", fontSize: "15px" }}
          />
          <button onClick={addHabit} style={{ padding: "10px 24px", background: "#0D9488", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 600, fontSize: "15px", cursor: "pointer" }}>Add</button>
        </div>

        {habits.length === 0 && loaded && (
          <div style={cardStyle}>
            <div style={{ textAlign: "center", color: "#A8A29E", padding: "20px 0" }}>No habits yet. Add one above to get started.</div>
          </div>
        )}

        {habits.map((habit) => {
          const streak = getStreak(habit.completedDates);
          const weekComplete = weekDates.filter((d) => habit.completedDates.includes(d.date)).length;
          return (
            <div key={habit.id} style={cardStyle}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                <div>
                  <span style={{ fontWeight: 700, fontSize: "16px", color: "#1C1917" }}>{habit.name}</span>
                  {streak > 0 && <span style={{ marginLeft: "10px", fontSize: "12px", fontWeight: 600, color: "#F59E0B" }}>{streak} day streak</span>}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontSize: "12px", color: "#78716C" }}>{weekComplete}/7 this week</span>
                  <button onClick={() => removeHabit(habit.id)} style={{ background: "none", border: "none", color: "#A8A29E", cursor: "pointer", fontSize: "16px" }} title="Remove">&#10005;</button>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "6px" }}>
                {weekDates.map((day) => {
                  const done = habit.completedDates.includes(day.date);
                  const isToday = day.date === todayStr;
                  return (
                    <button
                      key={day.date}
                      onClick={() => toggleDay(habit.id, day.date)}
                      style={{
                        display: "flex", flexDirection: "column", alignItems: "center", gap: "4px",
                        padding: "8px 4px", borderRadius: "8px", border: isToday ? "2px solid #0D9488" : "1px solid #E7E5E4",
                        background: done ? "#0D9488" : "#FAFAF9", cursor: "pointer", transition: "all 0.15s",
                      }}
                    >
                      <span style={{ fontSize: "10px", fontWeight: 600, color: done ? "#fff" : "#78716C" }}>{day.dayName}</span>
                      <span style={{ fontSize: "13px", fontWeight: 700, color: done ? "#fff" : "#1C1917" }}>{day.label}</span>
                      {done && <span style={{ fontSize: "16px" }}>{"✓"}</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <SeoContent />
    </>
  );
}
