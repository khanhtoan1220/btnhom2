import { Route, Routes } from "react-router-dom";
// 1. Import Header và Footer vào App.jsx
import Header from "./components/Header";
import Footer from "./components/Footer";
import Booking from "./pages/Booking";
import Home from "./pages/Home";
import BookingSuccess from "./pages/BookingSuccess";
import BookingLookup from "./pages/BookingLookup";
import Services from "./pages/Services";
function App() {
  return (
    <>
      <Header />

      <main>
        <div className="container">
          <Routes>
            <Route path="/" Component={Home} />
            <Route path="/booking" Component={Booking} />
            <Route
              path="/booking-success/:bookingCode"
              Component={BookingSuccess}
            />
            <Route path="/booking-lookup" Component={BookingLookup} />
            <Route path="/services" element={<Services />} />
          </Routes>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default App;
