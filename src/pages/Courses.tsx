import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Clock, MapPin, User, BookOpen } from "lucide-react";
import { courses, getDeadlinesForCourse } from "@/data/mockData";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { MitSloanLogo } from "@/components/MitSloanLogo";

const Courses = () => {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-30 border-b bg-card/95 backdrop-blur-md px-4 pt-4 pb-3">
        <div className="flex items-center gap-2">
          <MitSloanLogo className="h-6" />
          <h1 className="text-lg font-bold text-foreground">Courses</h1>
        </div>
        <p className="text-xs text-muted-foreground mt-0.5">
          {courses.length} enrolled courses
        </p>
      </div>

      <div className="mx-auto max-w-lg px-4 py-4 space-y-3">
        {courses.map((c) => {
          const isOpen = expanded === c.id;
          const upcomingCount = getDeadlinesForCourse(c.id).length;

          return (
            <motion.div
              key={c.id}
              layout
              className="rounded-xl border bg-card overflow-hidden"
            >
              <button
                onClick={() => setExpanded(isOpen ? null : c.id)}
                className="w-full flex items-center gap-3 px-4 py-4 text-left"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-foreground">{c.number}</p>
                  <p className="text-xs text-muted-foreground truncate">{c.name}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{upcomingCount} items</span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 text-muted-foreground transition-transform",
                      isOpen && "rotate-180"
                    )}
                  />
                </div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="border-t px-4 py-4 space-y-4">
                      {/* Details */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <User className="h-3.5 w-3.5" />
                          {c.professor}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3.5 w-3.5" />
                          {c.meetingTime}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <MapPin className="h-3.5 w-3.5" />
                          {c.location}
                        </div>
                      </div>

                      {/* Grading */}
                      <div>
                        <p className="text-xs font-semibold text-foreground mb-2">Grade Breakdown</p>
                        <div className="space-y-2">
                          {c.grading.map((g) => (
                            <div key={g.component}>
                              <div className="flex justify-between text-xs mb-1">
                                <span className="text-muted-foreground">{g.component}</span>
                                <span className="font-medium text-foreground">{g.weight}%</span>
                              </div>
                              <Progress value={g.weight} className="h-1.5" />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Policies */}
                      <div>
                        <p className="text-xs font-semibold text-foreground mb-2">Key Policies</p>
                        <ul className="space-y-1">
                          {c.policies.map((p, i) => (
                            <li key={i} className="text-xs text-muted-foreground flex gap-2">
                              <span className="text-primary mt-0.5">•</span>
                              {p}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Courses;
