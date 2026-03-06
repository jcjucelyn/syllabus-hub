import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Upload as UploadIcon, FileText, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { courses } from "@/data/mockData";

type Stage = "idle" | "uploading" | "parsing" | "done";

const Upload = () => {
  const navigate = useNavigate();
  const [stage, setStage] = useState<Stage>("idle");

  const simulateUpload = () => {
    setStage("uploading");
    setTimeout(() => setStage("parsing"), 1200);
    setTimeout(() => setStage("done"), 2800);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 bg-background">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-foreground mb-2">Upload Syllabi</h1>
        <p className="text-sm text-muted-foreground text-center mb-8">
          Drop your PDF syllabi here to extract deadlines and course info
        </p>

        <AnimatePresence mode="wait">
          {stage === "idle" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <button
                onClick={simulateUpload}
                className="w-full rounded-2xl border-2 border-dashed border-muted-foreground/25 bg-secondary/50 p-12 text-center transition-colors hover:border-primary/40 hover:bg-secondary"
              >
                <UploadIcon className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
                <p className="text-sm font-medium text-foreground">Tap to upload PDF</p>
                <p className="text-xs text-muted-foreground mt-1">or drag and drop</p>
              </button>

              <div className="mt-8">
                <p className="text-xs text-muted-foreground mb-3 font-medium uppercase tracking-wider">
                  Or use demo data
                </p>
                <Button
                  variant="outline"
                  className="w-full rounded-full"
                  onClick={() => {
                    setStage("parsing");
                    setTimeout(() => setStage("done"), 1600);
                  }}
                >
                  Load sample courses
                </Button>
              </div>
            </motion.div>
          )}

          {(stage === "uploading" || stage === "parsing") && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="rounded-2xl border bg-card p-8 text-center"
            >
              <Loader2 className="mx-auto h-10 w-10 text-primary animate-spin mb-4" />
              <p className="text-sm font-medium text-foreground">
                {stage === "uploading" ? "Uploading files..." : "Parsing syllabi..."}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {stage === "uploading"
                  ? "Preparing documents"
                  : "Extracting deadlines, grading policies, and course info"}
              </p>
            </motion.div>
          )}

          {stage === "done" && (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4"
            >
              <div className="rounded-2xl border bg-card p-6 text-center">
                <CheckCircle2 className="mx-auto h-10 w-10 text-primary mb-3" />
                <p className="text-sm font-semibold text-foreground">
                  {courses.length} courses loaded!
                </p>
              </div>

              <div className="space-y-2">
                {courses.map((c) => (
                  <div
                    key={c.id}
                    className="flex items-center gap-3 rounded-xl border bg-card px-4 py-3"
                  >
                    <FileText className="h-5 w-5 text-muted-foreground shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{c.number} — {c.name}</p>
                      <p className="text-xs text-muted-foreground">{c.professor}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                className="w-full rounded-full mt-4"
                onClick={() => navigate("/dashboard")}
              >
                View Dashboard
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Upload;
