import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { format, parseISO, isSameDay, startOfMonth, endOfMonth, eachDayOfInterval, getDay, addMonths, subMonths } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { deadlines, courses, getCourse, typeLabels } from "@/data/mockData";
import { cn } from "@/lib/utils";

type View = "list" | "calendar";
type FilterType = "all" | string;

const courseColors: Record<string, string> = {
  pm: "bg-primary/15 text-primary border-primary/20",
  analytics: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  timeseries: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  strategy: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
};

const Dashboard = () => {
  const [view, setView] = useState<View>("list");
  const [courseFilter, setCourseFilter] = useState<FilterType>("all");
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 2, 1)); // March 2026
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const filtered = useMemo(() => {
    let items = [...deadlines].sort((a, b) => a.dueDate.localeCompare(b.dueDate));
    if (courseFilter !== "all") items = items.filter((d) => d.courseId === courseFilter);
    return items;
  }, [courseFilter]);

  // Calendar helpers
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startPad = getDay(monthStart);

  const deadlinesOnDate = (date: Date) =>
    filtered.filter((d) => isSameDay(parseISO(d.dueDate), date));

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-30 border-b bg-card/95 backdrop-blur-md px-4 pt-4 pb-3">
        <h1 className="text-lg font-bold text-foreground">Dashboard</h1>

        {/* View toggle */}
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
                  ? courseColors[c.id]
                  : "bg-card text-muted-foreground border-border hover:text-foreground"
              )}
            >
              {c.number}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-lg px-4 py-4">
        {view === "list" ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-2"
          >
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
                    <p className="text-xs text-muted-foreground">
                      {format(parseISO(d.dueDate), "MMM")}
                    </p>
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
                        <span className="text-[10px] text-muted-foreground">
                          · {d.weight}%
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {/* Month nav */}
            <div className="flex items-center justify-between mb-4">
              <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="p-1 text-muted-foreground hover:text-foreground">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <h2 className="text-sm font-semibold text-foreground">
                {format(currentMonth, "MMMM yyyy")}
              </h2>
              <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="p-1 text-muted-foreground hover:text-foreground">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 text-center mb-2">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                <span key={d} className="text-[10px] text-muted-foreground font-medium">{d}</span>
              ))}
            </div>

            {/* Days grid */}
            <div className="grid grid-cols-7 gap-y-1">
              {Array.from({ length: startPad }).map((_, i) => (
                <div key={`pad-${i}`} />
              ))}
              {days.map((day) => {
                const dayDeadlines = deadlinesOnDate(day);
                const isSelected = selectedDate && isSameDay(day, selectedDate);
                return (
                  <button
                    key={day.toISOString()}
                    onClick={() => setSelectedDate(isSelected ? null : day)}
                    className={cn(
                      "relative flex flex-col items-center py-1.5 rounded-lg text-sm transition-colors",
                      isSelected
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-secondary text-foreground"
                    )}
                  >
                    {format(day, "d")}
                    {dayDeadlines.length > 0 && (
                      <div className="flex gap-0.5 mt-0.5">
                        {dayDeadlines.slice(0, 3).map((dd) => (
                          <span
                            key={dd.id}
                            className={cn(
                              "h-1 w-1 rounded-full",
                              isSelected ? "bg-primary-foreground" : "bg-primary"
                            )}
                          />
                        ))}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Selected date items */}
            {selectedDate && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-4 space-y-2"
              >
                <p className="text-xs font-medium text-muted-foreground">
                  {format(selectedDate, "EEEE, MMMM d")}
                </p>
                {deadlinesOnDate(selectedDate).length === 0 ? (
                  <p className="text-xs text-muted-foreground italic">No deadlines this day</p>
                ) : (
                  deadlinesOnDate(selectedDate).map((d) => {
                    const course = getCourse(d.courseId);
                    return (
                      <div key={d.id} className="flex items-center gap-3 rounded-xl border bg-card px-4 py-3">
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
        )}
      </div>
    </div>
  );
};

export default Dashboard;
