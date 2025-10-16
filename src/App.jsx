import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layouts
import DashboardLayout from "./layouts/DashboardLayout.jsx";
import Navbar from "./components/Navbar"; // The public navbar

// Public Pages
import Home from "./pages/Home";
import Events from "./pages/Events";

// Auth Pages
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ConfirmPasswordPage from "./pages/ConfirmPasswordPage";
import ConfirmAccountPage from "./pages/ConfirmAccountPage.jsx";

// Dashboard Pages
import DashboardPage from "./pages/DashboardPage";
import CreateEventPage from './pages/CreateEventPage.jsx';

function App() {
  return (
    <Router>
      <Routes>
        {/* --- Public Routes (Have the public Navbar) --- */}
        <Route path="/" element={<><Navbar /><Home /></>} />
        <Route path="/events" element={<><Navbar /><Events /></>} />

        {/* --- Auth Routes (Have no Navbar) --- */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/confirm-password" element={<ConfirmPasswordPage />} />
        <Route path="/confirm-account" element={<ConfirmAccountPage />} />

        {/* --- Protected Routes (Wrapped by DashboardLayout) --- */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/calendar" element={<Events />} />
          <Route path="/create-event" element={<CreateEventPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;