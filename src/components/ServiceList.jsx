import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import api from "../untils/api";
import URL from "../contans/URL";

function ServiceCategoryList() {
  const [categories, setCategories] = useState([]);

  const get_service_categories = async () => {
    const rs = await api.get(URL.SERVICE_CATEGORIES);
    const data = rs.data;
    setCategories(data);
  };

  useEffect(() => {
    get_service_categories();
  }, []);

  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <h6 className="text-warning fw-bold text-uppercase tracking-wider">
          Danh Mục Dịch Vụ
        </h6>
        <div
          className="bg-warning mx-auto mt-3 rounded-pill"
          style={{ width: "60px", height: "4px" }}
        ></div>
      </div>

      <Row className="g-4 justify-content-center">
        {categories.map((item) => (
          <Col key={item.id} lg={2} md={4} sm={6} xs={6}>
            <Link
              to={`/services?categoryId=${item.id}`}
              className="text-decoration-none"
            >
              <Card className="h-100 border-0 shadow-sm rounded-4 text-center p-3 card-hover bg-white">
                <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                  <div
                    className="mb-3 rounded-circle  p-1 d-flex align-items-center justify-content-center"
                    style={{ width: "80px", height: "80px", minWidth: "80px" }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="rounded-circle w-100 h-100"
                      style={{ objectFit: "cover" }}
                    />
                  </div>

                  <Card.Title className="fw-bold fs-6 text-dark mb-1">
                    {item.name}
                    {item.icon}
                  </Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ServiceCategoryList;
