import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PersonalPage from "@/pages/PersonalPage";
import ProfessionalPage from "@/pages/ProfessionalPage";

const BridgePage = lazy(() => import("@/pages/BridgePage"));

function PageFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0c] text-white" aria-hidden>
      Loading…
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<PageFallback />}>
              <BridgePage />
            </Suspense>
          }
        />
        <Route path="/personal" element={<PersonalPage />} />
        <Route path="/professional" element={<ProfessionalPage />} />
      </Routes>
    </BrowserRouter>
  );
}
