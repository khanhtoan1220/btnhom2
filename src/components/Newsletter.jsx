import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { FaEnvelope, FaPaperPlane } from "react-icons/fa";

function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setStatus({
        type: "danger",
        message: "Vui lòng nhập địa chỉ email!",
      });
      return;
    }

    if (!validateEmail(email.trim())) {
      setStatus({
        type: "danger",
        message: "Email không đúng định dạng (Ví dụ đúng: example@gmail.com)!",
      });
      return;
    }

    console.log("Đăng ký thành công với email:", email.trim());
    setStatus({
      type: "success",
      message: "Đăng ký nhận ưu đãi thành công! Cảm ơn bạn.",
    });

    setEmail("");
  };

  return (
    <section className="py-5 bg-warning bg-gradient text-white">
      <Container>
        <Row className="align-items-center justify-content-between g-4">
          <Col lg={6} md={12}>
            <div className="d-flex align-items-center gap-3">
              <div
                className="bg-white rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 shadow-sm"
                style={{ width: "60px", height: "60px" }}
              >
                <FaEnvelope className="text-warning fs-3" />
              </div>
              <div>
                <h3 className="fw-bold text-white mb-1">
                  Đăng Ký Nhận Khuyến Mãi
                </h3>
                <p className="mb-0 text-white-50 fs-7">
                  Nhận ngay voucher giảm giá 10% và tin tức chăm sóc thú cưng
                  mới nhất hàng tuần.
                </p>
              </div>
            </div>
          </Col>

          <Col lg={5} md={12}>
            <Form onSubmit={handleSubmit} noValidate>
              <div className="bg-white p-2 rounded-pill shadow-sm d-flex align-items-center">
                <Form.Control
                  type="email"
                  placeholder="Nhập email của bạn..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-0 shadow-none ps-3 bg-transparent text-dark fs-7"
                />
                <Button
                  type="submit"
                  variant="warning"
                  className="text-white fw-bold rounded-pill px-4 py-2 d-flex align-items-center gap-2 flex-shrink-0"
                >
                  <span>Đăng ký</span>
                  <FaPaperPlane />
                </Button>
              </div>
            </Form>

            {status && (
              <Alert
                variant={status.type}
                onClose={() => setStatus(null)}
                dismissible
                className="mt-3 mb-0 py-2 fs-8 rounded-3"
              >
                {status.message}
              </Alert>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Newsletter;
