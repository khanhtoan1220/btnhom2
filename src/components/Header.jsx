import { Navbar, Container, Nav, Badge } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

import {
  FaPaw,
  FaHeart,
  FaCalendarDays,
  FaMagnifyingGlass,
} from "react-icons/fa6";

function Header() {
  return (
    <Navbar bg="light" expand="lg" className="shadow-sm sticky-top py-2">
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          className="fw-bold text-warning fs-4 d-flex align-items-center gap-2"
        >
          <FaPaw />
          <span>PET CARE</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="pet-care-navbar" />

        <Navbar.Collapse id="pet-care-navbar">
          <Nav className="mx-auto align-items-lg-center gap-3 mt-3 mt-lg-0">
            <Nav.Link as={NavLink} to="/services">
              Dịch vụ
            </Nav.Link>

            <Nav.Link as={NavLink} to="/branches">
              Cơ sở
            </Nav.Link>

            <Nav.Link as={NavLink} to="/blogs">
              Cẩm nang
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/favorites"
              className="d-flex align-items-center gap-1"
            >
              <FaHeart className="text-danger" />
              <span>Yêu thích</span>
            </Nav.Link>

            {/* THÊM MỤC TRA CỨU LỊCH VÀO MENU */}
            <Nav.Link
              as={NavLink}
              to="/booking-lookup"
              className="d-flex align-items-center gap-1"
            >
              <FaMagnifyingGlass className="text-primary" />
              <span>Tra cứu lịch</span>
            </Nav.Link>
          </Nav>

          <div className="d-flex align-items-center gap-2">
            <Link
              to="/booking"
              className="btn btn-warning text-white fw-bold rounded-pill px-3 mt-2 mt-lg-0 d-flex align-items-center gap-2"
            >
              <span>Đặt lịch ngay</span>
              <FaCalendarDays />
            </Link>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
