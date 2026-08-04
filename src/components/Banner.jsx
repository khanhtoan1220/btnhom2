import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaPaw } from "react-icons/fa6";
import banner from "../assets/imgs/banner.png";

function Banner() {
  return (
    <div className="banner-wrapper bg-light py-4 py-lg-5 overflow-hidden">
      <Container>
        <Row className="align-items-center g-4">
          <Col lg={6} md={12} className="text-center text-lg-start">
            <h1
              className="display-5 fw-bold text-dark mb-3"
              style={{ lineHeight: 1.2 }}
            >
              Dịch Vụ Chăm Sóc <br />
              <span className="text-warning">Thú Cưng 5 Sao</span>
            </h1>
            <p className="lead text-muted mb-4 fs-6">
              Dành cho thú cưng bằng cả tình yêu thương. Hệ thống spa, cắt tỉa
              lông và khách sạn chó mèo hàng đầu Việt Nam.
            </p>

            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start">
              <Link to="/booking" className="text-decoration-none">
                <Button
                  variant="warning"
                  size="md"
                  className="text-white fw-bold rounded-pill px-4 py-2 shadow-sm d-flex align-items-center justify-content-center gap-2"
                >
                  <span>ĐẶT LỊCH NGAY</span>
                  <FaPaw />
                </Button>
              </Link>

              <Link to="/services">
                <Button
                  variant="outline-dark"
                  size="md"
                  className="fw-bold rounded-pill px-4 py-2"
                >
                  Xem Dịch Vụ
                </Button>
              </Link>
            </div>
          </Col>

          <Col
            lg={6}
            md={12}
            className="d-flex justify-content-center justify-content-lg-end position-relative mt-4 mt-lg-0"
          >
            <img
              src={banner}
              alt="Pet Care Spa"
              className="img-fluid rounded-4 shadow-lg position-relative"
              style={{
                zIndex: 1,
                maxHeight: "380px",
                width: "100%",
              }}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Banner;
