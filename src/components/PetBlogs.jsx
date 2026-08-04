import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { FaClock, FaUser, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

import api from "../untils/api";
import URL from "../contans/URL";

function PetBlogs() {
  const [blogs, setBlogs] = useState([]);

  const get_blogs = async () => {
    const rs = await api.get(URL.ARTICLES);
    const data = rs.data;
    setBlogs(data.slice(0, 3));
  };

  useEffect(() => {
    get_blogs();
  }, []);

  return (
    <section className="py-5 bg-white">
      <Container>
        <div className="d-flex justify-content-between align-items-end mb-4">
          <div>
            <h6 className="text-warning fw-bold text-uppercase mb-1">
              Kiến Thức & Mẹo Hay
            </h6>
            <h3 className="fw-bold text-dark mb-0">
              Cẩm Nang Chăm Sóc Thú Cưng
            </h3>
          </div>

          <Link to="/blogs" className="text-decoration-none">
            <Button
              variant="outline-warning"
              className="fw-bold rounded-pill px-3 py-2 d-flex align-items-center gap-2 text-dark"
            >
              <span>Xem tất cả bài viết</span>
              <FaArrowRight />
            </Button>
          </Link>
        </div>

        <Row className="g-4">
          {blogs.map((item) => (
            <Col key={item.id} lg={4} md={6} sm={12}>
              <Card className="h-100 border-0 shadow-sm rounded-4 overflow-hidden bg-light">
                <div style={{ height: "180px", overflow: "hidden" }}>
                  <Card.Img
                    variant="top"
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-100 h-100 object-fit-cover"
                  />
                </div>

                <Card.Body className="d-flex flex-column p-4">
                  <div className="mb-2">
                    <Badge
                      bg="warning"
                      className="text-dark fw-semibold px-2 py-1"
                    >
                      {item.topic}
                    </Badge>
                  </div>

                  <Card.Title className="fw-bold fs-6 text-dark mb-2 text-truncate-2">
                    {item.title}
                  </Card.Title>

                  <div className="d-flex justify-content-between align-items-center pt-3 border-top text-muted fs-8">
                    <span className="d-flex align-items-center gap-1">
                      <FaUser className="text-warning" />
                      {item.author}
                    </span>
                    <span className="d-flex align-items-center gap-1">
                      <FaClock className="text-warning" />
                      {item.readTime} phút đọc
                    </span>
                  </div>

                  <div className="mt-3">
                    <Link
                      to={`/blogs/${item.id}`}
                      className="text-decoration-none"
                    >
                      <Button
                        variant="warning"
                        className="w-100 text-white fw-bold rounded-pill py-2 fs-7"
                      >
                        Đọc tiếp
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

export default PetBlogs;
