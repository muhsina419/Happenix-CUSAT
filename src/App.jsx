import React, { useState } from 'react'; // 1. Import useState
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

// Layouts
import DashboardLayout from "./layouts/DashboardLayout.jsx";
import Navbar from "./components/Navbar";

// Components
import ProfileModal from './components/ProfileModal'; // 2. Import the ProfileModal

// ... (all your other page imports) ...
import Home from "./pages/Home";
import Events from "./pages/Events";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ConfirmPasswordPage from "./pages/ConfirmPasswordPage";
import ConfirmAccountPage from "./pages/ConfirmAccountPage.jsx";
import DashboardPage from "./pages/DashboardPage";
import CreateEventPage from './pages/CreateEventPage.jsx';

function AppContent() {
  const navigate = useNavigate();
  // 3. Add state here for the modal
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const handleSignOut = () => {
    console.log("Signing out...");
    setIsProfileModalOpen(false); // Close modal on sign out
    navigate('/login');
  };

  return (
    // 4. Wrap everything in a React Fragment
    <>
      <Routes>
        {/* ... (Public and Auth routes are unchanged) ... */}
        <Route path="/" element={<><Navbar /><Home /></>} />
        <Route path="/events" element={<><Navbar /><Events /></>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/confirm-password" element={<ConfirmPasswordPage />} />
        <Route path="/confirm-account" element={<ConfirmAccountPage />} />
        
        {/* 5. Pass the click handler down to the layout */}
        <Route element={
          <DashboardLayout 
            onSignOut={handleSignOut} 
            onProfileClick={() => setIsProfileModalOpen(true)} 
          />}
        >
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/calendar" element={<Events />} />
          <Route path="/create-event" element={<CreateEventPage />} />
        </Route>
      </Routes>

      {/* 6. Render the modal here, as a sibling to Routes */}
      <ProfileModal 
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        onSignOut={handleSignOut}
      />
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;