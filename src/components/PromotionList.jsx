import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Badge, Button } from "react-bootstrap";
import { FaTicketAlt, FaCheck, FaCopy } from "react-icons/fa";

import api from "../untils/api";
import URL from "../contans/URL";

function PromotionList() {
  const [promotions, setPromotions] = useState([]);

  const [savedCodes, setSavedCodes] = useState([]);

  const get_promotions = async () => {
    const rs = await api.get(URL.PROMOTIONS);
    const data = rs.data;

    setPromotions(data.slice(0, 4));
  };

  useEffect(() => {
    get_promotions();

    const storedVouchers =
      JSON.parse(localStorage.getItem("my_vouchers")) || [];
    setSavedCodes(storedVouchers);
  }, []);

  const handleSaveVoucher = (code) => {
    if (savedCodes.includes(code)) return;

    const updatedCodes = [...savedCodes, code];
    setSavedCodes(updatedCodes);
    localStorage.setItem("my_vouchers", JSON.stringify(updatedCodes));

    alert(`Đã lưu mã khuyến mãi [${code}] vào kho voucher của bạn!`);
  };

  return (
    <section className="py-5">
      <Container>
        <div className="text-center mb-5">
          <h6 className="text-warning fw-bold text-uppercase tracking-wider">
            Ưu Đãi Hấp Dẫn
          </h6>
          <h2 className="fw-bold display-6 text-dark">
            Gói Khuyến Mãi Dành Cho Bạn
          </h2>
          <div
            className="bg-warning mx-auto mt-3 rounded-pill"
            style={{ width: "60px", height: "4px" }}
          ></div>
        </div>

        <Row className="g-4">
          {promotions.map((item) => {
            const isSaved = savedCodes.includes(item.code);

            return (
              <Col key={item.id} lg={3} md={6} sm={12}>
                <Card className="h-100 border-0 shadow-sm rounded-4 overflow-hidden bg-white border-top border-warning border-4">
                  <Card.Body className="d-flex flex-column p-4">
                    <div className="mb-2">
                      <Badge
                        bg="danger"
                        className="fs-6 px-3 py-2 rounded-pill"
                      >
                        {item.discountType === "percent"
                          ? `Giảm ${item.discountValue}%`
                          : `Giảm ${item.discountValue.toLocaleString("vi-VN")}đ`}
                      </Badge>
                    </div>

                    <div className="mb-3">
                      <small className="text-muted fw-semibold d-inline-flex align-items-center">
                        <FaTicketAlt className="text-warning me-1" />
                        <span>Mã: {item.code}</span>
                      </small>
                    </div>

                    <Card.Title className="fw-bold fs-6 text-dark mb-2">
                      {item.title || item.name}
                    </Card.Title>

                    <Card.Text className="text-muted fs-7 flex-grow-1 mb-4">
                      {item.description}
                    </Card.Text>

                    <div className="text-muted fs-8 mb-3">
                      HSD: {item.endDate}
                    </div>

                    <Button
                      variant={isSaved ? "success" : "warning"}
                      className={`w-100 fw-bold rounded-pill py-2 d-flex align-items-center justify-content-center gap-2 ${
                        !isSaved ? "text-white" : ""
                      }`}
                      onClick={() => handleSaveVoucher(item.code)}
                      disabled={isSaved}
                    >
                      {isSaved ? (
                        <>
                          <FaCheck />
                          <span>Đã nhận mã</span>
                        </>
                      ) : (
                        <>
                          <FaCopy />
                          <span>Nhận mã ngay</span>
                        </>
                      )}
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </section>
  );
}

export default PromotionList;
