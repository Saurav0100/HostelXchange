
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Marketplace from "./pages/Marketplace";
import ProductDetails from "./pages/ProductDetails";
import Compare from "./pages/Compare";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import SellerDashboard from "./pages/SellerDashboard";
import AddProduct from "./pages/AddProduct";

function App() {
  return (
    <div className="app">
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/student-dashboard"
            element={<StudentDashboard />}
          />
          <Route
            path="/seller-dashboard"
            element={<SellerDashboard />}
          />
          <Route path="/add-product" element={<AddProduct />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
