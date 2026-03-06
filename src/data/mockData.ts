export interface Course {
  id: string;
  number: string;
  name: string;
  professor: string;
  meetingTime: string;
  location: string;
  color: string; // tailwind class
  grading: { component: string; weight: number }[];
  policies: string[];
}

export interface Deadline {
  id: string;
  courseId: string;
  title: string;
  dueDate: string; // ISO date
  type: "assignment" | "exam" | "reading" | "presentation" | "project";
  weight?: number;
  description?: string;
}

export const courses: Course[] = [
  {
    id: "pm",
    number: "15.785",
    name: "Intro to Product Management",
    professor: "Prof. Steven Eppinger",
    meetingTime: "Tue/Thu 2:30–4:00 PM",
    location: "E62-223",
    color: "bg-primary text-primary-foreground",
    grading: [
      { component: "AOK Assignments", weight: 30 },
      { component: "Group Project", weight: 35 },
      { component: "Class Participation", weight: 15 },
      { component: "Final Presentation", weight: 20 },
    ],
    policies: [
      "Attendance is mandatory; 2+ absences lower participation grade",
      "Late submissions penalized 10% per day",
      "Group projects require peer evaluations",
    ],
  },
  {
    id: "analytics",
    number: "15.089",
    name: "Analytics Capstone",
    professor: "Prof. Dimitris Bertsimas",
    meetingTime: "Mon/Wed 10:00–11:30 AM",
    location: "E62-350",
    color: "bg-secondary text-secondary-foreground",
    grading: [
      { component: "Individual Problem Sets", weight: 25 },
      { component: "Team Analytics Project", weight: 40 },
      { component: "Midterm Exam", weight: 15 },
      { component: "Final Presentation", weight: 20 },
    ],
    policies: [
      "No late problem sets accepted",
      "Use of AI tools must be disclosed",
      "All code must be submitted via GitHub",
    ],
  },
  {
    id: "timeseries",
    number: "6.S899",
    name: "Time Series Analysis",
    professor: "Prof. Devavrat Shah",
    meetingTime: "Mon/Wed/Fri 1:00–2:00 PM",
    location: "32-141",
    color: "bg-muted text-muted-foreground",
    grading: [
      { component: "Problem Sets (5)", weight: 40 },
      { component: "Midterm", weight: 25 },
      { component: "Final Project", weight: 35 },
    ],
    policies: [
      "Collaboration on problem sets is allowed with attribution",
      "Final project can be done solo or in pairs",
      "One problem set may be dropped",
    ],
  },
  {
    id: "strategy",
    number: "15.900",
    name: "Competitive Strategy",
    professor: "Prof. Catherine Tucker",
    meetingTime: "Tue/Thu 10:00–11:30 AM",
    location: "E62-276",
    color: "bg-foreground/10 text-foreground",
    grading: [
      { component: "Case Write-ups (4)", weight: 30 },
      { component: "Cold Call Participation", weight: 20 },
      { component: "Group Strategy Memo", weight: 25 },
      { component: "Final Exam", weight: 25 },
    ],
    policies: [
      "Must read case before each class",
      "No electronics during class discussion",
      "Write-ups limited to 2 pages, single-spaced",
    ],
  },
];

