import React, { useState, useEffect, useRef } from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

interface CustomDatePickerProps {
  label: string;
  value: string; // YYYY-MM-DD format
  onChange: (value: string) => void;
  minDate?: string; // YYYY-MM-DD format
  error?: string;
  className?: string;
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const DAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

// Helper to get local YYYY-MM-DD
export function getLocalTodayStr(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function CustomDatePicker({
  label,
  value,
  onChange,
  minDate,
  error,
  className = "",
}: CustomDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const effectiveMin = minDate || getLocalTodayStr();

  // Parse initial view year/month from current value or today
  const initialDate = value ? new Date(`${value}T00:00:00`) : new Date();
  const [viewYear, setViewYear] = useState(initialDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(initialDate.getMonth());

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Sync view when value changes externally
  useEffect(() => {
    if (value) {
      const parts = value.split("-");
      if (parts.length === 3) {
        setViewYear(parseInt(parts[0], 10));
        setViewMonth(parseInt(parts[1], 10) - 1);
      }
    }
  }, [value]);

  const handlePrevMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const handleNextMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  // Generate days in month
  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const handleSelectDay = (day: number) => {
    const monthStr = String(viewMonth + 1).padStart(2, "0");
    const dayStr = String(day).padStart(2, "0");
    const selectedDateStr = `${viewYear}-${monthStr}-${dayStr}`;

    if (selectedDateStr < effectiveMin) return;

    onChange(selectedDateStr);
    setIsOpen(false);
  };

  // Format display string e.g. "Mon, Oct 12, 2026" or "2026-10-12"
  const formattedDisplay = value
    ? (() => {
        try {
          const d = new Date(`${value}T00:00:00`);
          return d.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
            year: "numeric",
          });
        } catch {
          return value;
        }
      })()
    : "Select date";

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Input Field Container - IDENTICAL visual size, padding and position */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="bg-stone-50/90 hover:bg-stone-100/80 border border-stone-200/70 rounded-xl p-3 sm:p-3.5 transition-all cursor-pointer select-none"
      >
        <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400 flex items-center space-x-1.5 mb-1 cursor-pointer">
          <Calendar className="w-3.5 h-3.5 text-[#FFD200]" />
          <span>{label}</span>
        </label>
        <div className="w-full text-xs font-semibold text-[#002F5C] flex items-center justify-between">
          <span>{formattedDisplay}</span>
        </div>
      </div>

      {error && <span className="text-[10px] text-red-500 mt-1 block px-1">{error}</span>}

      {/* Custom Light-Theme Calendar Popup */}
      {isOpen && (
        <div className="absolute left-0 top-full mt-2 bg-white border border-stone-200/80 rounded-2xl shadow-2xl p-4 z-50 w-72 sm:w-80 font-sans text-[#002F5C] animate-in fade-in zoom-in-95 duration-150">
          {/* Header Controls */}
          <div className="flex items-center justify-between mb-3 px-1">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-600 transition-colors cursor-pointer"
              aria-label="Previous month"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="text-xs font-bold tracking-wide uppercase text-[#002F5C]">
              {MONTH_NAMES[viewMonth]} {viewYear}
            </div>
            <button
              type="button"
              onClick={handleNextMonth}
              className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-600 transition-colors cursor-pointer"
              aria-label="Next month"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Weekday Labels */}
          <div className="grid grid-cols-7 gap-1 text-center mb-1">
            {DAY_LABELS.map((d) => (
              <span key={d} className="text-[10px] font-bold text-stone-400 uppercase py-1">
                {d}
              </span>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1 text-center text-xs">
            {/* Empty slots before first day */}
            {Array.from({ length: firstDayOfWeek }).map((_, idx) => (
              <div key={`empty-${idx}`} className="h-8" />
            ))}

            {/* Days of month */}
            {Array.from({ length: daysInMonth }).map((_, idx) => {
              const day = idx + 1;
              const monthStr = String(viewMonth + 1).padStart(2, "0");
              const dayStr = String(day).padStart(2, "0");
              const dateStr = `${viewYear}-${monthStr}-${dayStr}`;

              const isPast = dateStr < effectiveMin;
              const isSelected = value === dateStr;
              const isToday = dateStr === getLocalTodayStr();

              return (
                <button
                  key={day}
                  type="button"
                  disabled={isPast}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectDay(day);
                  }}
                  className={`h-8 w-8 mx-auto flex items-center justify-center rounded-lg text-xs font-medium transition-all ${
                    isPast
                      ? "text-stone-300 cursor-not-allowed"
                      : isSelected
                      ? "bg-[#002F5C] text-[#FFD200] font-bold shadow-sm"
                      : isToday
                      ? "border border-[#FFD200] text-[#002F5C] font-bold hover:bg-stone-100 cursor-pointer"
                      : "text-stone-700 hover:bg-stone-100 hover:text-[#002F5C] cursor-pointer"
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>

          {/* Quick Footer: Today shortcut */}
          <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between text-[11px]">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                const today = getLocalTodayStr();
                onChange(today);
                setIsOpen(false);
              }}
              className="text-[#002F5C] font-semibold hover:text-[#FFD200] transition-colors cursor-pointer"
            >
              Today
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
              className="text-stone-400 hover:text-stone-600 transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
