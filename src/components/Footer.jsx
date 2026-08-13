import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import {
  FaPaw,
  FaFacebook,
  FaInstagram,
  FaCommentDots,
  FaLocationDot,
  FaPhone,
  FaEnvelope,
  FaClock,
} from "react-icons/fa6";

function Footer() {
  return (
    <footer
      className="text-white pt-5 pb-4 mt-5"
      style={{ backgroundColor: "#111827" }}
    >
      <Container>
        <Row className="g-4">
          <Col lg={4} md={6}>
            <h5 className="text-warning fw-bold d-flex align-items-center gap-2 mb-3">
              <FaPaw /> PET CARE
            </h5>
            <p className="text-white-50 small mb-3">
              Hệ thống chăm sóc và làm đẹp thú cưng hàng đầu Việt Nam. Tận tâm,
              uy tín và chuyên nghiệp.
            </p>

            <div className="d-flex gap-3 fs-5">
              <a href="#facebook" className="text-white hover-warning">
                <FaFacebook />
              </a>
              <a href="#instagram" className="text-white hover-warning">
                <FaInstagram />
              </a>
              <a href="#zalo" className="text-white hover-warning">
                <FaCommentDots />
              </a>
            </div>
          </Col>

          <Col lg={2} md={6}>
            <h6 className="text-warning fw-bold mb-3">DANH MỤC DỊCH VỤ</h6>
            <ul className="list-unstyled small d-flex flex-column gap-2">
              <li>
                <Link
                  to="/services?categoryId=1"
                  className="text-decoration-none text-white-50 hover-white"
                >
                  Tắm & Làm đẹp
                </Link>
              </li>
              <li>
                <Link
                  to="/services?categoryId=2"
                  className="text-decoration-none text-white-50 hover-white"
                >
                  Y tế & Sức khỏe
                </Link>
              </li>
              <li>
                <Link
                  to="/services?categoryId=3"
                  className="text-decoration-none text-white-50 hover-white"
                >
                  Khách sạn & Lưu trú
                </Link>
              </li>
              <li>
                <Link
                  to="/services?categoryId=4"
                  className="text-decoration-none text-white-50 hover-white"
                >
                  Huấn luyện
                </Link>
              </li>
              <li>
                <Link
                  to="/services?categoryId=5"
                  className="text-decoration-none text-white-50 hover-white"
                >
                  Chăm sóc tại nhà
                </Link>
              </li>
            </ul>
          </Col>

          <Col lg={2} md={6}>
            <h6 className="text-warning fw-bold mb-3">KHÁM PHÁ</h6>
            <ul className="list-unstyled small d-flex flex-column gap-2">
              <li>
                <Link
                  to="/services"
                  className="text-decoration-none text-white-50 hover-white"
                >
                  Tất cả dịch vụ
                </Link>
              </li>
              <li>
                <Link
                  to="/branches"
                  className="text-decoration-none text-white-50 hover-white"
                >
                  Hệ thống cơ sở
                </Link>
              </li>
              <li>
                <Link
                  to="/blogs"
                  className="text-decoration-none text-white-50 hover-white"
                >
                  Cẩm nang thú cưng
                </Link>
              </li>
              <li>
                <Link
                  to="/favorites"
                  className="text-decoration-none text-white-50 hover-white"
                >
                  Danh sách yêu thích
                </Link>
              </li>
              <li>
                <Link
                  to="/booking"
                  className="text-decoration-none text-white-50 hover-white"
                >
                  Đặt lịch hẹn
                </Link>
              </li>
            </ul>
          </Col>

          <Col lg={4} md={6}>
            <h6 className="text-warning fw-bold mb-3">LIÊN HỆ</h6>
            <ul className="list-unstyled small text-white-50 d-flex flex-column gap-2">
              <li className="d-flex align-items-center gap-2">
                <FaLocationDot className="text-warning" />
                <span>123 Đường Cầu Giấy, Hà Nội</span>
              </li>
              <li className="d-flex align-items-center gap-2">
                <FaPhone className="text-warning" />
                <span>0988.xxx.xxx (8:00 - 21:00)</span>
              </li>
              <li className="d-flex align-items-center gap-2">
                <FaEnvelope className="text-warning" />
                <span>hotro@petcare.vn</span>
              </li>
              <li className="d-flex align-items-center gap-2">
                <FaClock className="text-warning" />
                <span>T2 - CN (08:00 - 20:00)</span>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
