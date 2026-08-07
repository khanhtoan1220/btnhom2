import { Route, Routes } from "react-router-dom";
// 1. Import Header và Footer vào App.jsx
import Header from "./components/Header";
import Footer from "./components/Footer";
import Booking from "./pages/Booking";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Header />

      <main>
        <div className="container">
          <Routes>
            <Route path="/" Component={Home} />
            <Route path="/booking" Component={Booking} />
          </Routes>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default App;
