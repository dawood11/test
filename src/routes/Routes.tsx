import { Routes, Route } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { ProtectedRoute } from "../components/auth/ProtectedRoute";
import RoomOverviewPage from "../pages/RoomOverviewPage";
import SpeakerOverviewPage from "../pages/SpeakerOverviewPage";
import SpeakerDetailsPage from "../pages/SpeakerDetailsPage";
import TalksOverviewPage from "../pages/TalksOverviewPage";
import { HomePage } from "../pages/HomePage";
import RoomDetailsPage from "../pages/RoomDetailsPage";
import TalksDetailePage from "../pages/TalksDetailePage";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/speakers" element={<SpeakerOverviewPage />} />
      <Route path="/speakers/:id" element={<SpeakerDetailsPage />} />
      <Route path="/talks" element={<TalksOverviewPage />} />
      <Route path="/talks/:id" element={<TalksDetailePage />} />
      <Route path="/rooms" element={<RoomOverviewPage />} />
      <Route path="/rooms/:id" element={<RoomDetailsPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<HomePage />} />
      <Route element={<ProtectedRoute />}>
        {/* Protected routes will go here */}
        <Route path="/talks/:id/edit" element={<TalksDetailePage />} />
      </Route>
    </Routes>
  );
};
