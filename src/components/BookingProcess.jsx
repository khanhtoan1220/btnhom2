import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import {
  FaCalendarAlt,
  FaConciergeBell,
  FaCheckCircle,
  FaHeart,
  FaQuestionCircle,
  FaArrowRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function BookingProcess() {
  const steps = [
    {
      id: 1,
      icon: <FaConciergeBell className="text-warning fs-3" />,
      title: "1. Chọn Dịch Vụ",
      description:
        "Lựa chọn dịch vụ spa, cắt tỉa hoặc chăm sóc phù hợp cho bé yêu.",
    },
    {
      id: 2,
      icon: <FaCalendarAlt className="text-warning fs-3" />,
      title: "2. Chọn Ngày & Cơ Sở",
      description: "Chọn chi nhánh gần nhất và khung giờ thuận tiện cho bạn.",
    },
    {
      id: 3,
      icon: <FaCheckCircle className="text-warning fs-3" />,
      title: "3. Xác Nhận Đặt Lịch",
      description: "Điền thông tin liên hệ và nhận tin nhắn xác nhận lịch hẹn.",
    },
    {
      id: 4,
      icon: <FaHeart className="text-warning fs-3" />,
      title: "4. Trải Nghiệm Dịch Vụ",
      description: "Mang bé cưng đến cửa hàng và tận hưởng dịch vụ 5 sao.",
    },
  ];

  return (
    <section className="py-5 bg-white">
      <Container>
        <div className="text-center mb-5">
          <h6 className="text-warning fw-bold text-uppercase tracking-wider">
            Đơn Giản & Nhanh Chóng
          </h6>
          <h2 className="fw-bold display-6 text-dark">
            Quy Trình Đặt Lịch Hẹn
          </h2>
          <div
            className="bg-warning mx-auto mt-3 rounded-pill"
            style={{ width: "60px", height: "4px" }}
          ></div>
        </div>

        <Row className="g-4 mb-5">
          {steps.map((step) => (
            <Col key={step.id} lg={3} md={6} sm={12}>
              <Card className="h-100 border-0 shadow-sm rounded-4 text-center p-3 position-relative bg-light">
                <Card.Body className="d-flex flex-column align-items-center">
                  <div
                    className="bg-white rounded-circle d-flex align-items-center justify-content-center shadow-sm mb-3"
                    style={{ width: "70px", height: "70px" }}
                  >
                    {step.icon}
                  </div>
                  <Card.Title className="fw-bold fs-6 text-dark mb-2">
                    {step.title}
                  </Card.Title>
                  <Card.Text className="text-muted fs-7 mb-0">
                    {step.description}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <div className="text-center bg-light p-4 rounded-4 d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
          <div className="d-flex align-items-center gap-3 text-start">
            <FaQuestionCircle className="text-warning fs-1 flex-shrink-0" />
            <div>
              <h6 className="fw-bold mb-1 text-dark">Bạn vẫn còn thắc mắc?</h6>
              <p className="text-muted fs-7 mb-0">
                Xem ngay các câu hỏi thường gặp về quy trình đặt lịch và dịch vụ
                tại PetCare.
              </p>
            </div>
          </div>

          <Link to="/faqs" className="text-decoration-none">
            <Button
              variant="warning"
              className="text-white fw-bold rounded-pill px-4 py-2 d-flex align-items-center gap-2 text-nowrap "
            >
              <span>Câu hỏi thường gặp</span>
              <FaArrowRight />
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}

export default BookingProcess;
