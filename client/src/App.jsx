import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Hostels from "./pages/Hostels";
import HostelDetails from "./pages/HostelDetails";
import Compare from "./pages/Compare";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import OwnerDashboard from "./pages/OwnerDashboard";
import AddHostel from "./pages/AddHostel";

function App() {
  return (
    <div className="app">
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hostels" element={<Hostels />} />
          <Route path="/hostel/:id" element={<HostelDetails />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/student-dashboard"
            element={<StudentDashboard />}
          />
          <Route path="/owner-dashboard" element={<OwnerDashboard />} />
          <Route path="/add-hostel" element={<AddHostel />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;