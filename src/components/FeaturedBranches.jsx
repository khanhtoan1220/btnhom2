import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaArrowRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";

import api from "../untils/api";
import URL from "../contans/URL";

function FeaturedBranches() {
  const [branches, setBranches] = useState([]);
  const get_branches = async () => {
    const rs = await api.get(URL.BRANCHES);
    const data = rs.data;
    setBranches(data.slice(0, 3));
  };

  useEffect(() => {
    get_branches();
  }, []);

  return (
    <section className="py-5 bg-light">
      <Container>
        <div className="d-flex justify-content-between align-items-end mb-4">
          <div>
            <h6 className="text-warning fw-bold text-uppercase mb-1">
              Hệ Thống Cơ Sở
            </h6>
            <h3 className="fw-bold text-dark mb-0">Chi Nhánh Nổi Bật</h3>
          </div>

          <Link to="/branches" className="text-decoration-none">
            <Button
              variant="outline-warning"
              className="fw-bold rounded-pill px-3 py-2 d-flex align-items-center gap-2 text-dark"
            >
              <span>Xem tất cả cơ sở</span>
              <FaArrowRight />
            </Button>
          </Link>
        </div>

        <Row className="g-4">
          {branches.map((item) => (
            <Col key={item.id} lg={4} md={6} sm={12}>
              <Card className="h-100 border-0 shadow-sm rounded-4 overflow-hidden bg-white">
                <Card.Body className="d-flex flex-column p-4">
                  <Card.Title className="fw-bold fs-5 text-dark mb-3">
                    {item.name}
                  </Card.Title>

                  <div className="d-flex align-items-start gap-2 text-muted mb-2 fs-7">
                    <FaMapMarkerAlt className="text-warning mt-1 flex-shrink-0" />
                    <span>{item.address}</span>
                  </div>

                  <Card.Text className="text-muted fs-7 flex-grow-1 mb-4">
                    {item.description}
                  </Card.Text>

                  <div className="pt-2 border-top">
                    <Link to={`/branches/${item.id}`}>
                      <Button
                        variant="warning"
                        className="w-100 text-white fw-bold rounded-pill py-2"
                      >
                        Chi tiết cơ sở
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

export default FeaturedBranches;
