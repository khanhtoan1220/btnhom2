import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Badge, Button } from "react-bootstrap";
import { FaStar, FaClock, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

import api from "../untils/api";
import URL from "../contans/URL";

function FeaturedServices() {
  const [services, setServices] = useState([]);

  const get_featured_services = async () => {
    const rs = await api.get(URL.SERVICES);
    const data = rs.data;

    const topPopular = data
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 4);

    setServices(topPopular);
  };

  useEffect(() => {
    get_featured_services();
  }, []);

  return (
    <section className="py-5 bg-light">
      <Container>
        <div className="d-flex justify-content-between align-items-end mb-4">
          <div>
            <h6 className="text-warning fw-bold text-uppercase mb-1">
              Dịch Vụ Nổi Bật
            </h6>
            <h3 className="fw-bold text-dark mb-0">Phổ Biến Nhất</h3>
          </div>

          <Link to="/services" className="text-decoration-none">
            <Button
              variant="outline-warning"
              className="fw-bold rounded-pill px-3 py-2 d-flex align-items-center gap-2 text-dark"
            >
              <span>Xem tất cả</span>
              <FaArrowRight />
            </Button>
          </Link>
        </div>

        <Row className="g-4">
          {services.map((item) => (
            <Col key={item.id} lg={3} md={6} sm={12}>
              <Card className="h-100 border-0 shadow-sm rounded-4 overflow-hidden bg-white">
                {/* Ảnh + Badge */}
                <div className="position-relative">
                  <Card.Img
                    variant="top"
                    src={item.thumbnail}
                    alt={item.name}
                    style={{ height: "160px", objectFit: "cover" }}
                  />
                  <Badge
                    bg="warning"
                    className="position-absolute top-0 start-0 m-2 px-2 py-1 text-dark fw-bold rounded-pill fs-8"
                  >
                    HOT
                  </Badge>
                </div>

                <Card.Body className="d-flex flex-column p-3">
                  <Card.Title className="fw-bold fs-6 text-dark mb-2 text-truncate">
                    {item.name}
                  </Card.Title>

                  <div className="d-flex align-items-center gap-3 mb-2 text-muted fs-7">
                    <span className="d-flex align-items-center gap-1 text-warning fw-bold">
                      <FaStar /> {item.rating}
                    </span>
                    <span className="d-flex align-items-center gap-1">
                      <FaClock /> {item.duration}p
                    </span>
                  </div>

                  <div className="d-flex align-items-center justify-content-between mt-auto pt-2 border-top">
                    <div>
                      <span className="fw-bold text-danger fs-6 me-1">
                        {item.price.toLocaleString("vi-VN")}đ
                      </span>
                    </div>

                    <Link to={`/services/${item.id}`}>
                      <Button
                        variant="warning"
                        size="sm"
                        className="text-white fw-bold rounded-pill px-3"
                      >
                        Chi tiết
                      </Button>
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default FeaturedServices;
