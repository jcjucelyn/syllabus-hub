import { Outlet } from "react-router-dom";
import { BottomNav } from "./BottomNav";
import { ChatBot } from "./ChatBot";

export function AppLayout() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <Outlet />
      <BottomNav />
      <ChatBot />
    </div>
  );
}
