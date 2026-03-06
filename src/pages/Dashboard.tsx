import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  format,
  parseISO,
  isSameDay,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  addMonths,
  subMonths,
  isToday,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { deadlines, courses, getCourse, typeLabels } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { MitSloanLogo } from "@/components/MitSloanLogo";

type View = "list" | "calendar";
type FilterType = "all" | string;

type DashboardMode = "both" | "calendar";

type DashboardProps = {
  mode?: DashboardMode;
};

const courseColors: Record<string, string> = {
  pm: "bg-primary/15 text-primary border-primary/20",
  analytics: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  timeseries: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  strategy: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
};

const courseChipColors: Record<string, string> = {
  pm: "border-primary text-primary",
  analytics: "border-blue-500 text-blue-600",
  timeseries: "border-amber-500 text-amber-600",
  strategy: "border-emerald-500 text-emerald-600",
};

const courseChipFilled: Record<string, string> = {
  pm: "bg-primary text-primary-foreground border-primary",
  analytics: "bg-blue-500 text-white border-blue-500",
  timeseries: "bg-amber-500 text-white border-amber-500",
  strategy: "bg-emerald-500 text-white border-emerald-500",
};

const courseDotColors: Record<string, string> = {
  pm: "bg-primary",
  analytics: "bg-blue-500",
  timeseries: "bg-amber-500",
  strategy: "bg-emerald-500",
};

