import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import { FaStar, FaCheckCircle, FaQuoteLeft, FaReply } from "react-icons/fa";

import api from "../untils/api";
import URL from "../contans/URL";

function Testimonials() {
  const [feedbacks, setFeedbacks] = useState([]);

  const get_feedbacks = async () => {
    const rs = await api.get(URL.REVIEWS);
    const data = rs.data;
    setFeedbacks(data.slice(0, 3));
  };

  useEffect(() => {
    get_feedbacks();
  }, []);

  return (
    <section className="py-5 bg-light">
      <Container>
        <div className="text-center mb-5">
          <h6 className="text-warning fw-bold text-uppercase tracking-wider">
            Khách Hàng Nói Gì
          </h6>
          <h2 className="fw-bold display-6 text-dark">
            Phản Hồi Từ Khách Hàng
          </h2>
          <div
            className="bg-warning mx-auto mt-3 rounded-pill"
            style={{ width: "60px", height: "4px" }}
          ></div>
        </div>

        <Row className="g-4">
          {feedbacks.map((item) => (
            <Col key={item.id} lg={4} md={6} sm={12}>
              <Card className="h-100 border-0 shadow-sm rounded-4 bg-white p-2">
                <Card.Body className="d-flex flex-column p-3">
                  {/* Icon nháy kép trang trí + Rating sao */}
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <FaQuoteLeft className="text-warning opacity-50 fs-3" />
                    <span className="d-flex align-items-center gap-1 text-warning fw-bold">
                      <FaStar /> {item.rating}
                    </span>
                  </div>

                  <Card.Text className="text-dark fs-7 flex-grow-1 fst-italic mb-4">
                    "{item.comment}"
                  </Card.Text>

                  <div className="d-flex align-items-center gap-3 pt-3 border-top mt-auto">
                    <img
                      src={item.customerAvatar}
                      className="rounded-circle object-fit-cover"
                      style={{ width: "45px", height: "45px" }}
                    />
                    <div>
                      <div className="d-flex align-items-center gap-1">
                        <h6 className="fw-bold fs-7 text-dark mb-0">
                          {item.customerName}
                        </h6>
                      </div>
                    </div>
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

export default Testimonials;