export const deadlines: Deadline[] = [
  // PM
  { id: "d1", courseId: "pm", title: "AOK 1: Customer Journey Map", dueDate: "2026-03-10", type: "assignment", weight: 7.5 },
  { id: "d2", courseId: "pm", title: "AOK 2: Competitive Analysis", dueDate: "2026-03-17", type: "assignment", weight: 7.5 },
  { id: "d3", courseId: "pm", title: "Group Project Proposal", dueDate: "2026-03-24", type: "project", weight: 5 },
  { id: "d4", courseId: "pm", title: "AOK 3: User Research Synthesis", dueDate: "2026-03-31", type: "assignment", weight: 7.5 },
  { id: "d5", courseId: "pm", title: "Final Presentation", dueDate: "2026-04-21", type: "presentation", weight: 20 },
  // Analytics
  { id: "d6", courseId: "analytics", title: "Problem Set 1: Regression", dueDate: "2026-03-09", type: "assignment", weight: 5 },
  { id: "d7", courseId: "analytics", title: "Team Project Checkpoint 1", dueDate: "2026-03-16", type: "project", weight: 10 },
  { id: "d8", courseId: "analytics", title: "Midterm Exam", dueDate: "2026-03-23", type: "exam", weight: 15 },
  { id: "d9", courseId: "analytics", title: "Problem Set 2: Classification", dueDate: "2026-03-30", type: "assignment", weight: 5 },
  { id: "d10", courseId: "analytics", title: "Final Presentation", dueDate: "2026-04-20", type: "presentation", weight: 20 },
  // Time Series
  { id: "d11", courseId: "timeseries", title: "Problem Set 1", dueDate: "2026-03-11", type: "assignment", weight: 8 },
  { id: "d12", courseId: "timeseries", title: "Problem Set 2", dueDate: "2026-03-20", type: "assignment", weight: 8 },
  { id: "d13", courseId: "timeseries", title: "Midterm", dueDate: "2026-03-27", type: "exam", weight: 25 },
  { id: "d14", courseId: "timeseries", title: "Final Project Proposal", dueDate: "2026-04-03", type: "project", weight: 5 },
  // Strategy
  { id: "d15", courseId: "strategy", title: "Case Write-up 1: Platform Strategy", dueDate: "2026-03-12", type: "assignment", weight: 7.5 },
  { id: "d16", courseId: "strategy", title: "Case Write-up 2: Network Effects", dueDate: "2026-03-19", type: "assignment", weight: 7.5 },
  { id: "d17", courseId: "strategy", title: "Group Strategy Memo", dueDate: "2026-04-02", type: "project", weight: 25 },
  { id: "d18", courseId: "strategy", title: "Final Exam", dueDate: "2026-04-23", type: "exam", weight: 25 },
];

export const chatSuggestions = [
  "When is my next AOK assignment?",
  "What's the grading policy for 15.785?",
  "What exams do I have this month?",
  "Summarize my upcoming deadlines",
];

export function getCourse(id: string): Course | undefined {
  return courses.find((c) => c.id === id);
}

export function getDeadlinesForCourse(courseId: string): Deadline[] {
  return deadlines.filter((d) => d.courseId === courseId);
}

export function getUpcomingDeadlines(fromDate?: string): Deadline[] {
  const from = fromDate || new Date().toISOString().split("T")[0];
  return deadlines
    .filter((d) => d.dueDate >= from)
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate));
}

// Simulated AI responses
export function getAIResponse(question: string): string {
  const q = question.toLowerCase();
  if (q.includes("aok") || q.includes("next assignment")) {
    return "Your next AOK assignment is **AOK 2: Competitive Analysis** for 15.785 Intro to Product Management, due **March 17, 2026**. It's worth 7.5% of your grade.\n\n*Source: 15.785 Syllabus*";
  }
  if (q.includes("grading") && q.includes("15.785")) {
    return "The grading breakdown for **15.785 Intro to Product Management** is:\n\n- AOK Assignments: **30%**\n- Group Project: **35%**\n- Class Participation: **15%**\n- Final Presentation: **20%**\n\n*Source: 15.785 Syllabus*";
  }
  if (q.includes("exam")) {
    return "You have **2 exams** coming up:\n\n1. **Midterm Exam** — 15.089 Analytics Capstone — March 23, 2026 (15%)\n2. **Midterm** — 6.S899 Time Series Analysis — March 27, 2026 (25%)\n\nThe next exam after that is the **Final Exam** for 15.900 Competitive Strategy on April 23.\n\n*Source: Course syllabi*";
  }
  if (q.includes("upcoming") || q.includes("deadline") || q.includes("summary") || q.includes("summarize")) {
    return "Here are your next 5 deadlines:\n\n1. **Problem Set 1: Regression** — 15.089 — Mar 9\n2. **AOK 1: Customer Journey Map** — 15.785 — Mar 10\n3. **Problem Set 1** — 6.S899 — Mar 11\n4. **Case Write-up 1** — 15.900 — Mar 12\n5. **Team Project Checkpoint 1** — 15.089 — Mar 16\n\n*Source: All syllabi*";
  }
  return `Based on your syllabi, here's what I found:\n\nI searched across your 4 enrolled courses (15.785, 15.089, 6.S899, 15.900) but couldn't find a specific answer to your question. Try asking about:\n- Specific deadlines or assignments\n- Grading policies for a course\n- Upcoming exams\n\n*Tip: Be specific with course numbers for better results.*`;
}

export const typeColors: Record<string, string> = {
  assignment: "bg-primary/10 text-primary",
  exam: "bg-destructive/10 text-destructive",
  reading: "bg-muted text-muted-foreground",
  presentation: "bg-accent/10 text-accent",
  project: "bg-secondary text-secondary-foreground",
};

export const typeLabels: Record<string, string> = {
  assignment: "Assignment",
  exam: "Exam",
  reading: "Reading",
  presentation: "Presentation",
  project: "Project",
};