const Dashboard = ({ mode = "both" }: DashboardProps) => {
  const [view, setView] = useState<View>("calendar");
  const [courseFilter, setCourseFilter] = useState<FilterType>("all");
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 2, 1));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const filtered = useMemo(() => {
    let items = [...deadlines].sort((a, b) => a.dueDate.localeCompare(b.dueDate));
    if (courseFilter !== "all") items = items.filter((d) => d.courseId === courseFilter);
    return items;
  }, [courseFilter]);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startPad = getDay(monthStart);

  const deadlinesOnDate = (date: Date) =>
    filtered.filter((d) => isSameDay(parseISO(d.dueDate), date));

  // Get upcoming important dates (next 5)
  const importantDates = useMemo(() => {
    return filtered.slice(0, 6);
  }, [filtered]);

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-30 border-b bg-card/95 backdrop-blur-md px-4 pt-4 pb-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <MitSloanLogo className="h-6" />
            <h1 className="text-lg font-bold text-foreground">
              {format(new Date(), "EEEE, MMMM d")}
            </h1>
          </div>
        </div>

        {mode === "both" && (
          <div className="mt-3 flex gap-1 rounded-full bg-secondary p-1 w-fit">
            {(["list", "calendar"] as View[]).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-xs font-medium transition-all",
                  view === v
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {v === "list" ? "List" : "Calendar"}
              </button>
            ))}
          </div>
        )}

        {/* Course filter chips */}
        <div className="mt-3 flex gap-2 overflow-x-auto hide-scrollbar pb-1">
          <button
            onClick={() => setCourseFilter("all")}
            className={cn(
              "shrink-0 rounded-full px-3 py-1 text-xs font-medium border transition-colors",
              courseFilter === "all"
                ? "bg-foreground text-background border-foreground"
                : "bg-card text-muted-foreground border-border hover:text-foreground"
            )}
          >
            All
          </button>
          {courses.map((c) => (
            <button
              key={c.id}
              onClick={() => setCourseFilter(c.id)}
              className={cn(
                "shrink-0 rounded-full px-3 py-1 text-xs font-medium border transition-colors",
                courseFilter === c.id
                  ? courseChipFilled[c.id]
                  : `${courseChipColors[c.id]} bg-card`
              )}
            >
              {c.number}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-4">
        {mode === "both" && view === "list" ? (
          <ListView filtered={filtered} courseColors={courseColors} />
        ) : (
          <CalendarView
            currentMonth={currentMonth}
            setCurrentMonth={setCurrentMonth}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            days={days}
            startPad={startPad}
            deadlinesOnDate={deadlinesOnDate}
            importantDates={importantDates}
            courseColors={courseColors}
            courseDotColors={courseDotColors}
            showImportant={mode === "both"}
          />
        )}
      </div>
    </div>
  );
};

/* ─── List View ─── */
function ListView({
  filtered,
  courseColors,
}: {
  filtered: typeof deadlines;
  courseColors: Record<string, string>;
}) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
      {filtered.map((d, i) => {
        const course = getCourse(d.courseId);
        return (
          <motion.div
            key={d.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            className="flex items-start gap-3 rounded-xl border bg-card px-4 py-3"
          >
            <div className="mt-0.5 text-center shrink-0 w-10">
              <p className="text-xs text-muted-foreground">{format(parseISO(d.dueDate), "MMM")}</p>
              <p className="text-lg font-bold text-foreground leading-tight">
                {format(parseISO(d.dueDate), "d")}
              </p>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-foreground truncate">{d.title}</p>
              <div className="mt-1 flex flex-wrap items-center gap-1.5">
                <Badge
                  variant="outline"
                  className={cn("text-[10px] px-2 py-0 rounded-full", courseColors[d.courseId])}
                >
                  {course?.number}
                </Badge>
                <span className="text-[10px] text-muted-foreground capitalize">
                  {typeLabels[d.type]}
                </span>
                {d.weight && (
                  <span className="text-[10px] text-muted-foreground">· {d.weight}%</span>
                )}
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

/* ─── Calendar View (matching wireframe) ─── */
function CalendarView({
  currentMonth,
  setCurrentMonth,
  selectedDate,
  setSelectedDate,
  days,
  startPad,
  deadlinesOnDate,
  importantDates,
  courseColors,
  courseDotColors,
  showImportant,
}: {
  currentMonth: Date;
  setCurrentMonth: (d: Date) => void;
  selectedDate: Date | null;
  setSelectedDate: (d: Date | null) => void;
  days: Date[];
  startPad: number;
  deadlinesOnDate: (d: Date) => typeof deadlines;
  importantDates: typeof deadlines;
  courseColors: Record<string, string>;
  courseDotColors: Record<string, string>;
  showImportant: boolean;
}) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row">
        {showImportant && (
          <div className="rounded-xl border bg-card p-4 md:w-1/3">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Important Dates
            </h3>
            <div className="space-y-2.5">
              {importantDates.map((d) => {
                const course = getCourse(d.courseId);
                return (
                  <div key={d.id} className="flex items-start gap-2.5">
                    <div
                      className={cn("mt-1 h-2 w-2 rounded-full shrink-0", courseDotColors[d.courseId])}
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-foreground leading-tight">
                        {d.title}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        {course?.number} · {format(parseISO(d.dueDate), "MMM d")}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="rounded-xl border bg-card p-4 md:flex-1">
          {/* Month nav */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
              className="p-1 text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <h2 className="text-sm font-semibold text-foreground">
              {format(currentMonth, "MMMM yyyy")}
            </h2>
            <button
              onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
              className="p-1 text-muted-foreground hover:text-foreground"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 text-center mb-1">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
              <span key={d} className="text-[10px] text-muted-foreground font-medium py-1">
                {d}
              </span>
            ))}
          </div>

          {/* Days grid with assignment text */}
          <div className="grid grid-cols-7">
            {Array.from({ length: startPad }).map((_, i) => (
              <div key={`pad-${i}`} className="min-h-[72px]" />
            ))}
            {days.map((day) => {
              const dayDeadlines = deadlinesOnDate(day);
              const isSelected = selectedDate && isSameDay(day, selectedDate);
              const today = isToday(day);

              return (
                <button
                  key={day.toISOString()}
                  onClick={() => setSelectedDate(isSelected ? null : day)}
                  className={cn(
                    "relative flex flex-col items-start p-1 min-h-[72px] border-t border-border/50 text-left transition-colors",
                    isSelected
                      ? "bg-primary/5"
                      : "hover:bg-secondary/50"
                  )}
                >
                  <span
                    className={cn(
                      "text-[11px] font-medium leading-none mb-1",
                      today
                        ? "bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center"
                        : "text-foreground"
                    )}
                  >
                    {format(day, "d")}
                  </span>
                  {/* Show assignment titles in the cell */}
                  <div className="w-full space-y-0.5 overflow-hidden">
                    {dayDeadlines.slice(0, 2).map((dd) => (
                      <div
                        key={dd.id}
                        className={cn(
                          "text-[8px] leading-tight px-1 py-0.5 rounded truncate font-medium",
                          courseColors[dd.courseId]
                        )}
                      >
                        {dd.title.length > 18 ? dd.title.slice(0, 18) + "…" : dd.title}
                      </div>
                    ))}
                    {dayDeadlines.length > 2 && (
                      <span className="text-[8px] text-muted-foreground px-1">
                        +{dayDeadlines.length - 2} more
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selected date detail */}
      {selectedDate && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="rounded-xl border bg-card p-4 space-y-2"
        >
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            {format(selectedDate, "EEEE, MMMM d")}
          </p>
          {deadlinesOnDate(selectedDate).length === 0 ? (
            <p className="text-xs text-muted-foreground italic">No deadlines this day</p>
          ) : (
            deadlinesOnDate(selectedDate).map((d) => {
              const course = getCourse(d.courseId);
              return (
                <div
                  key={d.id}
                  className="flex items-center gap-3 rounded-lg border bg-background px-3 py-2.5"
                >
                  <div className={cn("h-2 w-2 rounded-full shrink-0", courseDotColors[d.courseId])} />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground">{d.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {course?.number} · {typeLabels[d.type]}
                      {d.weight ? ` · ${d.weight}%` : ""}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </motion.div>
      )}
    </motion.div>
  );
}

export default Dashboard;
