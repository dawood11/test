//src\App.tsx
import "./styles/general/App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RoomsPage from "./pages/RoomsPage.tsx";
import RoomDetail from "./components/rooms/RoomDetail.tsx";
import { NavProvider } from "./components/navigation/NavProvider.tsx";
import SpeakersPage from "./pages/SpeakersPage.tsx";
import SpeakerDetail from "./components/speakers/SpeakerDetail.tsx";
import HomePage from "./pages/homepage.tsx";
import { Navbar } from "./components/navigation/Navbar.tsx";
import TalksPage from "./pages/TalksPage.tsx";
import ContactPage from "./pages/ContactPage.tsx";
import Login from "./components/login/Login.tsx";
import { UserProvider } from "./context/UserProvider.tsx";
import TalksDetail from "./components/talks/TalksDetail.tsx";
import { DataProvider } from "./context/DataProvider.tsx";

function App() {
  return (
    <>
      <UserProvider>
        <DataProvider>
        <Router>
          <NavProvider>
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/rooms" element={<RoomsPage />} />
              <Route path="/rooms/:id" element={<RoomDetail />} />
              <Route path="/speakers" element={<SpeakersPage />} />
              <Route path="/speakers/:id" element={<SpeakerDetail />} />
              <Route path="/talks" element={<TalksPage />} />
              <Route path="/talks/:id" element={<TalksDetail />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/users" element={<Login />} />
            </Routes>
          </NavProvider>
        </Router>
        </DataProvider>
      </UserProvider>
    </>
  );
}

export default App;
